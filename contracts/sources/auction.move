/// Auction Module for Velox
/// Multi-solver competitive auction system for intent fulfillment
module velox::auction {
    use std::signer;
    use std::vector;
    use std::option::{Self, Option};
    use aptos_std::smart_table::{Self, SmartTable};
    use aptos_framework::timestamp;
    use aptos_framework::event;
    use velox::types::{Self, Solution};
    use velox::errors;
    use velox::solver_registry;

    // ============ Constants ============

    const DEFAULT_AUCTION_DURATION: u64 = 30;
    const MIN_SOLUTIONS_FOR_EARLY_CLOSE: u64 = 3;
    const OUTPUT_WEIGHT: u64 = 90;
    const REPUTATION_WEIGHT: u64 = 10;
    const MAX_REPUTATION: u64 = 10000;

    // ============ Storage ============

    struct AuctionConfig has key {
        default_duration: u64,
        min_solutions: u64,
        admin: address
    }

    enum AuctionStatus has store, drop, copy {
        Active,
        Selecting,
        Completed,
        Cancelled
    }

    struct Auction has store, drop, copy {
        intent_id: u64,
        start_time: u64,
        end_time: u64,
        solutions: vector<Solution>,
        winner: Option<address>,
        status: AuctionStatus
    }

    /// Dutch auction: price starts high and decreases over time
    struct DutchAuction has store, drop, copy {
        intent_id: u64,
        start_time: u64,
        start_price: u64,
        end_price: u64,
        duration: u64,
        winner: Option<address>,
        accepted_price: u64,
        is_active: bool
    }

    struct AuctionState has key {
        auctions: SmartTable<u64, Auction>,
        dutch_auctions: SmartTable<u64, DutchAuction>,
        active_count: u64,
        dutch_auction_count: u64,
        active_dutch_count: u64
    }

    // ============ Events ============

    #[event]
    struct AuctionStarted has drop, store {
        intent_id: u64,
        start_time: u64,
        end_time: u64
    }

    #[event]
    struct SolutionSubmitted has drop, store {
        intent_id: u64,
        solver: address,
        output_amount: u64,
        rank: u64
    }

    #[event]
    struct AuctionCompleted has drop, store {
        intent_id: u64,
        winner: address,
        winning_output: u64,
        total_solutions: u64
    }

    #[event]
    struct AuctionCancelled has drop, store {
        intent_id: u64,
        cancelled_at: u64
    }

    #[event]
    struct DutchAuctionCreated has drop, store {
        intent_id: u64,
        start_price: u64,
        end_price: u64,
        duration: u64,
        start_time: u64
    }

    #[event]
    struct DutchAuctionAccepted has drop, store {
        intent_id: u64,
        solver: address,
        accepted_price: u64,
        timestamp: u64
    }

    // ============ Initialize ============

    public entry fun initialize(admin: &signer, default_duration: u64) {
        let admin_addr = signer::address_of(admin);
        assert!(!exists<AuctionConfig>(admin_addr), errors::intent_already_exists());

        move_to(admin, AuctionConfig {
            default_duration: if (default_duration == 0) { DEFAULT_AUCTION_DURATION } else { default_duration },
            min_solutions: MIN_SOLUTIONS_FOR_EARLY_CLOSE,
            admin: admin_addr
        });

        move_to(admin, AuctionState {
            auctions: smart_table::new(),
            dutch_auctions: smart_table::new(),
            active_count: 0,
            dutch_auction_count: 0,
            active_dutch_count: 0
        });
    }

    // ============ Entry Functions ============

    public entry fun start_auction(
        auction_state_addr: address,
        intent_id: u64,
        duration: u64
    ) acquires AuctionState, AuctionConfig {
        let state = borrow_global_mut<AuctionState>(auction_state_addr);
        assert!(!smart_table::contains(&state.auctions, intent_id), errors::auction_in_progress());

        let config = borrow_global<AuctionConfig>(auction_state_addr);
        let actual_duration = if (duration == 0) { config.default_duration } else { duration };

        let now = timestamp::now_seconds();
        let auction = Auction {
            intent_id,
            start_time: now,
            end_time: now + actual_duration,
            solutions: vector::empty(),
            winner: option::none(),
            status: AuctionStatus::Active
        };

        smart_table::add(&mut state.auctions, intent_id, auction);
        state.active_count = state.active_count + 1;

        event::emit(AuctionStarted {
            intent_id,
            start_time: now,
            end_time: now + actual_duration
        });
    }

