import { EventEmitter } from 'events';
import { Intent, DutchAuction } from './types/intent';
import { Solution, SolutionResult, SwapRoute, SolverStats } from './types/solution';
export interface VeloxSolverConfig {
    rpcUrl: string;
    veloxAddress: string;
    privateKey?: string;
    graphqlUrl?: string;
    pollingInterval?: number;
    /** Skip processing intents that existed before the solver started */
    skipExistingOnStartup?: boolean;
}
export declare class VeloxSolver extends EventEmitter {
    private client;
    private graphql?;
    private veloxAddress;
    private isRunning;
    private pollingInterval;
    private skipExistingOnStartup;
    constructor(config: VeloxSolverConfig);
    getPendingIntents(): Promise<Intent[]>;
    getIntent(intentId: string): Promise<Intent | null>;
    startIntentStream(callback: (intent: Intent) => void): void;
    stopIntentStream(): void;
    submitSolution(solution: Solution): Promise<SolutionResult>;
    executeSettlement(intentId: string): Promise<SolutionResult>;
    /**
     * Solve a swap intent by directly providing output tokens
     * Calls settlement::solve_swap which transfers:
     * - Output tokens from solver to user
     * - Input tokens from escrow to solver
     */
    solveSwap(intentId: string, outputAmount: bigint): Promise<SolutionResult>;
    /**
     * Solve a limit order intent (supports partial fills)
     * Calls settlement::solve_limit_order which:
     * - Validates price meets limit_price constraint
     * - Transfers output tokens from solver to user
     * - Transfers fill_amount of input tokens from escrow to solver
     */
    solveLimitOrder(intentId: string, fillAmount: bigint, outputAmount: bigint): Promise<SolutionResult>;
    /**
     * Solve a DCA period by directly providing output tokens
     * Calls settlement::solve_dca_period which transfers:
     * - Output tokens from solver to user
     * - Period's input tokens from escrow to solver
     */
    solveDCAPeriod(intentId: string, outputAmount: bigint, scheduledRegistryAddr?: string): Promise<SolutionResult>;
    /**
     * Solve a TWAP chunk by directly providing output tokens
     * Calls settlement::solve_twap_chunk which transfers:
     * - Output tokens from solver to user
     * - Chunk's input tokens from escrow to solver
     */
    solveTWAPChunk(intentId: string, outputAmount: bigint, scheduledRegistryAddr?: string): Promise<SolutionResult>;
    /**
     * Check if a TWAP chunk is ready for execution
     */
    isTWAPChunkReady(intentId: string, scheduledRegistryAddr?: string): Promise<boolean>;
    /**
     * Check if a DCA period is ready for execution
     */
    isDCAPeriodReady(intentId: string, scheduledRegistryAddr?: string): Promise<boolean>;
    /**
     * Check if a DCA/TWAP is completed
     */
    isScheduledCompleted(intentId: string, scheduledRegistryAddr?: string): Promise<boolean>;
    /**
     * Get the number of periods/chunks executed for a scheduled intent
     */
    getExecutedPeriods(intentId: string, scheduledRegistryAddr?: string): Promise<number>;
    /**
     * Check if a limit order can be filled at current market price
     * Returns the execution price if fillable, null otherwise
     */
    canFillLimitOrder(intent: Intent): Promise<{
        canFill: boolean;
        executionPrice: bigint;
        outputAmount: bigint;
    }>;
    calculateOptimalSolution(intent: Intent): Promise<Solution>;
    findBestRoute(tokenIn: string, tokenOut: string, amountIn: bigint): Promise<SwapRoute>;
    getDutchAuction(intentId: string): Promise<DutchAuction | null>;
    getDutchPrice(intentId: string): Promise<bigint>;
    isDutchActive(intentId: string): Promise<boolean>;
    getActiveDutchCount(): Promise<bigint>;
    acceptDutchAuction(intentId: string): Promise<SolutionResult>;
    settleDutchAuction(intentId: string): Promise<SolutionResult>;
    /**
     * Calculate time until Dutch price reaches target price
     */
    calculateTimeToPrice(dutch: DutchAuction, targetPrice: bigint): bigint;
    /**
     * Monitor Dutch auction and accept when price reaches threshold
     */
    monitorAndAcceptDutch(intentId: string, maxPrice: bigint, pollIntervalMs?: number): Promise<{
        txHash: string;
        price: bigint;
    } | null>;
    getSolverStats(address?: string): Promise<SolverStats>;
    private pollIntents;
    private parseIntents;
    private parseIntent;
    private parseSolverStats;
}
//# sourceMappingURL=VeloxSolver.d.ts.map