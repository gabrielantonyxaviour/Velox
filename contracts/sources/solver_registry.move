/// Solver Registry Module for Velox
/// Manages solver registration, reputation, staking, and performance tracking
module velox::solver_registry {
    use std::signer;
    use std::vector;
    use aptos_std::smart_table::{Self, SmartTable};
    use aptos_framework::timestamp;
    use aptos_framework::event;
    use velox::errors;

    // ============ Constants ============

    const MAX_REPUTATION: u64 = 10000;  // 100% in basis points
    const INITIAL_REPUTATION: u64 = 5000;  // Start at 50%
    const SECONDS_PER_DAY: u64 = 86400;

    // ============ Storage ============

    /// Enhanced solver information with reputation
    struct SolverInfo has store, drop, copy {
        solver: address,
        stake: u64,
        is_active: bool,
        registered_at: u64,
        // Reputation metrics
        reputation_score: u64,        // 0-10000 (basis points)
        total_intents_solved: u64,
        successful_fills: u64,
        failed_fills: u64,
        total_volume: u128,
        average_slippage: u64,        // In basis points
        average_execution_time: u64,  // In seconds
        last_active: u64,
        // Unstaking
        pending_unstake: u64,
        unstake_available_at: u64
    }

    /// Reputation configuration
    struct ReputationConfig has key {
        success_points: u64,          // Points gained per successful fill
        failure_penalty: u64,         // Points lost per failed fill
        min_reputation: u64,          // Minimum reputation to participate
        decay_rate: u64,              // Decay per day in basis points
        fast_execution_bonus: u64,    // Bonus for fast execution
        min_stake: u64,               // Minimum stake required
        unstake_cooldown: u64,        // Cooldown in seconds
        last_decay_timestamp: u64     // Last time decay was applied
    }

    /// Global solver registry
    struct SolverRegistry has key {
        admin: address,
        solvers: SmartTable<address, SolverInfo>,
        solver_list: vector<address>,
        total_solvers: u64,
        active_solvers: u64,
        total_staked: u64
    }

    // ============ Events ============

    #[event]
    struct SolverRegistered has drop, store { solver: address, stake: u64, registered_at: u64 }

    #[event]
    struct SolverDeactivated has drop, store { solver: address, deactivated_at: u64 }

    #[event]
    struct SolverReactivated has drop, store { solver: address, reactivated_at: u64 }

    #[event]
    struct ReputationChanged has drop, store {
        solver: address,
        old_score: u64,
        new_score: u64,
        reason: u8,  // 0: fill, 1: fail, 2: slash, 3: bonus, 4: decay
        intent_id: u64
    }

    #[event]
    struct SolverSlashed has drop, store {
        solver: address,
        amount: u64,
        reason: vector<u8>,
        new_stake: u64
    }

    #[event]
    struct StakeChanged has drop, store { solver: address, old_stake: u64, new_stake: u64, is_increase: bool }

    #[event]
    struct UnstakeInitiated has drop, store { solver: address, amount: u64, available_at: u64 }

    // ============ Initialize ============

    /// Initialize the solver registry with reputation config (admin only)
    public entry fun initialize(admin: &signer) {
        let admin_addr = signer::address_of(admin);
        assert!(!exists<SolverRegistry>(admin_addr), errors::solver_already_registered());

        move_to(admin, SolverRegistry {
            admin: admin_addr,
            solvers: smart_table::new(),
            solver_list: vector::empty(),
            total_solvers: 0,
            active_solvers: 0,
            total_staked: 0
        });

        move_to(admin, ReputationConfig {
            success_points: 100,
            failure_penalty: 200,
            min_reputation: 2000,  // 20%
            decay_rate: 10,        // 0.1% per day
            fast_execution_bonus: 50,
            min_stake: 1000000,    // Minimum stake
            unstake_cooldown: 604800,  // 7 days
            last_decay_timestamp: timestamp::now_seconds()
        });
    }

    // ============ Entry Functions ============

