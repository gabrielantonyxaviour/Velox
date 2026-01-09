/// Core type definitions for Velox v2
/// Uses Move 2.0 enums for type-safe intent expression
module velox::types {
    use std::string::String;
    use std::vector;

    // ════════════════════════════════════════════════════════════════════════
    // CONSTANTS
    // ════════════════════════════════════════════════════════════════════════

    const MAX_FILLS_PER_INTENT: u64 = 5;

    // ════════════════════════════════════════════════════════════════════════
    // INTENT ENUM
    // ════════════════════════════════════════════════════════════════════════

    enum Intent has store, drop, copy {
        Swap {
            input_token: address,
            output_token: address,
            amount_in: u64,
            min_amount_out: u64,
            deadline: u64
        },
        LimitOrder {
            input_token: address,
            output_token: address,
            amount_in: u64,
            limit_price: u64,
            expiry: u64
        },
        TWAP {
            input_token: address,
            output_token: address,
            total_amount: u64,
            num_chunks: u64,
            interval_seconds: u64,
            max_slippage_bps: u64,
            start_time: u64
        },
        DCA {
            input_token: address,
            output_token: address,
            amount_per_period: u64,
            total_periods: u64,
            interval_seconds: u64,
            start_time: u64
        }
    }

    // ════════════════════════════════════════════════════════════════════════
    // INTENT STATUS ENUM
    // ════════════════════════════════════════════════════════════════════════

    enum IntentStatus has store, drop, copy {
        Active,
        Filled,
        Cancelled,
        Expired
    }

    // ════════════════════════════════════════════════════════════════════════
    // BID STRUCT
    // ════════════════════════════════════════════════════════════════════════

    struct Bid has store, drop, copy {
        solver: address,
        output_amount: u64,
        submitted_at: u64
    }

    // ════════════════════════════════════════════════════════════════════════
    // AUCTION STATE ENUM
    // ════════════════════════════════════════════════════════════════════════

    enum AuctionState has store, drop, copy {
        None,
        SealedBidActive {
            end_time: u64,
            bids: vector<Bid>
        },
        SealedBidCompleted {
            winner: address,
            winning_bid: u64,
            fill_deadline: u64
        },
        DutchActive {
            start_price: u64,
            end_price: u64,
            end_time: u64
        },
        DutchAccepted {
            winner: address,
            accepted_price: u64
        },
        Failed
    }

    // ════════════════════════════════════════════════════════════════════════
    // FILL STRUCT
    // ════════════════════════════════════════════════════════════════════════

    struct Fill has store, drop, copy {
        solver: address,
        input_amount: u64,
        output_amount: u64,
        filled_at: u64
    }

    // ════════════════════════════════════════════════════════════════════════
    // INTENT RECORD
    // ════════════════════════════════════════════════════════════════════════

    struct IntentRecord has store, drop, copy {
        id: u64,
        user: address,
        created_at: u64,
        intent: Intent,
        auction: AuctionState,
        status: IntentStatus,
        escrow_remaining: u64,
        total_output_received: u64,
        fills: vector<Fill>,
        chunks_executed: u64,
        next_execution: u64
    }

    // ════════════════════════════════════════════════════════════════════════
    // SOLVER INFO
    // ════════════════════════════════════════════════════════════════════════

    struct SolverInfo has store, drop, copy {
        metadata_uri: String,
        stake: u64,
        pending_unstake: u64,
        unstake_available_at: u64,
        is_active: bool,
        registered_at: u64,
        last_active: u64,
        reputation_score: u64,
        successful_fills: u64,
        failed_fills: u64,
        total_volume: u128
    }

    // ════════════════════════════════════════════════════════════════════════
    // CONSTANTS ACCESSORS
    // ════════════════════════════════════════════════════════════════════════

    public fun max_fills_per_intent(): u64 { MAX_FILLS_PER_INTENT }

