export * from './tokens';

// Intent types matching contract enums
export const INTENT_TYPES = {
  SWAP: 0,
  LIMIT_ORDER: 1,
  TWAP: 2,
  DCA: 3,
  CONDITIONAL: 4,
} as const;

export type IntentType = (typeof INTENT_TYPES)[keyof typeof INTENT_TYPES];

// Intent status matching contract enums
export const INTENT_STATUS = {
  PENDING: 0,
  PARTIALLY_FILLED: 1,
  FILLED: 2,
  CANCELLED: 3,
  EXPIRED: 4,
} as const;

export type IntentStatus = (typeof INTENT_STATUS)[keyof typeof INTENT_STATUS];

export const INTENT_STATUS_LABELS: Record<IntentStatus, string> = {
  [INTENT_STATUS.PENDING]: 'Pending',
  [INTENT_STATUS.PARTIALLY_FILLED]: 'Partially Filled',
  [INTENT_STATUS.FILLED]: 'Filled',
  [INTENT_STATUS.CANCELLED]: 'Cancelled',
  [INTENT_STATUS.EXPIRED]: 'Expired',
};

// Fee constants (basis points)
export const FEES = {
  PROTOCOL_FEE_BPS: 30, // 0.3%
  SOLVER_MIN_FEE_BPS: 5, // 0.05%
  MAX_SLIPPAGE_BPS: 500, // 5%
} as const;

// Time constants
export const TIME = {
  DEFAULT_DEADLINE_SECONDS: 300, // 5 minutes
  MAX_DEADLINE_SECONDS: 86400, // 24 hours
} as const;
