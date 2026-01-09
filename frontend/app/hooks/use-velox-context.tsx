'use client';

import { createContext, useContext, useEffect, useState, useCallback, ReactNode } from 'react';
import { VELOX_ADDRESS } from '@/app/lib/aptos';
import { PROTOCOL_FEE_BPS } from '@/app/lib/velox/types';
import { getTotalIntents, getTotalSolvers } from '@/app/lib/velox/queries';

interface VeloxContextValue {
  // Contract addresses
  registryAddr: string;
  feeConfigAddr: string;
  escrowAddr: string;

  // Cached protocol data
  feeBps: number;
  totalIntents: number;
  totalSolvers: number;

  // Loading state
  isLoading: boolean;

  // Actions
  refetchStats: () => void;
}

const defaultValue: VeloxContextValue = {
  registryAddr: VELOX_ADDRESS,
  feeConfigAddr: VELOX_ADDRESS,
  escrowAddr: VELOX_ADDRESS,
  feeBps: PROTOCOL_FEE_BPS,
  totalIntents: 0,
  totalSolvers: 0,
  isLoading: true,
  refetchStats: () => {},
};

const VeloxContext = createContext<VeloxContextValue>(defaultValue);

export function useVeloxContext() {
  return useContext(VeloxContext);
}

interface VeloxProviderProps {
  children: ReactNode;
}

const STATS_CACHE_DURATION = 60000; // 60 seconds
let lastStatsUpdate = 0;
let cachedTotalIntents = 0;
let cachedTotalSolvers = 0;

export function VeloxProvider({ children }: VeloxProviderProps) {
  const [totalIntents, setTotalIntents] = useState(cachedTotalIntents);
  const [totalSolvers, setTotalSolvers] = useState(cachedTotalSolvers);
  const [isLoading, setIsLoading] = useState(true);

  const fetchStats = useCallback(async (force = false) => {
    const now = Date.now();

    // Use cache if not expired
    if (!force && now - lastStatsUpdate < STATS_CACHE_DURATION) {
      setTotalIntents(cachedTotalIntents);
      setTotalSolvers(cachedTotalSolvers);
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      const [intents, solvers] = await Promise.all([
        getTotalIntents(),
        getTotalSolvers(),
      ]);

      const intentsNum = Number(intents);
      const solversNum = Number(solvers);

      // Update cache
      cachedTotalIntents = intentsNum;
      cachedTotalSolvers = solversNum;
      lastStatsUpdate = now;

      setTotalIntents(intentsNum);
      setTotalSolvers(solversNum);
    } catch (err) {
      console.error('[Velox] Error fetching protocol stats:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  const value: VeloxContextValue = {
    registryAddr: VELOX_ADDRESS,
    feeConfigAddr: VELOX_ADDRESS,
    escrowAddr: VELOX_ADDRESS,
    feeBps: PROTOCOL_FEE_BPS,
    totalIntents,
    totalSolvers,
    isLoading,
    refetchStats: () => fetchStats(true),
  };

  return (
    <VeloxContext.Provider value={value}>
      {children}
    </VeloxContext.Provider>
  );
}
