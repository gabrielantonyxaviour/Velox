import { BaseStrategy } from './BaseStrategy';
import { Intent, IntentType } from '../types/intent';
import { Solution } from '../types/solution';
import { VeloxSolver } from '../VeloxSolver';

/**
 * Market maker strategy that provides liquidity and captures spread
 */
export class MarketMakerStrategy extends BaseStrategy {
  name = 'MarketMakerStrategy';

  private spreadBps: number;
  private maxExposure: bigint;
  private currentExposure: Map<string, bigint>;

  constructor(spreadBps: number = 50, maxExposure: bigint = 1000000000000n) {
    super();
    this.spreadBps = spreadBps;
    this.maxExposure = maxExposure;
    this.currentExposure = new Map();
  }

  canHandle(intent: Intent): boolean {
    // Handle swaps and limit orders
    return (
      intent.type === IntentType.SWAP ||
      intent.type === IntentType.LIMIT_ORDER
    );
  }

  async calculateSolution(
    intent: Intent,
    solver: VeloxSolver
  ): Promise<Solution | null> {
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
    } catch {
      return null;
    }
  }

  estimateProfit(intent: Intent, solution: Solution): bigint {
    // Profit is the spread we capture
    const spreadAmount = (solution.outputAmount * BigInt(this.spreadBps)) / 10000n;
    return spreadAmount;
  }

  private applySpread(amount: bigint): bigint {
    // Reduce output by spread
    return (amount * BigInt(10000 - this.spreadBps)) / 10000n;
  }

  private withinExposureLimits(intent: Intent): boolean {
    const tokenKey = intent.inputToken.address;
    const currentExp = this.currentExposure.get(tokenKey) || 0n;
    return currentExp + intent.inputAmount <= this.maxExposure;
  }

  updateExposure(token: string, amount: bigint): void {
    const current = this.currentExposure.get(token) || 0n;
    this.currentExposure.set(token, current + amount);
  }

  resetExposure(): void {
    this.currentExposure.clear();
  }
}
