/// Velox Solver Registry Module
/// Manages solver registration, staking, and reputation tracking
module velox::solver_registry {
    use std::signer;
    use std::string::String;
    use std::vector;
    use aptos_std::smart_table::{Self, SmartTable};
    use aptos_framework::timestamp;
    use aptos_framework::event;
    use aptos_framework::coin;
    use aptos_framework::aptos_coin::AptosCoin;
    use velox::types::{Self, SolverInfo};
    use velox::errors;

    // ============ Constants ============
    const MIN_STAKE: u64 = 100_000_000; // 1 APT minimum
    const UNSTAKE_COOLDOWN: u64 = 604800; // 7 days in seconds
    const INITIAL_REPUTATION: u64 = 5000; // Start at 50%
    const MAX_REPUTATION: u64 = 10000; // 100%

    // ============ Storage ============

    struct SolverRegistry has key {
        admin: address,
        solvers: SmartTable<address, SolverInfo>,
        solver_list: vector<address>,
        min_stake: u64,
        unstake_cooldown: u64,
        total_staked: u64
    }

    // ============ Events ============

    #[event]
    struct SolverRegistered has drop, store {
        solver: address,
        metadata_uri: String,
        stake: u64,
        registered_at: u64
    }

    #[event]
    struct StakeAdded has drop, store {
        solver: address,
        amount: u64,
        new_total: u64
    }

    #[event]
    struct UnstakeInitiated has drop, store {
        solver: address,
        amount: u64,
        available_at: u64
    }

    #[event]
    struct UnstakeCompleted has drop, store {
        solver: address,
        amount: u64,
        remaining_stake: u64
    }

    #[event]
    struct SolverDeactivated has drop, store {
        solver: address,
        deactivated_at: u64
    }

    #[event]
    struct SolverReactivated has drop, store {
        solver: address,
        reactivated_at: u64
    }

    #[event]
    struct ReputationUpdated has drop, store {
        solver: address,
        old_score: u64,
        new_score: u64,
        is_success: bool
    }

    #[event]
    struct MetadataUpdated has drop, store {
        solver: address,
        new_metadata_uri: String
    }

    // ============ Initialize ============

    public entry fun initialize(admin: &signer) {
        let admin_addr = signer::address_of(admin);
        assert!(!exists<SolverRegistry>(admin_addr), errors::already_initialized());

        move_to(admin, SolverRegistry {
            admin: admin_addr,
            solvers: smart_table::new(),
            solver_list: vector::empty(),
            min_stake: MIN_STAKE,
            unstake_cooldown: UNSTAKE_COOLDOWN,
            total_staked: 0
        });
    }

    // ============ Registration ============

    /// Register as solver with metadata and stake in a single call
    public entry fun register_and_stake(
        solver: &signer,
        registry_addr: address,
        metadata_uri: String,
        stake_amount: u64
    ) acquires SolverRegistry {
        let solver_addr = signer::address_of(solver);
        let registry = borrow_global_mut<SolverRegistry>(registry_addr);

        assert!(!smart_table::contains(&registry.solvers, solver_addr), errors::solver_already_registered());
        assert!(stake_amount >= registry.min_stake, errors::insufficient_stake());

        let now = timestamp::now_seconds();

        // Create solver info using types module
        let info = types::new_solver_info(
            metadata_uri,
            stake_amount,
            now,
            INITIAL_REPUTATION
        );

        // Transfer stake
        let stake_coins = coin::withdraw<AptosCoin>(solver, stake_amount);
        coin::deposit(registry_addr, stake_coins);

        smart_table::add(&mut registry.solvers, solver_addr, info);
        vector::push_back(&mut registry.solver_list, solver_addr);
        registry.total_staked = registry.total_staked + stake_amount;

        event::emit(SolverRegistered {
            solver: solver_addr,
            metadata_uri: types::get_solver_metadata_uri(&info),
            stake: stake_amount,
            registered_at: now
        });
    }

    /// Add more stake
    public entry fun add_stake(
        solver: &signer,
        registry_addr: address,
        amount: u64
    ) acquires SolverRegistry {
        let solver_addr = signer::address_of(solver);
        let registry = borrow_global_mut<SolverRegistry>(registry_addr);

        assert!(smart_table::contains(&registry.solvers, solver_addr), errors::solver_not_registered());
        assert!(amount > 0, errors::zero_amount());

        let info = smart_table::borrow_mut(&mut registry.solvers, solver_addr);
        types::add_solver_stake(info, amount);

        let stake_coins = coin::withdraw<AptosCoin>(solver, amount);
        coin::deposit(registry_addr, stake_coins);

        registry.total_staked = registry.total_staked + amount;

        event::emit(StakeAdded {
            solver: solver_addr,
            amount,
            new_total: types::get_solver_stake(info)
        });
    }

