/// Settlement Module for Velox
/// Handles solution selection and trade execution (MVP: self-solving)
/// Collects protocol fees from input tokens (maker amount)
module velox::settlement {
    use std::signer;
    use std::vector;
    use aptos_framework::timestamp;
    use aptos_framework::event;
    use aptos_framework::primary_fungible_store;
    use aptos_framework::fungible_asset::Metadata;
    use aptos_framework::object;
    use std::option;
    use velox::types;
    use velox::submission;
    use velox::errors;
    use velox::scheduled;
    use velox::auction;
    use velox::router;

    // ============ Constants ============

    /// Protocol fee in basis points (0.03% = 3 bps)
    const PROTOCOL_FEE_BPS: u64 = 3;
    /// Solver fee in basis points (0.05% = 5 bps) - informational, not collected
    const SOLVER_FEE_BPS: u64 = 5;
    /// Basis points denominator
    const BPS_DENOMINATOR: u64 = 10000;

    // ============ Resources ============

    /// Fee collector configuration - stores treasury address
    struct FeeCollector has key {
        /// Address that receives protocol fees
        treasury: address,
        /// Admin who can update treasury
        admin: address,
        /// Total fees collected (tracking only, actual tokens in treasury)
        total_collected: u64
    }

    // ============ Events ============

    #[event]
    struct FeeCollectorInitialized has drop, store {
        treasury: address,
        admin: address
    }

    #[event]
    struct TreasuryUpdated has drop, store {
        old_treasury: address,
        new_treasury: address
    }

    #[event]
    struct ProtocolFeeCollected has drop, store {
        intent_id: u64,
        token: address,
        amount: u64,
        treasury: address
    }

    #[event]
    struct IntentFilled has drop, store {
        intent_id: u64,
        user: address,
        solver: address,
        input_amount: u64,
        output_amount: u64,
        execution_price: u64,
        protocol_fee: u64,
        solver_fee: u64,
        filled_at: u64
    }

    #[event]
    struct PartialFill has drop, store {
        intent_id: u64,
        user: address,
        solver: address,
        fill_amount: u64,
        output_amount: u64,
        remaining_amount: u64,
        filled_at: u64
    }

    #[event]
    struct TWAPChunkFilled has drop, store {
        intent_id: u64,
        user: address,
        solver: address,
        chunk_number: u64,
        total_chunks: u64,
        chunk_input: u64,
        chunk_output: u64,
        filled_at: u64
    }

    #[event]
    struct DCAPeriodFilled has drop, store {
        intent_id: u64,
        user: address,
        solver: address,
        period_number: u64,
        total_periods: u64,
        period_input: u64,
        period_output: u64,
        filled_at: u64
    }

    #[event]
    struct RoutedSettlement has drop, store {
        intent_id: u64,
        user: address,
        solver: address,
        route_hops: u64,
        total_input: u64,
        total_output: u64,
        price_impact_bps: u64,
        settled_at: u64
    }

    #[event]
    struct DutchAuctionSettled has drop, store {
        intent_id: u64,
        user: address,
        solver: address,
        final_price: u64,
        input_amount: u64,
        settled_at: u64
    }

    // ============ Initialization ============

    /// Initialize the fee collector with treasury address
    public entry fun initialize_fee_collector(
        admin: &signer,
        treasury: address
    ) {
        let admin_addr = signer::address_of(admin);

        assert!(!exists<FeeCollector>(admin_addr), errors::already_initialized());

        move_to(admin, FeeCollector {
            treasury,
            admin: admin_addr,
            total_collected: 0
        });

        event::emit(FeeCollectorInitialized {
            treasury,
            admin: admin_addr
        });
    }

    /// Update treasury address (admin only)
    public entry fun update_treasury(
        admin: &signer,
        fee_collector_addr: address,
        new_treasury: address
    ) acquires FeeCollector {
        let admin_addr = signer::address_of(admin);
        let fee_collector = borrow_global_mut<FeeCollector>(fee_collector_addr);

        assert!(fee_collector.admin == admin_addr, errors::unauthorized());

        let old_treasury = fee_collector.treasury;
        fee_collector.treasury = new_treasury;

        event::emit(TreasuryUpdated {
            old_treasury,
            new_treasury
        });
    }

