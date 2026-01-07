"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArbitrageStrategy = void 0;
const BaseStrategy_1 = require("./BaseStrategy");
const intent_1 = require("../types/intent");
/**
 * Arbitrage strategy that looks for profitable swap opportunities
 * by comparing prices across different DEXes
 */
class ArbitrageStrategy extends BaseStrategy_1.BaseStrategy {
    name = 'ArbitrageStrategy';
    minProfitBps;
    constructor(minProfitBps = 10) {
        super();
        this.minProfitBps = minProfitBps;
    }
    canHandle(intent) {
        // Only handle swap intents
        return intent.type === intent_1.IntentType.SWAP;
    }
    async calculateSolution(intent, solver) {
        if (this.isExpired(intent)) {
            return null;
        }
        try {
            const solution = await solver.calculateOptimalSolution(intent);
            // Check if profitable
            if (!this.isProfitable(intent, solution)) {
                return null;
            }
            // Check minimum output
            if (!this.meetsMinOutput(solution, intent)) {
                return null;
            }
            return solution;
        }
        catch {
            return null;
        }
    }
    estimateProfit(intent, solution) {
        // Calculate profit in basis points
        if (!intent.minOutputAmount)
            return 0n;
        const surplus = solution.outputAmount - intent.minOutputAmount;
        return surplus;
    }
    isProfitable(intent, solution) {
        if (!intent.minOutputAmount)
            return true;
        const surplus = solution.outputAmount - intent.minOutputAmount;
        const profitBps = (surplus * 10000n) / intent.minOutputAmount;
        return profitBps >= BigInt(this.minProfitBps);
    }
}
exports.ArbitrageStrategy = ArbitrageStrategy;
//# sourceMappingURL=ArbitrageStrategy.js.map