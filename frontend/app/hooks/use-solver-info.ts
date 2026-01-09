'use client';

import { useEffect, useState, useCallback } from 'react';
import { getSolverStats, getSolverReputation, isSolverEligible } from '@/app/lib/velox/queries';

interface SolverInfoResult {
  isRegistered: boolean;
  isActive: boolean;
  isEligible: boolean;
  stake: bigint;
  reputation: number;
  successfulFills: number;
  failedFills: number;
  totalVolume: bigint;
  lastActive: Date | null;
}

interface UseSolverInfoResult {
  info: SolverInfoResult | null;
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
}

export function useSolverInfo(solverAddress: string | null): UseSolverInfoResult {
  const [info, setInfo] = useState<SolverInfoResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchInfo = useCallback(async () => {
    if (!solverAddress) {
      setInfo(null);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      const [stats, reputation, eligible] = await Promise.all([
        getSolverStats(solverAddress),
        getSolverReputation(solverAddress),
        isSolverEligible(solverAddress),
      ]);

      if (!stats) {
        // Solver not registered
        setInfo({
          isRegistered: false,
          isActive: false,
          isEligible: false,
          stake: 0n,
          reputation: 0,
          successfulFills: 0,
          failedFills: 0,
          totalVolume: 0n,
          lastActive: null,
        });
        return;
      }

      setInfo({
        isRegistered: true,
        isActive: stats.isActive,
        isEligible: eligible,
        stake: stats.stake,
        reputation,
        successfulFills: stats.fills,
        failedFills: stats.failures,
        totalVolume: stats.volume,
        lastActive: null, // Not available from current contract
      });
    } catch (err) {
      console.error('[Velox] Error fetching solver info:', err);
      setError(err instanceof Error ? err : new Error('Failed to fetch solver info'));
    } finally {
      setIsLoading(false);
    }
  }, [solverAddress]);

  useEffect(() => {
    fetchInfo();
  }, [fetchInfo]);

  return {
    info,
    isLoading,
    error,
    refetch: fetchInfo,
  };
}

/**
 * Calculate success rate as percentage
 */
export function calculateSuccessRate(successful: number, failed: number): number {
  const total = successful + failed;
  if (total === 0) return 0;
  return (successful / total) * 100;
}

/**
 * Get reputation tier based on score
 */
export function getReputationTier(score: number): {
  tier: 'novice' | 'trusted' | 'expert' | 'elite';
  label: string;
  color: string;
} {
  if (score >= 900) {
    return { tier: 'elite', label: 'Elite', color: 'text-purple-400' };
  }
  if (score >= 700) {
    return { tier: 'expert', label: 'Expert', color: 'text-yellow-400' };
  }
  if (score >= 400) {
    return { tier: 'trusted', label: 'Trusted', color: 'text-blue-400' };
  }
  return { tier: 'novice', label: 'Novice', color: 'text-gray-400' };
}