    /// Register as a solver with initial stake
    public entry fun register(solver: &signer, registry_addr: address, stake: u64) acquires SolverRegistry, ReputationConfig {
        let solver_addr = signer::address_of(solver);
        let registry = borrow_global_mut<SolverRegistry>(registry_addr);
        let config = borrow_global<ReputationConfig>(registry_addr);

        assert!(!smart_table::contains(&registry.solvers, solver_addr), errors::solver_already_registered());
        assert!(stake >= config.min_stake, errors::insufficient_stake());

        let now = timestamp::now_seconds();
        let info = SolverInfo {
            solver: solver_addr,
            stake,
            is_active: true,
            registered_at: now,
            reputation_score: INITIAL_REPUTATION,
            total_intents_solved: 0,
            successful_fills: 0,
            failed_fills: 0,
            total_volume: 0,
            average_slippage: 0,
            average_execution_time: 0,
            last_active: now,
            pending_unstake: 0,
            unstake_available_at: 0
        };

        smart_table::add(&mut registry.solvers, solver_addr, info);
        vector::push_back(&mut registry.solver_list, solver_addr);
        registry.total_solvers = registry.total_solvers + 1;
        registry.active_solvers = registry.active_solvers + 1;
        registry.total_staked = registry.total_staked + stake;

        event::emit(SolverRegistered { solver: solver_addr, stake, registered_at: now });
    }

    /// Add more stake
    public entry fun add_stake(solver: &signer, registry_addr: address, amount: u64) acquires SolverRegistry {
        let solver_addr = signer::address_of(solver);
        let registry = borrow_global_mut<SolverRegistry>(registry_addr);
        assert!(smart_table::contains(&registry.solvers, solver_addr), errors::solver_not_registered());

        let info = smart_table::borrow_mut(&mut registry.solvers, solver_addr);
        let old_stake = info.stake;
        info.stake = info.stake + amount;
        registry.total_staked = registry.total_staked + amount;

        event::emit(StakeChanged { solver: solver_addr, old_stake, new_stake: info.stake, is_increase: true });
    }

    /// Initiate unstake with cooldown
    public entry fun initiate_unstake(solver: &signer, registry_addr: address, amount: u64) acquires SolverRegistry, ReputationConfig {
        let solver_addr = signer::address_of(solver);
        let registry = borrow_global_mut<SolverRegistry>(registry_addr);
        let config = borrow_global<ReputationConfig>(registry_addr);
        assert!(smart_table::contains(&registry.solvers, solver_addr), errors::solver_not_registered());

        let info = smart_table::borrow_mut(&mut registry.solvers, solver_addr);
        assert!(info.stake >= amount + config.min_stake, errors::insufficient_stake());
        assert!(info.pending_unstake == 0, errors::cooldown_not_complete());

        info.pending_unstake = amount;
        info.unstake_available_at = timestamp::now_seconds() + config.unstake_cooldown;

        event::emit(UnstakeInitiated { solver: solver_addr, amount, available_at: info.unstake_available_at });
    }

    /// Complete unstake after cooldown
    public entry fun complete_unstake(solver: &signer, registry_addr: address) acquires SolverRegistry {
        let solver_addr = signer::address_of(solver);
        let registry = borrow_global_mut<SolverRegistry>(registry_addr);
        assert!(smart_table::contains(&registry.solvers, solver_addr), errors::solver_not_registered());

        let info = smart_table::borrow_mut(&mut registry.solvers, solver_addr);
        assert!(info.pending_unstake > 0, errors::insufficient_stake());
        assert!(timestamp::now_seconds() >= info.unstake_available_at, errors::cooldown_not_complete());

        let amount = info.pending_unstake;
        let old_stake = info.stake;
        info.stake = info.stake - amount;
        info.pending_unstake = 0;
        info.unstake_available_at = 0;
        registry.total_staked = registry.total_staked - amount;

        event::emit(StakeChanged { solver: solver_addr, old_stake, new_stake: info.stake, is_increase: false });
    }

    /// Deactivate self as a solver
    public entry fun deactivate(solver: &signer, registry_addr: address) acquires SolverRegistry {
        let solver_addr = signer::address_of(solver);
        let registry = borrow_global_mut<SolverRegistry>(registry_addr);
        assert!(smart_table::contains(&registry.solvers, solver_addr), errors::solver_not_registered());

        let info = smart_table::borrow_mut(&mut registry.solvers, solver_addr);
        assert!(info.is_active, errors::solver_not_registered());

        info.is_active = false;
        registry.active_solvers = registry.active_solvers - 1;
        event::emit(SolverDeactivated { solver: solver_addr, deactivated_at: timestamp::now_seconds() });
    }

