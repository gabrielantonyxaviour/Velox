/**
 * Fetch USD price for a token from CoinGecko
 */
export declare function fetchTokenPriceUSD(tokenAddress: string): Promise<number>;
/**
 * Get token symbol from address
 */
export declare function getTokenSymbol(tokenAddress: string): string;
/**
 * Calculate output amount based on real-time prices
 * @param inputToken - Input token address
 * @param outputToken - Output token address
 * @param inputAmount - Input amount in smallest units (8 decimals)
 * @param inputDecimals - Input token decimals (default 8)
 * @param outputDecimals - Output token decimals (default 8)
 * @returns Output amount in smallest units
 */
export declare function calculateOutputFromPrices(inputToken: string, outputToken: string, inputAmount: bigint, inputDecimals?: number, outputDecimals?: number): Promise<{
    outputAmount: bigint;
    inputPriceUSD: number;
    outputPriceUSD: number;
    exchangeRate: number;
}>;
/**
 * Apply a small spread for solver profit margin
 * @param outputAmount - Raw output amount
 * @param spreadBps - Spread in basis points (default 10 = 0.1%)
 */
export declare function applySpread(outputAmount: bigint, spreadBps?: number): bigint;
//# sourceMappingURL=coingecko.d.ts.map