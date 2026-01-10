export interface FillParams {
    intentId: number;
    fillInput: bigint;
    outputAmount: bigint;
}
export interface ChunkFillParams {
    intentId: number;
    outputAmount: bigint;
}
export interface Solution {
    intentId: number;
    outputAmount: bigint;
    executionPrice: bigint;
    route?: SwapRoute;
    expiresAt: Date;
}
export interface SwapRoute {
    steps: RouteStep[];
    expectedOutput: bigint;
    priceImpact: number;
}
export interface RouteStep {
    dexId: number;
    poolAddress: string;
    tokenIn: string;
    tokenOut: string;
    amountIn: bigint;
    expectedOut: bigint;
}
export interface FillResult {
    success: boolean;
    txHash?: string;
    error?: string;
    fillInput?: bigint;
    outputAmount?: bigint;
    protocolFee?: bigint;
    isPartial?: boolean;
    fillNumber?: number;
}
export interface SolverStats {
    address: string;
    isRegistered: boolean;
    isActive: boolean;
    stake: bigint;
    pendingUnstake: bigint;
    unstakeAvailableAt: number;
    reputationScore: number;
    successfulFills: number;
    failedFills: number;
    totalVolume: bigint;
    registeredAt: number;
    lastActive: number;
}
export interface MinOutputCalculation {
    intentId: number;
    fillInput: bigint;
    minOutput: bigint;
}
export interface FeeCalculation {
    feeAmount: bigint;
    solverReceives: bigint;
}
export declare const MAX_FILLS_PER_INTENT = 5;
export declare const PROTOCOL_FEE_BPS = 30;
export declare const BPS_DENOMINATOR = 10000;
export declare function calculateFee(amount: bigint, feeBps?: number): FeeCalculation;
export declare function calculateProportionalMinOutput(totalMinOutput: bigint, fillInput: bigint, totalInput: bigint): bigint;
//# sourceMappingURL=solution.d.ts.map