    // ════════════════════════════════════════════════════════════════════════
    // INTENT CONSTRUCTORS
    // ════════════════════════════════════════════════════════════════════════

    public fun new_swap(
        input_token: address,
        output_token: address,
        amount_in: u64,
        min_amount_out: u64,
        deadline: u64
    ): Intent {
        Intent::Swap { input_token, output_token, amount_in, min_amount_out, deadline }
    }

    public fun new_limit_order(
        input_token: address,
        output_token: address,
        amount_in: u64,
        limit_price: u64,
        expiry: u64
    ): Intent {
        Intent::LimitOrder { input_token, output_token, amount_in, limit_price, expiry }
    }

    public fun new_twap(
        input_token: address,
        output_token: address,
        total_amount: u64,
        num_chunks: u64,
        interval_seconds: u64,
        max_slippage_bps: u64,
        start_time: u64
    ): Intent {
        Intent::TWAP {
            input_token, output_token, total_amount,
            num_chunks, interval_seconds, max_slippage_bps, start_time
        }
    }

    public fun new_dca(
        input_token: address,
        output_token: address,
        amount_per_period: u64,
        total_periods: u64,
        interval_seconds: u64,
        start_time: u64
    ): Intent {
        Intent::DCA {
            input_token, output_token, amount_per_period,
            total_periods, interval_seconds, start_time
        }
    }

    // ════════════════════════════════════════════════════════════════════════
    // INTENT TYPE CHECKS
    // ════════════════════════════════════════════════════════════════════════

    public fun is_swap(intent: &Intent): bool {
        match (intent) { Intent::Swap { .. } => true, _ => false }
    }

    public fun is_limit_order(intent: &Intent): bool {
        match (intent) { Intent::LimitOrder { .. } => true, _ => false }
    }

    public fun is_twap(intent: &Intent): bool {
        match (intent) { Intent::TWAP { .. } => true, _ => false }
    }

    public fun is_dca(intent: &Intent): bool {
        match (intent) { Intent::DCA { .. } => true, _ => false }
    }

    public fun is_scheduled(intent: &Intent): bool {
        is_twap(intent) || is_dca(intent)
    }

    // ════════════════════════════════════════════════════════════════════════
    // INTENT ACCESSORS
    // ════════════════════════════════════════════════════════════════════════

    public fun get_input_token(intent: &Intent): address {
        match (intent) {
            Intent::Swap { input_token, .. } => *input_token,
            Intent::LimitOrder { input_token, .. } => *input_token,
            Intent::TWAP { input_token, .. } => *input_token,
            Intent::DCA { input_token, .. } => *input_token
        }
    }

    public fun get_output_token(intent: &Intent): address {
        match (intent) {
            Intent::Swap { output_token, .. } => *output_token,
            Intent::LimitOrder { output_token, .. } => *output_token,
            Intent::TWAP { output_token, .. } => *output_token,
            Intent::DCA { output_token, .. } => *output_token
        }
    }

    public fun get_total_amount(intent: &Intent): u64 {
        match (intent) {
            Intent::Swap { amount_in, .. } => *amount_in,
            Intent::LimitOrder { amount_in, .. } => *amount_in,
            Intent::TWAP { total_amount, .. } => *total_amount,
            Intent::DCA { amount_per_period, total_periods, .. } =>
                *amount_per_period * *total_periods
        }
    }

    public fun get_deadline(intent: &Intent): u64 {
        match (intent) {
            Intent::Swap { deadline, .. } => *deadline,
            Intent::LimitOrder { expiry, .. } => *expiry,
            Intent::TWAP { start_time, num_chunks, interval_seconds, .. } =>
                *start_time + (*num_chunks * *interval_seconds),
            Intent::DCA { start_time, total_periods, interval_seconds, .. } =>
                *start_time + (*total_periods * *interval_seconds)
        }
    }

