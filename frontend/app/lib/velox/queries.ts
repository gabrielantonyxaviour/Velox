import { aptos, VELOX_ADDRESS, MOVEMENT_CONFIGS, CURRENT_NETWORK } from '../aptos';
import {
  IntentRecord,
  IntentStatus,
  IntentType,
  Intent,
  AuctionState,
  AuctionType,
  Fill,
  Bid,
  parseIntentStatus,
  parseIntentType,
  parseAuctionType,
} from './types';

// Helper to safely get string from unknown
const safeGetString = (obj: Record<string, unknown> | undefined, key: string): string => {
  if (!obj) return '0';
  const value = obj[key];
  if (value === undefined || value === null) return '0';
  return String(value);
};

/**
 * Parse Move 2.0 enum variant to status
 */
function parseStatusFromMove(rawStatus: unknown): IntentStatus {
  if (typeof rawStatus === 'string') {
    return parseIntentStatus(rawStatus);
  }

  if (rawStatus && typeof rawStatus === 'object') {
    const statusObj = rawStatus as Record<string, unknown>;
    if ('__variant__' in statusObj || 'type' in statusObj) {
      const variant = (statusObj.__variant__ || statusObj.type) as string;
      return parseIntentStatus(variant);
    }
  }

  return 'active';
}

/**
 * Parse auction state from raw contract data
 */
function parseAuctionState(rawAuction: Record<string, unknown> | undefined): AuctionState {
  if (!rawAuction) {
    return { type: 'none' };
  }

  const variant = (rawAuction.__variant__ || rawAuction.type) as string || 'None';
  const type = parseAuctionType(variant);

  const state: AuctionState = { type };

  // Parse type-specific fields
  if (type === 'sealed_bid_active') {
    state.endTime = Number(rawAuction.end_time || 0);
    const rawBids = (rawAuction.bids || []) as Record<string, unknown>[];
    state.bids = rawBids.map(b => ({
      solver: String(b.solver || ''),
      outputAmount: BigInt(String(b.output_amount || '0')),
      submittedAt: Number(b.submitted_at || 0),
    }));
  } else if (type === 'sealed_bid_completed') {
    state.winner = String(rawAuction.winner || '');
    state.winningBid = BigInt(String(rawAuction.winning_bid || '0'));
    state.fillDeadline = Number(rawAuction.fill_deadline || 0);
  } else if (type === 'dutch_active') {
    state.startPrice = BigInt(String(rawAuction.start_price || '0'));
    state.endPrice = BigInt(String(rawAuction.end_price || '0'));
    state.endTime = Number(rawAuction.end_time || 0);
  } else if (type === 'dutch_accepted') {
    state.acceptedPrice = BigInt(String(rawAuction.accepted_price || '0'));
    state.winner = String(rawAuction.winner || '');
  }

  return state;
}

/**
 * Parse fills from raw contract data
 */
function parseFills(rawFills: unknown): Fill[] {
  if (!Array.isArray(rawFills)) return [];
  return rawFills.map((f: Record<string, unknown>) => ({
    solver: String(f.solver || ''),
    inputAmount: BigInt(String(f.input_amount || '0')),
    outputAmount: BigInt(String(f.output_amount || '0')),
    filledAt: Number(f.filled_at || 0),
  }));
}

/**
 * Parse intent details from raw contract data
 */
function parseIntent(rawIntent: Record<string, unknown>): Intent {
  const variant = (rawIntent.__variant__ || rawIntent.type) as string || 'Swap';
  const type = parseIntentType(variant);

  const intent: Intent = {
    type,
    inputToken: String(rawIntent.input_token || rawIntent.input_coin || ''),
    outputToken: String(rawIntent.output_token || rawIntent.output_coin || ''),
  };

  // Parse type-specific fields
  if (type === 'swap') {
    intent.amountIn = BigInt(safeGetString(rawIntent, 'amount_in'));
    intent.minAmountOut = BigInt(safeGetString(rawIntent, 'min_amount_out'));
    intent.deadline = Number(safeGetString(rawIntent, 'deadline'));
  } else if (type === 'limit_order') {
    intent.amountIn = BigInt(safeGetString(rawIntent, 'amount_in') || safeGetString(rawIntent, 'amount'));
    intent.limitPrice = BigInt(safeGetString(rawIntent, 'limit_price'));
    intent.expiry = Number(safeGetString(rawIntent, 'expiry'));
  } else if (type === 'twap') {
    intent.totalAmount = BigInt(safeGetString(rawIntent, 'total_amount'));
    intent.numChunks = Number(safeGetString(rawIntent, 'num_chunks'));
    intent.intervalSeconds = Number(safeGetString(rawIntent, 'interval_seconds'));
    intent.maxSlippageBps = Number(safeGetString(rawIntent, 'max_slippage_bps'));
    intent.startTime = Number(safeGetString(rawIntent, 'start_time'));
  } else if (type === 'dca') {
    intent.amountPerPeriod = BigInt(safeGetString(rawIntent, 'amount_per_period'));
    intent.totalPeriods = Number(safeGetString(rawIntent, 'total_periods'));
    intent.intervalSeconds = Number(safeGetString(rawIntent, 'interval_seconds'));
  }

  return intent;
}

