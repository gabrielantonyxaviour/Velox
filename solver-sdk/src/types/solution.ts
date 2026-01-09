// ============================================================
// Solution Types - For fill operations
// ============================================================

// Parameters for filling a swap or limit order
export interface FillParams {
  intentId: number;
  fillInput: bigint;      // Amount of input token to consume from escrow
  outputAmount: bigint;   // Amount of output token to send to user
}

// Parameters for filling TWAP/DCA chunks (chunk size is fixed)
export interface ChunkFillParams {
  intentId: number;
  outputAmount: bigint;   // Amount of output token to send to user
}

// Solution submitted to auction
export interface Solution {
  intentId: number;
  outputAmount: bigint;
  executionPrice: bigint;  // Price in basis points or raw
  route?: SwapRoute;
  expiresAt: Date;
}

// Multi-hop swap route
export interface SwapRoute {
  steps: RouteStep[];
  expectedOutput: bigint;
  priceImpact: number; // In basis points
}

// Single step in a swap route
export interface RouteStep {
  dexId: number;
  poolAddress: string;
  tokenIn: string;
  tokenOut: string;
  amountIn: bigint;
  expectedOut: bigint;
}

// Result of a fill transaction
export interface FillResult {
  success: boolean;
  txHash?: string;
  error?: string;
  fillInput?: bigint;
  outputAmount?: bigint;
  protocolFee?: bigint;
  isPartial?: boolean;
  fillNumber?: number;
}

// ============================================================
// Solver Stats - Matching contract SolverInfo
// ============================================================

export interface SolverStats {
  address: string;
  isRegistered: boolean;
  isActive: boolean;
  stake: bigint;
  pendingUnstake: bigint;
  unstakeAvailableAt: number;
  reputationScore: number;
  successfulFills: number;
  failedFills: number;
  totalVolume: bigint;
  registeredAt: number;
  lastActive: number;
}

// ============================================================
// Fill Calculation Helpers
// ============================================================

// Calculate minimum output for a partial fill (proportional)
export interface MinOutputCalculation {
  intentId: number;
  fillInput: bigint;
  minOutput: bigint;
}

// Fee calculation result
export interface FeeCalculation {
  feeAmount: bigint;
  solverReceives: bigint;
}

// Constants
export const MAX_FILLS_PER_INTENT = 5;
export const PROTOCOL_FEE_BPS = 30; // 0.3%
export const BPS_DENOMINATOR = 10000;

// Calculate fee from amount
export function calculateFee(amount: bigint, feeBps: number = PROTOCOL_FEE_BPS): FeeCalculation {
  const feeAmount = (amount * BigInt(feeBps)) / BigInt(BPS_DENOMINATOR);
  return {
    feeAmount,
    solverReceives: amount - feeAmount,
  };
}

// Calculate proportional minimum output for partial fill
export function calculateProportionalMinOutput(
  totalMinOutput: bigint,
  fillInput: bigint,
  totalInput: bigint
): bigint {
  if (totalInput === 0n) return 0n;
  return (totalMinOutput * fillInput) / totalInput;
}
