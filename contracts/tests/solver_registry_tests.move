/// Solver Registry Edge Case Tests
/// Tests registration, staking, unstaking, reputation, and deactivation
#[test_only]
module velox::solver_registry_tests {
    use std::signer;
    use std::string;
    use aptos_framework::account;
    use aptos_framework::timestamp;
    use aptos_framework::coin;
    use aptos_framework::aptos_coin::AptosCoin;
    use velox::solver_registry;
    use velox::types;

    // ============ Constants ============
    const MIN_STAKE: u64 = 100_000_000; // 1 APT
    const UNSTAKE_COOLDOWN: u64 = 604800; // 7 days

    // ============ Test Setup ============

    fun setup(aptos_framework: &signer, admin: &signer, solver: &signer) {
        timestamp::set_time_has_started_for_testing(aptos_framework);
        timestamp::update_global_time_for_test_secs(1000);

        account::create_account_for_test(signer::address_of(admin));
        account::create_account_for_test(signer::address_of(solver));

        solver_registry::initialize(admin);

        // Setup AptosCoin for staking
        let (burn_cap, mint_cap) = aptos_framework::aptos_coin::initialize_for_test(aptos_framework);
        coin::register<AptosCoin>(solver);
        coin::register<AptosCoin>(admin);
        let coins = coin::mint<AptosCoin>(1000_000_000, &mint_cap); // 10 APT
        coin::deposit(signer::address_of(solver), coins);
        coin::destroy_mint_cap(mint_cap);
        coin::destroy_burn_cap(burn_cap);
    }

    // ============ Registration Tests ============

    #[test(aptos_framework = @0x1, admin = @velox, solver = @0x456)]
    fun test_register_with_exact_min_stake(
        aptos_framework: &signer, admin: &signer, solver: &signer
    ) {
        setup(aptos_framework, admin, solver);
        let admin_addr = signer::address_of(admin);
        let solver_addr = signer::address_of(solver);

        let metadata = string::utf8(b"ipfs://solver");
        solver_registry::register_and_stake(solver, admin_addr, metadata, MIN_STAKE);

        assert!(solver_registry::is_registered(admin_addr, solver_addr), 1);
        assert!(solver_registry::is_active(admin_addr, solver_addr), 2);
        assert!(solver_registry::get_stake(admin_addr, solver_addr) == MIN_STAKE, 3);
    }

    #[test(aptos_framework = @0x1, admin = @velox, solver = @0x456)]
    #[expected_failure(abort_code = 22, location = velox::solver_registry)]
    fun test_register_with_stake_below_min_fails(
        aptos_framework: &signer, admin: &signer, solver: &signer
    ) {
        setup(aptos_framework, admin, solver);
        let admin_addr = signer::address_of(admin);

        let metadata = string::utf8(b"ipfs://solver");
        // Stake 1 wei below minimum
        solver_registry::register_and_stake(solver, admin_addr, metadata, MIN_STAKE - 1);
    }

    #[test(aptos_framework = @0x1, admin = @velox, solver = @0x456)]
    #[expected_failure(abort_code = 21, location = velox::solver_registry)]
    fun test_register_twice_fails(
        aptos_framework: &signer, admin: &signer, solver: &signer
    ) {
        setup(aptos_framework, admin, solver);
        let admin_addr = signer::address_of(admin);

        let metadata = string::utf8(b"ipfs://solver");
        solver_registry::register_and_stake(solver, admin_addr, metadata, MIN_STAKE);
        // Second registration should fail
        solver_registry::register_and_stake(solver, admin_addr, metadata, MIN_STAKE);
    }

    // ============ Add Stake Tests ============

    #[test(aptos_framework = @0x1, admin = @velox, solver = @0x456)]
    fun test_add_stake_to_registered_solver(
        aptos_framework: &signer, admin: &signer, solver: &signer
    ) {
        setup(aptos_framework, admin, solver);
        let admin_addr = signer::address_of(admin);
        let solver_addr = signer::address_of(solver);

        let metadata = string::utf8(b"ipfs://solver");
        solver_registry::register_and_stake(solver, admin_addr, metadata, MIN_STAKE);

        // Add more stake
        solver_registry::add_stake(solver, admin_addr, 50_000_000);

        let new_stake = solver_registry::get_stake(admin_addr, solver_addr);
        assert!(new_stake == MIN_STAKE + 50_000_000, 1);
    }

