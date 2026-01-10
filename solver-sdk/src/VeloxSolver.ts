import { EventEmitter } from 'events';
import { VeloxAptosClient } from './client/AptosClient';
import { VeloxGraphQLClient } from './client/GraphQLClient';
import {
  Intent,
  IntentType,
  IntentStatus,
  IntentRecord,
  AuctionState,
  AuctionType,
  Fill,
  Bid,
  RawIntentRecord,
  parseIntentStatus,
  parseAuctionType,
  parseIntentType,
  isScheduledIntent,
  isNextChunkReady,
  getRemainingChunks,
  getIntentTotalAmount,
} from './types/intent';
import {
  FillParams,
  ChunkFillParams,
  FillResult,
  SolverStats,
  SwapRoute,
  MAX_FILLS_PER_INTENT,
  calculateProportionalMinOutput,
} from './types/solution';
import { calculatePrice } from './utils/pricing';
import {
  calculateOutputFromPrices,
  applySpread,
  getTokenSymbol,
} from './utils/coingecko';

export interface VeloxSolverConfig {
  rpcUrl: string;
  veloxAddress: string;
  /** Fee config address (defaults to veloxAddress) */
  feeConfigAddr?: string;
  privateKey?: string;
  graphqlUrl?: string;
  pollingInterval?: number;
  /** Skip processing intents that existed before the solver started */
  skipExistingOnStartup?: boolean;
  /** Shinami Node Service API key for enhanced RPC reliability */
  shinamiNodeKey?: string;
}

export class VeloxSolver extends EventEmitter {
  private client: VeloxAptosClient;
  private graphql?: VeloxGraphQLClient;
  private veloxAddress: string;
  private feeConfigAddr: string;
  private isRunning: boolean = false;
  private pollingInterval: number;
  private skipExistingOnStartup: boolean;

  constructor(config: VeloxSolverConfig) {
    super();
    this.client = new VeloxAptosClient({
      rpcUrl: config.rpcUrl,
      privateKey: config.privateKey,
      shinamiNodeKey: config.shinamiNodeKey,
    });
    this.veloxAddress = config.veloxAddress;
    this.feeConfigAddr = config.feeConfigAddr || config.veloxAddress;
    this.pollingInterval = config.pollingInterval || 1000;
    this.skipExistingOnStartup = config.skipExistingOnStartup ?? false;

    if (config.graphqlUrl) {
      this.graphql = new VeloxGraphQLClient({ url: config.graphqlUrl });
    }

    if (config.shinamiNodeKey) {
      console.log('[VeloxSolver] Shinami Node Service enabled for enhanced reliability');
    }
  }

  // ============ Intent Discovery ============

  async getActiveIntents(): Promise<IntentRecord[]> {
    // Get total intents count
    const totalResult = await this.client.view<[string]>({
      function: `${this.veloxAddress}::submission::get_total_intents`,
      typeArguments: [],
      functionArguments: [this.veloxAddress],
    });

    const totalIntents = parseInt(totalResult[0] || '0');
    const activeIntents: IntentRecord[] = [];

    // Iterate through all intents and filter active ones
    for (let i = 0; i < totalIntents; i++) {
      try {
        const intentResult = await this.client.view<[RawIntentRecord]>({
          function: `${this.veloxAddress}::submission::get_intent`,
          typeArguments: [],
          functionArguments: [this.veloxAddress, i],
        });

        if (intentResult[0]) {
          const record = this.parseIntentRecord(intentResult[0]);
          if (record.status === IntentStatus.ACTIVE) {
            activeIntents.push(record);
          }
        }
      } catch (error) {
        console.log(`Skipping intent ${i}:`, (error as Error).message);
      }
    }

    return activeIntents;
  }

  async getIntent(intentId: number): Promise<IntentRecord | null> {
    try {
      const result = await this.client.view<[RawIntentRecord]>({
        function: `${this.veloxAddress}::submission::get_intent`,
        typeArguments: [],
        functionArguments: [this.veloxAddress, intentId],
      });
      return result[0] ? this.parseIntentRecord(result[0]) : null;
    } catch {
      return null;
    }
  }

  async startIntentStream(callback: (record: IntentRecord) => void): Promise<void> {
    // Validate solver registration before starting
    await this.validateSolverRegistration();

    this.isRunning = true;
    this.pollIntents(callback);
  }

  stopIntentStream(): void {
    this.isRunning = false;
  }

  // ============ Solver Registration Validation ============

