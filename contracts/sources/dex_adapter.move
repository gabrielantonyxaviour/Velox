/// DEX Adapter Module for Velox
/// Provides a generic interface for interacting with different DEXes on Movement
module velox::dex_adapter {
    use std::signer;
    use aptos_std::smart_table::{Self, SmartTable};
    use aptos_framework::event;
    use velox::errors;
    use velox::math;

    // ============ Constants ============

    /// Built-in DEX ID for Velox AMM
    const DEX_VELOX_AMM: u8 = 1;
    /// Maximum supported DEXes
    const MAX_DEX_ID: u8 = 10;
    /// Default fee in basis points (0.3%)
    const DEFAULT_FEE_BPS: u64 = 30;

    // ============ Structs ============

    /// DEX adapter configuration
    struct DexConfig has store, drop, copy {
        dex_id: u8,
        name: vector<u8>,
        fee_bps: u64,
        is_active: bool
    }

    /// Adapter registry state
    struct AdapterRegistry has key {
        /// Registered DEX configurations
        configs: SmartTable<u8, DexConfig>,
        /// Admin address
        admin: address,
        /// Total registered DEXes
        dex_count: u8
    }

    /// Pool reserves info returned from queries
    struct PoolReserves has store, drop, copy {
        reserve_a: u64,
        reserve_b: u64,
        token_a: address,
        token_b: address
    }

    // ============ Events ============

    #[event]
    struct DexRegistered has drop, store {
        dex_id: u8,
        name: vector<u8>,
        fee_bps: u64,
        registered_by: address
    }

    #[event]
    struct DexDeactivated has drop, store {
        dex_id: u8,
        deactivated_by: address
    }

    // ============ Init Functions ============

    /// Initialize the adapter registry
    public entry fun initialize(admin: &signer) {
        let admin_addr = signer::address_of(admin);
        assert!(!exists<AdapterRegistry>(admin_addr), errors::dex_already_registered());

        let configs = smart_table::new<u8, DexConfig>();

        // Register Velox AMM as default DEX
        let velox_config = DexConfig {
            dex_id: DEX_VELOX_AMM,
            name: b"Velox AMM",
            fee_bps: DEFAULT_FEE_BPS,
            is_active: true
        };
        smart_table::add(&mut configs, DEX_VELOX_AMM, velox_config);

        move_to(admin, AdapterRegistry {
            configs,
            admin: admin_addr,
            dex_count: 1
        });

        event::emit(DexRegistered {
            dex_id: DEX_VELOX_AMM,
            name: b"Velox AMM",
            fee_bps: DEFAULT_FEE_BPS,
            registered_by: admin_addr
        });
    }

    // ============ Admin Functions ============

    /// Register a new DEX adapter
    public entry fun register_dex(
        admin: &signer,
        registry_addr: address,
        dex_id: u8,
        name: vector<u8>,
        fee_bps: u64
    ) acquires AdapterRegistry {
        let admin_addr = signer::address_of(admin);
        let registry = borrow_global_mut<AdapterRegistry>(registry_addr);

        assert!(admin_addr == registry.admin, errors::not_admin());
        assert!(dex_id <= MAX_DEX_ID, errors::invalid_dex_adapter());
        assert!(!smart_table::contains(&registry.configs, dex_id), errors::dex_already_registered());

        let config = DexConfig {
            dex_id,
            name,
            fee_bps,
            is_active: true
        };
        smart_table::add(&mut registry.configs, dex_id, config);
        registry.dex_count = registry.dex_count + 1;

        event::emit(DexRegistered {
            dex_id,
            name,
            fee_bps,
            registered_by: admin_addr
        });
    }

    /// Deactivate a DEX adapter
    public entry fun deactivate_dex(
        admin: &signer,
        registry_addr: address,
        dex_id: u8
    ) acquires AdapterRegistry {
        let admin_addr = signer::address_of(admin);
        let registry = borrow_global_mut<AdapterRegistry>(registry_addr);

        assert!(admin_addr == registry.admin, errors::not_admin());
        assert!(smart_table::contains(&registry.configs, dex_id), errors::invalid_dex_adapter());

        let config = smart_table::borrow_mut(&mut registry.configs, dex_id);
        config.is_active = false;

        event::emit(DexDeactivated {
            dex_id,
            deactivated_by: admin_addr
        });
    }

    // ============ Query Functions ============

    /// Get output amount for a swap on a specific DEX
    /// Uses constant product formula with DEX-specific fee
    public fun get_amount_out(
        registry_addr: address,
        dex_id: u8,
        amount_in: u64,
        reserve_in: u64,
        reserve_out: u64
    ): u64 acquires AdapterRegistry {
        let registry = borrow_global<AdapterRegistry>(registry_addr);
        assert!(smart_table::contains(&registry.configs, dex_id), errors::invalid_dex_adapter());

        let config = smart_table::borrow(&registry.configs, dex_id);
        assert!(config.is_active, errors::pool_not_active());

        // Use fee from config (default uses math module's standard calculation)
        if (dex_id == DEX_VELOX_AMM) {
            math::get_amount_out(amount_in, reserve_in, reserve_out)
        } else {
            // Generic constant product with custom fee
            calculate_amount_out_with_fee(amount_in, reserve_in, reserve_out, config.fee_bps)
        }
    }

