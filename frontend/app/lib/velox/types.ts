// ============================================================
// Velox Frontend Types - Matching Move 2.0 Contract Interfaces
// ============================================================

// Intent Type - matches contract Intent enum variants
export type IntentType = 'swap' | 'limit_order' | 'twap' | 'dca';

// Intent Status - matches contract IntentStatus enum
// Note: ACTIVE replaces PENDING, no separate PARTIALLY_FILLED (use escrowRemaining)
export type IntentStatus = 'active' | 'filled' | 'cancelled' | 'expired';

// Auction Type - matches contract AuctionState enum variants
export type AuctionType =
  | 'none'
  | 'sealed_bid_active'
  | 'sealed_bid_completed'
  | 'dutch_active'
  | 'dutch_accepted'
  | 'failed';

// Auction type constants for use as values (like enum)
// Use for form selection where only SEALED_BID or DUTCH is valid
export const AUCTION_TYPE = {
  SEALED_BID: 'sealed_bid' as const,
  DUTCH: 'dutch' as const,
};

export type AuctionFormType = (typeof AUCTION_TYPE)[keyof typeof AUCTION_TYPE];

// ============================================================
// Core Types - Matching Contract Structs
// ============================================================

// Fill record - matches contract Fill struct + indexer data
export interface Fill {
  solver: string;
  inputAmount: bigint;
  outputAmount: bigint;
  filledAt: number;
  // Added by indexer
  txHash?: string;
  chunkNumber?: number;
}