    public entry fun submit_solution(
        solver: &signer,
        auction_state_addr: address,
        solver_registry_addr: address,
        intent_id: u64,
        output_amount: u64,
        execution_price: u64
    ) acquires AuctionState, AuctionConfig {
        let solver_addr = signer::address_of(solver);
        let state = borrow_global_mut<AuctionState>(auction_state_addr);

        assert!(smart_table::contains(&state.auctions, intent_id), errors::auction_not_started());

        let auction = smart_table::borrow_mut(&mut state.auctions, intent_id);
        assert!(is_status_active(&auction.status), errors::auction_ended());

        let now = timestamp::now_seconds();
        assert!(now <= auction.end_time, errors::auction_ended());

        assert!(!has_solver_submitted(&auction.solutions, solver_addr), errors::solution_already_submitted());

        let solution = types::new_solution(
            intent_id,
            solver_addr,
            output_amount,
            execution_price,
            auction.end_time
        );

        vector::push_back(&mut auction.solutions, solution);

        let reputation = get_solver_reputation(solver_registry_addr, solver_addr);
        let score = calculate_solution_score(output_amount, reputation);
        let rank = get_solution_rank(&auction.solutions, score);

        event::emit(SolutionSubmitted {
            intent_id,
            solver: solver_addr,
            output_amount,
            rank
        });

        let config = borrow_global<AuctionConfig>(auction_state_addr);
        if (vector::length(&auction.solutions) >= config.min_solutions) {
            auction.status = AuctionStatus::Selecting;
        };
    }

    public entry fun close_auction(
        auction_state_addr: address,
        solver_registry_addr: address,
        intent_id: u64
    ) acquires AuctionState {
        let state = borrow_global_mut<AuctionState>(auction_state_addr);
        assert!(smart_table::contains(&state.auctions, intent_id), errors::auction_not_started());

        let auction = smart_table::borrow_mut(&mut state.auctions, intent_id);
        assert!(!is_status_completed(&auction.status), errors::auction_ended());

        let now = timestamp::now_seconds();
        let is_timed_out = now > auction.end_time;
        let is_selecting = is_status_selecting(&auction.status);
        assert!(is_timed_out || is_selecting, errors::too_early());

        let solution_count = vector::length(&auction.solutions);
        if (solution_count == 0) {
            auction.status = AuctionStatus::Cancelled;
            state.active_count = state.active_count - 1;
            event::emit(AuctionCancelled { intent_id, cancelled_at: now });
            return
        };

        let (best_solution, _best_score) = find_best_solution(&auction.solutions, solver_registry_addr);
        let winner_addr = types::get_solution_solver(&best_solution);
        let winning_output = types::get_solution_output_amount(&best_solution);

        auction.winner = option::some(winner_addr);
        auction.status = AuctionStatus::Completed;
        state.active_count = state.active_count - 1;

        event::emit(AuctionCompleted {
            intent_id,
            winner: winner_addr,
            winning_output,
            total_solutions: solution_count
        });
    }

    public entry fun cancel_auction(
        admin: &signer,
        auction_state_addr: address,
        intent_id: u64
    ) acquires AuctionState, AuctionConfig {
        let admin_addr = signer::address_of(admin);
        let config = borrow_global<AuctionConfig>(auction_state_addr);
        assert!(admin_addr == config.admin, errors::not_admin());

        let state = borrow_global_mut<AuctionState>(auction_state_addr);
        assert!(smart_table::contains(&state.auctions, intent_id), errors::auction_not_started());

        let auction = smart_table::borrow_mut(&mut state.auctions, intent_id);
        assert!(is_status_active(&auction.status), errors::auction_ended());

        auction.status = AuctionStatus::Cancelled;
        state.active_count = state.active_count - 1;

        event::emit(AuctionCancelled {
            intent_id,
            cancelled_at: timestamp::now_seconds()
        });
    }

    // ============ Dutch Auction Entry Functions ============

