'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import { getTotalIntents, getTotalSolvers } from '@/app/lib/velox/queries';
import { VELOX_ADDRESS } from '@/app/lib/aptos';
import { PROTOCOL_FEE_BPS } from '@/app/lib/velox/types';

interface ProtocolStats {
  totalIntents: number;
  totalSolvers: number;
  feeBps: number;
  escrowAddress: string;
}

interface UseProtocolStatsResult {
  stats: ProtocolStats | null;
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
}

const CACHE_DURATION = 60000; // 60 seconds cache

// Module-level cache for protocol stats
let cachedStats: ProtocolStats | null = null;
let lastFetchTime = 0;

export function useProtocolStats(): UseProtocolStatsResult {
  const [stats, setStats] = useState<ProtocolStats | null>(cachedStats);
  const [isLoading, setIsLoading] = useState(!cachedStats);
  const [error, setError] = useState<Error | null>(null);
  const fetchingRef = useRef(false);

  const fetchStats = useCallback(async (force = false) => {
    const now = Date.now();

    // Use cache if available and not expired
    if (!force && cachedStats && now - lastFetchTime < CACHE_DURATION) {
      setStats(cachedStats);
      setIsLoading(false);
      return;
    }

    // Prevent concurrent fetches
    if (fetchingRef.current) return;
    fetchingRef.current = true;

    try {
      setIsLoading(true);
      setError(null);

      const [totalIntents, totalSolvers] = await Promise.all([
        getTotalIntents(),
        getTotalSolvers(),
      ]);

      const newStats: ProtocolStats = {
        totalIntents: Number(totalIntents),
        totalSolvers,
        feeBps: PROTOCOL_FEE_BPS,
        escrowAddress: VELOX_ADDRESS,
      };

      // Update cache
      cachedStats = newStats;
      lastFetchTime = now;

      setStats(newStats);
    } catch (err) {
      console.error('[Velox] Error fetching protocol stats:', err);
      setError(err instanceof Error ? err : new Error('Failed to fetch protocol stats'));
    } finally {
      setIsLoading(false);
      fetchingRef.current = false;
    }
  }, []);

  // Initial fetch
  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  return {
    stats,
    isLoading,
    error,
    refetch: () => fetchStats(true),
  };
}

/**
 * Format fee percentage for display
 */
export function formatFeeBps(bps: number): string {
  return `${(bps / 100).toFixed(2)}%`;
}
