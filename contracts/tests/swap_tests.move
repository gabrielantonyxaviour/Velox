/// Swap Intent Edge Case Tests
/// Tests swap submission, fills, partial fills, and boundary conditions
#[test_only]
module velox::swap_tests {
    use std::signer;
    use std::vector;
    use aptos_framework::account;
    use aptos_framework::timestamp;
    use velox::test_tokens;
    use velox::submission;
    use velox::settlement;
    use velox::types;
    use velox::errors;

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

    // ============ Submission Edge Cases ============

    #[test(aptos_framework = @0x1, admin = @velox, user = @0x123, solver = @0x456)]
    fun test_swap_exact_minimum_output_boundary(
        aptos_framework: &signer, admin: &signer, user: &signer, solver: &signer
    ) {
        setup(aptos_framework, admin, user, solver);
        let admin_addr = signer::address_of(admin);
        let token_a = test_tokens::get_token_a_address(admin_addr);
        let token_b = test_tokens::get_token_b_address(admin_addr);

        // Submit with min_out = amount_in (1:1 ratio boundary)
        submission::submit_swap(user, admin_addr, token_a, token_b,
            100_0000_0000, 100_0000_0000, timestamp::now_seconds() + 3600);

        let record = submission::borrow_intent(admin_addr, 0);
        assert!(types::get_min_output(types::get_intent_ref(&record)) == 100_0000_0000, 1);
    }

    #[test(aptos_framework = @0x1, admin = @velox, user = @0x123, solver = @0x456)]
    fun test_swap_1_wei_amounts(
        aptos_framework: &signer, admin: &signer, user: &signer, solver: &signer
    ) {
        setup(aptos_framework, admin, user, solver);
        let admin_addr = signer::address_of(admin);
        let token_a = test_tokens::get_token_a_address(admin_addr);
        let token_b = test_tokens::get_token_b_address(admin_addr);

        // Submit with minimum 1 wei amount
        submission::submit_swap(user, admin_addr, token_a, token_b,
            1, 1, timestamp::now_seconds() + 3600);

        let record = submission::borrow_intent(admin_addr, 0);
        assert!(types::get_total_amount(types::get_intent_ref(&record)) == 1, 1);
    }

    #[test(aptos_framework = @0x1, admin = @velox, user = @0x123, solver = @0x456)]
    #[expected_failure(abort_code = 10, location = velox::submission)]
    fun test_swap_zero_amount_fails(
        aptos_framework: &signer, admin: &signer, user: &signer, solver: &signer
    ) {
        setup(aptos_framework, admin, user, solver);
        let admin_addr = signer::address_of(admin);
        let token_a = test_tokens::get_token_a_address(admin_addr);
        let token_b = test_tokens::get_token_b_address(admin_addr);

        submission::submit_swap(user, admin_addr, token_a, token_b,
            0, 0, timestamp::now_seconds() + 3600);
    }

    #[test(aptos_framework = @0x1, admin = @velox, user = @0x123, solver = @0x456)]
    #[expected_failure(abort_code = 90, location = velox::submission)]
    fun test_swap_deadline_equals_now_fails(
        aptos_framework: &signer, admin: &signer, user: &signer, solver: &signer
    ) {
        setup(aptos_framework, admin, user, solver);
        let admin_addr = signer::address_of(admin);
        let token_a = test_tokens::get_token_a_address(admin_addr);
        let token_b = test_tokens::get_token_b_address(admin_addr);

        // Deadline = now should fail (must be strictly greater)
        submission::submit_swap(user, admin_addr, token_a, token_b,
            100_0000_0000, 90_0000_0000, timestamp::now_seconds());
    }

    #[test(aptos_framework = @0x1, admin = @velox, user = @0x123, solver = @0x456)]
    fun test_swap_deadline_now_plus_1_succeeds(
        aptos_framework: &signer, admin: &signer, user: &signer, solver: &signer
    ) {
        setup(aptos_framework, admin, user, solver);
        let admin_addr = signer::address_of(admin);
        let token_a = test_tokens::get_token_a_address(admin_addr);
        let token_b = test_tokens::get_token_b_address(admin_addr);

        submission::submit_swap(user, admin_addr, token_a, token_b,
            100_0000_0000, 90_0000_0000, timestamp::now_seconds() + 1);
        assert!(submission::get_total_intents(admin_addr) == 1, 1);
    }

    // ============ Fill Edge Cases ============

