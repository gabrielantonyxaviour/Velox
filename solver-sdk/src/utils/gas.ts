/**
 * Gas estimation utilities for Velox solver operations
 */

export interface GasEstimate {
  gasUnits: bigint;
  gasPrice: bigint;
  totalCost: bigint;
}

// Estimated gas units for different operations
const GAS_ESTIMATES = {
  SUBMIT_SOLUTION: 50000n,
  EXECUTE_SETTLEMENT: 100000n,
  CANCEL_INTENT: 30000n,
} as const;

/**
 * Estimate gas cost for an operation
 */
export function estimateGas(
  operation: keyof typeof GAS_ESTIMATES,
  gasPriceOctas: bigint
): GasEstimate {
  const gasUnits = GAS_ESTIMATES[operation];
  return {
    gasUnits,
    gasPrice: gasPriceOctas,
    totalCost: gasUnits * gasPriceOctas,
  };
}

/**
 * Check if solving is profitable after gas costs
 */
export function isProfitableAfterGas(
  expectedProfit: bigint,
  gasEstimate: GasEstimate,
  minProfitMargin: bigint = 0n
): boolean {
  return expectedProfit > gasEstimate.totalCost + minProfitMargin;
}

/**
 * Calculate maximum gas price for profitability
 */
export function maxProfitableGasPrice(
  expectedProfit: bigint,
  gasUnits: bigint
): bigint {
  if (gasUnits === 0n) return 0n;
  return expectedProfit / gasUnits;
}

/**
 * Format gas cost for display (in APT)
 */
export function formatGasCost(gasCostOctas: bigint): string {
  const apt = Number(gasCostOctas) / 1e8;
  return `${apt.toFixed(6)} APT`;
}
