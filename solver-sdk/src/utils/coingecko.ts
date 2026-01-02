// CoinGecko pricing utility for solver
// Fetches real-time token prices to calculate swap outputs

// Token address to CoinGecko ID mapping
const TOKEN_MAPPING: Record<string, { symbol: string; coinGeckoId: string }> = {
  // tUSDC - deployed on Movement testnet
  '0xd249fd3776a6bf959963d2f7712386da3f343a973f0d88ed05b1e9e6be6cb015': {
    symbol: 'tUSDC',
    coinGeckoId: 'usd-coin',
  },
  // tMOVE - deployed on Movement testnet
  '0x9913b3a2cd19b572521bcc890058dfd285943fbfa33b7c954879f55bbe5da89': {
    symbol: 'tMOVE',
    coinGeckoId: 'movement',
  },
};

// Price cache to avoid rate limiting
interface PriceCache {
  price: number;
  timestamp: number;
}

const priceCache: Record<string, PriceCache> = {};
const CACHE_DURATION_MS = 300000; // 5 minutes - reduce CoinGecko API call frequency

/**
 * Fetch USD price for a token from CoinGecko
 */
export async function fetchTokenPriceUSD(tokenAddress: string): Promise<number> {
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
    const response = await fetch(
      `https://api.coingecko.com/api/v3/simple/price?ids=${tokenInfo.coinGeckoId}&vs_currencies=usd`,
      {
        headers: {
          Accept: 'application/json',
        },
      }
    );

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
  } catch (error) {
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
export function getTokenSymbol(tokenAddress: string): string {
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
export async function calculateOutputFromPrices(
  inputToken: string,
  outputToken: string,
  inputAmount: bigint,
  inputDecimals: number = 8,
  outputDecimals: number = 8
): Promise<{
  outputAmount: bigint;
  inputPriceUSD: number;
  outputPriceUSD: number;
  exchangeRate: number;
}> {
  const [inputPriceUSD, outputPriceUSD] = await Promise.all([
    fetchTokenPriceUSD(inputToken),
    fetchTokenPriceUSD(outputToken),
  ]);

  if (inputPriceUSD === 0 || outputPriceUSD === 0) {
    throw new Error(
      `Could not fetch prices: ${getTokenSymbol(inputToken)}=$${inputPriceUSD}, ${getTokenSymbol(outputToken)}=$${outputPriceUSD}`
    );
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
export function applySpread(outputAmount: bigint, spreadBps: number = 10): bigint {
  // Reduce output by spread for solver profit
  return (outputAmount * BigInt(10000 - spreadBps)) / 10000n;
}
