import { BaseStrategy } from './BaseStrategy';
import { Intent, IntentType } from '../types/intent';
import { Solution } from '../types/solution';
import { VeloxSolver } from '../VeloxSolver';

/**
 * Arbitrage strategy that looks for profitable swap opportunities
 * by comparing prices across different DEXes
 */
export class ArbitrageStrategy extends BaseStrategy {
  name = 'ArbitrageStrategy';

  private minProfitBps: number;

  constructor(minProfitBps: number = 10) {
    super();
    this.minProfitBps = minProfitBps;
  }

  canHandle(intent: Intent): boolean {
    // Only handle swap intents
    return intent.type === IntentType.SWAP;
  }

  async calculateSolution(
    intent: Intent,
    solver: VeloxSolver
  ): Promise<Solution | null> {
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
    } catch {
      return null;
    }
  }

  estimateProfit(intent: Intent, solution: Solution): bigint {
    // Calculate profit in basis points
    if (!intent.minOutputAmount) return 0n;

    const surplus = solution.outputAmount - intent.minOutputAmount;
    return surplus;
  }

  private isProfitable(intent: Intent, solution: Solution): boolean {
    if (!intent.minOutputAmount) return true;

    const surplus = solution.outputAmount - intent.minOutputAmount;
    const profitBps = (surplus * 10000n) / intent.minOutputAmount;

    return profitBps >= BigInt(this.minProfitBps);
  }
}