    #[test(aptos_framework = @0x1, admin = @velox, solver = @0x456)]
    #[expected_failure(abort_code = 10, location = velox::solver_registry)]
    fun test_add_zero_stake_fails(
        aptos_framework: &signer, admin: &signer, solver: &signer
    ) {
        setup(aptos_framework, admin, solver);
        let admin_addr = signer::address_of(admin);

        let metadata = string::utf8(b"ipfs://solver");
        solver_registry::register_and_stake(solver, admin_addr, metadata, MIN_STAKE);

        // Add 0 stake should fail
        solver_registry::add_stake(solver, admin_addr, 0);
    }

    // ============ Unstake Tests ============

    #[test(aptos_framework = @0x1, admin = @velox, solver = @0x456)]
    fun test_initiate_unstake_leaving_min_stake(
        aptos_framework: &signer, admin: &signer, solver: &signer
    ) {
        setup(aptos_framework, admin, solver);
        let admin_addr = signer::address_of(admin);
        let solver_addr = signer::address_of(solver);

        let metadata = string::utf8(b"ipfs://solver");
        // Register with 2x min stake
        solver_registry::register_and_stake(solver, admin_addr, metadata, MIN_STAKE * 2);

        // Unstake half, leaving exactly min_stake
        solver_registry::initiate_unstake(solver, admin_addr, MIN_STAKE);

        let remaining = solver_registry::get_stake(admin_addr, solver_addr);
        assert!(remaining == MIN_STAKE, 1);
    }

    #[test(aptos_framework = @0x1, admin = @velox, solver = @0x456)]
    #[expected_failure(abort_code = 22, location = velox::solver_registry)]
    fun test_initiate_unstake_leaving_less_than_min_fails(
        aptos_framework: &signer, admin: &signer, solver: &signer
    ) {
        setup(aptos_framework, admin, solver);
        let admin_addr = signer::address_of(admin);

        let metadata = string::utf8(b"ipfs://solver");
        solver_registry::register_and_stake(solver, admin_addr, metadata, MIN_STAKE * 2);

        // Try to unstake more than allowed (would leave < min_stake)
        solver_registry::initiate_unstake(solver, admin_addr, MIN_STAKE + 1);
    }

    #[test(aptos_framework = @0x1, admin = @velox, solver = @0x456)]
    #[expected_failure(abort_code = 25, location = velox::solver_registry)]
    fun test_complete_unstake_before_cooldown_fails(
        aptos_framework: &signer, admin: &signer, solver: &signer
    ) {
        setup(aptos_framework, admin, solver);
        let admin_addr = signer::address_of(admin);

        let metadata = string::utf8(b"ipfs://solver");
        solver_registry::register_and_stake(solver, admin_addr, metadata, MIN_STAKE * 2);
        solver_registry::initiate_unstake(solver, admin_addr, MIN_STAKE);

        // Try to complete before cooldown
        solver_registry::complete_unstake(solver, admin_addr);
    }

    #[test(aptos_framework = @0x1, admin = @velox, solver = @0x456)]
    fun test_complete_unstake_at_exact_cooldown(
        aptos_framework: &signer, admin: &signer, solver: &signer
    ) {
        setup(aptos_framework, admin, solver);
        let admin_addr = signer::address_of(admin);
        let solver_addr = signer::address_of(solver);

        let metadata = string::utf8(b"ipfs://solver");
        solver_registry::register_and_stake(solver, admin_addr, metadata, MIN_STAKE * 2);
        solver_registry::initiate_unstake(solver, admin_addr, MIN_STAKE);

        // Advance to exactly cooldown time
        timestamp::update_global_time_for_test_secs(1000 + UNSTAKE_COOLDOWN);

        solver_registry::complete_unstake(solver, admin_addr);

        // Stake should remain at min_stake (unstaked amount was pending)
        let remaining = solver_registry::get_stake(admin_addr, solver_addr);
        assert!(remaining == MIN_STAKE, 1);
    }