/**
 * Get intent details by ID with full type-specific field extraction
 */
export async function getIntent(intentId: bigint): Promise<IntentRecord | null> {
  try {
    const result = await aptos.view({
      payload: {
        function: `${VELOX_ADDRESS}::submission::get_intent`,
        typeArguments: [],
        functionArguments: [VELOX_ADDRESS, intentId.toString()],
      },
    });

    if (!result || !result[0]) return null;

    const record = result[0] as Record<string, unknown>;
    const rawIntent = record.intent as Record<string, unknown>;
    if (!rawIntent) return null;

    const intent = parseIntent(rawIntent);
    const auction = parseAuctionState(record.auction as Record<string, unknown>);
    const fills = parseFills(record.fills);
    const status = parseStatusFromMove(record.status);

    const intentRecord: IntentRecord = {
      id: BigInt(safeGetString(record, 'id')),
      user: String(record.user ?? ''),
      createdAt: Number(record.created_at ?? 0),
      intent,
      auction,
      status,
      escrowRemaining: BigInt(safeGetString(record, 'escrow_remaining')),
      totalOutputReceived: BigInt(safeGetString(record, 'total_output_received')),
      fills,
      chunksExecuted: Number(safeGetString(record, 'chunks_executed')),
      nextExecution: Number(safeGetString(record, 'next_execution')),
    };

    return intentRecord;
  } catch (error) {
    console.error('[Velox] Error fetching intent:', error);
    return null;
  }
}

/**
 * Get all intent IDs for a user
 */
export async function getUserIntents(userAddress: string): Promise<bigint[]> {
  try {
    const result = await aptos.view({
      payload: {
        function: `${VELOX_ADDRESS}::submission::get_user_intents`,
        typeArguments: [],
        functionArguments: [VELOX_ADDRESS, userAddress],
      },
    });

    if (!result || !result[0]) return [];
    const ids = result[0] as string[];
    return ids.map((id) => BigInt(id));
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    if (errorMessage.includes('MISSING_DATA')) return [];
    console.error('[Velox] Error fetching user intents:', error);
    return [];
  }
}

/**
 * Get total number of intents created
 */
export async function getTotalIntents(): Promise<bigint> {
  try {
    const result = await aptos.view({
      payload: {
        function: `${VELOX_ADDRESS}::submission::get_total_intents`,
        typeArguments: [],
        functionArguments: [VELOX_ADDRESS],
      },
    });
    return BigInt(result[0] as string);
  } catch (error) {
    console.error('[Velox] Error fetching total intents:', error);
    return 0n;
  }
}

/**
 * Get total number of registered solvers
 */
export async function getTotalSolvers(): Promise<number> {
  try {
    const result = await aptos.view({
      payload: {
        function: `${VELOX_ADDRESS}::solver_registry::get_total_solvers`,
        typeArguments: [],
        functionArguments: [VELOX_ADDRESS],
      },
    });
    return Number(result[0] as string);
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    if (!errorMessage.includes('MISSING_DATA')) {
      console.warn('[Velox] Error fetching total solvers:', error);
    }
    return 0;
  }
}

/**
 * Get count of active solvers
 */