    public fun get_min_output(intent: &Intent): u64 {
        match (intent) {
            Intent::Swap { min_amount_out, .. } => *min_amount_out,
            Intent::LimitOrder { amount_in, limit_price, .. } =>
                (*amount_in * *limit_price) / 100000000,
            _ => 0
        }
    }

    public fun get_limit_price(intent: &Intent): u64 {
        match (intent) {
            Intent::LimitOrder { limit_price, .. } => *limit_price,
            _ => 0
        }
    }

    public fun get_twap_chunk_amount(intent: &Intent): u64 {
        match (intent) {
            Intent::TWAP { total_amount, num_chunks, .. } => *total_amount / *num_chunks,
            _ => 0
        }
    }

    public fun get_twap_num_chunks(intent: &Intent): u64 {
        match (intent) {
            Intent::TWAP { num_chunks, .. } => *num_chunks,
            _ => 0
        }
    }

    public fun get_twap_interval(intent: &Intent): u64 {
        match (intent) {
            Intent::TWAP { interval_seconds, .. } => *interval_seconds,
            _ => 0
        }
    }

    public fun get_twap_max_slippage(intent: &Intent): u64 {
        match (intent) {
            Intent::TWAP { max_slippage_bps, .. } => *max_slippage_bps,
            _ => 0
        }
    }

    public fun get_twap_start_time(intent: &Intent): u64 {
        match (intent) {
            Intent::TWAP { start_time, .. } => *start_time,
            _ => 0
        }
    }

    public fun get_dca_amount_per_period(intent: &Intent): u64 {
        match (intent) {
            Intent::DCA { amount_per_period, .. } => *amount_per_period,
            _ => 0
        }
    }

    public fun get_dca_total_periods(intent: &Intent): u64 {
        match (intent) {
            Intent::DCA { total_periods, .. } => *total_periods,
            _ => 0
        }
    }

    public fun get_dca_interval(intent: &Intent): u64 {
        match (intent) {
            Intent::DCA { interval_seconds, .. } => *interval_seconds,
            _ => 0
        }
    }

    public fun get_dca_start_time(intent: &Intent): u64 {
        match (intent) {
            Intent::DCA { start_time, .. } => *start_time,
            _ => 0
        }
    }

    // ════════════════════════════════════════════════════════════════════════
    // STATUS CONSTRUCTORS & CHECKS
    // ════════════════════════════════════════════════════════════════════════

    public fun new_active(): IntentStatus { IntentStatus::Active }
    public fun new_filled(): IntentStatus { IntentStatus::Filled }
    public fun new_cancelled(): IntentStatus { IntentStatus::Cancelled }
    public fun new_expired(): IntentStatus { IntentStatus::Expired }

    public fun is_active(status: &IntentStatus): bool {
        match (status) { IntentStatus::Active => true, _ => false }
    }

    public fun is_filled(status: &IntentStatus): bool {
        match (status) { IntentStatus::Filled => true, _ => false }
    }

    public fun is_cancelled(status: &IntentStatus): bool {
        match (status) { IntentStatus::Cancelled => true, _ => false }
    }

    public fun is_expired(status: &IntentStatus): bool {
        match (status) { IntentStatus::Expired => true, _ => false }
    }

    public fun is_terminal(status: &IntentStatus): bool {
        !is_active(status)
    }

    // ════════════════════════════════════════════════════════════════════════
    // AUCTION CONSTRUCTORS
    // ════════════════════════════════════════════════════════════════════════

    public fun new_auction_none(): AuctionState { AuctionState::None }

    public fun new_sealed_bid_active(end_time: u64): AuctionState {
        AuctionState::SealedBidActive { end_time, bids: vector::empty() }
    }

    public fun new_dutch_active(start_price: u64, end_price: u64, end_time: u64): AuctionState {
        AuctionState::DutchActive { start_price, end_price, end_time }
    }

    // ════════════════════════════════════════════════════════════════════════
    // AUCTION STATE CHECKS
    // ════════════════════════════════════════════════════════════════════════

