'use client';

import { useEffect, useState, useCallback } from 'react';
import {
  getTotalIntents,
  getTotalSolvers,
  getActiveSolverCount,
} from '@/app/lib/velox/queries';

interface ExplorerStats {
  totalIntents: number;
  activeSolvers: number;
  totalSolvers: number;
}

interface UseExplorerStatsResult {
  stats: ExplorerStats | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

const POLL_INTERVAL = 10000; // 10 seconds

export function useExplorerStats(): UseExplorerStatsResult {
  const [stats, setStats] = useState<ExplorerStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = useCallback(async () => {
    try {
      const [totalIntents, totalSolvers, activeSolvers] = await Promise.all([
        getTotalIntents(),
        getTotalSolvers(),
        getActiveSolverCount(),
      ]);

      setStats({
        totalIntents: Number(totalIntents),
        activeSolvers,
        totalSolvers,
      });
      setError(null);
    } catch (err) {
      // MISSING_DATA is expected when contracts haven't been initialized
      const errorMessage = err instanceof Error ? err.message : String(err);
      if (!errorMessage.includes('MISSING_DATA')) {
        console.warn('[Velox] Error fetching stats:', err);
        setError(errorMessage);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial fetch
  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  // Poll for updates
  useEffect(() => {
    const interval = setInterval(fetchStats, POLL_INTERVAL);
    return () => clearInterval(interval);
  }, [fetchStats]);

  return { stats, loading, error, refetch: fetchStats };
}