    #[test(aptos_framework = @0x1, admin = @velox, solver = @0x456)]
    #[expected_failure(abort_code = 26, location = velox::solver_registry)]
    fun test_complete_unstake_no_pending_fails(
        aptos_framework: &signer, admin: &signer, solver: &signer
    ) {
        setup(aptos_framework, admin, solver);
        let admin_addr = signer::address_of(admin);

        let metadata = string::utf8(b"ipfs://solver");
        solver_registry::register_and_stake(solver, admin_addr, metadata, MIN_STAKE);

        // Try to complete without initiating
        solver_registry::complete_unstake(solver, admin_addr);
    }

    // ============ Deactivation/Reactivation Tests ============

    #[test(aptos_framework = @0x1, admin = @velox, solver = @0x456)]
    fun test_deactivate_then_reactivate(
        aptos_framework: &signer, admin: &signer, solver: &signer
    ) {
        setup(aptos_framework, admin, solver);
        let admin_addr = signer::address_of(admin);
        let solver_addr = signer::address_of(solver);

        let metadata = string::utf8(b"ipfs://solver");
        solver_registry::register_and_stake(solver, admin_addr, metadata, MIN_STAKE);

        assert!(solver_registry::is_active(admin_addr, solver_addr), 1);

        // Deactivate
        solver_registry::deactivate(solver, admin_addr);
        assert!(!solver_registry::is_active(admin_addr, solver_addr), 2);

        // Reactivate
        solver_registry::reactivate(solver, admin_addr);
        assert!(solver_registry::is_active(admin_addr, solver_addr), 3);
    }

    #[test(aptos_framework = @0x1, admin = @velox, solver = @0x456)]
    #[expected_failure(abort_code = 23, location = velox::solver_registry)]
    fun test_deactivate_already_inactive_fails(
        aptos_framework: &signer, admin: &signer, solver: &signer
    ) {
        setup(aptos_framework, admin, solver);
        let admin_addr = signer::address_of(admin);

        let metadata = string::utf8(b"ipfs://solver");
        solver_registry::register_and_stake(solver, admin_addr, metadata, MIN_STAKE);
        solver_registry::deactivate(solver, admin_addr);

        // Deactivate again should fail
        solver_registry::deactivate(solver, admin_addr);
    }

    // ============ Reputation Tests ============

    #[test(aptos_framework = @0x1, admin = @velox, solver = @0x456)]
    fun test_reputation_increase_on_success(
        aptos_framework: &signer, admin: &signer, solver: &signer
    ) {
        setup(aptos_framework, admin, solver);
        let admin_addr = signer::address_of(admin);
        let solver_addr = signer::address_of(solver);

        let metadata = string::utf8(b"ipfs://solver");
        solver_registry::register_and_stake(solver, admin_addr, metadata, MIN_STAKE);

        // Initial reputation is 5000 (50%)
        let initial_rep = solver_registry::get_reputation(admin_addr, solver_addr);
        assert!(initial_rep == 5000, 1);

        // Record success - should increase by 100
        solver_registry::record_success(admin_addr, solver_addr, 1000);

        let new_rep = solver_registry::get_reputation(admin_addr, solver_addr);
        assert!(new_rep == 5100, 2);
    }

    #[test(aptos_framework = @0x1, admin = @velox, solver = @0x456)]
    fun test_reputation_decrease_on_failure(
        aptos_framework: &signer, admin: &signer, solver: &signer
    ) {
        setup(aptos_framework, admin, solver);
        let admin_addr = signer::address_of(admin);
        let solver_addr = signer::address_of(solver);

        let metadata = string::utf8(b"ipfs://solver");
        solver_registry::register_and_stake(solver, admin_addr, metadata, MIN_STAKE);

        let initial_rep = solver_registry::get_reputation(admin_addr, solver_addr);
        assert!(initial_rep == 5000, 1);

        // Record failure - should decrease by 200
        solver_registry::record_failure(admin_addr, solver_addr);

        let new_rep = solver_registry::get_reputation(admin_addr, solver_addr);
        assert!(new_rep == 4800, 2);
    }

