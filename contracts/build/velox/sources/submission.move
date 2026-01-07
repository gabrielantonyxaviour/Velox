/// Intent Submission Module for Velox
/// Handles intent creation, escrow, and management
module velox::submission {
    use std::signer;
    use std::vector;
    use aptos_std::smart_table::{Self, SmartTable};
    use aptos_framework::timestamp;
    use aptos_framework::event;
    use aptos_framework::primary_fungible_store;
    use aptos_framework::fungible_asset::Metadata;
    use aptos_framework::object::{Self, ExtendRef};
    use velox::types::{Self, IntentRecord};
    use velox::errors;
    use velox::scheduled;
    use velox::auction;

    // ============ Storage ============

    /// Global registry for all intents
    struct IntentRegistry has key {
        next_intent_id: u64,
        intents: SmartTable<u64, IntentRecord>,
        user_intents: SmartTable<address, vector<u64>>,
        extend_ref: ExtendRef
    }

    // ============ Events ============

    #[event]
    struct IntentCreated has drop, store {
        intent_id: u64,
        user: address,
        input_token: address,
        output_token: address,
        amount_in: u64,
        intent_type: u8,
        deadline: u64,
        created_at: u64
    }

    #[event]
    struct IntentCancelled has drop, store {
        intent_id: u64,
        user: address,
        refunded_amount: u64,
        cancelled_at: u64
    }

    // ============ Constants ============

    const INTENT_TYPE_SWAP: u8 = 0;
    const INTENT_TYPE_LIMIT: u8 = 1;
    const INTENT_TYPE_TWAP: u8 = 2;
    const INTENT_TYPE_DCA: u8 = 3;

    /// Auction type constants
    const AUCTION_TYPE_SEALED_BID: u8 = 0;
    const AUCTION_TYPE_DUTCH: u8 = 1;

    // ============ Initialize ============

    /// Initialize the intent registry (admin only)
    public entry fun initialize(admin: &signer) {
        let admin_addr = signer::address_of(admin);
        assert!(!exists<IntentRegistry>(admin_addr), errors::intent_already_exists());

        let constructor_ref = object::create_object(admin_addr);
        let extend_ref = object::generate_extend_ref(&constructor_ref);

        move_to(admin, IntentRegistry {
            next_intent_id: 0,
            intents: smart_table::new(),
            user_intents: smart_table::new(),
            extend_ref
        });
    }

    // ============ Internal Helpers ============

    /// Get signer for the escrow object
    fun get_escrow_signer(registry: &IntentRegistry): signer {
        object::generate_signer_for_extending(&registry.extend_ref)
    }

    /// Get escrow address
    fun get_escrow_address(registry: &IntentRegistry): address {
        signer::address_of(&get_escrow_signer(registry))
    }

    // ============ Entry Functions ============

    /// Submit a swap intent
    public entry fun submit_swap(
        user: &signer,
        registry_addr: address,
        input_token: address,
        output_token: address,
        amount_in: u64,
        min_amount_out: u64,
        deadline: u64
    ) acquires IntentRegistry {
        assert!(amount_in > 0, errors::zero_amount());
        assert!(deadline > timestamp::now_seconds(), errors::deadline_passed());

        let user_addr = signer::address_of(user);
        let registry = borrow_global_mut<IntentRegistry>(registry_addr);
        let escrow_addr = get_escrow_address(registry);

        // Create intent
        let intent_id = registry.next_intent_id;
        registry.next_intent_id = intent_id + 1;

        let intent = types::new_swap(input_token, output_token, amount_in, min_amount_out, deadline);
        let now = timestamp::now_seconds();
        let record = types::new_intent_record(intent_id, user_addr, intent, now, amount_in);

        // Store intent
        smart_table::add(&mut registry.intents, intent_id, record);

        // Track user intents
        if (!smart_table::contains(&registry.user_intents, user_addr)) {
            smart_table::add(&mut registry.user_intents, user_addr, vector::empty());
        };
        let user_intent_ids = smart_table::borrow_mut(&mut registry.user_intents, user_addr);
        vector::push_back(user_intent_ids, intent_id);

        // Transfer funds to escrow
        let input_token_obj = object::address_to_object<Metadata>(input_token);
        primary_fungible_store::transfer(user, input_token_obj, escrow_addr, amount_in);

        // Emit event
        event::emit(IntentCreated {
            intent_id,
            user: user_addr,
            input_token,
            output_token,
            amount_in,
            intent_type: INTENT_TYPE_SWAP,
            deadline,
            created_at: now
        });
    }