    // ============ Entry Functions ============

    /// Solve a swap intent by providing the output amount
    /// Protocol fee is collected from input tokens (maker amount)
    public entry fun solve_swap(
        solver: &signer,
        registry_addr: address,
        fee_collector_addr: address,
        intent_id: u64,
        output_amount: u64
    ) acquires FeeCollector {
        let solver_addr = signer::address_of(solver);
        let record = submission::get_intent_record(registry_addr, intent_id);

        // Validate intent is pending
        let status = types::get_intent_status(&record);
        assert!(
            types::is_pending(status) || types::is_partially_filled(status),
            errors::intent_not_pending()
        );

        // Check deadline not passed
        let intent = types::get_intent(&record);
        let deadline = types::get_deadline(intent);
        let now = timestamp::now_seconds();
        assert!(now <= deadline, errors::deadline_passed());

        // Verify this is a swap intent
        assert!(types::is_swap(intent), errors::solution_invalid());

        // Verify output meets minimum (user gets full output, no fee deduction)
        let min_amount_out = types::get_min_amount_out(intent);
        assert!(output_amount >= min_amount_out, errors::min_amount_not_met());

        // Get intent details
        let user = types::get_intent_user(&record);
        let input_amount = types::get_escrowed_amount(&record);
        let input_token = types::get_input_token(intent);
        let output_token = types::get_output_token(intent);

        // Calculate protocol fee from input amount
        let protocol_fee = calculate_fee(input_amount, PROTOCOL_FEE_BPS);
        let solver_receives = input_amount - protocol_fee;

        // Transfer output tokens from solver to user (full amount)
        let output_token_obj = object::address_to_object<Metadata>(output_token);
        primary_fungible_store::transfer(solver, output_token_obj, user, output_amount);

        // Collect protocol fee - transfer to treasury
        if (protocol_fee > 0) {
            collect_protocol_fee(
                registry_addr,
                fee_collector_addr,
                input_token,
                protocol_fee,
                intent_id
            );
        };

        // Transfer remaining input tokens from escrow to solver
        submission::transfer_from_escrow(registry_addr, input_token, solver_addr, solver_receives);

        // Calculate execution price (basis points: output per input * 10000)
        let execution_price = if (input_amount > 0) {
            (output_amount * BPS_DENOMINATOR) / input_amount
        } else {
            0
        };

        // Update intent status to filled
        submission::update_intent_status(
            registry_addr,
            intent_id,
            input_amount,
            solver_addr,
            execution_price
        );

        // Emit event
        event::emit(IntentFilled {
            intent_id,
            user,
            solver: solver_addr,
            input_amount,
            output_amount,
            execution_price,
            protocol_fee,
            solver_fee: 0, // Solver fee is now implicit (solver's profit margin)
            filled_at: now
        });
    }

