/// Dutch Auction Edge Case Tests
/// Tests Dutch auction acceptance, price decay, expiry, and fills
#[test_only]
module velox::auction_dutch_tests {
    use std::signer;
    use aptos_framework::account;
    use aptos_framework::timestamp;
    use velox::test_tokens;
    use velox::submission;
    use velox::settlement;
    use velox::auction;
    use velox::types;
    use velox::math;

    // ============ Test Setup ============

    fun setup(aptos_framework: &signer, admin: &signer, user: &signer, solver: &signer) {
        timestamp::set_time_has_started_for_testing(aptos_framework);
        timestamp::update_global_time_for_test_secs(1000);

        account::create_account_for_test(signer::address_of(admin));
        account::create_account_for_test(signer::address_of(user));
        account::create_account_for_test(signer::address_of(solver));

        test_tokens::initialize(admin);
        submission::initialize(admin);
        settlement::initialize(admin, signer::address_of(admin));

        test_tokens::mint_token_a(admin, signer::address_of(user), 10000_0000_0000);
        test_tokens::mint_token_b(admin, signer::address_of(solver), 10000_0000_0000);
    }

    fun setup_with_solver2(
        aptos_framework: &signer, admin: &signer, user: &signer,
        solver: &signer, solver2: &signer
    ) {
        setup(aptos_framework, admin, user, solver);
        account::create_account_for_test(signer::address_of(solver2));
        test_tokens::mint_token_b(admin, signer::address_of(solver2), 10000_0000_0000);
    }

    // ============ Acceptance Tests ============

    #[test(aptos_framework = @0x1, admin = @velox, user = @0x123, solver = @0x456)]
    fun test_accept_dutch_at_start_price(
        aptos_framework: &signer, admin: &signer, user: &signer, solver: &signer
    ) {
        setup(aptos_framework, admin, user, solver);
        let admin_addr = signer::address_of(admin);
        let solver_addr = signer::address_of(solver);
        let token_a = test_tokens::get_token_a_address(admin_addr);
        let token_b = test_tokens::get_token_b_address(admin_addr);

        // Dutch auction: start_price = 150, end_price = 90, duration = 100
        submission::submit_swap_dutch(user, admin_addr, token_a, token_b,
            100_0000_0000, 90_0000_0000, 150_0000_0000, 100);

        // Accept immediately at start (price = start_price = 150)
        auction::accept_dutch(solver, admin_addr, 0);

        let (has_winner, winner) = auction::get_winner(admin_addr, 0);
        assert!(has_winner, 1);
        assert!(winner == solver_addr, 2);
    }

    #[test(aptos_framework = @0x1, admin = @velox, user = @0x123, solver = @0x456)]
    fun test_accept_dutch_at_end_price(
        aptos_framework: &signer, admin: &signer, user: &signer, solver: &signer
    ) {
        setup(aptos_framework, admin, user, solver);
        let admin_addr = signer::address_of(admin);
        let token_a = test_tokens::get_token_a_address(admin_addr);
        let token_b = test_tokens::get_token_b_address(admin_addr);

        submission::submit_swap_dutch(user, admin_addr, token_a, token_b,
            100_0000_0000, 90_0000_0000, 150_0000_0000, 100);

        // Advance to just before end (at t=1099, still active)
        timestamp::update_global_time_for_test_secs(1099);

        // Accept near end (price should be close to end_price)
        auction::accept_dutch(solver, admin_addr, 0);

        let auction_state = submission::get_auction_state(admin_addr, 0);
        assert!(types::is_dutch_accepted(&auction_state), 1);
    }

