import { BaseStrategy } from './BaseStrategy';
import { Intent } from '../types/intent';
import { Solution } from '../types/solution';
import { VeloxSolver } from '../VeloxSolver';
/**
 * Market maker strategy that provides liquidity and captures spread
 */
export declare class MarketMakerStrategy extends BaseStrategy {
    name: string;
    private spreadBps;
    private maxExposure;
    private currentExposure;
    constructor(spreadBps?: number, maxExposure?: bigint);
    canHandle(intent: Intent): boolean;
    calculateSolution(intent: Intent, solver: VeloxSolver): Promise<Solution | null>;
    estimateProfit(intent: Intent, solution: Solution): bigint;
    private applySpread;
    private withinExposureLimits;
    updateExposure(token: string, amount: bigint): void;
    resetExposure(): void;
}
//# sourceMappingURL=MarketMakerStrategy.d.ts.map