  /**
   * Validate that solver is registered with stake before starting
   * Fetches and displays solver metadata
   */
  async validateSolverRegistration(): Promise<void> {
    if (!this.client.hasAccount()) {
      throw new Error('❌ Solver account not configured. Please set SOLVER_PRIVATE_KEY in .env');
    }

    const solverAddress = this.client.getAccountAddress();
    if (!solverAddress) {
      throw new Error('❌ Could not determine solver address');
    }

    console.log('\n' + '='.repeat(70));
    console.log('🔐 SOLVER REGISTRATION VALIDATION');
    console.log('='.repeat(70));
    console.log(`Checking registration for: ${solverAddress}\n`);

    try {
      const stats = await this.getSolverStats(solverAddress);

      if (!stats.isRegistered) {
        console.error('❌ Solver is NOT registered!');
        console.error('\nTo register, you must:');
        console.error('1. Call solver_registry::register_solver');
        console.error('2. Call solver_registry::add_stake with at least minimum stake amount');
        console.error('\nExample:');
        console.error('  movement move run --function-id <VELOX>::solver_registry::register_solver');
        console.error('  movement move run --function-id <VELOX>::solver_registry::add_stake --args <AMOUNT>');
        throw new Error('Solver not registered');
      }

      if (stats.stake === 0n) {
        console.error('❌ Solver has NO STAKE!');
        console.error('\nPlease add stake before running solver:');
        console.error('  movement move run --function-id <VELOX>::solver_registry::add_stake --args <AMOUNT>');
        throw new Error('Solver has no stake');
      }

      // Display solver profile metadata
      console.log('✅ SOLVER PROFILE METADATA');
      console.log('-'.repeat(70));
      console.log(`Address:              ${stats.address}`);
      console.log(`Registered:           ${stats.isRegistered ? '✓ Yes' : '✗ No'}`);
      console.log(`Status:               ${stats.isActive ? '🟢 ACTIVE' : '🔴 INACTIVE'}`);
      console.log('-'.repeat(70));
      console.log(`Stake (Octas):        ${stats.stake.toString()}`);
      console.log(`Pending Unstake:      ${stats.pendingUnstake.toString()}`);
      if (stats.unstakeAvailableAt > 0) {
        const unstakeDate = new Date(stats.unstakeAvailableAt * 1000).toISOString();
        console.log(`Unstake Available:    ${unstakeDate}`);
      }
      console.log('-'.repeat(70));
      console.log(`Reputation Score:     ${stats.reputationScore}`);
      console.log(`Successful Fills:     ${stats.successfulFills}`);
      console.log(`Failed Fills:         ${stats.failedFills}`);
      console.log(`Total Volume:         ${stats.totalVolume.toString()} (Octas)`);
      console.log('-'.repeat(70));

      const registeredDate = new Date(stats.registeredAt * 1000).toISOString();
      const lastActiveDate = stats.lastActive > 0 ? new Date(stats.lastActive * 1000).toISOString() : 'Never';
      console.log(`Registered At:        ${registeredDate}`);
      console.log(`Last Active:          ${lastActiveDate}`);
      console.log('='.repeat(70));
      console.log('✅ Solver validation passed. Starting intent stream...\n');
    } catch (error) {
      if (error instanceof Error && (error.message.includes('not registered') || error.message.includes('no stake'))) {
        throw error;
      }
      throw new Error(`Failed to validate solver registration: ${(error as Error).message}`);
    }
  }

  // ============ Fill Functions (NEW) ============

  /**
   * Fill a swap intent (partial or full)
   * Uses settlement::fill_swap
   */
  async fillSwap(params: FillParams): Promise<FillResult> {
    if (!this.client.hasAccount()) {
      throw new Error('Solver account not configured');
    }

    console.log(`Calling fill_swap:`);
    console.log(`  Registry: ${this.veloxAddress}`);
    console.log(`  Fee Config: ${this.feeConfigAddr}`);
    console.log(`  Intent ID: ${params.intentId}`);
    console.log(`  Fill Input: ${params.fillInput}`);
    console.log(`  Output Amount: ${params.outputAmount}`);

    try {
      const txHash = await this.client.submitTransaction({
        function: `${this.veloxAddress}::settlement::fill_swap`,
        typeArguments: [],
        functionArguments: [
          this.veloxAddress,
          this.feeConfigAddr,
          params.intentId.toString(),
          params.fillInput.toString(),
          params.outputAmount.toString(),
        ],
      });

      console.log(`fill_swap transaction successful: ${txHash}`);
      return {
        success: true,
        txHash,
        fillInput: params.fillInput,
        outputAmount: params.outputAmount,
      };
    } catch (error) {
      console.error(`fill_swap failed:`, error);
      return { success: false, error: (error as Error).message };
    }
  }

