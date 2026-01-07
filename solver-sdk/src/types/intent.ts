// Auction type for intent processing
export enum AuctionType {
  SEALED_BID = 0,
  DUTCH = 1,
}

export interface Intent {
  id: string;
  type: IntentType;
  auctionType?: AuctionType; // Type of auction mechanism
  user: string;
  inputToken: TokenInfo;
  outputToken: TokenInfo;
  inputAmount: bigint;
  minOutputAmount?: bigint;
  deadline: Date;
  status: IntentStatus;
  createdAt: Date;

  // Type-specific fields
  limitPrice?: bigint; // For LimitOrder
  partialFillAllowed?: boolean;
  numChunks?: number; // For TWAP
  interval?: number; // For TWAP/DCA (interval_seconds)

  // DCA-specific fields
  amountPerPeriod?: bigint; // Amount to spend each period
  totalPeriods?: number; // Total number of periods
  executedPeriods?: number; // Number of periods already executed
  nextExecution?: Date; // When the next period should execute

  // TWAP-specific fields
  totalAmount?: bigint; // Total amount to swap
  maxSlippageBps?: number; // Max slippage per chunk in basis points
  startTime?: Date; // When TWAP starts
}

// Dutch Auction state
export interface DutchAuction {
  intentId: bigint;
  startTime: bigint;
  startPrice: bigint;
  endPrice: bigint;
  duration: bigint;
  isActive: boolean;
  winner: string | null;
  acceptedPrice: bigint;
}

export enum IntentType {
  SWAP = 'SWAP',
  LIMIT_ORDER = 'LIMIT_ORDER',
  TWAP = 'TWAP',
  DCA = 'DCA',
}

export enum IntentStatus {
  PENDING = 'PENDING',
  PARTIALLY_FILLED = 'PARTIALLY_FILLED',
  FILLED = 'FILLED',
  CANCELLED = 'CANCELLED',
  EXPIRED = 'EXPIRED',
}

export interface TokenInfo {
  address: string;
  symbol: string;
  decimals: number;
}

export interface RawIntentData {
  id: string;
  type: number;
  user: string;
  input_coin: string;
  output_coin: string;
  amount_in: string;
  min_amount_out: string;
  deadline: string;
  status: number;
  created_at: string;
  limit_price?: string;
  partial_fill?: boolean;
  num_chunks?: string;
  interval?: string;
}
