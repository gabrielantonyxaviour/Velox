/// Velox Settlement Module
/// Handles intent fills, partial fills, and protocol fees
module velox::settlement {
    use std::signer;
    use std::vector;
    use aptos_framework::timestamp;
    use aptos_framework::event;
    use aptos_framework::primary_fungible_store;
    use aptos_framework::fungible_asset::Metadata;
    use aptos_framework::object;
    use velox::types;
    use velox::submission;
    use velox::errors;
    use velox::math;
    use velox::auction;

    // ============ Constants ============
    const PROTOCOL_FEE_BPS: u64 = 30; // 0.3% fee
    const MAX_FILLS: u64 = 5;

    // ============ Storage ============

    struct FeeConfig has key {
        treasury: address,
        admin: address,
        fee_bps: u64,
        total_collected: u128
    }

    // ============ Events ============

    #[event]
    struct IntentFilled has drop, store {
        intent_id: u64,
        user: address,
        solver: address,
        input_amount: u64,
        output_amount: u64,
        is_partial: bool,
        fill_number: u64,
        protocol_fee: u64,
        filled_at: u64
    }

    #[event]
    struct IntentCompleted has drop, store {
        intent_id: u64,
        user: address,
        total_fills: u64,
        total_input: u64,
        total_output: u64,
        completed_at: u64
    }

    #[event]
    struct ProtocolFeeCollected has drop, store {
        intent_id: u64,
        token: address,
        amount: u64,
        treasury: address
    }

    #[event]
    struct ChunkExecuted has drop, store {
        intent_id: u64,
        chunk_number: u64,
        total_chunks: u64,
        solver: address,
        input_amount: u64,
        output_amount: u64,
        executed_at: u64
    }

    // ============ Initialize ============

    public entry fun initialize(admin: &signer, treasury: address) {
        let admin_addr = signer::address_of(admin);
        assert!(!exists<FeeConfig>(admin_addr), errors::already_initialized());

        move_to(admin, FeeConfig {
            treasury,
            admin: admin_addr,
            fee_bps: PROTOCOL_FEE_BPS,
            total_collected: 0
        });
    }

    public entry fun update_treasury(
        admin: &signer,
        config_addr: address,
        new_treasury: address
    ) acquires FeeConfig {
        let admin_addr = signer::address_of(admin);
        let config = borrow_global_mut<FeeConfig>(config_addr);
        assert!(config.admin == admin_addr, errors::not_admin());
        config.treasury = new_treasury;
    }

    public entry fun update_fee_bps(
        admin: &signer,
        config_addr: address,
        new_fee_bps: u64
    ) acquires FeeConfig {
        let admin_addr = signer::address_of(admin);
        let config = borrow_global_mut<FeeConfig>(config_addr);
        assert!(config.admin == admin_addr, errors::not_admin());
        config.fee_bps = new_fee_bps;
    }

    // ============ Fill Functions ============