    /// Solve a limit order intent (supports partial fills)
    public entry fun solve_limit_order(
        solver: &signer,
        registry_addr: address,
        fee_collector_addr: address,
        intent_id: u64,
        fill_amount: u64,
        output_amount: u64
    ) acquires FeeCollector {
        let solver_addr = signer::address_of(solver);
        let record = submission::get_intent_record(registry_addr, intent_id);

        // Validate intent status
        let status = types::get_intent_status(&record);
        assert!(
            types::is_pending(status) || types::is_partially_filled(status),
            errors::intent_not_pending()
        );

        // Check expiry not passed
        let intent = types::get_intent(&record);
        let expiry = types::get_deadline(intent);
        let now = timestamp::now_seconds();
        assert!(now <= expiry, errors::deadline_passed());

        // Verify this is a limit order
        assert!(types::is_limit_order(intent), errors::solution_invalid());

        // Get intent details
        let user = types::get_intent_user(&record);
        let total_amount_in = types::get_amount_in(intent);
        let already_filled = types::get_filled_amount(&record);
        let remaining = total_amount_in - already_filled;
        let input_token = types::get_input_token(intent);
        let output_token = types::get_output_token(intent);
        let limit_price = types::get_limit_price(intent);
        let partial_fill_allowed = types::is_partial_fill_allowed(intent);

        // Validate fill amount
        assert!(fill_amount > 0, errors::zero_amount());
        assert!(fill_amount <= remaining, errors::insufficient_input_amount());

        // If partial fill not allowed, must fill entire remaining amount
        if (!partial_fill_allowed) {
            assert!(fill_amount == remaining, errors::solution_invalid());
        };

        // Verify price meets limit (output/input * BPS >= limit_price)
        let execution_price = (output_amount * BPS_DENOMINATOR) / fill_amount;
        assert!(execution_price >= limit_price, errors::min_amount_not_met());

        // Calculate protocol fee from fill amount
        let protocol_fee = calculate_fee(fill_amount, PROTOCOL_FEE_BPS);
        let solver_receives = fill_amount - protocol_fee;

        // Transfer output tokens from solver to user (full amount)
        let output_token_obj = object::address_to_object<Metadata>(output_token);
        primary_fungible_store::transfer(solver, output_token_obj, user, output_amount);

        // Collect protocol fee
        if (protocol_fee > 0) {
            collect_protocol_fee(
                registry_addr,
                fee_collector_addr,
                input_token,
                protocol_fee,
                intent_id
            );
        };

        // Transfer remaining input tokens from escrow to solver
        submission::transfer_from_escrow(registry_addr, input_token, solver_addr, solver_receives);

        let new_filled_amount = already_filled + fill_amount;
        let is_fully_filled = new_filled_amount == total_amount_in;

        if (is_fully_filled) {
            // Fully filled - update to Filled status
            submission::update_intent_status(
                registry_addr,
                intent_id,
                new_filled_amount,
                solver_addr,
                execution_price
            );

            event::emit(IntentFilled {
                intent_id,
                user,
                solver: solver_addr,
                input_amount: total_amount_in,
                output_amount,
                execution_price,
                protocol_fee,
                solver_fee: 0,
                filled_at: now
            });
        } else {
            // Partial fill - emit partial fill event
            event::emit(PartialFill {
                intent_id,
                user,
                solver: solver_addr,
                fill_amount,
                output_amount,
                remaining_amount: remaining - fill_amount,
                filled_at: now
            });
        }
    }

    /// Solve a TWAP chunk
    public entry fun solve_twap_chunk(
        solver: &signer,
        registry_addr: address,
        fee_collector_addr: address,
        scheduled_registry_addr: address,
        intent_id: u64,
        output_amount: u64
    ) acquires FeeCollector {
        let solver_addr = signer::address_of(solver);
        let record = submission::get_intent_record(registry_addr, intent_id);

        // Validate intent status
        let status = types::get_intent_status(&record);
        assert!(
            types::is_pending(status) || types::is_partially_filled(status),
            errors::intent_not_pending()
        );

        // Verify this is a TWAP intent
        let intent = types::get_intent(&record);
        assert!(types::is_twap(intent), errors::solution_invalid());

        // Check if chunk is ready for execution
        assert!(scheduled::is_ready_for_execution(scheduled_registry_addr, intent_id), errors::chunk_not_ready());

        // Check not completed
        assert!(!scheduled::is_completed(scheduled_registry_addr, intent_id), errors::twap_completed());

        // Get TWAP details
        let user = types::get_intent_user(&record);
        let input_token = types::get_input_token(intent);
        let output_token = types::get_output_token(intent);
        let chunk_amount = types::get_twap_chunk_amount(intent);
        let max_slippage_bps = types::get_twap_max_slippage_bps(intent);
        let interval_seconds = types::get_twap_interval(intent);
        let num_chunks = types::get_twap_num_chunks(intent);
        let chunks_executed = scheduled::get_chunks_executed(scheduled_registry_addr, intent_id);

        // Verify output meets slippage requirements
        let min_output = chunk_amount - ((chunk_amount * max_slippage_bps) / BPS_DENOMINATOR);
        assert!(output_amount >= min_output, errors::min_amount_not_met());

        // Calculate protocol fee from chunk amount
        let protocol_fee = calculate_fee(chunk_amount, PROTOCOL_FEE_BPS);
        let solver_receives = chunk_amount - protocol_fee;

        // Transfer output tokens from solver to user (full amount)
        let output_token_obj = object::address_to_object<Metadata>(output_token);
        primary_fungible_store::transfer(solver, output_token_obj, user, output_amount);

        // Collect protocol fee
        if (protocol_fee > 0) {
            collect_protocol_fee(
                registry_addr,
                fee_collector_addr,
                input_token,
                protocol_fee,
                intent_id
            );
        };

        // Transfer remaining chunk input from escrow to solver
        submission::transfer_from_escrow(registry_addr, input_token, solver_addr, solver_receives);

        // Update scheduled registry
        scheduled::update_after_execution(scheduled_registry_addr, intent_id, interval_seconds);

        let now = timestamp::now_seconds();

        // Emit chunk fill event
        event::emit(TWAPChunkFilled {
            intent_id,
            user,
            solver: solver_addr,
            chunk_number: chunks_executed + 1,
            total_chunks: num_chunks,
            chunk_input: chunk_amount,
            chunk_output: output_amount,
            filled_at: now
        });
    }

