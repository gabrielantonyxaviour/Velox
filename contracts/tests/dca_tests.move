/// DCA Intent Edge Case Tests
/// Tests dollar-cost averaging execution, period timing, and cancellation
#[test_only]
module velox::dca_tests {
    use std::signer;
    use aptos_framework::account;
    use aptos_framework::timestamp;
    use velox::test_tokens;
    use velox::submission;
    use velox::settlement;
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

        test_tokens::mint_token_a(admin, signer::address_of(user), 100000_0000_0000);
        test_tokens::mint_token_b(admin, signer::address_of(solver), 100000_0000_0000);
    }

    // ============ Submission Tests ============

    #[test(aptos_framework = @0x1, admin = @velox, user = @0x123, solver = @0x456)]
    fun test_dca_with_1_period(
        aptos_framework: &signer, admin: &signer, user: &signer, solver: &signer
    ) {
        setup(aptos_framework, admin, user, solver);
        let admin_addr = signer::address_of(admin);
        let token_a = test_tokens::get_token_a_address(admin_addr);
        let token_b = test_tokens::get_token_b_address(admin_addr);

        // Single period DCA (essentially a swap)
        submission::submit_dca(user, admin_addr, token_a, token_b,
            100_0000_0000, 1, 86400);

        let record = submission::borrow_intent(admin_addr, 0);
        assert!(types::is_dca(types::get_intent_ref(&record)), 1);
        assert!(types::get_dca_total_periods(types::get_intent_ref(&record)) == 1, 2);
    }

    #[test(aptos_framework = @0x1, admin = @velox, user = @0x123, solver = @0x456)]
    fun test_dca_with_365_periods_1_year_daily(
        aptos_framework: &signer, admin: &signer, user: &signer, solver: &signer
    ) {
        setup(aptos_framework, admin, user, solver);
        let admin_addr = signer::address_of(admin);
        let token_a = test_tokens::get_token_a_address(admin_addr);
        let token_b = test_tokens::get_token_b_address(admin_addr);

        // 1 year daily DCA
        submission::submit_dca(user, admin_addr, token_a, token_b,
            10_0000_0000, 365, 86400);

        let record = submission::borrow_intent(admin_addr, 0);
        assert!(types::get_dca_total_periods(types::get_intent_ref(&record)) == 365, 1);
        assert!(types::get_dca_amount_per_period(types::get_intent_ref(&record)) == 10_0000_0000, 2);
    }

    #[test(aptos_framework = @0x1, admin = @velox, user = @0x123, solver = @0x456)]
    fun test_dca_escrow_calculation(
        aptos_framework: &signer, admin: &signer, user: &signer, solver: &signer
    ) {
        setup(aptos_framework, admin, user, solver);
        let admin_addr = signer::address_of(admin);
        let user_addr = signer::address_of(user);
        let token_a = test_tokens::get_token_a_address(admin_addr);
        let token_b = test_tokens::get_token_b_address(admin_addr);

        let balance_before = test_tokens::get_token_a_balance(admin_addr, user_addr);

        // 10 per period * 5 periods = 50 total escrowed
        submission::submit_dca(user, admin_addr, token_a, token_b,
            10_0000_0000, 5, 86400);

        let balance_after = test_tokens::get_token_a_balance(admin_addr, user_addr);
        assert!(balance_before - balance_after == 50_0000_0000, 1);
    }

    #[test(aptos_framework = @0x1, admin = @velox, user = @0x123, solver = @0x456)]
    #[expected_failure(abort_code = 84, location = velox::submission)]
    fun test_dca_zero_periods_fails(
        aptos_framework: &signer, admin: &signer, user: &signer, solver: &signer
    ) {
        setup(aptos_framework, admin, user, solver);
        let admin_addr = signer::address_of(admin);
        let token_a = test_tokens::get_token_a_address(admin_addr);
        let token_b = test_tokens::get_token_b_address(admin_addr);

        submission::submit_dca(user, admin_addr, token_a, token_b,
            100_0000_0000, 0, 86400);
    }

    #[test(aptos_framework = @0x1, admin = @velox, user = @0x123, solver = @0x456)]
    #[expected_failure(abort_code = 83, location = velox::submission)]
    fun test_dca_zero_interval_fails(
        aptos_framework: &signer, admin: &signer, user: &signer, solver: &signer
    ) {
        setup(aptos_framework, admin, user, solver);
        let admin_addr = signer::address_of(admin);
        let token_a = test_tokens::get_token_a_address(admin_addr);
        let token_b = test_tokens::get_token_b_address(admin_addr);

        submission::submit_dca(user, admin_addr, token_a, token_b,
            100_0000_0000, 5, 0);
    }

    #[test(aptos_framework = @0x1, admin = @velox, user = @0x123, solver = @0x456)]
    #[expected_failure(abort_code = 10, location = velox::submission)]
    fun test_dca_zero_amount_fails(
        aptos_framework: &signer, admin: &signer, user: &signer, solver: &signer
    ) {
        setup(aptos_framework, admin, user, solver);
        let admin_addr = signer::address_of(admin);
        let token_a = test_tokens::get_token_a_address(admin_addr);
        let token_b = test_tokens::get_token_b_address(admin_addr);

        submission::submit_dca(user, admin_addr, token_a, token_b,
            0, 5, 86400);
    }

    // ============ Execution Tests ============

    #[test(aptos_framework = @0x1, admin = @velox, user = @0x123, solver = @0x456)]
    #[expected_failure(abort_code = 81, location = velox::settlement)]
    fun test_period_before_interval_fails(
        aptos_framework: &signer, admin: &signer, user: &signer, solver: &signer
    ) {
        setup(aptos_framework, admin, user, solver);
        let admin_addr = signer::address_of(admin);
        let token_a = test_tokens::get_token_a_address(admin_addr);
        let token_b = test_tokens::get_token_b_address(admin_addr);

        submission::submit_dca(user, admin_addr, token_a, token_b,
            10_0000_0000, 5, 86400);

        // First period should be executable immediately (start_time = now)
        settlement::fill_dca_period(solver, admin_addr, admin_addr, 0, 10_0000_0000);

        // Second period should fail - need to wait
        settlement::fill_dca_period(solver, admin_addr, admin_addr, 0, 10_0000_0000);
    }

    #[test(aptos_framework = @0x1, admin = @velox, user = @0x123, solver = @0x456)]
    fun test_execute_all_periods_in_sequence(
        aptos_framework: &signer, admin: &signer, user: &signer, solver: &signer
    ) {
        setup(aptos_framework, admin, user, solver);
        let admin_addr = signer::address_of(admin);
        let token_a = test_tokens::get_token_a_address(admin_addr);
        let token_b = test_tokens::get_token_b_address(admin_addr);

        let start = timestamp::now_seconds();
        submission::submit_dca(user, admin_addr, token_a, token_b,
            10_0000_0000, 5, 60); // 60 second intervals for testing

        // Execute first period at start time
        settlement::fill_dca_period(solver, admin_addr, admin_addr, 0, 10_0000_0000);

        // Execute remaining periods at their respective intervals
        let i = 1;
        while (i < 5) {
            timestamp::update_global_time_for_test_secs(start + (i * 60));
            settlement::fill_dca_period(solver, admin_addr, admin_addr, 0, 10_0000_0000);
            i = i + 1;
        };

        let record = submission::borrow_intent(admin_addr, 0);
        assert!(types::is_filled(types::get_record_status(&record)), 1);
        assert!(types::get_chunks_executed(&record) == 5, 2);
    }

    #[test(aptos_framework = @0x1, admin = @velox, user = @0x123, solver = @0x456)]
    fun test_dca_period_timing(
        aptos_framework: &signer, admin: &signer, user: &signer, solver: &signer
    ) {
        setup(aptos_framework, admin, user, solver);
        let admin_addr = signer::address_of(admin);
        let token_a = test_tokens::get_token_a_address(admin_addr);
        let token_b = test_tokens::get_token_b_address(admin_addr);

        let start = timestamp::now_seconds();
        submission::submit_dca(user, admin_addr, token_a, token_b,
            10_0000_0000, 5, 100);

        // Execute first period
        settlement::fill_dca_period(solver, admin_addr, admin_addr, 0, 10_0000_0000);

        let record = submission::borrow_intent(admin_addr, 0);
        // Next execution should be start + 100
        assert!(types::get_next_execution(&record) == start + 100, 1);

        // Advance to exact next execution time
        timestamp::update_global_time_for_test_secs(start + 100);
        settlement::fill_dca_period(solver, admin_addr, admin_addr, 0, 10_0000_0000);

        let record2 = submission::borrow_intent(admin_addr, 0);
        assert!(types::get_chunks_executed(&record2) == 2, 2);
    }

    // ============ Cancellation Tests ============

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
            10_0000_0000, 5, 60);

        // Execute 2 periods
        settlement::fill_dca_period(solver, admin_addr, admin_addr, 0, 10_0000_0000);
        timestamp::update_global_time_for_test_secs(start + 60);
        settlement::fill_dca_period(solver, admin_addr, admin_addr, 0, 10_0000_0000);

        // Cancel - should refund remaining 30
        submission::cancel_intent(user, admin_addr, 0);

        let record = submission::borrow_intent(admin_addr, 0);
        assert!(types::is_cancelled(types::get_record_status(&record)), 1);

        let balance_after = test_tokens::get_token_a_balance(admin_addr, user_addr);
        // Escrowed 50, lost 20 (2 periods) minus fee, refunded ~30
        assert!(balance_before - balance_after < 25_0000_0000, 2);
    }

    #[test(aptos_framework = @0x1, admin = @velox, user = @0x123, solver = @0x456)]
    #[expected_failure(abort_code = 5, location = velox::settlement)]
    fun test_dca_all_periods_completed_extra_fails(
        aptos_framework: &signer, admin: &signer, user: &signer, solver: &signer
    ) {
        setup(aptos_framework, admin, user, solver);
        let admin_addr = signer::address_of(admin);
        let token_a = test_tokens::get_token_a_address(admin_addr);
        let token_b = test_tokens::get_token_b_address(admin_addr);

        let start = timestamp::now_seconds();
        submission::submit_dca(user, admin_addr, token_a, token_b,
            10_0000_0000, 3, 60);

        // Execute first period at start time
        settlement::fill_dca_period(solver, admin_addr, admin_addr, 0, 10_0000_0000);

        // Execute remaining 2 periods
        let i = 1;
        while (i < 3) {
            timestamp::update_global_time_for_test_secs(start + (i * 60));
            settlement::fill_dca_period(solver, admin_addr, admin_addr, 0, 10_0000_0000);
            i = i + 1;
        };

        // Try 4th period - should fail with intent_not_active (status is Filled)
        timestamp::update_global_time_for_test_secs(start + 180);
        settlement::fill_dca_period(solver, admin_addr, admin_addr, 0, 10_0000_0000);
    }

    #[test(aptos_framework = @0x1, admin = @velox, user = @0x123, solver = @0x456)]
    fun test_dca_output_varies_per_period(
        aptos_framework: &signer, admin: &signer, user: &signer, solver: &signer
    ) {
        setup(aptos_framework, admin, user, solver);
        let admin_addr = signer::address_of(admin);
        let user_addr = signer::address_of(user);
        let token_a = test_tokens::get_token_a_address(admin_addr);
        let token_b = test_tokens::get_token_b_address(admin_addr);

        let start = timestamp::now_seconds();
        submission::submit_dca(user, admin_addr, token_a, token_b,
            10_0000_0000, 3, 60);

        // Period 1: 10 input, 12 output (good rate)
        settlement::fill_dca_period(solver, admin_addr, admin_addr, 0, 12_0000_0000);

        timestamp::update_global_time_for_test_secs(start + 60);
        // Period 2: 10 input, 8 output (worse rate)
        settlement::fill_dca_period(solver, admin_addr, admin_addr, 0, 8_0000_0000);

        timestamp::update_global_time_for_test_secs(start + 120);
        // Period 3: 10 input, 10 output (1:1)
        settlement::fill_dca_period(solver, admin_addr, admin_addr, 0, 10_0000_0000);

        let record = submission::borrow_intent(admin_addr, 0);
        assert!(types::is_filled(types::get_record_status(&record)), 1);

        // Total output should be 12 + 8 + 10 = 30
        let user_balance = test_tokens::get_token_b_balance(admin_addr, user_addr);
        assert!(user_balance == 30_0000_0000, 2);
    }

    #[test(aptos_framework = @0x1, admin = @velox, user = @0x123, solver = @0x456)]
    fun test_dca_large_total_amount(
        aptos_framework: &signer, admin: &signer, user: &signer, solver: &signer
    ) {
        setup(aptos_framework, admin, user, solver);
        let admin_addr = signer::address_of(admin);
        let token_a = test_tokens::get_token_a_address(admin_addr);
        let token_b = test_tokens::get_token_b_address(admin_addr);

        // Large amounts: 1000 per period * 10 periods = 10000 total
        submission::submit_dca(user, admin_addr, token_a, token_b,
            1000_0000_0000, 10, 60);

        let record = submission::borrow_intent(admin_addr, 0);
        assert!(types::get_escrow_remaining(&record) == 10000_0000_0000, 1);
    }
}