    #[test(aptos_framework = @0x1, admin = @velox, solver = @0x456)]
    fun test_reputation_cap_at_10000(
        aptos_framework: &signer, admin: &signer, solver: &signer
    ) {
        setup(aptos_framework, admin, solver);
        let admin_addr = signer::address_of(admin);
        let solver_addr = signer::address_of(solver);

        let metadata = string::utf8(b"ipfs://solver");
        solver_registry::register_and_stake(solver, admin_addr, metadata, MIN_STAKE);

        // Record many successes to try to exceed max
        let i = 0;
        while (i < 100) {
            solver_registry::record_success(admin_addr, solver_addr, 1000);
            i = i + 1;
        };

        let rep = solver_registry::get_reputation(admin_addr, solver_addr);
        assert!(rep == 10000, 1); // Capped at max
    }

    #[test(aptos_framework = @0x1, admin = @velox, solver = @0x456)]
    fun test_reputation_floor_at_0(
        aptos_framework: &signer, admin: &signer, solver: &signer
    ) {
        setup(aptos_framework, admin, solver);
        let admin_addr = signer::address_of(admin);
        let solver_addr = signer::address_of(solver);

        let metadata = string::utf8(b"ipfs://solver");
        solver_registry::register_and_stake(solver, admin_addr, metadata, MIN_STAKE);

        // Record many failures to try to go below 0
        let i = 0;
        while (i < 50) {
            solver_registry::record_failure(admin_addr, solver_addr);
            i = i + 1;
        };

        let rep = solver_registry::get_reputation(admin_addr, solver_addr);
        assert!(rep == 0, 1); // Floored at 0
    }

    // ============ Metadata Tests ============

    #[test(aptos_framework = @0x1, admin = @velox, solver = @0x456)]
    fun test_update_metadata(
        aptos_framework: &signer, admin: &signer, solver: &signer
    ) {
        setup(aptos_framework, admin, solver);
        let admin_addr = signer::address_of(admin);
        let solver_addr = signer::address_of(solver);

        let metadata = string::utf8(b"ipfs://solver");
        solver_registry::register_and_stake(solver, admin_addr, metadata, MIN_STAKE);

        let new_metadata = string::utf8(b"ipfs://solver_v2");
        solver_registry::update_metadata(solver, admin_addr, new_metadata);

        let stored = solver_registry::get_metadata_uri(admin_addr, solver_addr);
        assert!(stored == string::utf8(b"ipfs://solver_v2"), 1);
    }

    // ============ View Function Tests ============

    #[test(aptos_framework = @0x1, admin = @velox, solver = @0x456)]
    fun test_get_solver_stats(
        aptos_framework: &signer, admin: &signer, solver: &signer
    ) {
        setup(aptos_framework, admin, solver);
        let admin_addr = signer::address_of(admin);
        let solver_addr = signer::address_of(solver);

        let metadata = string::utf8(b"ipfs://solver");
        solver_registry::register_and_stake(solver, admin_addr, metadata, MIN_STAKE);

        // Record some activity
        solver_registry::record_success(admin_addr, solver_addr, 1000);
        solver_registry::record_success(admin_addr, solver_addr, 2000);
        solver_registry::record_failure(admin_addr, solver_addr);

        let (successful, failed, reputation, volume) =
            solver_registry::get_solver_stats(admin_addr, solver_addr);

        assert!(successful == 2, 1);
        assert!(failed == 1, 2);
        assert!(reputation == 5000, 3); // 5000 + 100 + 100 - 200 = 5000
        assert!(volume == 3000, 4);
    }

    #[test(aptos_framework = @0x1, admin = @velox, solver = @0x456)]
    fun test_get_total_staked(
        aptos_framework: &signer, admin: &signer, solver: &signer
    ) {
        setup(aptos_framework, admin, solver);
        let admin_addr = signer::address_of(admin);

        let metadata = string::utf8(b"ipfs://solver");
        solver_registry::register_and_stake(solver, admin_addr, metadata, MIN_STAKE);

        let total = solver_registry::get_total_staked(admin_addr);
        assert!(total == MIN_STAKE, 1);
    }
}