    /// Solve a DCA period
    public entry fun solve_dca_period(
        solver: &signer,
        registry_addr: address,
        fee_collector_addr: address,
        scheduled_registry_addr: address,
        intent_id: u64,
        output_amount: u64
    ) acquires FeeCollector {
        let solver_addr = signer::address_of(solver);
        let record = submission::get_intent_record(registry_addr, intent_id);

        // Validate intent status
        let status = types::get_intent_status(&record);
        assert!(
            types::is_pending(status) || types::is_partially_filled(status),
            errors::intent_not_pending()
        );

        // Verify this is a DCA intent
        let intent = types::get_intent(&record);
        assert!(types::is_dca(intent), errors::solution_invalid());

        // Check if period is ready for execution
        assert!(scheduled::is_ready_for_execution(scheduled_registry_addr, intent_id), errors::period_not_ready());

        // Check not completed
        assert!(!scheduled::is_completed(scheduled_registry_addr, intent_id), errors::dca_completed());

        // Get DCA details
        let user = types::get_intent_user(&record);
        let input_token = types::get_input_token(intent);
        let output_token = types::get_output_token(intent);
        let amount_per_period = types::get_dca_amount_per_period(intent);
        let interval_seconds = types::get_dca_interval(intent);
        let total_periods = types::get_dca_total_periods(intent);
        let periods_executed = scheduled::get_chunks_executed(scheduled_registry_addr, intent_id);

        // Calculate protocol fee from period amount
        let protocol_fee = calculate_fee(amount_per_period, PROTOCOL_FEE_BPS);
        let solver_receives = amount_per_period - protocol_fee;

        // Transfer output tokens from solver to user (full amount)
        let output_token_obj = object::address_to_object<Metadata>(output_token);
        primary_fungible_store::transfer(solver, output_token_obj, user, output_amount);

        // Collect protocol fee
        if (protocol_fee > 0) {
            collect_protocol_fee(
                registry_addr,
                fee_collector_addr,
                input_token,
                protocol_fee,
                intent_id
            );
        };

        // Transfer remaining period input from escrow to solver
        submission::transfer_from_escrow(registry_addr, input_token, solver_addr, solver_receives);

        // Update scheduled registry
        scheduled::update_after_execution(scheduled_registry_addr, intent_id, interval_seconds);

        let now = timestamp::now_seconds();

        // Emit period fill event
        event::emit(DCAPeriodFilled {
            intent_id,
            user,
            solver: solver_addr,
            period_number: periods_executed + 1,
            total_periods,
            period_input: amount_per_period,
            period_output: output_amount,
            filled_at: now
        });
    }