    /// Create a new Dutch auction for an intent
    public fun create_dutch_auction(
        auction_state_addr: address,
        intent_id: u64,
        start_price: u64,
        end_price: u64,
        duration: u64
    ) acquires AuctionState {
        // Validate params
        assert!(start_price >= end_price, errors::invalid_dutch_params());
        assert!(duration > 0, errors::invalid_dutch_params());

        let state = borrow_global_mut<AuctionState>(auction_state_addr);
        let now = timestamp::now_seconds();

        let dutch = DutchAuction {
            intent_id,
            start_time: now,
            start_price,
            end_price,
            duration,
            winner: option::none(),
            accepted_price: 0,
            is_active: true
        };

        smart_table::add(&mut state.dutch_auctions, intent_id, dutch);
        state.dutch_auction_count = state.dutch_auction_count + 1;
        state.active_dutch_count = state.active_dutch_count + 1;

        event::emit(DutchAuctionCreated {
            intent_id,
            start_price,
            end_price,
            duration,
            start_time: now
        });
    }

    /// Accept a Dutch auction at the current price
    public entry fun accept_dutch_auction(
        solver: &signer,
        auction_state_addr: address,
        solver_registry_addr: address,
        intent_id: u64
    ) acquires AuctionState {
        let solver_addr = signer::address_of(solver);

        // Verify solver is registered and active
        assert!(
            solver_registry::is_registered(solver_registry_addr, solver_addr),
            errors::solver_not_registered()
        );

        let state = borrow_global_mut<AuctionState>(auction_state_addr);
        assert!(
            smart_table::contains(&state.dutch_auctions, intent_id),
            errors::dutch_auction_not_found()
        );

        let dutch = smart_table::borrow_mut(&mut state.dutch_auctions, intent_id);
        assert!(dutch.is_active, errors::dutch_auction_inactive());

        // Check not expired
        let now = timestamp::now_seconds();
        let deadline = dutch.start_time + dutch.duration;
        assert!(now <= deadline, errors::dutch_auction_expired());

        // Calculate current price
        let elapsed = now - dutch.start_time;
        let price_range = dutch.start_price - dutch.end_price;
        let decay = (price_range * elapsed) / dutch.duration;
        let current_price = dutch.start_price - decay;

        // Mark winner
        dutch.winner = option::some(solver_addr);
        dutch.accepted_price = current_price;
        dutch.is_active = false;

        state.active_dutch_count = state.active_dutch_count - 1;

        event::emit(DutchAuctionAccepted {
            intent_id,
            solver: solver_addr,
            accepted_price: current_price,
            timestamp: now
        });
    }

    // ============ Internal Functions ============

    fun is_status_active(status: &AuctionStatus): bool {
        match (status) {
            AuctionStatus::Active => true,
            _ => false
        }
    }

    fun is_status_selecting(status: &AuctionStatus): bool {
        match (status) {
            AuctionStatus::Selecting => true,
            _ => false
        }
    }

    fun is_status_completed(status: &AuctionStatus): bool {
        match (status) {
            AuctionStatus::Completed => true,
            AuctionStatus::Cancelled => true,
            _ => false
        }
    }

    fun has_solver_submitted(solutions: &vector<Solution>, solver: address): bool {
        let len = vector::length(solutions);
        let i = 0;
        while (i < len) {
            let sol = vector::borrow(solutions, i);
            if (types::get_solution_solver(sol) == solver) {
                return true
            };
            i = i + 1;
        };
        false
    }

    fun get_solver_reputation(registry_addr: address, solver: address): u64 {
        if (!solver_registry::is_registered(registry_addr, solver)) {
            return 0
        };
        let (_, _, reputation_score, _, _, _, is_active) = solver_registry::get_solver_stats(registry_addr, solver);
        if (!is_active) { 0 } else { reputation_score }
    }

    public fun calculate_solution_score(output_amount: u64, solver_reputation: u64): u64 {
        let output_score = output_amount * OUTPUT_WEIGHT;
        let normalized_reputation = if (solver_reputation > MAX_REPUTATION) {
            MAX_REPUTATION
        } else {
            solver_reputation
        };
        let reputation_score = (normalized_reputation * REPUTATION_WEIGHT) / 100;
        output_score + reputation_score
    }

    fun get_solution_rank(solutions: &vector<Solution>, new_score: u64): u64 {
        let len = vector::length(solutions);
        let rank = 1u64;
        let i = 0;
        while (i < len - 1) {
            let sol = vector::borrow(solutions, i);
            let output = types::get_solution_output_amount(sol);
            let sol_score = output * OUTPUT_WEIGHT;
            if (sol_score > new_score) {
                rank = rank + 1;
            };
            i = i + 1;
        };
        rank
    }

