/// Scheduled Intent Execution Module for Velox
/// Handles TWAP and DCA scheduled execution tracking
module velox::scheduled {
    use std::vector;
    use aptos_std::smart_table::{Self, SmartTable};
    use aptos_framework::timestamp;
    use aptos_framework::event;
    use velox::errors;

    // ============ Storage ============

    /// Tracks scheduled intent execution state
    struct ScheduledIntent has store, drop, copy {
        intent_id: u64,
        next_execution: u64,
        chunks_executed: u64,
        total_chunks: u64,
        is_twap: bool
    }

    /// Global registry for scheduled intents
    struct ScheduledRegistry has key {
        scheduled_intents: SmartTable<u64, ScheduledIntent>,
        executable_intent_ids: vector<u64>
    }

    // ============ Events ============

    #[event]
    struct ChunkExecuted has drop, store {
        intent_id: u64,
        chunk_number: u64,
        total_chunks: u64,
        executed_at: u64,
        next_execution: u64
    }

    #[event]
    struct ScheduledIntentCompleted has drop, store {
        intent_id: u64,
        total_chunks_executed: u64,
        completed_at: u64
    }

    // ============ Initialize ============

    /// Initialize the scheduled registry (admin only)
    public entry fun initialize(admin: &signer) {
        let admin_addr = std::signer::address_of(admin);
        assert!(!exists<ScheduledRegistry>(admin_addr), errors::intent_already_exists());

        move_to(admin, ScheduledRegistry {
            scheduled_intents: smart_table::new(),
            executable_intent_ids: vector::empty()
        });
    }

    // ============ Package Functions ============

    /// Register a new TWAP intent for scheduled execution
    public(package) fun register_twap(
        registry_addr: address,
        intent_id: u64,
        num_chunks: u64,
        start_time: u64,
        _interval_seconds: u64
    ) acquires ScheduledRegistry {
        let registry = borrow_global_mut<ScheduledRegistry>(registry_addr);

        let scheduled = ScheduledIntent {
            intent_id,
            next_execution: start_time,
            chunks_executed: 0,
            total_chunks: num_chunks,
            is_twap: true
        };

        smart_table::add(&mut registry.scheduled_intents, intent_id, scheduled);
        vector::push_back(&mut registry.executable_intent_ids, intent_id);
    }

    /// Register a new DCA intent for scheduled execution
    public(package) fun register_dca(
        registry_addr: address,
        intent_id: u64,
        total_periods: u64,
        next_execution: u64
    ) acquires ScheduledRegistry {
        let registry = borrow_global_mut<ScheduledRegistry>(registry_addr);

        let scheduled = ScheduledIntent {
            intent_id,
            next_execution,
            chunks_executed: 0,
            total_chunks: total_periods,
            is_twap: false
        };

        smart_table::add(&mut registry.scheduled_intents, intent_id, scheduled);
        vector::push_back(&mut registry.executable_intent_ids, intent_id);
    }

    /// Update scheduled intent after chunk execution
    public(package) fun update_after_execution(
        registry_addr: address,
        intent_id: u64,
        interval_seconds: u64
    ) acquires ScheduledRegistry {
        let registry = borrow_global_mut<ScheduledRegistry>(registry_addr);
        assert!(smart_table::contains(&registry.scheduled_intents, intent_id), errors::intent_not_found());

        let scheduled = smart_table::borrow_mut(&mut registry.scheduled_intents, intent_id);
        let now = timestamp::now_seconds();
        scheduled.chunks_executed = scheduled.chunks_executed + 1;
        let new_next = now + interval_seconds;

        // Check if completed
        if (scheduled.chunks_executed >= scheduled.total_chunks) {
            event::emit(ScheduledIntentCompleted {
                intent_id,
                total_chunks_executed: scheduled.chunks_executed,
                completed_at: now
            });
            remove_from_executable(registry, intent_id);
        } else {
            scheduled.next_execution = new_next;
            event::emit(ChunkExecuted {
                intent_id,
                chunk_number: scheduled.chunks_executed,
                total_chunks: scheduled.total_chunks,
                executed_at: now,
                next_execution: new_next
            });
        }
    }

