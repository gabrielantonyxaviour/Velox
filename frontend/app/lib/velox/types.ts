// Velox Intent Types - 4 core types

export type IntentType = 'swap' | 'limit_order' | 'twap' | 'dca';

// Auction Types
export enum AuctionType {
  SEALED_BID = 'sealed-bid',
  DUTCH = 'dutch',
}

export interface DutchAuctionParams {
  startPrice: bigint;
  endPrice: bigint;
  duration: number;
}

export interface DutchAuction {
  intentId: bigint;
  startTime: number;
  startPrice: bigint;
  endPrice: bigint;
  duration: number;
  isActive: boolean;
  winner: string | null;
  acceptedPrice: bigint;
}

// Sealed-bid auction bid entry
export interface AuctionBid {
  bidder: string;
  amount: bigint;       // Output amount the solver is offering
  timestamp: number;
  txHash?: string;
  isWinner?: boolean;
}

// Dutch auction price point for chart
export interface DutchPricePoint {
  timestamp: number;
  price: bigint;
  isBid?: boolean;      // True if a bid was placed at this point
  bidder?: string;
}

export type IntentStatus = 'pending' | 'partially_filled' | 'filled' | 'cancelled' | 'expired';

export interface IntentRecord {
  id: bigint;
  user: string;
  intentType: IntentType;
  inputToken: string;
  outputToken: string;
  amountIn: bigint;
  status: IntentStatus;
  filledAmount: bigint;
  createdAt: number;
  deadline?: number;
  solver?: string;
  executionPrice?: bigint;
  submissionTxHash?: string;
  settlementTxHash?: string;
  outputAmount?: bigint;
  // Type-specific fields
  minAmountOut?: bigint; // Swap
  limitPrice?: bigint; // LimitOrder
  partialFillAllowed?: boolean; // LimitOrder
  numChunks?: number; // TWAP
  chunksExecuted?: number; // TWAP
  intervalSeconds?: number; // TWAP, DCA
  maxSlippageBps?: number; // TWAP
  totalPeriods?: number; // DCA
  periodsExecuted?: number; // DCA
  amountPerPeriod?: bigint; // DCA
  // Auction fields
  auctionType?: 'sealed-bid' | 'dutch';
  auctionStatus?: 'active' | 'completed' | 'cancelled';
  // Extended auction fields
  auctionStartTime?: number;
  auctionEndTime?: number;
  auctionStartPrice?: bigint; // Dutch auction start price
  auctionEndPrice?: bigint; // Dutch auction end price
  auctionDuration?: number; // Dutch auction duration
  auctionCurrentPrice?: bigint; // Current Dutch price
  auctionWinner?: string;
  auctionAcceptedPrice?: bigint;
  bidCount?: number; // Sealed-bid auction
  bids?: AuctionBid[]; // Bid leaderboard for sealed-bid auctions
  dutchPriceHistory?: DutchPricePoint[]; // Price points for Dutch auction chart
  // Solver execution info
  solverReputation?: number;
  executionTime?: number; // seconds from submission to fill
  actualSlippageBps?: number; // actual slippage vs expected
}

/**
 * Parse Move contract status code to IntentStatus
 * Move enum order: Pending=0, PartiallyFilled=1, Filled=2, Cancelled=3, Expired=4
 */
export function parseIntentStatus(code: number): IntentStatus {
  switch (code) {
    case 0:
      return 'pending';
    case 1:
      return 'partially_filled';
    case 2:
      return 'filled';
    case 3:
      return 'cancelled';
    case 4:
      return 'expired';
    default:
      return 'pending';
  }
}

/**
 * Parse Move intent type from __variant__ string
 */
export function parseIntentType(variant: string): IntentType {
  const typeMap: Record<string, IntentType> = {
    Swap: 'swap',
    LimitOrder: 'limit_order',
    TWAP: 'twap',
    DCA: 'dca',
  };
  return typeMap[variant] || 'swap';
}

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