    /// Fill a swap intent (partial or full)
    public entry fun fill_swap(
        solver: &signer,
        registry_addr: address,
        fee_config_addr: address,
        intent_id: u64,
        fill_input: u64,
        output_amount: u64
    ) acquires FeeConfig {
        let solver_addr = signer::address_of(solver);
        let now = timestamp::now_seconds();

        // Read intent data (immutable borrow)
        let record = submission::borrow_intent(registry_addr, intent_id);

        // Validate status
        assert!(types::is_record_active(&record), errors::intent_not_active());

        // Validate is swap
        let intent = types::get_intent_ref(&record);
        assert!(types::is_swap(intent), errors::token_mismatch());

        // Check deadline
        let deadline = types::get_swap_deadline(intent);
        assert!(now < deadline, errors::deadline_passed());

        // Check fill limits
        let fills = types::get_fills(&record);
        let fill_count = vector::length(&fills);
        assert!(fill_count < MAX_FILLS, errors::max_fills_reached());

        // Check fill amount valid
        let remaining = types::get_escrow_remaining(&record);
        assert!(fill_input > 0 && fill_input <= remaining, errors::exceeds_remaining());

        // Verify auction allows this solver to fill
        let auction_state = types::get_auction(&record);
        if (!types::is_auction_none(&auction_state)) {
            assert!(auction::can_solver_fill(registry_addr, intent_id, solver_addr), errors::solver_not_winner());
        };

        // Check output meets minimum (proportional)
        let min_out = types::get_swap_min_output(intent);
        let total_input = types::get_swap_amount_in(intent);
        let proportional_min = math::safe_mul_div(min_out, fill_input, total_input);
        assert!(output_amount >= proportional_min, errors::min_amount_not_met());

        // Get token addresses and user
        let input_token = types::get_swap_input_token(intent);
        let output_token = types::get_swap_output_token(intent);
        let user = types::get_user(&record);
        let current_total_output = types::get_total_output(&record);

        // Calculate fee
        let (fee, solver_receives) = calculate_fee_split(fee_config_addr, fill_input);

        // Transfer output to user
        let output_obj = object::address_to_object<Metadata>(output_token);
        primary_fungible_store::transfer(solver, output_obj, user, output_amount);

        // Transfer input to solver (minus fee)
        submission::transfer_from_escrow(registry_addr, input_token, solver_addr, solver_receives);

        // Collect fee
        if (fee > 0 && exists<FeeConfig>(fee_config_addr)) {
            collect_fee(fee_config_addr, registry_addr, input_token, fee, intent_id);
        };

        // Record fill using helper function
        let fill = types::new_fill(solver_addr, fill_input, output_amount, now);
        let new_remaining = remaining - fill_input;
        submission::record_fill(registry_addr, intent_id, fill, new_remaining, output_amount);

        let new_fill_count = fill_count + 1;
        let new_total_output = current_total_output + output_amount;

        // Check if fully filled and update status
        if (new_remaining == 0) {
            submission::update_intent_status(registry_addr, intent_id, types::status_filled());
            event::emit(IntentCompleted {
                intent_id, user,
                total_fills: new_fill_count,
                total_input: total_input,
                total_output: new_total_output,
                completed_at: now
            });
        };

        event::emit(IntentFilled {
            intent_id, user, solver: solver_addr,
            input_amount: fill_input, output_amount,
            is_partial: new_remaining > 0,
            fill_number: new_fill_count,
            protocol_fee: fee,
            filled_at: now
        });
    }

    /// Fill a limit order
    public entry fun fill_limit_order(
        solver: &signer,
        registry_addr: address,
        fee_config_addr: address,
        intent_id: u64,
        fill_input: u64,
        output_amount: u64
    ) acquires FeeConfig {
        let solver_addr = signer::address_of(solver);
        let now = timestamp::now_seconds();

        // Read intent data (immutable borrow)
        let record = submission::borrow_intent(registry_addr, intent_id);

        assert!(types::is_record_active(&record), errors::intent_not_active());

        let intent = types::get_intent_ref(&record);
        assert!(types::is_limit_order(intent), errors::token_mismatch());

        let expiry = types::get_limit_expiry(intent);
        assert!(now < expiry, errors::expiry_passed());

        let fills = types::get_fills(&record);
        let fill_count = vector::length(&fills);
        assert!(fill_count < MAX_FILLS, errors::max_fills_reached());

        let remaining = types::get_escrow_remaining(&record);
        assert!(fill_input > 0 && fill_input <= remaining, errors::exceeds_remaining());

        // Verify price meets limit
        let limit_price = types::get_limit_price(intent);
        let execution_price = math::safe_mul_div(output_amount, math::bps_denominator(), fill_input);
        assert!(execution_price >= limit_price, errors::min_amount_not_met());

        let input_token = types::get_limit_input_token(intent);
        let output_token = types::get_limit_output_token(intent);
        let user = types::get_user(&record);
        let total_input = types::get_limit_amount_in(intent);
        let current_total_output = types::get_total_output(&record);

        let (fee, solver_receives) = calculate_fee_split(fee_config_addr, fill_input);

        let output_obj = object::address_to_object<Metadata>(output_token);
        primary_fungible_store::transfer(solver, output_obj, user, output_amount);

        submission::transfer_from_escrow(registry_addr, input_token, solver_addr, solver_receives);

        if (fee > 0 && exists<FeeConfig>(fee_config_addr)) {
            collect_fee(fee_config_addr, registry_addr, input_token, fee, intent_id);
        };

        let fill = types::new_fill(solver_addr, fill_input, output_amount, now);
        let new_remaining = remaining - fill_input;
        submission::record_fill(registry_addr, intent_id, fill, new_remaining, output_amount);

        let new_fill_count = fill_count + 1;
        let new_total_output = current_total_output + output_amount;

        if (new_remaining == 0) {
            submission::update_intent_status(registry_addr, intent_id, types::status_filled());
            event::emit(IntentCompleted {
                intent_id, user,
                total_fills: new_fill_count,
                total_input: total_input,
                total_output: new_total_output,
                completed_at: now
            });
        };

        event::emit(IntentFilled {
            intent_id, user, solver: solver_addr,
            input_amount: fill_input, output_amount,
            is_partial: new_remaining > 0,
            fill_number: new_fill_count,
            protocol_fee: fee,
            filled_at: now
        });
    }