  /**
   * Fill a limit order (partial or full)
   * Uses settlement::fill_limit_order
   */
  async fillLimitOrder(params: FillParams): Promise<FillResult> {
    if (!this.client.hasAccount()) {
      throw new Error('Solver account not configured');
    }

    console.log(`Calling fill_limit_order:`);
    console.log(`  Registry: ${this.veloxAddress}`);
    console.log(`  Fee Config: ${this.feeConfigAddr}`);
    console.log(`  Intent ID: ${params.intentId}`);
    console.log(`  Fill Input: ${params.fillInput}`);
    console.log(`  Output Amount: ${params.outputAmount}`);

    try {
      const txHash = await this.client.submitTransaction({
        function: `${this.veloxAddress}::settlement::fill_limit_order`,
        typeArguments: [],
        functionArguments: [
          this.veloxAddress,
          this.feeConfigAddr,
          params.intentId.toString(),
          params.fillInput.toString(),
          params.outputAmount.toString(),
        ],
      });

      console.log(`fill_limit_order transaction successful: ${txHash}`);
      return {
        success: true,
        txHash,
        fillInput: params.fillInput,
        outputAmount: params.outputAmount,
      };
    } catch (error) {
      console.error(`fill_limit_order failed:`, error);
      return { success: false, error: (error as Error).message };
    }
  }

  /**
   * Fill a TWAP chunk
   * Uses settlement::fill_twap_chunk
   */
  async fillTwapChunk(params: ChunkFillParams): Promise<FillResult> {
    if (!this.client.hasAccount()) {
      throw new Error('Solver account not configured');
    }

    console.log(`Calling fill_twap_chunk:`);
    console.log(`  Registry: ${this.veloxAddress}`);
    console.log(`  Fee Config: ${this.feeConfigAddr}`);
    console.log(`  Intent ID: ${params.intentId}`);
    console.log(`  Output Amount: ${params.outputAmount}`);

    try {
      const txHash = await this.client.submitTransaction({
        function: `${this.veloxAddress}::settlement::fill_twap_chunk`,
        typeArguments: [],
        functionArguments: [
          this.veloxAddress,
          this.feeConfigAddr,
          params.intentId.toString(),
          params.outputAmount.toString(),
        ],
      });

      console.log(`fill_twap_chunk transaction successful: ${txHash}`);
      return { success: true, txHash, outputAmount: params.outputAmount };
    } catch (error) {
      console.error(`fill_twap_chunk failed:`, error);
      return { success: false, error: (error as Error).message };
    }
  }

  /**
   * Fill a DCA period
   * Uses settlement::fill_dca_period
   */
  async fillDcaPeriod(params: ChunkFillParams): Promise<FillResult> {
    if (!this.client.hasAccount()) {
      throw new Error('Solver account not configured');
    }

    console.log(`Calling fill_dca_period:`);
    console.log(`  Registry: ${this.veloxAddress}`);
    console.log(`  Fee Config: ${this.feeConfigAddr}`);
    console.log(`  Intent ID: ${params.intentId}`);
    console.log(`  Output Amount: ${params.outputAmount}`);

    try {
      const txHash = await this.client.submitTransaction({
        function: `${this.veloxAddress}::settlement::fill_dca_period`,
        typeArguments: [],
        functionArguments: [
          this.veloxAddress,
          this.feeConfigAddr,
          params.intentId.toString(),
          params.outputAmount.toString(),
        ],
      });

      console.log(`fill_dca_period transaction successful: ${txHash}`);
      return { success: true, txHash, outputAmount: params.outputAmount };
    } catch (error) {
      console.error(`fill_dca_period failed:`, error);
      return { success: false, error: (error as Error).message };
    }
  }

  // ============ View Functions ============

  /**
   * Check if solver can fill an intent
   */
  async canFill(intentId: number): Promise<boolean> {
    try {
      const solverAddr = this.client.getAccountAddress();
      if (!solverAddr) return false;

      const result = await this.client.view<[boolean]>({
        function: `${this.veloxAddress}::settlement::can_fill`,
        typeArguments: [],
        functionArguments: [this.veloxAddress, intentId.toString(), solverAddr],
      });
      return result[0] ?? false;
    } catch (error) {
      console.error(`Error checking can_fill:`, error);
      return false;
    }
  }

