/// Settlement Fee Edge Case Tests
/// Tests fee collection, treasury updates, and fee calculation edge cases
#[test_only]
module velox::settlement_fee_tests {
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

        test_tokens::mint_token_a(admin, signer::address_of(user), 10000_0000_0000);
        test_tokens::mint_token_b(admin, signer::address_of(solver), 10000_0000_0000);
    }

    fun setup_with_treasury(
        aptos_framework: &signer, admin: &signer, user: &signer,
        solver: &signer, treasury: &signer
    ) {
        setup(aptos_framework, admin, user, solver);
        account::create_account_for_test(signer::address_of(treasury));
        settlement::initialize(admin, signer::address_of(treasury));
    }

    // ============ Fee Calculation Tests ============

    #[test(aptos_framework = @0x1, admin = @velox, user = @0x123, solver = @0x456, treasury = @0xFEE)]
    fun test_default_fee_30_bps(
        aptos_framework: &signer, admin: &signer, user: &signer,
        solver: &signer, treasury: &signer
    ) {
        setup_with_treasury(aptos_framework, admin, user, solver, treasury);
        let admin_addr = signer::address_of(admin);

        // Default fee is 30 bps (0.3%)
        let fee_bps = settlement::get_fee_bps(admin_addr);
        assert!(fee_bps == 30, 1);
    }

    #[test(aptos_framework = @0x1, admin = @velox, user = @0x123, solver = @0x456, treasury = @0xFEE)]
    fun test_fee_calculation_exact_amounts(
        aptos_framework: &signer, admin: &signer, user: &signer,
        solver: &signer, treasury: &signer
    ) {
        setup_with_treasury(aptos_framework, admin, user, solver, treasury);
        let admin_addr = signer::address_of(admin);
        let treasury_addr = signer::address_of(treasury);
        let token_a = test_tokens::get_token_a_address(admin_addr);
        let token_b = test_tokens::get_token_b_address(admin_addr);

        // Submit swap with 10000 tokens
        submission::submit_swap(user, admin_addr, token_a, token_b,
            10000_0000_0000, 9000_0000_0000, timestamp::now_seconds() + 3600);

        // Treasury balance before
        let treasury_before = test_tokens::get_token_a_balance(admin_addr, treasury_addr);

        // Fill swap
        settlement::fill_swap(solver, admin_addr, admin_addr, 0,
            10000_0000_0000, 10000_0000_0000);

        // Treasury balance after
        let treasury_after = test_tokens::get_token_a_balance(admin_addr, treasury_addr);

        // Fee = 10000 * 30 / 10000 = 30 tokens (30 bps)
        let fee_collected = treasury_after - treasury_before;
        assert!(fee_collected == 30_0000_0000, 1);

        // Verify total_collected
        let total_collected = settlement::get_total_collected(admin_addr);
        assert!(total_collected == 30_0000_0000, 2);
    }

    #[test(aptos_framework = @0x1, admin = @velox, user = @0x123, solver = @0x456)]
    fun test_fill_without_fee_config_zero_fee(
        aptos_framework: &signer, admin: &signer, user: &signer, solver: &signer
    ) {
        setup(aptos_framework, admin, user, solver);
        // Don't initialize settlement - no FeeConfig
        let admin_addr = signer::address_of(admin);
        let solver_addr = signer::address_of(solver);
        let token_a = test_tokens::get_token_a_address(admin_addr);
        let token_b = test_tokens::get_token_b_address(admin_addr);

        // Get solver token_a balance before (should be 0)
        let solver_before = test_tokens::get_token_a_balance(admin_addr, solver_addr);

        submission::submit_swap(user, admin_addr, token_a, token_b,
            100_0000_0000, 90_0000_0000, timestamp::now_seconds() + 3600);

        // Fill with non-existent fee config address
        let fake_fee_addr = @0x999;
        settlement::fill_swap(solver, admin_addr, fake_fee_addr, 0,
            100_0000_0000, 100_0000_0000);

        // Solver should receive full amount (no fee)
        let solver_after = test_tokens::get_token_a_balance(admin_addr, solver_addr);
        assert!(solver_after - solver_before == 100_0000_0000, 1);
    }

    #[test(aptos_framework = @0x1, admin = @velox, user = @0x123, solver = @0x456, treasury = @0xFEE)]
    fun test_fee_on_1_wei_rounds_to_zero(
        aptos_framework: &signer, admin: &signer, user: &signer,
        solver: &signer, treasury: &signer
    ) {
        setup_with_treasury(aptos_framework, admin, user, solver, treasury);
        let admin_addr = signer::address_of(admin);
        let treasury_addr = signer::address_of(treasury);
        let token_a = test_tokens::get_token_a_address(admin_addr);
        let token_b = test_tokens::get_token_b_address(admin_addr);

        // Submit swap with 1 wei
        submission::submit_swap(user, admin_addr, token_a, token_b,
            1, 1, timestamp::now_seconds() + 3600);

        let treasury_before = test_tokens::get_token_a_balance(admin_addr, treasury_addr);

        settlement::fill_swap(solver, admin_addr, admin_addr, 0, 1, 1);

        let treasury_after = test_tokens::get_token_a_balance(admin_addr, treasury_addr);

        // Fee = 1 * 30 / 10000 = 0 (rounds down)
        assert!(treasury_after == treasury_before, 1);
    }

    #[test(aptos_framework = @0x1, admin = @velox, user = @0x123, solver = @0x456, treasury = @0xFEE)]
    fun test_update_fee_bps_to_zero(
        aptos_framework: &signer, admin: &signer, user: &signer,
        solver: &signer, treasury: &signer
    ) {
        setup_with_treasury(aptos_framework, admin, user, solver, treasury);
        let admin_addr = signer::address_of(admin);
        let solver_addr = signer::address_of(solver);
        let token_a = test_tokens::get_token_a_address(admin_addr);
        let token_b = test_tokens::get_token_b_address(admin_addr);

        // Update fee to 0
        settlement::update_fee_bps(admin, admin_addr, 0);
        assert!(settlement::get_fee_bps(admin_addr) == 0, 1);

        submission::submit_swap(user, admin_addr, token_a, token_b,
            100_0000_0000, 90_0000_0000, timestamp::now_seconds() + 3600);

        let solver_before = test_tokens::get_token_a_balance(admin_addr, solver_addr);
        settlement::fill_swap(solver, admin_addr, admin_addr, 0,
            100_0000_0000, 100_0000_0000);
        let solver_after = test_tokens::get_token_a_balance(admin_addr, solver_addr);

        // Solver gets full amount (no fee)
        assert!(solver_after - solver_before == 100_0000_0000, 2);
    }

    #[test(aptos_framework = @0x1, admin = @velox, user = @0x123, solver = @0x456, treasury = @0xFEE)]
    fun test_update_fee_bps_to_max(
        aptos_framework: &signer, admin: &signer, user: &signer,
        solver: &signer, treasury: &signer
    ) {
        setup_with_treasury(aptos_framework, admin, user, solver, treasury);
        let admin_addr = signer::address_of(admin);
        let treasury_addr = signer::address_of(treasury);
        let token_a = test_tokens::get_token_a_address(admin_addr);
        let token_b = test_tokens::get_token_b_address(admin_addr);

        // Update fee to 100% (10000 bps) - extreme edge case
        settlement::update_fee_bps(admin, admin_addr, 10000);
        assert!(settlement::get_fee_bps(admin_addr) == 10000, 1);

        submission::submit_swap(user, admin_addr, token_a, token_b,
            100_0000_0000, 90_0000_0000, timestamp::now_seconds() + 3600);

        let treasury_before = test_tokens::get_token_a_balance(admin_addr, treasury_addr);
        settlement::fill_swap(solver, admin_addr, admin_addr, 0,
            100_0000_0000, 100_0000_0000);
        let treasury_after = test_tokens::get_token_a_balance(admin_addr, treasury_addr);

        // Fee = 100% of 100 = 100
        assert!(treasury_after - treasury_before == 100_0000_0000, 2);
    }

    // ============ Treasury Update Tests ============

    #[test(aptos_framework = @0x1, admin = @velox, user = @0x123, solver = @0x456, treasury = @0xFEE)]
    fun test_update_treasury_address(
        aptos_framework: &signer, admin: &signer, user: &signer,
        solver: &signer, treasury: &signer
    ) {
        setup_with_treasury(aptos_framework, admin, user, solver, treasury);
        let admin_addr = signer::address_of(admin);
        let new_treasury = @0x999;

        // Create account for new treasury
        account::create_account_for_test(new_treasury);

        // Update treasury
        settlement::update_treasury(admin, admin_addr, new_treasury);
        assert!(settlement::get_treasury(admin_addr) == new_treasury, 1);
    }

    #[test(aptos_framework = @0x1, admin = @velox, user = @0x123, solver = @0x456, treasury = @0xFEE)]
    #[expected_failure(abort_code = 33, location = velox::settlement)]
    fun test_update_fee_bps_non_admin_fails(
        aptos_framework: &signer, admin: &signer, user: &signer,
        solver: &signer, treasury: &signer
    ) {
        setup_with_treasury(aptos_framework, admin, user, solver, treasury);
        let admin_addr = signer::address_of(admin);

        // Non-admin tries to update fee
        settlement::update_fee_bps(user, admin_addr, 100);
    }

    #[test(aptos_framework = @0x1, admin = @velox, user = @0x123, solver = @0x456, treasury = @0xFEE)]
    #[expected_failure(abort_code = 33, location = velox::settlement)]
    fun test_update_treasury_non_admin_fails(
        aptos_framework: &signer, admin: &signer, user: &signer,
        solver: &signer, treasury: &signer
    ) {
        setup_with_treasury(aptos_framework, admin, user, solver, treasury);
        let admin_addr = signer::address_of(admin);

        // Non-admin tries to update treasury
        settlement::update_treasury(solver, admin_addr, @0x999);
    }

    // ============ Total Collected Accumulation Tests ============

    #[test(aptos_framework = @0x1, admin = @velox, user = @0x123, solver = @0x456, treasury = @0xFEE)]
    fun test_total_collected_accumulates(
        aptos_framework: &signer, admin: &signer, user: &signer,
        solver: &signer, treasury: &signer
    ) {
        setup_with_treasury(aptos_framework, admin, user, solver, treasury);
        let admin_addr = signer::address_of(admin);
        let token_a = test_tokens::get_token_a_address(admin_addr);
        let token_b = test_tokens::get_token_b_address(admin_addr);

        // Submit and fill 3 swaps
        let i = 0;
        while (i < 3) {
            submission::submit_swap(user, admin_addr, token_a, token_b,
                1000_0000_0000, 900_0000_0000, timestamp::now_seconds() + 3600);

            settlement::fill_swap(solver, admin_addr, admin_addr, i,
                1000_0000_0000, 1000_0000_0000);
            i = i + 1;
        };

        // Fee per swap = 1000 * 30 / 10000 = 3 tokens
        // Total = 3 * 3 = 9 tokens
        let total_collected = settlement::get_total_collected(admin_addr);
        assert!(total_collected == 9_0000_0000, 1);
    }

    // ============ Fee with Partial Fills Tests ============

    #[test(aptos_framework = @0x1, admin = @velox, user = @0x123, solver = @0x456, treasury = @0xFEE)]
    fun test_fee_on_partial_fills(
        aptos_framework: &signer, admin: &signer, user: &signer,
        solver: &signer, treasury: &signer
    ) {
        setup_with_treasury(aptos_framework, admin, user, solver, treasury);
        let admin_addr = signer::address_of(admin);
        let treasury_addr = signer::address_of(treasury);
        let token_a = test_tokens::get_token_a_address(admin_addr);
        let token_b = test_tokens::get_token_b_address(admin_addr);

        submission::submit_swap(user, admin_addr, token_a, token_b,
            1000_0000_0000, 900_0000_0000, timestamp::now_seconds() + 3600);

        // 5 partial fills of 200 each
        let treasury_before = test_tokens::get_token_a_balance(admin_addr, treasury_addr);
        let i = 0;
        while (i < 5) {
            settlement::fill_swap(solver, admin_addr, admin_addr, 0,
                200_0000_0000, 200_0000_0000);
            i = i + 1;
        };
        let treasury_after = test_tokens::get_token_a_balance(admin_addr, treasury_addr);

        // Total fee = 5 * (200 * 30 / 10000) = 5 * 0.6 = 3 tokens
        // Each fill: 200 * 30 / 10000 = 0.6 tokens
        let fee_collected = treasury_after - treasury_before;
        assert!(fee_collected == 3_0000_0000, 1);
    }

    // ============ View Functions Tests ============

    #[test(aptos_framework = @0x1, admin = @velox, user = @0x123, solver = @0x456, treasury = @0xFEE)]
    fun test_view_functions(
        aptos_framework: &signer, admin: &signer, user: &signer,
        solver: &signer, treasury: &signer
    ) {
        setup_with_treasury(aptos_framework, admin, user, solver, treasury);
        let admin_addr = signer::address_of(admin);
        let treasury_addr = signer::address_of(treasury);

        assert!(settlement::get_fee_bps(admin_addr) == 30, 1);
        assert!(settlement::get_treasury(admin_addr) == treasury_addr, 2);
        assert!(settlement::get_total_collected(admin_addr) == 0, 3);
        assert!(settlement::max_fills() == 5, 4);
    }

    #[test(aptos_framework = @0x1, admin = @velox, user = @0x123, solver = @0x456)]
    fun test_get_fee_bps_no_config_returns_zero(
        aptos_framework: &signer, admin: &signer, user: &signer, solver: &signer
    ) {
        setup(aptos_framework, admin, user, solver);

        // Without FeeConfig, should return 0
        let fee = settlement::get_fee_bps(@0x999);
        assert!(fee == 0, 1);
    }
}
