/// Price Oracle Module for Velox
/// Provides price feeds for conditional order execution
module velox::price_oracle {
    use std::signer;
    use std::vector;
    use aptos_std::smart_table::{Self, SmartTable};
    use aptos_framework::timestamp;
    use aptos_framework::event;
    use velox::errors;

    // ============ Storage ============

    /// Price feed registry
    struct PriceFeeds has key {
        /// Mapping: pair_hash -> PriceData
        prices: SmartTable<u256, PriceData>,
        /// Authorized price updaters
        updaters: vector<address>,
        /// Admin address
        admin: address
    }

    /// Price data for a token pair
    struct PriceData has store, drop, copy {
        price: u64,           // Current price in basis points
        timestamp: u64,       // Last update time
        confidence: u64       // Price confidence (for future use)
    }

    // ============ Events ============

    #[event]
    struct OracleInitialized has drop, store {
        admin: address,
        initialized_at: u64
    }

    #[event]
    struct UpdaterAdded has drop, store {
        updater: address,
        added_at: u64
    }

    #[event]
    struct UpdaterRemoved has drop, store {
        updater: address,
        removed_at: u64
    }

    #[event]
    struct PriceUpdated has drop, store {
        token_a: address,
        token_b: address,
        price: u64,
        confidence: u64,
        updated_at: u64
    }

    // ============ Constants ============

    /// Maximum price age in seconds (5 minutes)
    const MAX_PRICE_AGE: u64 = 300;

    // ============ Initialize ============

    /// Initialize the price oracle (admin only)
    public entry fun initialize(admin: &signer) {
        let admin_addr = signer::address_of(admin);
        assert!(!exists<PriceFeeds>(admin_addr), errors::intent_already_exists());

        move_to(admin, PriceFeeds {
            prices: smart_table::new(),
            updaters: vector::empty(),
            admin: admin_addr
        });

        event::emit(OracleInitialized {
            admin: admin_addr,
            initialized_at: timestamp::now_seconds()
        });
    }

    // ============ Admin Functions ============

    /// Add an authorized price updater
    public entry fun add_updater(admin: &signer, oracle_addr: address, updater: address) acquires PriceFeeds {
        let admin_addr = signer::address_of(admin);
        let feeds = borrow_global_mut<PriceFeeds>(oracle_addr);
        assert!(feeds.admin == admin_addr, errors::not_admin());

        // Check if updater already exists
        let len = vector::length(&feeds.updaters);
        let i = 0;
        while (i < len) {
            assert!(*vector::borrow(&feeds.updaters, i) != updater, errors::solver_already_registered());
            i = i + 1;
        };

        vector::push_back(&mut feeds.updaters, updater);

        event::emit(UpdaterAdded {
            updater,
            added_at: timestamp::now_seconds()
        });
    }

    /// Remove an authorized price updater
    public entry fun remove_updater(admin: &signer, oracle_addr: address, updater: address) acquires PriceFeeds {
        let admin_addr = signer::address_of(admin);
        let feeds = borrow_global_mut<PriceFeeds>(oracle_addr);
        assert!(feeds.admin == admin_addr, errors::not_admin());

        let len = vector::length(&feeds.updaters);
        let i = 0;
        let found = false;
        while (i < len) {
            if (*vector::borrow(&feeds.updaters, i) == updater) {
                vector::remove(&mut feeds.updaters, i);
                found = true;
                break
            };
            i = i + 1;
        };
        assert!(found, errors::solver_not_registered());

        event::emit(UpdaterRemoved {
            updater,
            removed_at: timestamp::now_seconds()
        });
    }

    // ============ Price Update Functions ============

    /// Update price for a token pair (authorized updaters only)
    public entry fun update_price(
        updater: &signer,
        oracle_addr: address,
        token_a: address,
        token_b: address,
        price: u64
    ) acquires PriceFeeds {
        update_price_with_confidence(updater, oracle_addr, token_a, token_b, price, 10000)
    }