  /**
   * Calculate minimum output for a partial fill
   */
  async calculateMinOutput(intentId: number, fillInput: bigint): Promise<bigint> {
    try {
      const result = await this.client.view<[string]>({
        function: `${this.veloxAddress}::settlement::calculate_min_output_for_fill`,
        typeArguments: [],
        functionArguments: [this.veloxAddress, intentId.toString(), fillInput.toString()],
      });
      return BigInt(result[0] || '0');
    } catch (error) {
      console.error(`Error calculating min output:`, error);
      return 0n;
    }
  }

  /**
   * Get current Dutch auction price
   */
  async getDutchPrice(intentId: number): Promise<bigint> {
    try {
      const result = await this.client.view<[string]>({
        function: `${this.veloxAddress}::auction::get_current_dutch_price`,
        typeArguments: [],
        functionArguments: [this.veloxAddress, intentId.toString()],
      });
      return BigInt(result[0] || '0');
    } catch (error) {
      console.error(`Error getting Dutch price:`, error);
      return 0n;
    }
  }

  /**
   * Get auction winner
   */
  async getAuctionWinner(intentId: number): Promise<{ hasWinner: boolean; winner: string }> {
    try {
      const result = await this.client.view<[boolean, string]>({
        function: `${this.veloxAddress}::auction::get_winner`,
        typeArguments: [],
        functionArguments: [this.veloxAddress, intentId.toString()],
      });
      return { hasWinner: result[0] ?? false, winner: result[1] ?? '' };
    } catch (error) {
      console.error(`Error getting auction winner:`, error);
      return { hasWinner: false, winner: '' };
    }
  }

  /**
   * Get fee basis points
   */
  async getFeeBps(): Promise<number> {
    try {
      const result = await this.client.view<[string]>({
        function: `${this.veloxAddress}::settlement::get_fee_bps`,
        typeArguments: [],
        functionArguments: [this.feeConfigAddr],
      });
      return Number(result[0] || '30');
    } catch (error) {
      console.error(`Error getting fee bps:`, error);
      return 30; // Default 0.3%
    }
  }

  // ============ Auction Functions ============

  /**
   * Submit a bid to a sealed-bid auction
   */
  async submitBid(intentId: number, outputAmount: bigint): Promise<FillResult> {
    if (!this.client.hasAccount()) {
      throw new Error('Solver account not configured');
    }

    console.log(`Calling submit_bid:`);
    console.log(`  Registry: ${this.veloxAddress}`);
    console.log(`  Intent ID: ${intentId}`);
    console.log(`  Output Amount: ${outputAmount}`);

    try {
      const txHash = await this.client.submitTransaction({
        function: `${this.veloxAddress}::auction::submit_bid`,
        typeArguments: [],
        functionArguments: [
          this.veloxAddress,
          intentId.toString(),
          outputAmount.toString(),
        ],
      });

      console.log(`submit_bid transaction successful: ${txHash}`);
      return { success: true, txHash };
    } catch (error) {
      console.error(`submit_bid failed:`, error);
      return { success: false, error: (error as Error).message };
    }
  }

  /**
   * Accept a Dutch auction at current price
   */
  async acceptDutchAuction(intentId: number): Promise<FillResult> {
    if (!this.client.hasAccount()) {
      throw new Error('Solver account not configured');
    }

    console.log(`Calling accept_dutch:`);
    console.log(`  Registry: ${this.veloxAddress}`);
    console.log(`  Intent ID: ${intentId}`);

    try {
      const txHash = await this.client.submitTransaction({
        function: `${this.veloxAddress}::auction::accept_dutch`,
        typeArguments: [],
        functionArguments: [this.veloxAddress, intentId.toString()],
      });

      console.log(`accept_dutch transaction successful: ${txHash}`);
      return { success: true, txHash };
    } catch (error) {
      console.error(`accept_dutch failed:`, error);
      return { success: false, error: (error as Error).message };
    }
  }

  /**
   * Complete a sealed-bid auction (after end time)
   */
  async completeSealedBid(intentId: number): Promise<FillResult> {
    console.log(`Calling complete_sealed_bid:`);
    console.log(`  Registry: ${this.veloxAddress}`);
    console.log(`  Intent ID: ${intentId}`);

    try {
      const txHash = await this.client.submitTransaction({
        function: `${this.veloxAddress}::auction::complete_sealed_bid`,
        typeArguments: [],
        functionArguments: [this.veloxAddress, intentId.toString()],
      });

      console.log(`complete_sealed_bid transaction successful: ${txHash}`);
      return { success: true, txHash };
    } catch (error) {
      console.error(`complete_sealed_bid failed:`, error);
      return { success: false, error: (error as Error).message };
    }
  }

