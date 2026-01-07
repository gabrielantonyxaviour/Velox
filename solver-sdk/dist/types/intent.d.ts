export declare enum AuctionType {
    SEALED_BID = 0,
    DUTCH = 1
}
export interface Intent {
    id: string;
    type: IntentType;
    auctionType?: AuctionType;
    user: string;
    inputToken: TokenInfo;
    outputToken: TokenInfo;
    inputAmount: bigint;
    minOutputAmount?: bigint;
    deadline: Date;
    status: IntentStatus;
    createdAt: Date;
    limitPrice?: bigint;
    partialFillAllowed?: boolean;
    numChunks?: number;
    interval?: number;
    amountPerPeriod?: bigint;
    totalPeriods?: number;
    executedPeriods?: number;
    nextExecution?: Date;
    totalAmount?: bigint;
    maxSlippageBps?: number;
    startTime?: Date;
}
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
export declare enum IntentType {
    SWAP = "SWAP",
    LIMIT_ORDER = "LIMIT_ORDER",
    TWAP = "TWAP",
    DCA = "DCA"
}
export declare enum IntentStatus {
    PENDING = "PENDING",
    PARTIALLY_FILLED = "PARTIALLY_FILLED",
    FILLED = "FILLED",
    CANCELLED = "CANCELLED",
    EXPIRED = "EXPIRED"
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
//# sourceMappingURL=intent.d.ts.map