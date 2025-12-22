'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import { IntentRecord } from '@/app/lib/velox/types';
import {
  getUserIntents as fetchUserIntentIds,
  getIntent,
  fetchIntentEvents,
  getIntentEventData,
} from '@/app/lib/velox/queries';
import {
  consumePendingTxHash,
  storeIntentTxHash,
  getIntentTxHash,
  cleanupOldTxHashes,
} from '@/app/lib/velox/intent-tx-store';

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
  const lastMaxIntentId = useRef<bigint>(0n);

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

      // Step 2: Fetch each intent's details in parallel
      const intentPromises = intentIds.map(id => getIntent(id));
      const intentResults = await Promise.all(intentPromises);

      // Step 3: Filter and sort
      const validIntents = intentResults
        .filter((intent): intent is IntentRecord => intent !== null)
        .sort((a, b) => b.createdAt - a.createdAt);

      // Step 4: Fetch events for all intents (for tx hashes)
      await fetchIntentEvents(intentIds, userAddress);

      // Step 5: Check for pending tx hash and associate with newest intent
      const currentMaxId = validIntents.length > 0
        ? validIntents.reduce((max, i) => i.id > max ? i.id : max, 0n)
        : 0n;

      if (currentMaxId > lastMaxIntentId.current) {
        // New intent detected - check for pending tx hash
        const pendingTxHash = consumePendingTxHash(userAddress);
        if (pendingTxHash) {
          storeIntentTxHash(currentMaxId.toString(), pendingTxHash);
          cleanupOldTxHashes();
        }
        lastMaxIntentId.current = currentMaxId;
      }

      // Step 6: Enrich intents with tx hashes from events and localStorage
      const enrichedIntents = validIntents.map((intent) => {
        const eventData = getIntentEventData(intent.id);
        const localTxHash = getIntentTxHash(intent.id.toString());

        // Get submitTxHash: prefer localStorage, fallback to events
        const submitTxHash = localTxHash || eventData?.submissionTxHash || intent.submitTxHash;

        // Enrich fills with txHash from events
        const enrichedFills = intent.fills.map((fill, idx) => {
          const fillNumber = idx + 1;
          const fillEvent = eventData?.fillTxHashes.find(
            f => f.fillNumber === fillNumber ||
              (f.solver === fill.solver && f.inputAmount === fill.inputAmount)
          );
          return {
            ...fill,
            txHash: fillEvent?.txHash || fill.txHash,
          };
        });

        return {
          ...intent,
          submitTxHash,
          fills: enrichedFills,
        };
      });

      setIntents(enrichedIntents);
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
