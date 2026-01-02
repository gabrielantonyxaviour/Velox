/**
 * LocalStorage utility to store and retrieve intent submission transaction hashes.
 * Since the blockchain doesn't store the submission tx hash, we track it client-side.
 */

const STORAGE_KEY = 'velox_intent_txs';

interface IntentTxMap {
  [intentId: string]: string; // intentId -> submitTxHash
}

/**
 * Get all stored intent tx hashes
 */
export function getIntentTxMap(): IntentTxMap {
  if (typeof window === 'undefined') return {};
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
}

/**
 * Store a submit tx hash for an intent
 */
export function storeIntentTxHash(intentId: string, txHash: string): void {
  if (typeof window === 'undefined') return;
  try {
    const map = getIntentTxMap();
    map[intentId] = txHash;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(map));
  } catch (err) {
    console.error('Failed to store intent tx hash:', err);
  }
}

/**
 * Get the submit tx hash for an intent
 */
export function getIntentTxHash(intentId: string): string | undefined {
  const map = getIntentTxMap();
  return map[intentId];
}

/**
 * Store a pending tx hash (before we know the intent ID)
 * This will be matched with the newest intent after refetch
 */
export function storePendingTxHash(userAddress: string, txHash: string): void {
  if (typeof window === 'undefined') return;
  try {
    const key = `velox_pending_tx_${userAddress}`;
    localStorage.setItem(key, txHash);
  } catch (err) {
    console.error('Failed to store pending tx hash:', err);
  }
}

/**
 * Get and clear the pending tx hash for a user
 */
export function consumePendingTxHash(userAddress: string): string | null {
  if (typeof window === 'undefined') return null;
  try {
    const key = `velox_pending_tx_${userAddress}`;
    const txHash = localStorage.getItem(key);
    if (txHash) {
      localStorage.removeItem(key);
    }
    return txHash;
  } catch {
    return null;
  }
}

/**
 * Clean up old intent tx hashes (keep only last 100)
 */
export function cleanupOldTxHashes(): void {
  if (typeof window === 'undefined') return;
  try {
    const map = getIntentTxMap();
    const keys = Object.keys(map);
    if (keys.length > 100) {
      // Keep only the last 100 (highest intent IDs)
      const sortedKeys = keys.sort((a, b) => Number(b) - Number(a)).slice(0, 100);
      const newMap: IntentTxMap = {};
      sortedKeys.forEach((k) => {
        newMap[k] = map[k];
      });
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newMap));
    }
  } catch {
    // Ignore cleanup errors
  }
}
