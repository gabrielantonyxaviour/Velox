export interface Solution {
  intentId: string;
  outputAmount: bigint;
  executionPrice: bigint;
  route?: SwapRoute;
  expiresAt: Date;
}

export interface SwapRoute {
  steps: RouteStep[];
  expectedOutput: bigint;
  priceImpact: number; // In basis points
}

export interface RouteStep {
  dexId: number;
  poolAddress: string;
  tokenIn: string;
  tokenOut: string;
  amountIn: bigint;
  expectedOut: bigint;
}

export interface SolutionResult {
  success: boolean;
  txHash?: string;
  error?: string;
}

export interface SolverStats {
  address: string;
  totalSolutions: number;
  successfulSolutions: number;
  totalVolume: bigint;
  reputation: number;
  isActive: boolean;
}
