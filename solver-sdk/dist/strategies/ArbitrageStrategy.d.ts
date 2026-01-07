import { BaseStrategy } from './BaseStrategy';
import { Intent } from '../types/intent';
import { Solution } from '../types/solution';
import { VeloxSolver } from '../VeloxSolver';
/**
 * Arbitrage strategy that looks for profitable swap opportunities
 * by comparing prices across different DEXes
 */
export declare class ArbitrageStrategy extends BaseStrategy {
    name: string;
    private minProfitBps;
    constructor(minProfitBps?: number);
    canHandle(intent: Intent): boolean;
    calculateSolution(intent: Intent, solver: VeloxSolver): Promise<Solution | null>;
    estimateProfit(intent: Intent, solution: Solution): bigint;
    private isProfitable;
}
//# sourceMappingURL=ArbitrageStrategy.d.ts.map