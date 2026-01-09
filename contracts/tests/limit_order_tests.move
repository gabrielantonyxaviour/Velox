/// Limit Order Intent Edge Case Tests
/// Tests limit order submission, price validation, fills, and expiry handling
#[test_only]
module velox::limit_order_tests {
    use std::signer;
    use aptos_framework::account;
    use aptos_framework::timestamp;
    use velox::test_tokens;
    use velox::submission;
    use velox::settlement;
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

    // ============ Submission Tests ============

    #[test(aptos_framework = @0x1, admin = @velox, user = @0x123, solver = @0x456)]
    fun test_limit_order_exact_market_price(
        aptos_framework: &signer, admin: &signer, user: &signer, solver: &signer
    ) {
        setup(aptos_framework, admin, user, solver);
        let admin_addr = signer::address_of(admin);
        let token_a = test_tokens::get_token_a_address(admin_addr);
        let token_b = test_tokens::get_token_b_address(admin_addr);

        // limit_price = 10000 means 1:1 ratio (10000 bps = 100%)
        submission::submit_limit_order(user, admin_addr, token_a, token_b,
            100_0000_0000, 10000, timestamp::now_seconds() + 86400);

        let record = submission::borrow_intent(admin_addr, 0);
        let intent = types::get_intent_ref(&record);
        assert!(types::is_limit_order(intent), 1);
        assert!(types::get_limit_price(intent) == 10000, 2);
    }

    #[test(aptos_framework = @0x1, admin = @velox, user = @0x123, solver = @0x456)]
    fun test_limit_order_price_1_wei(
        aptos_framework: &signer, admin: &signer, user: &signer, solver: &signer
    ) {
        setup(aptos_framework, admin, user, solver);
        let admin_addr = signer::address_of(admin);
        let token_a = test_tokens::get_token_a_address(admin_addr);
        let token_b = test_tokens::get_token_b_address(admin_addr);

        // Very low price (1 basis point)
        submission::submit_limit_order(user, admin_addr, token_a, token_b,
            100_0000_0000, 1, timestamp::now_seconds() + 86400);

        let record = submission::borrow_intent(admin_addr, 0);
        assert!(types::get_limit_price(types::get_intent_ref(&record)) == 1, 1);
    }

    #[test(aptos_framework = @0x1, admin = @velox, user = @0x123, solver = @0x456)]
    fun test_limit_order_price_max_u64(
        aptos_framework: &signer, admin: &signer, user: &signer, solver: &signer
    ) {
        setup(aptos_framework, admin, user, solver);
        let admin_addr = signer::address_of(admin);
        let token_a = test_tokens::get_token_a_address(admin_addr);
        let token_b = test_tokens::get_token_b_address(admin_addr);

        // Maximum price
        let max_price: u64 = 18446744073709551615;
        submission::submit_limit_order(user, admin_addr, token_a, token_b,
            100, max_price, timestamp::now_seconds() + 86400);

        let record = submission::borrow_intent(admin_addr, 0);
        assert!(types::get_limit_price(types::get_intent_ref(&record)) == max_price, 1);
    }

    #[test(aptos_framework = @0x1, admin = @velox, user = @0x123, solver = @0x456)]
    #[expected_failure(abort_code = 91, location = velox::submission)]
    fun test_limit_order_expiry_now_fails(
        aptos_framework: &signer, admin: &signer, user: &signer, solver: &signer
    ) {
        setup(aptos_framework, admin, user, solver);
        let admin_addr = signer::address_of(admin);
        let token_a = test_tokens::get_token_a_address(admin_addr);
        let token_b = test_tokens::get_token_b_address(admin_addr);

        // Expiry = now should fail
        submission::submit_limit_order(user, admin_addr, token_a, token_b,
            100_0000_0000, 10000, timestamp::now_seconds());
    }

    #[test(aptos_framework = @0x1, admin = @velox, user = @0x123, solver = @0x456)]
    fun test_limit_order_expiry_now_plus_1(
        aptos_framework: &signer, admin: &signer, user: &signer, solver: &signer
    ) {
        setup(aptos_framework, admin, user, solver);
        let admin_addr = signer::address_of(admin);
        let token_a = test_tokens::get_token_a_address(admin_addr);
        let token_b = test_tokens::get_token_b_address(admin_addr);

        // Expiry = now + 1 should succeed
        submission::submit_limit_order(user, admin_addr, token_a, token_b,
            100_0000_0000, 10000, timestamp::now_seconds() + 1);

        assert!(submission::get_total_intents(admin_addr) == 1, 1);
    }

    // ============ Fill Tests ============

