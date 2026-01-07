import { Intent } from '../types/intent';
import { Solution } from '../types/solution';
import { VeloxSolver } from '../VeloxSolver';

export interface SolverStrategy {
  name: string;

  /**
   * Evaluate if this strategy can handle the intent
   */
  canHandle(intent: Intent): boolean;

  /**
   * Calculate optimal solution
   */
  calculateSolution(intent: Intent, solver: VeloxSolver): Promise<Solution | null>;

  /**
   * Estimate profitability
   */
  estimateProfit(intent: Intent, solution: Solution): bigint;
}

export abstract class BaseStrategy implements SolverStrategy {
  abstract name: string;

  abstract canHandle(intent: Intent): boolean;

  abstract calculateSolution(
    intent: Intent,
    solver: VeloxSolver
  ): Promise<Solution | null>;

  estimateProfit(intent: Intent, solution: Solution): bigint {
    // Default: output - input (in common denomination)
    // This is a simplified calculation - real implementations
    // should consider token prices and decimals
    return solution.outputAmount - intent.inputAmount;
  }

  /**
   * Check if the solution meets minimum output requirements
   */
  protected meetsMinOutput(solution: Solution, intent: Intent): boolean {
    if (!intent.minOutputAmount) return true;
    return solution.outputAmount >= intent.minOutputAmount;
  }

  /**
   * Check if the intent has expired
   */
  protected isExpired(intent: Intent): boolean {
    return new Date() > intent.deadline;
  }
}
