'use client';

import { useEffect, useState, useCallback } from 'react';
import { IntentRecord } from '@/app/lib/velox/types';
import {
  getUserIntents as fetchUserIntentIds,
  getIntent,
  fetchIntentEvents,
  getIntentEventData,
} from '@/app/lib/velox/queries';
import { VELOX_ADDRESS, MOVEMENT_CONFIGS, CURRENT_NETWORK } from '@/app/lib/aptos';
import { getStoredAuctionInfo, cleanupOldAuctionEntries, checkAuctionForIntent, storeAuctionIntent } from '@/app/lib/velox/auction-storage';

interface UseUserIntentsResult {
  intents: IntentRecord[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

// Auction event types
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

interface BidSubmittedEvent {
  intent_id: string;
  solver: string;
}

interface TransactionEvent {
  type: string;
  data: Record<string, unknown>;
}

interface Transaction {
  hash: string;
  events: TransactionEvent[];
}

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

      // Step 5: Fetch auction info and apply to intents
      const auctionMap = new Map<string, AuctionInfo>();
      try {
        const response = await fetch(
          `${RPC_URL}/accounts/${VELOX_ADDRESS}/transactions?limit=200`
        );

        if (response.ok) {
          const transactions: Transaction[] = await response.json();
          console.log('[Velox] Fetched transactions for auction events:', transactions.length);

          for (const tx of transactions) {
            if (!tx.events) continue;

            for (const event of tx.events) {
              // Log auction-related events for debugging
              if (event.type.includes('auction')) {
                console.log('[Velox] Found auction event:', event.type, event.data);
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

              // Track bid submissions for bid count
              if (event.type === `${VELOX_ADDRESS}::auction::BidSubmitted`) {
                const data = event.data as unknown as BidSubmittedEvent;
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
        // Ignore auction fetch errors
      }

      // Apply auction info to intents (from blockchain events OR localStorage)
      // Cleanup old localStorage entries first
      cleanupOldAuctionEntries();

      console.log('[Velox] Auction map size (from blockchain):', auctionMap.size);

      for (const intent of validIntents) {
        const intentIdStr = intent.id.toString();

        // First check localStorage (more reliable for recent submissions)
        const storedInfo = getStoredAuctionInfo(intentIdStr);
        if (storedInfo) {
          console.log('[Velox] Applying stored auction info to intent:', intentIdStr, storedInfo);
          intent.auctionType = storedInfo.type;
          intent.auctionStatus = intent.status === 'filled' ? 'completed' : 'active';
          intent.auctionStartTime = storedInfo.startTime;
          intent.auctionEndTime = storedInfo.endTime;
          intent.auctionDuration = storedInfo.duration;
          if (storedInfo.startPrice) {
            intent.auctionStartPrice = BigInt(storedInfo.startPrice);
          }
          if (storedInfo.endPrice) {
            intent.auctionEndPrice = BigInt(storedInfo.endPrice);
          }
          continue; // Skip blockchain lookup for this intent
        }

        // Fallback to blockchain event data
        const auctionInfo = auctionMap.get(intentIdStr);
        if (auctionInfo) {
          console.log('[Velox] Applying blockchain auction info to intent:', intentIdStr, auctionInfo);
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
        } else {
          // Third fallback: query contract directly for auction info
          try {
            const onChainAuction = await checkAuctionForIntent(BigInt(intent.id));
            if (onChainAuction) {
              console.log('[Velox] Found on-chain auction for intent:', intentIdStr, onChainAuction);
              intent.auctionType = onChainAuction.type;
              intent.auctionStatus = intent.status === 'filled' ? 'completed' : 'active';
              intent.auctionStartTime = onChainAuction.startTime;
              intent.auctionEndTime = onChainAuction.endTime;
              intent.auctionDuration = onChainAuction.duration;
              if (onChainAuction.startPrice) {
                intent.auctionStartPrice = BigInt(onChainAuction.startPrice);
              }
              if (onChainAuction.endPrice) {
                intent.auctionEndPrice = BigInt(onChainAuction.endPrice);
              }
              // Store for future lookups
              storeAuctionIntent(intentIdStr, onChainAuction.type, {
                duration: onChainAuction.duration,
                startPrice: onChainAuction.startPrice ? BigInt(onChainAuction.startPrice) : undefined,
                endPrice: onChainAuction.endPrice ? BigInt(onChainAuction.endPrice) : undefined,
              });
            }
          } catch {
            // Ignore contract query errors
          }
        }
      }

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
