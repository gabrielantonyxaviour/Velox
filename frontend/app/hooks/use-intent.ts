'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import { IntentRecord } from '@/app/lib/velox/types';
import { getIntent } from '@/app/lib/velox/queries';

interface UseIntentOptions {
  refetchInterval?: number;
  enabled?: boolean;
}

interface UseIntentResult {
  intent: IntentRecord | null;
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
}

const DEFAULT_POLL_INTERVAL = 10000; // 10 seconds

// Terminal states that don't need polling
const TERMINAL_STATUSES = ['filled', 'cancelled', 'expired'];

export function useIntent(
  intentId: number | bigint | null,
  options: UseIntentOptions = {}
): UseIntentResult {
  const { refetchInterval = DEFAULT_POLL_INTERVAL, enabled = true } = options;

  const [intent, setIntent] = useState<IntentRecord | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const fetchIntent = useCallback(async (isInitial = false) => {
    if (intentId === null || !enabled) {
      setIntent(null);
      return;
    }

    try {
      if (isInitial) setIsLoading(true);
      setError(null);

      const id = typeof intentId === 'number' ? BigInt(intentId) : intentId;
      const result = await getIntent(id);
      setIntent(result);
    } catch (err) {
      console.error('[Velox] Error fetching intent:', err);
      setError(err instanceof Error ? err : new Error('Failed to fetch intent'));
    } finally {
      setIsLoading(false);
    }
  }, [intentId, enabled]);

  // Initial fetch
  useEffect(() => {
    fetchIntent(true);
  }, [fetchIntent]);

  // Polling - only for non-terminal states
  useEffect(() => {
    if (!enabled || intentId === null) return;

    // Don't poll for terminal states
    if (intent && TERMINAL_STATUSES.includes(intent.status)) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    intervalRef.current = setInterval(() => fetchIntent(false), refetchInterval);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [intentId, enabled, refetchInterval, fetchIntent, intent?.status]);

  return {
    intent,
    isLoading,
    error,
    refetch: () => fetchIntent(false),
  };
}
