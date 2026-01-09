/// Cancellation Edge Case Tests
/// Tests intent cancellation in various states and conditions
#[test_only]
module velox::cancellation_tests {
    use std::signer;
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

    // ============ Basic Cancellation Tests ============

    #[test(aptos_framework = @0x1, admin = @velox, user = @0x123, solver = @0x456)]
    fun test_cancel_pending_intent_full_refund(
        aptos_framework: &signer, admin: &signer, user: &signer, solver: &signer
    ) {
        setup(aptos_framework, admin, user, solver);
        let admin_addr = signer::address_of(admin);
        let user_addr = signer::address_of(user);
        let token_a = test_tokens::get_token_a_address(admin_addr);
        let token_b = test_tokens::get_token_b_address(admin_addr);

        let balance_before = test_tokens::get_token_a_balance(admin_addr, user_addr);

        submission::submit_swap(user, admin_addr, token_a, token_b,
            100_0000_0000, 90_0000_0000, timestamp::now_seconds() + 3600);

        let balance_after_submit = test_tokens::get_token_a_balance(admin_addr, user_addr);
        assert!(balance_before - balance_after_submit == 100_0000_0000, 1);

        // Cancel and get full refund
        submission::cancel_intent(user, admin_addr, 0);

        let balance_after_cancel = test_tokens::get_token_a_balance(admin_addr, user_addr);
        assert!(balance_after_cancel == balance_before, 2);

        let record = submission::borrow_intent(admin_addr, 0);
        assert!(types::is_cancelled(types::get_record_status(&record)), 3);
    }

    #[test(aptos_framework = @0x1, admin = @velox, user = @0x123, solver = @0x456)]
    fun test_cancel_partially_filled_intent_partial_refund(
        aptos_framework: &signer, admin: &signer, user: &signer, solver: &signer
    ) {
        setup(aptos_framework, admin, user, solver);
        let admin_addr = signer::address_of(admin);
        let user_addr = signer::address_of(user);
        let token_a = test_tokens::get_token_a_address(admin_addr);
        let token_b = test_tokens::get_token_b_address(admin_addr);

        let balance_before = test_tokens::get_token_a_balance(admin_addr, user_addr);

        submission::submit_swap(user, admin_addr, token_a, token_b,
            100_0000_0000, 90_0000_0000, timestamp::now_seconds() + 3600);

        // Partial fill 30%
        settlement::fill_swap(solver, admin_addr, admin_addr, 0, 30_0000_0000, 27_0000_0000);

        submission::cancel_intent(user, admin_addr, 0);

        let balance_after_cancel = test_tokens::get_token_a_balance(admin_addr, user_addr);
        // Received back ~70 (minus any fees on the 30 filled)
        let expected_remaining = balance_before - 30_0000_0000; // Lost 30 to fill
        // Allow for fee tolerance
        assert!(balance_after_cancel >= expected_remaining - 1_0000_0000, 1);
    }

    #[test(aptos_framework = @0x1, admin = @velox, user = @0x123, solver = @0x456)]
    #[expected_failure(abort_code = 5, location = velox::submission)]
    fun test_cancel_filled_intent_fails(
        aptos_framework: &signer, admin: &signer, user: &signer, solver: &signer
    ) {
        setup(aptos_framework, admin, user, solver);
        let admin_addr = signer::address_of(admin);
        let token_a = test_tokens::get_token_a_address(admin_addr);
        let token_b = test_tokens::get_token_b_address(admin_addr);

        submission::submit_swap(user, admin_addr, token_a, token_b,
            100_0000_0000, 90_0000_0000, timestamp::now_seconds() + 3600);

        // Full fill
        settlement::fill_swap(solver, admin_addr, admin_addr, 0, 100_0000_0000, 100_0000_0000);

        // Cancel should fail - already filled
        submission::cancel_intent(user, admin_addr, 0);
    }

