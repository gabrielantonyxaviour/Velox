import { aptos, VELOX_ADDRESS, MOVEMENT_CONFIGS, CURRENT_NETWORK } from '../aptos';
import { IntentRecord, IntentType, parseIntentStatus, parseIntentType } from './types';

// Event types for parsing
interface IntentCreatedEvent {
  intent_id: string;
  user: string;
  input_token: string;
  output_token: string;
  amount_in: string;
  intent_type: number;
  deadline: string;
  created_at: string;
}

interface IntentFilledEvent {
  intent_id: string;
  user: string;
  solver: string;
  input_amount: string;
  output_amount: string;
  execution_price: string;
  protocol_fee: string;
  solver_fee: string;
  filled_at: string;
}

// Cache for event data by intent_id
interface IntentEventData {
  submissionTxHash?: string;
  settlementTxHash?: string;
  outputAmount?: bigint;
}

const eventCache: Map<string, IntentEventData> = new Map();

// Helper to safely get string from unknown
const safeGetString = (obj: Record<string, unknown> | undefined, key: string): string => {
  if (!obj) return '0';
  const value = obj[key];
  if (value === undefined || value === null) return '0';
  return String(value);
};

// Helper to parse status from Move 2.0 enum format
function parseStatusFromMove(rawStatus: unknown): number {
  if (typeof rawStatus === 'number') return rawStatus;

  if (typeof rawStatus === 'string') {
    const statusMap: Record<string, number> = {
      'pending': 0, 'Pending': 0,
      'partially_filled': 1, 'PartiallyFilled': 1,
      'filled': 2, 'Filled': 2,
      'cancelled': 3, 'Cancelled': 3,
      'expired': 4, 'Expired': 4,
    };
    return statusMap[rawStatus] ?? (parseInt(rawStatus, 10) || 0);
  }

  if (rawStatus && typeof rawStatus === 'object') {
    const statusObj = rawStatus as Record<string, unknown>;
    if ('__variant__' in statusObj) {
      const variant = statusObj.__variant__ as string;
      const variantMap: Record<string, number> = {
        'Pending': 0, 'PartiallyFilled': 1, 'Filled': 2, 'Cancelled': 3, 'Expired': 4,
      };
      return variantMap[variant] ?? 0;
    }
  }

  return 0;
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

    // Extract Move 2.0 __variant__ for intent type
    const intentVariant = rawIntent.__variant__ as string || 'Swap';
    const intentType = parseIntentType(intentVariant);

    // Common fields from intent
    const inputToken = String(rawIntent.input_token ?? rawIntent.input_coin ?? '');
    const outputToken = String(rawIntent.output_token ?? rawIntent.output_coin ?? '');

    // Get amount based on intent type
    let amountIn = '0';
    if (intentType === 'twap') {
      amountIn = safeGetString(rawIntent, 'total_amount');
    } else if (intentType === 'dca') {
      const perPeriod = BigInt(safeGetString(rawIntent, 'amount_per_period'));
      const periods = BigInt(safeGetString(rawIntent, 'total_periods'));
      amountIn = (perPeriod * periods).toString();
    } else {
      amountIn = safeGetString(rawIntent, 'amount_in') || safeGetString(rawIntent, 'amount');
    }

    // Parse deadline/expiry
    let deadline = 0;
    if (intentType === 'swap') {
      deadline = Number(safeGetString(rawIntent, 'deadline'));
    } else if (intentType === 'limit_order') {
      deadline = Number(safeGetString(rawIntent, 'expiry'));
    } else if (intentType === 'twap') {
      const startTime = Number(safeGetString(rawIntent, 'start_time'));
      const numChunks = Number(safeGetString(rawIntent, 'num_chunks'));
      const interval = Number(safeGetString(rawIntent, 'interval_seconds'));
      deadline = startTime + (numChunks * interval);
    } else if (intentType === 'dca') {
      const nextExec = Number(safeGetString(rawIntent, 'next_execution'));
      const periods = Number(safeGetString(rawIntent, 'total_periods'));
      const interval = Number(safeGetString(rawIntent, 'interval_seconds'));
      deadline = nextExec + (periods * interval);
    }

    // Parse status
    const statusCode = parseStatusFromMove(record.status);
    let status = parseIntentStatus(statusCode);

    // Check if expired
    if (status === 'pending' && deadline > 0) {
      const nowSeconds = Math.floor(Date.now() / 1000);
      if (deadline < nowSeconds) status = 'expired';
    }

    const intentRecord: IntentRecord = {
      id: BigInt(safeGetString(record, 'id')),
      user: String(record.user ?? ''),
      intentType,
      inputToken,
      outputToken,
      amountIn: BigInt(amountIn),
      status,
      filledAmount: BigInt(safeGetString(record, 'filled_amount')),
      createdAt: Number(record.created_at ?? 0),
      deadline: deadline > 0 ? deadline : undefined,
      solver: record.solver ? (record.solver as { vec: string[] }).vec?.[0] : undefined,
      executionPrice: record.execution_price
        ? BigInt((record.execution_price as { vec: string[] }).vec?.[0] ?? '0')
        : undefined,
    };

    // Add type-specific fields
    if (intentType === 'swap') {
      intentRecord.minAmountOut = BigInt(safeGetString(rawIntent, 'min_amount_out'));
    } else if (intentType === 'limit_order') {
      intentRecord.limitPrice = BigInt(safeGetString(rawIntent, 'limit_price'));
      intentRecord.partialFillAllowed = rawIntent.partial_fill_allowed === true;
    } else if (intentType === 'twap') {
      intentRecord.numChunks = Number(safeGetString(rawIntent, 'num_chunks'));
      intentRecord.intervalSeconds = Number(safeGetString(rawIntent, 'interval_seconds'));
      intentRecord.maxSlippageBps = Number(safeGetString(rawIntent, 'max_slippage_bps'));
    } else if (intentType === 'dca') {
      intentRecord.totalPeriods = Number(safeGetString(rawIntent, 'total_periods'));
      intentRecord.intervalSeconds = Number(safeGetString(rawIntent, 'interval_seconds'));
      intentRecord.amountPerPeriod = BigInt(safeGetString(rawIntent, 'amount_per_period'));
    }

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
    return BigInt(0);
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
    // MISSING_DATA is expected when registry hasn't been initialized
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
    // MISSING_DATA is expected when registry hasn't been initialized
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
  } catch (error) {
    console.error('[Velox] Error fetching solver reputation:', error);
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
  } catch (error) {
    console.error('[Velox] Error checking solver eligibility:', error);
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
  } catch (error) {
    console.error('[Velox] Error fetching token balance:', error);
    return BigInt(0);
  }
}