    /// Settle an intent from auction winner
    /// Only the winning solver can call this after auction completes
    public entry fun settle_from_auction(
        solver: &signer,
        registry_addr: address,
        fee_collector_addr: address,
        auction_state_addr: address,
        intent_id: u64
    ) acquires FeeCollector {
        let solver_addr = signer::address_of(solver);

        // Verify solver is the auction winner
        assert!(
            auction::is_winner(auction_state_addr, intent_id, solver_addr),
            errors::solver_not_winner()
        );

        // Get the winning solution
        let winning_solution_opt = auction::get_winning_solution(auction_state_addr, intent_id);
        assert!(option::is_some(&winning_solution_opt), errors::solution_not_found());
        let winning_solution = option::extract(&mut winning_solution_opt);

        let output_amount = types::get_solution_output_amount(&winning_solution);

        // Get intent record
        let record = submission::get_intent_record(registry_addr, intent_id);

        // Validate intent is pending
        let status = types::get_intent_status(&record);
        assert!(
            types::is_pending(status) || types::is_partially_filled(status),
            errors::intent_not_pending()
        );

        // Check deadline not passed
        let intent = types::get_intent(&record);
        let deadline = types::get_deadline(intent);
        let now = timestamp::now_seconds();
        assert!(now <= deadline, errors::deadline_passed());

        // Verify this is a swap intent
        assert!(types::is_swap(intent), errors::solution_invalid());

        // Verify output meets minimum
        let min_amount_out = types::get_min_amount_out(intent);
        assert!(output_amount >= min_amount_out, errors::min_amount_not_met());

        // Get intent details
        let user = types::get_intent_user(&record);
        let input_amount = types::get_escrowed_amount(&record);
        let input_token = types::get_input_token(intent);
        let output_token = types::get_output_token(intent);

        // Calculate protocol fee from input amount
        let protocol_fee = calculate_fee(input_amount, PROTOCOL_FEE_BPS);
        let solver_receives = input_amount - protocol_fee;

        // Transfer output tokens from solver to user (full amount)
        let output_token_obj = object::address_to_object<Metadata>(output_token);
        primary_fungible_store::transfer(solver, output_token_obj, user, output_amount);

        // Collect protocol fee
        if (protocol_fee > 0) {
            collect_protocol_fee(
                registry_addr,
                fee_collector_addr,
                input_token,
                protocol_fee,
                intent_id
            );
        };

        // Transfer remaining input tokens from escrow to solver
        submission::transfer_from_escrow(registry_addr, input_token, solver_addr, solver_receives);

        // Calculate execution price (basis points: output per input * 10000)
        let execution_price = if (input_amount > 0) {
            (output_amount * BPS_DENOMINATOR) / input_amount
        } else {
            0
        };

        // Update intent status to filled
        submission::update_intent_status(
            registry_addr,
            intent_id,
            input_amount,
            solver_addr,
            execution_price
        );

        // Emit event
        event::emit(IntentFilled {
            intent_id,
            user,
            solver: solver_addr,
            input_amount,
            output_amount,
            execution_price,
            protocol_fee,
            solver_fee: 0,
            filled_at: now
        });
    }