    public fun is_auction_none(auction: &AuctionState): bool {
        match (auction) { AuctionState::None => true, _ => false }
    }

    public fun is_sealed_bid_active(auction: &AuctionState): bool {
        match (auction) { AuctionState::SealedBidActive { .. } => true, _ => false }
    }

    public fun is_sealed_bid_completed(auction: &AuctionState): bool {
        match (auction) { AuctionState::SealedBidCompleted { .. } => true, _ => false }
    }

    public fun is_dutch_active(auction: &AuctionState): bool {
        match (auction) { AuctionState::DutchActive { .. } => true, _ => false }
    }

    public fun is_dutch_accepted(auction: &AuctionState): bool {
        match (auction) { AuctionState::DutchAccepted { .. } => true, _ => false }
    }

    public fun is_auction_failed(auction: &AuctionState): bool {
        match (auction) { AuctionState::Failed => true, _ => false }
    }

    public fun has_auction(auction: &AuctionState): bool {
        !is_auction_none(auction)
    }

    public fun is_auction_active(auction: &AuctionState): bool {
        is_sealed_bid_active(auction) || is_dutch_active(auction)
    }

    // ════════════════════════════════════════════════════════════════════════
    // AUCTION ACCESSORS
    // ════════════════════════════════════════════════════════════════════════

    public fun get_auction_end_time(auction: &AuctionState): u64 {
        match (auction) {
            AuctionState::SealedBidActive { end_time, .. } => *end_time,
            AuctionState::DutchActive { end_time, .. } => *end_time,
            AuctionState::SealedBidCompleted { fill_deadline, .. } => *fill_deadline,
            _ => 0
        }
    }

    public fun get_auction_winner(auction: &AuctionState): address {
        match (auction) {
            AuctionState::SealedBidCompleted { winner, .. } => *winner,
            AuctionState::DutchAccepted { winner, .. } => *winner,
            _ => @0x0
        }
    }

    public fun get_sealed_bid_bids(auction: &AuctionState): vector<Bid> {
        match (auction) {
            AuctionState::SealedBidActive { bids, .. } => *bids,
            _ => vector::empty()
        }
    }

    public fun get_sealed_bid_count(auction: &AuctionState): u64 {
        match (auction) {
            AuctionState::SealedBidActive { bids, .. } => vector::length(bids),
            _ => 0
        }
    }

    public fun get_dutch_start_price(auction: &AuctionState): u64 {
        match (auction) {
            AuctionState::DutchActive { start_price, .. } => *start_price,
            _ => 0
        }
    }

    public fun get_dutch_end_price(auction: &AuctionState): u64 {
        match (auction) {
            AuctionState::DutchActive { end_price, .. } => *end_price,
            _ => 0
        }
    }

    public fun get_winning_bid_amount(auction: &AuctionState): u64 {
        match (auction) {
            AuctionState::SealedBidCompleted { winning_bid, .. } => *winning_bid,
            AuctionState::DutchAccepted { accepted_price, .. } => *accepted_price,
            _ => 0
        }
    }

    // ════════════════════════════════════════════════════════════════════════
    // BID CONSTRUCTORS & ACCESSORS
    // ════════════════════════════════════════════════════════════════════════

    public fun new_bid(solver: address, output_amount: u64, submitted_at: u64): Bid {
        Bid { solver, output_amount, submitted_at }
    }

    public fun get_bid_solver(bid: &Bid): address { bid.solver }
    public fun get_bid_output_amount(bid: &Bid): u64 { bid.output_amount }
    public fun get_bid_submitted_at(bid: &Bid): u64 { bid.submitted_at }

    // ════════════════════════════════════════════════════════════════════════
    // FILL CONSTRUCTORS & ACCESSORS
    // ════════════════════════════════════════════════════════════════════════