export async function getActiveSolverCount(): Promise<number> {
  try {
    const result = await aptos.view({
      payload: {
        function: `${VELOX_ADDRESS}::solver_registry::get_active_solver_count`,
        typeArguments: [],
        functionArguments: [VELOX_ADDRESS],
      },
    });
    return Number(result[0] as string);
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    if (!errorMessage.includes('MISSING_DATA')) {
      console.warn('[Velox] Error fetching active solver count:', error);
    }
    return 0;
  }
}

/**
 * Get solver reputation score
 */
export async function getSolverReputation(solverAddress: string): Promise<number> {
  try {
    const result = await aptos.view({
      payload: {
        function: `${VELOX_ADDRESS}::solver_registry::get_reputation`,
        typeArguments: [],
        functionArguments: [VELOX_ADDRESS, solverAddress],
      },
    });
    return Number(result[0] as string);
  } catch {
    return 0;
  }
}

/**
 * Check if solver is eligible (active + has min reputation)
 */
export async function isSolverEligible(solverAddress: string): Promise<boolean> {
  try {
    const result = await aptos.view({
      payload: {
        function: `${VELOX_ADDRESS}::solver_registry::is_solver_eligible`,
        typeArguments: [],
        functionArguments: [VELOX_ADDRESS, solverAddress],
      },
    });
    return result[0] === true;
  } catch {
    return false;
  }
}

/**
 * Get token balance for a user
 */
export async function getTokenBalance(
  userAddress: string,
  tokenMetadata: string
): Promise<bigint> {
  try {
    const result = await aptos.view({
      payload: {
        function: '0x1::primary_fungible_store::balance',
        typeArguments: [],
        functionArguments: [userAddress, tokenMetadata],
      },
    });
    return BigInt(result[0] as string);
  } catch {
    return 0n;
  }
}

// ============ Event Caching ============

interface IntentEventData {
  submissionTxHash?: string;
  settlementTxHash?: string;
  outputAmount?: bigint;
}

const eventCache: Map<string, IntentEventData> = new Map();

const RPC_URL = MOVEMENT_CONFIGS[CURRENT_NETWORK].fullnode;

interface TransactionEvent {
  type: string;
  data: Record<string, unknown>;
}

interface Transaction {
  version: string;
  hash: string;
  events: TransactionEvent[];
}

/**
 * Parse events from a list of transactions
 */
function parseEventsFromTransactions(transactions: Transaction[], intentIds: bigint[]): void {
  for (const tx of transactions) {
    if (!tx.events) continue;

    for (const event of tx.events) {
      // Check for IntentCreated events
      if (event.type.includes('::submission::IntentCreated')) {
        const data = event.data;
        const intentId = String(data.intent_id);

        if (intentIds.some(id => id.toString() === intentId)) {
          const existing = eventCache.get(intentId) || {};
          existing.submissionTxHash = tx.hash || tx.version;
          eventCache.set(intentId, existing);
        }
      }

      // Check for IntentFilled events
      if (event.type.includes('::settlement::IntentFilled')) {
        const data = event.data;
        const intentId = String(data.intent_id);

        if (intentIds.some(id => id.toString() === intentId)) {
          const existing = eventCache.get(intentId) || {};
          existing.settlementTxHash = tx.hash || tx.version;
          existing.outputAmount = BigInt(String(data.output_amount || '0'));
          eventCache.set(intentId, existing);
        }
      }
    }
  }
}

/**
 * Fetch IntentCreated and IntentFilled events for given intent IDs
 */
export async function fetchIntentEvents(intentIds: bigint[], userAddress?: string): Promise<void> {
  if (intentIds.length === 0) return;

  try {
    const fetchPromises: Promise<Transaction[]>[] = [];

    if (userAddress) {
      fetchPromises.push(
        fetch(`${RPC_URL}/accounts/${userAddress}/transactions?limit=50`)
          .then(res => res.ok ? res.json() : [])
          .catch(() => [])
      );
    }

    fetchPromises.push(
      fetch(`${RPC_URL}/accounts/${VELOX_ADDRESS}/transactions?limit=100`)
        .then(res => res.ok ? res.json() : [])
        .catch(() => [])
    );

    const results = await Promise.all(fetchPromises);

    for (const transactions of results) {
      if (Array.isArray(transactions)) {
        parseEventsFromTransactions(transactions, intentIds);
      }
    }
  } catch (error) {
    console.warn('[Velox] Event fetching not available:', error);
  }
}

