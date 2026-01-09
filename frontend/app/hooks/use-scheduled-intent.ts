'use client';

import { useEffect, useState, useMemo, useRef } from 'react';
import { IntentRecord, Fill, isScheduledIntent, getAverageExecutionPrice } from '@/app/lib/velox/types';
import { useIntent } from './use-intent';

interface UseScheduledIntentResult {
  chunksExecuted: number;
  totalChunks: number;
  nextExecution: Date | null;
  timeUntilNext: number; // seconds
  isReady: boolean; // can execute now
  averagePrice: bigint | null;
  fills: Fill[];
  progressPercent: number;
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
}

export function useScheduledIntent(intentId: number | bigint | null): UseScheduledIntentResult {
  const { intent, isLoading, error, refetch } = useIntent(intentId, {
    refetchInterval: 15000, // Longer interval for scheduled intents
  });

  const [currentTime, setCurrentTime] = useState(() => Math.floor(Date.now() / 1000));
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Update current time every second for countdown
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCurrentTime(Math.floor(Date.now() / 1000));
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  // Calculate scheduled intent specific data
  const scheduledData = useMemo(() => {
    if (!intent || !isScheduledIntent(intent.intent)) {
      return {
        chunksExecuted: 0,
        totalChunks: 0,
        nextExecution: null,
        timeUntilNext: 0,
        isReady: false,
        averagePrice: null,
        progressPercent: 0,
      };
    }

    const { intent: intentDetails, chunksExecuted, nextExecution, fills } = intent;
    let totalChunks = 0;

    if (intentDetails.type === 'twap') {
      totalChunks = intentDetails.numChunks ?? 0;
    } else if (intentDetails.type === 'dca') {
      totalChunks = intentDetails.totalPeriods ?? 0;
    }

    const nextExecutionDate = nextExecution > 0 ? new Date(nextExecution * 1000) : null;
    const timeUntilNext = nextExecution > 0 ? Math.max(0, nextExecution - currentTime) : 0;
    const isReady = nextExecution > 0 && currentTime >= nextExecution && chunksExecuted < totalChunks;
    const averagePrice = getAverageExecutionPrice(intent);
    const progressPercent = totalChunks > 0 ? (chunksExecuted / totalChunks) * 100 : 0;

    return {
      chunksExecuted,
      totalChunks,
      nextExecution: nextExecutionDate,
      timeUntilNext,
      isReady,
      averagePrice,
      progressPercent,
    };
  }, [intent, currentTime]);

  return {
    ...scheduledData,
    fills: intent?.fills ?? [],
    isLoading,
    error,
    refetch,
  };
}

/**
 * Format countdown to next execution
 */
export function formatCountdown(seconds: number): string {
  if (seconds <= 0) return 'Ready';

  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  if (days > 0) {
    return `${days}d ${hours}h`;
  }
  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }
  if (minutes > 0) {
    return `${minutes}m ${secs}s`;
  }
  return `${secs}s`;
}

/**
 * Get progress bar color based on completion
 */
export function getProgressColor(percent: number): string {
  if (percent >= 100) return 'bg-green-500';
  if (percent >= 75) return 'bg-blue-500';
  if (percent >= 50) return 'bg-yellow-500';
  if (percent >= 25) return 'bg-orange-500';
  return 'bg-red-500';
}
