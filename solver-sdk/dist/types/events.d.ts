export interface IntentCreatedEvent {
    type: 'IntentCreated';
    intentId: number;
    user: string;
    inputToken: string;
    outputToken: string;
    amountIn: bigint;
    intentType: number;
    auctionType: number;
    createdAt: number;
}
export interface IntentCancelledEvent {
    type: 'IntentCancelled';
    intentId: number;
    user: string;
    refundedAmount: bigint;
    cancelledAt: number;
}
export interface IntentFilledEvent {
    type: 'IntentFilled';
    intentId: number;
    user: string;
    solver: string;
    inputAmount: bigint;
    outputAmount: bigint;
    isPartial: boolean;
    fillNumber: number;
    protocolFee: bigint;
    filledAt: number;
}
export interface IntentCompletedEvent {
    type: 'IntentCompleted';
    intentId: number;
    user: string;
    totalFills: number;
    totalInput: bigint;
    totalOutput: bigint;
    completedAt: number;
}
export interface ChunkExecutedEvent {
    type: 'ChunkExecuted';
    intentId: number;
    chunkNumber: number;
    totalChunks: number;
    solver: string;
    inputAmount: bigint;
    outputAmount: bigint;
    executedAt: number;
}
export interface ProtocolFeeCollectedEvent {
    type: 'ProtocolFeeCollected';
    intentId: number;
    token: string;
    amount: bigint;
    treasury: string;
}
export interface BidSubmittedEvent {
    type: 'BidSubmitted';
    intentId: number;
    solver: string;
    outputAmount: bigint;
    submittedAt: number;
}
export interface SealedBidCompletedEvent {
    type: 'SealedBidCompleted';
    intentId: number;
    winner: string;
    winningBid: bigint;
    totalBids: number;
    fillDeadline: number;
}
export interface DutchAuctionAcceptedEvent {
    type: 'DutchAuctionAccepted';
    intentId: number;
    solver: string;
    acceptedPrice: bigint;
    acceptedAt: number;
}
export interface AuctionFailedEvent {
    type: 'AuctionFailed';
    intentId: number;
    reason: number;
    failedAt: number;
}
export interface SolverRegisteredEvent {
    type: 'SolverRegistered';
    solver: string;
    metadataUri: string;
    initialStake: bigint;
    registeredAt: number;
}
export interface SolverStakeChangedEvent {
    type: 'SolverStakeChanged';
    solver: string;
    oldStake: bigint;
    newStake: bigint;
    timestamp: number;
}
export interface SolverDeactivatedEvent {
    type: 'SolverDeactivated';
    solver: string;
    timestamp: number;
}
export type VeloxEvent = IntentCreatedEvent | IntentCancelledEvent | IntentFilledEvent | IntentCompletedEvent | ChunkExecutedEvent | ProtocolFeeCollectedEvent | BidSubmittedEvent | SealedBidCompletedEvent | DutchAuctionAcceptedEvent | AuctionFailedEvent | SolverRegisteredEvent | SolverStakeChangedEvent | SolverDeactivatedEvent;
export interface EventFilter {
    types?: VeloxEvent['type'][];
    intentIds?: number[];
    solvers?: string[];
    users?: string[];
    fromTimestamp?: number;
    toTimestamp?: number;
}
export interface RawIntentFilledEvent {
    intent_id: string;
    user: string;
    solver: string;
    input_amount: string;
    output_amount: string;
    is_partial: boolean;
    fill_number: string;
    protocol_fee: string;
    filled_at: string;
}
export interface RawChunkExecutedEvent {
    intent_id: string;
    chunk_number: string;
    total_chunks: string;
    solver: string;
    input_amount: string;
    output_amount: string;
    executed_at: string;
}
export interface RawBidSubmittedEvent {
    intent_id: string;
    solver: string;
    output_amount: string;
    submitted_at: string;
}
export declare function parseIntentFilledEvent(raw: RawIntentFilledEvent): IntentFilledEvent;
export declare function parseChunkExecutedEvent(raw: RawChunkExecutedEvent): ChunkExecutedEvent;
//# sourceMappingURL=events.d.ts.map