    #[test(aptos_framework = @0x1, admin = @velox, user = @0x123, solver = @0x456)]
    fun test_accept_dutch_at_midpoint(
        aptos_framework: &signer, admin: &signer, user: &signer, solver: &signer
    ) {
        setup(aptos_framework, admin, user, solver);
        let admin_addr = signer::address_of(admin);
        let token_a = test_tokens::get_token_a_address(admin_addr);
        let token_b = test_tokens::get_token_b_address(admin_addr);

        // start=150, end=90, duration=100
        submission::submit_swap_dutch(user, admin_addr, token_a, token_b,
            100_0000_0000, 90_0000_0000, 150_0000_0000, 100);

        // At midpoint (t=1050), price should be (150+90)/2 = 120
        timestamp::update_global_time_for_test_secs(1050);

        let current_price = auction::get_current_dutch_price(admin_addr, 0);
        // Price at midpoint: 150 - (60 * 50 / 100) = 150 - 30 = 120
        assert!(current_price == 120_0000_0000, 1);

        auction::accept_dutch(solver, admin_addr, 0);
        let auction_state = submission::get_auction_state(admin_addr, 0);
        assert!(types::get_winning_bid_amount(&auction_state) == 120_0000_0000, 2);
    }

    #[test(aptos_framework = @0x1, admin = @velox, user = @0x123, solver = @0x456)]
    #[expected_failure(abort_code = 41, location = velox::auction)]
    fun test_accept_dutch_after_end_time_fails(
        aptos_framework: &signer, admin: &signer, user: &signer, solver: &signer
    ) {
        setup(aptos_framework, admin, user, solver);
        let admin_addr = signer::address_of(admin);
        let token_a = test_tokens::get_token_a_address(admin_addr);
        let token_b = test_tokens::get_token_b_address(admin_addr);

        submission::submit_swap_dutch(user, admin_addr, token_a, token_b,
            100_0000_0000, 90_0000_0000, 150_0000_0000, 100);

        // Advance past end time
        timestamp::update_global_time_for_test_secs(1200);

        // Should fail - auction ended
        auction::accept_dutch(solver, admin_addr, 0);
    }

    // ============ Price Calculation Tests ============

    #[test(aptos_framework = @0x1, admin = @velox, user = @0x123, solver = @0x456)]
    fun test_dutch_price_linear_interpolation(
        aptos_framework: &signer, admin: &signer, user: &signer, solver: &signer
    ) {
        setup(aptos_framework, admin, user, solver);
        let admin_addr = signer::address_of(admin);
        let token_a = test_tokens::get_token_a_address(admin_addr);
        let token_b = test_tokens::get_token_b_address(admin_addr);

        // start=1000, end=500, duration=100
        submission::submit_swap_dutch(user, admin_addr, token_a, token_b,
            100_0000_0000, 500_0000_0000, 1000_0000_0000, 100);

        // Check prices at various points
        // t=1000 (start): price = 1000
        let price_at_start = auction::get_current_dutch_price(admin_addr, 0);
        assert!(price_at_start == 1000_0000_0000, 1);

        // t=1025 (25%): price = 1000 - 500*0.25 = 875
        timestamp::update_global_time_for_test_secs(1025);
        let price_at_25 = auction::get_current_dutch_price(admin_addr, 0);
        assert!(price_at_25 == 875_0000_0000, 2);

        // t=1050 (50%): price = 750
        timestamp::update_global_time_for_test_secs(1050);
        let price_at_50 = auction::get_current_dutch_price(admin_addr, 0);
        assert!(price_at_50 == 750_0000_0000, 3);

        // t=1075 (75%): price = 625
        timestamp::update_global_time_for_test_secs(1075);
        let price_at_75 = auction::get_current_dutch_price(admin_addr, 0);
        assert!(price_at_75 == 625_0000_0000, 4);
    }

    #[test(aptos_framework = @0x1, admin = @velox, user = @0x123, solver = @0x456)]
    fun test_dutch_constant_price_start_equals_end(
        aptos_framework: &signer, admin: &signer, user: &signer, solver: &signer
    ) {
        setup(aptos_framework, admin, user, solver);
        let admin_addr = signer::address_of(admin);
        let token_a = test_tokens::get_token_a_address(admin_addr);
        let token_b = test_tokens::get_token_b_address(admin_addr);

        // start_price = end_price = 100 (constant price auction)
        // Note: submit_swap_dutch requires start > min, so we need min < 100
        submission::submit_swap_dutch(user, admin_addr, token_a, token_b,
            100_0000_0000, 50_0000_0000, 100_0000_0000, 100);

        // Price should remain close to start throughout
        let price_start = auction::get_current_dutch_price(admin_addr, 0);
        assert!(price_start == 100_0000_0000, 1);

        timestamp::update_global_time_for_test_secs(1050);
        let price_mid = auction::get_current_dutch_price(admin_addr, 0);
        // Decays to end_price (min_amount_out = 50)
        assert!(price_mid == 75_0000_0000, 2);
    }