    /// Submit a swap intent with auction for competitive solver bidding
    public entry fun submit_swap_with_auction(
        user: &signer,
        registry_addr: address,
        auction_state_addr: address,
        input_token: address,
        output_token: address,
        amount_in: u64,
        min_amount_out: u64,
        deadline: u64,
        auction_duration: u64
    ) acquires IntentRegistry {
        assert!(amount_in > 0, errors::zero_amount());
        assert!(deadline > timestamp::now_seconds(), errors::deadline_passed());

        let user_addr = signer::address_of(user);
        let registry = borrow_global_mut<IntentRegistry>(registry_addr);
        let escrow_addr = get_escrow_address(registry);

        // Create intent
        let intent_id = registry.next_intent_id;
        registry.next_intent_id = intent_id + 1;

        let intent = types::new_swap(input_token, output_token, amount_in, min_amount_out, deadline);
        let now = timestamp::now_seconds();
        let record = types::new_intent_record(intent_id, user_addr, intent, now, amount_in);

        // Store intent
        smart_table::add(&mut registry.intents, intent_id, record);

        // Track user intents
        if (!smart_table::contains(&registry.user_intents, user_addr)) {
            smart_table::add(&mut registry.user_intents, user_addr, vector::empty());
        };
        let user_intent_ids = smart_table::borrow_mut(&mut registry.user_intents, user_addr);
        vector::push_back(user_intent_ids, intent_id);

        // Transfer funds to escrow
        let input_token_obj = object::address_to_object<Metadata>(input_token);
        primary_fungible_store::transfer(user, input_token_obj, escrow_addr, amount_in);

        // Start auction for this intent
        auction::start_auction(auction_state_addr, intent_id, auction_duration);

        // Emit event
        event::emit(IntentCreated {
            intent_id,
            user: user_addr,
            input_token,
            output_token,
            amount_in,
            intent_type: INTENT_TYPE_SWAP,
            deadline,
            created_at: now
        });
    }

    /// Submit a swap intent with Dutch auction (descending price)
    public entry fun submit_swap_with_dutch_auction(
        user: &signer,
        registry_addr: address,
        auction_state_addr: address,
        input_token: address,
        output_token: address,
        amount_in: u64,
        min_amount_out: u64,    // end_price (minimum acceptable)
        start_price: u64,       // starting high price
        deadline: u64,
        auction_duration: u64
    ) acquires IntentRegistry {
        // Validate
        assert!(amount_in > 0, errors::zero_amount());
        assert!(deadline > timestamp::now_seconds(), errors::deadline_passed());
        assert!(start_price >= min_amount_out, errors::invalid_dutch_params());
        assert!(auction_duration > 0, errors::invalid_dutch_params());

        let user_addr = signer::address_of(user);
        let registry = borrow_global_mut<IntentRegistry>(registry_addr);
        let escrow_addr = get_escrow_address(registry);

        // Create intent
        let intent_id = registry.next_intent_id;
        registry.next_intent_id = intent_id + 1;

        let intent = types::new_swap(input_token, output_token, amount_in, min_amount_out, deadline);
        let now = timestamp::now_seconds();
        let record = types::new_intent_record(intent_id, user_addr, intent, now, amount_in);

        // Store intent
        smart_table::add(&mut registry.intents, intent_id, record);

        // Track user intents
        if (!smart_table::contains(&registry.user_intents, user_addr)) {
            smart_table::add(&mut registry.user_intents, user_addr, vector::empty());
        };
        let user_intent_ids = smart_table::borrow_mut(&mut registry.user_intents, user_addr);
        vector::push_back(user_intent_ids, intent_id);

        // Transfer funds to escrow
        let input_token_obj = object::address_to_object<Metadata>(input_token);
        primary_fungible_store::transfer(user, input_token_obj, escrow_addr, amount_in);

        // Create Dutch auction (start_price high, end_price = min_amount_out)
        auction::create_dutch_auction(
            auction_state_addr,
            intent_id,
            start_price,
            min_amount_out,
            auction_duration
        );

        // Emit event
        event::emit(IntentCreated {
            intent_id,
            user: user_addr,
            input_token,
            output_token,
            amount_in,
            intent_type: INTENT_TYPE_SWAP,
            deadline,
            created_at: now
        });
    }

