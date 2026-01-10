import { aptos, VELOX_ADDRESS } from '../aptos';

// ============================================================================
// Types
// ============================================================================

export interface SolverStats {
  intentsFilled: bigint;
  totalVolume: bigint;
  reputation: bigint;
  slashCount: bigint;
  lastActiveTime: bigint;
  registrationTime: bigint;
  isActive: boolean;
}

export interface ScheduledIntentInfo {
  nextExecutionTime: bigint;
  chunksRemaining: bigint;
  isPaused: boolean;
}

// ============================================================================
// Submission View Functions
// ============================================================================

/**
 * Get user's intent IDs
 */
export async function getUserIntentIds(userAddress: string): Promise<bigint[]> {
  try {
    const result = await aptos.view({
      payload: {
        function: `${VELOX_ADDRESS}::submission::get_user_intents`,
        typeArguments: [],
        functionArguments: [VELOX_ADDRESS, userAddress],
      },
    });
    return (result[0] as string[]).map((id) => BigInt(id));
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    if (errorMessage.includes('MISSING_DATA')) {
      return [];
    }
    throw error;
  }
}

/**
 * Get total number of intents
 */
export async function getTotalIntents(): Promise<bigint> {
  const result = await aptos.view({
    payload: {
      function: `${VELOX_ADDRESS}::submission::get_total_intents`,
      typeArguments: [],
      functionArguments: [VELOX_ADDRESS],
    },
  });
  return BigInt(result[0] as string);
}

// ============================================================================
// Solver Registry View Functions
// ============================================================================

/**
 * Get solver statistics
 * Returns: (intents_filled, total_volume, reputation, slash_count,
 *           last_active_time, registration_time, is_active)
 */
export async function getSolverStats(
  solverAddress: string
): Promise<SolverStats | null> {
  try {
    const result = await aptos.view({
      payload: {
        function: `${VELOX_ADDRESS}::solver_registry::get_solver_stats`,
        typeArguments: [],
        functionArguments: [VELOX_ADDRESS, solverAddress],
      },
    });

    const [
      intentsFilled,
      totalVolume,
      reputation,
      slashCount,
      lastActiveTime,
      registrationTime,
      isActive,
    ] = result as [string, string, string, string, string, string, boolean];

    return {
      intentsFilled: BigInt(intentsFilled),
      totalVolume: BigInt(totalVolume),
      reputation: BigInt(reputation),
      slashCount: BigInt(slashCount),
      lastActiveTime: BigInt(lastActiveTime),
      registrationTime: BigInt(registrationTime),
      isActive,
    };
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    if (errorMessage.includes('MISSING_DATA')) {
      return null;
    }
    throw error;
  }
}

/**
 * Get total number of registered solvers
 */
export async function getTotalSolvers(): Promise<number> {
  const result = await aptos.view({
    payload: {
      function: `${VELOX_ADDRESS}::solver_registry::get_total_solvers`,
      typeArguments: [],
      functionArguments: [VELOX_ADDRESS],
    },
  });
  return Number(result[0]);
}

/**
 * Get count of currently active solvers
 */
export async function getActiveSolverCount(): Promise<number> {
  const result = await aptos.view({
    payload: {
      function: `${VELOX_ADDRESS}::solver_registry::get_active_solver_count`,
      typeArguments: [],
      functionArguments: [VELOX_ADDRESS],
    },
  });
  return Number(result[0]);
}

/**
 * Check if address is a registered solver
 */
export async function isSolverRegistered(solverAddress: string): Promise<boolean> {
  try {
    const result = await aptos.view({
      payload: {
        function: `${VELOX_ADDRESS}::solver_registry::is_registered`,
        typeArguments: [],
        functionArguments: [VELOX_ADDRESS, solverAddress],
      },
    });
    return result[0] as boolean;
  } catch {
    return false;
  }
}

/**
 * Check if solver is currently active
 */
export async function isSolverActive(solverAddress: string): Promise<boolean> {
  try {
    const result = await aptos.view({
      payload: {
        function: `${VELOX_ADDRESS}::solver_registry::is_active`,
        typeArguments: [],
        functionArguments: [VELOX_ADDRESS, solverAddress],
      },
    });
    return result[0] as boolean;
  } catch {
    return false;
  }
}

