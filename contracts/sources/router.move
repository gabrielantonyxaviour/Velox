/// Router Module for Velox
/// Enables multi-DEX routing for optimal trade execution
module velox::router {
    use std::signer;
    use std::vector;
    use std::option::{Self, Option};
    use aptos_std::smart_table::{Self, SmartTable};
    use aptos_std::comparator;
    use aptos_framework::event;
    use aptos_framework::timestamp;
    use velox::errors;

    // ============ Constants ============

    /// Maximum hops in a route
    const MAX_HOPS: u64 = 4;
    /// Maximum price impact allowed (5%)
    const MAX_PRICE_IMPACT_BPS: u64 = 500;
    /// Basis points denominator
    const BPS_DENOMINATOR: u64 = 10000;

    // ============ Structs ============

    /// Registered DEX pool
    struct DexPool has store, drop, copy {
        pool_id: u256,
        dex_id: u8,
        pool_address: address,
        token_a: address,
        token_b: address,
        fee_bps: u64,
        is_active: bool
    }

    /// Route step for multi-hop swap
    struct RouteStep has store, drop, copy {
        dex_id: u8,
        pool_address: address,
        token_in: address,
        token_out: address,
        amount_in: u64,
        min_amount_out: u64
    }

    /// Complete route from input to output
    struct Route has store, drop, copy {
        steps: vector<RouteStep>,
        total_input: u64,
        expected_output: u64,
        price_impact_bps: u64
    }

    /// Router state
    struct RouterState has key {
        pools: SmartTable<u256, DexPool>,
        /// Token pair to pool IDs mapping (for quick lookups)
        pair_to_pools: SmartTable<u256, vector<u256>>,
        pool_count: u256,
        adapter_registry: address,
        admin: address
    }

    // ============ Events ============

    #[event]
    struct RouteExecuted has drop, store {
        intent_id: u64,
        route_hops: u64,
        dexes_used: vector<u8>,
        total_input: u64,
        total_output: u64,
        price_impact_bps: u64
    }

    #[event]
    struct PoolRegistered has drop, store {
        pool_id: u256,
        dex_id: u8,
        pool_address: address,
        token_a: address,
        token_b: address,
        fee_bps: u64
    }

    #[event]
    struct PoolDeactivated has drop, store {
        pool_id: u256,
        deactivated_by: address
    }

    // ============ Init Functions ============

    /// Initialize the router
    public entry fun initialize(admin: &signer, adapter_registry: address) {
        let admin_addr = signer::address_of(admin);
        assert!(!exists<RouterState>(admin_addr), errors::router_not_initialized());

        move_to(admin, RouterState {
            pools: smart_table::new(),
            pair_to_pools: smart_table::new(),
            pool_count: 0,
            adapter_registry,
            admin: admin_addr
        });
    }

    // ============ Admin Functions ============

    /// Register a DEX pool for routing
    public entry fun register_pool(
        admin: &signer,
        router_addr: address,
        dex_id: u8,
        pool_address: address,
        token_a: address,
        token_b: address,
        fee_bps: u64
    ) acquires RouterState {
        let admin_addr = signer::address_of(admin);
        let state = borrow_global_mut<RouterState>(router_addr);

        assert!(admin_addr == state.admin, errors::not_admin());

        // Order tokens consistently using comparator
        let (ordered_a, ordered_b) = order_tokens(token_a, token_b);

        let pool_id = state.pool_count;
        let pool = DexPool {
            pool_id,
            dex_id,
            pool_address,
            token_a: ordered_a,
            token_b: ordered_b,
            fee_bps,
            is_active: true
        };

        smart_table::add(&mut state.pools, pool_id, pool);

        // Add to pair mapping
        let pair_key = compute_pair_key(ordered_a, ordered_b);
        if (!smart_table::contains(&state.pair_to_pools, pair_key)) {
            smart_table::add(&mut state.pair_to_pools, pair_key, vector::empty());
        };
        let pool_ids = smart_table::borrow_mut(&mut state.pair_to_pools, pair_key);
        vector::push_back(pool_ids, pool_id);

        state.pool_count = pool_id + 1;

        event::emit(PoolRegistered {
            pool_id,
            dex_id,
            pool_address,
            token_a: ordered_a,
            token_b: ordered_b,
            fee_bps
        });
    }