    /// Submit a limit order intent
    public entry fun submit_limit_order(
        user: &signer,
        registry_addr: address,
        input_token: address,
        output_token: address,
        amount_in: u64,
        limit_price: u64,
        expiry: u64,
        partial_fill_allowed: bool
    ) acquires IntentRegistry {
        assert!(amount_in > 0, errors::zero_amount());
        assert!(expiry > timestamp::now_seconds(), errors::deadline_passed());

        let user_addr = signer::address_of(user);
        let registry = borrow_global_mut<IntentRegistry>(registry_addr);
        let escrow_addr = get_escrow_address(registry);

        // Create intent
        let intent_id = registry.next_intent_id;
        registry.next_intent_id = intent_id + 1;

        let intent = types::new_limit_order(
            input_token, output_token, amount_in, limit_price, expiry, partial_fill_allowed
        );
        let now = timestamp::now_seconds();
        let record = types::new_intent_record(intent_id, user_addr, intent, now, amount_in);

        // Store intent
        smart_table::add(&mut registry.intents, intent_id, record);

        // Track user intents
        if (!smart_table::contains(&registry.user_intents, user_addr)) {
            smart_table::add(&mut registry.user_intents, user_addr, vector::empty());
        };
        let user_intent_ids = smart_table::borrow_mut(&mut registry.user_intents, user_addr);
        vector::push_back(user_intent_ids, intent_id);

        // Transfer funds to escrow
        let input_token_obj = object::address_to_object<Metadata>(input_token);
        primary_fungible_store::transfer(user, input_token_obj, escrow_addr, amount_in);

        // Emit event
        event::emit(IntentCreated {
            intent_id,
            user: user_addr,
            input_token,
            output_token,
            amount_in,
            intent_type: INTENT_TYPE_LIMIT,
            deadline: expiry,
            created_at: now
        });
    }

    /// Submit a TWAP (Time-Weighted Average Price) intent
    public entry fun submit_twap(
        user: &signer,
        registry_addr: address,
        scheduled_registry_addr: address,
        input_token: address,
        output_token: address,
        total_amount: u64,
        num_chunks: u64,
        interval_seconds: u64,
        max_slippage_bps: u64,
        start_time: u64
    ) acquires IntentRegistry {
        assert!(total_amount > 0, errors::zero_amount());
        assert!(num_chunks > 0, errors::zero_amount());
        assert!(start_time >= timestamp::now_seconds(), errors::deadline_passed());

        let user_addr = signer::address_of(user);
        let registry = borrow_global_mut<IntentRegistry>(registry_addr);
        let escrow_addr = get_escrow_address(registry);

        // Create intent
        let intent_id = registry.next_intent_id;
        registry.next_intent_id = intent_id + 1;

        let intent = types::new_twap(
            input_token, output_token, total_amount, num_chunks,
            interval_seconds, max_slippage_bps, start_time
        );
        let now = timestamp::now_seconds();
        let record = types::new_intent_record(intent_id, user_addr, intent, now, total_amount);

        // Store intent
        smart_table::add(&mut registry.intents, intent_id, record);

        // Track user intents
        if (!smart_table::contains(&registry.user_intents, user_addr)) {
            smart_table::add(&mut registry.user_intents, user_addr, vector::empty());
        };
        let user_intent_ids = smart_table::borrow_mut(&mut registry.user_intents, user_addr);
        vector::push_back(user_intent_ids, intent_id);

        // Transfer funds to escrow
        let input_token_obj = object::address_to_object<Metadata>(input_token);
        primary_fungible_store::transfer(user, input_token_obj, escrow_addr, total_amount);

        // Register with scheduled registry
        scheduled::register_twap(scheduled_registry_addr, intent_id, num_chunks, start_time, interval_seconds);

        // Calculate deadline for event
        let deadline = start_time + (num_chunks * interval_seconds);

        // Emit event
        event::emit(IntentCreated {
            intent_id,
            user: user_addr,
            input_token,
            output_token,
            amount_in: total_amount,
            intent_type: INTENT_TYPE_TWAP,
            deadline,
            created_at: now
        });
    }