    #[test(aptos_framework = @0x1, admin = @velox, user = @0x123, solver = @0x456)]
    #[expected_failure(abort_code = 5, location = velox::submission)]
    fun test_cancel_cancelled_intent_fails(
        aptos_framework: &signer, admin: &signer, user: &signer, solver: &signer
    ) {
        setup(aptos_framework, admin, user, solver);
        let admin_addr = signer::address_of(admin);
        let token_a = test_tokens::get_token_a_address(admin_addr);
        let token_b = test_tokens::get_token_b_address(admin_addr);

        submission::submit_swap(user, admin_addr, token_a, token_b,
            100_0000_0000, 90_0000_0000, timestamp::now_seconds() + 3600);

        submission::cancel_intent(user, admin_addr, 0);

        // Cancel again should fail
        submission::cancel_intent(user, admin_addr, 0);
    }

    // ============ Auction Cancellation Tests ============

    #[test(aptos_framework = @0x1, admin = @velox, user = @0x123, solver = @0x456)]
    fun test_cancel_during_active_sealed_bid_auction(
        aptos_framework: &signer, admin: &signer, user: &signer, solver: &signer
    ) {
        setup(aptos_framework, admin, user, solver);
        let admin_addr = signer::address_of(admin);
        let user_addr = signer::address_of(user);
        let token_a = test_tokens::get_token_a_address(admin_addr);
        let token_b = test_tokens::get_token_b_address(admin_addr);

        let balance_before = test_tokens::get_token_a_balance(admin_addr, user_addr);

        submission::submit_swap_sealed_bid(user, admin_addr, token_a, token_b,
            100_0000_0000, 90_0000_0000, timestamp::now_seconds() + 3600, 300);

        // Solver submits bid
        auction::submit_bid(solver, admin_addr, 0, 100_0000_0000);

        // User cancels during active auction
        submission::cancel_intent(user, admin_addr, 0);

        let balance_after = test_tokens::get_token_a_balance(admin_addr, user_addr);
        assert!(balance_after == balance_before, 1);

        let record = submission::borrow_intent(admin_addr, 0);
        assert!(types::is_cancelled(types::get_record_status(&record)), 2);
    }

    #[test(aptos_framework = @0x1, admin = @velox, user = @0x123, solver = @0x456)]
    fun test_cancel_during_active_dutch_auction(
        aptos_framework: &signer, admin: &signer, user: &signer, solver: &signer
    ) {
        setup(aptos_framework, admin, user, solver);
        let admin_addr = signer::address_of(admin);
        let user_addr = signer::address_of(user);
        let token_a = test_tokens::get_token_a_address(admin_addr);
        let token_b = test_tokens::get_token_b_address(admin_addr);

        let balance_before = test_tokens::get_token_a_balance(admin_addr, user_addr);

        submission::submit_swap_dutch(user, admin_addr, token_a, token_b,
            100_0000_0000, 90_0000_0000, 150_0000_0000, 300);

        // Advance time but before acceptance
        timestamp::update_global_time_for_test_secs(1100);

        // Cancel during active Dutch auction
        submission::cancel_intent(user, admin_addr, 0);

        let balance_after = test_tokens::get_token_a_balance(admin_addr, user_addr);
        assert!(balance_after == balance_before, 1);
    }

    #[test(aptos_framework = @0x1, admin = @velox, user = @0x123, solver = @0x456)]
    fun test_cancel_after_auction_completed_before_fill(
        aptos_framework: &signer, admin: &signer, user: &signer, solver: &signer
    ) {
        setup(aptos_framework, admin, user, solver);
        let admin_addr = signer::address_of(admin);
        let user_addr = signer::address_of(user);
        let token_a = test_tokens::get_token_a_address(admin_addr);
        let token_b = test_tokens::get_token_b_address(admin_addr);

        let balance_before = test_tokens::get_token_a_balance(admin_addr, user_addr);

        submission::submit_swap_sealed_bid(user, admin_addr, token_a, token_b,
            100_0000_0000, 90_0000_0000, timestamp::now_seconds() + 3600, 100);

        auction::submit_bid(solver, admin_addr, 0, 100_0000_0000);

        // Complete auction
        timestamp::update_global_time_for_test_secs(1200);
        auction::complete_sealed_bid(admin_addr, 0);

        // Cancel before winner fills
        submission::cancel_intent(user, admin_addr, 0);

        let balance_after = test_tokens::get_token_a_balance(admin_addr, user_addr);
        assert!(balance_after == balance_before, 1);
    }