    #[test(aptos_framework = @0x1, admin = @velox, user = @0x123, solver = @0x456)]
    fun test_fill_at_exactly_limit_price(
        aptos_framework: &signer, admin: &signer, user: &signer, solver: &signer
    ) {
        setup(aptos_framework, admin, user, solver);
        let admin_addr = signer::address_of(admin);
        let token_a = test_tokens::get_token_a_address(admin_addr);
        let token_b = test_tokens::get_token_b_address(admin_addr);

        // limit_price = 10000 (1:1), so 100 input requires 100 output
        submission::submit_limit_order(user, admin_addr, token_a, token_b,
            100_0000_0000, 10000, timestamp::now_seconds() + 86400);

        // Fill at exact limit price: output = fill_input * price / BPS_DENOMINATOR
        // 100 * 10000 / 10000 = 100
        settlement::fill_limit_order(solver, admin_addr, admin_addr, 0,
            100_0000_0000, 100_0000_0000);

        let record = submission::borrow_intent(admin_addr, 0);
        assert!(types::is_filled(types::get_record_status(&record)), 1);
    }

    #[test(aptos_framework = @0x1, admin = @velox, user = @0x123, solver = @0x456)]
    #[expected_failure(abort_code = 12, location = velox::settlement)]
    fun test_fill_below_limit_price_fails(
        aptos_framework: &signer, admin: &signer, user: &signer, solver: &signer
    ) {
        setup(aptos_framework, admin, user, solver);
        let admin_addr = signer::address_of(admin);
        let token_a = test_tokens::get_token_a_address(admin_addr);
        let token_b = test_tokens::get_token_b_address(admin_addr);

        // limit_price = 10000 (1:1)
        submission::submit_limit_order(user, admin_addr, token_a, token_b,
            100_0000_0000, 10000, timestamp::now_seconds() + 86400);

        // Try to fill with output 1 wei below required - should fail
        settlement::fill_limit_order(solver, admin_addr, admin_addr, 0,
            100_0000_0000, 100_0000_0000 - 1);
    }

    #[test(aptos_framework = @0x1, admin = @velox, user = @0x123, solver = @0x456)]
    fun test_fill_above_limit_price_succeeds(
        aptos_framework: &signer, admin: &signer, user: &signer, solver: &signer
    ) {
        setup(aptos_framework, admin, user, solver);
        let admin_addr = signer::address_of(admin);
        let token_a = test_tokens::get_token_a_address(admin_addr);
        let token_b = test_tokens::get_token_b_address(admin_addr);

        // limit_price = 10000 (1:1)
        submission::submit_limit_order(user, admin_addr, token_a, token_b,
            100_0000_0000, 10000, timestamp::now_seconds() + 86400);

        // Fill with better price (more output) - should succeed
        settlement::fill_limit_order(solver, admin_addr, admin_addr, 0,
            100_0000_0000, 150_0000_0000);

        let record = submission::borrow_intent(admin_addr, 0);
        assert!(types::is_filled(types::get_record_status(&record)), 1);
        assert!(types::get_total_output(&record) == 150_0000_0000, 2);
    }

    #[test(aptos_framework = @0x1, admin = @velox, user = @0x123, solver = @0x456)]
    fun test_partial_fill_then_price_check(
        aptos_framework: &signer, admin: &signer, user: &signer, solver: &signer
    ) {
        setup(aptos_framework, admin, user, solver);
        let admin_addr = signer::address_of(admin);
        let token_a = test_tokens::get_token_a_address(admin_addr);
        let token_b = test_tokens::get_token_b_address(admin_addr);

        // limit_price = 10000 (1:1)
        submission::submit_limit_order(user, admin_addr, token_a, token_b,
            100_0000_0000, 10000, timestamp::now_seconds() + 86400);

        // Partial fill 50%
        settlement::fill_limit_order(solver, admin_addr, admin_addr, 0,
            50_0000_0000, 50_0000_0000);

        let record = submission::borrow_intent(admin_addr, 0);
        assert!(types::is_active(types::get_record_status(&record)), 1);
        assert!(types::get_escrow_remaining(&record) == 50_0000_0000, 2);

        // Second fill at limit price
        settlement::fill_limit_order(solver, admin_addr, admin_addr, 0,
            50_0000_0000, 50_0000_0000);

        let record2 = submission::borrow_intent(admin_addr, 0);
        assert!(types::is_filled(types::get_record_status(&record2)), 3);
    }

    #[test(aptos_framework = @0x1, admin = @velox, user = @0x123, solver = @0x456)]
    #[expected_failure(abort_code = 91, location = velox::settlement)]
    fun test_fill_after_expiry_fails(
        aptos_framework: &signer, admin: &signer, user: &signer, solver: &signer
    ) {
        setup(aptos_framework, admin, user, solver);
        let admin_addr = signer::address_of(admin);
        let token_a = test_tokens::get_token_a_address(admin_addr);
        let token_b = test_tokens::get_token_b_address(admin_addr);

        submission::submit_limit_order(user, admin_addr, token_a, token_b,
            100_0000_0000, 10000, timestamp::now_seconds() + 100);

        // Advance time past expiry
        timestamp::update_global_time_for_test_secs(1200);

        // Should fail - expired
        settlement::fill_limit_order(solver, admin_addr, admin_addr, 0,
            100_0000_0000, 100_0000_0000);
    }

