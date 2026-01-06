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
import {
  veloxLogo,
  printVeloxLogo,
  printLoadingAnimation,
  printSuccess,
  printError,
  printWarning,
  printInfo,
  printSection,
  printMetricBox,
  printKeyValue,
  printStatus,
  printGradientText,
} from './utils/cliStyle';

export interface VeloxSolverConfig {
  rpcUrl: string;
  veloxAddress: string;
  /** Fee config address (defaults to veloxAddress) */
  feeConfigAddr?: string;
  /** Private key of the operator wallet (used for signing transactions) */
  privateKey?: string;
  /** Address where the solver is registered on-chain (can be different from operator wallet) */
  registeredSolverAddress?: string;
  graphqlUrl?: string;
  pollingInterval?: number;
  /** Skip processing intents that existed before the solver started */
  skipExistingOnStartup?: boolean;
  /** Shinami Node Service API key for enhanced RPC reliability */
  shinamiNodeKey?: string;
  /** Velox API URL for recording transactions (e.g., https://velox.app or http://localhost:3001) */
  veloxApiUrl?: string;
}

export class VeloxSolver extends EventEmitter {
  private client: VeloxAptosClient;
  private graphql?: VeloxGraphQLClient;
  private veloxAddress: string;
  private feeConfigAddr: string;
  private isRunning: boolean = false;
  private pollingInterval: number;
  private skipExistingOnStartup: boolean;
  private registeredSolverAddress?: string;
  private veloxApiUrl?: string;

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
    this.registeredSolverAddress = config.registeredSolverAddress;

    if (config.graphqlUrl) {
      this.graphql = new VeloxGraphQLClient({ url: config.graphqlUrl });
    }

    if (config.shinamiNodeKey) {
      console.log('[VeloxSolver] Shinami Node Service enabled for enhanced reliability');
    }

    this.veloxApiUrl = config.veloxApiUrl;
    if (this.veloxApiUrl) {
      console.log(`[VeloxSolver] Velox API configured: ${this.veloxApiUrl}`);
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
      throw new Error(
        '❌ SOLVER ACCOUNT INITIALIZATION FAILED\n\n' +
        'Could not initialize account from SOLVER_PRIVATE_KEY.\n' +
        'This usually means:\n' +
        '  1. SOLVER_PRIVATE_KEY is not set in .env\n' +
        '  2. SOLVER_PRIVATE_KEY is in an invalid format (should be 0x...)\n' +
        '  3. Private key is malformed or corrupted\n\n' +
        'Please verify your .env configuration and try again.'
      );
    }

    const operatorAddress = this.client.getAccountAddress();
    if (!operatorAddress) {
      throw new Error(
        '❌ OPERATOR ADDRESS DERIVATION FAILED\n\n' +
        'Could not derive operator address from private key.\n' +
        'Please check that your SOLVER_PRIVATE_KEY is valid.'
      );
    }

    // Use registered solver address if provided, otherwise use operator address
    const solverAddress = this.registeredSolverAddress || operatorAddress;

    printVeloxLogo();
    printSection('🔐 SOLVER REGISTRATION VALIDATION');
    await printLoadingAnimation('📋 Validating solver credentials', 1000);
    printInfo(`Registered Solver Address: ${solverAddress}`);
    if (this.registeredSolverAddress) {
      printInfo(`Operator Address: ${operatorAddress}`);
    }

