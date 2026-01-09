#[test_only]
module velox::integration_test {
    use std::signer;
    use std::string;
    use aptos_framework::account;
    use aptos_framework::timestamp;
    use aptos_framework::coin;
    use aptos_framework::aptos_coin::AptosCoin;
    use velox::test_tokens;
    use velox::submission;
    use velox::settlement;
    use velox::solver_registry;
    use velox::types;

    // ============ Test Setup ============

    fun setup_test(aptos_framework: &signer, admin: &signer, user: &signer, solver: &signer) {
        // Initialize timestamp
        timestamp::set_time_has_started_for_testing(aptos_framework);
        timestamp::update_global_time_for_test_secs(1000);

        // Create accounts
        let admin_addr = signer::address_of(admin);
        let user_addr = signer::address_of(user);
        let solver_addr = signer::address_of(solver);

        account::create_account_for_test(admin_addr);
        account::create_account_for_test(user_addr);
        account::create_account_for_test(solver_addr);

        // Initialize modules
        test_tokens::initialize(admin);
        submission::initialize(admin);
        solver_registry::initialize(admin);

        // Initialize settlement fee config (treasury = admin)
        settlement::initialize(admin, admin_addr);

        // Mint tokens to user and solver
        test_tokens::mint_token_a(admin, user_addr, 1000_0000_0000); // 1000 tUSDC
        test_tokens::mint_token_b(admin, solver_addr, 1000_0000_0000); // 1000 tMOVE
    }

    // ============ Submit Swap Intent Tests ============

    #[test(aptos_framework = @0x1, admin = @velox, user = @0x123, solver = @0x456)]
    fun test_submit_swap_intent(
        aptos_framework: &signer,
        admin: &signer,
        user: &signer,
        solver: &signer
    ) {
        setup_test(aptos_framework, admin, user, solver);

        let admin_addr = signer::address_of(admin);
        let user_addr = signer::address_of(user);

        let token_a = test_tokens::get_token_a_address(admin_addr);
        let token_b = test_tokens::get_token_b_address(admin_addr);

        // Submit swap intent
        let deadline = timestamp::now_seconds() + 3600; // 1 hour from now
        submission::submit_swap(
            user,
            admin_addr,
            token_a,
            token_b,
            100_0000_0000, // 100 tUSDC
            90_0000_0000,  // min 90 tMOVE
            deadline
        );

        // Verify intent was created
        let total = submission::get_total_intents(admin_addr);
        assert!(total == 1, 1);

        // Verify user intent tracking
        let user_intents = submission::get_user_intents(admin_addr, user_addr);
        assert!(std::vector::length(&user_intents) == 1, 2);
    }

    // ============ Submit Limit Order Tests ============

    #[test(aptos_framework = @0x1, admin = @velox, user = @0x123, solver = @0x456)]
    fun test_submit_limit_order(
        aptos_framework: &signer,
        admin: &signer,
        user: &signer,
        solver: &signer
    ) {
        setup_test(aptos_framework, admin, user, solver);

        let admin_addr = signer::address_of(admin);

        let token_a = test_tokens::get_token_a_address(admin_addr);
        let token_b = test_tokens::get_token_b_address(admin_addr);

        // Submit limit order (partial fills are always allowed now)
        let expiry = timestamp::now_seconds() + 86400; // 1 day
        submission::submit_limit_order(
            user,
            admin_addr,
            token_a,
            token_b,
            50_0000_0000,  // 50 tUSDC
            10000,         // limit price: 1:1 ratio
            expiry
        );

        // Verify intent was created
        let total = submission::get_total_intents(admin_addr);
        assert!(total == 1, 1);

        // Verify intent record
        let record = submission::borrow_intent(admin_addr, 0);
        let intent = types::get_intent_ref(&record);
        assert!(types::is_limit_order(intent), 2);
    }

    // ============ Fill Swap Tests ============

