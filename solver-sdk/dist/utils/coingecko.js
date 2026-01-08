"use strict";
// CoinGecko pricing utility for solver
// Fetches real-time token prices to calculate swap outputs
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchTokenPriceUSD = fetchTokenPriceUSD;
exports.getTokenSymbol = getTokenSymbol;
exports.calculateOutputFromPrices = calculateOutputFromPrices;
exports.applySpread = applySpread;
// Token address to CoinGecko ID mapping
const TOKEN_MAPPING = {
    // tUSDC - deployed on Movement testnet
    '0x194eede164d0a9ee0c8082ff82eebdf146b3936872c203cf9282cd54ea5287ce': {
        symbol: 'tUSDC',
        coinGeckoId: 'usd-coin',
    },
    // tMOVE - deployed on Movement testnet
    '0x626598b71b290f416b9e906dc3dfff337bf0364b3bf53b0bbb6ffab1c0dc373b': {
        symbol: 'tMOVE',
        coinGeckoId: 'movement',
    },
};
const priceCache = {};
const CACHE_DURATION_MS = 30000; // 30 seconds
/**
 * Fetch USD price for a token from CoinGecko
 */
async function fetchTokenPriceUSD(tokenAddress) {
    const tokenInfo = TOKEN_MAPPING[tokenAddress];
    if (!tokenInfo) {
        console.warn(`Unknown token address: ${tokenAddress}`);
        return 0;
    }
    // Stablecoins are always $1
    if (tokenInfo.symbol === 'tUSDC' || tokenInfo.symbol === 'USDC') {
        return 1.0;
    }
    const cacheKey = tokenInfo.coinGeckoId;
    const cached = priceCache[cacheKey];
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION_MS) {
        return cached.price;
    }
    try {
        const response = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${tokenInfo.coinGeckoId}&vs_currencies=usd`, {
            headers: {
                Accept: 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error(`CoinGecko API error: ${response.status}`);
        }
        const data = await response.json();
        const price = data[tokenInfo.coinGeckoId]?.usd;
        if (typeof price === 'number') {
            priceCache[cacheKey] = { price, timestamp: Date.now() };
            console.log(`Fetched price for ${tokenInfo.symbol}: $${price}`);
            return price;
        }
        throw new Error('Invalid price data');
    }
    catch (error) {
        console.error(`Error fetching price for ${tokenInfo.symbol}:`, error);
        // Return cached price if available, even if stale
        if (cached) {
            return cached.price;
        }
        // Fallback prices as last resort
        if (tokenInfo.symbol === 'tMOVE' || tokenInfo.symbol === 'MOVE') {
            return 0.036; // Approximate MOVE price
        }
        return 0;
    }
}
/**
 * Get token symbol from address
 */
function getTokenSymbol(tokenAddress) {
    return TOKEN_MAPPING[tokenAddress]?.symbol || 'UNKNOWN';
}
/**
 * Calculate output amount based on real-time prices
 * @param inputToken - Input token address
 * @param outputToken - Output token address
 * @param inputAmount - Input amount in smallest units (8 decimals)
 * @param inputDecimals - Input token decimals (default 8)
 * @param outputDecimals - Output token decimals (default 8)
 * @returns Output amount in smallest units
 */
async function calculateOutputFromPrices(inputToken, outputToken, inputAmount, inputDecimals = 8, outputDecimals = 8) {
    const [inputPriceUSD, outputPriceUSD] = await Promise.all([
        fetchTokenPriceUSD(inputToken),
        fetchTokenPriceUSD(outputToken),
    ]);
    if (inputPriceUSD === 0 || outputPriceUSD === 0) {
        throw new Error(`Could not fetch prices: ${getTokenSymbol(inputToken)}=$${inputPriceUSD}, ${getTokenSymbol(outputToken)}=$${outputPriceUSD}`);
    }
    // Exchange rate: how many output tokens per 1 input token
    // e.g., if USDC = $1 and MOVE = $0.036, then 1 USDC = 1/0.036 = 27.7 MOVE
    const exchangeRate = inputPriceUSD / outputPriceUSD;
    // Convert input amount to human-readable
    const inputHuman = Number(inputAmount) / Math.pow(10, inputDecimals);
    // Calculate output in human-readable
    const outputHuman = inputHuman * exchangeRate;
    // Convert back to smallest units
    const outputAmount = BigInt(Math.floor(outputHuman * Math.pow(10, outputDecimals)));
    console.log(`Price calculation:`);
    console.log(`  ${getTokenSymbol(inputToken)}: $${inputPriceUSD}`);
    console.log(`  ${getTokenSymbol(outputToken)}: $${outputPriceUSD}`);
    console.log(`  Exchange rate: 1 ${getTokenSymbol(inputToken)} = ${exchangeRate.toFixed(6)} ${getTokenSymbol(outputToken)}`);
    console.log(`  Input: ${inputHuman} ${getTokenSymbol(inputToken)}`);
    console.log(`  Output: ${outputHuman.toFixed(6)} ${getTokenSymbol(outputToken)}`);
    return {
        outputAmount,
        inputPriceUSD,
        outputPriceUSD,
        exchangeRate,
    };
}
/**
 * Apply a small spread for solver profit margin
 * @param outputAmount - Raw output amount
 * @param spreadBps - Spread in basis points (default 10 = 0.1%)
 */
function applySpread(outputAmount, spreadBps = 10) {
    // Reduce output by spread for solver profit
    return (outputAmount * BigInt(10000 - spreadBps)) / 10000n;
}
//# sourceMappingURL=coingecko.js.map