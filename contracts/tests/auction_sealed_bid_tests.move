/// Sealed Bid Auction Edge Case Tests
/// Tests bid submission, auction completion, winner selection, and fill deadline
#[test_only]
module velox::auction_sealed_bid_tests {
    use std::signer;
    use std::vector;
    use aptos_framework::account;
    use aptos_framework::timestamp;
    use velox::test_tokens;
    use velox::submission;
    use velox::settlement;
    use velox::auction;
    use velox::types;

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

    // ============ Bid Submission Tests ============

    #[test(aptos_framework = @0x1, admin = @velox, user = @0x123, solver = @0x456)]
    fun test_bid_at_exactly_min_output(
        aptos_framework: &signer, admin: &signer, user: &signer, solver: &signer
    ) {
        setup(aptos_framework, admin, user, solver);
        let admin_addr = signer::address_of(admin);
        let token_a = test_tokens::get_token_a_address(admin_addr);
        let token_b = test_tokens::get_token_b_address(admin_addr);

        // Submit sealed bid swap with min 90 output
        submission::submit_swap_sealed_bid(user, admin_addr, token_a, token_b,
            100_0000_0000, 90_0000_0000, timestamp::now_seconds() + 3600, 300);

        // Bid exactly at min output
        auction::submit_bid(solver, admin_addr, 0, 90_0000_0000);

        let bids = auction::get_bids(admin_addr, 0);
        assert!(vector::length(&bids) == 1, 1);
    }

    #[test(aptos_framework = @0x1, admin = @velox, user = @0x123, solver = @0x456)]
    #[expected_failure(abort_code = 48, location = velox::auction)]
    fun test_bid_below_min_output_fails(
        aptos_framework: &signer, admin: &signer, user: &signer, solver: &signer
    ) {
        setup(aptos_framework, admin, user, solver);
        let admin_addr = signer::address_of(admin);
        let token_a = test_tokens::get_token_a_address(admin_addr);
        let token_b = test_tokens::get_token_b_address(admin_addr);

        submission::submit_swap_sealed_bid(user, admin_addr, token_a, token_b,
            100_0000_0000, 90_0000_0000, timestamp::now_seconds() + 3600, 300);

        // Bid 1 wei below min - should fail
        auction::submit_bid(solver, admin_addr, 0, 90_0000_0000 - 1);
    }

    #[test(aptos_framework = @0x1, admin = @velox, user = @0x123, solver = @0x456)]
    #[expected_failure(abort_code = 41, location = velox::auction)]
    fun test_bid_after_auction_ended_fails(
        aptos_framework: &signer, admin: &signer, user: &signer, solver: &signer
    ) {
        setup(aptos_framework, admin, user, solver);
        let admin_addr = signer::address_of(admin);
        let token_a = test_tokens::get_token_a_address(admin_addr);
        let token_b = test_tokens::get_token_b_address(admin_addr);

        // 100 second auction
        submission::submit_swap_sealed_bid(user, admin_addr, token_a, token_b,
            100_0000_0000, 90_0000_0000, timestamp::now_seconds() + 3600, 100);

        // Advance past auction end
        timestamp::update_global_time_for_test_secs(1200);

        // Bid should fail - auction ended
        auction::submit_bid(solver, admin_addr, 0, 100_0000_0000);
    }

    #[test(aptos_framework = @0x1, admin = @velox, user = @0x123, solver = @0x456, solver2 = @0x789)]
    #[expected_failure(abort_code = 42, location = velox::auction)]
    fun test_same_solver_bids_twice_fails(
        aptos_framework: &signer, admin: &signer, user: &signer,
        solver: &signer, solver2: &signer
    ) {
        setup_with_solver2(aptos_framework, admin, user, solver, solver2);
        let admin_addr = signer::address_of(admin);
        let token_a = test_tokens::get_token_a_address(admin_addr);
        let token_b = test_tokens::get_token_b_address(admin_addr);

        submission::submit_swap_sealed_bid(user, admin_addr, token_a, token_b,
            100_0000_0000, 90_0000_0000, timestamp::now_seconds() + 3600, 300);

        // First bid
        auction::submit_bid(solver, admin_addr, 0, 100_0000_0000);
        // Second bid from same solver - should fail
        auction::submit_bid(solver, admin_addr, 0, 110_0000_0000);
    }