    /// Solve a swap intent using a pre-computed route
    /// Solver provides output tokens and receives input from escrow
    public entry fun solve_with_routing(
        solver: &signer,
        registry_addr: address,
        fee_collector_addr: address,
        router_addr: address,
        intent_id: u64,
        route_input: u64,
        route_output: u64,
        route_price_impact_bps: u64
    ) acquires FeeCollector {
        let solver_addr = signer::address_of(solver);
        let record = submission::get_intent_record(registry_addr, intent_id);

        // Validate intent is pending
        let status = types::get_intent_status(&record);
        assert!(
            types::is_pending(status) || types::is_partially_filled(status),
            errors::intent_not_pending()
        );

        // Check deadline not passed
        let intent = types::get_intent(&record);
        let deadline = types::get_deadline(intent);
        let now = timestamp::now_seconds();
        assert!(now <= deadline, errors::deadline_passed());

        // Verify this is a swap intent
        assert!(types::is_swap(intent), errors::solution_invalid());

        // Validate price impact not too high
        assert!(route_price_impact_bps <= router::get_max_price_impact_bps(), errors::price_impact_too_high());

        // Verify output meets minimum
        let min_amount_out = types::get_min_amount_out(intent);
        assert!(route_output >= min_amount_out, errors::min_amount_not_met());

        // Get intent details
        let user = types::get_intent_user(&record);
        let input_amount = types::get_escrowed_amount(&record);
        let input_token = types::get_input_token(intent);
        let output_token = types::get_output_token(intent);

        // Verify route input matches escrowed amount
        assert!(route_input == input_amount, errors::insufficient_input_amount());

        // Calculate protocol fee from input amount
        let protocol_fee = calculate_fee(input_amount, PROTOCOL_FEE_BPS);
        let solver_receives = input_amount - protocol_fee;

        // Transfer output tokens from solver to user (full amount)
        let output_token_obj = object::address_to_object<Metadata>(output_token);
        primary_fungible_store::transfer(solver, output_token_obj, user, route_output);

        // Collect protocol fee
        if (protocol_fee > 0) {
            collect_protocol_fee(
                registry_addr,
                fee_collector_addr,
                input_token,
                protocol_fee,
                intent_id
            );
        };

        // Transfer remaining input tokens from escrow to solver
        submission::transfer_from_escrow(registry_addr, input_token, solver_addr, solver_receives);

        // Calculate execution price
        let execution_price = if (input_amount > 0) {
            (route_output * BPS_DENOMINATOR) / input_amount
        } else {
            0
        };

        // Update intent status to filled
        submission::update_intent_status(
            registry_addr,
            intent_id,
            input_amount,
            solver_addr,
            execution_price
        );

        // Emit routed settlement event
        event::emit(RoutedSettlement {
            intent_id,
            user,
            solver: solver_addr,
            route_hops: 1, // Simplified; in production would track actual hops
            total_input: input_amount,
            total_output: route_output,
            price_impact_bps: route_price_impact_bps,
            settled_at: now
        });

        // Emit route executed event via router
        let steps = vector::empty();
        let route = router::new_route(steps, route_input, route_output, route_price_impact_bps);
        router::emit_route_executed(intent_id, &route, route_output);

        // Suppress unused variable warning
        let _ = router_addr;
    }

    /// Settle a Dutch auction (winner only can call this)
    /// Winner provides accepted_price amount of output tokens
    public entry fun settle_dutch_auction(
        solver: &signer,
        registry_addr: address,
        fee_collector_addr: address,
        auction_state_addr: address,
        intent_id: u64
    ) acquires FeeCollector {
        let solver_addr = signer::address_of(solver);

        // Verify solver is the Dutch auction winner
        assert!(
            auction::is_dutch_winner(auction_state_addr, intent_id, solver_addr),
            errors::not_dutch_winner()
        );

        // Get the accepted price from the auction
        let accepted_price = auction::get_dutch_accepted_price(auction_state_addr, intent_id);

        // Get intent record
        let record = submission::get_intent_record(registry_addr, intent_id);

        // Validate intent is pending
        let status = types::get_intent_status(&record);
        assert!(
            types::is_pending(status) || types::is_partially_filled(status),
            errors::intent_not_pending()
        );

        // Check deadline not passed
        let intent = types::get_intent(&record);
        let deadline = types::get_deadline(intent);
        let now = timestamp::now_seconds();
        assert!(now <= deadline, errors::deadline_passed());

        // Verify this is a swap intent
        assert!(types::is_swap(intent), errors::solution_invalid());

        // Verify output meets minimum
        let min_amount_out = types::get_min_amount_out(intent);
        assert!(accepted_price >= min_amount_out, errors::min_amount_not_met());

        // Get intent details
        let user = types::get_intent_user(&record);
        let input_amount = types::get_escrowed_amount(&record);
        let input_token = types::get_input_token(intent);
        let output_token = types::get_output_token(intent);

        // Calculate protocol fee from input amount
        let protocol_fee = calculate_fee(input_amount, PROTOCOL_FEE_BPS);
        let solver_receives = input_amount - protocol_fee;

        // Transfer output tokens from solver to user (full amount)
        let output_token_obj = object::address_to_object<Metadata>(output_token);
        primary_fungible_store::transfer(solver, output_token_obj, user, accepted_price);

        // Collect protocol fee
        if (protocol_fee > 0) {
            collect_protocol_fee(
                registry_addr,
                fee_collector_addr,
                input_token,
                protocol_fee,
                intent_id
            );
        };

        // Transfer remaining input tokens from escrow to solver
        submission::transfer_from_escrow(registry_addr, input_token, solver_addr, solver_receives);

        // Calculate execution price (basis points: output per input * 10000)
        let execution_price = if (input_amount > 0) {
            (accepted_price * BPS_DENOMINATOR) / input_amount
        } else {
            0
        };

        // Update intent status to filled
        submission::update_intent_status(
            registry_addr,
            intent_id,
            input_amount,
            solver_addr,
            execution_price
        );

        // Emit event
        event::emit(DutchAuctionSettled {
            intent_id,
            user,
            solver: solver_addr,
            final_price: accepted_price,
            input_amount,
            settled_at: now
        });
    }