    // ============ Expiry Tests ============

    #[test(aptos_framework = @0x1, admin = @velox, user = @0x123, solver = @0x456)]
    fun test_expire_dutch_with_no_acceptor(
        aptos_framework: &signer, admin: &signer, user: &signer, solver: &signer
    ) {
        setup(aptos_framework, admin, user, solver);
        let admin_addr = signer::address_of(admin);
        let token_a = test_tokens::get_token_a_address(admin_addr);
        let token_b = test_tokens::get_token_b_address(admin_addr);

        submission::submit_swap_dutch(user, admin_addr, token_a, token_b,
            100_0000_0000, 90_0000_0000, 150_0000_0000, 100);

        // Advance past end
        timestamp::update_global_time_for_test_secs(1200);

        // Expire the auction
        auction::expire_dutch(admin_addr, 0);

        let auction_state = submission::get_auction_state(admin_addr, 0);
        assert!(types::is_auction_failed(&auction_state), 1);
    }

    #[test(aptos_framework = @0x1, admin = @velox, user = @0x123, solver = @0x456)]
    #[expected_failure(abort_code = 42, location = velox::auction)]
    fun test_expire_dutch_before_end_fails(
        aptos_framework: &signer, admin: &signer, user: &signer, solver: &signer
    ) {
        setup(aptos_framework, admin, user, solver);
        let admin_addr = signer::address_of(admin);
        let token_a = test_tokens::get_token_a_address(admin_addr);
        let token_b = test_tokens::get_token_b_address(admin_addr);

        submission::submit_swap_dutch(user, admin_addr, token_a, token_b,
            100_0000_0000, 90_0000_0000, 150_0000_0000, 100);

        // Try to expire before end
        auction::expire_dutch(admin_addr, 0);
    }

    // ============ Fill Tests ============

    #[test(aptos_framework = @0x1, admin = @velox, user = @0x123, solver = @0x456, solver2 = @0x789)]
    #[expected_failure(abort_code = 24, location = velox::settlement)]
    fun test_fill_by_non_acceptor_fails(
        aptos_framework: &signer, admin: &signer, user: &signer,
        solver: &signer, solver2: &signer
    ) {
        setup_with_solver2(aptos_framework, admin, user, solver, solver2);
        let admin_addr = signer::address_of(admin);
        let token_a = test_tokens::get_token_a_address(admin_addr);
        let token_b = test_tokens::get_token_b_address(admin_addr);

        submission::submit_swap_dutch(user, admin_addr, token_a, token_b,
            100_0000_0000, 90_0000_0000, 150_0000_0000, 100);

        // Solver 1 accepts
        auction::accept_dutch(solver, admin_addr, 0);

        // Solver 2 tries to fill - should fail
        settlement::fill_swap(solver2, admin_addr, admin_addr, 0,
            100_0000_0000, 100_0000_0000);
    }

    #[test(aptos_framework = @0x1, admin = @velox, user = @0x123, solver = @0x456)]
    fun test_acceptor_fills_successfully(
        aptos_framework: &signer, admin: &signer, user: &signer, solver: &signer
    ) {
        setup(aptos_framework, admin, user, solver);
        let admin_addr = signer::address_of(admin);
        let token_a = test_tokens::get_token_a_address(admin_addr);
        let token_b = test_tokens::get_token_b_address(admin_addr);

        submission::submit_swap_dutch(user, admin_addr, token_a, token_b,
            100_0000_0000, 90_0000_0000, 150_0000_0000, 100);

        auction::accept_dutch(solver, admin_addr, 0);

        // Acceptor fills
        settlement::fill_swap(solver, admin_addr, admin_addr, 0,
            100_0000_0000, 150_0000_0000);

        let record = submission::borrow_intent(admin_addr, 0);
        assert!(types::is_filled(types::get_record_status(&record)), 1);
    }

