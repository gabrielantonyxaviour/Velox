/// Fee Management Module for Velox
/// Handles protocol fee collection and admin withdrawal
module velox::fees {
    use std::signer;
    use aptos_std::smart_table::{Self, SmartTable};
    use aptos_framework::event;
    use aptos_framework::primary_fungible_store;
    use aptos_framework::fungible_asset::Metadata;
    use aptos_framework::object::{Self, ExtendRef};
    use velox::errors;

    // ============ Storage ============

    /// Fee tracker for protocol fee collection
    struct FeeTracker has key {
        admin: address,
        total_collected: SmartTable<address, u128>,
        total_withdrawn: SmartTable<address, u128>,
        extend_ref: ExtendRef
    }

    // ============ Events ============

    #[event]
    struct FeeCollected has drop, store {
        token: address,
        amount: u64,
        intent_id: u64,
        collected_at: u64
    }

    #[event]
    struct FeeWithdrawn has drop, store {
        token: address,
        amount: u64,
        recipient: address,
        withdrawn_at: u64
    }

    #[event]
    struct AdminTransferred has drop, store {
        old_admin: address,
        new_admin: address,
        transferred_at: u64
    }

    // ============ Initialize ============

    /// Initialize the fee tracker (admin only)
    public entry fun initialize(admin: &signer) {
        let admin_addr = signer::address_of(admin);
        assert!(!exists<FeeTracker>(admin_addr), errors::intent_already_exists());

        let constructor_ref = object::create_object(admin_addr);
        let extend_ref = object::generate_extend_ref(&constructor_ref);

        move_to(admin, FeeTracker {
            admin: admin_addr,
            total_collected: smart_table::new(),
            total_withdrawn: smart_table::new(),
            extend_ref
        });
    }

    // ============ Internal Helpers ============

    /// Get signer for the fee vault object
    fun get_vault_signer(tracker: &FeeTracker): signer {
        object::generate_signer_for_extending(&tracker.extend_ref)
    }

    /// Get vault address
    fun get_vault_address(tracker: &FeeTracker): address {
        signer::address_of(&get_vault_signer(tracker))
    }

    // ============ Package Functions ============

    /// Record fee collection (called by settlement module)
    public(package) fun record_fee(
        tracker_addr: address,
        token: address,
        amount: u64,
        intent_id: u64
    ) acquires FeeTracker {
        if (amount == 0) {
            return
        };

        let tracker = borrow_global_mut<FeeTracker>(tracker_addr);

        if (!smart_table::contains(&tracker.total_collected, token)) {
            smart_table::add(&mut tracker.total_collected, token, 0);
        };

        let collected = smart_table::borrow_mut(&mut tracker.total_collected, token);
        *collected = *collected + (amount as u128);

        event::emit(FeeCollected {
            token,
            amount,
            intent_id,
            collected_at: aptos_framework::timestamp::now_seconds()
        });
    }

    /// Transfer fees to vault (called by settlement module after collecting from solver)
    public(package) fun deposit_to_vault(
        tracker_addr: address,
        depositor: &signer,
        token: address,
        amount: u64
    ) acquires FeeTracker {
        if (amount == 0) {
            return
        };

        let tracker = borrow_global<FeeTracker>(tracker_addr);
        let vault_addr = get_vault_address(tracker);

        let token_obj = object::address_to_object<Metadata>(token);
        primary_fungible_store::transfer(depositor, token_obj, vault_addr, amount);
    }

    // ============ Entry Functions ============

    /// Withdraw collected fees (admin only)
    public entry fun withdraw_fees(
        admin: &signer,
        tracker_addr: address,
        token: address,
        amount: u64,
        recipient: address
    ) acquires FeeTracker {
        let admin_addr = signer::address_of(admin);
        let tracker = borrow_global_mut<FeeTracker>(tracker_addr);

        assert!(tracker.admin == admin_addr, errors::not_admin());
        assert!(amount > 0, errors::zero_amount());

        // Calculate available fees
        let collected = if (smart_table::contains(&tracker.total_collected, token)) {
            *smart_table::borrow(&tracker.total_collected, token)
        } else {
            0u128
        };

        let withdrawn = if (smart_table::contains(&tracker.total_withdrawn, token)) {
            *smart_table::borrow(&tracker.total_withdrawn, token)
        } else {
            0u128
        };

        let available = collected - withdrawn;
        assert!((amount as u128) <= available, errors::insufficient_balance());

        // Update withdrawn amount
        if (!smart_table::contains(&tracker.total_withdrawn, token)) {
            smart_table::add(&mut tracker.total_withdrawn, token, 0);
        };
        let withdrawn_ref = smart_table::borrow_mut(&mut tracker.total_withdrawn, token);
        *withdrawn_ref = *withdrawn_ref + (amount as u128);

        // Transfer fees from vault to recipient
        let vault_signer = get_vault_signer(tracker);
        let token_obj = object::address_to_object<Metadata>(token);
        primary_fungible_store::transfer(&vault_signer, token_obj, recipient, amount);

        event::emit(FeeWithdrawn {
            token,
            amount,
            recipient,
            withdrawn_at: aptos_framework::timestamp::now_seconds()
        });
    }

    /// Transfer admin rights to a new address
    public entry fun transfer_admin(
        admin: &signer,
        tracker_addr: address,
        new_admin: address
    ) acquires FeeTracker {
        let admin_addr = signer::address_of(admin);
        let tracker = borrow_global_mut<FeeTracker>(tracker_addr);

        assert!(tracker.admin == admin_addr, errors::not_admin());

        let old_admin = tracker.admin;
        tracker.admin = new_admin;

        event::emit(AdminTransferred {
            old_admin,
            new_admin,
            transferred_at: aptos_framework::timestamp::now_seconds()
        });
    }

    // ============ View Functions ============

    #[view]
    /// Get total fees collected for a token
    public fun get_total_collected(tracker_addr: address, token: address): u128 acquires FeeTracker {
        let tracker = borrow_global<FeeTracker>(tracker_addr);
        if (smart_table::contains(&tracker.total_collected, token)) {
            *smart_table::borrow(&tracker.total_collected, token)
        } else {
            0
        }
    }

    #[view]
    /// Get total fees withdrawn for a token
    public fun get_total_withdrawn(tracker_addr: address, token: address): u128 acquires FeeTracker {
        let tracker = borrow_global<FeeTracker>(tracker_addr);
        if (smart_table::contains(&tracker.total_withdrawn, token)) {
            *smart_table::borrow(&tracker.total_withdrawn, token)
        } else {
            0
        }
    }

    #[view]
    /// Get available fees for withdrawal
    public fun get_available_fees(tracker_addr: address, token: address): u128 acquires FeeTracker {
        let collected = get_total_collected(tracker_addr, token);
        let withdrawn = get_total_withdrawn(tracker_addr, token);
        collected - withdrawn
    }

    #[view]
    /// Get admin address
    public fun get_admin(tracker_addr: address): address acquires FeeTracker {
        let tracker = borrow_global<FeeTracker>(tracker_addr);
        tracker.admin
    }

    #[view]
    /// Get vault address where fees are stored
    public fun get_vault_address_view(tracker_addr: address): address acquires FeeTracker {
        let tracker = borrow_global<FeeTracker>(tracker_addr);
        get_vault_address(tracker)
    }
}