    // ============ Scheduled Intent Cancellation Tests ============

    #[test(aptos_framework = @0x1, admin = @velox, user = @0x123, solver = @0x456)]
    fun test_cancel_twap_mid_execution(
        aptos_framework: &signer, admin: &signer, user: &signer, solver: &signer
    ) {
        setup(aptos_framework, admin, user, solver);
        let admin_addr = signer::address_of(admin);
        let user_addr = signer::address_of(user);
        let token_a = test_tokens::get_token_a_address(admin_addr);
        let token_b = test_tokens::get_token_b_address(admin_addr);

        let balance_before = test_tokens::get_token_a_balance(admin_addr, user_addr);

        let start = timestamp::now_seconds();
        submission::submit_twap(user, admin_addr, token_a, token_b,
            100_0000_0000, 5, 60, 100, start);

        // Execute 2 chunks
        settlement::fill_twap_chunk(solver, admin_addr, admin_addr, 0, 20_0000_0000);
        timestamp::update_global_time_for_test_secs(start + 60);
        settlement::fill_twap_chunk(solver, admin_addr, admin_addr, 0, 20_0000_0000);

        // Cancel mid-execution
        submission::cancel_intent(user, admin_addr, 0);

        let balance_after = test_tokens::get_token_a_balance(admin_addr, user_addr);
        // Lost 40 (2 chunks), refunded ~60
        let lost_amount = balance_before - balance_after;
        assert!(lost_amount >= 39_0000_0000 && lost_amount <= 42_0000_0000, 1);
    }

    #[test(aptos_framework = @0x1, admin = @velox, user = @0x123, solver = @0x456)]
    fun test_cancel_dca_mid_execution(
        aptos_framework: &signer, admin: &signer, user: &signer, solver: &signer
    ) {
        setup(aptos_framework, admin, user, solver);
        let admin_addr = signer::address_of(admin);
        let user_addr = signer::address_of(user);
        let token_a = test_tokens::get_token_a_address(admin_addr);
        let token_b = test_tokens::get_token_b_address(admin_addr);

        let balance_before = test_tokens::get_token_a_balance(admin_addr, user_addr);

        let start = timestamp::now_seconds();
        submission::submit_dca(user, admin_addr, token_a, token_b,
            20_0000_0000, 5, 60);

        // Execute 3 periods
        settlement::fill_dca_period(solver, admin_addr, admin_addr, 0, 20_0000_0000);
        timestamp::update_global_time_for_test_secs(start + 60);
        settlement::fill_dca_period(solver, admin_addr, admin_addr, 0, 20_0000_0000);
        timestamp::update_global_time_for_test_secs(start + 120);
        settlement::fill_dca_period(solver, admin_addr, admin_addr, 0, 20_0000_0000);

        // Cancel with 2 periods remaining
        submission::cancel_intent(user, admin_addr, 0);

        let balance_after = test_tokens::get_token_a_balance(admin_addr, user_addr);
        // Escrowed 100, lost 60 (3 periods), refunded ~40
        let lost_amount = balance_before - balance_after;
        assert!(lost_amount >= 58_0000_0000 && lost_amount <= 62_0000_0000, 1);
    }

    // ============ Authorization Tests ============

    #[test(aptos_framework = @0x1, admin = @velox, user = @0x123, solver = @0x456)]
    #[expected_failure(abort_code = 32, location = velox::submission)]
    fun test_cancel_by_non_owner_fails(
        aptos_framework: &signer, admin: &signer, user: &signer, solver: &signer
    ) {
        setup(aptos_framework, admin, user, solver);
        let admin_addr = signer::address_of(admin);
        let token_a = test_tokens::get_token_a_address(admin_addr);
        let token_b = test_tokens::get_token_b_address(admin_addr);

        submission::submit_swap(user, admin_addr, token_a, token_b,
            100_0000_0000, 90_0000_0000, timestamp::now_seconds() + 3600);

        // Solver tries to cancel user's intent
        submission::cancel_intent(solver, admin_addr, 0);
    }

