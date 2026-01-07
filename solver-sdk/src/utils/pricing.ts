/**
 * Calculate price from input/output amounts
 * Returns price in basis points (1 bp = 0.01%)
 */
export function calculatePrice(
  amountIn: bigint,
  amountOut: bigint,
  decimalsIn: number,
  decimalsOut: number
): bigint {
  const normalizedIn = amountIn * BigInt(10 ** decimalsOut);
  const normalizedOut = amountOut * BigInt(10 ** decimalsIn);
  return (normalizedOut * 10000n) / normalizedIn;
}

/**
 * Calculate price impact in basis points
 */
export function calculatePriceImpact(
  expectedOutput: bigint,
  actualOutput: bigint
): number {
  if (expectedOutput === 0n) return 0;
  const impact = ((expectedOutput - actualOutput) * 10000n) / expectedOutput;
  return Number(impact);
}

/**
 * Check if output meets minimum requirements
 */
export function meetsMinOutput(
  actualOutput: bigint,
  minOutput: bigint | undefined
): boolean {
  if (!minOutput) return true;
  return actualOutput >= minOutput;
}

/**
 * Calculate slippage adjusted amount
 */
export function applySlippage(
  amount: bigint,
  slippageBps: number
): bigint {
  return (amount * BigInt(10000 - slippageBps)) / 10000n;
}

/**
 * Format token amount for display
 */
export function formatAmount(
  amount: bigint,
  decimals: number,
  displayDecimals: number = 4
): string {
  const divisor = BigInt(10 ** decimals);
  const whole = amount / divisor;
  const fraction = amount % divisor;

  const fractionStr = fraction.toString().padStart(decimals, '0');
  const displayFraction = fractionStr.slice(0, displayDecimals);

  return `${whole}.${displayFraction}`;
}

/**
 * Parse token amount from string
 */
export function parseAmount(amount: string, decimals: number): bigint {
  const [whole, fraction = ''] = amount.split('.');
  const paddedFraction = fraction.padEnd(decimals, '0').slice(0, decimals);
  return BigInt(whole + paddedFraction);
}
