// ============================================================
// Event Types - Matching Contract Events
// ============================================================

import { IntentStatus, AuctionType } from './intent';

// ============================================================
// Core Intent Events
// ============================================================

// Emitted when a new intent is created
export interface IntentCreatedEvent {
  type: 'IntentCreated';
  intentId: number;
  user: string;
  inputToken: string;
  outputToken: string;
  amountIn: bigint;
  intentType: number;   // 0=Swap, 1=Limit, 2=TWAP, 3=DCA
  auctionType: number;  // 0=None, 1=SealedBid, 2=Dutch
  createdAt: number;
}

// Emitted when intent is cancelled
export interface IntentCancelledEvent {
  type: 'IntentCancelled';
  intentId: number;
  user: string;
  refundedAmount: bigint;
  cancelledAt: number;
}

// ============================================================
// Fill Events
// ============================================================

// Emitted when an intent is (partially) filled
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

// Emitted when an intent is fully completed
export interface IntentCompletedEvent {
  type: 'IntentCompleted';
  intentId: number;
  user: string;
  totalFills: number;
  totalInput: bigint;
  totalOutput: bigint;
  completedAt: number;
}

// Emitted when a TWAP/DCA chunk is executed
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

// Emitted when protocol fee is collected
export interface ProtocolFeeCollectedEvent {
  type: 'ProtocolFeeCollected';
  intentId: number;
  token: string;
  amount: bigint;
  treasury: string;
}

// ============================================================
// Auction Events
// ============================================================

// Emitted when a bid is submitted to sealed-bid auction
export interface BidSubmittedEvent {
  type: 'BidSubmitted';
  intentId: number;
  solver: string;
  outputAmount: bigint;
  submittedAt: number;
}

// Emitted when sealed-bid auction completes
export interface SealedBidCompletedEvent {
  type: 'SealedBidCompleted';
  intentId: number;
  winner: string;
  winningBid: bigint;
  totalBids: number;
  fillDeadline: number;
}

// Emitted when Dutch auction is accepted
export interface DutchAuctionAcceptedEvent {
  type: 'DutchAuctionAccepted';
  intentId: number;
  solver: string;
  acceptedPrice: bigint;
  acceptedAt: number;
}

// Emitted when auction fails (no bids, expired, winner didn't fill)
export interface AuctionFailedEvent {
  type: 'AuctionFailed';
  intentId: number;
  reason: number;  // 0=no bids, 1=dutch expired, 2=winner didn't fill
  failedAt: number;
}

// ============================================================
// Solver Registry Events
// ============================================================

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

// ============================================================
// Union Types
// ============================================================

export type VeloxEvent =
  | IntentCreatedEvent
  | IntentCancelledEvent
  | IntentFilledEvent
  | IntentCompletedEvent
  | ChunkExecutedEvent
  | ProtocolFeeCollectedEvent
  | BidSubmittedEvent
  | SealedBidCompletedEvent
  | DutchAuctionAcceptedEvent
  | AuctionFailedEvent
  | SolverRegisteredEvent
  | SolverStakeChangedEvent
  | SolverDeactivatedEvent;

// ============================================================
// Event Filtering
// ============================================================

export interface EventFilter {
  types?: VeloxEvent['type'][];
  intentIds?: number[];
  solvers?: string[];
  users?: string[];
  fromTimestamp?: number;
  toTimestamp?: number;
}

// ============================================================
// Raw Event Data (from contract)
// ============================================================

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

// ============================================================
// Event Parsing Helpers
// ============================================================

export function parseIntentFilledEvent(raw: RawIntentFilledEvent): IntentFilledEvent {
  return {
    type: 'IntentFilled',
    intentId: Number(raw.intent_id),
    user: raw.user,
    solver: raw.solver,
    inputAmount: BigInt(raw.input_amount),
    outputAmount: BigInt(raw.output_amount),
    isPartial: raw.is_partial,
    fillNumber: Number(raw.fill_number),
    protocolFee: BigInt(raw.protocol_fee),
    filledAt: Number(raw.filled_at),
  };
}

export function parseChunkExecutedEvent(raw: RawChunkExecutedEvent): ChunkExecutedEvent {
  return {
    type: 'ChunkExecuted',
    intentId: Number(raw.intent_id),
    chunkNumber: Number(raw.chunk_number),
    totalChunks: Number(raw.total_chunks),
    solver: raw.solver,
    inputAmount: BigInt(raw.input_amount),
    outputAmount: BigInt(raw.output_amount),
    executedAt: Number(raw.executed_at),
  };
}
