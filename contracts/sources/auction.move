/// Velox Auction Module
/// Handles sealed-bid and Dutch auction logic for intents
module velox::auction {
    use std::signer;
    use std::vector;
    use aptos_framework::timestamp;
    use aptos_framework::event;
    use velox::types::{Self, Bid};
    use velox::errors;
    use velox::submission;
    use velox::math;

    // ============ Constants ============
    const DEFAULT_FILL_DEADLINE: u64 = 300; // 5 minutes

    // ============ Events ============

    #[event]
    struct BidSubmitted has drop, store {
        intent_id: u64,
        solver: address,
        output_amount: u64,
        submitted_at: u64
    }

    #[event]
    struct SealedBidCompleted has drop, store {
        intent_id: u64,
        winner: address,
        winning_bid: u64,
        total_bids: u64,
        fill_deadline: u64
    }

    #[event]
    struct DutchAuctionAccepted has drop, store {
        intent_id: u64,
        solver: address,
        accepted_price: u64,
        accepted_at: u64
    }

    #[event]
    struct AuctionFailed has drop, store {
        intent_id: u64,
        reason: u8,
        failed_at: u64
    }

    // ============ Sealed-Bid Auction ============

    public entry fun submit_bid(
        solver: &signer,
        registry_addr: address,
        intent_id: u64,
        output_amount: u64
    ) {
        let solver_addr = signer::address_of(solver);
        let now = timestamp::now_seconds();

        let record = submission::borrow_intent(registry_addr, intent_id);
        let auction = types::get_auction(&record);

        assert!(types::is_sealed_bid_active(&auction), errors::auction_not_sealed_bid());

        let end_time = types::get_sealed_bid_end_time(&auction);
        assert!(now < end_time, errors::auction_ended());

        let min_output = types::get_min_output_from_record(&record);
        assert!(output_amount >= min_output, errors::bid_too_low());

        let bids = types::get_sealed_bid_bids(&auction);
        assert!(!has_solver_bid(&bids, solver_addr), errors::auction_in_progress());

        let bid = types::new_bid(solver_addr, output_amount, now);
        submission::add_bid_to_intent(registry_addr, intent_id, bid);

        event::emit(BidSubmitted {
            intent_id,
            solver: solver_addr,
            output_amount,
            submitted_at: now
        });
    }

    public entry fun complete_sealed_bid(
        registry_addr: address,
        intent_id: u64
    ) {
        let now = timestamp::now_seconds();
        let record = submission::borrow_intent(registry_addr, intent_id);
        let auction = types::get_auction(&record);

        assert!(types::is_sealed_bid_active(&auction), errors::auction_not_sealed_bid());

        let end_time = types::get_sealed_bid_end_time(&auction);
        assert!(now >= end_time, errors::auction_in_progress());

        let bids = types::get_sealed_bid_bids(&auction);
        let bid_count = vector::length(&bids);

        if (bid_count == 0) {
            submission::update_intent_auction(registry_addr, intent_id, types::auction_failed());
            event::emit(AuctionFailed { intent_id, reason: 0, failed_at: now });
            return
        };

        let (winner, winning_bid) = find_best_bid(&bids);
        let fill_deadline = now + DEFAULT_FILL_DEADLINE;

        submission::update_intent_auction(
            registry_addr,
            intent_id,
            types::new_sealed_bid_completed(winner, winning_bid, fill_deadline)
        );

        event::emit(SealedBidCompleted {
            intent_id, winner, winning_bid,
            total_bids: bid_count, fill_deadline
        });
    }

    // ============ Dutch Auction ============

    public entry fun accept_dutch(
        solver: &signer,
        registry_addr: address,
        intent_id: u64
    ) {
        let solver_addr = signer::address_of(solver);
        let now = timestamp::now_seconds();

        let record = submission::borrow_intent(registry_addr, intent_id);
        let auction = types::get_auction(&record);

        assert!(types::is_dutch_active(&auction), errors::auction_not_dutch());

        let (start_price, end_price, end_time) = types::get_dutch_params(&auction);
        assert!(now < end_time, errors::auction_ended());

        let created_at = types::get_created_at(&record);
        let current_price = math::dutch_auction_price(
            start_price, end_price, created_at, end_time, now
        );

        submission::update_intent_auction(
            registry_addr,
            intent_id,
            types::new_dutch_accepted(solver_addr, current_price)
        );

        event::emit(DutchAuctionAccepted {
            intent_id, solver: solver_addr,
            accepted_price: current_price, accepted_at: now
        });
    }

    public entry fun expire_dutch(registry_addr: address, intent_id: u64) {
        let now = timestamp::now_seconds();
        let record = submission::borrow_intent(registry_addr, intent_id);
        let auction = types::get_auction(&record);

        assert!(types::is_dutch_active(&auction), errors::auction_not_dutch());

        let (_, _, end_time) = types::get_dutch_params(&auction);
        assert!(now >= end_time, errors::auction_in_progress());

        submission::update_intent_auction(registry_addr, intent_id, types::auction_failed());
        event::emit(AuctionFailed { intent_id, reason: 1, failed_at: now });
    }