  // ============ Pricing & Routing ============

  async findBestRoute(
    tokenIn: string,
    tokenOut: string,
    amountIn: bigint
  ): Promise<SwapRoute> {
    // Use CoinGecko pricing to calculate output
    const { outputAmount } = await calculateOutputFromPrices(
      tokenIn,
      tokenOut,
      amountIn,
      8, // input decimals
      8  // output decimals
    );

    // Apply a small spread for solver profit (0.1%)
    const finalOutput = applySpread(outputAmount, 10);

    console.log(`Route found: ${getTokenSymbol(tokenIn)} -> ${getTokenSymbol(tokenOut)}`);
    console.log(`  Raw output: ${outputAmount}`);
    console.log(`  After spread: ${finalOutput}`);

    return {
      steps: [
        {
          dexId: 0,
          poolAddress: 'direct',
          tokenIn,
          tokenOut,
          amountIn,
          expectedOut: finalOutput,
        },
      ],
      expectedOutput: finalOutput,
      priceImpact: 0,
    };
  }

  // ============ Solver Stats ============

  async getSolverStats(address?: string): Promise<SolverStats> {
    const solverAddress = address || this.client.getAccountAddress();
    if (!solverAddress) {
      throw new Error('No solver address provided');
    }

    try {
      const result = await this.client.view<[unknown]>({
        function: `${this.veloxAddress}::solver_registry::get_solver_info`,
        typeArguments: [],
        functionArguments: [this.veloxAddress, solverAddress],
      });

      return this.parseSolverStats(result[0], solverAddress);
    } catch (error) {
      console.error(`Error getting solver stats:`, error);
      return {
        address: solverAddress,
        isRegistered: false,
        isActive: false,
        stake: 0n,
        pendingUnstake: 0n,
        unstakeAvailableAt: 0,
        reputationScore: 0,
        successfulFills: 0,
        failedFills: 0,
        totalVolume: 0n,
        registeredAt: 0,
        lastActive: 0,
      };
    }
  }

  // ============ Private Methods ============

  private async pollIntents(callback: (record: IntentRecord) => void): Promise<void> {
    const lastSeen = new Set<number>();

    if (this.skipExistingOnStartup) {
      try {
        const existingIntents = await this.getActiveIntents();
        console.log(`Skipping ${existingIntents.length} existing active intents...`);
        for (const record of existingIntents) {
          lastSeen.add(record.id);
        }
      } catch (error) {
        this.emit('error', error);
      }
    }

    while (this.isRunning) {
      try {
        const intents = await this.getActiveIntents();

        for (const record of intents) {
          if (!lastSeen.has(record.id)) {
            callback(record);
            lastSeen.add(record.id);
          }
        }
      } catch (error) {
        this.emit('error', error);
      }

      await new Promise((resolve) => setTimeout(resolve, this.pollingInterval));
    }
  }

  private parseIntentRecord(raw: unknown): IntentRecord {
    const data = raw as Record<string, unknown>;

    // Parse intent from enum variant
    const rawIntent = data.intent as Record<string, unknown>;
    const intent = this.parseIntent(rawIntent);

    // Parse auction state - use empty auction if not present
    const rawAuction = data.auction as Record<string, unknown> | undefined;
    const auction = rawAuction ? this.parseAuctionState(rawAuction) : { type: AuctionType.NONE };

    // Parse status - default to ACTIVE if not present
    const rawStatus = data.status as { type?: string } | undefined;
    const status = rawStatus?.type
      ? parseIntentStatus(rawStatus as { type: string })
      : IntentStatus.ACTIVE;

    // Parse fills - default to empty array if not present
    const rawFills = (data.fills as unknown[]) || [];
    const fills: Fill[] = rawFills.map((f) => {
      const fill = f as Record<string, unknown>;
      return {
        solver: String(fill.solver || ''),
        inputAmount: BigInt(String(fill.input_amount || '0')),
        outputAmount: BigInt(String(fill.output_amount || '0')),
        filledAt: Number(fill.filled_at || 0),
      };
    });

    // Use escrowed_amount as escrow_remaining fallback
    const escrowRemaining = data.escrow_remaining || data.escrowed_amount;
    const totalOutputReceived = data.total_output_received || data.filled_amount || '0';

    return {
      id: Number(data.id || 0),
      user: String(data.user || ''),
      createdAt: Number(data.created_at || 0),
      intent,
      auction,
      status,
      escrowRemaining: BigInt(String(escrowRemaining || '0')),
      totalOutputReceived: BigInt(String(totalOutputReceived || '0')),
      fills,
      chunksExecuted: Number(data.chunks_executed || 0),
      nextExecution: Number(data.next_execution || 0),
    };
  }