    #[test(aptos_framework = @0x1, admin = @velox, user = @0x123, solver = @0x456)]
    fun test_fill_swap(
        aptos_framework: &signer,
        admin: &signer,
        user: &signer,
        solver: &signer
    ) {
        setup_test(aptos_framework, admin, user, solver);

        let admin_addr = signer::address_of(admin);
        let user_addr = signer::address_of(user);

        let token_a = test_tokens::get_token_a_address(admin_addr);
        let token_b = test_tokens::get_token_b_address(admin_addr);

        // Get initial balances
        let user_token_b_before = test_tokens::get_token_b_balance(admin_addr, user_addr);

        // Submit swap intent
        let deadline = timestamp::now_seconds() + 3600;
        submission::submit_swap(
            user,
            admin_addr,
            token_a,
            token_b,
            100_0000_0000, // 100 tUSDC
            90_0000_0000,  // min 90 tMOVE
            deadline
        );

        // Solver fills the swap
        settlement::fill_swap(
            solver,
            admin_addr,          // registry_addr
            admin_addr,          // fee_config_addr
            0,                   // intent_id
            100_0000_0000,       // fill_input (full fill)
            100_0000_0000        // output_amount: 100 tMOVE
        );

        // Verify user received tokens
        let user_token_b_after = test_tokens::get_token_b_balance(admin_addr, user_addr);
        assert!(user_token_b_after > user_token_b_before, 1);

        // Verify intent status is filled
        let record = submission::borrow_intent(admin_addr, 0);
        let status = types::get_record_status(&record);
        assert!(types::is_filled(status), 2);
    }

    // ============ Partial Fill Tests ============

    #[test(aptos_framework = @0x1, admin = @velox, user = @0x123, solver = @0x456)]
    fun test_partial_fill(
        aptos_framework: &signer,
        admin: &signer,
        user: &signer,
        solver: &signer
    ) {
        setup_test(aptos_framework, admin, user, solver);

        let admin_addr = signer::address_of(admin);

        let token_a = test_tokens::get_token_a_address(admin_addr);
        let token_b = test_tokens::get_token_b_address(admin_addr);

        // Submit swap intent
        let deadline = timestamp::now_seconds() + 3600;
        submission::submit_swap(
            user,
            admin_addr,
            token_a,
            token_b,
            100_0000_0000, // 100 tUSDC
            90_0000_0000,  // min 90 tMOVE
            deadline
        );

        // Solver partially fills (50%)
        settlement::fill_swap(
            solver,
            admin_addr,
            admin_addr,
            0,
            50_0000_0000,  // fill 50 tUSDC
            50_0000_0000   // output 50 tMOVE
        );

        // Verify intent is still active (partially filled)
        let record = submission::borrow_intent(admin_addr, 0);
        let status = types::get_record_status(&record);
        assert!(types::is_active(status), 1);

        // Check remaining escrow
        let remaining = types::get_escrow_remaining(&record);
        assert!(remaining == 50_0000_0000, 2);
    }

    // ============ Cancel Intent Tests ============

    #[test(aptos_framework = @0x1, admin = @velox, user = @0x123, solver = @0x456)]
    fun test_cancel_intent(
        aptos_framework: &signer,
        admin: &signer,
        user: &signer,
        solver: &signer
    ) {
        setup_test(aptos_framework, admin, user, solver);

        let admin_addr = signer::address_of(admin);
        let user_addr = signer::address_of(user);

        let token_a = test_tokens::get_token_a_address(admin_addr);
        let token_b = test_tokens::get_token_b_address(admin_addr);

        // Get initial balance
        let balance_before = test_tokens::get_token_a_balance(admin_addr, user_addr);

        // Submit swap intent
        let deadline = timestamp::now_seconds() + 3600;
        submission::submit_swap(
            user,
            admin_addr,
            token_a,
            token_b,
            100_0000_0000,
            90_0000_0000,
            deadline
        );

        // Cancel the intent
        submission::cancel_intent(user, admin_addr, 0);

        // Verify refund
        let balance_after = test_tokens::get_token_a_balance(admin_addr, user_addr);
        assert!(balance_after == balance_before, 1);

        // Verify status is cancelled
        let record = submission::borrow_intent(admin_addr, 0);
        let status = types::get_record_status(&record);
        assert!(types::is_cancelled(status), 2);
    }

    // ============ Solver Registration Tests ============

