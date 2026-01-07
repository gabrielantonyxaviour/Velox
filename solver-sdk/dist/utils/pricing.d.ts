/**
 * Calculate price from input/output amounts
 * Returns price in basis points (1 bp = 0.01%)
 */
export declare function calculatePrice(amountIn: bigint, amountOut: bigint, decimalsIn: number, decimalsOut: number): bigint;
/**
 * Calculate price impact in basis points
 */
export declare function calculatePriceImpact(expectedOutput: bigint, actualOutput: bigint): number;
/**
 * Check if output meets minimum requirements
 */
export declare function meetsMinOutput(actualOutput: bigint, minOutput: bigint | undefined): boolean;
/**
 * Calculate slippage adjusted amount
 */
export declare function applySlippage(amount: bigint, slippageBps: number): bigint;
/**
 * Format token amount for display
 */
export declare function formatAmount(amount: bigint, decimals: number, displayDecimals?: number): string;
/**
 * Parse token amount from string
 */
export declare function parseAmount(amount: string, decimals: number): bigint;
//# sourceMappingURL=pricing.d.ts.map