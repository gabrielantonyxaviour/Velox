/// Core type definitions for Velox intent-based DEX
/// Uses Move 2.0 enums for type-safe intent expression
module velox::types {
    use std::option::{Self, Option};

    // ============ Auction Type Constants ============

    /// Sealed bid auction (standard competitive auction)
    const AUCTION_TYPE_SEALED_BID: u8 = 0;
    /// Dutch auction (descending price)
    const AUCTION_TYPE_DUTCH: u8 = 1;

    // ============ Intent Enum ============

    /// Intent types supported by Velox (4 core types)
    enum Intent has store, drop, copy {
        /// Swap intent: exchange one token for another
        Swap {
            input_token: address,
            output_token: address,
            amount_in: u64,
            min_amount_out: u64,
            deadline: u64
        },
        /// Limit order: execute only at specified price or better
        LimitOrder {
            input_token: address,
            output_token: address,
            amount_in: u64,
            limit_price: u64,  // Price in basis points (amount_out per 1 unit of input * 10000)
            expiry: u64,
            partial_fill_allowed: bool
        },
        /// TWAP: Execute large order in chunks over time
        TWAP {
            input_token: address,
            output_token: address,
            total_amount: u64,
            num_chunks: u64,
            interval_seconds: u64,
            max_slippage_bps: u64,  // Max slippage per chunk in basis points
            start_time: u64
        },
        /// DCA: Dollar-cost average over time
        DCA {
            input_token: address,
            output_token: address,
            amount_per_period: u64,
            total_periods: u64,
            interval_seconds: u64,
            next_execution: u64
        }
    }

    // ============ IntentStatus Enum ============

    /// Status of an intent throughout its lifecycle
    enum IntentStatus has store, drop, copy {
        /// Intent is waiting for solver solutions
        Pending,
        /// Intent has been partially filled
        PartiallyFilled { filled_amount: u64 },
        /// Intent has been completely filled
        Filled,
        /// Intent was cancelled by the user
        Cancelled,
        /// Intent expired before being filled
        Expired
    }

    // ============ IntentRecord Struct ============

    /// Complete record of an intent with metadata
    struct IntentRecord has store, drop, copy {
        id: u64,
        user: address,
        intent: Intent,
        created_at: u64,
        status: IntentStatus,
        escrowed_amount: u64,
        solver: Option<address>,
        execution_price: Option<u64>,
        filled_amount: u64
    }

    // ============ Solution Struct ============

    /// A solution submitted by a solver for an intent
    struct Solution has store, drop, copy {
        intent_id: u64,
        solver: address,
        output_amount: u64,
        execution_price: u64,
        expires_at: u64
    }

    // ============ Intent Type Checks ============

    /// Check if intent is a Swap
    public fun is_swap(intent: &Intent): bool {
        match (intent) {
            Intent::Swap { .. } => true,
            _ => false
        }
    }

    /// Check if intent is a LimitOrder
    public fun is_limit_order(intent: &Intent): bool {
        match (intent) {
            Intent::LimitOrder { .. } => true,
            _ => false
        }
    }

    /// Check if intent is a TWAP
    public fun is_twap(intent: &Intent): bool {
        match (intent) {
            Intent::TWAP { .. } => true,
            _ => false
        }
    }

    /// Check if intent is a DCA
    public fun is_dca(intent: &Intent): bool {
        match (intent) {
            Intent::DCA { .. } => true,
            _ => false
        }
    }

    // ============ Intent Accessors ============

    /// Get input token address from intent
    public fun get_input_token(intent: &Intent): address {
        match (intent) {
            Intent::Swap { input_token, .. } => *input_token,
            Intent::LimitOrder { input_token, .. } => *input_token,
            Intent::TWAP { input_token, .. } => *input_token,
            Intent::DCA { input_token, .. } => *input_token
        }
    }

    /// Get output token address from intent
    public fun get_output_token(intent: &Intent): address {
        match (intent) {
            Intent::Swap { output_token, .. } => *output_token,
            Intent::LimitOrder { output_token, .. } => *output_token,
            Intent::TWAP { output_token, .. } => *output_token,
            Intent::DCA { output_token, .. } => *output_token
        }
    }

    /// Get input amount from intent (total_amount for TWAP, total for DCA)
    public fun get_amount_in(intent: &Intent): u64 {
        match (intent) {
            Intent::Swap { amount_in, .. } => *amount_in,
            Intent::LimitOrder { amount_in, .. } => *amount_in,
            Intent::TWAP { total_amount, .. } => *total_amount,
            Intent::DCA { amount_per_period, total_periods, .. } => *amount_per_period * *total_periods
        }
    }

    /// Get deadline/expiry from intent
    public fun get_deadline(intent: &Intent): u64 {
        match (intent) {
            Intent::Swap { deadline, .. } => *deadline,
            Intent::LimitOrder { expiry, .. } => *expiry,
            Intent::TWAP { start_time, num_chunks, interval_seconds, .. } => *start_time + (*num_chunks * *interval_seconds),
            Intent::DCA { next_execution, total_periods, interval_seconds, .. } => *next_execution + (*total_periods * *interval_seconds)
        }
    }

