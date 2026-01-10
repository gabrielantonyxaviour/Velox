// Velox Move Error Code Decoder
const ERROR_CODES: Record<number, { name: string; message: string }> = {
  // Intent Errors (1-9)
  1: { name: 'EINTENT_NOT_FOUND', message: 'Intent not found' },
  2: { name: 'EINTENT_ALREADY_FILLED', message: 'Intent already filled' },
  3: { name: 'EINTENT_EXPIRED', message: 'Intent expired' },
  4: { name: 'EINTENT_CANCELLED', message: 'Intent cancelled' },
  5: { name: 'EINTENT_NOT_ACTIVE', message: 'Intent not active' },
  6: { name: 'EINTENT_ALREADY_EXISTS', message: 'Intent already exists' },
  7: { name: 'EMAX_FILLS_REACHED', message: 'Maximum fills reached for this intent' },

  // Amount Errors (10-19)
  10: { name: 'EZERO_AMOUNT', message: 'Amount cannot be zero' },
  11: { name: 'EINSUFFICIENT_AMOUNT', message: 'Insufficient amount' },
  12: { name: 'EMIN_AMOUNT_NOT_MET', message: 'Minimum output amount not met' },
  13: { name: 'EINSUFFICIENT_OUTPUT', message: 'Insufficient output' },
  14: { name: 'EINSUFFICIENT_INPUT', message: 'Insufficient input' },
  15: { name: 'EINSUFFICIENT_BALANCE', message: 'Insufficient balance in your wallet' },
  16: { name: 'EEXCEEDS_REMAINING', message: 'Amount exceeds remaining balance' },

  // Solver Errors (20-29)
  20: { name: 'ESOLVER_NOT_REGISTERED', message: 'You are not registered as a solver' },
  21: { name: 'ESOLVER_ALREADY_REGISTERED', message: 'You are already registered as a solver' },
  22: { name: 'EINSUFFICIENT_STAKE', message: 'Stake amount must be at least 1 MOVE' },
  23: { name: 'ESOLVER_INACTIVE', message: 'Solver is inactive' },
  24: { name: 'ESOLVER_NOT_WINNER', message: 'Solver did not win the auction' },
  25: { name: 'ECOOLDOWN_NOT_COMPLETE', message: '7-day unstaking cooldown period not complete' },
  26: { name: 'ENO_PENDING_UNSTAKE', message: 'No pending unstake' },

  // Authorization Errors (30-39)
  30: { name: 'ENOT_AUTHORIZED', message: 'Not authorized to perform this action' },
  31: { name: 'ENOT_OWNER', message: 'You are not the owner' },
  32: { name: 'ENOT_INTENT_OWNER', message: 'You do not own this intent' },
  33: { name: 'ENOT_ADMIN', message: 'Admin privileges required' },
  34: { name: 'EALREADY_INITIALIZED', message: 'Already initialized' },
  35: { name: 'ENOT_INITIALIZED', message: 'Not initialized' },

  // Auction Errors (40-59)
  40: { name: 'EAUCTION_NOT_ACTIVE', message: 'Auction is not active' },
  41: { name: 'EAUCTION_ENDED', message: 'Auction has ended' },
  42: { name: 'EAUCTION_IN_PROGRESS', message: 'Auction is still in progress' },
  43: { name: 'EAUCTION_NOT_SEALED_BID', message: 'This is not a sealed bid auction' },
  44: { name: 'EAUCTION_NOT_DUTCH', message: 'This is not a Dutch auction' },
  45: { name: 'EAUCTION_NO_BIDS', message: 'No bids received for this auction' },
  46: { name: 'EAUCTION_ALREADY_COMPLETED', message: 'Auction already completed' },
  47: { name: 'EFILL_DEADLINE_PASSED', message: 'Fill deadline has passed' },
  48: { name: 'EBID_TOO_LOW', message: 'Your bid is too low' },
  49: { name: 'EDUTCH_PRICE_NOT_MET', message: 'Dutch auction price not met' },
  50: { name: 'EINVALID_AUCTION_PARAMS', message: 'Invalid auction parameters' },
  51: { name: 'EAUCTION_NOT_NONE', message: 'Auction type mismatch' },

  // Math Errors (60-69)
  60: { name: 'EOVERFLOW', message: 'Arithmetic overflow' },
  61: { name: 'EDIVISION_BY_ZERO', message: 'Division by zero' },

  // Token Errors (70-79)
  70: { name: 'EINVALID_TOKEN', message: 'Invalid token' },
  71: { name: 'ETOKEN_MISMATCH', message: 'Token mismatch' },
  72: { name: 'EESCROW_INSUFFICIENT', message: 'Insufficient escrow balance' },

  // Scheduled Intent Errors (80-89)
  80: { name: 'ECHUNK_NOT_READY', message: 'TWAP chunk not ready' },
  81: { name: 'EPERIOD_NOT_READY', message: 'DCA period not ready' },
  82: { name: 'ESCHEDULED_COMPLETED', message: 'Scheduled intent completed' },
  83: { name: 'EINVALID_INTERVAL', message: 'Invalid interval' },
  84: { name: 'EINVALID_CHUNKS', message: 'Invalid number of chunks' },

  // Time Errors (90-99)
  90: { name: 'EDEADLINE_PASSED', message: 'Deadline has passed' },
  91: { name: 'EEXPIRY_PASSED', message: 'Expiry date has passed' },
  92: { name: 'ETOO_EARLY', message: 'Too early to perform this action' },
  93: { name: 'EINVALID_DEADLINE', message: 'Invalid deadline' },
};

export function decodeVeloxError(errorMessage: string): string {
  // Try to extract error code from Move abort message
  // Format: "Move abort in 0x...: 0xXX"
  const match = errorMessage.match(/Move abort.*?: (0x[0-9a-f]+)/i);
  if (match) {
    const hexCode = match[1];
    const decimalCode = parseInt(hexCode, 16);
    const error = ERROR_CODES[decimalCode];
    if (error) {
      return error.message;
    }
    return `Transaction failed (error code: ${decimalCode})`;
  }

  // Try to extract from other error formats
  if (errorMessage.includes('Insufficient')) return 'Insufficient balance or stake amount';
  if (errorMessage.includes('unauthorized')) return 'Not authorized to perform this action';
  if (errorMessage.includes('exists')) return 'Resource already exists';

  return errorMessage;
}