    #[test(aptos_framework = @0x1, admin = @velox, user = @0x123, solver = @0x456)]
    fun test_limit_order_with_high_price_ratio(
        aptos_framework: &signer, admin: &signer, user: &signer, solver: &signer
    ) {
        setup(aptos_framework, admin, user, solver);
        let admin_addr = signer::address_of(admin);
        let token_a = test_tokens::get_token_a_address(admin_addr);
        let token_b = test_tokens::get_token_b_address(admin_addr);

        // limit_price = 20000 (2:1 ratio - want 2x output)
        submission::submit_limit_order(user, admin_addr, token_a, token_b,
            100_0000_0000, 20000, timestamp::now_seconds() + 86400);

        // Required output = 100 * 20000 / 10000 = 200
        settlement::fill_limit_order(solver, admin_addr, admin_addr, 0,
            100_0000_0000, 200_0000_0000);

        let record = submission::borrow_intent(admin_addr, 0);
        assert!(types::is_filled(types::get_record_status(&record)), 1);
    }

    #[test(aptos_framework = @0x1, admin = @velox, user = @0x123, solver = @0x456)]
    fun test_limit_order_min_output_calculation(
        aptos_framework: &signer, admin: &signer, user: &signer, solver: &signer
    ) {
        setup(aptos_framework, admin, user, solver);
        let admin_addr = signer::address_of(admin);
        let token_a = test_tokens::get_token_a_address(admin_addr);
        let token_b = test_tokens::get_token_b_address(admin_addr);

        // limit_price = 15000 (1.5:1 ratio)
        submission::submit_limit_order(user, admin_addr, token_a, token_b,
            100_0000_0000, 15000, timestamp::now_seconds() + 86400);

        // Verify min_output calculation from types module
        let record = submission::borrow_intent(admin_addr, 0);
        let intent = types::get_intent_ref(&record);

        // min_output = (amount_in * limit_price) / 100000000
        // For 100 tokens * 15000 / 100000000 = very small due to precision
        // But the fill check uses: execution_price >= limit_price
        let min_out = types::get_min_output(intent);
        assert!(min_out == math::safe_mul_div(100_0000_0000, 15000, 100000000), 1);
    }

    #[test(aptos_framework = @0x1, admin = @velox, user = @0x123, solver = @0x456)]
    fun test_limit_order_multiple_partial_fills(
        aptos_framework: &signer, admin: &signer, user: &signer, solver: &signer
    ) {
        setup(aptos_framework, admin, user, solver);
        let admin_addr = signer::address_of(admin);
        let token_a = test_tokens::get_token_a_address(admin_addr);
        let token_b = test_tokens::get_token_b_address(admin_addr);

        submission::submit_limit_order(user, admin_addr, token_a, token_b,
            100_0000_0000, 10000, timestamp::now_seconds() + 86400);

        // 5 partial fills
        let i = 0;
        while (i < 5) {
            settlement::fill_limit_order(solver, admin_addr, admin_addr, 0,
                20_0000_0000, 20_0000_0000);
            i = i + 1;
        };

        let record = submission::borrow_intent(admin_addr, 0);
        assert!(types::is_filled(types::get_record_status(&record)), 1);
    }

    #[test(aptos_framework = @0x1, admin = @velox, user = @0x123, solver = @0x456)]
    #[expected_failure(abort_code = 7, location = velox::settlement)]
    fun test_limit_order_6th_fill_fails(
        aptos_framework: &signer, admin: &signer, user: &signer, solver: &signer
    ) {
        setup(aptos_framework, admin, user, solver);
        let admin_addr = signer::address_of(admin);
        let token_a = test_tokens::get_token_a_address(admin_addr);
        let token_b = test_tokens::get_token_b_address(admin_addr);

        test_tokens::mint_token_a(admin, signer::address_of(user), 1000_0000_0000);
        submission::submit_limit_order(user, admin_addr, token_a, token_b,
            600_0000_0000, 10000, timestamp::now_seconds() + 86400);

        // 5 partial fills
        let i = 0;
        while (i < 5) {
            settlement::fill_limit_order(solver, admin_addr, admin_addr, 0,
                100_0000_0000, 100_0000_0000);
            i = i + 1;
        };

        // 6th should fail
        settlement::fill_limit_order(solver, admin_addr, admin_addr, 0,
            100_0000_0000, 100_0000_0000);
    }
}
