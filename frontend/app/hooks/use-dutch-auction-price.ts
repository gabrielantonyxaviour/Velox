'use client';

import { useEffect, useState, useCallback, useRef } from 'react';

interface UseDutchAuctionPriceOptions {
  startPrice: bigint;
  endPrice: bigint;
  startTime: number;
  endTime: number;
}

interface UseDutchAuctionPriceResult {
  currentPrice: bigint;
  pricePercent: number; // 0-100, how far through decay
  timeRemaining: number; // seconds
  isEnded: boolean;
}

/**
 * Calculate Dutch auction price using linear decay
 * Matches contract's get_current_dutch_price logic
 */
function calculateDutchPrice(
  startPrice: bigint,
  endPrice: bigint,
  startTime: number,
  endTime: number,
  currentTime: number
): bigint {
  if (currentTime >= endTime) {
    return endPrice;
  }

  if (currentTime <= startTime) {
    return startPrice;
  }

  const totalDuration = BigInt(endTime - startTime);
  const elapsed = BigInt(currentTime - startTime);
  const priceDrop = startPrice - endPrice;

  // Linear decay: currentPrice = startPrice - (priceDrop * elapsed / totalDuration)
  const decayedAmount = (priceDrop * elapsed) / totalDuration;
  return startPrice - decayedAmount;
}

export function useDutchAuctionPrice(
  options: UseDutchAuctionPriceOptions | null
): UseDutchAuctionPriceResult {
  const { startPrice, endPrice, startTime, endTime } = options || {
    startPrice: 0n,
    endPrice: 0n,
    startTime: 0,
    endTime: 0,
  };

  const [currentTime, setCurrentTime] = useState(() => Math.floor(Date.now() / 1000));
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Calculate derived values
  const currentPrice = options
    ? calculateDutchPrice(startPrice, endPrice, startTime, endTime, currentTime)
    : 0n;

  const totalDuration = endTime - startTime;
  const elapsed = Math.max(0, Math.min(currentTime - startTime, totalDuration));
  const pricePercent = totalDuration > 0 ? (elapsed / totalDuration) * 100 : 0;
  const timeRemaining = Math.max(0, endTime - currentTime);
  const isEnded = currentTime >= endTime;

  // Update every second
  useEffect(() => {
    if (!options || isEnded) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    intervalRef.current = setInterval(() => {
      setCurrentTime(Math.floor(Date.now() / 1000));
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [options, isEnded]);

  return {
    currentPrice,
    pricePercent,
    timeRemaining,
    isEnded,
  };
}

/**
 * Format price decay for display
 */
export function formatPriceDecay(pricePercent: number): string {
  return `${pricePercent.toFixed(1)}% decayed`;
}

/**
 * Format time remaining for display
 */
export function formatTimeRemaining(seconds: number): string {
  if (seconds <= 0) return 'Ended';

  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }
  if (minutes > 0) {
    return `${minutes}m ${secs}s`;
  }
  return `${secs}s`;
}