    /// Submit a DCA (Dollar-Cost Average) intent
    public entry fun submit_dca(
        user: &signer,
        registry_addr: address,
        scheduled_registry_addr: address,
        input_token: address,
        output_token: address,
        amount_per_period: u64,
        total_periods: u64,
        interval_seconds: u64
    ) acquires IntentRegistry {
        assert!(amount_per_period > 0, errors::zero_amount());
        assert!(total_periods > 0, errors::zero_amount());

        let user_addr = signer::address_of(user);
        let registry = borrow_global_mut<IntentRegistry>(registry_addr);
        let escrow_addr = get_escrow_address(registry);

        // Calculate total amount
        let total_amount = amount_per_period * total_periods;
        let now = timestamp::now_seconds();
        let next_execution = now; // First execution can happen immediately

        // Create intent
        let intent_id = registry.next_intent_id;
        registry.next_intent_id = intent_id + 1;

        let intent = types::new_dca(
            input_token, output_token, amount_per_period, total_periods,
            interval_seconds, next_execution
        );
        let record = types::new_intent_record(intent_id, user_addr, intent, now, total_amount);

        // Store intent
        smart_table::add(&mut registry.intents, intent_id, record);

        // Track user intents
        if (!smart_table::contains(&registry.user_intents, user_addr)) {
            smart_table::add(&mut registry.user_intents, user_addr, vector::empty());
        };
        let user_intent_ids = smart_table::borrow_mut(&mut registry.user_intents, user_addr);
        vector::push_back(user_intent_ids, intent_id);

        // Transfer all funds to escrow upfront
        let input_token_obj = object::address_to_object<Metadata>(input_token);
        primary_fungible_store::transfer(user, input_token_obj, escrow_addr, total_amount);

        // Register with scheduled registry
        scheduled::register_dca(scheduled_registry_addr, intent_id, total_periods, next_execution);

        // Calculate deadline for event
        let deadline = next_execution + (total_periods * interval_seconds);

        // Emit event
        event::emit(IntentCreated {
            intent_id,
            user: user_addr,
            input_token,
            output_token,
            amount_in: total_amount,
            intent_type: INTENT_TYPE_DCA,
            deadline,
            created_at: now
        });
    }

    /// Cancel a pending intent and refund escrowed funds
    public entry fun cancel_intent(
        user: &signer,
        registry_addr: address,
        intent_id: u64
    ) acquires IntentRegistry {
        let user_addr = signer::address_of(user);
        let registry = borrow_global_mut<IntentRegistry>(registry_addr);

        assert!(smart_table::contains(&registry.intents, intent_id), errors::intent_not_found());

        let record = smart_table::borrow_mut(&mut registry.intents, intent_id);
        assert!(types::get_intent_user(record) == user_addr, errors::not_intent_owner());
        assert!(types::is_pending(types::get_intent_status(record)), errors::intent_not_pending());

        let escrowed_amount = types::get_escrowed_amount(record);
        let intent = types::get_intent(record);
        let input_token = types::get_input_token(intent);

        // Update status to Cancelled
        types::set_status(record, types::new_cancelled());

        // Refund escrowed funds
        let escrow_signer = get_escrow_signer(registry);
        let input_token_obj = object::address_to_object<Metadata>(input_token);
        primary_fungible_store::transfer(&escrow_signer, input_token_obj, user_addr, escrowed_amount);

        // Emit event
        event::emit(IntentCancelled {
            intent_id,
            user: user_addr,
            refunded_amount: escrowed_amount,
            cancelled_at: timestamp::now_seconds()
        });
    }

