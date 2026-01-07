"use strict";
/**
 * Gas estimation utilities for Velox solver operations
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.estimateGas = estimateGas;
exports.isProfitableAfterGas = isProfitableAfterGas;
exports.maxProfitableGasPrice = maxProfitableGasPrice;
exports.formatGasCost = formatGasCost;
// Estimated gas units for different operations
const GAS_ESTIMATES = {
    SUBMIT_SOLUTION: 50000n,
    EXECUTE_SETTLEMENT: 100000n,
    CANCEL_INTENT: 30000n,
};
/**
 * Estimate gas cost for an operation
 */
function estimateGas(operation, gasPriceOctas) {
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
function isProfitableAfterGas(expectedProfit, gasEstimate, minProfitMargin = 0n) {
    return expectedProfit > gasEstimate.totalCost + minProfitMargin;
}
/**
 * Calculate maximum gas price for profitability
 */
function maxProfitableGasPrice(expectedProfit, gasUnits) {
    if (gasUnits === 0n)
        return 0n;
    return expectedProfit / gasUnits;
}
/**
 * Format gas cost for display (in APT)
 */
function formatGasCost(gasCostOctas) {
    const apt = Number(gasCostOctas) / 1e8;
    return `${apt.toFixed(6)} APT`;
}
//# sourceMappingURL=gas.js.map