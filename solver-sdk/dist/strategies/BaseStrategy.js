"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseStrategy = void 0;
class BaseStrategy {
    estimateProfit(intent, solution) {
        // Default: output - input (in common denomination)
        // This is a simplified calculation - real implementations
        // should consider token prices and decimals
        return solution.outputAmount - intent.inputAmount;
    }
    /**
     * Check if the solution meets minimum output requirements
     */
    meetsMinOutput(solution, intent) {
        if (!intent.minOutputAmount)
            return true;
        return solution.outputAmount >= intent.minOutputAmount;
    }
    /**
     * Check if the intent has expired
     */
    isExpired(intent) {
        return new Date() > intent.deadline;
    }
}
exports.BaseStrategy = BaseStrategy;
//# sourceMappingURL=BaseStrategy.js.map