    fun find_best_solution(solutions: &vector<Solution>, registry_addr: address): (Solution, u64) {
        let len = vector::length(solutions);
        assert!(len > 0, errors::solution_not_found());

        let best_solution = *vector::borrow(solutions, 0);
        let best_solver = types::get_solution_solver(&best_solution);
        let best_output = types::get_solution_output_amount(&best_solution);
        let best_reputation = get_solver_reputation(registry_addr, best_solver);
        let best_score = calculate_solution_score(best_output, best_reputation);

        let i = 1;
        while (i < len) {
            let sol = vector::borrow(solutions, i);
            let solver = types::get_solution_solver(sol);
            let output = types::get_solution_output_amount(sol);
            let reputation = get_solver_reputation(registry_addr, solver);
            let score = calculate_solution_score(output, reputation);

            if (score > best_score) {
                best_solution = *sol;
                best_score = score;
            };
            i = i + 1;
        };

        (best_solution, best_score)
    }

    // ============ View Functions ============

    #[view]
    public fun get_auction(auction_state_addr: address, intent_id: u64): Auction acquires AuctionState {
        let state = borrow_global<AuctionState>(auction_state_addr);
        assert!(smart_table::contains(&state.auctions, intent_id), errors::auction_not_started());
        *smart_table::borrow(&state.auctions, intent_id)
    }

    #[view]
    public fun get_solutions(auction_state_addr: address, intent_id: u64): vector<Solution> acquires AuctionState {
        let state = borrow_global<AuctionState>(auction_state_addr);
        assert!(smart_table::contains(&state.auctions, intent_id), errors::auction_not_started());
        let auction = smart_table::borrow(&state.auctions, intent_id);
        auction.solutions
    }

    #[view]
    public fun get_best_solution(
        auction_state_addr: address,
        solver_registry_addr: address,
        intent_id: u64
    ): Option<Solution> acquires AuctionState {
        let state = borrow_global<AuctionState>(auction_state_addr);
        if (!smart_table::contains(&state.auctions, intent_id)) {
            return option::none()
        };
        let auction = smart_table::borrow(&state.auctions, intent_id);
        if (vector::is_empty(&auction.solutions)) {
            return option::none()
        };
        let (best, _) = find_best_solution(&auction.solutions, solver_registry_addr);
        option::some(best)
    }

    #[view]
    public fun is_auction_active(auction_state_addr: address, intent_id: u64): bool acquires AuctionState {
        let state = borrow_global<AuctionState>(auction_state_addr);
        if (!smart_table::contains(&state.auctions, intent_id)) {
            return false
        };
        let auction = smart_table::borrow(&state.auctions, intent_id);
        is_status_active(&auction.status)
    }

    #[view]
    public fun get_time_remaining(auction_state_addr: address, intent_id: u64): u64 acquires AuctionState {
        let state = borrow_global<AuctionState>(auction_state_addr);
        if (!smart_table::contains(&state.auctions, intent_id)) {
            return 0
        };
        let auction = smart_table::borrow(&state.auctions, intent_id);
        let now = timestamp::now_seconds();
        if (now >= auction.end_time) { 0 } else { auction.end_time - now }
    }

    #[view]
    public fun get_winner(auction_state_addr: address, intent_id: u64): Option<address> acquires AuctionState {
        let state = borrow_global<AuctionState>(auction_state_addr);
        if (!smart_table::contains(&state.auctions, intent_id)) {
            return option::none()
        };
        let auction = smart_table::borrow(&state.auctions, intent_id);
        auction.winner
    }

    #[view]
    public fun get_solution_count(auction_state_addr: address, intent_id: u64): u64 acquires AuctionState {
        let state = borrow_global<AuctionState>(auction_state_addr);
        if (!smart_table::contains(&state.auctions, intent_id)) {
            return 0
        };
        let auction = smart_table::borrow(&state.auctions, intent_id);
        vector::length(&auction.solutions)
    }

    #[view]
    public fun get_active_auction_count(auction_state_addr: address): u64 acquires AuctionState {
        let state = borrow_global<AuctionState>(auction_state_addr);
        state.active_count
    }

    // ============ Dutch Auction View Functions ============