    public entry fun expire_fill_deadline(registry_addr: address, intent_id: u64) {
        let now = timestamp::now_seconds();
        let record = submission::borrow_intent(registry_addr, intent_id);
        let auction = types::get_auction(&record);

        assert!(types::is_sealed_bid_completed(&auction), errors::auction_not_sealed_bid());

        let fill_deadline = types::get_fill_deadline(&auction);
        assert!(now >= fill_deadline, errors::too_early());

        let fills = types::get_fills(&record);
        if (vector::length(&fills) == 0) {
            submission::update_intent_auction(registry_addr, intent_id, types::auction_failed());
            event::emit(AuctionFailed { intent_id, reason: 2, failed_at: now });
        };
    }

    // ============ Internal Functions ============

    fun has_solver_bid(bids: &vector<Bid>, solver: address): bool {
        let len = vector::length(bids);
        let i = 0;
        while (i < len) {
            let bid = vector::borrow(bids, i);
            if (types::get_bid_solver(bid) == solver) {
                return true
            };
            i = i + 1;
        };
        false
    }

    fun find_best_bid(bids: &vector<Bid>): (address, u64) {
        let len = vector::length(bids);
        assert!(len > 0, errors::auction_no_bids());

        let best_bid = vector::borrow(bids, 0);
        let best_solver = types::get_bid_solver(best_bid);
        let best_amount = types::get_bid_output_amount(best_bid);

        let i = 1;
        while (i < len) {
            let bid = vector::borrow(bids, i);
            let amount = types::get_bid_output_amount(bid);
            if (amount > best_amount) {
                best_solver = types::get_bid_solver(bid);
                best_amount = amount;
            };
            i = i + 1;
        };

        (best_solver, best_amount)
    }

    // ============ View Functions ============

    #[view]
    public fun get_current_dutch_price(registry_addr: address, intent_id: u64): u64 {
        let record = submission::borrow_intent(registry_addr, intent_id);
        let auction = types::get_auction(&record);

        assert!(types::is_dutch_active(&auction), errors::auction_not_dutch());

        let (start_price, end_price, end_time) = types::get_dutch_params(&auction);
        let created_at = types::get_created_at(&record);
        let now = timestamp::now_seconds();

        math::dutch_auction_price(start_price, end_price, created_at, end_time, now)
    }

    #[view]
    public fun get_bids(registry_addr: address, intent_id: u64): vector<Bid> {
        let record = submission::borrow_intent(registry_addr, intent_id);
        let auction = types::get_auction(&record);

        if (types::is_sealed_bid_active(&auction)) {
            types::get_sealed_bid_bids(&auction)
        } else {
            vector::empty()
        }
    }

    #[view]
    public fun can_solver_fill(registry_addr: address, intent_id: u64, solver: address): bool {
        let record = submission::borrow_intent(registry_addr, intent_id);
        let auction = types::get_auction(&record);

        if (types::is_auction_none(&auction)) {
            return true
        };

        if (types::is_sealed_bid_completed(&auction)) {
            return types::get_sealed_bid_winner(&auction) == solver
        };

        if (types::is_dutch_accepted(&auction)) {
            return types::get_dutch_winner(&auction) == solver
        };

        false
    }

    #[view]
    public fun get_winner(registry_addr: address, intent_id: u64): (bool, address) {
        let record = submission::borrow_intent(registry_addr, intent_id);
        let auction = types::get_auction(&record);

        if (types::is_sealed_bid_completed(&auction)) {
            (true, types::get_sealed_bid_winner(&auction))
        } else if (types::is_dutch_accepted(&auction)) {
            (true, types::get_dutch_winner(&auction))
        } else {
            (false, @0x0)
        }
    }

    #[view]
    public fun get_sealed_bid_time_remaining(registry_addr: address, intent_id: u64): u64 {
        let record = submission::borrow_intent(registry_addr, intent_id);
        let auction = types::get_auction(&record);

        if (!types::is_sealed_bid_active(&auction)) { return 0 };

        let end_time = types::get_sealed_bid_end_time(&auction);
        let now = timestamp::now_seconds();

        if (now >= end_time) { 0 } else { end_time - now }
    }

    #[view]
    public fun get_dutch_time_remaining(registry_addr: address, intent_id: u64): u64 {
        let record = submission::borrow_intent(registry_addr, intent_id);
        let auction = types::get_auction(&record);

        if (!types::is_dutch_active(&auction)) { return 0 };

        let (_, _, end_time) = types::get_dutch_params(&auction);
        let now = timestamp::now_seconds();

        if (now >= end_time) { 0 } else { end_time - now }
    }
}
