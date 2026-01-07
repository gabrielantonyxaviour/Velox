'use client';

import { useEffect, useState, useCallback } from 'react';
import { IntentRecord } from '@/app/lib/velox/types';
import {
  getUserIntents as fetchUserIntentIds,
  getIntent,
  fetchIntentEvents,
  getIntentEventData,
} from '@/app/lib/velox/queries';

interface UseUserIntentsResult {
  intents: IntentRecord[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

const POLL_INTERVAL = 5000; // 5 seconds

export function useUserIntents(userAddress: string | null): UseUserIntentsResult {
  const [intents, setIntents] = useState<IntentRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchIntents = useCallback(async (isInitial = false) => {
    if (!userAddress) {
      setIntents([]);
      return;
    }

    try {
      if (isInitial) setLoading(true);
      setError(null);

      // Step 1: Get all intent IDs for this user
      const intentIds = await fetchUserIntentIds(userAddress);

      if (intentIds.length === 0) {
        setIntents([]);
        return;
      }

      // Step 2: Fetch event data for these intents (tx hashes, output amounts)
      // Pass userAddress to also fetch user's transactions for submission tx hashes
      await fetchIntentEvents(intentIds, userAddress);

      // Step 3: Fetch each intent's details in parallel
      const intentPromises = intentIds.map(id => getIntent(id));
      const intentResults = await Promise.all(intentPromises);

      // Step 4: Merge event data with intent records
      const validIntents = intentResults
        .filter((intent): intent is IntentRecord => intent !== null)
        .map(intent => {
          const eventData = getIntentEventData(intent.id);
          if (eventData) {
            return {
              ...intent,
              submissionTxHash: eventData.submissionTxHash || intent.submissionTxHash,
              settlementTxHash: eventData.settlementTxHash || intent.settlementTxHash,
              outputAmount: eventData.outputAmount || intent.outputAmount,
            };
          }
          return intent;
        })
        .sort((a, b) => b.createdAt - a.createdAt);

      setIntents(validIntents);
    } catch (err) {
      console.error('[Velox] Error fetching intents:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch intents');
    } finally {
      setLoading(false);
    }
  }, [userAddress]);

  // Initial fetch
  useEffect(() => {
    fetchIntents(true);
  }, [fetchIntents]);

  // Poll for updates
  useEffect(() => {
    if (!userAddress) return;

    const interval = setInterval(() => fetchIntents(false), POLL_INTERVAL);
    return () => clearInterval(interval);
  }, [userAddress, fetchIntents]);

  return {
    intents,
    loading,
    error,
    refetch: () => fetchIntents(false),
  };
}