export function getIntentEventData(intentId: bigint): IntentEventData | undefined {
  return eventCache.get(intentId.toString());
}

export function clearEventCache(): void {
  eventCache.clear();
}

// ============ Auction Query Functions ============

export interface DutchAuctionInfo {
  intentId: bigint;
  startTime: number;
  startPrice: bigint;
  endPrice: bigint;
  duration: number;
  isActive: boolean;
  winner: string | null;
  acceptedPrice: bigint | null;
  currentPrice: bigint;
}

export interface SealedBidAuctionInfo {
  intentId: bigint;
  startTime: number;
  endTime: number;
  isActive: boolean;
  bidCount: number;
  winner: string | null;
  winningBid: bigint | null;
}

/**
 * Get current Dutch auction price for an intent
 */
export async function getDutchAuctionPrice(intentId: bigint): Promise<bigint> {
  try {
    const result = await aptos.view({
      payload: {
        function: `${VELOX_ADDRESS}::auction::get_current_dutch_price`,
        typeArguments: [],
        functionArguments: [VELOX_ADDRESS, intentId.toString()],
      },
    });
    return BigInt(result[0] as string);
  } catch {
    return 0n;
  }
}

/**
 * Get bids for a sealed-bid auction
 */
export async function getAuctionBids(intentId: bigint): Promise<Bid[]> {
  try {
    const result = await aptos.view({
      payload: {
        function: `${VELOX_ADDRESS}::auction::get_bids`,
        typeArguments: [],
        functionArguments: [VELOX_ADDRESS, intentId.toString()],
      },
    });
    const rawBids = result[0] as Record<string, unknown>[];
    return rawBids.map(b => ({
      solver: String(b.solver || ''),
      outputAmount: BigInt(String(b.output_amount || '0')),
      submittedAt: Number(b.submitted_at || 0),
    }));
  } catch {
    return [];
  }
}

/**
 * Get auction winner info
 */
export async function getAuctionWinner(intentId: bigint): Promise<{ hasWinner: boolean; winner: string }> {
  try {
    const result = await aptos.view({
      payload: {
        function: `${VELOX_ADDRESS}::auction::get_winner`,
        typeArguments: [],
        functionArguments: [VELOX_ADDRESS, intentId.toString()],
      },
    });
    return {
      hasWinner: result[0] as boolean,
      winner: result[1] as string,
    };
  } catch {
    return { hasWinner: false, winner: '' };
  }
}

/**
 * Get time remaining for sealed-bid auction
 */
export async function getSealedBidTimeRemaining(intentId: bigint): Promise<number> {
  try {
    const result = await aptos.view({
      payload: {
        function: `${VELOX_ADDRESS}::auction::get_sealed_bid_time_remaining`,
        typeArguments: [],
        functionArguments: [VELOX_ADDRESS, intentId.toString()],
      },
    });
    return Number(result[0]);
  } catch {
    return 0;
  }
}

/**
 * Get time remaining for Dutch auction
 */
export async function getDutchTimeRemaining(intentId: bigint): Promise<number> {
  try {
    const result = await aptos.view({
      payload: {
        function: `${VELOX_ADDRESS}::auction::get_dutch_time_remaining`,
        typeArguments: [],
        functionArguments: [VELOX_ADDRESS, intentId.toString()],
      },
    });
    return Number(result[0]);
  } catch {
    return 0;
  }
}

// ============ Solver Query Functions ============

export async function getSolverStats(solverAddress: string): Promise<{
  stake: bigint;
  volume: bigint;
  reputation: number;
  fills: number;
  failures: number;
  isActive: boolean;
} | null> {
  try {
    const result = await aptos.view({
      payload: {
        function: `${VELOX_ADDRESS}::solver_registry::get_solver_info`,
        typeArguments: [],
        functionArguments: [VELOX_ADDRESS, solverAddress],
      },
    });

    if (!result || !result[0]) return null;

    const data = result[0] as Record<string, unknown>;
    return {
      stake: BigInt(String(data.stake || '0')),
      volume: BigInt(String(data.total_volume || '0')),
      reputation: Number(data.reputation_score || 0),
      fills: Number(data.successful_fills || 0),
      failures: Number(data.failed_fills || 0),
      isActive: data.is_active === true,
    };
  } catch {
    return null;
  }
}
