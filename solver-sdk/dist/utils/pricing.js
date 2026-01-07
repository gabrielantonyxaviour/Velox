"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculatePrice = calculatePrice;
exports.calculatePriceImpact = calculatePriceImpact;
exports.meetsMinOutput = meetsMinOutput;
exports.applySlippage = applySlippage;
exports.formatAmount = formatAmount;
exports.parseAmount = parseAmount;
/**
 * Calculate price from input/output amounts
 * Returns price in basis points (1 bp = 0.01%)
 */
function calculatePrice(amountIn, amountOut, decimalsIn, decimalsOut) {
    const normalizedIn = amountIn * BigInt(10 ** decimalsOut);
    const normalizedOut = amountOut * BigInt(10 ** decimalsIn);
    return (normalizedOut * 10000n) / normalizedIn;
}
/**
 * Calculate price impact in basis points
 */
function calculatePriceImpact(expectedOutput, actualOutput) {
    if (expectedOutput === 0n)
        return 0;
    const impact = ((expectedOutput - actualOutput) * 10000n) / expectedOutput;
    return Number(impact);
}
/**
 * Check if output meets minimum requirements
 */
function meetsMinOutput(actualOutput, minOutput) {
    if (!minOutput)
        return true;
    return actualOutput >= minOutput;
}
/**
 * Calculate slippage adjusted amount
 */
function applySlippage(amount, slippageBps) {
    return (amount * BigInt(10000 - slippageBps)) / 10000n;
}
/**
 * Format token amount for display
 */
function formatAmount(amount, decimals, displayDecimals = 4) {
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
function parseAmount(amount, decimals) {
    const [whole, fraction = ''] = amount.split('.');
    const paddedFraction = fraction.padEnd(decimals, '0').slice(0, decimals);
    return BigInt(whole + paddedFraction);
}
//# sourceMappingURL=pricing.js.map