    /// Initiate unstake with cooldown
    public entry fun initiate_unstake(
        solver: &signer,
        registry_addr: address,
        amount: u64
    ) acquires SolverRegistry {
        let solver_addr = signer::address_of(solver);
        let registry = borrow_global_mut<SolverRegistry>(registry_addr);

        assert!(smart_table::contains(&registry.solvers, solver_addr), errors::solver_not_registered());

        let info = smart_table::borrow_mut(&mut registry.solvers, solver_addr);
        let current_stake = types::get_solver_stake(info);

        // Must keep minimum stake after unstake
        assert!(current_stake >= amount + registry.min_stake, errors::insufficient_stake());
        assert!(types::get_solver_pending_unstake(info) == 0, errors::cooldown_not_complete());

        let available_at = timestamp::now_seconds() + registry.unstake_cooldown;
        types::set_pending_unstake(info, amount, available_at);

        event::emit(UnstakeInitiated {
            solver: solver_addr,
            amount,
            available_at
        });
    }

    /// Complete unstake after cooldown
    public entry fun complete_unstake(
        solver: &signer,
        registry_addr: address
    ) acquires SolverRegistry {
        let solver_addr = signer::address_of(solver);
        let registry = borrow_global_mut<SolverRegistry>(registry_addr);

        assert!(smart_table::contains(&registry.solvers, solver_addr), errors::solver_not_registered());

        let info = smart_table::borrow_mut(&mut registry.solvers, solver_addr);
        let pending = types::get_solver_pending_unstake(info);
        let available_at = types::get_solver_unstake_available_at(info);

        assert!(pending > 0, errors::no_pending_unstake());
        assert!(timestamp::now_seconds() >= available_at, errors::cooldown_not_complete());

        types::complete_unstake(info);
        registry.total_staked = registry.total_staked - pending;

        // TODO: Transfer tokens back to solver (requires registry to hold tokens)
        // For now, just update the state

        event::emit(UnstakeCompleted {
            solver: solver_addr,
            amount: pending,
            remaining_stake: types::get_solver_stake(info)
        });
    }

    /// Update metadata URI
    public entry fun update_metadata(
        solver: &signer,
        registry_addr: address,
        new_metadata_uri: String
    ) acquires SolverRegistry {
        let solver_addr = signer::address_of(solver);
        let registry = borrow_global_mut<SolverRegistry>(registry_addr);

        assert!(smart_table::contains(&registry.solvers, solver_addr), errors::solver_not_registered());

        let info = smart_table::borrow_mut(&mut registry.solvers, solver_addr);
        types::set_solver_metadata_uri(info, new_metadata_uri);

        event::emit(MetadataUpdated {
            solver: solver_addr,
            new_metadata_uri: types::get_solver_metadata_uri(info)
        });
    }

    /// Deactivate self
    public entry fun deactivate(
        solver: &signer,
        registry_addr: address
    ) acquires SolverRegistry {
        let solver_addr = signer::address_of(solver);
        let registry = borrow_global_mut<SolverRegistry>(registry_addr);

        assert!(smart_table::contains(&registry.solvers, solver_addr), errors::solver_not_registered());

        let info = smart_table::borrow_mut(&mut registry.solvers, solver_addr);
        assert!(types::is_solver_active(info), errors::solver_inactive());

        types::set_solver_active(info, false);

        event::emit(SolverDeactivated {
            solver: solver_addr,
            deactivated_at: timestamp::now_seconds()
        });
    }

    /// Reactivate self
    public entry fun reactivate(
        solver: &signer,
        registry_addr: address
    ) acquires SolverRegistry {
        let solver_addr = signer::address_of(solver);
        let registry = borrow_global_mut<SolverRegistry>(registry_addr);

        assert!(smart_table::contains(&registry.solvers, solver_addr), errors::solver_not_registered());

        let info = smart_table::borrow_mut(&mut registry.solvers, solver_addr);
        assert!(!types::is_solver_active(info), errors::solver_already_registered());

        types::set_solver_active(info, true);

        event::emit(SolverReactivated {
            solver: solver_addr,
            reactivated_at: timestamp::now_seconds()
        });
    }

    // ============ Reputation Updates (Package) ============