    /// Update price with confidence level
    public entry fun update_price_with_confidence(
        updater: &signer,
        oracle_addr: address,
        token_a: address,
        token_b: address,
        price: u64,
        confidence: u64
    ) acquires PriceFeeds {
        let updater_addr = signer::address_of(updater);
        let feeds = borrow_global_mut<PriceFeeds>(oracle_addr);

        // Check if updater is authorized
        assert!(is_authorized_updater_internal(&feeds.updaters, updater_addr), errors::not_updater());

        let pair_hash = compute_pair_hash(token_a, token_b);
        let now = timestamp::now_seconds();

        let price_data = PriceData {
            price,
            timestamp: now,
            confidence
        };

        if (smart_table::contains(&feeds.prices, pair_hash)) {
            *smart_table::borrow_mut(&mut feeds.prices, pair_hash) = price_data;
        } else {
            smart_table::add(&mut feeds.prices, pair_hash, price_data);
        };

        event::emit(PriceUpdated {
            token_a,
            token_b,
            price,
            confidence,
            updated_at: now
        });
    }

    // ============ View Functions ============

    #[view]
    /// Get price for a token pair
    public fun get_price(oracle_addr: address, token_a: address, token_b: address): (u64, u64) acquires PriceFeeds {
        let feeds = borrow_global<PriceFeeds>(oracle_addr);
        let pair_hash = compute_pair_hash(token_a, token_b);

        assert!(smart_table::contains(&feeds.prices, pair_hash), errors::solution_not_found());

        let price_data = smart_table::borrow(&feeds.prices, pair_hash);
        (price_data.price, price_data.timestamp)
    }

    #[view]
    /// Check if price is stale
    public fun is_price_stale(oracle_addr: address, token_a: address, token_b: address, max_age: u64): bool acquires PriceFeeds {
        let feeds = borrow_global<PriceFeeds>(oracle_addr);
        let pair_hash = compute_pair_hash(token_a, token_b);

        if (!smart_table::contains(&feeds.prices, pair_hash)) {
            return true
        };

        let price_data = smart_table::borrow(&feeds.prices, pair_hash);
        let now = timestamp::now_seconds();

        now - price_data.timestamp > max_age
    }

    #[view]
    /// Check if price exists
    public fun has_price(oracle_addr: address, token_a: address, token_b: address): bool acquires PriceFeeds {
        let feeds = borrow_global<PriceFeeds>(oracle_addr);
        let pair_hash = compute_pair_hash(token_a, token_b);
        smart_table::contains(&feeds.prices, pair_hash)
    }

    #[view]
    /// Get price with confidence
    public fun get_price_with_confidence(
        oracle_addr: address,
        token_a: address,
        token_b: address
    ): (u64, u64, u64) acquires PriceFeeds {
        let feeds = borrow_global<PriceFeeds>(oracle_addr);
        let pair_hash = compute_pair_hash(token_a, token_b);

        assert!(smart_table::contains(&feeds.prices, pair_hash), errors::solution_not_found());

        let price_data = smart_table::borrow(&feeds.prices, pair_hash);
        (price_data.price, price_data.timestamp, price_data.confidence)
    }

    #[view]
    /// Check if an address is an authorized updater
    public fun is_authorized_updater(oracle_addr: address, addr: address): bool acquires PriceFeeds {
        let feeds = borrow_global<PriceFeeds>(oracle_addr);
        is_authorized_updater_internal(&feeds.updaters, addr)
    }

    // ============ Package Functions ============

    /// Get current price (for conditional module)
    public(package) fun get_current_price(
        oracle_addr: address,
        token_a: address,
        token_b: address
    ): u64 acquires PriceFeeds {
        let (price, timestamp) = get_price(oracle_addr, token_a, token_b);
        let now = timestamp::now_seconds();

        // Ensure price is not stale
        assert!(now - timestamp <= MAX_PRICE_AGE, errors::price_stale());

        price
    }

    // ============ Internal Functions ============

    /// Compute hash for token pair (order-independent)
    fun compute_pair_hash(token_a: address, token_b: address): u256 {
        use std::bcs;
        use aptos_std::from_bcs;

        let bytes_a = bcs::to_bytes(&token_a);
        let bytes_b = bcs::to_bytes(&token_b);

        // Use the first 16 bytes of each address to create a u256 hash
        let a: u256 = from_bcs::to_u128(bytes_a) as u256;
        let b: u256 = from_bcs::to_u128(bytes_b) as u256;

        // Order-independent hash
        if (a < b) {
            (a << 128) | b
        } else {
            (b << 128) | a
        }
    }

    /// Check if address is in updaters list
    fun is_authorized_updater_internal(updaters: &vector<address>, addr: address): bool {
        let len = vector::length(updaters);
        let i = 0;
        while (i < len) {
            if (*vector::borrow(updaters, i) == addr) {
                return true
            };
            i = i + 1;
        };
        false
    }
}