    #[test(aptos_framework = @0x1, admin = @velox, user = @0x123, solver = @0x456, solver2 = @0x789)]
    fun test_multiple_solvers_bid_highest_wins(
        aptos_framework: &signer, admin: &signer, user: &signer,
        solver: &signer, solver2: &signer
    ) {
        setup_with_solver2(aptos_framework, admin, user, solver, solver2);
        let admin_addr = signer::address_of(admin);
        let solver2_addr = signer::address_of(solver2);
        let token_a = test_tokens::get_token_a_address(admin_addr);
        let token_b = test_tokens::get_token_b_address(admin_addr);

        submission::submit_swap_sealed_bid(user, admin_addr, token_a, token_b,
            100_0000_0000, 90_0000_0000, timestamp::now_seconds() + 3600, 100);

        // Solver 1 bids 100
        auction::submit_bid(solver, admin_addr, 0, 100_0000_0000);
        // Solver 2 bids 110 (higher)
        auction::submit_bid(solver2, admin_addr, 0, 110_0000_0000);

        // Advance past auction end
        timestamp::update_global_time_for_test_secs(1200);

        // Complete auction
        auction::complete_sealed_bid(admin_addr, 0);

        let (has_winner, winner) = auction::get_winner(admin_addr, 0);
        assert!(has_winner, 1);
        assert!(winner == solver2_addr, 2);
    }

    // ============ Auction Completion Tests ============

    #[test(aptos_framework = @0x1, admin = @velox, user = @0x123, solver = @0x456)]
    fun test_complete_auction_with_0_bids_fails_auction(
        aptos_framework: &signer, admin: &signer, user: &signer, solver: &signer
    ) {
        setup(aptos_framework, admin, user, solver);
        let admin_addr = signer::address_of(admin);
        let token_a = test_tokens::get_token_a_address(admin_addr);
        let token_b = test_tokens::get_token_b_address(admin_addr);

        submission::submit_swap_sealed_bid(user, admin_addr, token_a, token_b,
            100_0000_0000, 90_0000_0000, timestamp::now_seconds() + 3600, 100);

        // Advance past auction end
        timestamp::update_global_time_for_test_secs(1200);

        // Complete with no bids - should mark as failed
        auction::complete_sealed_bid(admin_addr, 0);

        let auction_state = submission::get_auction_state(admin_addr, 0);
        assert!(types::is_auction_failed(&auction_state), 1);
    }

    #[test(aptos_framework = @0x1, admin = @velox, user = @0x123, solver = @0x456)]
    fun test_complete_auction_with_1_bid(
        aptos_framework: &signer, admin: &signer, user: &signer, solver: &signer
    ) {
        setup(aptos_framework, admin, user, solver);
        let admin_addr = signer::address_of(admin);
        let solver_addr = signer::address_of(solver);
        let token_a = test_tokens::get_token_a_address(admin_addr);
        let token_b = test_tokens::get_token_b_address(admin_addr);

        submission::submit_swap_sealed_bid(user, admin_addr, token_a, token_b,
            100_0000_0000, 90_0000_0000, timestamp::now_seconds() + 3600, 100);

        auction::submit_bid(solver, admin_addr, 0, 100_0000_0000);

        timestamp::update_global_time_for_test_secs(1200);
        auction::complete_sealed_bid(admin_addr, 0);

        let (has_winner, winner) = auction::get_winner(admin_addr, 0);
        assert!(has_winner, 1);
        assert!(winner == solver_addr, 2);
    }

    #[test(aptos_framework = @0x1, admin = @velox, user = @0x123, solver = @0x456)]
    #[expected_failure(abort_code = 42, location = velox::auction)]
    fun test_complete_before_end_time_fails(
        aptos_framework: &signer, admin: &signer, user: &signer, solver: &signer
    ) {
        setup(aptos_framework, admin, user, solver);
        let admin_addr = signer::address_of(admin);
        let token_a = test_tokens::get_token_a_address(admin_addr);
        let token_b = test_tokens::get_token_b_address(admin_addr);

        submission::submit_swap_sealed_bid(user, admin_addr, token_a, token_b,
            100_0000_0000, 90_0000_0000, timestamp::now_seconds() + 3600, 300);

        auction::submit_bid(solver, admin_addr, 0, 100_0000_0000);

        // Try to complete before end time
        auction::complete_sealed_bid(admin_addr, 0);
    }

    // ============ Fill After Auction Tests ============

    #[test(aptos_framework = @0x1, admin = @velox, user = @0x123, solver = @0x456, solver2 = @0x789)]
    #[expected_failure(abort_code = 24, location = velox::settlement)]
    fun test_fill_by_non_winner_fails(
        aptos_framework: &signer, admin: &signer, user: &signer,
        solver: &signer, solver2: &signer
    ) {
        setup_with_solver2(aptos_framework, admin, user, solver, solver2);
        let admin_addr = signer::address_of(admin);
        let token_a = test_tokens::get_token_a_address(admin_addr);
        let token_b = test_tokens::get_token_b_address(admin_addr);

        submission::submit_swap_sealed_bid(user, admin_addr, token_a, token_b,
            100_0000_0000, 90_0000_0000, timestamp::now_seconds() + 3600, 100);

        // Solver 1 wins with higher bid
        auction::submit_bid(solver, admin_addr, 0, 110_0000_0000);
        auction::submit_bid(solver2, admin_addr, 0, 100_0000_0000);

        timestamp::update_global_time_for_test_secs(1200);
        auction::complete_sealed_bid(admin_addr, 0);

        // Solver 2 (loser) tries to fill - should fail
        settlement::fill_swap(solver2, admin_addr, admin_addr, 0,
            100_0000_0000, 100_0000_0000);
    }

