"use strict";
// ============================================================
// Solution Types - For fill operations
// ============================================================
Object.defineProperty(exports, "__esModule", { value: true });
exports.BPS_DENOMINATOR = exports.PROTOCOL_FEE_BPS = exports.MAX_FILLS_PER_INTENT = void 0;
exports.calculateFee = calculateFee;
exports.calculateProportionalMinOutput = calculateProportionalMinOutput;
// Constants
exports.MAX_FILLS_PER_INTENT = 5;
exports.PROTOCOL_FEE_BPS = 30; // 0.3%
exports.BPS_DENOMINATOR = 10000;
// Calculate fee from amount
function calculateFee(amount, feeBps = exports.PROTOCOL_FEE_BPS) {
    const feeAmount = (amount * BigInt(feeBps)) / BigInt(exports.BPS_DENOMINATOR);
    return {
        feeAmount,
        solverReceives: amount - feeAmount,
    };
}
// Calculate proportional minimum output for partial fill
function calculateProportionalMinOutput(totalMinOutput, fillInput, totalInput) {
    if (totalInput === 0n)
        return 0n;
    return (totalMinOutput * fillInput) / totalInput;
}
//# sourceMappingURL=solution.js.map