    /// Reactivate self as a solver
    public entry fun reactivate(solver: &signer, registry_addr: address) acquires SolverRegistry, ReputationConfig {
        let solver_addr = signer::address_of(solver);
        let registry = borrow_global_mut<SolverRegistry>(registry_addr);
        let config = borrow_global<ReputationConfig>(registry_addr);
        assert!(smart_table::contains(&registry.solvers, solver_addr), errors::solver_not_registered());

        let info = smart_table::borrow_mut(&mut registry.solvers, solver_addr);
        assert!(!info.is_active, errors::solver_already_registered());
        assert!(info.reputation_score >= config.min_reputation, errors::reputation_too_low());

        info.is_active = true;
        registry.active_solvers = registry.active_solvers + 1;
        event::emit(SolverReactivated { solver: solver_addr, reactivated_at: timestamp::now_seconds() });
    }

    // ============ Admin Functions ============

    /// Record successful fill (called by settlement module)
    public entry fun record_success(
        admin: &signer,
        registry_addr: address,
        solver: address,
        intent_id: u64,
        output_amount: u64,
        expected_amount: u64,
        execution_time: u64
    ) acquires SolverRegistry, ReputationConfig {
        assert!(signer::address_of(admin) == registry_addr, errors::not_admin());
        update_reputation_internal(registry_addr, solver, intent_id, true, output_amount, expected_amount, execution_time);
    }

    /// Record failed fill
    public entry fun record_failure(
        admin: &signer,
        registry_addr: address,
        solver: address,
        intent_id: u64
    ) acquires SolverRegistry, ReputationConfig {
        assert!(signer::address_of(admin) == registry_addr, errors::not_admin());
        update_reputation_internal(registry_addr, solver, intent_id, false, 0, 0, 0);
    }

    /// Slash solver stake for malicious behavior
    public entry fun slash_solver(
        admin: &signer,
        registry_addr: address,
        solver: address,
        amount: u64,
        reason: vector<u8>
    ) acquires SolverRegistry {
        assert!(signer::address_of(admin) == registry_addr, errors::not_admin());
        let registry = borrow_global_mut<SolverRegistry>(registry_addr);
        assert!(smart_table::contains(&registry.solvers, solver), errors::solver_not_registered());

        let info = smart_table::borrow_mut(&mut registry.solvers, solver);
        assert!(info.stake >= amount, errors::slash_exceeds_stake());

        let old_score = info.reputation_score;
        info.stake = info.stake - amount;
        registry.total_staked = registry.total_staked - amount;

        // Reduce reputation by 10% on slash
        if (info.reputation_score > 1000) {
            info.reputation_score = info.reputation_score - 1000;
        } else {
            info.reputation_score = 0;
        };

        event::emit(SolverSlashed { solver, amount, reason, new_stake: info.stake });
        event::emit(ReputationChanged { solver, old_score, new_score: info.reputation_score, reason: 2, intent_id: 0 });
    }

    /// Apply reputation decay (called periodically)
    public entry fun apply_decay(admin: &signer, registry_addr: address) acquires SolverRegistry, ReputationConfig {
        assert!(signer::address_of(admin) == registry_addr, errors::not_admin());
        let config = borrow_global_mut<ReputationConfig>(registry_addr);
        let registry = borrow_global_mut<SolverRegistry>(registry_addr);

        let now = timestamp::now_seconds();
        let days_passed = (now - config.last_decay_timestamp) / SECONDS_PER_DAY;
        if (days_passed == 0) return;

        config.last_decay_timestamp = now;
        let decay_amount = config.decay_rate * days_passed;

        let len = vector::length(&registry.solver_list);
        let i = 0u64;
        while (i < len) {
            let solver_addr = *vector::borrow(&registry.solver_list, i);
            if (smart_table::contains(&registry.solvers, solver_addr)) {
                let info = smart_table::borrow_mut(&mut registry.solvers, solver_addr);
                if (info.reputation_score > decay_amount) {
                    info.reputation_score = info.reputation_score - decay_amount;
                } else {
                    info.reputation_score = 0;
                };
            };
            i = i + 1;
        };
    }

    // ============ Internal Functions ============