    public fun new_fill(
        solver: address,
        input_amount: u64,
        output_amount: u64,
        filled_at: u64
    ): Fill {
        Fill { solver, input_amount, output_amount, filled_at }
    }

    public fun get_fill_solver(fill: &Fill): address { fill.solver }
    public fun get_fill_input_amount(fill: &Fill): u64 { fill.input_amount }
    public fun get_fill_output_amount(fill: &Fill): u64 { fill.output_amount }
    public fun get_fill_time(fill: &Fill): u64 { fill.filled_at }

    // ════════════════════════════════════════════════════════════════════════
    // INTENT RECORD CONSTRUCTOR
    // ════════════════════════════════════════════════════════════════════════

    public fun new_intent_record(
        id: u64,
        user: address,
        created_at: u64,
        intent: Intent,
        auction: AuctionState,
        escrow_amount: u64
    ): IntentRecord {
        let (chunks_executed, next_execution) = if (is_scheduled(&intent)) {
            let start = match (&intent) {
                Intent::TWAP { start_time, .. } => *start_time,
                Intent::DCA { start_time, .. } => *start_time,
                _ => 0
            };
            (0u64, start)
        } else {
            (0u64, 0u64)
        };

        IntentRecord {
            id,
            user,
            created_at,
            intent,
            auction,
            status: IntentStatus::Active,
            escrow_remaining: escrow_amount,
            total_output_received: 0,
            fills: vector::empty(),
            chunks_executed,
            next_execution
        }
    }

    // ════════════════════════════════════════════════════════════════════════
    // INTENT RECORD ACCESSORS
    // ════════════════════════════════════════════════════════════════════════

    public fun get_record_id(record: &IntentRecord): u64 { record.id }
    public fun get_record_user(record: &IntentRecord): address { record.user }
    public fun get_record_created_at(record: &IntentRecord): u64 { record.created_at }
    public fun get_record_intent(record: &IntentRecord): &Intent { &record.intent }
    public fun get_record_auction(record: &IntentRecord): &AuctionState { &record.auction }
    public fun get_record_status(record: &IntentRecord): &IntentStatus { &record.status }
    public fun get_record_escrow_remaining(record: &IntentRecord): u64 { record.escrow_remaining }
    public fun get_record_total_output(record: &IntentRecord): u64 { record.total_output_received }
    public fun get_record_fills(record: &IntentRecord): &vector<Fill> { &record.fills }
    public fun get_record_fill_count(record: &IntentRecord): u64 { vector::length(&record.fills) }
    public fun get_record_chunks_executed(record: &IntentRecord): u64 { record.chunks_executed }
    public fun get_record_next_execution(record: &IntentRecord): u64 { record.next_execution }

    public fun get_total_input_filled(record: &IntentRecord): u64 {
        get_total_amount(&record.intent) - record.escrow_remaining
    }

    // ════════════════════════════════════════════════════════════════════════
    // INTENT RECORD MUTATORS (package visibility)
    // ════════════════════════════════════════════════════════════════════════

    public(package) fun set_record_status(record: &mut IntentRecord, status: IntentStatus) {
        record.status = status;
    }

    public(package) fun set_record_auction(record: &mut IntentRecord, auction: AuctionState) {
        record.auction = auction;
    }

    public(package) fun add_fill(record: &mut IntentRecord, fill: Fill) {
        record.escrow_remaining = record.escrow_remaining - fill.input_amount;
        record.total_output_received = record.total_output_received + fill.output_amount;
        vector::push_back(&mut record.fills, fill);
    }

    public(package) fun increment_chunks_executed(record: &mut IntentRecord) {
        record.chunks_executed = record.chunks_executed + 1;
    }

    public(package) fun set_next_execution(record: &mut IntentRecord, next: u64) {
        record.next_execution = next;
    }

    public(package) fun refund_escrow(record: &mut IntentRecord): u64 {
        let amount = record.escrow_remaining;
        record.escrow_remaining = 0;
        amount
    }

