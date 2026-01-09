// Local storage for auction type info
// This ensures auction type is preserved even if blockchain event fetching fails

import { aptos, VELOX_ADDRESS } from '../aptos';

const AUCTION_STORAGE_KEY = 'velox_auction_intents';

export interface StoredAuctionInfo {
  type: 'sealed-bid' | 'dutch';
  startTime: number;
  endTime?: number;
  duration?: number;
  startPrice?: string; // Store as string for BigInt compatibility
  endPrice?: string;
}

type AuctionStorage = Record<string, StoredAuctionInfo>;

function getStorage(): AuctionStorage {
  if (typeof window === 'undefined') return {};
  try {
    const data = localStorage.getItem(AUCTION_STORAGE_KEY);
    return data ? JSON.parse(data) : {};
  } catch {
    return {};
  }
}

function saveStorage(storage: AuctionStorage): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(AUCTION_STORAGE_KEY, JSON.stringify(storage));
  } catch {
    console.warn('[Velox] Failed to save auction storage');
  }
}

/**
 * Store auction info for an intent after successful submission
 */
export function storeAuctionIntent(
  intentId: string | bigint,
  auctionType: 'sealed-bid' | 'dutch',
  params: {
    duration?: number;
    startPrice?: bigint;
    endPrice?: bigint;
  } = {}
): void {
  const storage = getStorage();
  const id = intentId.toString();
  const now = Math.floor(Date.now() / 1000);

  storage[id] = {
    type: auctionType,
    startTime: now,
    endTime: params.duration ? now + params.duration : undefined,
    duration: params.duration,
    startPrice: params.startPrice?.toString(),
    endPrice: params.endPrice?.toString(),
  };

  saveStorage(storage);
  console.log('[Velox] Stored auction info for intent:', id, storage[id]);
}

/**
 * Get stored auction info for an intent
 */
export function getStoredAuctionInfo(intentId: string | bigint): StoredAuctionInfo | null {
  const storage = getStorage();
  return storage[intentId.toString()] || null;
}

/**
 * Get all stored auction intents
 */
export function getAllStoredAuctionIntents(): AuctionStorage {
  return getStorage();
}

/**
 * Remove auction info for an intent (after it's completed/cancelled)
 */
export function removeAuctionIntent(intentId: string | bigint): void {
  const storage = getStorage();
  delete storage[intentId.toString()];
  saveStorage(storage);
}

/**
 * Clean up old auction entries (older than 24 hours)
 */
export function cleanupOldAuctionEntries(): void {
  const storage = getStorage();
  const now = Math.floor(Date.now() / 1000);
  const maxAge = 24 * 60 * 60; // 24 hours

  let changed = false;
  for (const [id, info] of Object.entries(storage)) {
    if (now - info.startTime > maxAge) {
      delete storage[id];
      changed = true;
    }
  }

  if (changed) {
    saveStorage(storage);
  }
}

/**
 * Clear all auction storage data (useful after contract redeployment)
 */
export function clearAllAuctionStorage(): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(AUCTION_STORAGE_KEY);
    console.log('[Velox] Cleared all auction storage');
  } catch {
    console.warn('[Velox] Failed to clear auction storage');
  }
}

/**
 * Check if an intent has an associated sealed-bid auction on-chain
 */
export async function checkSealedBidAuction(intentId: bigint): Promise<StoredAuctionInfo | null> {
  try {
    const result = await aptos.view({
      payload: {
        function: `${VELOX_ADDRESS}::auction::get_auction`,
        functionArguments: [VELOX_ADDRESS, intentId.toString()],
      },
    });

    if (result && result.length > 0) {
      const [startTime, endTime, , , status] = result;
      return {
        type: 'sealed-bid',
        startTime: Number(startTime),
        endTime: Number(endTime),
      };
    }
  } catch {
    // Auction doesn't exist for this intent
  }
  return null;
}

/**
 * Check if an intent has an associated Dutch auction on-chain
 */
export async function checkDutchAuction(intentId: bigint): Promise<StoredAuctionInfo | null> {
  try {
    const result = await aptos.view({
      payload: {
        function: `${VELOX_ADDRESS}::auction::get_dutch_auction`,
        functionArguments: [VELOX_ADDRESS, intentId.toString()],
      },
    });

    if (result && result.length > 0) {
      const [startTime, startPrice, endPrice, duration, isActive] = result;
      return {
        type: 'dutch',
        startTime: Number(startTime),
        duration: Number(duration),
        startPrice: startPrice?.toString(),
        endPrice: endPrice?.toString(),
      };
    }
  } catch {
    // Dutch auction doesn't exist for this intent
  }
  return null;
}

/**
 * Check if an intent has any associated auction (sealed-bid or Dutch)
 */
export async function checkAuctionForIntent(intentId: bigint): Promise<StoredAuctionInfo | null> {
  // Check Dutch auction first (more common for new submissions)
  const dutchAuction = await checkDutchAuction(intentId);
  if (dutchAuction) return dutchAuction;

  // Check sealed-bid auction
  const sealedBidAuction = await checkSealedBidAuction(intentId);
  if (sealedBidAuction) return sealedBidAuction;

  return null;
}