    #[view]
    /// Get current Dutch auction price (decreases over time)
    public fun get_dutch_price(
        auction_state_addr: address,
        intent_id: u64
    ): u64 acquires AuctionState {
        let state = borrow_global<AuctionState>(auction_state_addr);
        let dutch = smart_table::borrow(&state.dutch_auctions, intent_id);

        let now = timestamp::now_seconds();
        let elapsed = now - dutch.start_time;

        if (elapsed >= dutch.duration) {
            return dutch.end_price
        };

        let price_range = dutch.start_price - dutch.end_price;
        let decay = (price_range * elapsed) / dutch.duration;

        dutch.start_price - decay
    }

    #[view]
    /// Check if Dutch auction is active
    public fun is_dutch_active(
        auction_state_addr: address,
        intent_id: u64
    ): bool acquires AuctionState {
        let state = borrow_global<AuctionState>(auction_state_addr);
        if (!smart_table::contains(&state.dutch_auctions, intent_id)) {
            return false
        };
        let dutch = smart_table::borrow(&state.dutch_auctions, intent_id);
        dutch.is_active
    }

    #[view]
    /// Get Dutch auction winner and accepted price
    public fun get_dutch_winner(
        auction_state_addr: address,
        intent_id: u64
    ): (Option<address>, u64) acquires AuctionState {
        let state = borrow_global<AuctionState>(auction_state_addr);
        let dutch = smart_table::borrow(&state.dutch_auctions, intent_id);
        (dutch.winner, dutch.accepted_price)
    }

    #[view]
    /// Get full Dutch auction details
    public fun get_dutch_auction(
        auction_state_addr: address,
        intent_id: u64
    ): DutchAuction acquires AuctionState {
        let state = borrow_global<AuctionState>(auction_state_addr);
        assert!(smart_table::contains(&state.dutch_auctions, intent_id), errors::dutch_auction_not_found());
        *smart_table::borrow(&state.dutch_auctions, intent_id)
    }

    #[view]
    /// Get count of active Dutch auctions
    public fun get_active_dutch_count(auction_state_addr: address): u64 acquires AuctionState {
        let state = borrow_global<AuctionState>(auction_state_addr);
        state.active_dutch_count
    }

    // ============ Package Functions ============

    public(package) fun get_winning_solution(
        auction_state_addr: address,
        intent_id: u64
    ): Option<Solution> acquires AuctionState {
        let state = borrow_global<AuctionState>(auction_state_addr);
        if (!smart_table::contains(&state.auctions, intent_id)) {
            return option::none()
        };
        let auction = smart_table::borrow(&state.auctions, intent_id);
        if (!is_status_completed(&auction.status) || option::is_none(&auction.winner)) {
            return option::none()
        };
        let winner_addr = *option::borrow(&auction.winner);
        let solutions = &auction.solutions;
        let len = vector::length(solutions);
        let i = 0;
        while (i < len) {
            let sol = vector::borrow(solutions, i);
            if (types::get_solution_solver(sol) == winner_addr) {
                return option::some(*sol)
            };
            i = i + 1;
        };
        option::none()
    }

    public(package) fun is_winner(
        auction_state_addr: address,
        intent_id: u64,
        solver: address
    ): bool acquires AuctionState {
        let state = borrow_global<AuctionState>(auction_state_addr);
        if (!smart_table::contains(&state.auctions, intent_id)) {
            return false
        };
        let auction = smart_table::borrow(&state.auctions, intent_id);
        if (option::is_none(&auction.winner)) {
            return false
        };
        *option::borrow(&auction.winner) == solver
    }

    // ============ Dutch Auction Package Functions ============

    /// Check if solver is the Dutch auction winner
    public(package) fun is_dutch_winner(
        auction_state_addr: address,
        intent_id: u64,
        solver: address
    ): bool acquires AuctionState {
        let state = borrow_global<AuctionState>(auction_state_addr);
        if (!smart_table::contains(&state.dutch_auctions, intent_id)) {
            return false
        };
        let dutch = smart_table::borrow(&state.dutch_auctions, intent_id);
        if (option::is_none(&dutch.winner)) {
            return false
        };
        *option::borrow(&dutch.winner) == solver
    }

    /// Get Dutch auction accepted price (for settlement)
    public(package) fun get_dutch_accepted_price(
        auction_state_addr: address,
        intent_id: u64
    ): u64 acquires AuctionState {
        let state = borrow_global<AuctionState>(auction_state_addr);
        let dutch = smart_table::borrow(&state.dutch_auctions, intent_id);
        dutch.accepted_price
    }
}
