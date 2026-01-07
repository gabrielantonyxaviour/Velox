'use client';

import { useEffect, useState, useCallback } from 'react';
import { IntentRecord } from '@/app/lib/velox/types';
import { getTotalIntents, getIntent } from '@/app/lib/velox/queries';
import { VELOX_ADDRESS, MOVEMENT_CONFIGS, CURRENT_NETWORK } from '@/app/lib/aptos';

interface SolverInfo {
  address: string;
  fillCount: number;
  totalVolume: bigint;
}

interface UseAllIntentsResult {
  intents: IntentRecord[];
  solvers: SolverInfo[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

interface IntentFilledEvent {
  intent_id: string;
  solver: string;
  output_amount: string;
}

interface TransactionEvent {
  type: string;
  data: Record<string, unknown>;
}

interface Transaction {
  hash: string;
  events: TransactionEvent[];
}

const RPC_URL = MOVEMENT_CONFIGS[CURRENT_NETWORK].fullnode;
const POLL_INTERVAL = 15000; // 15 seconds
const MAX_INTENTS_TO_FETCH = 50; // Limit for performance

export function useAllIntents(): UseAllIntentsResult {
  const [intents, setIntents] = useState<IntentRecord[]>([]);
  const [solvers, setSolvers] = useState<SolverInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async (isInitial = false) => {
    try {
      if (isInitial) setLoading(true);
      setError(null);

      // 1. Get total intents count
      const totalIntents = await getTotalIntents();
      const total = Number(totalIntents);

      if (total === 0) {
        setIntents([]);
        setSolvers([]);
        return;
      }

      // 2. Fetch recent intents (from newest to oldest)
      const startId = Math.max(0, total - MAX_INTENTS_TO_FETCH);
      const intentPromises: Promise<IntentRecord | null>[] = [];

      for (let i = total - 1; i >= startId; i--) {
        intentPromises.push(getIntent(BigInt(i)));
      }

      const intentResults = await Promise.all(intentPromises);
      const validIntents = intentResults
        .filter((intent): intent is IntentRecord => intent !== null)
        .sort((a, b) => b.createdAt - a.createdAt);

      setIntents(validIntents);

      // 3. Fetch solver data from events
      const solverMap = new Map<string, SolverInfo>();

      try {
        const response = await fetch(
          `${RPC_URL}/accounts/${VELOX_ADDRESS}/transactions?limit=200`
        );

        if (response.ok) {
          const transactions: Transaction[] = await response.json();

          for (const tx of transactions) {
            if (!tx.events) continue;

            for (const event of tx.events) {
              if (event.type === `${VELOX_ADDRESS}::settlement::IntentFilled`) {
                const data = event.data as unknown as IntentFilledEvent;
                const solverAddr = data.solver;
                const outputAmount = BigInt(data.output_amount || '0');

                const existing = solverMap.get(solverAddr) || {
                  address: solverAddr,
                  fillCount: 0,
                  totalVolume: BigInt(0),
                };

                existing.fillCount += 1;
                existing.totalVolume += outputAmount;
                solverMap.set(solverAddr, existing);
              }
            }
          }
        }
      } catch {
        // Ignore event fetch errors
      }

      // Convert map to sorted array
      const solverList = Array.from(solverMap.values())
        .sort((a, b) => b.fillCount - a.fillCount);

      setSolvers(solverList);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      if (!errorMessage.includes('MISSING_DATA')) {
        console.warn('[Velox] Error fetching all intents:', err);
        setError(errorMessage);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData(true);
  }, [fetchData]);

  useEffect(() => {
    const interval = setInterval(() => fetchData(false), POLL_INTERVAL);
    return () => clearInterval(interval);
  }, [fetchData]);

  return { intents, solvers, loading, error, refetch: () => fetchData(false) };
}