    #[test(aptos_framework = @0x1, admin = @velox, user = @0x123, solver = @0x456)]
    fun test_winner_fills_successfully(
        aptos_framework: &signer, admin: &signer, user: &signer, solver: &signer
    ) {
        setup(aptos_framework, admin, user, solver);
        let admin_addr = signer::address_of(admin);
        let token_a = test_tokens::get_token_a_address(admin_addr);
        let token_b = test_tokens::get_token_b_address(admin_addr);

        submission::submit_swap_sealed_bid(user, admin_addr, token_a, token_b,
            100_0000_0000, 90_0000_0000, timestamp::now_seconds() + 3600, 100);

        auction::submit_bid(solver, admin_addr, 0, 100_0000_0000);

        timestamp::update_global_time_for_test_secs(1200);
        auction::complete_sealed_bid(admin_addr, 0);

        // Winner fills
        settlement::fill_swap(solver, admin_addr, admin_addr, 0,
            100_0000_0000, 100_0000_0000);

        let record = submission::borrow_intent(admin_addr, 0);
        assert!(types::is_filled(types::get_record_status(&record)), 1);
    }

    // ============ Fill Deadline Tests ============

    #[test(aptos_framework = @0x1, admin = @velox, user = @0x123, solver = @0x456)]
    fun test_expire_fill_deadline_no_fills_marks_failed(
        aptos_framework: &signer, admin: &signer, user: &signer, solver: &signer
    ) {
        setup(aptos_framework, admin, user, solver);
        let admin_addr = signer::address_of(admin);
        let token_a = test_tokens::get_token_a_address(admin_addr);
        let token_b = test_tokens::get_token_b_address(admin_addr);

        submission::submit_swap_sealed_bid(user, admin_addr, token_a, token_b,
            100_0000_0000, 90_0000_0000, timestamp::now_seconds() + 3600, 100);

        auction::submit_bid(solver, admin_addr, 0, 100_0000_0000);

        // Complete auction at t=1100
        timestamp::update_global_time_for_test_secs(1100);
        auction::complete_sealed_bid(admin_addr, 0);

        // Advance past fill deadline (default 300 seconds)
        timestamp::update_global_time_for_test_secs(1500);

        // Expire fill deadline
        auction::expire_fill_deadline(admin_addr, 0);

        let auction_state = submission::get_auction_state(admin_addr, 0);
        assert!(types::is_auction_failed(&auction_state), 1);
    }

    #[test(aptos_framework = @0x1, admin = @velox, user = @0x123, solver = @0x456)]
    #[expected_failure(abort_code = 92, location = velox::auction)]
    fun test_expire_fill_deadline_before_deadline_fails(
        aptos_framework: &signer, admin: &signer, user: &signer, solver: &signer
    ) {
        setup(aptos_framework, admin, user, solver);
        let admin_addr = signer::address_of(admin);
        let token_a = test_tokens::get_token_a_address(admin_addr);
        let token_b = test_tokens::get_token_b_address(admin_addr);

        submission::submit_swap_sealed_bid(user, admin_addr, token_a, token_b,
            100_0000_0000, 90_0000_0000, timestamp::now_seconds() + 3600, 100);

        auction::submit_bid(solver, admin_addr, 0, 100_0000_0000);

        timestamp::update_global_time_for_test_secs(1100);
        auction::complete_sealed_bid(admin_addr, 0);

        // Try to expire before deadline
        auction::expire_fill_deadline(admin_addr, 0);
    }

    #[test(aptos_framework = @0x1, admin = @velox, user = @0x123, solver = @0x456, solver2 = @0x789)]
    fun test_tie_breaking_first_bidder_wins(
        aptos_framework: &signer, admin: &signer, user: &signer,
        solver: &signer, solver2: &signer
    ) {
        setup_with_solver2(aptos_framework, admin, user, solver, solver2);
        let admin_addr = signer::address_of(admin);
        let solver_addr = signer::address_of(solver);
        let token_a = test_tokens::get_token_a_address(admin_addr);
        let token_b = test_tokens::get_token_b_address(admin_addr);

        submission::submit_swap_sealed_bid(user, admin_addr, token_a, token_b,
            100_0000_0000, 90_0000_0000, timestamp::now_seconds() + 3600, 100);

        // Both bid same amount - first bidder should win
        auction::submit_bid(solver, admin_addr, 0, 100_0000_0000);
        auction::submit_bid(solver2, admin_addr, 0, 100_0000_0000);

        timestamp::update_global_time_for_test_secs(1200);
        auction::complete_sealed_bid(admin_addr, 0);

        let (has_winner, winner) = auction::get_winner(admin_addr, 0);
        assert!(has_winner, 1);
        // First bidder wins ties (based on find_best_bid logic)
        assert!(winner == solver_addr, 2);
    }
}