    /// Execute TWAP chunk
    public entry fun fill_twap_chunk(
        solver: &signer,
        registry_addr: address,
        fee_config_addr: address,
        intent_id: u64,
        output_amount: u64
    ) acquires FeeConfig {
        let solver_addr = signer::address_of(solver);
        let now = timestamp::now_seconds();

        // Read intent data (immutable borrow)
        let record = submission::borrow_intent(registry_addr, intent_id);

        assert!(types::is_record_active(&record), errors::intent_not_active());

        let intent = types::get_intent_ref(&record);
        assert!(types::is_twap(intent), errors::token_mismatch());

        // Check if ready
        let next_exec = types::get_next_execution(&record);
        assert!(now >= next_exec, errors::chunk_not_ready());

        let num_chunks = types::get_twap_num_chunks(intent);
        let chunks_done = types::get_chunks_executed(&record);
        assert!(chunks_done < num_chunks, errors::scheduled_completed());

        let total_amount = types::get_twap_total_amount(intent);
        let chunk_amount = total_amount / num_chunks;
        let remaining = types::get_escrow_remaining(&record);
        let actual_chunk = math::min(chunk_amount, remaining);

        // Check slippage
        let max_slippage = types::get_twap_max_slippage(intent);
        let min_output = math::min_output_with_slippage(actual_chunk, max_slippage);
        assert!(output_amount >= min_output, errors::min_amount_not_met());

        let input_token = types::get_twap_input_token(intent);
        let output_token = types::get_twap_output_token(intent);
        let user = types::get_user(&record);
        let interval = types::get_twap_interval(intent);
        let current_total_output = types::get_total_output(&record);

        let (fee, solver_receives) = calculate_fee_split(fee_config_addr, actual_chunk);

        let output_obj = object::address_to_object<Metadata>(output_token);
        primary_fungible_store::transfer(solver, output_obj, user, output_amount);

        submission::transfer_from_escrow(registry_addr, input_token, solver_addr, solver_receives);

        if (fee > 0 && exists<FeeConfig>(fee_config_addr)) {
            collect_fee(fee_config_addr, registry_addr, input_token, fee, intent_id);
        };

        let fill = types::new_fill(solver_addr, actual_chunk, output_amount, now);
        let new_remaining = remaining - actual_chunk;
        submission::record_fill(registry_addr, intent_id, fill, new_remaining, output_amount);

        // Increment chunks and set next execution
        let next_exec_time = now + interval;
        submission::increment_chunks(registry_addr, intent_id, next_exec_time);

        let new_chunks_done = chunks_done + 1;
        let new_total_output = current_total_output + output_amount;

        event::emit(ChunkExecuted {
            intent_id,
            chunk_number: new_chunks_done,
            total_chunks: num_chunks,
            solver: solver_addr,
            input_amount: actual_chunk,
            output_amount,
            executed_at: now
        });

        if (new_chunks_done == num_chunks) {
            submission::update_intent_status(registry_addr, intent_id, types::status_filled());
            event::emit(IntentCompleted {
                intent_id, user,
                total_fills: new_chunks_done,
                total_input: total_amount,
                total_output: new_total_output,
                completed_at: now
            });
        };
    }