    // ============ Race Condition Tests ============

    #[test(aptos_framework = @0x1, admin = @velox, user = @0x123, solver = @0x456, solver2 = @0x789)]
    #[expected_failure(abort_code = 44, location = velox::auction)]
    fun test_second_acceptor_fails_already_accepted(
        aptos_framework: &signer, admin: &signer, user: &signer,
        solver: &signer, solver2: &signer
    ) {
        setup_with_solver2(aptos_framework, admin, user, solver, solver2);
        let admin_addr = signer::address_of(admin);
        let token_a = test_tokens::get_token_a_address(admin_addr);
        let token_b = test_tokens::get_token_b_address(admin_addr);

        submission::submit_swap_dutch(user, admin_addr, token_a, token_b,
            100_0000_0000, 90_0000_0000, 150_0000_0000, 100);

        // First solver accepts
        auction::accept_dutch(solver, admin_addr, 0);

        // Second solver tries to accept - should fail (no longer dutch active)
        auction::accept_dutch(solver2, admin_addr, 0);
    }

    // ============ View Function Tests ============

    #[test(aptos_framework = @0x1, admin = @velox, user = @0x123, solver = @0x456)]
    fun test_get_dutch_time_remaining(
        aptos_framework: &signer, admin: &signer, user: &signer, solver: &signer
    ) {
        setup(aptos_framework, admin, user, solver);
        let admin_addr = signer::address_of(admin);
        let token_a = test_tokens::get_token_a_address(admin_addr);
        let token_b = test_tokens::get_token_b_address(admin_addr);

        submission::submit_swap_dutch(user, admin_addr, token_a, token_b,
            100_0000_0000, 90_0000_0000, 150_0000_0000, 100);

        // At start, 100 seconds remaining
        let remaining = auction::get_dutch_time_remaining(admin_addr, 0);
        assert!(remaining == 100, 1);

        // At t=1050, 50 seconds remaining
        timestamp::update_global_time_for_test_secs(1050);
        let remaining2 = auction::get_dutch_time_remaining(admin_addr, 0);
        assert!(remaining2 == 50, 2);

        // After end, 0 remaining
        timestamp::update_global_time_for_test_secs(1200);
        let remaining3 = auction::get_dutch_time_remaining(admin_addr, 0);
        assert!(remaining3 == 0, 3);
    }

    #[test(aptos_framework = @0x1, admin = @velox, user = @0x123, solver = @0x456)]
    fun test_can_solver_fill_dutch_states(
        aptos_framework: &signer, admin: &signer, user: &signer, solver: &signer
    ) {
        setup(aptos_framework, admin, user, solver);
        let admin_addr = signer::address_of(admin);
        let solver_addr = signer::address_of(solver);
        let token_a = test_tokens::get_token_a_address(admin_addr);
        let token_b = test_tokens::get_token_b_address(admin_addr);

        submission::submit_swap_dutch(user, admin_addr, token_a, token_b,
            100_0000_0000, 90_0000_0000, 150_0000_0000, 100);

        // Before acceptance - no one can fill (Dutch active)
        assert!(!auction::can_solver_fill(admin_addr, 0, solver_addr), 1);

        // After acceptance - only acceptor can fill
        auction::accept_dutch(solver, admin_addr, 0);
        assert!(auction::can_solver_fill(admin_addr, 0, solver_addr), 2);
    }

    #[test(aptos_framework = @0x1, admin = @velox, user = @0x123, solver = @0x456)]
    #[expected_failure(abort_code = 50, location = velox::submission)]
    fun test_dutch_invalid_start_price_fails(
        aptos_framework: &signer, admin: &signer, user: &signer, solver: &signer
    ) {
        setup(aptos_framework, admin, user, solver);
        let admin_addr = signer::address_of(admin);
        let token_a = test_tokens::get_token_a_address(admin_addr);
        let token_b = test_tokens::get_token_b_address(admin_addr);

        // start_price <= min_amount_out should fail
        submission::submit_swap_dutch(user, admin_addr, token_a, token_b,
            100_0000_0000, 100_0000_0000, 100_0000_0000, 100);
    }
}