    /// Deactivate a pool
    public entry fun deactivate_pool(
        admin: &signer,
        router_addr: address,
        pool_id: u256
    ) acquires RouterState {
        let admin_addr = signer::address_of(admin);
        let state = borrow_global_mut<RouterState>(router_addr);

        assert!(admin_addr == state.admin, errors::not_admin());
        assert!(smart_table::contains(&state.pools, pool_id), errors::pool_not_found());

        let pool = smart_table::borrow_mut(&mut state.pools, pool_id);
        pool.is_active = false;

        event::emit(PoolDeactivated {
            pool_id,
            deactivated_by: admin_addr
        });
    }

    // ============ Routing Functions ============

    /// Find the best direct route between two tokens
    public fun find_best_direct_route(
        router_addr: address,
        token_in: address,
        token_out: address,
        amount_in: u64
    ): Option<Route> acquires RouterState {
        let state = borrow_global<RouterState>(router_addr);

        // Order tokens for lookup using comparator
        let (ordered_a, ordered_b) = order_tokens(token_in, token_out);

        let pair_key = compute_pair_key(ordered_a, ordered_b);
        if (!smart_table::contains(&state.pair_to_pools, pair_key)) {
            return option::none()
        };

        let pool_ids = smart_table::borrow(&state.pair_to_pools, pair_key);
        if (vector::is_empty(pool_ids)) {
            return option::none()
        };

        let best_output = 0u64;
        let best_pool: Option<DexPool> = option::none();

        let i = 0;
        let len = vector::length(pool_ids);
        while (i < len) {
            let pool_id = *vector::borrow(pool_ids, i);
            let pool = smart_table::borrow(&state.pools, pool_id);

            if (pool.is_active) {
                // Simulate swap (in production, would query actual reserves)
                let output = simulate_swap_output(state.adapter_registry, pool, token_in, amount_in);
                if (output > best_output) {
                    best_output = output;
                    best_pool = option::some(*pool);
                };
            };
            i = i + 1;
        };

        if (option::is_none(&best_pool)) {
            return option::none()
        };

        let pool = option::extract(&mut best_pool);
        let step = RouteStep {
            dex_id: pool.dex_id,
            pool_address: pool.pool_address,
            token_in,
            token_out,
            amount_in,
            min_amount_out: 0 // Set by caller
        };

        let steps = vector::empty();
        vector::push_back(&mut steps, step);

        let price_impact = calculate_price_impact(amount_in, best_output);

        option::some(Route {
            steps,
            total_input: amount_in,
            expected_output: best_output,
            price_impact_bps: price_impact
        })
    }

    /// Get quote for a route (expected output)
    public fun get_route_quote(route: &Route): u64 {
        route.expected_output
    }

    /// Validate a route can be executed
    public fun validate_route(
        route: &Route,
        min_output: u64,
        deadline: u64
    ): bool {
        let now = timestamp::now_seconds();
        if (now > deadline) {
            return false
        };

        if (route.expected_output < min_output) {
            return false
        };

        if (route.price_impact_bps > MAX_PRICE_IMPACT_BPS) {
            return false
        };

        let num_steps = vector::length(&route.steps);
        if (num_steps == 0 || num_steps > MAX_HOPS) {
            return false
        };

        true
    }

    /// Emit route execution event
    public fun emit_route_executed(
        intent_id: u64,
        route: &Route,
        actual_output: u64
    ) {
        let dexes_used = vector::empty<u8>();
        let i = 0;
        let len = vector::length(&route.steps);
        while (i < len) {
            let step = vector::borrow(&route.steps, i);
            vector::push_back(&mut dexes_used, step.dex_id);
            i = i + 1;
        };

        event::emit(RouteExecuted {
            intent_id,
            route_hops: len,
            dexes_used,
            total_input: route.total_input,
            total_output: actual_output,
            price_impact_bps: route.price_impact_bps
        });
    }

