import { useState, useEffect, useCallback } from 'react';
import { aptos, VELOX_ADDRESS } from '@/app/lib/aptos';
import { getSolverMetadata, getAllSolverMetadata } from '@/app/lib/solver-metadata';

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
  name?: string;
  imageUrl?: string;
  description?: string;
}

/**
 * Fetch all registered solver addresses from contract
 */
async function fetchSolverAddresses(): Promise<string[]> {
  try {
    const result = await aptos.view({
      payload: {
        function: `${VELOX_ADDRESS}::solver_registry::get_all_solvers`,
        typeArguments: [],
        functionArguments: [VELOX_ADDRESS],
      },
    });

    const addresses = result[0] as string[];
    return Array.isArray(addresses) ? addresses : [];
  } catch (error) {
    console.error('Error fetching solver addresses:', error);
    return [];
  }
}

/**
 * Fetch solver stats from contract and merge with metadata
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

    const statsResult = await aptos.view({
      payload: {
        function: `${VELOX_ADDRESS}::solver_registry::get_solver_stats`,
        typeArguments: [],
        functionArguments: [VELOX_ADDRESS, address],
      },
    });

    const stakeResult = await aptos.view({
      payload: {
        function: `${VELOX_ADDRESS}::solver_registry::get_stake`,
        typeArguments: [],
        functionArguments: [VELOX_ADDRESS, address],
      },
    });

    const isActiveResult = await aptos.view({
      payload: {
        function: `${VELOX_ADDRESS}::solver_registry::is_active`,
        typeArguments: [],
        functionArguments: [VELOX_ADDRESS, address],
      },
    });

    // get_solver_stats returns: (successful_fills, failed_fills, reputation, total_volume)
    const [successfulFills, failedFills, reputationScore, totalVolume] = statsResult;

    // Fetch metadata from localStorage
    let metadata = getSolverMetadata(address);

    // If not found by address, check all stored metadata and use the most recent one
    if (!metadata) {
      const allMetadata = getAllSolverMetadata();
      const metadataArray = Object.values(allMetadata);
      if (metadataArray.length > 0) {
        // Use the most recently created metadata (assumes only one solver registered per browser)
        metadata = metadataArray.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0))[0];
      }
    }

    return {
      address,
      stake: BigInt(stakeResult[0] as string),
      isActive: Boolean(isActiveResult[0]),
      reputationScore: Number(reputationScore),
      totalIntentsSolved: Number(successfulFills) + Number(failedFills),
      successfulFills: Number(successfulFills),
      failedFills: Number(failedFills),
      totalVolume: BigInt(totalVolume as string),
      averageSlippage: 0,
      registeredAt: 0,
      name: metadata?.name,
      imageUrl: metadata?.imageUrl,
      description: metadata?.description,
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