    /// Execute DCA period
    public entry fun fill_dca_period(
        solver: &signer,
        registry_addr: address,
        fee_config_addr: address,
        intent_id: u64,
        output_amount: u64
    ) acquires FeeConfig {
        let solver_addr = signer::address_of(solver);
        let now = timestamp::now_seconds();

        // Read intent data (immutable borrow)
        let record = submission::borrow_intent(registry_addr, intent_id);

        assert!(types::is_record_active(&record), errors::intent_not_active());

        let intent = types::get_intent_ref(&record);
        assert!(types::is_dca(intent), errors::token_mismatch());

        let next_exec = types::get_next_execution(&record);
        assert!(now >= next_exec, errors::period_not_ready());

        let total_periods = types::get_dca_total_periods(intent);
        let periods_done = types::get_chunks_executed(&record);
        assert!(periods_done < total_periods, errors::scheduled_completed());

        let amount_per_period = types::get_dca_amount_per_period(intent);
        let remaining = types::get_escrow_remaining(&record);
        let actual_amount = math::min(amount_per_period, remaining);

        let input_token = types::get_dca_input_token(intent);
        let output_token = types::get_dca_output_token(intent);
        let user = types::get_user(&record);
        let interval = types::get_dca_interval(intent);
        let current_total_output = types::get_total_output(&record);

        let (fee, solver_receives) = calculate_fee_split(fee_config_addr, actual_amount);

        let output_obj = object::address_to_object<Metadata>(output_token);
        primary_fungible_store::transfer(solver, output_obj, user, output_amount);

        submission::transfer_from_escrow(registry_addr, input_token, solver_addr, solver_receives);

        if (fee > 0 && exists<FeeConfig>(fee_config_addr)) {
            collect_fee(fee_config_addr, registry_addr, input_token, fee, intent_id);
        };

        let fill = types::new_fill(solver_addr, actual_amount, output_amount, now);
        let new_remaining = remaining - actual_amount;
        submission::record_fill(registry_addr, intent_id, fill, new_remaining, output_amount);

        // Increment periods and set next execution
        let next_exec_time = now + interval;
        submission::increment_chunks(registry_addr, intent_id, next_exec_time);

        let new_periods_done = periods_done + 1;
        let new_total_output = current_total_output + output_amount;

        event::emit(ChunkExecuted {
            intent_id,
            chunk_number: new_periods_done,
            total_chunks: total_periods,
            solver: solver_addr,
            input_amount: actual_amount,
            output_amount,
            executed_at: now
        });

        if (new_periods_done == total_periods) {
            submission::update_intent_status(registry_addr, intent_id, types::status_filled());
            let total_amount = amount_per_period * total_periods;
            event::emit(IntentCompleted {
                intent_id, user,
                total_fills: new_periods_done,
                total_input: total_amount,
                total_output: new_total_output,
                completed_at: now
            });
        };
    }

    // ============ Internal Functions ============

    fun calculate_fee_split(config_addr: address, amount: u64): (u64, u64) acquires FeeConfig {
        if (!exists<FeeConfig>(config_addr)) {
            return (0, amount)
        };
        let config = borrow_global<FeeConfig>(config_addr);
        let fee = math::calculate_fee(amount, config.fee_bps);
        (fee, amount - fee)
    }

    fun collect_fee(
        config_addr: address,
        registry_addr: address,
        token: address,
        amount: u64,
        intent_id: u64
    ) acquires FeeConfig {
        let config = borrow_global_mut<FeeConfig>(config_addr);
        let treasury = config.treasury;

        submission::transfer_from_escrow(registry_addr, token, treasury, amount);
        config.total_collected = config.total_collected + (amount as u128);

        event::emit(ProtocolFeeCollected {
            intent_id, token, amount, treasury
        });
    }

    // ============ View Functions ============

    #[view]
    public fun get_fee_bps(config_addr: address): u64 acquires FeeConfig {
        if (!exists<FeeConfig>(config_addr)) { 0 }
        else { borrow_global<FeeConfig>(config_addr).fee_bps }
    }

    #[view]
    public fun get_treasury(config_addr: address): address acquires FeeConfig {
        borrow_global<FeeConfig>(config_addr).treasury
    }

    #[view]
    public fun get_total_collected(config_addr: address): u128 acquires FeeConfig {
        if (!exists<FeeConfig>(config_addr)) { 0 }
        else { borrow_global<FeeConfig>(config_addr).total_collected }
    }

    #[view]
    public fun can_fill(registry_addr: address, intent_id: u64, solver: address): bool {
        if (!submission::intent_exists(registry_addr, intent_id)) {
            return false
        };

        let record = submission::borrow_intent(registry_addr, intent_id);
        if (!types::is_record_active(&record)) {
            return false
        };

        let fills = types::get_fills(&record);
        if (vector::length(&fills) >= MAX_FILLS) {
            return false
        };

        let auction_state = types::get_auction(&record);
        if (types::is_auction_none(&auction_state)) {
            return true
        };

        auction::can_solver_fill(registry_addr, intent_id, solver)
    }

    #[view]
    public fun max_fills(): u64 { MAX_FILLS }

    #[view]
    public fun calculate_min_output_for_fill(
        registry_addr: address,
        intent_id: u64,
        fill_input: u64
    ): u64 {
        let record = submission::borrow_intent(registry_addr, intent_id);
        let intent = types::get_intent_ref(&record);

        if (types::is_swap(intent)) {
            let min_out = types::get_swap_min_output(intent);
            let total_in = types::get_swap_amount_in(intent);
            math::safe_mul_div(min_out, fill_input, total_in)
        } else if (types::is_limit_order(intent)) {
            let price = types::get_limit_price(intent);
            math::safe_mul_div(fill_input, price, math::bps_denominator())
        } else {
            0
        }
    }
}
