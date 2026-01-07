/**
 * Gas estimation utilities for Velox solver operations
 */
export interface GasEstimate {
    gasUnits: bigint;
    gasPrice: bigint;
    totalCost: bigint;
}
declare const GAS_ESTIMATES: {
    readonly SUBMIT_SOLUTION: 50000n;
    readonly EXECUTE_SETTLEMENT: 100000n;
    readonly CANCEL_INTENT: 30000n;
};
/**
 * Estimate gas cost for an operation
 */
export declare function estimateGas(operation: keyof typeof GAS_ESTIMATES, gasPriceOctas: bigint): GasEstimate;
/**
 * Check if solving is profitable after gas costs
 */
export declare function isProfitableAfterGas(expectedProfit: bigint, gasEstimate: GasEstimate, minProfitMargin?: bigint): boolean;
/**
 * Calculate maximum gas price for profitability
 */
export declare function maxProfitableGasPrice(expectedProfit: bigint, gasUnits: bigint): bigint;
/**
 * Format gas cost for display (in APT)
 */
export declare function formatGasCost(gasCostOctas: bigint): string;
export {};
//# sourceMappingURL=gas.d.ts.map