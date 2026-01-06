'use client';

import { useEffect, useState, useCallback, useRef, useMemo } from 'react';
import { AuctionState, Bid, IntentRecord } from '@/app/lib/velox/types';
import { getIntent, getAuctionBids, getAuctionWinner, getDutchAuctionPrice } from '@/app/lib/velox/queries';

interface UseAuctionResult {
  auction: AuctionState;
  bids: Bid[];
  winner: { hasWinner: boolean; address: string };
  timeRemaining: number;
  currentPrice: bigint | null; // For Dutch auctions
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
}

const POLL_INTERVAL = 3000; // 3 seconds for faster real-time updates

// Terminal auction states that don't need polling
const TERMINAL_AUCTION_TYPES = ['none', 'sealed_bid_completed', 'dutch_accepted', 'failed'];

export function useAuction(intentId: number | bigint | null): UseAuctionResult {
  const [intent, setIntent] = useState<IntentRecord | null>(null);
  const [bids, setBids] = useState<Bid[]>([]);
  const [winner, setWinner] = useState<{ hasWinner: boolean; address: string }>({
    hasWinner: false,
    address: '',
  });
  const [currentPrice, setCurrentPrice] = useState<bigint | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const fetchAuctionData = useCallback(async (isInitial = false) => {
    if (intentId === null) {
      setIntent(null);
      setBids([]);
      return;
    }

    try {
      if (isInitial) setIsLoading(true);
      setError(null);

      const id = typeof intentId === 'number' ? BigInt(intentId) : intentId;

      // Fetch intent data (includes auction state)
      const intentData = await getIntent(id);
      setIntent(intentData);

      if (!intentData) return;

      // Fetch additional auction data based on type
      if (intentData.auction.type === 'sealed_bid_active' ||
          intentData.auction.type === 'sealed_bid_completed') {
        const [fetchedBids, winnerData] = await Promise.all([
          getAuctionBids(id),
          getAuctionWinner(id),
        ]);
        setBids(fetchedBids);
        setWinner({ hasWinner: winnerData.hasWinner, address: winnerData.winner });
      }

      if (intentData.auction.type === 'dutch_active') {
        const price = await getDutchAuctionPrice(id);
        setCurrentPrice(price);
      } else {
        setCurrentPrice(null);
      }
    } catch (err) {
      console.error('[Velox] Error fetching auction:', err);
      setError(err instanceof Error ? err : new Error('Failed to fetch auction'));
    } finally {
      setIsLoading(false);
    }
  }, [intentId]);

  // Initial fetch
  useEffect(() => {
    fetchAuctionData(true);
  }, [fetchAuctionData]);

  // Polling for active auctions
  useEffect(() => {
    if (intentId === null) return;

    // Don't poll for terminal auction states
    if (intent && TERMINAL_AUCTION_TYPES.includes(intent.auction.type)) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    intervalRef.current = setInterval(() => fetchAuctionData(false), POLL_INTERVAL);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [intentId, fetchAuctionData, intent?.auction.type]);

  // Calculate time remaining
  const timeRemaining = useMemo(() => {
    if (!intent) return 0;

    const now = Math.floor(Date.now() / 1000);
    const auction = intent.auction;

    if (auction.type === 'sealed_bid_active' && auction.endTime) {
      return Math.max(0, auction.endTime - now);
    }

    if (auction.type === 'dutch_active' && auction.endTime) {
      return Math.max(0, auction.endTime - now);
    }

    if (auction.type === 'sealed_bid_completed' && auction.fillDeadline) {
      return Math.max(0, auction.fillDeadline - now);
    }

    return 0;
  }, [intent]);

  return {
    auction: intent?.auction ?? { type: 'none' },
    bids,
    winner,
    timeRemaining,
    currentPrice,
    isLoading,
    error,
    refetch: () => fetchAuctionData(false),
  };
}