// Bid for sealed-bid auctions - matches contract Bid struct
export interface Bid {
  solver: string;
  outputAmount: bigint;
  submittedAt: number;
  // Added by indexer/API
  txHash?: string;
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
  startTime?: number;
  duration?: number;
  // DutchAccepted
  acceptedPrice?: bigint;
  acceptedBy?: string;
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
// Intent Record - Main data structure from contract
// ============================================================

// Full intent record - matches contract IntentRecord struct
export interface IntentRecord {
  id: bigint;
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
  // Added by frontend when submitting intent
  submitTxHash?: string;
}

// ============================================================
// Solver Info - Matching contract SolverInfo struct
// ============================================================

export interface SolverInfo {
  address: string;
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
// Display & UI Helper Types
// ============================================================

// Token information for UI
export interface TokenInfo {
  address: string;
  symbol: string;
  decimals: number;
  name?: string;
  logoUri?: string;
}

// Dutch auction price point for chart
export interface DutchPricePoint {
  timestamp: number;
  price: bigint;
  isBid?: boolean;
  bidder?: string;
}

// ============================================================
// Parsing Functions - Move Enum to TypeScript
// ============================================================

/**
 * Parse Move contract status variant to IntentStatus
 * Move enum: Active, Filled, Cancelled, Expired
 */
export function parseIntentStatus(variant: { type?: string } | string): IntentStatus {
  const type = typeof variant === 'string' ? variant : variant.type || '';
  const normalized = type.toLowerCase();

  if (normalized.includes('active')) return 'active';
  if (normalized.includes('filled')) return 'filled';
  if (normalized.includes('cancelled')) return 'cancelled';
  if (normalized.includes('expired')) return 'expired';
  return 'active';
}

/**
 * Parse Move intent type from variant
 */
export function parseIntentType(variant: { type?: string } | string): IntentType {
  const type = typeof variant === 'string' ? variant : variant.type || '';

  if (type.includes('Swap')) return 'swap';
  if (type.includes('LimitOrder')) return 'limit_order';
  if (type.includes('TWAP')) return 'twap';
  if (type.includes('DCA')) return 'dca';
  return 'swap';
}

/**
 * Parse Move auction state variant
 */
export function parseAuctionType(variant: { type?: string } | string): AuctionType {
  const type = typeof variant === 'string' ? variant : variant.type || '';

  if (type.includes('None')) return 'none';
  if (type.includes('SealedBidActive')) return 'sealed_bid_active';
  if (type.includes('SealedBidCompleted')) return 'sealed_bid_completed';
  if (type.includes('DutchActive')) return 'dutch_active';
  if (type.includes('DutchAccepted')) return 'dutch_accepted';
  if (type.includes('Failed')) return 'failed';
  return 'none';
}

// ============================================================
// Display Helper Functions
// ============================================================

/**
 * Get display name for intent type
 */
export function getIntentTypeDisplay(type: IntentType): string {
  const displayMap: Record<IntentType, string> = {
    swap: 'Swap',
    limit_order: 'Limit Order',
    twap: 'TWAP',
    dca: 'DCA',
  };
  return displayMap[type];
}

/**
 * Get display name for intent status
 */
export function getStatusDisplay(status: IntentStatus): string {
  const displayMap: Record<IntentStatus, string> = {
    active: 'Active',
    filled: 'Filled',
    cancelled: 'Cancelled',
    expired: 'Expired',
  };
  return displayMap[status];
}

/**
 * Get status color class for UI
 */
export function getStatusColorClass(status: IntentStatus): string {
  const colorMap: Record<IntentStatus, string> = {
    active: 'text-blue-400',
    filled: 'text-green-400',
    cancelled: 'text-gray-400',
    expired: 'text-red-400',
  };
  return colorMap[status];
}

/**
 * Get auction type display name
 */
export function getAuctionTypeDisplay(type: AuctionType): string {
  const displayMap: Record<AuctionType, string> = {
    none: 'Direct Fill',
    sealed_bid_active: 'Sealed Bid (Active)',
    sealed_bid_completed: 'Sealed Bid (Completed)',
    dutch_active: 'Dutch Auction',
    dutch_accepted: 'Dutch (Accepted)',
    failed: 'Auction Failed',
  };
  return displayMap[type];
}

// ============================================================
// Intent Analysis Helper Functions
// ============================================================

/**
 * Check if intent is partially filled
 */
export function isPartiallyFilled(record: IntentRecord): boolean {
  if (record.status !== 'active') return false;
  const totalAmount = getIntentTotalAmount(record.intent);
  return record.escrowRemaining < totalAmount && record.escrowRemaining > 0n;
}

/**
 * Get fill percentage (0-100)
 */
export function getFillPercentage(record: IntentRecord): number {
  const totalAmount = getIntentTotalAmount(record.intent);
  if (totalAmount === 0n) return 0;
  const filled = totalAmount - record.escrowRemaining;
  return Number((filled * 100n) / totalAmount);
}

/**
 * Get total amount for any intent type
 */
export function getIntentTotalAmount(intent: Intent): bigint {
  switch (intent.type) {
    case 'swap':
    case 'limit_order':
      return intent.amountIn ?? 0n;
    case 'twap':
      return intent.totalAmount ?? 0n;
    case 'dca':
      return (intent.amountPerPeriod ?? 0n) * BigInt(intent.totalPeriods ?? 0);
    default:
      return 0n;
  }
}

/**
 * Get filled amount from escrow remaining
 */
export function getFilledAmount(record: IntentRecord): bigint {
  const totalAmount = getIntentTotalAmount(record.intent);
  return totalAmount - record.escrowRemaining;
}

/**
 * Check if intent is a scheduled type (TWAP or DCA)
 */
export function isScheduledIntent(intent: Intent): boolean {
  return intent.type === 'twap' || intent.type === 'dca';
}

/**
 * Get remaining chunks/periods for scheduled intents
 */
export function getRemainingChunks(record: IntentRecord): number {
  const intent = record.intent;
  if (intent.type === 'twap') {
    return (intent.numChunks ?? 0) - record.chunksExecuted;
  }
  if (intent.type === 'dca') {
    return (intent.totalPeriods ?? 0) - record.chunksExecuted;
  }
  return 0;
}

/**
 * Check if next chunk/period is ready for execution
 */
export function isNextChunkReady(record: IntentRecord): boolean {
  if (!isScheduledIntent(record.intent)) return false;
  return Date.now() / 1000 >= record.nextExecution;
}

/**
 * Get time until next chunk execution
 */
export function getTimeUntilNextChunk(record: IntentRecord): number {
  if (!isScheduledIntent(record.intent)) return 0;
  const now = Date.now() / 1000;
  return Math.max(0, record.nextExecution - now);
}

/**
 * Check if auction is active
 */
export function isAuctionActive(record: IntentRecord): boolean {
  return (
    record.auction.type === 'sealed_bid_active' ||
    record.auction.type === 'dutch_active'
  );
}

/**
 * Check if intent has a sealed-bid auction
 */
export function isSealedBidAuction(record: IntentRecord): boolean {
  return (
    record.auction.type === 'sealed_bid_active' ||
    record.auction.type === 'sealed_bid_completed'
  );
}

/**
 * Check if intent has a Dutch auction
 */
export function isDutchAuction(record: IntentRecord): boolean {
  return (
    record.auction.type === 'dutch_active' ||
    record.auction.type === 'dutch_accepted'
  );
}

/**
 * Check if intent has any auction mechanism
 */
export function hasAuction(record: IntentRecord): boolean {
  return record.auction.type !== 'none' && record.auction.type !== 'failed';
}

/**
 * Check if intent can be filled directly
 */
export function canDirectFill(record: IntentRecord): boolean {
  return record.status === 'active' && record.auction.type === 'none';
}

/**
 * Get average execution price from fills
 */
export function getAverageExecutionPrice(record: IntentRecord): bigint | null {
  if (record.fills.length === 0) return null;

  const totalInput = record.fills.reduce((sum, f) => sum + f.inputAmount, 0n);
  const totalOutput = record.fills.reduce((sum, f) => sum + f.outputAmount, 0n);

  if (totalInput === 0n) return null;
  return (totalOutput * 10000n) / totalInput; // Price in basis points
}

// ============================================================
// Constants
// ============================================================

export const MAX_FILLS_PER_INTENT = 5;
export const PROTOCOL_FEE_BPS = 30; // 0.3%
export const BPS_DENOMINATOR = 10000;

/**
 * Calculate protocol fee from amount
 */
export function calculateProtocolFee(amount: bigint): bigint {
  return (amount * BigInt(PROTOCOL_FEE_BPS)) / BigInt(BPS_DENOMINATOR);
}
