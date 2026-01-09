import { useState, useEffect, useCallback } from 'react';
import { aptos, VELOX_ADDRESS, MOVEMENT_CONFIGS, CURRENT_NETWORK } from '@/app/lib/aptos';

export interface SolverListItem {
  address: string;
  stake: bigint;
  isActive: boolean;
  reputationScore: number;
  totalIntentsSolved: number;
  successfulFills: number;
  failedFills: number;
  totalVolume: bigint;
  averageSlippage: number;
  registeredAt: number;
}

interface SolverRegisteredEvent {
  solver: string;
  stake: string;
  registered_at: string;
}

interface Transaction {
  events?: Array<{
    type: string;
    data: Record<string, unknown>;
  }>;
}

const RPC_URL = MOVEMENT_CONFIGS[CURRENT_NETWORK].fullnode;

/**
 * Fetch all registered solver addresses from events
 */
async function fetchSolverAddresses(): Promise<string[]> {
  try {
    const response = await fetch(
      `${RPC_URL}/accounts/${VELOX_ADDRESS}/transactions?limit=200`
    );
    if (!response.ok) return [];

    const transactions = (await response.json()) as Transaction[];
    const solverAddresses = new Set<string>();

    for (const tx of transactions) {
      if (!tx.events) continue;

      for (const event of tx.events) {
        if (event.type === `${VELOX_ADDRESS}::solver_registry::SolverRegistered`) {
          const data = event.data as unknown as SolverRegisteredEvent;
          if (data.solver) {
            solverAddresses.add(data.solver);
          }
        }
      }
    }

    return Array.from(solverAddresses);
  } catch (error) {
    console.error('Error fetching solver addresses:', error);
    return [];
  }
}

/**
 * Fetch solver stats from contract
 */
async function fetchSolverStats(address: string): Promise<SolverListItem | null> {
  try {
    const isRegistered = await aptos.view({
      payload: {
        function: `${VELOX_ADDRESS}::solver_registry::is_registered`,
        typeArguments: [],
        functionArguments: [VELOX_ADDRESS, address],
      },
    });

    if (!isRegistered[0]) return null;

    const result = await aptos.view({
      payload: {
        function: `${VELOX_ADDRESS}::solver_registry::get_solver_stats`,
        typeArguments: [],
        functionArguments: [VELOX_ADDRESS, address],
      },
    });

    const [stake, totalVolume, reputationScore, successfulFills, failedFills, avgSlippage, isActive] = result;

    return {
      address,
      stake: BigInt(stake as string),
      isActive: Boolean(isActive),
      reputationScore: Number(reputationScore),
      totalIntentsSolved: Number(successfulFills) + Number(failedFills),
      successfulFills: Number(successfulFills),
      failedFills: Number(failedFills),
      totalVolume: BigInt(totalVolume as string),
      averageSlippage: Number(avgSlippage),
      registeredAt: 0,
    };
  } catch (error) {
    console.error('Error fetching solver stats for', address, error);
    return null;
  }
}

export function useAllSolvers() {
  const [solvers, setSolvers] = useState<SolverListItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAllSolvers = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const addresses = await fetchSolverAddresses();

      if (addresses.length === 0) {
        setSolvers([]);
        return;
      }

      const solverPromises = addresses.map(fetchSolverStats);
      const results = await Promise.all(solverPromises);

      const validSolvers = results.filter((s): s is SolverListItem => s !== null);

      // Sort by reputation score descending
      validSolvers.sort((a, b) => b.reputationScore - a.reputationScore);

      setSolvers(validSolvers);
    } catch (err) {
      console.error('Error fetching all solvers:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch solvers');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAllSolvers();
  }, [fetchAllSolvers]);

  return { solvers, isLoading, error, refetch: fetchAllSolvers };
}