    // ============ View Functions ============

    #[view]
    /// Get intent details by ID
    public fun get_intent(registry_addr: address, intent_id: u64): IntentRecord acquires IntentRegistry {
        let registry = borrow_global<IntentRegistry>(registry_addr);
        assert!(smart_table::contains(&registry.intents, intent_id), errors::intent_not_found());
        *smart_table::borrow(&registry.intents, intent_id)
    }

    #[view]
    /// Get all intent IDs for a user
    public fun get_user_intents(registry_addr: address, user: address): vector<u64> acquires IntentRegistry {
        let registry = borrow_global<IntentRegistry>(registry_addr);
        if (smart_table::contains(&registry.user_intents, user)) {
            *smart_table::borrow(&registry.user_intents, user)
        } else {
            vector::empty()
        }
    }

    #[view]
    /// Get total number of intents created
    public fun get_total_intents(registry_addr: address): u64 acquires IntentRegistry {
        let registry = borrow_global<IntentRegistry>(registry_addr);
        registry.next_intent_id
    }

    // ============ Package Functions (for settlement) ============

    /// Check if an intent exists
    public(package) fun intent_exists(registry_addr: address, intent_id: u64): bool acquires IntentRegistry {
        let registry = borrow_global<IntentRegistry>(registry_addr);
        smart_table::contains(&registry.intents, intent_id)
    }

    /// Get intent record (immutable copy for settlement)
    public(package) fun get_intent_record(
        registry_addr: address,
        intent_id: u64
    ): IntentRecord acquires IntentRegistry {
        let registry = borrow_global<IntentRegistry>(registry_addr);
        assert!(smart_table::contains(&registry.intents, intent_id), errors::intent_not_found());
        *smart_table::borrow(&registry.intents, intent_id)
    }

    /// Update intent status (for settlement module)
    public(package) fun update_intent_status(
        registry_addr: address,
        intent_id: u64,
        filled_amount: u64,
        solver: address,
        execution_price: u64
    ) acquires IntentRegistry {
        let registry = borrow_global_mut<IntentRegistry>(registry_addr);
        assert!(smart_table::contains(&registry.intents, intent_id), errors::intent_not_found());

        let record = smart_table::borrow_mut(&mut registry.intents, intent_id);
        types::set_filled_amount(record, filled_amount);
        types::set_solver(record, solver);
        types::set_execution_price(record, execution_price);
        types::set_status(record, types::new_filled());
    }

    /// Mark intent as expired (for settlement module)
    public(package) fun expire_intent(
        registry_addr: address,
        intent_id: u64
    ) acquires IntentRegistry {
        let registry = borrow_global_mut<IntentRegistry>(registry_addr);
        assert!(smart_table::contains(&registry.intents, intent_id), errors::intent_not_found());

        let record = smart_table::borrow_mut(&mut registry.intents, intent_id);
        types::set_status(record, types::new_expired());
    }

    /// Withdraw from escrow and transfer to recipient (for settlement)
    public(package) fun transfer_from_escrow(
        registry_addr: address,
        token: address,
        recipient: address,
        amount: u64
    ) acquires IntentRegistry {
        let registry = borrow_global<IntentRegistry>(registry_addr);
        let escrow_signer = get_escrow_signer(registry);
        let token_obj = object::address_to_object<Metadata>(token);
        primary_fungible_store::transfer(&escrow_signer, token_obj, recipient, amount);
    }
}