// ============ Event Fetching Functions ============

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
      if (event.type === `${VELOX_ADDRESS}::submission::IntentCreated`) {
        const data = event.data as unknown as IntentCreatedEvent;
        const intentId = data.intent_id;

        if (intentIds.some(id => id.toString() === intentId)) {
          const existing = eventCache.get(intentId) || {};
          existing.submissionTxHash = tx.hash || tx.version;
          eventCache.set(intentId, existing);
        }
      }

      // Check for IntentFilled events
      if (event.type === `${VELOX_ADDRESS}::settlement::IntentFilled`) {
        const data = event.data as unknown as IntentFilledEvent;
        const intentId = data.intent_id;

        if (intentIds.some(id => id.toString() === intentId)) {
          const existing = eventCache.get(intentId) || {};
          existing.settlementTxHash = tx.hash || tx.version;
          existing.outputAmount = BigInt(data.output_amount);
          eventCache.set(intentId, existing);
        }
      }
    }
  }
}

/**
 * Fetch IntentCreated and IntentFilled events for given intent IDs
 * Queries both user transactions (for submissions) and contract transactions (for settlements)
 */
export async function fetchIntentEvents(intentIds: bigint[], userAddress?: string): Promise<void> {
  if (intentIds.length === 0) return;

  try {
    // Fetch from multiple sources in parallel
    const fetchPromises: Promise<Transaction[]>[] = [];

    // 1. User transactions (for IntentCreated events - submission)
    if (userAddress) {
      fetchPromises.push(
        fetch(`${RPC_URL}/accounts/${userAddress}/transactions?limit=50`)
          .then(res => res.ok ? res.json() : [])
          .catch(() => [])
      );
    }

    // 2. Contract transactions (for IntentFilled events - settlement by solver)
    fetchPromises.push(
      fetch(`${RPC_URL}/accounts/${VELOX_ADDRESS}/transactions?limit=100`)
        .then(res => res.ok ? res.json() : [])
        .catch(() => [])
    );

    const results = await Promise.all(fetchPromises);

    // Parse events from all transaction sources
    for (const transactions of results) {
      if (Array.isArray(transactions)) {
        parseEventsFromTransactions(transactions, intentIds);
      }
    }
  } catch (error) {
    console.warn('[Velox] Event fetching not available:', error);
  }
}

/**
 * Get cached event data for an intent
 */
export function getIntentEventData(intentId: bigint): IntentEventData | undefined {
  return eventCache.get(intentId.toString());
}

/**
 * Clear the event cache (useful for refresh)
 */
export function clearEventCache(): void {
  eventCache.clear();
}

// ============ Scheduled Intent Functions (DCA/TWAP) ============

export interface ScheduledIntentInfo {
  nextExecution: number;
  chunksExecuted: number;
  totalChunks: number;
  isTwap: boolean;
  isReady: boolean;
  isCompleted: boolean;
}

/**
 * Get scheduled intent info (DCA/TWAP progress)
 */