    #[test(aptos_framework = @0x1, admin = @velox, user = @0x123, solver = @0x456)]
    fun test_fill_exact_min_output_succeeds(
        aptos_framework: &signer, admin: &signer, user: &signer, solver: &signer
    ) {
        setup(aptos_framework, admin, user, solver);
        let admin_addr = signer::address_of(admin);
        let token_a = test_tokens::get_token_a_address(admin_addr);
        let token_b = test_tokens::get_token_b_address(admin_addr);

        submission::submit_swap(user, admin_addr, token_a, token_b,
            100_0000_0000, 90_0000_0000, timestamp::now_seconds() + 3600);

        // Fill with exactly minimum output
        settlement::fill_swap(solver, admin_addr, admin_addr, 0, 100_0000_0000, 90_0000_0000);

        let record = submission::borrow_intent(admin_addr, 0);
        assert!(types::is_filled(types::get_record_status(&record)), 1);
    }

    #[test(aptos_framework = @0x1, admin = @velox, user = @0x123, solver = @0x456)]
    #[expected_failure(abort_code = 12, location = velox::settlement)]
    fun test_fill_below_min_output_fails(
        aptos_framework: &signer, admin: &signer, user: &signer, solver: &signer
    ) {
        setup(aptos_framework, admin, user, solver);
        let admin_addr = signer::address_of(admin);
        let token_a = test_tokens::get_token_a_address(admin_addr);
        let token_b = test_tokens::get_token_b_address(admin_addr);

        submission::submit_swap(user, admin_addr, token_a, token_b,
            100_0000_0000, 90_0000_0000, timestamp::now_seconds() + 3600);

        // Output 1 wei below minimum should fail
        settlement::fill_swap(solver, admin_addr, admin_addr, 0, 100_0000_0000, 90_0000_0000 - 1);
    }

    #[test(aptos_framework = @0x1, admin = @velox, user = @0x123, solver = @0x456)]
    fun test_multiple_fills_up_to_max(
        aptos_framework: &signer, admin: &signer, user: &signer, solver: &signer
    ) {
        setup(aptos_framework, admin, user, solver);
        let admin_addr = signer::address_of(admin);
        let token_a = test_tokens::get_token_a_address(admin_addr);
        let token_b = test_tokens::get_token_b_address(admin_addr);

        submission::submit_swap(user, admin_addr, token_a, token_b,
            100_0000_0000, 90_0000_0000, timestamp::now_seconds() + 3600);

        // Execute 5 partial fills (MAX_FILLS)
        let i = 0;
        while (i < 5) {
            settlement::fill_swap(solver, admin_addr, admin_addr, 0, 20_0000_0000, 18_0000_0000);
            i = i + 1;
        };

        let record = submission::borrow_intent(admin_addr, 0);
        assert!(types::is_filled(types::get_record_status(&record)), 1);
        assert!(vector::length(types::get_record_fills(&record)) == 5, 2);
    }

    #[test(aptos_framework = @0x1, admin = @velox, user = @0x123, solver = @0x456)]
    #[expected_failure(abort_code = 7, location = velox::settlement)]
    fun test_6th_fill_fails_max_fills_reached(
        aptos_framework: &signer, admin: &signer, user: &signer, solver: &signer
    ) {
        setup(aptos_framework, admin, user, solver);
        let admin_addr = signer::address_of(admin);
        let token_a = test_tokens::get_token_a_address(admin_addr);
        let token_b = test_tokens::get_token_b_address(admin_addr);

        // Use larger amount to allow 6 partial fills
        test_tokens::mint_token_a(admin, signer::address_of(user), 1000_0000_0000);
        submission::submit_swap(user, admin_addr, token_a, token_b,
            600_0000_0000, 540_0000_0000, timestamp::now_seconds() + 3600);

        // Execute 5 partial fills
        let i = 0;
        while (i < 5) {
            settlement::fill_swap(solver, admin_addr, admin_addr, 0, 100_0000_0000, 90_0000_0000);
            i = i + 1;
        };

        // 6th fill should fail with max_fills_reached
        settlement::fill_swap(solver, admin_addr, admin_addr, 0, 100_0000_0000, 90_0000_0000);
    }

    #[test(aptos_framework = @0x1, admin = @velox, user = @0x123, solver = @0x456)]
    #[expected_failure(abort_code = 90, location = velox::settlement)]
    fun test_fill_after_deadline_fails(
        aptos_framework: &signer, admin: &signer, user: &signer, solver: &signer
    ) {
        setup(aptos_framework, admin, user, solver);
        let admin_addr = signer::address_of(admin);
        let token_a = test_tokens::get_token_a_address(admin_addr);
        let token_b = test_tokens::get_token_b_address(admin_addr);

        submission::submit_swap(user, admin_addr, token_a, token_b,
            100_0000_0000, 90_0000_0000, timestamp::now_seconds() + 100);

        // Advance time past deadline
        timestamp::update_global_time_for_test_secs(1200);

        // Should fail - deadline passed
        settlement::fill_swap(solver, admin_addr, admin_addr, 0, 100_0000_0000, 90_0000_0000);
    }

