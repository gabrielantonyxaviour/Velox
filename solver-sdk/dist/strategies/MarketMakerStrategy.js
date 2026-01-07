"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MarketMakerStrategy = void 0;
const BaseStrategy_1 = require("./BaseStrategy");
const intent_1 = require("../types/intent");
/**
 * Market maker strategy that provides liquidity and captures spread
 */
class MarketMakerStrategy extends BaseStrategy_1.BaseStrategy {
    name = 'MarketMakerStrategy';
    spreadBps;
    maxExposure;
    currentExposure;
    constructor(spreadBps = 50, maxExposure = 1000000000000n) {
        super();
        this.spreadBps = spreadBps;
        this.maxExposure = maxExposure;
        this.currentExposure = new Map();
    }
    canHandle(intent) {
        // Handle swaps and limit orders
        return (intent.type === intent_1.IntentType.SWAP ||
            intent.type === intent_1.IntentType.LIMIT_ORDER);
    }
    async calculateSolution(intent, solver) {
        if (this.isExpired(intent)) {
            return null;
        }
        // Check exposure limits
        if (!this.withinExposureLimits(intent)) {
            return null;
        }
        try {
            const solution = await solver.calculateOptimalSolution(intent);
            // Apply spread
            const adjustedOutput = this.applySpread(solution.outputAmount);
            if (!this.meetsMinOutput({ ...solution, outputAmount: adjustedOutput }, intent)) {
                return null;
            }
            return {
                ...solution,
                outputAmount: adjustedOutput,
            };
        }
        catch {
            return null;
        }
    }
    estimateProfit(intent, solution) {
        // Profit is the spread we capture
        const spreadAmount = (solution.outputAmount * BigInt(this.spreadBps)) / 10000n;
        return spreadAmount;
    }
    applySpread(amount) {
        // Reduce output by spread
        return (amount * BigInt(10000 - this.spreadBps)) / 10000n;
    }
    withinExposureLimits(intent) {
        const tokenKey = intent.inputToken.address;
        const currentExp = this.currentExposure.get(tokenKey) || 0n;
        return currentExp + intent.inputAmount <= this.maxExposure;
    }
    updateExposure(token, amount) {
        const current = this.currentExposure.get(token) || 0n;
        this.currentExposure.set(token, current + amount);
    }
    resetExposure() {
        this.currentExposure.clear();
    }
}
exports.MarketMakerStrategy = MarketMakerStrategy;
//# sourceMappingURL=MarketMakerStrategy.js.map