    /// Get minimum output amount (only for Swap)
    public fun get_min_amount_out(intent: &Intent): u64 {
        match (intent) {
            Intent::Swap { min_amount_out, .. } => *min_amount_out,
            _ => 0
        }
    }

    /// Get limit price (only for LimitOrder)
    public fun get_limit_price(intent: &Intent): u64 {
        match (intent) {
            Intent::LimitOrder { limit_price, .. } => *limit_price,
            _ => 0
        }
    }

    /// Check if partial fill is allowed (only for LimitOrder)
    public fun is_partial_fill_allowed(intent: &Intent): bool {
        match (intent) {
            Intent::LimitOrder { partial_fill_allowed, .. } => *partial_fill_allowed,
            _ => false
        }
    }

    // ============ TWAP Accessors ============

    /// Get total amount for TWAP intent
    public fun get_twap_total_amount(intent: &Intent): u64 {
        match (intent) {
            Intent::TWAP { total_amount, .. } => *total_amount,
            _ => 0
        }
    }

    /// Get number of chunks for TWAP intent
    public fun get_twap_num_chunks(intent: &Intent): u64 {
        match (intent) {
            Intent::TWAP { num_chunks, .. } => *num_chunks,
            _ => 0
        }
    }

    /// Get interval seconds for TWAP intent
    public fun get_twap_interval(intent: &Intent): u64 {
        match (intent) {
            Intent::TWAP { interval_seconds, .. } => *interval_seconds,
            _ => 0
        }
    }

    /// Get max slippage in basis points for TWAP intent
    public fun get_twap_max_slippage_bps(intent: &Intent): u64 {
        match (intent) {
            Intent::TWAP { max_slippage_bps, .. } => *max_slippage_bps,
            _ => 0
        }
    }

    /// Get start time for TWAP intent
    public fun get_twap_start_time(intent: &Intent): u64 {
        match (intent) {
            Intent::TWAP { start_time, .. } => *start_time,
            _ => 0
        }
    }

    /// Get amount per chunk for TWAP intent
    public fun get_twap_chunk_amount(intent: &Intent): u64 {
        match (intent) {
            Intent::TWAP { total_amount, num_chunks, .. } => *total_amount / *num_chunks,
            _ => 0
        }
    }

    // ============ DCA Accessors ============

    /// Get amount per period for DCA intent
    public fun get_dca_amount_per_period(intent: &Intent): u64 {
        match (intent) {
            Intent::DCA { amount_per_period, .. } => *amount_per_period,
            _ => 0
        }
    }

    /// Get total periods for DCA intent
    public fun get_dca_total_periods(intent: &Intent): u64 {
        match (intent) {
            Intent::DCA { total_periods, .. } => *total_periods,
            _ => 0
        }
    }

    /// Get interval seconds for DCA intent
    public fun get_dca_interval(intent: &Intent): u64 {
        match (intent) {
            Intent::DCA { interval_seconds, .. } => *interval_seconds,
            _ => 0
        }
    }

    /// Get next execution time for DCA intent
    public fun get_dca_next_execution(intent: &Intent): u64 {
        match (intent) {
            Intent::DCA { next_execution, .. } => *next_execution,
            _ => 0
        }
    }

    // ============ Status Checks ============

    /// Check if status is Pending
    public fun is_pending(status: &IntentStatus): bool {
        match (status) {
            IntentStatus::Pending => true,
            _ => false
        }
    }

    /// Check if status is Filled
    public fun is_filled(status: &IntentStatus): bool {
        match (status) {
            IntentStatus::Filled => true,
            _ => false
        }
    }

    /// Check if status is PartiallyFilled
    public fun is_partially_filled(status: &IntentStatus): bool {
        match (status) {
            IntentStatus::PartiallyFilled { .. } => true,
            _ => false
        }
    }

    /// Check if status is terminal (cannot transition further)
    public fun is_terminal(status: &IntentStatus): bool {
        match (status) {
            IntentStatus::Filled => true,
            IntentStatus::Cancelled => true,
            IntentStatus::Expired => true,
            _ => false
        }
    }

    /// Get filled amount from PartiallyFilled status
    public fun get_partially_filled_amount(status: &IntentStatus): u64 {
        match (status) {
            IntentStatus::PartiallyFilled { filled_amount } => *filled_amount,
            _ => 0
        }
    }

    // ============ Intent Constructors ============

    /// Create a new Swap intent
    public fun new_swap(
        input_token: address,
        output_token: address,
        amount_in: u64,
        min_amount_out: u64,
        deadline: u64
    ): Intent {
        Intent::Swap {
            input_token,
            output_token,
            amount_in,
            min_amount_out,
            deadline
        }
    }