    public(package) fun add_bid_to_auction(record: &mut IntentRecord, bid: Bid) {
        match (&mut record.auction) {
            AuctionState::SealedBidActive { bids, .. } => {
                vector::push_back(bids, bid);
            },
            _ => {}
        }
    }

    public(package) fun complete_sealed_bid(
        record: &mut IntentRecord,
        winner: address,
        winning_bid: u64,
        fill_deadline: u64
    ) {
        record.auction = AuctionState::SealedBidCompleted {
            winner, winning_bid, fill_deadline
        };
    }

    public(package) fun accept_dutch(
        record: &mut IntentRecord,
        winner: address,
        accepted_price: u64
    ) {
        record.auction = AuctionState::DutchAccepted { winner, accepted_price };
    }

    public(package) fun fail_auction(record: &mut IntentRecord) {
        record.auction = AuctionState::Failed;
    }

    // ════════════════════════════════════════════════════════════════════════
    // SOLVER INFO CONSTRUCTOR & ACCESSORS
    // ════════════════════════════════════════════════════════════════════════

    public fun new_solver_info(
        metadata_uri: String,
        stake: u64,
        registered_at: u64,
        initial_reputation: u64
    ): SolverInfo {
        SolverInfo {
            metadata_uri,
            stake,
            pending_unstake: 0,
            unstake_available_at: 0,
            is_active: true,
            registered_at,
            last_active: registered_at,
            reputation_score: initial_reputation,
            successful_fills: 0,
            failed_fills: 0,
            total_volume: 0
        }
    }

    public fun get_solver_metadata_uri(info: &SolverInfo): String { info.metadata_uri }
    public fun get_solver_stake(info: &SolverInfo): u64 { info.stake }
    public fun get_solver_pending_unstake(info: &SolverInfo): u64 { info.pending_unstake }
    public fun get_solver_unstake_available_at(info: &SolverInfo): u64 { info.unstake_available_at }
    public fun is_solver_active(info: &SolverInfo): bool { info.is_active }
    public fun get_solver_registered_at(info: &SolverInfo): u64 { info.registered_at }
    public fun get_solver_last_active(info: &SolverInfo): u64 { info.last_active }
    public fun get_solver_reputation(info: &SolverInfo): u64 { info.reputation_score }
    public fun get_solver_successful_fills(info: &SolverInfo): u64 { info.successful_fills }
    public fun get_solver_failed_fills(info: &SolverInfo): u64 { info.failed_fills }
    public fun get_solver_total_volume(info: &SolverInfo): u128 { info.total_volume }

    public(package) fun set_solver_active(info: &mut SolverInfo, active: bool) {
        info.is_active = active;
    }

    public(package) fun add_solver_stake(info: &mut SolverInfo, amount: u64) {
        info.stake = info.stake + amount;
    }

    public(package) fun request_solver_unstake(
        info: &mut SolverInfo,
        amount: u64,
        available_at: u64
    ) {
        info.pending_unstake = amount;
        info.unstake_available_at = available_at;
        info.stake = info.stake - amount;
    }

    public(package) fun complete_solver_unstake(info: &mut SolverInfo): u64 {
        let amount = info.pending_unstake;
        info.pending_unstake = 0;
        info.unstake_available_at = 0;
        amount
    }

    public(package) fun record_solver_fill(
        info: &mut SolverInfo,
        success: bool,
        volume: u64,
        timestamp: u64
    ) {
        info.last_active = timestamp;
        if (success) {
            info.successful_fills = info.successful_fills + 1;
            if (info.reputation_score < 9900) {
                info.reputation_score = info.reputation_score + 100;
            } else {
                info.reputation_score = 10000;
            };
        } else {
            info.failed_fills = info.failed_fills + 1;
            if (info.reputation_score >= 200) {
                info.reputation_score = info.reputation_score - 200;
            } else {
                info.reputation_score = 0;
            };
        };
        info.total_volume = info.total_volume + (volume as u128);
    }