    /// Get required input amount for desired output
    public fun get_amount_in(
        registry_addr: address,
        dex_id: u8,
        amount_out: u64,
        reserve_in: u64,
        reserve_out: u64
    ): u64 acquires AdapterRegistry {
        let registry = borrow_global<AdapterRegistry>(registry_addr);
        assert!(smart_table::contains(&registry.configs, dex_id), errors::invalid_dex_adapter());

        let config = smart_table::borrow(&registry.configs, dex_id);
        assert!(config.is_active, errors::pool_not_active());

        if (dex_id == DEX_VELOX_AMM) {
            math::get_amount_in(amount_out, reserve_in, reserve_out)
        } else {
            calculate_amount_in_with_fee(amount_out, reserve_in, reserve_out, config.fee_bps)
        }
    }

    /// Check if a DEX is registered and active
    public fun is_dex_active(registry_addr: address, dex_id: u8): bool acquires AdapterRegistry {
        let registry = borrow_global<AdapterRegistry>(registry_addr);
        if (!smart_table::contains(&registry.configs, dex_id)) {
            return false
        };
        let config = smart_table::borrow(&registry.configs, dex_id);
        config.is_active
    }

    /// Get DEX fee in basis points
    public fun get_dex_fee_bps(registry_addr: address, dex_id: u8): u64 acquires AdapterRegistry {
        let registry = borrow_global<AdapterRegistry>(registry_addr);
        assert!(smart_table::contains(&registry.configs, dex_id), errors::invalid_dex_adapter());
        let config = smart_table::borrow(&registry.configs, dex_id);
        config.fee_bps
    }

    // ============ Internal Functions ============

    /// Calculate output amount with custom fee (in basis points)
    fun calculate_amount_out_with_fee(
        amount_in: u64,
        reserve_in: u64,
        reserve_out: u64,
        fee_bps: u64
    ): u64 {
        assert!(amount_in > 0, errors::insufficient_input_amount());
        assert!(reserve_in > 0 && reserve_out > 0, errors::insufficient_amount());

        // fee_bps is in basis points (e.g., 30 = 0.3%)
        // Factor = 10000 - fee_bps (e.g., 9970 for 0.3% fee)
        let fee_factor = 10000 - fee_bps;
        let amount_in_with_fee = (amount_in as u128) * (fee_factor as u128);
        let numerator = amount_in_with_fee * (reserve_out as u128);
        let denominator = (reserve_in as u128) * 10000 + amount_in_with_fee;

        let result = numerator / denominator;
        assert!(result > 0, errors::insufficient_output_amount());
        (result as u64)
    }

    /// Calculate input amount with custom fee
    fun calculate_amount_in_with_fee(
        amount_out: u64,
        reserve_in: u64,
        reserve_out: u64,
        fee_bps: u64
    ): u64 {
        assert!(amount_out > 0, errors::insufficient_output_amount());
        assert!(reserve_in > 0 && reserve_out > 0, errors::insufficient_amount());
        assert!(amount_out < reserve_out, errors::insufficient_amount());

        let fee_factor = 10000 - fee_bps;
        let numerator = (reserve_in as u128) * (amount_out as u128) * 10000;
        let denominator = ((reserve_out - amount_out) as u128) * (fee_factor as u128);

        let result = (numerator / denominator) + 1;
        (result as u64)
    }

    // ============ View Functions ============

    #[view]
    public fun get_dex_count(registry_addr: address): u8 acquires AdapterRegistry {
        let registry = borrow_global<AdapterRegistry>(registry_addr);
        registry.dex_count
    }

    #[view]
    public fun get_velox_amm_id(): u8 {
        DEX_VELOX_AMM
    }

    #[view]
    public fun get_default_fee_bps(): u64 {
        DEFAULT_FEE_BPS
    }

    // ============ Helpers ============

    /// Create pool reserves struct
    public fun new_pool_reserves(
        reserve_a: u64,
        reserve_b: u64,
        token_a: address,
        token_b: address
    ): PoolReserves {
        PoolReserves { reserve_a, reserve_b, token_a, token_b }
    }

    /// Get reserve A from pool reserves
    public fun get_reserve_a(reserves: &PoolReserves): u64 { reserves.reserve_a }

    /// Get reserve B from pool reserves
    public fun get_reserve_b(reserves: &PoolReserves): u64 { reserves.reserve_b }
}
