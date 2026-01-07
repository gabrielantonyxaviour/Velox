import { useState, useEffect, useCallback } from 'react';
import { aptos, VELOX_ADDRESS } from '@/app/lib/aptos';

export interface SolverInfo {
  address: string;
  stake: bigint;
  isActive: boolean;
  registeredAt: number;
  reputationScore: number;
  totalIntentsSolved: number;
  successfulFills: number;
  failedFills: number;
  totalVolume: bigint;
  averageSlippage: number;
  lastActive: number;
}

export interface SolverStats {
  totalSolvers: number;
  activeSolvers: number;
  totalStaked: bigint;
}

export function useSolverStats() {
  const [stats, setStats] = useState<SolverStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const [totalResult, activeResult] = await Promise.all([
        aptos.view({
          payload: {
            function: `${VELOX_ADDRESS}::solver_registry::get_total_solvers`,
            typeArguments: [],
            functionArguments: [VELOX_ADDRESS],
          },
        }),
        aptos.view({
          payload: {
            function: `${VELOX_ADDRESS}::solver_registry::get_active_solver_count`,
            typeArguments: [],
            functionArguments: [VELOX_ADDRESS],
          },
        }),
      ]);

      setStats({
        totalSolvers: Number(totalResult[0]),
        activeSolvers: Number(activeResult[0]),
        totalStaked: BigInt(0), // Would need a view function for this
      });
    } catch (err) {
      console.error('Error fetching solver stats:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch solver stats');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  return { stats, isLoading, error, refetch: fetchStats };
}

export function useSolverInfo(solverAddress: string | null) {
  const [solver, setSolver] = useState<SolverInfo | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchSolver = useCallback(async () => {
    if (!solverAddress) {
      setSolver(null);
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      // Check if registered first
      const isRegistered = await aptos.view({
        payload: {
          function: `${VELOX_ADDRESS}::solver_registry::is_registered`,
          typeArguments: [],
          functionArguments: [VELOX_ADDRESS, solverAddress],
        },
      });

      if (!isRegistered[0]) {
        setSolver(null);
        return;
      }

      // Get solver stats
      const result = await aptos.view({
        payload: {
          function: `${VELOX_ADDRESS}::solver_registry::get_solver_stats`,
          typeArguments: [],
          functionArguments: [VELOX_ADDRESS, solverAddress],
        },
      });

      // Result: (stake, total_volume, reputation_score, successful_fills, failed_fills, average_slippage, is_active)
      const [stake, totalVolume, reputationScore, successfulFills, failedFills, avgSlippage, isActive] = result;

      setSolver({
        address: solverAddress,
        stake: BigInt(stake as string),
        isActive: Boolean(isActive),
        registeredAt: 0,
        reputationScore: Number(reputationScore),
        totalIntentsSolved: Number(successfulFills) + Number(failedFills),
        successfulFills: Number(successfulFills),
        failedFills: Number(failedFills),
        totalVolume: BigInt(totalVolume as string),
        averageSlippage: Number(avgSlippage),
        lastActive: 0,
      });
    } catch (err) {
      console.error('Error fetching solver info:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch solver info');
      setSolver(null);
    } finally {
      setIsLoading(false);
    }
  }, [solverAddress]);

  useEffect(() => {
    fetchSolver();
  }, [fetchSolver]);

  return { solver, isLoading, error, refetch: fetchSolver };
}

export function useSolverReputation(solverAddress: string | null) {
  const [reputation, setReputation] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!solverAddress) {
      setReputation(0);
      return;
    }

    const fetchReputation = async () => {
      setIsLoading(true);
      try {
        const result = await aptos.view({
          payload: {
            function: `${VELOX_ADDRESS}::solver_registry::get_reputation`,
            typeArguments: [],
            functionArguments: [VELOX_ADDRESS, solverAddress],
          },
        });
        setReputation(Number(result[0]));
      } catch (err) {
        console.error('Error fetching reputation:', err);
        setReputation(0);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReputation();
  }, [solverAddress]);

  return { reputation, isLoading };
}