    public(package) fun update_solver_metadata(info: &mut SolverInfo, new_uri: String) {
        info.metadata_uri = new_uri;
    }

    // ════════════════════════════════════════════════════════════════════════
    // CONVENIENCE ALIASES (for use by other modules)
    // ════════════════════════════════════════════════════════════════════════

    // AuctionState constructors/helpers
    public fun auction_failed(): AuctionState { AuctionState::Failed }

    public fun new_sealed_bid_completed(winner: address, winning_bid: u64, fill_deadline: u64): AuctionState {
        AuctionState::SealedBidCompleted { winner, winning_bid, fill_deadline }
    }

    public fun new_dutch_accepted(winner: address, accepted_price: u64): AuctionState {
        AuctionState::DutchAccepted { winner, accepted_price }
    }

    // Auction accessors
    public fun get_sealed_bid_end_time(auction: &AuctionState): u64 {
        match (auction) {
            AuctionState::SealedBidActive { end_time, .. } => *end_time,
            _ => 0
        }
    }

    public fun get_dutch_params(auction: &AuctionState): (u64, u64, u64) {
        match (auction) {
            AuctionState::DutchActive { start_price, end_price, end_time } =>
                (*start_price, *end_price, *end_time),
            _ => (0, 0, 0)
        }
    }

    public fun get_fill_deadline(auction: &AuctionState): u64 {
        match (auction) {
            AuctionState::SealedBidCompleted { fill_deadline, .. } => *fill_deadline,
            _ => 0
        }
    }

    public fun get_sealed_bid_winner(auction: &AuctionState): address {
        match (auction) {
            AuctionState::SealedBidCompleted { winner, .. } => *winner,
            _ => @0x0
        }
    }

    public fun get_dutch_winner(auction: &AuctionState): address {
        match (auction) {
            AuctionState::DutchAccepted { winner, .. } => *winner,
            _ => @0x0
        }
    }

    // IntentRecord convenience accessors (aliases)
    public fun get_auction(record: &IntentRecord): AuctionState { record.auction }
    public fun get_created_at(record: &IntentRecord): u64 { record.created_at }
    public fun get_user(record: &IntentRecord): address { record.user }
    public fun get_escrow_remaining(record: &IntentRecord): u64 { record.escrow_remaining }
    public fun get_total_output(record: &IntentRecord): u64 { record.total_output_received }
    public fun get_fills(record: &IntentRecord): vector<Fill> { record.fills }
    public fun get_intent_ref(record: &IntentRecord): &Intent { &record.intent }
    public fun get_next_execution(record: &IntentRecord): u64 { record.next_execution }
    public fun get_chunks_executed(record: &IntentRecord): u64 { record.chunks_executed }

    public fun get_min_output_from_record(record: &IntentRecord): u64 {
        get_min_output(&record.intent)
    }

    // Additional intent accessors for specific types
    public fun get_swap_deadline(intent: &Intent): u64 {
        match (intent) {
            Intent::Swap { deadline, .. } => *deadline,
            _ => 0
        }
    }

    public fun get_swap_min_output(intent: &Intent): u64 {
        match (intent) {
            Intent::Swap { min_amount_out, .. } => *min_amount_out,
            _ => 0
        }
    }

    public fun get_swap_amount_in(intent: &Intent): u64 {
        match (intent) {
            Intent::Swap { amount_in, .. } => *amount_in,
            _ => 0
        }
    }

    public fun get_swap_input_token(intent: &Intent): address {
        match (intent) {
            Intent::Swap { input_token, .. } => *input_token,
            _ => @0x0
        }
    }

    public fun get_swap_output_token(intent: &Intent): address {
        match (intent) {
            Intent::Swap { output_token, .. } => *output_token,
            _ => @0x0
        }
    }