    /// Record successful fill
    public(package) fun record_success(
        registry_addr: address,
        solver: address,
        volume: u64
    ) acquires SolverRegistry {
        let registry = borrow_global_mut<SolverRegistry>(registry_addr);
        if (!smart_table::contains(&registry.solvers, solver)) return;

        let info = smart_table::borrow_mut(&mut registry.solvers, solver);
        let old_score = types::get_solver_reputation(info);

        types::record_solver_success(info, volume);
        types::update_last_active(info, timestamp::now_seconds());

        // Increase reputation by 100 points per success (max 10000)
        let new_score = if (old_score + 100 > MAX_REPUTATION) {
            MAX_REPUTATION
        } else {
            old_score + 100
        };
        types::set_solver_reputation(info, new_score);

        event::emit(ReputationUpdated {
            solver,
            old_score,
            new_score,
            is_success: true
        });
    }

    /// Record failed fill
    public(package) fun record_failure(
        registry_addr: address,
        solver: address
    ) acquires SolverRegistry {
        let registry = borrow_global_mut<SolverRegistry>(registry_addr);
        if (!smart_table::contains(&registry.solvers, solver)) return;

        let info = smart_table::borrow_mut(&mut registry.solvers, solver);
        let old_score = types::get_solver_reputation(info);

        types::record_solver_failure(info);
        types::update_last_active(info, timestamp::now_seconds());

        // Decrease reputation by 200 points per failure (min 0)
        let new_score = if (old_score < 200) { 0 } else { old_score - 200 };
        types::set_solver_reputation(info, new_score);

        event::emit(ReputationUpdated {
            solver,
            old_score,
            new_score,
            is_success: false
        });
    }

    // ============ View Functions ============

    #[view]
    public fun is_registered(registry_addr: address, solver: address): bool acquires SolverRegistry {
        let registry = borrow_global<SolverRegistry>(registry_addr);
        smart_table::contains(&registry.solvers, solver)
    }

    #[view]
    public fun is_active(registry_addr: address, solver: address): bool acquires SolverRegistry {
        let registry = borrow_global<SolverRegistry>(registry_addr);
        if (!smart_table::contains(&registry.solvers, solver)) return false;
        types::is_solver_active(smart_table::borrow(&registry.solvers, solver))
    }

    #[view]
    public fun get_solver_info(registry_addr: address, solver: address): SolverInfo acquires SolverRegistry {
        let registry = borrow_global<SolverRegistry>(registry_addr);
        assert!(smart_table::contains(&registry.solvers, solver), errors::solver_not_registered());
        *smart_table::borrow(&registry.solvers, solver)
    }

    #[view]
    public fun get_stake(registry_addr: address, solver: address): u64 acquires SolverRegistry {
        let registry = borrow_global<SolverRegistry>(registry_addr);
        if (!smart_table::contains(&registry.solvers, solver)) return 0;
        types::get_solver_stake(smart_table::borrow(&registry.solvers, solver))
    }

    #[view]
    public fun get_reputation(registry_addr: address, solver: address): u64 acquires SolverRegistry {
        let registry = borrow_global<SolverRegistry>(registry_addr);
        if (!smart_table::contains(&registry.solvers, solver)) return 0;
        types::get_solver_reputation(smart_table::borrow(&registry.solvers, solver))
    }

    #[view]
    public fun get_metadata_uri(registry_addr: address, solver: address): String acquires SolverRegistry {
        let registry = borrow_global<SolverRegistry>(registry_addr);
        assert!(smart_table::contains(&registry.solvers, solver), errors::solver_not_registered());
        types::get_solver_metadata_uri(smart_table::borrow(&registry.solvers, solver))
    }

    #[view]
    public fun get_solver_stats(
        registry_addr: address,
        solver: address
    ): (u64, u64, u64, u128) acquires SolverRegistry {
        let registry = borrow_global<SolverRegistry>(registry_addr);
        assert!(smart_table::contains(&registry.solvers, solver), errors::solver_not_registered());
        let info = smart_table::borrow(&registry.solvers, solver);
        (
            types::get_solver_successful_fills(info),
            types::get_solver_failed_fills(info),
            types::get_solver_reputation(info),
            types::get_solver_total_volume(info)
        )
    }

    #[view]
    public fun get_total_solvers(registry_addr: address): u64 acquires SolverRegistry {
        vector::length(&borrow_global<SolverRegistry>(registry_addr).solver_list)
    }

    #[view]
    public fun get_total_staked(registry_addr: address): u64 acquires SolverRegistry {
        borrow_global<SolverRegistry>(registry_addr).total_staked
    }

    #[view]
    public fun get_min_stake(registry_addr: address): u64 acquires SolverRegistry {
        borrow_global<SolverRegistry>(registry_addr).min_stake
    }

    #[view]
    public fun get_all_solvers(registry_addr: address): vector<address> acquires SolverRegistry {
        borrow_global<SolverRegistry>(registry_addr).solver_list
    }
}
