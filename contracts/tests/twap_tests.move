/// TWAP Intent Edge Case Tests
/// Tests time-weighted average price execution, chunk timing, and slippage
#[test_only]
module velox::twap_tests {
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

        test_tokens::mint_token_a(admin, signer::address_of(user), 10000_0000_0000);
        test_tokens::mint_token_b(admin, signer::address_of(solver), 10000_0000_0000);
    }

    // ============ Submission Tests ============

    #[test(aptos_framework = @0x1, admin = @velox, user = @0x123, solver = @0x456)]
    fun test_twap_with_1_chunk_degenerate(
        aptos_framework: &signer, admin: &signer, user: &signer, solver: &signer
    ) {
        setup(aptos_framework, admin, user, solver);
        let admin_addr = signer::address_of(admin);
        let token_a = test_tokens::get_token_a_address(admin_addr);
        let token_b = test_tokens::get_token_b_address(admin_addr);

        // Single chunk TWAP (degenerate case - essentially a swap)
        submission::submit_twap(user, admin_addr, token_a, token_b,
            100_0000_0000, 1, 60, 100, timestamp::now_seconds());

        let record = submission::borrow_intent(admin_addr, 0);
        assert!(types::is_twap(types::get_intent_ref(&record)), 1);
        assert!(types::get_twap_num_chunks(types::get_intent_ref(&record)) == 1, 2);
    }

    #[test(aptos_framework = @0x1, admin = @velox, user = @0x123, solver = @0x456)]
    fun test_twap_with_100_chunks(
        aptos_framework: &signer, admin: &signer, user: &signer, solver: &signer
    ) {
        setup(aptos_framework, admin, user, solver);
        let admin_addr = signer::address_of(admin);
        let token_a = test_tokens::get_token_a_address(admin_addr);
        let token_b = test_tokens::get_token_b_address(admin_addr);

        // Large number of chunks
        submission::submit_twap(user, admin_addr, token_a, token_b,
            1000_0000_0000, 100, 60, 100, timestamp::now_seconds());

        let record = submission::borrow_intent(admin_addr, 0);
        assert!(types::get_twap_num_chunks(types::get_intent_ref(&record)) == 100, 1);
        assert!(types::get_twap_chunk_amount(types::get_intent_ref(&record)) == 10_0000_0000, 2);
    }

    #[test(aptos_framework = @0x1, admin = @velox, user = @0x123, solver = @0x456)]
    fun test_twap_non_divisible_amount(
        aptos_framework: &signer, admin: &signer, user: &signer, solver: &signer
    ) {
        setup(aptos_framework, admin, user, solver);
        let admin_addr = signer::address_of(admin);
        let token_a = test_tokens::get_token_a_address(admin_addr);
        let token_b = test_tokens::get_token_b_address(admin_addr);

        // 100 / 3 = 33.33... per chunk (integer division rounds down)
        submission::submit_twap(user, admin_addr, token_a, token_b,
            100_0000_0000, 3, 60, 100, timestamp::now_seconds());

        let record = submission::borrow_intent(admin_addr, 0);
        // chunk_amount = total / num_chunks = 100_0000_0000 / 3 = 33_3333_3333
        assert!(types::get_twap_chunk_amount(types::get_intent_ref(&record)) == 33_3333_3333, 1);
    }

    #[test(aptos_framework = @0x1, admin = @velox, user = @0x123, solver = @0x456)]
    #[expected_failure(abort_code = 84, location = velox::submission)]
    fun test_twap_zero_chunks_fails(
        aptos_framework: &signer, admin: &signer, user: &signer, solver: &signer
    ) {
        setup(aptos_framework, admin, user, solver);
        let admin_addr = signer::address_of(admin);
        let token_a = test_tokens::get_token_a_address(admin_addr);
        let token_b = test_tokens::get_token_b_address(admin_addr);

        submission::submit_twap(user, admin_addr, token_a, token_b,
            100_0000_0000, 0, 60, 100, timestamp::now_seconds());
    }

    #[test(aptos_framework = @0x1, admin = @velox, user = @0x123, solver = @0x456)]
    #[expected_failure(abort_code = 83, location = velox::submission)]
    fun test_twap_zero_interval_fails(
        aptos_framework: &signer, admin: &signer, user: &signer, solver: &signer
    ) {
        setup(aptos_framework, admin, user, solver);
        let admin_addr = signer::address_of(admin);
        let token_a = test_tokens::get_token_a_address(admin_addr);
        let token_b = test_tokens::get_token_b_address(admin_addr);

        submission::submit_twap(user, admin_addr, token_a, token_b,
            100_0000_0000, 5, 0, 100, timestamp::now_seconds());
    }

    // ============ Execution Tests ============

    #[test(aptos_framework = @0x1, admin = @velox, user = @0x123, solver = @0x456)]
    #[expected_failure(abort_code = 80, location = velox::settlement)]
    fun test_chunk_before_interval_fails(
        aptos_framework: &signer, admin: &signer, user: &signer, solver: &signer
    ) {
        setup(aptos_framework, admin, user, solver);
        let admin_addr = signer::address_of(admin);
        let token_a = test_tokens::get_token_a_address(admin_addr);
        let token_b = test_tokens::get_token_b_address(admin_addr);

        // Start time in future
        submission::submit_twap(user, admin_addr, token_a, token_b,
            100_0000_0000, 5, 60, 100, timestamp::now_seconds() + 100);

        // Try to execute immediately - should fail
        settlement::fill_twap_chunk(solver, admin_addr, admin_addr, 0, 20_0000_0000);
    }

    #[test(aptos_framework = @0x1, admin = @velox, user = @0x123, solver = @0x456)]
    fun test_chunk_at_exact_interval_boundary(
        aptos_framework: &signer, admin: &signer, user: &signer, solver: &signer
    ) {
        setup(aptos_framework, admin, user, solver);
        let admin_addr = signer::address_of(admin);
        let token_a = test_tokens::get_token_a_address(admin_addr);
        let token_b = test_tokens::get_token_b_address(admin_addr);

        let start = timestamp::now_seconds();
        submission::submit_twap(user, admin_addr, token_a, token_b,
            100_0000_0000, 5, 60, 100, start);

        // Execute first chunk at start time
        settlement::fill_twap_chunk(solver, admin_addr, admin_addr, 0, 20_0000_0000);

        let record = submission::borrow_intent(admin_addr, 0);
        assert!(types::get_chunks_executed(&record) == 1, 1);

        // Advance exactly to next interval
        timestamp::update_global_time_for_test_secs(start + 60);

        // Second chunk should succeed
        settlement::fill_twap_chunk(solver, admin_addr, admin_addr, 0, 20_0000_0000);

        let record2 = submission::borrow_intent(admin_addr, 0);
        assert!(types::get_chunks_executed(&record2) == 2, 2);
    }

    #[test(aptos_framework = @0x1, admin = @velox, user = @0x123, solver = @0x456)]
    fun test_execute_all_chunks_in_sequence(
        aptos_framework: &signer, admin: &signer, user: &signer, solver: &signer
    ) {
        setup(aptos_framework, admin, user, solver);
        let admin_addr = signer::address_of(admin);
        let token_a = test_tokens::get_token_a_address(admin_addr);
        let token_b = test_tokens::get_token_b_address(admin_addr);

        let start = timestamp::now_seconds();
        submission::submit_twap(user, admin_addr, token_a, token_b,
            100_0000_0000, 5, 60, 100, start);

        // Execute first chunk at start time
        settlement::fill_twap_chunk(solver, admin_addr, admin_addr, 0, 20_0000_0000);

        // Execute remaining chunks at their respective intervals
        let i = 1;
        while (i < 5) {
            timestamp::update_global_time_for_test_secs(start + (i * 60));
            settlement::fill_twap_chunk(solver, admin_addr, admin_addr, 0, 20_0000_0000);
            i = i + 1;
        };

        let record = submission::borrow_intent(admin_addr, 0);
        assert!(types::is_filled(types::get_record_status(&record)), 1);
        assert!(types::get_chunks_executed(&record) == 5, 2);
    }

    #[test(aptos_framework = @0x1, admin = @velox, user = @0x123, solver = @0x456)]
    fun test_skip_chunk_time_passes_for_2_intervals(
        aptos_framework: &signer, admin: &signer, user: &signer, solver: &signer
    ) {
        setup(aptos_framework, admin, user, solver);
        let admin_addr = signer::address_of(admin);
        let token_a = test_tokens::get_token_a_address(admin_addr);
        let token_b = test_tokens::get_token_b_address(admin_addr);

        let start = timestamp::now_seconds();
        submission::submit_twap(user, admin_addr, token_a, token_b,
            100_0000_0000, 5, 60, 100, start);

        // Execute first chunk
        settlement::fill_twap_chunk(solver, admin_addr, admin_addr, 0, 20_0000_0000);

        // Skip 2 intervals (120 seconds)
        timestamp::update_global_time_for_test_secs(start + 120);

        // Execute one chunk (even though 2 intervals passed, only 1 chunk per call)
        settlement::fill_twap_chunk(solver, admin_addr, admin_addr, 0, 20_0000_0000);

        let record = submission::borrow_intent(admin_addr, 0);
        assert!(types::get_chunks_executed(&record) == 2, 1);
    }

    // ============ Slippage Tests ============

    #[test(aptos_framework = @0x1, admin = @velox, user = @0x123, solver = @0x456)]
    fun test_twap_max_slippage_0_no_slippage(
        aptos_framework: &signer, admin: &signer, user: &signer, solver: &signer
    ) {
        setup(aptos_framework, admin, user, solver);
        let admin_addr = signer::address_of(admin);
        let token_a = test_tokens::get_token_a_address(admin_addr);
        let token_b = test_tokens::get_token_b_address(admin_addr);

        // max_slippage = 0 means no slippage allowed
        submission::submit_twap(user, admin_addr, token_a, token_b,
            100_0000_0000, 5, 60, 0, timestamp::now_seconds());

        // Must provide exactly chunk amount (20) as output
        settlement::fill_twap_chunk(solver, admin_addr, admin_addr, 0, 20_0000_0000);

        let record = submission::borrow_intent(admin_addr, 0);
        assert!(types::get_chunks_executed(&record) == 1, 1);
    }

    #[test(aptos_framework = @0x1, admin = @velox, user = @0x123, solver = @0x456)]
    #[expected_failure(abort_code = 12, location = velox::settlement)]
    fun test_twap_slippage_exceeded_fails(
        aptos_framework: &signer, admin: &signer, user: &signer, solver: &signer
    ) {
        setup(aptos_framework, admin, user, solver);
        let admin_addr = signer::address_of(admin);
        let token_a = test_tokens::get_token_a_address(admin_addr);
        let token_b = test_tokens::get_token_b_address(admin_addr);

        // max_slippage = 100 bps = 1%
        submission::submit_twap(user, admin_addr, token_a, token_b,
            100_0000_0000, 5, 60, 100, timestamp::now_seconds());

        // Chunk = 20, min_output with 1% slippage = 19.8
        // Providing 19 should fail (below min)
        settlement::fill_twap_chunk(solver, admin_addr, admin_addr, 0, 19_0000_0000);
    }

    #[test(aptos_framework = @0x1, admin = @velox, user = @0x123, solver = @0x456)]
    fun test_twap_max_slippage_100_percent(
        aptos_framework: &signer, admin: &signer, user: &signer, solver: &signer
    ) {
        setup(aptos_framework, admin, user, solver);
        let admin_addr = signer::address_of(admin);
        let token_a = test_tokens::get_token_a_address(admin_addr);
        let token_b = test_tokens::get_token_b_address(admin_addr);

        // max_slippage = 10000 bps = 100% (any output accepted)
        submission::submit_twap(user, admin_addr, token_a, token_b,
            100_0000_0000, 5, 60, 10000, timestamp::now_seconds());

        // Even 0 output should work with 100% slippage... but min_output = 0
        // Actually with 100% slippage: min = chunk * (10000 - 10000) / 10000 = 0
        settlement::fill_twap_chunk(solver, admin_addr, admin_addr, 0, 1);

        let record = submission::borrow_intent(admin_addr, 0);
        assert!(types::get_chunks_executed(&record) == 1, 1);
    }

    // ============ Cancellation Tests ============

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

        submission::submit_twap(user, admin_addr, token_a, token_b,
            100_0000_0000, 5, 60, 100, timestamp::now_seconds());

        // Execute 2 chunks
        settlement::fill_twap_chunk(solver, admin_addr, admin_addr, 0, 20_0000_0000);
        timestamp::update_global_time_for_test_secs(1060);
        settlement::fill_twap_chunk(solver, admin_addr, admin_addr, 0, 20_0000_0000);

        // Cancel - should refund remaining 60
        submission::cancel_intent(user, admin_addr, 0);

        let record = submission::borrow_intent(admin_addr, 0);
        assert!(types::is_cancelled(types::get_record_status(&record)), 1);

        let balance_after = test_tokens::get_token_a_balance(admin_addr, user_addr);
        // Lost ~40 (2 chunks), refunded ~60, minus fees
        assert!(balance_before - balance_after < 50_0000_0000, 2);
    }

    #[test(aptos_framework = @0x1, admin = @velox, user = @0x123, solver = @0x456)]
    #[expected_failure(abort_code = 5, location = velox::settlement)]
    fun test_twap_all_chunks_completed_extra_fails(
        aptos_framework: &signer, admin: &signer, user: &signer, solver: &signer
    ) {
        setup(aptos_framework, admin, user, solver);
        let admin_addr = signer::address_of(admin);
        let token_a = test_tokens::get_token_a_address(admin_addr);
        let token_b = test_tokens::get_token_b_address(admin_addr);

        let start = timestamp::now_seconds();
        submission::submit_twap(user, admin_addr, token_a, token_b,
            100_0000_0000, 5, 60, 100, start);

        // Execute first chunk at start time
        settlement::fill_twap_chunk(solver, admin_addr, admin_addr, 0, 20_0000_0000);

        // Execute remaining 4 chunks
        let i = 1;
        while (i < 5) {
            timestamp::update_global_time_for_test_secs(start + (i * 60));
            settlement::fill_twap_chunk(solver, admin_addr, admin_addr, 0, 20_0000_0000);
            i = i + 1;
        };

        // Try 6th chunk - should fail with intent_not_active (status is Filled)
        timestamp::update_global_time_for_test_secs(start + 300);
        settlement::fill_twap_chunk(solver, admin_addr, admin_addr, 0, 20_0000_0000);
    }
}
