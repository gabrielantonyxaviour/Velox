export declare enum IntentStatus {
    ACTIVE = "ACTIVE",// Intent can be filled (was PENDING)
    FILLED = "FILLED",// Fully filled
    CANCELLED = "CANCELLED",// Cancelled by user
    EXPIRED = "EXPIRED"
}
export declare enum IntentType {
    SWAP = "SWAP",
    LIMIT_ORDER = "LIMIT_ORDER",
    TWAP = "TWAP",
    DCA = "DCA"
}
export declare enum AuctionType {
    NONE = "NONE",
    SEALED_BID_ACTIVE = "SEALED_BID_ACTIVE",
    SEALED_BID_COMPLETED = "SEALED_BID_COMPLETED",
    DUTCH_ACTIVE = "DUTCH_ACTIVE",
    DUTCH_ACCEPTED = "DUTCH_ACCEPTED",
    FAILED = "FAILED"
}
export interface Fill {
    solver: string;
    inputAmount: bigint;
    outputAmount: bigint;
    filledAt: number;
}
export interface Bid {
    solver: string;
    outputAmount: bigint;
    submittedAt: number;
}
export interface AuctionState {
    type: AuctionType;
    endTime?: number;
    bids?: Bid[];
    winner?: string;
    winningBid?: bigint;
    fillDeadline?: number;
    startPrice?: bigint;
    endPrice?: bigint;
    acceptedPrice?: bigint;
}
export interface TokenInfo {
    address: string;
    symbol: string;
    decimals: number;
}
export interface IntentRecord {
    id: number;
    user: string;
    createdAt: number;
    intent: Intent;
    auction: AuctionState;
    status: IntentStatus;
    escrowRemaining: bigint;
    totalOutputReceived: bigint;
    fills: Fill[];
    chunksExecuted: number;
    nextExecution: number;
}
export interface Intent {
    type: IntentType;
    inputToken: string;
    outputToken: string;
    amountIn?: bigint;
    minAmountOut?: bigint;
    deadline?: number;
    limitPrice?: bigint;
    expiry?: number;
    totalAmount?: bigint;
    numChunks?: number;
    intervalSeconds?: number;
    maxSlippageBps?: number;
    startTime?: number;
    amountPerPeriod?: bigint;
    totalPeriods?: number;
}
export interface SolverInfo {
    metadataUri: string;
    stake: bigint;
    pendingUnstake: bigint;
    unstakeAvailableAt: number;
    isActive: boolean;
    registeredAt: number;
    lastActive: number;
    reputationScore: number;
    successfulFills: number;
    failedFills: number;
    totalVolume: bigint;
}
export interface RawIntentRecord {
    id: string;
    user: string;
    created_at: string;
    intent: RawIntent;
    auction: RawAuctionState;
    status: {
        type: string;
    };
    escrow_remaining: string;
    total_output_received: string;
    fills: RawFill[];
    chunks_executed: string;
    next_execution: string;
}
export interface RawIntent {
    type: string;
    input_token?: string;
    output_token?: string;
    amount_in?: string;
    min_amount_out?: string;
    deadline?: string;
    limit_price?: string;
    expiry?: string;
    total_amount?: string;
    num_chunks?: string;
    interval_seconds?: string;
    max_slippage_bps?: string;
    start_time?: string;
    amount_per_period?: string;
    total_periods?: string;
}
export interface RawAuctionState {
    type: string;
    end_time?: string;
    bids?: RawBid[];
    winner?: string;
    winning_bid?: string;
    fill_deadline?: string;
    start_price?: string;
    end_price?: string;
    accepted_price?: string;
}
export interface RawBid {
    solver: string;
    output_amount: string;
    submitted_at: string;
}
export interface RawFill {
    solver: string;
    input_amount: string;
    output_amount: string;
    filled_at: string;
}
export interface RawSolverInfo {
    metadata_uri: string;
    stake: string;
    pending_unstake: string;
    unstake_available_at: string;
    is_active: boolean;
    registered_at: string;
    last_active: string;
    reputation_score: string;
    successful_fills: string;
    failed_fills: string;
    total_volume: string;
}
export declare function isPartiallyFilled(record: IntentRecord): boolean;
export declare function getFillPercentage(record: IntentRecord): number;
export declare function getIntentTotalAmount(intent: Intent): bigint;
export declare function isScheduledIntent(intent: Intent): boolean;
export declare function getRemainingChunks(record: IntentRecord): number;
export declare function isNextChunkReady(record: IntentRecord): boolean;
export declare function parseIntentStatus(variant: {
    type: string;
}): IntentStatus;
export declare function parseAuctionType(variant: {
    type: string;
}): AuctionType;
export declare function parseIntentType(variant: {
    type: string;
}): IntentType;
//# sourceMappingURL=intent.d.ts.map