// Real-time pricing utility for token conversions

// Token identifiers for price APIs
const TOKEN_IDS = {
  // Movement MOVE - CoinGecko ID
  MOVE: 'movement',
  // Stablecoins are always $1
  tUSDC: 'usd-coin',
  USDC: 'usd-coin',
};

// Cache prices for 30 seconds to avoid rate limiting
interface PriceCache {
  price: number;
  timestamp: number;
}

const priceCache: Record<string, PriceCache> = {};
const CACHE_DURATION_MS = 30000; // 30 seconds

/**
 * Fetch the USD price of a token from CoinGecko
 */
async function fetchTokenPriceUSD(tokenSymbol: string): Promise<number> {
  // Stablecoins are always $1
  if (tokenSymbol === 'tUSDC' || tokenSymbol === 'USDC') {
    return 1.0;
  }

  // tMOVE uses same price as MOVE
  const normalizedSymbol = tokenSymbol === 'tMOVE' ? 'MOVE' : tokenSymbol;
  const cacheKey = normalizedSymbol.toUpperCase();
  const cached = priceCache[cacheKey];

  if (cached && Date.now() - cached.timestamp < CACHE_DURATION_MS) {
    return cached.price;
  }

  // Map token symbol to CoinGecko ID
  const coinId = TOKEN_IDS[normalizedSymbol as keyof typeof TOKEN_IDS];
  if (!coinId) {
    console.warn(`No CoinGecko ID for token: ${tokenSymbol}`);
    return 0;
  }

  try {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/simple/price?ids=${coinId}&vs_currencies=usd`,
      {
        headers: {
          'Accept': 'application/json',
        },
        next: { revalidate: 30 }, // Cache for 30 seconds
      }
    );

    if (!response.ok) {
      throw new Error(`CoinGecko API error: ${response.status}`);
    }

    const data = await response.json();
    const price = data[coinId]?.usd;

    if (typeof price === 'number') {
      priceCache[cacheKey] = { price, timestamp: Date.now() };
      return price;
    }

    throw new Error('Invalid price data');
  } catch (error) {
    console.error(`Error fetching price for ${tokenSymbol}:`, error);

    // Return cached price if available, even if stale
    if (cached) {
      return cached.price;
    }

    return 0;
  }
}

/**
 * Get the exchange rate between two tokens
 * Returns how many outputTokens you get for 1 inputToken
 */
export async function getExchangeRate(
  inputSymbol: string,
  outputSymbol: string
): Promise<number> {
  // Same token = 1:1
  if (inputSymbol === outputSymbol) {
    return 1;
  }

  const [inputPriceUSD, outputPriceUSD] = await Promise.all([
    fetchTokenPriceUSD(inputSymbol),
    fetchTokenPriceUSD(outputSymbol),
  ]);

  if (inputPriceUSD === 0 || outputPriceUSD === 0) {
    console.warn(`Could not fetch prices for ${inputSymbol}/${outputSymbol}`);
    return 0;
  }

  // Exchange rate = inputPrice / outputPrice
  // e.g., if MOVE = $0.50 and USDC = $1.00, then 1 MOVE = 0.5 USDC
  return inputPriceUSD / outputPriceUSD;
}

/**
 * Calculate the output amount for a swap
 */
export async function calculateSwapOutput(
  inputAmount: number,
  inputSymbol: string,
  outputSymbol: string,
  slippagePercent: number = 0.5
): Promise<{
  outputAmount: number;
  exchangeRate: number;
  priceImpact: number;
}> {
  const exchangeRate = await getExchangeRate(inputSymbol, outputSymbol);

  if (exchangeRate === 0) {
    return { outputAmount: 0, exchangeRate: 0, priceImpact: 0 };
  }

  const rawOutput = inputAmount * exchangeRate;
  // Apply slippage for minimum output
  const outputAmount = rawOutput * (1 - slippagePercent / 100);

  return {
    outputAmount,
    exchangeRate,
    priceImpact: 0, // No price impact calculation for now
  };
}

/**
 * Get all token prices at once (for display)
 */
export async function getAllTokenPrices(): Promise<Record<string, number>> {
  const symbols = ['MOVE', 'tMOVE', 'tUSDC'];
  const prices: Record<string, number> = {};

  await Promise.all(
    symbols.map(async (symbol) => {
      // tMOVE uses same price as MOVE
      const lookupSymbol = symbol === 'tMOVE' ? 'MOVE' : symbol;
      prices[symbol] = await fetchTokenPriceUSD(lookupSymbol);
    })
  );

  return prices;
}

/**
 * Format price for display
 */
export function formatPrice(price: number, decimals: number = 4): string {
  if (price === 0) return '0.00';
  if (price < 0.0001) return price.toExponential(2);
  return price.toFixed(decimals);
}