    public fun get_limit_expiry(intent: &Intent): u64 {
        match (intent) {
            Intent::LimitOrder { expiry, .. } => *expiry,
            _ => 0
        }
    }

    public fun get_limit_input_token(intent: &Intent): address {
        match (intent) {
            Intent::LimitOrder { input_token, .. } => *input_token,
            _ => @0x0
        }
    }

    public fun get_limit_output_token(intent: &Intent): address {
        match (intent) {
            Intent::LimitOrder { output_token, .. } => *output_token,
            _ => @0x0
        }
    }

    public fun get_limit_amount_in(intent: &Intent): u64 {
        match (intent) {
            Intent::LimitOrder { amount_in, .. } => *amount_in,
            _ => 0
        }
    }

    public fun get_twap_total_amount(intent: &Intent): u64 {
        match (intent) {
            Intent::TWAP { total_amount, .. } => *total_amount,
            _ => 0
        }
    }

    public fun get_twap_input_token(intent: &Intent): address {
        match (intent) {
            Intent::TWAP { input_token, .. } => *input_token,
            _ => @0x0
        }
    }

    public fun get_twap_output_token(intent: &Intent): address {
        match (intent) {
            Intent::TWAP { output_token, .. } => *output_token,
            _ => @0x0
        }
    }

    public fun get_dca_input_token(intent: &Intent): address {
        match (intent) {
            Intent::DCA { input_token, .. } => *input_token,
            _ => @0x0
        }
    }

    public fun get_dca_output_token(intent: &Intent): address {
        match (intent) {
            Intent::DCA { output_token, .. } => *output_token,
            _ => @0x0
        }
    }

    // Package-visible mutator aliases
    public(package) fun set_auction(record: &mut IntentRecord, auction: AuctionState) {
        record.auction = auction;
    }

    public(package) fun add_bid(record: &mut IntentRecord, bid: Bid) {
        add_bid_to_auction(record, bid);
    }

    public(package) fun set_status(record: &mut IntentRecord, status: IntentStatus) {
        record.status = status;
    }

    public(package) fun set_escrow_remaining(record: &mut IntentRecord, amount: u64) {
        record.escrow_remaining = amount;
    }

    public(package) fun add_total_output(record: &mut IntentRecord, amount: u64) {
        record.total_output_received = record.total_output_received + amount;
    }

    // Status constructors (aliases)
    public fun status_active(): IntentStatus { IntentStatus::Active }
    public fun status_filled(): IntentStatus { IntentStatus::Filled }
    public fun status_cancelled(): IntentStatus { IntentStatus::Cancelled }
    public fun status_expired(): IntentStatus { IntentStatus::Expired }

    // Convenience: check if record is active (not just status)
    public fun is_record_active(record: &IntentRecord): bool {
        is_active(&record.status)
    }

    // Solver mutators (aliases for existing functions)
    public(package) fun set_pending_unstake(info: &mut SolverInfo, amount: u64, available_at: u64) {
        request_solver_unstake(info, amount, available_at);
    }

    public(package) fun complete_unstake(info: &mut SolverInfo) {
        let _ = complete_solver_unstake(info);
    }

    public(package) fun set_solver_metadata_uri(info: &mut SolverInfo, uri: String) {
        update_solver_metadata(info, uri);
    }

    public(package) fun record_solver_success(info: &mut SolverInfo, volume: u64) {
        info.successful_fills = info.successful_fills + 1;
        info.total_volume = info.total_volume + (volume as u128);
    }

    public(package) fun record_solver_failure(info: &mut SolverInfo) {
        info.failed_fills = info.failed_fills + 1;
    }

    public(package) fun update_last_active(info: &mut SolverInfo, timestamp: u64) {
        info.last_active = timestamp;
    }

    public(package) fun set_solver_reputation(info: &mut SolverInfo, score: u64) {
        info.reputation_score = score;
    }
}