    // ============ Internal Functions ============

    /// Collect protocol fee and transfer to treasury
    fun collect_protocol_fee(
        registry_addr: address,
        fee_collector_addr: address,
        token: address,
        amount: u64,
        intent_id: u64
    ) acquires FeeCollector {
        let fee_collector = borrow_global_mut<FeeCollector>(fee_collector_addr);
        let treasury = fee_collector.treasury;

        // Transfer fee from escrow to treasury
        submission::transfer_from_escrow(registry_addr, token, treasury, amount);

        // Update total collected (for tracking)
        fee_collector.total_collected = fee_collector.total_collected + amount;

        // Emit fee collection event
        event::emit(ProtocolFeeCollected {
            intent_id,
            token,
            amount,
            treasury
        });
    }

    /// Calculate fee amount given gross amount and fee in basis points
    fun calculate_fee(gross_amount: u64, fee_bps: u64): u64 {
        (gross_amount * fee_bps) / BPS_DENOMINATOR
    }

    // ============ View Functions ============

    #[view]
    /// Get protocol fee in basis points
    public fun get_protocol_fee_bps(): u64 {
        PROTOCOL_FEE_BPS
    }

    #[view]
    /// Get solver fee in basis points (informational)
    public fun get_solver_fee_bps(): u64 {
        SOLVER_FEE_BPS
    }

    #[view]
    /// Get fee collector treasury address
    public fun get_treasury(fee_collector_addr: address): address acquires FeeCollector {
        borrow_global<FeeCollector>(fee_collector_addr).treasury
    }

    #[view]
    /// Get total fees collected
    public fun get_total_collected(fee_collector_addr: address): u64 acquires FeeCollector {
        borrow_global<FeeCollector>(fee_collector_addr).total_collected
    }

    #[view]
    /// Check if fee collector is initialized
    public fun is_fee_collector_initialized(addr: address): bool {
        exists<FeeCollector>(addr)
    }

    #[view]
    /// Calculate protocol fee for a given input amount
    public fun calculate_protocol_fee(input_amount: u64): u64 {
        calculate_fee(input_amount, PROTOCOL_FEE_BPS)
    }

    #[view]
    /// Check if an intent can be filled with the given output amount
    public fun can_fill(registry_addr: address, intent_id: u64, output_amount: u64): bool {
        // Check intent exists
        if (!submission::intent_exists(registry_addr, intent_id)) {
            return false
        };

        let record = submission::get_intent_record(registry_addr, intent_id);

        // Check status is pending or partially filled
        let status = types::get_intent_status(&record);
        if (!types::is_pending(status) && !types::is_partially_filled(status)) {
            return false
        };

        // Check deadline not passed
        let intent = types::get_intent(&record);
        let deadline = types::get_deadline(intent);
        if (timestamp::now_seconds() > deadline) {
            return false
        };

        // Check output meets minimum for swaps (no fee deduction now)
        if (types::is_swap(intent)) {
            let min_amount_out = types::get_min_amount_out(intent);
            if (output_amount < min_amount_out) {
                return false
            };
        };

        // Check price for limit orders
        if (types::is_limit_order(intent)) {
            let amount_in = types::get_amount_in(intent);
            let already_filled = types::get_filled_amount(&record);
            let remaining = amount_in - already_filled;
            if (remaining == 0) {
                return false
            };
            let limit_price = types::get_limit_price(intent);
            let execution_price = (output_amount * BPS_DENOMINATOR) / remaining;
            if (execution_price < limit_price) {
                return false
            };
        };

        true
    }
}