// ============================================================================
// Scheduled Intent View Functions
// ============================================================================

/**
 * Get next execution time for a scheduled intent
 */
export async function getNextExecutionTime(intentId: bigint): Promise<bigint> {
  const result = await aptos.view({
    payload: {
      function: `${VELOX_ADDRESS}::scheduled::get_next_execution_time`,
      typeArguments: [],
      functionArguments: [VELOX_ADDRESS, intentId.toString()],
    },
  });
  return BigInt(result[0] as string);
}

/**
 * Get scheduled intent details
 * Returns: (next_execution_time, chunks_remaining, is_paused)
 */
export async function getScheduledIntent(
  intentId: bigint
): Promise<ScheduledIntentInfo | null> {
  try {
    const result = await aptos.view({
      payload: {
        function: `${VELOX_ADDRESS}::scheduled::get_scheduled_intent`,
        typeArguments: [],
        functionArguments: [VELOX_ADDRESS, intentId.toString()],
      },
    });

    const [nextExecutionTime, chunksRemaining, isPaused] = result as [
      string,
      string,
      boolean
    ];

    return {
      nextExecutionTime: BigInt(nextExecutionTime),
      chunksRemaining: BigInt(chunksRemaining),
      isPaused,
    };
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    if (errorMessage.includes('MISSING_DATA')) {
      return null;
    }
    throw error;
  }
}

/**
 * Get list of intent IDs ready for execution
 */
export async function getExecutableIntents(): Promise<bigint[]> {
  try {
    const result = await aptos.view({
      payload: {
        function: `${VELOX_ADDRESS}::scheduled::get_executable_intents`,
        typeArguments: [],
        functionArguments: [VELOX_ADDRESS],
      },
    });
    return (result[0] as string[]).map((id) => BigInt(id));
  } catch {
    return [];
  }
}

/**
 * Get number of chunks executed for a scheduled intent
 */
export async function getChunksExecuted(intentId: bigint): Promise<bigint> {
  const result = await aptos.view({
    payload: {
      function: `${VELOX_ADDRESS}::scheduled::get_chunks_executed`,
      typeArguments: [],
      functionArguments: [VELOX_ADDRESS, intentId.toString()],
    },
  });
  return BigInt(result[0] as string);
}

// ============================================================================
// Settlement View Functions
// ============================================================================

/**
 * Check if an intent can be filled with the given output amount
 */
export async function canFill(
  intentId: bigint,
  outputAmount: bigint
): Promise<boolean> {
  try {
    const result = await aptos.view({
      payload: {
        function: `${VELOX_ADDRESS}::settlement::can_fill`,
        typeArguments: [],
        functionArguments: [
          VELOX_ADDRESS,
          intentId.toString(),
          outputAmount.toString(),
        ],
      },
    });
    return result[0] as boolean;
  } catch {
    return false;
  }
}

/**
 * Get protocol fee in basis points (e.g., 30 = 0.3%)
 */
export async function getProtocolFeeBps(): Promise<number> {
  try {
    const result = await aptos.view({
      payload: {
        function: `${VELOX_ADDRESS}::settlement::get_fee_bps`,
        typeArguments: [],
        functionArguments: [VELOX_ADDRESS],
      },
    });
    return Number(result[0]);
  } catch (error) {
    console.warn('Failed to fetch protocol fee, using default 500 bps:', error);
    return 500; // Default to 5% (500 bps)
  }
}

/**
 * Get solver fee in basis points
 */
export async function getSolverFeeBps(): Promise<number> {
  try {
    const result = await aptos.view({
      payload: {
        function: `${VELOX_ADDRESS}::settlement::get_fee_bps`,
        typeArguments: [],
        functionArguments: [VELOX_ADDRESS],
      },
    });
    return Number(result[0]);
  } catch (error) {
    console.warn('Failed to fetch solver fee, using default 100 bps:', error);
    return 100; // Default to 1% (100 bps)
  }
}
