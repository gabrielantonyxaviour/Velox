// ============================================================
// Intent Types - Matching Move 2.0 Contract Interfaces
// ============================================================

// Intent Status - matches contract IntentStatus enum
export enum IntentStatus {
  ACTIVE = 'ACTIVE',           // Intent can be filled (was PENDING)
  FILLED = 'FILLED',           // Fully filled
  CANCELLED = 'CANCELLED',     // Cancelled by user
  EXPIRED = 'EXPIRED',         // Deadline passed
}

// Intent Type - matches contract Intent enum variants
export enum IntentType {
  SWAP = 'SWAP',
  LIMIT_ORDER = 'LIMIT_ORDER',
  TWAP = 'TWAP',
  DCA = 'DCA',
}

// Auction Type - matches contract AuctionState enum variants
export enum AuctionType {
  NONE = 'NONE',
  SEALED_BID_ACTIVE = 'SEALED_BID_ACTIVE',
  SEALED_BID_COMPLETED = 'SEALED_BID_COMPLETED',
  DUTCH_ACTIVE = 'DUTCH_ACTIVE',
  DUTCH_ACCEPTED = 'DUTCH_ACCEPTED',
  FAILED = 'FAILED',
}

// ============================================================
// Core Types - Matching Contract Structs
// ============================================================

// Fill record - matches contract Fill struct
export interface Fill {
  solver: string;
  inputAmount: bigint;
  outputAmount: bigint;
  filledAt: number;
}

// Bid for sealed-bid auctions - matches contract Bid struct
export interface Bid {
  solver: string;
  outputAmount: bigint;
  submittedAt: number;
}

// Auction state - matches contract AuctionState enum
export interface AuctionState {
  type: AuctionType;
  // SealedBidActive
  endTime?: number;
  bids?: Bid[];
  // SealedBidCompleted
  winner?: string;
  winningBid?: bigint;
  fillDeadline?: number;
  // DutchActive
  startPrice?: bigint;
  endPrice?: bigint;
  // DutchAccepted
  acceptedPrice?: bigint;
}

// Token information
export interface TokenInfo {
  address: string;
  symbol: string;
  decimals: number;
}

// ============================================================
// Intent Record - Main data structure from contract
// ============================================================

// Full intent record - matches contract IntentRecord struct
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

// Intent details based on type
export interface Intent {
  type: IntentType;
  inputToken: string;
  outputToken: string;

  // Swap fields
  amountIn?: bigint;
  minAmountOut?: bigint;
  deadline?: number;

  // LimitOrder fields
  limitPrice?: bigint;
  expiry?: number;

  // TWAP fields
  totalAmount?: bigint;
  numChunks?: number;
  intervalSeconds?: number;
  maxSlippageBps?: number;
  startTime?: number;

  // DCA fields
  amountPerPeriod?: bigint;
  totalPeriods?: number;
}

// ============================================================
// Solver Info - Matching contract SolverInfo struct
// ============================================================

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

// ============================================================
// Raw Data Interfaces - For parsing contract responses
// ============================================================

export interface RawIntentRecord {
  id: string;
  user: string;
  created_at: string;
  intent: RawIntent;
  auction: RawAuctionState;
  status: { type: string };
  escrow_remaining: string;
  total_output_received: string;
  fills: RawFill[];
  chunks_executed: string;
  next_execution: string;
}

export interface RawIntent {
  type: string;
  // Swap variant
  input_token?: string;
  output_token?: string;
  amount_in?: string;
  min_amount_out?: string;
  deadline?: string;
  // LimitOrder variant
  limit_price?: string;
  expiry?: string;
  // TWAP variant
  total_amount?: string;
  num_chunks?: string;
  interval_seconds?: string;
  max_slippage_bps?: string;
  start_time?: string;
  // DCA variant
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

// ============================================================
// Helper Functions
// ============================================================

// Check if intent is partially filled
export function isPartiallyFilled(record: IntentRecord): boolean {
  if (record.status !== IntentStatus.ACTIVE) return false;
  const totalAmount = getIntentTotalAmount(record.intent);
  return record.escrowRemaining < totalAmount && record.escrowRemaining > 0n;
}

// Get fill percentage
export function getFillPercentage(record: IntentRecord): number {
  const totalAmount = getIntentTotalAmount(record.intent);
  if (totalAmount === 0n) return 0;
  const filled = totalAmount - record.escrowRemaining;
  return Number((filled * 100n) / totalAmount);
}

// Get total amount for any intent type
export function getIntentTotalAmount(intent: Intent): bigint {
  switch (intent.type) {
    case IntentType.SWAP:
    case IntentType.LIMIT_ORDER:
      return intent.amountIn ?? 0n;
    case IntentType.TWAP:
      return intent.totalAmount ?? 0n;
    case IntentType.DCA:
      return (intent.amountPerPeriod ?? 0n) * BigInt(intent.totalPeriods ?? 0);
    default:
      return 0n;
  }
}

// Check if intent is a scheduled type (TWAP or DCA)
export function isScheduledIntent(intent: Intent): boolean {
  return intent.type === IntentType.TWAP || intent.type === IntentType.DCA;
}

// Get remaining chunks/periods for scheduled intents
export function getRemainingChunks(record: IntentRecord): number {
  const intent = record.intent;
  if (intent.type === IntentType.TWAP) {
    return (intent.numChunks ?? 0) - record.chunksExecuted;
  }
  if (intent.type === IntentType.DCA) {
    return (intent.totalPeriods ?? 0) - record.chunksExecuted;
  }
  return 0;
}

// Check if next chunk/period is ready
export function isNextChunkReady(record: IntentRecord): boolean {
  if (!isScheduledIntent(record.intent)) return false;
  return Date.now() / 1000 >= record.nextExecution;
}

// Parse status from contract variant
export function parseIntentStatus(variant: { type: string }): IntentStatus {
  const type = variant.type.toLowerCase();
  if (type.includes('active')) return IntentStatus.ACTIVE;
  if (type.includes('filled')) return IntentStatus.FILLED;
  if (type.includes('cancelled')) return IntentStatus.CANCELLED;
  if (type.includes('expired')) return IntentStatus.EXPIRED;
  return IntentStatus.ACTIVE;
}

// Parse auction type from contract variant
export function parseAuctionType(variant: { type: string }): AuctionType {
  const type = variant.type;
  if (type.includes('None')) return AuctionType.NONE;
  if (type.includes('SealedBidActive')) return AuctionType.SEALED_BID_ACTIVE;
  if (type.includes('SealedBidCompleted')) return AuctionType.SEALED_BID_COMPLETED;
  if (type.includes('DutchActive')) return AuctionType.DUTCH_ACTIVE;
  if (type.includes('DutchAccepted')) return AuctionType.DUTCH_ACCEPTED;
  if (type.includes('Failed')) return AuctionType.FAILED;
  return AuctionType.NONE;
}

// Parse intent type from contract variant
export function parseIntentType(variant: { type: string }): IntentType {
  const type = variant.type;
  if (type.includes('Swap')) return IntentType.SWAP;
  if (type.includes('LimitOrder')) return IntentType.LIMIT_ORDER;
  if (type.includes('TWAP')) return IntentType.TWAP;
  if (type.includes('DCA')) return IntentType.DCA;
  return IntentType.SWAP;
}