    // ============ Internal Functions ============

    /// Order tokens consistently for lookups
    fun order_tokens(token_a: address, token_b: address): (address, address) {
        let result = comparator::compare(&token_a, &token_b);
        if (comparator::is_smaller_than(&result)) {
            (token_a, token_b)
        } else {
            (token_b, token_a)
        }
    }

    /// Compute a unique key for a token pair
    /// Uses XOR of addresses for a simple hash
    fun compute_pair_key(token_a: address, token_b: address): u256 {
        // Simple approach: combine addresses into a unique key
        // XOR the bytes of both addresses
        let a_bytes = std::bcs::to_bytes(&token_a);
        let b_bytes = std::bcs::to_bytes(&token_b);

        let key: u256 = 0;
        let i = 0;
        let len = vector::length(&a_bytes);
        while (i < len && i < 32) {
            let a_byte = (*vector::borrow(&a_bytes, i) as u256);
            let b_byte = (*vector::borrow(&b_bytes, i) as u256);
            // Combine bytes into key
            key = key + ((a_byte ^ b_byte) << ((i * 8) as u8));
            i = i + 1;
        };
        key
    }

    /// Simulate swap output (simplified - uses adapter)
    fun simulate_swap_output(
        _adapter_registry: address,
        pool: &DexPool,
        _token_in: address,
        amount_in: u64
    ): u64 {
        // Simplified simulation using fee
        // In production, would query actual reserves from pool
        let fee_factor = BPS_DENOMINATOR - pool.fee_bps;
        (amount_in * fee_factor) / BPS_DENOMINATOR
    }

    /// Calculate price impact in basis points
    fun calculate_price_impact(amount_in: u64, amount_out: u64): u64 {
        if (amount_in == 0 || amount_out == 0) {
            return 0
        };
        // Simplified: compare to 1:1 ratio as baseline
        // In production, would compare to spot price
        if (amount_out >= amount_in) {
            0
        } else {
            ((amount_in - amount_out) * BPS_DENOMINATOR) / amount_in
        }
    }

    // ============ View Functions ============

    #[view]
    public fun get_pool_count(router_addr: address): u256 acquires RouterState {
        borrow_global<RouterState>(router_addr).pool_count
    }

    #[view]
    public fun get_max_hops(): u64 { MAX_HOPS }

    #[view]
    public fun get_max_price_impact_bps(): u64 { MAX_PRICE_IMPACT_BPS }

    // ============ Route Accessors ============

    public fun get_route_steps(route: &Route): &vector<RouteStep> { &route.steps }
    public fun get_route_input(route: &Route): u64 { route.total_input }
    public fun get_route_output(route: &Route): u64 { route.expected_output }
    public fun get_route_price_impact(route: &Route): u64 { route.price_impact_bps }

    // ============ RouteStep Accessors ============

    public fun get_step_dex_id(step: &RouteStep): u8 { step.dex_id }
    public fun get_step_pool(step: &RouteStep): address { step.pool_address }
    public fun get_step_token_in(step: &RouteStep): address { step.token_in }
    public fun get_step_token_out(step: &RouteStep): address { step.token_out }
    public fun get_step_amount_in(step: &RouteStep): u64 { step.amount_in }
    public fun get_step_min_out(step: &RouteStep): u64 { step.min_amount_out }

    // ============ Route Constructor ============

    /// Create a route from steps
    public fun new_route(
        steps: vector<RouteStep>,
        total_input: u64,
        expected_output: u64,
        price_impact_bps: u64
    ): Route {
        Route { steps, total_input, expected_output, price_impact_bps }
    }

    /// Create a route step
    public fun new_route_step(
        dex_id: u8,
        pool_address: address,
        token_in: address,
        token_out: address,
        amount_in: u64,
        min_amount_out: u64
    ): RouteStep {
        RouteStep { dex_id, pool_address, token_in, token_out, amount_in, min_amount_out }
    }
}