  private parseIntent(raw: Record<string, unknown>): Intent {
    // Handle Move 2.0 enum variant pattern
    const variant = raw.__variant__ || raw.type || (raw as any).variant;
    let type = IntentType.SWAP;

    if (typeof variant === 'string') {
      type = parseIntentType({ type: variant });
    }

    // Extract fields based on type
    const inputToken = String(raw.input_token || '');
    const outputToken = String(raw.output_token || '');

    const intent: Intent = {
      type,
      inputToken,
      outputToken,
    };

    // Swap fields
    if (raw.amount_in) intent.amountIn = BigInt(String(raw.amount_in));
    if (raw.min_amount_out) intent.minAmountOut = BigInt(String(raw.min_amount_out));
    if (raw.deadline) intent.deadline = Number(raw.deadline);

    // LimitOrder fields
    if (raw.limit_price) intent.limitPrice = BigInt(String(raw.limit_price));
    if (raw.expiry) intent.expiry = Number(raw.expiry);

    // TWAP fields
    if (raw.total_amount) intent.totalAmount = BigInt(String(raw.total_amount));
    if (raw.num_chunks) intent.numChunks = Number(raw.num_chunks);
    if (raw.interval_seconds) intent.intervalSeconds = Number(raw.interval_seconds);
    if (raw.max_slippage_bps) intent.maxSlippageBps = Number(raw.max_slippage_bps);
    if (raw.start_time) intent.startTime = Number(raw.start_time);

    // DCA fields
    if (raw.amount_per_period) intent.amountPerPeriod = BigInt(String(raw.amount_per_period));
    if (raw.total_periods) intent.totalPeriods = Number(raw.total_periods);

    return intent;
  }

  private parseAuctionState(raw: Record<string, unknown>): AuctionState {
    const variant = raw.__variant__ || raw.type;

    if (!variant || variant === 'None') {
      return { type: AuctionType.NONE };
    }

    const type = parseAuctionType({ type: String(variant) });
    const auction: AuctionState = { type };

    // SealedBidActive fields
    if (raw.end_time) auction.endTime = Number(raw.end_time);
    if (raw.bids && Array.isArray(raw.bids)) {
      auction.bids = raw.bids.map((b) => {
        const bid = b as Record<string, unknown>;
        return {
          solver: String(bid.solver || ''),
          outputAmount: BigInt(String(bid.output_amount || '0')),
          submittedAt: Number(bid.submitted_at || 0),
        };
      });
    }

    // SealedBidCompleted fields
    if (raw.winner) auction.winner = String(raw.winner);
    if (raw.winning_bid) auction.winningBid = BigInt(String(raw.winning_bid));
    if (raw.fill_deadline) auction.fillDeadline = Number(raw.fill_deadline);

    // DutchActive fields
    if (raw.start_price) auction.startPrice = BigInt(String(raw.start_price));
    if (raw.end_price) auction.endPrice = BigInt(String(raw.end_price));

    // DutchAccepted fields
    if (raw.accepted_price) auction.acceptedPrice = BigInt(String(raw.accepted_price));

    return auction;
  }

  private parseSolverStats(raw: unknown, address: string): SolverStats {
    const data = raw as Record<string, unknown>;
    return {
      address,
      isRegistered: true,
      isActive: Boolean(data.is_active),
      stake: BigInt(String(data.stake || '0')),
      pendingUnstake: BigInt(String(data.pending_unstake || '0')),
      unstakeAvailableAt: Number(data.unstake_available_at || 0),
      reputationScore: Number(data.reputation_score || 0),
      successfulFills: Number(data.successful_fills || 0),
      failedFills: Number(data.failed_fills || 0),
      totalVolume: BigInt(String(data.total_volume || '0')),
      registeredAt: Number(data.registered_at || 0),
      lastActive: Number(data.last_active || 0),
    };
  }
}
