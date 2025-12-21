import { EventEmitter } from 'events';
import { IntentRecord } from './types/intent';
import { FillParams, ChunkFillParams, FillResult, SolverStats, SwapRoute } from './types/solution';
export interface VeloxSolverConfig {
    rpcUrl: string;
    veloxAddress: string;
    /** Fee config address (defaults to veloxAddress) */
    feeConfigAddr?: string;
    /** Private key of the operator wallet (used for signing transactions) */
    privateKey?: string;
    /** Address where the solver is registered on-chain (can be different from operator wallet) */
    registeredSolverAddress?: string;
    graphqlUrl?: string;
    pollingInterval?: number;
    /** Skip processing intents that existed before the solver started */
    skipExistingOnStartup?: boolean;
    /** Shinami Node Service API key for enhanced RPC reliability */
    shinamiNodeKey?: string;
    /** Velox API URL for recording transactions (e.g., https://velox.app or http://localhost:3001) */
    veloxApiUrl?: string;
}
export declare class VeloxSolver extends EventEmitter {
    private client;
    private graphql?;
    private veloxAddress;
    private feeConfigAddr;
    private isRunning;
    private pollingInterval;
    private skipExistingOnStartup;
    private registeredSolverAddress?;
    private veloxApiUrl?;
    constructor(config: VeloxSolverConfig);
    getActiveIntents(): Promise<IntentRecord[]>;
    getIntent(intentId: number): Promise<IntentRecord | null>;
    startIntentStream(callback: (record: IntentRecord) => void): Promise<void>;
    stopIntentStream(): void;
    /**
     * Validate that solver is registered with stake before starting
     * Fetches and displays solver metadata
     */
    validateSolverRegistration(): Promise<void>;
    /**
     * Fill a swap intent (partial or full)
     * Uses settlement::fill_swap
     */
    fillSwap(params: FillParams): Promise<FillResult>;
    /**
     * Fill a limit order (partial or full)
     * Uses settlement::fill_limit_order
     */
    fillLimitOrder(params: FillParams): Promise<FillResult>;
    /**
     * Fill a TWAP chunk
     * Uses settlement::fill_twap_chunk
     */
    fillTwapChunk(params: ChunkFillParams): Promise<FillResult>;
    /**
     * Fill a DCA period
     * Uses settlement::fill_dca_period
     */
    fillDcaPeriod(params: ChunkFillParams): Promise<FillResult>;
    /**
     * Record a taker transaction in the Velox API (Supabase)
     * Called automatically after successful fills if veloxApiUrl is configured
     */
    recordTakerTransaction(intentId: number, txHash: string, fillAmount?: bigint): Promise<void>;
    /**
     * Check if solver can fill an intent
     */
    canFill(intentId: number): Promise<boolean>;
    /**
     * Calculate minimum output for a partial fill
     */
    calculateMinOutput(intentId: number, fillInput: bigint): Promise<bigint>;
    /**
     * Get current Dutch auction price
     */
    getDutchPrice(intentId: number): Promise<bigint>;
    /**
     * Get auction winner
     */
    getAuctionWinner(intentId: number): Promise<{
        hasWinner: boolean;
        winner: string;
    }>;
    /**
     * Get fee basis points
     */
    getFeeBps(): Promise<number>;
    /**
     * Submit a bid to a sealed-bid auction
     */
    submitBid(intentId: number, outputAmount: bigint): Promise<FillResult>;
    /**
     * Accept a Dutch auction at current price
     */
    acceptDutchAuction(intentId: number): Promise<FillResult>;
    /**
     * Complete a sealed-bid auction (after end time)
     */
    completeSealedBid(intentId: number): Promise<FillResult>;
    findBestRoute(tokenIn: string, tokenOut: string, amountIn: bigint): Promise<SwapRoute>;
    getSolverStats(address?: string): Promise<SolverStats>;
    private pollIntents;
    private parseIntentRecord;
    private parseIntent;
    private parseAuctionState;
    private parseSolverStats;
}
//# sourceMappingURL=VeloxSolver.d.ts.map