    try {
      const stats = await this.getSolverStats(solverAddress);

      if (!stats.isRegistered) {
        printError('Solver is NOT registered with Velox network');
        printSection('❌ REGISTRATION REQUIRED');
        console.log('');
        console.log('  Your solver must be registered before starting.');
        console.log('');
        printInfo('Run this command to register with stake:');
        console.log('');
        console.log('  \x1b[1mmovement move run \\');
        console.log('    --function-id <VELOX>::solver_registry::register_and_stake \\');
        console.log('    --args \\');
        console.log('      string:"<metadata_uri>" \\');
        console.log('      u64:<stake_amount>\x1b[0m');
        console.log('');
        printInfo('Example (with 1 MOVE stake):');
        console.log('');
        console.log('  \x1b[1mmovement move run \\');
        console.log('    --function-id 0x123...::solver_registry::register_and_stake \\');
        console.log('    --args \\');
        console.log('      string:"https://example.com/solver" \\');
        console.log('      u64:1000000000\x1b[0m');
        console.log('');
        throw new Error('Solver not registered');
      }

      if (stats.stake === 0n) {
        printWarning('Solver has no stake');
        printSection('⚠️  NO STAKE FOUND');
        console.log('');
        console.log('  Your solver is registered but has no active stake.');
        console.log('');
        printInfo('Add stake using:');
        console.log('');
        console.log('  \x1b[1mmovement move run \\');
        console.log('    --function-id <VELOX>::solver_registry::add_stake \\');
        console.log('    --args \\');
        console.log('      address:<registry_address> \\');
        console.log('      u64:<stake_amount>\x1b[0m');
        console.log('');
        throw new Error('Solver has no stake');
      }

      await printLoadingAnimation('📊 Loading solver profile', 800);
      printSuccess('Solver validation PASSED');
      printSection('✅ SOLVER READY TO START');

      // Profile metrics
      printMetricBox('📊 SOLVER PROFILE', [
        { label: 'Address', value: stats.address.slice(0, 12) + '...' + stats.address.slice(-8) },
        { label: 'Status', value: stats.isActive ? '🟢 ACTIVE' : '🔴 INACTIVE' },
        { label: 'Registered', value: stats.isRegistered ? '✓ Yes' : '✗ No' },
      ]);

      // Stake metrics
      printMetricBox('💰 STAKE INFORMATION', [
        { label: 'Total Stake (Octas)', value: stats.stake.toString() },
        { label: 'Pending Unstake', value: stats.pendingUnstake.toString() },
      ]);

      // Performance metrics
      printMetricBox('🎯 PERFORMANCE METRICS', [
        { label: 'Reputation Score', value: `${stats.reputationScore}/10000` },
        { label: 'Successful Fills', value: stats.successfulFills.toString() },
        { label: 'Failed Fills', value: stats.failedFills.toString() },
        { label: 'Total Volume (Octas)', value: stats.totalVolume.toString() },
      ]);

      // Activity metrics
      const registeredDate = new Date(stats.registeredAt * 1000).toISOString();
      const lastActiveDate = stats.lastActive > 0 ? new Date(stats.lastActive * 1000).toISOString() : 'Never';
      printMetricBox('📅 ACTIVITY LOG', [
        { label: 'Registered At', value: registeredDate },
        { label: 'Last Active', value: lastActiveDate },
      ]);

      await printLoadingAnimation('🚀 Initializing intent stream', 1200);
      printSuccess('Solver initialized and ready!');
      console.log('');
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

      // Record taker transaction in Velox API
      await this.recordTakerTransaction(params.intentId, txHash, params.fillInput);

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

      // Record taker transaction in Velox API
      await this.recordTakerTransaction(params.intentId, txHash, params.fillInput);

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

      // Record taker transaction in Velox API
      await this.recordTakerTransaction(params.intentId, txHash, params.outputAmount);

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

      // Record taker transaction in Velox API
      await this.recordTakerTransaction(params.intentId, txHash, params.outputAmount);

      return { success: true, txHash, outputAmount: params.outputAmount };
    } catch (error) {
      console.error(`fill_dca_period failed:`, error);
      return { success: false, error: (error as Error).message };
    }
  }

  /**
   * Record a taker transaction in the Velox API (Supabase)
   * Called automatically after successful fills if veloxApiUrl is configured
   */
  async recordTakerTransaction(
    intentId: number,
    txHash: string,
    fillAmount?: bigint
  ): Promise<void> {
    if (!this.veloxApiUrl) {
      console.log('[VeloxSolver] No Velox API URL configured, skipping transaction recording');
      return;
    }

    const solverAddress = this.registeredSolverAddress || this.client.getAccountAddress();
    if (!solverAddress) {
      console.warn('[VeloxSolver] No solver address available for recording transaction');
      return;
    }

    try {
      const response = await fetch(`${this.veloxApiUrl}/api/transactions/taker`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          intent_id: intentId.toString(),
          taker_tx_hash: txHash,
          solver_address: solverAddress,
          fill_amount: fillAmount?.toString(),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.warn(`[VeloxSolver] Failed to record taker tx: ${response.status}`, errorData);
        return;
      }

      console.log(`[VeloxSolver] Taker transaction recorded: ${txHash}`);
    } catch (error) {
      console.warn('[VeloxSolver] Error recording taker transaction:', (error as Error).message);
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
    const solverAddress = address || this.registeredSolverAddress || this.client.getAccountAddress();
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
      // Error 20 = ESOLVER_NOT_REGISTERED - expected for unregistered solvers
      const isNotRegisteredError = error instanceof Error &&
        error.message?.includes('sub_status: Some(20)');
      if (!isNotRegisteredError) {
        console.error(`Error getting solver stats:`, error);
      }
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
    // Track scheduled intents (TWAP/DCA) that need periodic re-checking
    const scheduledIntents = new Set<number>();

    if (this.skipExistingOnStartup) {
      try {
        const existingIntents = await this.getActiveIntents();
        console.log(`Skipping ${existingIntents.length} existing active intents...`);
        for (const record of existingIntents) {
          lastSeen.add(record.id);
          // Track existing scheduled intents for re-checking
          if (record.intent.type === IntentType.TWAP || record.intent.type === IntentType.DCA) {
            scheduledIntents.add(record.id);
          }
        }
      } catch (error) {
        this.emit('error', error);
      }
    }

    while (this.isRunning) {
      try {
        const intents = await this.getActiveIntents();

        for (const record of intents) {
          const isScheduled = record.intent.type === IntentType.TWAP || record.intent.type === IntentType.DCA;

          // Check if scheduled intent is fully completed
          if (isScheduled) {
            const remaining = getRemainingChunks(record);
            if (remaining === 0) {
              // All chunks done - stop tracking this intent
              if (scheduledIntents.has(record.id)) {
                scheduledIntents.delete(record.id);
              }
              continue; // Skip callback for completed scheduled intents
            }
          }

          if (!lastSeen.has(record.id)) {
            // New intent - process it
            callback(record);
            lastSeen.add(record.id);
            if (isScheduled) {
              scheduledIntents.add(record.id);
            }
          } else if (isScheduled && scheduledIntents.has(record.id)) {
            // Re-check scheduled intents on every poll cycle
            // The callback handler will check if the next chunk is ready
            callback(record);
          }
        }

        // Clean up completed/cancelled scheduled intents (no longer returned by getActiveIntents)
        const scheduledArray: number[] = Array.from(scheduledIntents);
        for (let i = 0; i < scheduledArray.length; i++) {
          const id = scheduledArray[i]!;
          const stillActive = intents.find(r => r.id === id);
          if (!stillActive) {
            scheduledIntents.delete(id);
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
