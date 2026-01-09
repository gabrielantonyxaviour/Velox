// Velox Intent SDK

// Types
export type {
  IntentType,
  IntentStatus,
  IntentRecord,
} from './types';

export { parseIntentStatus, parseIntentType, getIntentTypeDisplay } from './types';

// Transactions
export type { SignRawHashFunction } from './transactions';

export {
  submitSwapIntent,
  submitSwapIntentNative,
  submitLimitOrderIntent,
  submitLimitOrderIntentNative,
  cancelIntent,
  cancelIntentNative,
} from './transactions';

// Queries
export {
  getIntent,
  getUserIntents,
  getTotalIntents,
  getTokenBalance,
  fetchIntentEvents,
  getIntentEventData,
  clearEventCache,
  clearPeriodFillCache,
} from './queries';

// Auction Storage
export {
  clearAllAuctionStorage,
  storeAuctionIntent,
  getStoredAuctionInfo,
} from './auction-storage';

// Contract Reads (Solver, Scheduled, Settlement)
export type { SolverStats, ScheduledIntentInfo } from './contract-reads';

export {
  getUserIntentIds,
  getSolverStats,
  getTotalSolvers,
  getActiveSolverCount,
  isSolverRegistered,
  isSolverActive,
  getNextExecutionTime,
  getScheduledIntent,
  getExecutableIntents,
  getChunksExecuted,
  canFill,
  getProtocolFeeBps,
  getSolverFeeBps,
} from './contract-reads';