    /// Remove intent from executable list
    fun remove_from_executable(registry: &mut ScheduledRegistry, intent_id: u64) {
        let (found, idx) = vector::index_of(&registry.executable_intent_ids, &intent_id);
        if (found) {
            vector::remove(&mut registry.executable_intent_ids, idx);
        }
    }

    // ============ View Functions ============

    #[view]
    /// Get next execution time for a scheduled intent
    public fun get_next_execution_time(registry_addr: address, intent_id: u64): u64 acquires ScheduledRegistry {
        let registry = borrow_global<ScheduledRegistry>(registry_addr);
        if (!smart_table::contains(&registry.scheduled_intents, intent_id)) {
            return 0
        };
        let scheduled = smart_table::borrow(&registry.scheduled_intents, intent_id);
        scheduled.next_execution
    }

    #[view]
    /// Get scheduled intent details
    public fun get_scheduled_intent(
        registry_addr: address,
        intent_id: u64
    ): (u64, u64, u64, bool) acquires ScheduledRegistry {
        let registry = borrow_global<ScheduledRegistry>(registry_addr);
        assert!(smart_table::contains(&registry.scheduled_intents, intent_id), errors::intent_not_found());
        let s = smart_table::borrow(&registry.scheduled_intents, intent_id);
        (s.next_execution, s.chunks_executed, s.total_chunks, s.is_twap)
    }

    #[view]
    /// Get all executable intent IDs that are ready for execution
    public fun get_executable_intents(registry_addr: address): vector<u64> acquires ScheduledRegistry {
        let registry = borrow_global<ScheduledRegistry>(registry_addr);
        let now = timestamp::now_seconds();
        let result = vector::empty<u64>();
        let i = 0;
        let len = vector::length(&registry.executable_intent_ids);

        while (i < len) {
            let intent_id = *vector::borrow(&registry.executable_intent_ids, i);
            if (smart_table::contains(&registry.scheduled_intents, intent_id)) {
                let scheduled = smart_table::borrow(&registry.scheduled_intents, intent_id);
                if (now >= scheduled.next_execution && scheduled.chunks_executed < scheduled.total_chunks) {
                    vector::push_back(&mut result, intent_id);
                };
            };
            i = i + 1;
        };
        result
    }

    #[view]
    /// Check if a scheduled intent is ready for execution
    public fun is_ready_for_execution(registry_addr: address, intent_id: u64): bool acquires ScheduledRegistry {
        let registry = borrow_global<ScheduledRegistry>(registry_addr);
        if (!smart_table::contains(&registry.scheduled_intents, intent_id)) {
            return false
        };
        let scheduled = smart_table::borrow(&registry.scheduled_intents, intent_id);
        let now = timestamp::now_seconds();
        now >= scheduled.next_execution && scheduled.chunks_executed < scheduled.total_chunks
    }

    #[view]
    /// Check if a scheduled intent is completed
    public fun is_completed(registry_addr: address, intent_id: u64): bool acquires ScheduledRegistry {
        let registry = borrow_global<ScheduledRegistry>(registry_addr);
        if (!smart_table::contains(&registry.scheduled_intents, intent_id)) {
            return false
        };
        let scheduled = smart_table::borrow(&registry.scheduled_intents, intent_id);
        scheduled.chunks_executed >= scheduled.total_chunks
    }

    #[view]
    /// Get chunks executed for a scheduled intent
    public fun get_chunks_executed(registry_addr: address, intent_id: u64): u64 acquires ScheduledRegistry {
        let registry = borrow_global<ScheduledRegistry>(registry_addr);
        if (!smart_table::contains(&registry.scheduled_intents, intent_id)) {
            return 0
        };
        let scheduled = smart_table::borrow(&registry.scheduled_intents, intent_id);
        scheduled.chunks_executed
    }
}
