// Real-time pricing utility for token conversions

// Token identifiers for price APIs
const TOKEN_IDS = {
  // Movement MOVE - CoinGecko ID
  MOVE: 'movement',
  // Stablecoins are always $1
  tUSDC: 'usd-coin',
  USDC: 'usd-coin',
};

// Fallback prices when API is unavailable (realistic defaults)
const FALLBACK_PRICES: Record<string, number> = {
  MOVE: 0.85,    // ~$0.85 is realistic for MOVE
  tMOVE: 0.85,
  tUSDC: 1.0,
  USDC: 1.0,
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

  // Get fallback price for this token
  const fallbackPrice = FALLBACK_PRICES[tokenSymbol] || FALLBACK_PRICES[normalizedSymbol] || 0.5;

  // Map token symbol to CoinGecko ID
  const coinId = TOKEN_IDS[normalizedSymbol as keyof typeof TOKEN_IDS];
  if (!coinId) {
    console.warn(`No CoinGecko ID for token: ${tokenSymbol}, using fallback price`);
    return fallbackPrice;
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
      console.warn(`CoinGecko API returned ${response.status}, using fallback price`);
      return cached?.price || fallbackPrice;
    }

    const data = await response.json();
    const price = data[coinId]?.usd;

    if (typeof price === 'number') {
      priceCache[cacheKey] = { price, timestamp: Date.now() };
      return price;
    }

    // Invalid data, use fallback
    return cached?.price || fallbackPrice;
  } catch (error) {
    // Silently handle errors - just log a warning, don't throw
    console.warn(`Price API unavailable for ${tokenSymbol}, using fallback`);

    // Return cached price if available, otherwise fallback
    return cached?.price || fallbackPrice;
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

  // Use fallback prices if fetched prices are 0
  const finalInputPrice = inputPriceUSD || FALLBACK_PRICES[inputSymbol] || 0.5;
  const finalOutputPrice = outputPriceUSD || FALLBACK_PRICES[outputSymbol] || 1.0;

  // Exchange rate = inputPrice / outputPrice
  // e.g., if MOVE = $0.85 and USDC = $1.00, then 1 MOVE = 0.85 USDC
  return finalInputPrice / finalOutputPrice;
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
      const price = await fetchTokenPriceUSD(lookupSymbol);
      prices[symbol] = price || FALLBACK_PRICES[symbol] || 0.5;
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
