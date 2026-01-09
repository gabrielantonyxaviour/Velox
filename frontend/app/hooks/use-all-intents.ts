'use client';

import { useEffect, useState, useCallback } from 'react';
import { IntentRecord, AuctionBid } from '@/app/lib/velox/types';
import { getTotalIntents, getIntent, getAuctionSolutions, getAuctionInfo } from '@/app/lib/velox/queries';
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

interface AuctionStartedEvent {
  intent_id: string;
  start_time: string;
  end_time: string;
}

interface DutchAuctionCreatedEvent {
  intent_id: string;
  start_price: string;
  end_price: string;
  duration: string;
  start_time: string;
}

interface AuctionCompletedEvent {
  intent_id: string;
  winner: string;
  winning_bid?: string;
}

interface DutchAuctionAcceptedEvent {
  intent_id: string;
  solver: string;
  accepted_price: string;
}

interface SolutionSubmittedEvent {
  intent_id: string;
  solver: string;
  output_amount: string;
  rank: string;
}

interface TransactionEvent {
  type: string;
  data: Record<string, unknown>;
}

interface Transaction {
  hash: string;
  events: TransactionEvent[];
}

// Track auction info per intent
interface AuctionInfo {
  type: 'sealed-bid' | 'dutch';
  status: 'active' | 'completed' | 'cancelled';
  startTime?: number;
  endTime?: number;
  startPrice?: bigint;
  endPrice?: bigint;
  duration?: number;
  winner?: string;
  acceptedPrice?: bigint;
  bidCount?: number;
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

      // 3. Fetch solver and auction data from events
      const solverMap = new Map<string, SolverInfo>();
      const auctionMap = new Map<string, AuctionInfo>();

      try {
        const response = await fetch(
          `${RPC_URL}/accounts/${VELOX_ADDRESS}/transactions?limit=200`
        );

        if (response.ok) {
          const transactions: Transaction[] = await response.json();

          for (const tx of transactions) {
            if (!tx.events) continue;

            for (const event of tx.events) {
              // Track IntentFilled events for solver stats
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

              // Track sealed-bid auction events
              if (event.type === `${VELOX_ADDRESS}::auction::AuctionStarted`) {
                const data = event.data as unknown as AuctionStartedEvent;
                auctionMap.set(data.intent_id, {
                  type: 'sealed-bid',
                  status: 'active',
                  startTime: Number(data.start_time || 0),
                  endTime: Number(data.end_time || 0),
                  bidCount: 0,
                });
              }

              // Track solution submissions for bid count (contract emits SolutionSubmitted)
              if (event.type === `${VELOX_ADDRESS}::auction::SolutionSubmitted`) {
                const data = event.data as unknown as SolutionSubmittedEvent;
                const existing = auctionMap.get(data.intent_id);
                if (existing) {
                  existing.bidCount = (existing.bidCount || 0) + 1;
                }
              }

              if (event.type === `${VELOX_ADDRESS}::auction::AuctionCompleted`) {
                const data = event.data as unknown as AuctionCompletedEvent;
                const existing = auctionMap.get(data.intent_id);
                if (existing) {
                  existing.status = 'completed';
                  existing.winner = data.winner;
                  if (data.winning_bid) {
                    existing.acceptedPrice = BigInt(data.winning_bid);
                  }
                }
              }

              if (event.type === `${VELOX_ADDRESS}::auction::AuctionCancelled`) {
                const data = event.data as { intent_id: string };
                const existing = auctionMap.get(data.intent_id);
                if (existing) {
                  existing.status = 'cancelled';
                }
              }

              // Track Dutch auction events
              if (event.type === `${VELOX_ADDRESS}::auction::DutchAuctionCreated`) {
                const data = event.data as unknown as DutchAuctionCreatedEvent;
                auctionMap.set(data.intent_id, {
                  type: 'dutch',
                  status: 'active',
                  startTime: Number(data.start_time || 0),
                  startPrice: BigInt(data.start_price || '0'),
                  endPrice: BigInt(data.end_price || '0'),
                  duration: Number(data.duration || 0),
                });
              }

              if (event.type === `${VELOX_ADDRESS}::auction::DutchAuctionAccepted`) {
                const data = event.data as unknown as DutchAuctionAcceptedEvent;
                const existing = auctionMap.get(data.intent_id);
                if (existing) {
                  existing.status = 'completed';
                  existing.winner = data.solver;
                  existing.acceptedPrice = BigInt(data.accepted_price || '0');
                }
              }
            }
          }
        }
      } catch {
        // Ignore event fetch errors
      }

      // Apply auction info to intents
      for (const intent of validIntents) {
        const auctionInfo = auctionMap.get(intent.id.toString());
        if (auctionInfo) {
          intent.auctionType = auctionInfo.type;
          intent.auctionStatus = auctionInfo.status;
          intent.auctionStartTime = auctionInfo.startTime;
          intent.auctionEndTime = auctionInfo.endTime;
          intent.auctionStartPrice = auctionInfo.startPrice;
          intent.auctionEndPrice = auctionInfo.endPrice;
          intent.auctionDuration = auctionInfo.duration;
          intent.auctionWinner = auctionInfo.winner;
          intent.auctionAcceptedPrice = auctionInfo.acceptedPrice;
          intent.bidCount = auctionInfo.bidCount;
        }
      }

      // Fetch actual bid details from on-chain for sealed-bid auctions
      const sealedBidIntents = validIntents.filter(i => i.auctionType === 'sealed-bid');
      if (sealedBidIntents.length > 0) {
        const bidFetchPromises = sealedBidIntents.map(async (intent) => {
          try {
            // Fetch solutions from on-chain
            const solutions = await getAuctionSolutions(intent.id);
            const auctionData = await getAuctionInfo(intent.id);

            if (solutions.length > 0) {
              // Convert solutions to AuctionBid format
              const bids: AuctionBid[] = solutions.map((sol) => ({
                bidder: sol.solver,
                amount: sol.outputAmount,
                timestamp: sol.expiresAt - 60, // Approximate submission time (auction duration)
                isWinner: auctionData?.winner === sol.solver,
              }));

              // Sort by amount descending (highest bid first)
              bids.sort((a, b) => Number(b.amount - a.amount));
              intent.bids = bids;
              intent.bidCount = bids.length;

              // Update winner if we have auction data
              if (auctionData?.winner) {
                intent.auctionWinner = auctionData.winner;
              }
            }
          } catch {
            // Ignore errors for individual intent bid fetching
          }
        });

        await Promise.all(bidFetchPromises);
      }

      setIntents(validIntents);

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