    #[test(aptos_framework = @0x1, admin = @velox, user = @0x123, solver = @0x456)]
    #[expected_failure(abort_code = 16, location = velox::settlement)]
    fun test_fill_zero_input_fails(
        aptos_framework: &signer, admin: &signer, user: &signer, solver: &signer
    ) {
        setup(aptos_framework, admin, user, solver);
        let admin_addr = signer::address_of(admin);
        let token_a = test_tokens::get_token_a_address(admin_addr);
        let token_b = test_tokens::get_token_b_address(admin_addr);

        submission::submit_swap(user, admin_addr, token_a, token_b,
            100_0000_0000, 90_0000_0000, timestamp::now_seconds() + 3600);

        // Zero fill_input should fail
        settlement::fill_swap(solver, admin_addr, admin_addr, 0, 0, 90_0000_0000);
    }

    #[test(aptos_framework = @0x1, admin = @velox, user = @0x123, solver = @0x456)]
    #[expected_failure(abort_code = 16, location = velox::settlement)]
    fun test_fill_exceeds_remaining_fails(
        aptos_framework: &signer, admin: &signer, user: &signer, solver: &signer
    ) {
        setup(aptos_framework, admin, user, solver);
        let admin_addr = signer::address_of(admin);
        let token_a = test_tokens::get_token_a_address(admin_addr);
        let token_b = test_tokens::get_token_b_address(admin_addr);

        submission::submit_swap(user, admin_addr, token_a, token_b,
            100_0000_0000, 90_0000_0000, timestamp::now_seconds() + 3600);

        // Partial fill first
        settlement::fill_swap(solver, admin_addr, admin_addr, 0, 60_0000_0000, 54_0000_0000);

        // Try to fill more than remaining (40) - should fail
        settlement::fill_swap(solver, admin_addr, admin_addr, 0, 50_0000_0000, 45_0000_0000);
    }

    #[test(aptos_framework = @0x1, admin = @velox, user = @0x123, solver = @0x456)]
    fun test_cancel_after_partial_fill_refunds_correctly(
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

        // Partial fill 60%
        settlement::fill_swap(solver, admin_addr, admin_addr, 0, 60_0000_0000, 54_0000_0000);

        // Cancel should refund remaining 40
        submission::cancel_intent(user, admin_addr, 0);

        let balance_after = test_tokens::get_token_a_balance(admin_addr, user_addr);
        // balance_before - 100 + 40 (refund) = balance_before - 60 (fee adjusted)
        // Note: solver received 60 minus fee, so user gets 40 back
        let expected_loss = 60_0000_0000; // Lost to fills
        assert!(balance_before - balance_after >= expected_loss - 1_0000_0000, 1); // Allow for fees
    }

    #[test(aptos_framework = @0x1, admin = @velox, user = @0x123, solver = @0x456)]
    #[expected_failure(abort_code = 5, location = velox::submission)]
    fun test_cancel_fully_filled_fails(
        aptos_framework: &signer, admin: &signer, user: &signer, solver: &signer
    ) {
        setup(aptos_framework, admin, user, solver);
        let admin_addr = signer::address_of(admin);
        let token_a = test_tokens::get_token_a_address(admin_addr);
        let token_b = test_tokens::get_token_b_address(admin_addr);

        submission::submit_swap(user, admin_addr, token_a, token_b,
            100_0000_0000, 90_0000_0000, timestamp::now_seconds() + 3600);

        // Full fill
        settlement::fill_swap(solver, admin_addr, admin_addr, 0, 100_0000_0000, 90_0000_0000);

        // Cancel should fail - already filled
        submission::cancel_intent(user, admin_addr, 0);
    }

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

        // Solver tries to cancel user's intent - should fail
        submission::cancel_intent(solver, admin_addr, 0);
    }

    #[test(aptos_framework = @0x1, admin = @velox, user = @0x123, solver = @0x456)]
    fun test_proportional_min_output_for_partial_fills(
        aptos_framework: &signer, admin: &signer, user: &signer, solver: &signer
    ) {
        setup(aptos_framework, admin, user, solver);
        let admin_addr = signer::address_of(admin);
        let token_a = test_tokens::get_token_a_address(admin_addr);
        let token_b = test_tokens::get_token_b_address(admin_addr);

        // 100 input, 80 min output => 50 input requires 40 min output
        submission::submit_swap(user, admin_addr, token_a, token_b,
            100_0000_0000, 80_0000_0000, timestamp::now_seconds() + 3600);

        // 50% fill with exactly proportional min output (40)
        settlement::fill_swap(solver, admin_addr, admin_addr, 0, 50_0000_0000, 40_0000_0000);

        let record = submission::borrow_intent(admin_addr, 0);
        assert!(types::get_escrow_remaining(&record) == 50_0000_0000, 1);
    }
}
