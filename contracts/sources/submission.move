/// Velox Intent Submission Module
/// Handles intent creation, escrow, and cancellation
module velox::submission {
    use std::signer;
    use std::vector;
    use aptos_std::smart_table::{Self, SmartTable};
    use aptos_framework::timestamp;
    use aptos_framework::event;
    use aptos_framework::primary_fungible_store;
    use aptos_framework::fungible_asset::Metadata;
    use aptos_framework::object::{Self, ExtendRef};
    use velox::types::{Self, IntentRecord, AuctionState};
    use velox::errors;

    // ============ Constants ============
    const INTENT_TYPE_SWAP: u8 = 0;
    const INTENT_TYPE_LIMIT: u8 = 1;
    const INTENT_TYPE_TWAP: u8 = 2;
    const INTENT_TYPE_DCA: u8 = 3;

    // ============ Storage ============

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
        auction_type: u8,
        created_at: u64
    }

    #[event]
    struct IntentCancelled has drop, store {
        intent_id: u64,
        user: address,
        refunded_amount: u64,
        cancelled_at: u64
    }

    // ============ Initialize ============

    public entry fun initialize(admin: &signer) {
        let admin_addr = signer::address_of(admin);
        assert!(!exists<IntentRegistry>(admin_addr), errors::already_initialized());

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

    fun get_escrow_signer(registry: &IntentRegistry): signer {
        object::generate_signer_for_extending(&registry.extend_ref)
    }

    fun get_escrow_address(registry: &IntentRegistry): address {
        signer::address_of(&get_escrow_signer(registry))
    }

    fun add_user_intent(registry: &mut IntentRegistry, user: address, intent_id: u64) {
        if (!smart_table::contains(&registry.user_intents, user)) {
            smart_table::add(&mut registry.user_intents, user, vector::empty());
        };
        let ids = smart_table::borrow_mut(&mut registry.user_intents, user);
        vector::push_back(ids, intent_id);
    }

    // ============ Swap Intents ============

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
        let now = timestamp::now_seconds();
        assert!(deadline > now, errors::deadline_passed());

        let user_addr = signer::address_of(user);
        let registry = borrow_global_mut<IntentRegistry>(registry_addr);
        let escrow_addr = get_escrow_address(registry);

        let intent_id = registry.next_intent_id;
        registry.next_intent_id = intent_id + 1;

        let intent = types::new_swap(input_token, output_token, amount_in, min_amount_out, deadline);
        let record = types::new_intent_record(intent_id, user_addr, now, intent, types::new_auction_none(), amount_in);

        smart_table::add(&mut registry.intents, intent_id, record);
        add_user_intent(registry, user_addr, intent_id);

        let input_token_obj = object::address_to_object<Metadata>(input_token);
        primary_fungible_store::transfer(user, input_token_obj, escrow_addr, amount_in);

        event::emit(IntentCreated {
            intent_id, user: user_addr, input_token, output_token,
            amount_in, intent_type: INTENT_TYPE_SWAP, auction_type: 0, created_at: now
        });
    }

    public entry fun submit_swap_sealed_bid(
        user: &signer,
        registry_addr: address,
        input_token: address,
        output_token: address,
        amount_in: u64,
        min_amount_out: u64,
        deadline: u64,
        auction_duration: u64
    ) acquires IntentRegistry {
        assert!(amount_in > 0, errors::zero_amount());
        let now = timestamp::now_seconds();
        assert!(deadline > now, errors::deadline_passed());
        assert!(auction_duration > 0, errors::invalid_auction_params());

        let user_addr = signer::address_of(user);
        let registry = borrow_global_mut<IntentRegistry>(registry_addr);
        let escrow_addr = get_escrow_address(registry);

        let intent_id = registry.next_intent_id;
        registry.next_intent_id = intent_id + 1;

        let auction_end = now + auction_duration;
        let intent = types::new_swap(input_token, output_token, amount_in, min_amount_out, deadline);
        let record = types::new_intent_record(
            intent_id, user_addr, now, intent,
            types::new_sealed_bid_active(auction_end), amount_in
        );

        smart_table::add(&mut registry.intents, intent_id, record);
        add_user_intent(registry, user_addr, intent_id);

        let input_token_obj = object::address_to_object<Metadata>(input_token);
        primary_fungible_store::transfer(user, input_token_obj, escrow_addr, amount_in);

        event::emit(IntentCreated {
            intent_id, user: user_addr, input_token, output_token,
            amount_in, intent_type: INTENT_TYPE_SWAP, auction_type: 1, created_at: now
        });
    }

    public entry fun submit_swap_dutch(
        user: &signer,
        registry_addr: address,
        input_token: address,
        output_token: address,
        amount_in: u64,
        min_amount_out: u64,
        start_price: u64,
        auction_duration: u64
    ) acquires IntentRegistry {
        assert!(amount_in > 0, errors::zero_amount());
        assert!(start_price > min_amount_out, errors::invalid_auction_params());
        assert!(auction_duration > 0, errors::invalid_auction_params());

        let now = timestamp::now_seconds();
        let user_addr = signer::address_of(user);
        let registry = borrow_global_mut<IntentRegistry>(registry_addr);
        let escrow_addr = get_escrow_address(registry);

        let intent_id = registry.next_intent_id;
        registry.next_intent_id = intent_id + 1;

        let end_time = now + auction_duration;
        let intent = types::new_swap(input_token, output_token, amount_in, min_amount_out, end_time);
        let record = types::new_intent_record(
            intent_id, user_addr, now, intent,
            types::new_dutch_active(start_price, min_amount_out, end_time), amount_in
        );

        smart_table::add(&mut registry.intents, intent_id, record);
        add_user_intent(registry, user_addr, intent_id);

        let input_token_obj = object::address_to_object<Metadata>(input_token);
        primary_fungible_store::transfer(user, input_token_obj, escrow_addr, amount_in);

        event::emit(IntentCreated {
            intent_id, user: user_addr, input_token, output_token,
            amount_in, intent_type: INTENT_TYPE_SWAP, auction_type: 2, created_at: now
        });
    }

    // ============ Limit Order ============

    public entry fun submit_limit_order(
        user: &signer,
        registry_addr: address,
        input_token: address,
        output_token: address,
        amount_in: u64,
        limit_price: u64,
        expiry: u64
    ) acquires IntentRegistry {
        assert!(amount_in > 0, errors::zero_amount());
        let now = timestamp::now_seconds();
        assert!(expiry > now, errors::expiry_passed());

        let user_addr = signer::address_of(user);
        let registry = borrow_global_mut<IntentRegistry>(registry_addr);
        let escrow_addr = get_escrow_address(registry);

        let intent_id = registry.next_intent_id;
        registry.next_intent_id = intent_id + 1;

        let intent = types::new_limit_order(input_token, output_token, amount_in, limit_price, expiry);
        let record = types::new_intent_record(intent_id, user_addr, now, intent, types::new_auction_none(), amount_in);

        smart_table::add(&mut registry.intents, intent_id, record);
        add_user_intent(registry, user_addr, intent_id);

        let input_token_obj = object::address_to_object<Metadata>(input_token);
        primary_fungible_store::transfer(user, input_token_obj, escrow_addr, amount_in);

        event::emit(IntentCreated {
            intent_id, user: user_addr, input_token, output_token,
            amount_in, intent_type: INTENT_TYPE_LIMIT, auction_type: 0, created_at: now
        });
    }

    // ============ TWAP Intent ============

    public entry fun submit_twap(
        user: &signer,
        registry_addr: address,
        input_token: address,
        output_token: address,
        total_amount: u64,
        num_chunks: u64,
        interval_seconds: u64,
        max_slippage_bps: u64,
        start_time: u64
    ) acquires IntentRegistry {
        assert!(total_amount > 0, errors::zero_amount());
        assert!(num_chunks > 0, errors::invalid_chunks());
        assert!(interval_seconds > 0, errors::invalid_interval());
        let now = timestamp::now_seconds();
        assert!(start_time >= now, errors::too_early());

        let user_addr = signer::address_of(user);
        let registry = borrow_global_mut<IntentRegistry>(registry_addr);
        let escrow_addr = get_escrow_address(registry);

        let intent_id = registry.next_intent_id;
        registry.next_intent_id = intent_id + 1;

        let intent = types::new_twap(
            input_token, output_token, total_amount, num_chunks,
            interval_seconds, max_slippage_bps, start_time
        );
        // new_intent_record already sets next_execution from start_time for TWAP
        let record = types::new_intent_record(intent_id, user_addr, now, intent, types::new_auction_none(), total_amount);

        smart_table::add(&mut registry.intents, intent_id, record);
        add_user_intent(registry, user_addr, intent_id);

        let input_token_obj = object::address_to_object<Metadata>(input_token);
        primary_fungible_store::transfer(user, input_token_obj, escrow_addr, total_amount);

        event::emit(IntentCreated {
            intent_id, user: user_addr, input_token, output_token,
            amount_in: total_amount, intent_type: INTENT_TYPE_TWAP, auction_type: 0, created_at: now
        });
    }

    // ============ DCA Intent ============

    public entry fun submit_dca(
        user: &signer,
        registry_addr: address,
        input_token: address,
        output_token: address,
        amount_per_period: u64,
        total_periods: u64,
        interval_seconds: u64
    ) acquires IntentRegistry {
        assert!(amount_per_period > 0, errors::zero_amount());
        assert!(total_periods > 0, errors::invalid_chunks());
        assert!(interval_seconds > 0, errors::invalid_interval());

        let now = timestamp::now_seconds();
        let user_addr = signer::address_of(user);
        let registry = borrow_global_mut<IntentRegistry>(registry_addr);
        let escrow_addr = get_escrow_address(registry);

        let total_amount = amount_per_period * total_periods;

        let intent_id = registry.next_intent_id;
        registry.next_intent_id = intent_id + 1;

        let intent = types::new_dca(
            input_token, output_token, amount_per_period, total_periods, interval_seconds, now
        );
        // new_intent_record already sets next_execution from start_time for DCA
        let record = types::new_intent_record(intent_id, user_addr, now, intent, types::new_auction_none(), total_amount);

        smart_table::add(&mut registry.intents, intent_id, record);
        add_user_intent(registry, user_addr, intent_id);

        let input_token_obj = object::address_to_object<Metadata>(input_token);
        primary_fungible_store::transfer(user, input_token_obj, escrow_addr, total_amount);

        event::emit(IntentCreated {
            intent_id, user: user_addr, input_token, output_token,
            amount_in: total_amount, intent_type: INTENT_TYPE_DCA, auction_type: 0, created_at: now
        });
    }

    // ============ Cancel ============

    public entry fun cancel_intent(
        user: &signer,
        registry_addr: address,
        intent_id: u64
    ) acquires IntentRegistry {
        let user_addr = signer::address_of(user);
        let registry = borrow_global_mut<IntentRegistry>(registry_addr);

        assert!(smart_table::contains(&registry.intents, intent_id), errors::intent_not_found());
        let record = smart_table::borrow_mut(&mut registry.intents, intent_id);

        assert!(types::get_record_user(record) == user_addr, errors::not_intent_owner());
        assert!(types::is_active(types::get_record_status(record)), errors::intent_not_active());

        let refund = types::get_record_escrow_remaining(record);
        let input_token = types::get_input_token(types::get_record_intent(record));

        types::set_record_status(record, types::new_cancelled());
        let _ = types::refund_escrow(record);

        if (refund > 0) {
            let escrow_signer = get_escrow_signer(registry);
            let token_obj = object::address_to_object<Metadata>(input_token);
            primary_fungible_store::transfer(&escrow_signer, token_obj, user_addr, refund);
        };

        event::emit(IntentCancelled {
            intent_id, user: user_addr, refunded_amount: refund,
            cancelled_at: timestamp::now_seconds()
        });
    }

    // ============ View Functions ============

    #[view]
    public fun get_intent(registry_addr: address, intent_id: u64): IntentRecord acquires IntentRegistry {
        let registry = borrow_global<IntentRegistry>(registry_addr);
        assert!(smart_table::contains(&registry.intents, intent_id), errors::intent_not_found());
        *smart_table::borrow(&registry.intents, intent_id)
    }

    #[view]
    public fun get_user_intents(registry_addr: address, user: address): vector<u64> acquires IntentRegistry {
        let registry = borrow_global<IntentRegistry>(registry_addr);
        if (smart_table::contains(&registry.user_intents, user)) {
            *smart_table::borrow(&registry.user_intents, user)
        } else {
            vector::empty()
        }
    }

    #[view]
    public fun get_total_intents(registry_addr: address): u64 acquires IntentRegistry {
        borrow_global<IntentRegistry>(registry_addr).next_intent_id
    }

    #[view]
    public fun get_escrow_addr(registry_addr: address): address acquires IntentRegistry {
        let registry = borrow_global<IntentRegistry>(registry_addr);
        get_escrow_address(registry)
    }

    #[view]
    public fun get_auction_state(registry_addr: address, intent_id: u64): AuctionState acquires IntentRegistry {
        let registry = borrow_global<IntentRegistry>(registry_addr);
        assert!(smart_table::contains(&registry.intents, intent_id), errors::intent_not_found());
        *types::get_record_auction(smart_table::borrow(&registry.intents, intent_id))
    }

    // ============ Package Functions ============

    public(package) fun intent_exists(registry_addr: address, intent_id: u64): bool acquires IntentRegistry {
        smart_table::contains(&borrow_global<IntentRegistry>(registry_addr).intents, intent_id)
    }

    public(package) fun borrow_intent(registry_addr: address, intent_id: u64): IntentRecord acquires IntentRegistry {
        let registry = borrow_global<IntentRegistry>(registry_addr);
        assert!(smart_table::contains(&registry.intents, intent_id), errors::intent_not_found());
        *smart_table::borrow(&registry.intents, intent_id)
    }

    // ============ Intent Mutation Functions ============

    public(package) fun update_intent_auction(
        registry_addr: address,
        intent_id: u64,
        auction: AuctionState
    ) acquires IntentRegistry {
        let registry = borrow_global_mut<IntentRegistry>(registry_addr);
        assert!(smart_table::contains(&registry.intents, intent_id), errors::intent_not_found());
        let record = smart_table::borrow_mut(&mut registry.intents, intent_id);
        types::set_auction(record, auction);
    }

    public(package) fun add_bid_to_intent(
        registry_addr: address,
        intent_id: u64,
        bid: types::Bid
    ) acquires IntentRegistry {
        let registry = borrow_global_mut<IntentRegistry>(registry_addr);
        assert!(smart_table::contains(&registry.intents, intent_id), errors::intent_not_found());
        let record = smart_table::borrow_mut(&mut registry.intents, intent_id);
        types::add_bid(record, bid);
    }

    public(package) fun record_fill(
        registry_addr: address,
        intent_id: u64,
        fill: types::Fill,
        new_escrow: u64,
        _output_added: u64
    ) acquires IntentRegistry {
        let registry = borrow_global_mut<IntentRegistry>(registry_addr);
        assert!(smart_table::contains(&registry.intents, intent_id), errors::intent_not_found());
        let record = smart_table::borrow_mut(&mut registry.intents, intent_id);
        // add_fill already updates escrow_remaining and total_output_received
        types::add_fill(record, fill);
        types::set_escrow_remaining(record, new_escrow);
        // NOTE: Removed duplicate add_total_output call - add_fill already handles this
    }

    public(package) fun update_intent_status(
        registry_addr: address,
        intent_id: u64,
        status: types::IntentStatus
    ) acquires IntentRegistry {
        let registry = borrow_global_mut<IntentRegistry>(registry_addr);
        assert!(smart_table::contains(&registry.intents, intent_id), errors::intent_not_found());
        let record = smart_table::borrow_mut(&mut registry.intents, intent_id);
        types::set_status(record, status);
    }

    public(package) fun increment_chunks(
        registry_addr: address,
        intent_id: u64,
        next_exec: u64
    ) acquires IntentRegistry {
        let registry = borrow_global_mut<IntentRegistry>(registry_addr);
        assert!(smart_table::contains(&registry.intents, intent_id), errors::intent_not_found());
        let record = smart_table::borrow_mut(&mut registry.intents, intent_id);
        types::increment_chunks_executed(record);
        types::set_next_execution(record, next_exec);
    }

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
