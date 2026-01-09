/**
 * Query key factory for Velox data caching
 * Use with React Query or similar caching libraries
 */

export const veloxKeys = {
  // Root key
  all: ['velox'] as const,

  // Intents
  intents: () => [...veloxKeys.all, 'intents'] as const,
  intent: (id: number | bigint) => [...veloxKeys.intents(), id.toString()] as const,
  userIntents: (userAddress: string) => [...veloxKeys.intents(), 'user', userAddress] as const,
  activeIntents: () => [...veloxKeys.intents(), 'active'] as const,

  // Auctions
  auctions: () => [...veloxKeys.all, 'auctions'] as const,
  auction: (intentId: number | bigint) => [...veloxKeys.auctions(), intentId.toString()] as const,
  auctionBids: (intentId: number | bigint) => [...veloxKeys.auction(intentId), 'bids'] as const,
  auctionPrice: (intentId: number | bigint) => [...veloxKeys.auction(intentId), 'price'] as const,

  // Solvers
  solvers: () => [...veloxKeys.all, 'solvers'] as const,
  solver: (address: string) => [...veloxKeys.solvers(), address] as const,
  solverStats: (address: string) => [...veloxKeys.solver(address), 'stats'] as const,
  solverReputation: (address: string) => [...veloxKeys.solver(address), 'reputation'] as const,

  // Protocol
  stats: () => [...veloxKeys.all, 'stats'] as const,
  feeConfig: () => [...veloxKeys.all, 'feeConfig'] as const,

  // Tokens
  tokens: () => [...veloxKeys.all, 'tokens'] as const,
  tokenBalance: (userAddress: string, tokenAddress: string) =>
    [...veloxKeys.tokens(), 'balance', userAddress, tokenAddress] as const,

  // Events
  events: () => [...veloxKeys.all, 'events'] as const,
  intentEvents: (intentId: number | bigint) => [...veloxKeys.events(), 'intent', intentId.toString()] as const,
} as const;

/**
 * Helper to invalidate all intent-related queries
 */
export function getIntentInvalidationKeys(intentId?: number | bigint) {
  if (intentId !== undefined) {
    return [
      veloxKeys.intent(intentId),
      veloxKeys.auction(intentId),
      veloxKeys.intentEvents(intentId),
    ];
  }
  return [veloxKeys.intents()];
}

/**
 * Helper to invalidate all solver-related queries
 */
export function getSolverInvalidationKeys(address?: string) {
  if (address) {
    return [
      veloxKeys.solver(address),
      veloxKeys.solverStats(address),
      veloxKeys.solverReputation(address),
    ];
  }
  return [veloxKeys.solvers()];
}

/**
 * Helper to invalidate user-specific queries
 */
export function getUserInvalidationKeys(userAddress: string) {
  return [
    veloxKeys.userIntents(userAddress),
  ];
}