    #[test(aptos_framework = @0x1, admin = @velox, user = @0x123, solver = @0x456)]
    #[expected_failure(abort_code = 32, location = velox::submission)]
    fun test_admin_cannot_cancel_user_intent(
        aptos_framework: &signer, admin: &signer, user: &signer, solver: &signer
    ) {
        setup(aptos_framework, admin, user, solver);
        let admin_addr = signer::address_of(admin);
        let token_a = test_tokens::get_token_a_address(admin_addr);
        let token_b = test_tokens::get_token_b_address(admin_addr);

        submission::submit_swap(user, admin_addr, token_a, token_b,
            100_0000_0000, 90_0000_0000, timestamp::now_seconds() + 3600);

        // Admin tries to cancel
        submission::cancel_intent(admin, admin_addr, 0);
    }

    // ============ Intent Not Found Tests ============

    #[test(aptos_framework = @0x1, admin = @velox, user = @0x123, solver = @0x456)]
    #[expected_failure(abort_code = 1, location = velox::submission)]
    fun test_cancel_nonexistent_intent_fails(
        aptos_framework: &signer, admin: &signer, user: &signer, solver: &signer
    ) {
        setup(aptos_framework, admin, user, solver);
        let admin_addr = signer::address_of(admin);

        // Try to cancel intent that doesn't exist
        submission::cancel_intent(user, admin_addr, 999);
    }

    // ============ Limit Order Cancellation Tests ============

    #[test(aptos_framework = @0x1, admin = @velox, user = @0x123, solver = @0x456)]
    fun test_cancel_limit_order_full_refund(
        aptos_framework: &signer, admin: &signer, user: &signer, solver: &signer
    ) {
        setup(aptos_framework, admin, user, solver);
        let admin_addr = signer::address_of(admin);
        let user_addr = signer::address_of(user);
        let token_a = test_tokens::get_token_a_address(admin_addr);
        let token_b = test_tokens::get_token_b_address(admin_addr);

        let balance_before = test_tokens::get_token_a_balance(admin_addr, user_addr);

        submission::submit_limit_order(user, admin_addr, token_a, token_b,
            100_0000_0000, 10000, timestamp::now_seconds() + 86400);

        submission::cancel_intent(user, admin_addr, 0);

        let balance_after = test_tokens::get_token_a_balance(admin_addr, user_addr);
        assert!(balance_after == balance_before, 1);
    }

    #[test(aptos_framework = @0x1, admin = @velox, user = @0x123, solver = @0x456)]
    fun test_cancel_limit_order_after_partial_fill(
        aptos_framework: &signer, admin: &signer, user: &signer, solver: &signer
    ) {
        setup(aptos_framework, admin, user, solver);
        let admin_addr = signer::address_of(admin);
        let user_addr = signer::address_of(user);
        let token_a = test_tokens::get_token_a_address(admin_addr);
        let token_b = test_tokens::get_token_b_address(admin_addr);

        let balance_before = test_tokens::get_token_a_balance(admin_addr, user_addr);

        submission::submit_limit_order(user, admin_addr, token_a, token_b,
            100_0000_0000, 10000, timestamp::now_seconds() + 86400);

        // Partial fill 50%
        settlement::fill_limit_order(solver, admin_addr, admin_addr, 0,
            50_0000_0000, 50_0000_0000);

        submission::cancel_intent(user, admin_addr, 0);

        let balance_after = test_tokens::get_token_a_balance(admin_addr, user_addr);
        // Lost ~50 to fill (minus fee), refunded ~50
        let lost = balance_before - balance_after;
        assert!(lost >= 49_0000_0000 && lost <= 52_0000_0000, 1);
    }
}