    fun update_reputation_internal(
        registry_addr: address,
        solver: address,
        intent_id: u64,
        success: bool,
        output_amount: u64,
        expected_amount: u64,
        execution_time: u64
    ) acquires SolverRegistry, ReputationConfig {
        let registry = borrow_global_mut<SolverRegistry>(registry_addr);
        let config = borrow_global<ReputationConfig>(registry_addr);
        if (!smart_table::contains(&registry.solvers, solver)) return;

        let info = smart_table::borrow_mut(&mut registry.solvers, solver);
        let old_score = info.reputation_score;
        let now = timestamp::now_seconds();
        info.last_active = now;
        info.total_intents_solved = info.total_intents_solved + 1;

        if (success) {
            info.successful_fills = info.successful_fills + 1;
            info.total_volume = info.total_volume + (output_amount as u128);

            // Calculate slippage (positive = better than expected)
            let slippage = if (output_amount >= expected_amount) { 0 }
                else { ((expected_amount - output_amount) * 10000) / expected_amount };

            // Update running average slippage
            if (info.successful_fills == 1) {
                info.average_slippage = slippage;
                info.average_execution_time = execution_time;
            } else {
                info.average_slippage = (info.average_slippage + slippage) / 2;
                info.average_execution_time = (info.average_execution_time + execution_time) / 2;
            };

            // Base success points
            let points = config.success_points;
            // Bonus for fast execution (under 5 seconds)
            if (execution_time < 5) points = points + config.fast_execution_bonus;
            // Bonus for better than expected output
            if (output_amount > expected_amount) points = points + 25;

            if (info.reputation_score + points > MAX_REPUTATION) {
                info.reputation_score = MAX_REPUTATION;
            } else {
                info.reputation_score = info.reputation_score + points;
            };
        } else {
            info.failed_fills = info.failed_fills + 1;
            if (info.reputation_score > config.failure_penalty) {
                info.reputation_score = info.reputation_score - config.failure_penalty;
            } else {
                info.reputation_score = 0;
            };
        };

        let reason = if (success) { 0u8 } else { 1u8 };
        event::emit(ReputationChanged { solver, old_score, new_score: info.reputation_score, reason, intent_id });
    }

    // ============ View Functions ============

    #[view]
    public fun get_reputation(registry_addr: address, solver: address): u64 acquires SolverRegistry {
        let registry = borrow_global<SolverRegistry>(registry_addr);
        if (!smart_table::contains(&registry.solvers, solver)) return 0;
        smart_table::borrow(&registry.solvers, solver).reputation_score
    }

    #[view]
    public fun is_solver_eligible(registry_addr: address, solver: address): bool acquires SolverRegistry, ReputationConfig {
        let registry = borrow_global<SolverRegistry>(registry_addr);
        let config = borrow_global<ReputationConfig>(registry_addr);
        if (!smart_table::contains(&registry.solvers, solver)) return false;
        let info = smart_table::borrow(&registry.solvers, solver);
        info.is_active && info.reputation_score >= config.min_reputation
    }

    #[view]
    public fun get_solver_stats(
        registry_addr: address,
        solver: address
    ): (u64, u128, u64, u64, u64, u64, bool) acquires SolverRegistry {
        let registry = borrow_global<SolverRegistry>(registry_addr);
        assert!(smart_table::contains(&registry.solvers, solver), errors::solver_not_registered());
        let info = smart_table::borrow(&registry.solvers, solver);
        (info.stake, info.total_volume, info.reputation_score, info.successful_fills, info.failed_fills, info.average_slippage, info.is_active)
    }

    #[view]
    public fun is_registered(registry_addr: address, solver: address): bool acquires SolverRegistry {
        let registry = borrow_global<SolverRegistry>(registry_addr);
        smart_table::contains(&registry.solvers, solver)
    }

    #[view]
    public fun is_active(registry_addr: address, solver: address): bool acquires SolverRegistry {
        let registry = borrow_global<SolverRegistry>(registry_addr);
        if (!smart_table::contains(&registry.solvers, solver)) return false;
        smart_table::borrow(&registry.solvers, solver).is_active
    }

    #[view]
    public fun get_total_solvers(registry_addr: address): u64 acquires SolverRegistry {
        borrow_global<SolverRegistry>(registry_addr).total_solvers
    }

    #[view]
    public fun get_active_solver_count(registry_addr: address): u64 acquires SolverRegistry {
        borrow_global<SolverRegistry>(registry_addr).active_solvers
    }

    #[view]
    public fun get_admin(registry_addr: address): address acquires SolverRegistry {
        borrow_global<SolverRegistry>(registry_addr).admin
    }
}