    /// Create a new LimitOrder intent
    public fun new_limit_order(
        input_token: address,
        output_token: address,
        amount_in: u64,
        limit_price: u64,
        expiry: u64,
        partial_fill_allowed: bool
    ): Intent {
        Intent::LimitOrder {
            input_token,
            output_token,
            amount_in,
            limit_price,
            expiry,
            partial_fill_allowed
        }
    }

    /// Create a new TWAP intent
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
            input_token,
            output_token,
            total_amount,
            num_chunks,
            interval_seconds,
            max_slippage_bps,
            start_time
        }
    }

    /// Create a new DCA intent
    public fun new_dca(
        input_token: address,
        output_token: address,
        amount_per_period: u64,
        total_periods: u64,
        interval_seconds: u64,
        next_execution: u64
    ): Intent {
        Intent::DCA {
            input_token,
            output_token,
            amount_per_period,
            total_periods,
            interval_seconds,
            next_execution
        }
    }

    // ============ Status Constructors ============

    /// Create Pending status
    public fun new_pending(): IntentStatus {
        IntentStatus::Pending
    }

    /// Create PartiallyFilled status
    public fun new_partially_filled(filled_amount: u64): IntentStatus {
        IntentStatus::PartiallyFilled { filled_amount }
    }

    /// Create Filled status
    public fun new_filled(): IntentStatus {
        IntentStatus::Filled
    }

    /// Create Cancelled status
    public fun new_cancelled(): IntentStatus {
        IntentStatus::Cancelled
    }

    /// Create Expired status
    public fun new_expired(): IntentStatus {
        IntentStatus::Expired
    }

    // ============ IntentRecord Constructor ============

    /// Create a new IntentRecord
    public fun new_intent_record(
        id: u64,
        user: address,
        intent: Intent,
        created_at: u64,
        escrowed_amount: u64
    ): IntentRecord {
        IntentRecord {
            id,
            user,
            intent,
            created_at,
            status: IntentStatus::Pending,
            escrowed_amount,
            solver: option::none(),
            execution_price: option::none(),
            filled_amount: 0
        }
    }

    // ============ IntentRecord Accessors ============

    /// Get intent ID
    public fun get_intent_id(record: &IntentRecord): u64 {
        record.id
    }

    /// Get intent user
    public fun get_intent_user(record: &IntentRecord): address {
        record.user
    }

    /// Get the intent from record
    public fun get_intent(record: &IntentRecord): &Intent {
        &record.intent
    }

    /// Get intent status
    public fun get_intent_status(record: &IntentRecord): &IntentStatus {
        &record.status
    }

    /// Get escrowed amount
    public fun get_escrowed_amount(record: &IntentRecord): u64 {
        record.escrowed_amount
    }

    /// Get filled amount
    public fun get_filled_amount(record: &IntentRecord): u64 {
        record.filled_amount
    }

    /// Get solver if assigned
    public fun get_solver(record: &IntentRecord): Option<address> {
        record.solver
    }

    /// Get execution price if filled
    public fun get_execution_price(record: &IntentRecord): Option<u64> {
        record.execution_price
    }

    // ============ IntentRecord Mutators ============

    /// Update intent status
    public fun set_status(record: &mut IntentRecord, status: IntentStatus) {
        record.status = status;
    }

    /// Set solver for the intent
    public fun set_solver(record: &mut IntentRecord, solver: address) {
        record.solver = option::some(solver);
    }

    /// Set execution price
    public fun set_execution_price(record: &mut IntentRecord, price: u64) {
        record.execution_price = option::some(price);
    }

    /// Update filled amount
    public fun set_filled_amount(record: &mut IntentRecord, amount: u64) {
        record.filled_amount = amount;
    }

    // ============ Solution Constructor ============

    /// Create a new Solution
    public fun new_solution(
        intent_id: u64,
        solver: address,
        output_amount: u64,
        execution_price: u64,
        expires_at: u64
    ): Solution {
        Solution {
            intent_id,
            solver,
            output_amount,
            execution_price,
            expires_at
        }
    }

    // ============ Solution Accessors ============

    /// Get solution intent ID
    public fun get_solution_intent_id(solution: &Solution): u64 {
        solution.intent_id
    }

    /// Get solution solver
    public fun get_solution_solver(solution: &Solution): address {
        solution.solver
    }

    /// Get solution output amount
    public fun get_solution_output_amount(solution: &Solution): u64 {
        solution.output_amount
    }

    /// Get solution execution price
    public fun get_solution_execution_price(solution: &Solution): u64 {
        solution.execution_price
    }

    /// Get solution expiry
    public fun get_solution_expires_at(solution: &Solution): u64 {
        solution.expires_at
    }

    // ============ Auction Type Accessors ============

    /// Get sealed bid auction type constant
    public fun auction_type_sealed_bid(): u8 {
        AUCTION_TYPE_SEALED_BID
    }

    /// Get Dutch auction type constant
    public fun auction_type_dutch(): u8 {
        AUCTION_TYPE_DUTCH
    }
}
