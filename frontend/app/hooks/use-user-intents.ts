'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import { IntentRecord } from '@/app/lib/velox/types';
import {
  getUserIntents as fetchUserIntentIds,
  getIntent,
  fetchIntentTransactions,
  getIntentTransactionData,
  storeMakerTransaction,
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
        setLoading(false);
        return;
      }

      // Step 2: Fetch each intent's details in parallel
      const intentPromises = intentIds.map(id => getIntent(id));
      const intentResults = await Promise.all(intentPromises);

      // Step 3: Filter and sort
      const validIntents = intentResults
        .filter((intent): intent is IntentRecord => intent !== null)
        .sort((a, b) => b.createdAt - a.createdAt);

      // Step 4: Fetch transactions from Supabase (much faster than indexer)
      try {
        await fetchIntentTransactions(intentIds);
      } catch (err) {
        console.warn('[Velox] Transaction fetching failed:', err);
      }

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
          // Also store in Supabase for persistence across devices
          storeMakerTransaction(currentMaxId.toString(), pendingTxHash, userAddress);
        }
        lastMaxIntentId.current = currentMaxId;
      }

      // Step 6: Enrich intents with tx hashes from Supabase and localStorage
      const enrichedIntents = validIntents.map((intent) => {
        const txData = getIntentTransactionData(intent.id);
        const localTxHash = getIntentTxHash(intent.id.toString());

        console.log('[Velox] Enriching intent', intent.id.toString(), {
          txData: txData ? { makerTx: txData.makerTxHash?.slice(0,10), takerCount: txData.takerTxHashes.length } : null,
          localTxHash: localTxHash?.slice(0, 10),
          fillCount: intent.fills.length
        });

        // Get submitTxHash: prefer localStorage, fallback to Supabase
        const submitTxHash = localTxHash || txData?.makerTxHash || intent.submitTxHash;

        // Enrich fills with txHash from Supabase taker transactions
        const enrichedFills = intent.fills.map((fill, idx) => {
          // Match by solver address or by index
          const takerTx = txData?.takerTxHashes.find(
            t => t.solver === fill.solver
          ) || txData?.takerTxHashes[idx];
          return {
            ...fill,
            txHash: takerTx?.txHash || fill.txHash,
          };
        });

        // Enrich auction bids with txHash from Supabase bid transactions
        // OR create bids from Supabase if on-chain bids are empty (e.g., after auction completed)
        const enrichedAuction = { ...intent.auction };
        if (txData?.bidTxHashes && txData.bidTxHashes.length > 0) {
          if (enrichedAuction.bids && enrichedAuction.bids.length > 0) {
            // Enrich existing on-chain bids with txHash
            enrichedAuction.bids = enrichedAuction.bids.map((bid) => {
              const bidTx = txData.bidTxHashes.find(b => b.solver === bid.solver);
              return { ...bid, txHash: bidTx?.txHash };
            });
          } else {
            // Create bids from Supabase data (when on-chain bid history not available)
            enrichedAuction.bids = txData.bidTxHashes.map((bidTx) => ({
              solver: bidTx.solver,
              outputAmount: BigInt(bidTx.bidAmount || '0'),
              submittedAt: Math.floor(Date.now() / 1000), // Approximate
              txHash: bidTx.txHash,
            }));
          }
        }

        return {
          ...intent,
          submitTxHash,
          fills: enrichedFills,
          auction: enrichedAuction,
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