export async function getScheduledIntentInfo(intentId: bigint): Promise<ScheduledIntentInfo | null> {
  try {
    const [scheduleResult, readyResult, completedResult] = await Promise.all([
      aptos.view({
        payload: {
          function: `${VELOX_ADDRESS}::scheduled::get_scheduled_intent`,
          typeArguments: [],
          functionArguments: [VELOX_ADDRESS, intentId.toString()],
        },
      }).catch(() => null),
      aptos.view({
        payload: {
          function: `${VELOX_ADDRESS}::scheduled::is_ready_for_execution`,
          typeArguments: [],
          functionArguments: [VELOX_ADDRESS, intentId.toString()],
        },
      }).catch(() => [false]),
      aptos.view({
        payload: {
          function: `${VELOX_ADDRESS}::scheduled::is_completed`,
          typeArguments: [],
          functionArguments: [VELOX_ADDRESS, intentId.toString()],
        },
      }).catch(() => [false]),
    ]);

    if (!scheduleResult) return null;

    const [nextExecution, chunksExecuted, totalChunks, isTwap] = scheduleResult as [string, string, string, boolean];

    return {
      nextExecution: Number(nextExecution),
      chunksExecuted: Number(chunksExecuted),
      totalChunks: Number(totalChunks),
      isTwap: isTwap === true,
      isReady: readyResult?.[0] === true,
      isCompleted: completedResult?.[0] === true,
    };
  } catch (error) {
    console.error('[Velox] Error fetching scheduled intent info:', error);
    return null;
  }
}

/**
 * Get all executable intent IDs (ready for execution now)
 */
export async function getExecutableIntents(): Promise<bigint[]> {
  try {
    const result = await aptos.view({
      payload: {
        function: `${VELOX_ADDRESS}::scheduled::get_executable_intents`,
        typeArguments: [],
        functionArguments: [VELOX_ADDRESS],
      },
    });

    if (!result || !result[0]) return [];
    const ids = result[0] as string[];
    return ids.map((id) => BigInt(id));
  } catch (error) {
    console.error('[Velox] Error fetching executable intents:', error);
    return [];
  }
}

// ============ Period/Chunk Fill Event Fetching ============

interface PeriodFillInfo {
  txHash: string;
  periodNumber: number;
  inputAmount: bigint;
  outputAmount: bigint;
  filledAt: number;
}

// Cache for period fill transactions
const periodFillCache: Map<string, PeriodFillInfo[]> = new Map();

/**
 * Fetch DCA period fill or TWAP chunk fill transactions for an intent
 */
export async function fetchPeriodFillEvents(intentId: bigint): Promise<PeriodFillInfo[]> {
  const cacheKey = intentId.toString();

  // Return cached if available and recent
  const cached = periodFillCache.get(cacheKey);
  if (cached) return cached;

  try {
    // Fetch transactions from the contract address
    const response = await fetch(`${RPC_URL}/accounts/${VELOX_ADDRESS}/transactions?limit=200`);
    if (!response.ok) return [];

    const transactions = await response.json() as Transaction[];
    const fills: PeriodFillInfo[] = [];

    for (const tx of transactions) {
      if (!tx.events) continue;

      for (const event of tx.events) {
        // Check for DCAPeriodFilled events
        if (event.type === `${VELOX_ADDRESS}::settlement::DCAPeriodFilled`) {
          const data = event.data as Record<string, unknown>;
          if (data.intent_id?.toString() === intentId.toString()) {
            fills.push({
              txHash: tx.hash || tx.version,
              periodNumber: Number(data.period_number || 0),
              inputAmount: BigInt(String(data.period_input || '0')),
              outputAmount: BigInt(String(data.period_output || '0')),
              filledAt: Number(data.filled_at || 0),
            });
          }
        }

        // Check for TWAPChunkFilled events
        if (event.type === `${VELOX_ADDRESS}::settlement::TWAPChunkFilled`) {
          const data = event.data as Record<string, unknown>;
          if (data.intent_id?.toString() === intentId.toString()) {
            fills.push({
              txHash: tx.hash || tx.version,
              periodNumber: Number(data.chunk_number || 0),
              inputAmount: BigInt(String(data.chunk_input || '0')),
              outputAmount: BigInt(String(data.chunk_output || '0')),
              filledAt: Number(data.filled_at || 0),
            });
          }
        }
      }
    }

    // Sort by period number
    fills.sort((a, b) => a.periodNumber - b.periodNumber);

    // Cache the result
    periodFillCache.set(cacheKey, fills);

    return fills;
  } catch (error) {
    console.error('[Velox] Error fetching period fill events:', error);
    return [];
  }
}

/**
 * Get period fill transaction hashes for an intent
 */
export async function getPeriodFillTxHashes(intentId: bigint): Promise<string[]> {
  const fills = await fetchPeriodFillEvents(intentId);
  return fills.map(f => f.txHash);
}

/**
 * Get total output received from all period fills
 */
export async function getTotalOutputFromFills(intentId: bigint): Promise<bigint> {
  const fills = await fetchPeriodFillEvents(intentId);
  return fills.reduce((acc, f) => acc + f.outputAmount, BigInt(0));
}

/**
 * Clear period fill cache (useful for refresh)
 */
export function clearPeriodFillCache(): void {
  periodFillCache.clear();
}