    #[test(aptos_framework = @0x1, admin = @velox, user = @0x123, solver = @0x456)]
    fun test_solver_registration(
        aptos_framework: &signer,
        admin: &signer,
        user: &signer,
        solver: &signer
    ) {
        setup_test(aptos_framework, admin, user, solver);

        let admin_addr = signer::address_of(admin);
        let solver_addr = signer::address_of(solver);

        // Need to setup AptosCoin for staking
        let (burn_cap, mint_cap) = aptos_framework::aptos_coin::initialize_for_test(aptos_framework);
        coin::register<AptosCoin>(solver);
        coin::register<AptosCoin>(admin); // Registry needs coin store to receive stake
        let coins = coin::mint<AptosCoin>(200_000_000, &mint_cap); // 2 APT
        coin::deposit(solver_addr, coins);
        coin::destroy_mint_cap(mint_cap);
        coin::destroy_burn_cap(burn_cap);

        // Register solver with metadata and stake
        let metadata_uri = string::utf8(b"ipfs://QmTestSolver123");
        solver_registry::register_and_stake(solver, admin_addr, metadata_uri, 100_000_000);

        // Verify registration
        assert!(solver_registry::is_registered(admin_addr, solver_addr), 1);
        assert!(solver_registry::is_active(admin_addr, solver_addr), 2);

        // Verify total solvers
        let total = solver_registry::get_total_solvers(admin_addr);
        assert!(total == 1, 3);

        // Verify stake
        let stake = solver_registry::get_stake(admin_addr, solver_addr);
        assert!(stake == 100_000_000, 4);
    }

    // ============ Error Case Tests ============

    #[test(aptos_framework = @0x1, admin = @velox, user = @0x123, solver = @0x456)]
    #[expected_failure(abort_code = 90, location = velox::submission)]
    fun test_submit_expired_deadline(
        aptos_framework: &signer,
        admin: &signer,
        user: &signer,
        solver: &signer
    ) {
        setup_test(aptos_framework, admin, user, solver);

        let admin_addr = signer::address_of(admin);
        let token_a = test_tokens::get_token_a_address(admin_addr);
        let token_b = test_tokens::get_token_b_address(admin_addr);

        // Try to submit with expired deadline (should fail)
        let expired_deadline = timestamp::now_seconds() - 1;
        submission::submit_swap(
            user,
            admin_addr,
            token_a,
            token_b,
            100_0000_0000,
            90_0000_0000,
            expired_deadline
        );
    }

    #[test(aptos_framework = @0x1, admin = @velox, user = @0x123, solver = @0x456)]
    #[expected_failure(abort_code = 10, location = velox::submission)]
    fun test_submit_zero_amount(
        aptos_framework: &signer,
        admin: &signer,
        user: &signer,
        solver: &signer
    ) {
        setup_test(aptos_framework, admin, user, solver);

        let admin_addr = signer::address_of(admin);
        let token_a = test_tokens::get_token_a_address(admin_addr);
        let token_b = test_tokens::get_token_b_address(admin_addr);

        // Try to submit with zero amount (should fail)
        let deadline = timestamp::now_seconds() + 3600;
        submission::submit_swap(
            user,
            admin_addr,
            token_a,
            token_b,
            0, // zero amount
            0,
            deadline
        );
    }

    // ============ View Function Tests ============

    #[test(aptos_framework = @0x1, admin = @velox, user = @0x123, solver = @0x456)]
    fun test_view_functions(
        aptos_framework: &signer,
        admin: &signer,
        user: &signer,
        solver: &signer
    ) {
        setup_test(aptos_framework, admin, user, solver);

        let admin_addr = signer::address_of(admin);

        let token_a = test_tokens::get_token_a_address(admin_addr);
        let token_b = test_tokens::get_token_b_address(admin_addr);

        // Submit swap intent
        let deadline = timestamp::now_seconds() + 3600;
        submission::submit_swap(
            user,
            admin_addr,
            token_a,
            token_b,
            100_0000_0000,
            90_0000_0000,
            deadline
        );

        // Test intent_exists
        assert!(submission::intent_exists(admin_addr, 0), 1);
        assert!(!submission::intent_exists(admin_addr, 999), 2);

        // Test can_fill
        let solver_addr = signer::address_of(solver);
        assert!(settlement::can_fill(admin_addr, 0, solver_addr), 3);

        // Test max_fills
        assert!(settlement::max_fills() == 5, 4);

        // Test fee_bps
        let fee = settlement::get_fee_bps(admin_addr);
        assert!(fee == 30, 5); // 0.3% = 30 bps
    }
}
