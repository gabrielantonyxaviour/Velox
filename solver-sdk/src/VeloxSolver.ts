import { EventEmitter } from 'events';
import { VeloxAptosClient } from './client/AptosClient';
import { VeloxGraphQLClient } from './client/GraphQLClient';
import {
  Intent,
  IntentType,
  IntentStatus,
  TokenInfo,
  RawIntentData,
  DutchAuction,
  SealedBidAuction,
  AuctionType,
  AuctionStatus,
} from './types/intent';
import { Solution, SolutionResult, SwapRoute, SolverStats } from './types/solution';
import { calculatePrice } from './utils/pricing';
import {
  calculateOutputFromPrices,
  applySpread,
  getTokenSymbol,
} from './utils/coingecko';

export interface VeloxSolverConfig {
  rpcUrl: string;
  veloxAddress: string;
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

  async getPendingIntents(): Promise<Intent[]> {
    if (this.graphql) {
      return this.graphql.getPendingIntents();
    }

    // Get total intents count
    const totalResult = await this.client.view<[string]>({
      function: `${this.veloxAddress}::submission::get_total_intents`,
      typeArguments: [],
      functionArguments: [this.veloxAddress],
    });

    const totalIntents = parseInt(totalResult[0] || '0');
    const pendingIntents: Intent[] = [];

    // Iterate through all intents and filter pending ones
    for (let i = 0; i < totalIntents; i++) {
      try {
        const intentResult = await this.client.view<[RawIntentData]>({
          function: `${this.veloxAddress}::submission::get_intent`,
          typeArguments: [],
          functionArguments: [this.veloxAddress, i],
        });

        if (intentResult[0]) {
          const intent = this.parseIntent(intentResult[0]);
          // Only include pending intents (status 0)
          if (intent.status === IntentStatus.PENDING) {
            pendingIntents.push(intent);
          }
        }
      } catch (error) {
        // Intent might not exist or be in unexpected format, skip it
        console.log(`Skipping intent ${i}:`, (error as Error).message);
      }
    }

    return pendingIntents;
  }

  async getIntent(intentId: string): Promise<Intent | null> {
    if (this.graphql) {
      return this.graphql.getIntentById(intentId);
    }

    try {
      const result = await this.client.view<[RawIntentData]>({
        function: `${this.veloxAddress}::submission::get_intent`,
        typeArguments: [],
        functionArguments: [this.veloxAddress, intentId],
      });
      return result[0] ? this.parseIntent(result[0]) : null;
    } catch {
      return null;
    }
  }

  startIntentStream(callback: (intent: Intent) => void): void {
    this.isRunning = true;
    this.pollIntents(callback);
  }

  stopIntentStream(): void {
    this.isRunning = false;
  }

  // ============ Solution Submission ============

  async submitSolution(solution: Solution): Promise<SolutionResult> {
    if (!this.client.hasAccount()) {
      throw new Error('Solver account not configured');
    }

    try {
      const txHash = await this.client.submitTransaction({
        function: `${this.veloxAddress}::settlement::submit_solution`,
        typeArguments: [],
        functionArguments: [
          solution.intentId,
          solution.outputAmount.toString(),
          solution.executionPrice.toString(),
        ],
      });

      return { success: true, txHash };
    } catch (error) {
      return { success: false, error: (error as Error).message };
    }
  }

  async executeSettlement(intentId: string): Promise<SolutionResult> {
    if (!this.client.hasAccount()) {
      throw new Error('Solver account not configured');
    }

    try {
      const txHash = await this.client.submitTransaction({
        function: `${this.veloxAddress}::settlement::execute_settlement`,
        typeArguments: [],
        functionArguments: [intentId],
      });

      return { success: true, txHash };
    } catch (error) {
      return { success: false, error: (error as Error).message };
    }
  }

  /**
   * Solve a swap intent by directly providing output tokens
   * Calls settlement::solve_swap which transfers:
   * - Output tokens from solver to user
   * - Input tokens from escrow to solver
   */
  async solveSwap(intentId: string, outputAmount: bigint): Promise<SolutionResult> {
    if (!this.client.hasAccount()) {
      throw new Error('Solver account not configured');
    }

    console.log(`Calling solve_swap:`);
    console.log(`  Registry: ${this.veloxAddress}`);
    console.log(`  Intent ID: ${intentId}`);
    console.log(`  Output Amount: ${outputAmount}`);

    try {
      const txHash = await this.client.submitTransaction({
        function: `${this.veloxAddress}::settlement::solve_swap`,
        typeArguments: [],
        functionArguments: [this.veloxAddress, intentId, outputAmount.toString()],
      });

      console.log(`solve_swap transaction successful: ${txHash}`);
      return { success: true, txHash };
    } catch (error) {
      console.error(`solve_swap failed:`, error);
      return { success: false, error: (error as Error).message };
    }
  }

  /**
   * Solve a limit order intent (supports partial fills)
   * Calls settlement::solve_limit_order which:
   * - Validates price meets limit_price constraint
   * - Transfers output tokens from solver to user
   * - Transfers fill_amount of input tokens from escrow to solver
   */
  async solveLimitOrder(
    intentId: string,
    fillAmount: bigint,
    outputAmount: bigint
  ): Promise<SolutionResult> {
    if (!this.client.hasAccount()) {
      throw new Error('Solver account not configured');
    }

    console.log(`Calling solve_limit_order:`);
    console.log(`  Registry: ${this.veloxAddress}`);
    console.log(`  Intent ID: ${intentId}`);
    console.log(`  Fill Amount: ${fillAmount}`);
    console.log(`  Output Amount: ${outputAmount}`);

    try {
      const txHash = await this.client.submitTransaction({
        function: `${this.veloxAddress}::settlement::solve_limit_order`,
        typeArguments: [],
        functionArguments: [
          this.veloxAddress,
          intentId,
          fillAmount.toString(),
          outputAmount.toString(),
        ],
      });

      console.log(`solve_limit_order transaction successful: ${txHash}`);
      return { success: true, txHash };
    } catch (error) {
      console.error(`solve_limit_order failed:`, error);
      return { success: false, error: (error as Error).message };
    }
  }

  /**
   * Solve a DCA period by directly providing output tokens
   * Calls settlement::solve_dca_period which transfers:
   * - Output tokens from solver to user
   * - Period's input tokens from escrow to solver
   */
  async solveDCAPeriod(
    intentId: string,
    outputAmount: bigint,
    scheduledRegistryAddr?: string
  ): Promise<SolutionResult> {
    if (!this.client.hasAccount()) {
      throw new Error('Solver account not configured');
    }

    const registryAddr = scheduledRegistryAddr || this.veloxAddress;

    console.log(`Calling solve_dca_period:`);
    console.log(`  Registry: ${this.veloxAddress}`);
    console.log(`  Scheduled Registry: ${registryAddr}`);
    console.log(`  Intent ID: ${intentId}`);
    console.log(`  Output Amount: ${outputAmount}`);

    try {
      const txHash = await this.client.submitTransaction({
        function: `${this.veloxAddress}::settlement::solve_dca_period`,
        typeArguments: [],
        functionArguments: [
          this.veloxAddress,
          registryAddr,
          intentId,
          outputAmount.toString(),
        ],
      });

      console.log(`solve_dca_period transaction successful: ${txHash}`);
      return { success: true, txHash };
    } catch (error) {
      console.error(`solve_dca_period failed:`, error);
      return { success: false, error: (error as Error).message };
    }
  }

  /**
   * Solve a TWAP chunk by directly providing output tokens
   * Calls settlement::solve_twap_chunk which transfers:
   * - Output tokens from solver to user
   * - Chunk's input tokens from escrow to solver
   */
  async solveTWAPChunk(
    intentId: string,
    outputAmount: bigint,
    scheduledRegistryAddr?: string
  ): Promise<SolutionResult> {
    if (!this.client.hasAccount()) {
      throw new Error('Solver account not configured');
    }

    const registryAddr = scheduledRegistryAddr || this.veloxAddress;

    console.log(`Calling solve_twap_chunk:`);
    console.log(`  Registry: ${this.veloxAddress}`);
    console.log(`  Scheduled Registry: ${registryAddr}`);
    console.log(`  Intent ID: ${intentId}`);
    console.log(`  Output Amount: ${outputAmount}`);

    try {
      const txHash = await this.client.submitTransaction({
        function: `${this.veloxAddress}::settlement::solve_twap_chunk`,
        typeArguments: [],
        functionArguments: [
          this.veloxAddress,
          registryAddr,
          intentId,
          outputAmount.toString(),
        ],
      });

      console.log(`solve_twap_chunk transaction successful: ${txHash}`);
      return { success: true, txHash };
    } catch (error) {
      console.error(`solve_twap_chunk failed:`, error);
      return { success: false, error: (error as Error).message };
    }
  }

  /**
   * Check if a TWAP chunk is ready for execution
   */
  async isTWAPChunkReady(intentId: string, scheduledRegistryAddr?: string): Promise<boolean> {
    const registryAddr = scheduledRegistryAddr || this.veloxAddress;
    try {
      const result = await this.client.view<[boolean]>({
        function: `${this.veloxAddress}::scheduled::is_ready_for_execution`,
        typeArguments: [],
        functionArguments: [registryAddr, intentId],
      });
      return result[0] ?? false;
    } catch (error) {
      console.error(`Error checking TWAP chunk readiness:`, error);
      return false;
    }
  }

  /**
   * Check if a DCA period is ready for execution
   */
  async isDCAPeriodReady(intentId: string, scheduledRegistryAddr?: string): Promise<boolean> {
    const registryAddr = scheduledRegistryAddr || this.veloxAddress;
    try {
      const result = await this.client.view<[boolean]>({
        function: `${this.veloxAddress}::scheduled::is_ready_for_execution`,
        typeArguments: [],
        functionArguments: [registryAddr, intentId],
      });
      return result[0] ?? false;
    } catch (error) {
      console.error(`Error checking DCA period readiness:`, error);
      return false;
    }
  }

  /**
   * Check if a DCA/TWAP is completed
   */
  async isScheduledCompleted(intentId: string, scheduledRegistryAddr?: string): Promise<boolean> {
    const registryAddr = scheduledRegistryAddr || this.veloxAddress;
    try {
      const result = await this.client.view<[boolean]>({
        function: `${this.veloxAddress}::scheduled::is_completed`,
        typeArguments: [],
        functionArguments: [registryAddr, intentId],
      });
      return result[0] ?? false;
    } catch (error) {
      console.error(`Error checking completion status:`, error);
      return false;
    }
  }

  /**
   * Get the number of periods/chunks executed for a scheduled intent
   */
  async getExecutedPeriods(intentId: string, scheduledRegistryAddr?: string): Promise<number> {
    const registryAddr = scheduledRegistryAddr || this.veloxAddress;
    try {
      const result = await this.client.view<[string]>({
        function: `${this.veloxAddress}::scheduled::get_chunks_executed`,
        typeArguments: [],
        functionArguments: [registryAddr, intentId],
      });
      return parseInt(result[0] || '0');
    } catch (error) {
      console.error(`Error getting executed periods:`, error);
      return 0;
    }
  }

  /**
   * Check if a limit order can be filled at current market price
   * Returns the execution price if fillable, null otherwise
   */
  async canFillLimitOrder(intent: Intent): Promise<{ canFill: boolean; executionPrice: bigint; outputAmount: bigint }> {
    if (!intent.limitPrice) {
      return { canFill: false, executionPrice: BigInt(0), outputAmount: BigInt(0) };
    }

    // Get market price and calculate output
    const route = await this.findBestRoute(
      intent.inputToken.address,
      intent.outputToken.address,
      intent.inputAmount
    );

    const outputAmount = route.expectedOutput;
    // execution_price = (output_amount * 10000) / input_amount
    const executionPrice = (outputAmount * BigInt(10000)) / intent.inputAmount;

    // Order fills only if execution_price >= limit_price
    const canFill = executionPrice >= intent.limitPrice;

    console.log(`Limit order check:`);
    console.log(`  Limit price: ${intent.limitPrice}`);
    console.log(`  Execution price: ${executionPrice}`);
    console.log(`  Can fill: ${canFill}`);

    return { canFill, executionPrice, outputAmount };
  }

  // ============ Pricing & Routing ============

  async calculateOptimalSolution(intent: Intent): Promise<Solution> {
    const route = await this.findBestRoute(
      intent.inputToken.address,
      intent.outputToken.address,
      intent.inputAmount
    );

    const outputAmount = route.expectedOutput;
    const executionPrice = calculatePrice(
      intent.inputAmount,
      outputAmount,
      intent.inputToken.decimals,
      intent.outputToken.decimals
    );

    return {
      intentId: intent.id,
      outputAmount,
      executionPrice,
      route,
      expiresAt: new Date(Date.now() + 60000),
    };
  }

  async findBestRoute(
    tokenIn: string,
    tokenOut: string,
    amountIn: bigint
  ): Promise<SwapRoute> {
    // Use CoinGecko pricing to calculate output (no pools needed)
    const { outputAmount, exchangeRate } = await calculateOutputFromPrices(
      tokenIn,
      tokenOut,
      amountIn,
      8, // input decimals
      8 // output decimals
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
          poolAddress: 'direct', // Direct solver fill, no pool
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

  // ============ Dutch Auction Queries ============

  async getDutchAuction(intentId: string): Promise<DutchAuction | null> {
    try {
      type DutchAuctionResponse = {
        intent_id: string;
        start_time: string;
        start_price: string;
        end_price: string;
        duration: string;
        is_active: boolean;
        winner: { vec: string[] };
        accepted_price: string;
      };

      const result = await this.client.view<[DutchAuctionResponse]>({
        function: `${this.veloxAddress}::auction::get_dutch_auction`,
        typeArguments: [],
        functionArguments: [this.veloxAddress, intentId],
      });

      // View returns a single object with named properties
      const data = result[0];

      const winnerVec = data.winner.vec;
      const winnerAddress: string | null = winnerVec.length > 0 && winnerVec[0] ? winnerVec[0] : null;

      return {
        intentId: BigInt(data.intent_id),
        startTime: BigInt(data.start_time),
        startPrice: BigInt(data.start_price),
        endPrice: BigInt(data.end_price),
        duration: BigInt(data.duration),
        isActive: data.is_active,
        winner: winnerAddress,
        acceptedPrice: BigInt(data.accepted_price),
      };
    } catch (error) {
      console.error(`Error getting Dutch auction:`, error);
      return null;
    }
  }

  async getDutchPrice(intentId: string): Promise<bigint> {
    const result = await this.client.view<[string]>({
      function: `${this.veloxAddress}::auction::get_dutch_price`,
      typeArguments: [],
      functionArguments: [this.veloxAddress, intentId],
    });

    return BigInt(result[0]);
  }

  async isDutchActive(intentId: string): Promise<boolean> {
    const result = await this.client.view<[boolean]>({
      function: `${this.veloxAddress}::auction::is_dutch_active`,
      typeArguments: [],
      functionArguments: [this.veloxAddress, intentId],
    });

    return result[0];
  }

  async getActiveDutchCount(): Promise<bigint> {
    const result = await this.client.view<[string]>({
      function: `${this.veloxAddress}::auction::get_active_dutch_count`,
      typeArguments: [],
      functionArguments: [this.veloxAddress],
    });

    return BigInt(result[0]);
  }

  // ============ Dutch Auction Transactions ============

  async acceptDutchAuction(intentId: string): Promise<SolutionResult> {
    if (!this.client.hasAccount()) {
      throw new Error('Solver account not configured');
    }

    console.log(`Calling accept_dutch_auction:`);
    console.log(`  Registry: ${this.veloxAddress}`);
    console.log(`  Intent ID: ${intentId}`);

    try {
      const txHash = await this.client.submitTransaction({
        function: `${this.veloxAddress}::auction::accept_dutch_auction`,
        typeArguments: [],
        functionArguments: [this.veloxAddress, this.veloxAddress, intentId],
      });

      console.log(`accept_dutch_auction transaction successful: ${txHash}`);
      return { success: true, txHash };
    } catch (error) {
      console.error(`accept_dutch_auction failed:`, error);
      return { success: false, error: (error as Error).message };
    }
  }

  async settleDutchAuction(intentId: string): Promise<SolutionResult> {
    if (!this.client.hasAccount()) {
      throw new Error('Solver account not configured');
    }

    console.log(`Calling settle_dutch_auction:`);
    console.log(`  Registry: ${this.veloxAddress}`);
    console.log(`  Intent ID: ${intentId}`);

    try {
      const txHash = await this.client.submitTransaction({
        function: `${this.veloxAddress}::settlement::settle_dutch_auction`,
        typeArguments: [],
        functionArguments: [this.veloxAddress, this.veloxAddress, intentId],
      });

      console.log(`settle_dutch_auction transaction successful: ${txHash}`);
      return { success: true, txHash };
    } catch (error) {
      console.error(`settle_dutch_auction failed:`, error);
      return { success: false, error: (error as Error).message };
    }
  }

  // ============ Dutch Auction Utilities ============

  /**
   * Integer square root using Newton's method
   */
  private bigIntSqrt(n: bigint): bigint {
    if (n < 0n) throw new Error('Square root of negative number');
    if (n === 0n) return 0n;
    if (n === 1n) return 1n;

    let x = n;
    let y = (x + 1n) / 2n;
    while (y < x) {
      x = y;
      y = (x + n / x) / 2n;
    }
    return x;
  }

  /**
   * Calculate Dutch auction price at a given elapsed time using quadratic decay
   * Formula: price = startPrice - priceRange * (elapsed/duration)^2
   * This creates a curve that starts slow and accelerates downward
   */
  calculateDutchPrice(dutch: DutchAuction, elapsedSeconds: bigint): bigint {
    if (elapsedSeconds >= dutch.duration) {
      return dutch.endPrice;
    }
    if (elapsedSeconds <= 0n) {
      return dutch.startPrice;
    }

    const priceRange = dutch.startPrice - dutch.endPrice;
    const elapsedSquared = elapsedSeconds * elapsedSeconds;
    const durationSquared = dutch.duration * dutch.duration;
    const decay = (priceRange * elapsedSquared) / durationSquared;

    return dutch.startPrice - decay;
  }

  /**
   * Get current Dutch auction price calculated locally (not from contract)
   * Useful for strategy planning without RPC calls
   */
  getCurrentDutchPriceLocal(dutch: DutchAuction): bigint {
    const now = BigInt(Math.floor(Date.now() / 1000));
    const elapsed = now - dutch.startTime;
    return this.calculateDutchPrice(dutch, elapsed);
  }

  /**
   * Calculate time until Dutch price reaches target price (quadratic curve)
   * Inverse of: price = startPrice - priceRange * (t/duration)^2
   * Solving for t: t = duration * sqrt((startPrice - price) / priceRange)
   */
  calculateTimeToPrice(dutch: DutchAuction, targetPrice: bigint): bigint {
    if (targetPrice >= dutch.startPrice) return 0n;
    if (targetPrice <= dutch.endPrice) return dutch.duration;

    const priceRange = dutch.startPrice - dutch.endPrice;
    const priceDropNeeded = dutch.startPrice - targetPrice;

    // t = duration * sqrt(priceDropNeeded / priceRange)
    // Using integer approximation: t = duration * sqrt(priceDropNeeded) / sqrt(priceRange)
    // Scale by 1_000_000 for precision before taking square root
    const sqrtDrop = this.bigIntSqrt(priceDropNeeded * 1_000_000n);
    const sqrtRange = this.bigIntSqrt(priceRange * 1_000_000n);

    if (sqrtRange === 0n) return dutch.duration;

    return (dutch.duration * sqrtDrop) / sqrtRange;
  }

  /**
   * Monitor Dutch auction and accept when price reaches threshold
   */
  async monitorAndAcceptDutch(
    intentId: string,
    maxPrice: bigint,
    pollIntervalMs: number = 1000
  ): Promise<{ txHash: string; price: bigint } | null> {
    while (true) {
      const isActive = await this.isDutchActive(intentId);
      if (!isActive) {
        console.log('Dutch auction no longer active');
        return null;
      }

      const currentPrice = await this.getDutchPrice(intentId);
      console.log(`Current Dutch price: ${currentPrice}`);

      if (currentPrice <= maxPrice) {
        console.log(`Price acceptable. Accepting at ${currentPrice}`);
        try {
          const result = await this.acceptDutchAuction(intentId);
          if (result.success && result.txHash) {
            return { txHash: result.txHash, price: currentPrice };
          }
          console.error('Failed to accept:', result.error);
          return null;
        } catch (error) {
          console.error('Failed to accept (someone else may have won):', error);
          return null;
        }
      }

      await new Promise(resolve => setTimeout(resolve, pollIntervalMs));
    }
  }

  // ============ Sealed Bid Auction Queries ============

  /**
   * Check if a sealed bid auction is active for an intent
   */
  async isSealedBidAuctionActive(intentId: string): Promise<boolean> {
    try {
      const result = await this.client.view<[boolean]>({
        function: `${this.veloxAddress}::auction::is_auction_active`,
        typeArguments: [],
        functionArguments: [this.veloxAddress, intentId],
      });
      return result[0] ?? false;
    } catch (error) {
      // Auction may not exist
      return false;
    }
  }

  /**
   * Get sealed bid auction details
   */
  async getSealedBidAuction(intentId: string): Promise<SealedBidAuction | null> {
    try {
      type AuctionResponse = {
        intent_id: string;
        start_time: string;
        end_time: string;
        solutions: unknown[];
        winner: { vec: string[] };
        status: { __variant__: string } | string;
      };

      const result = await this.client.view<[AuctionResponse]>({
        function: `${this.veloxAddress}::auction::get_auction`,
        typeArguments: [],
        functionArguments: [this.veloxAddress, intentId],
      });

      const data = result[0];
      const winnerVec = data.winner.vec;
      const winnerAddress: string | null = winnerVec.length > 0 && winnerVec[0] ? winnerVec[0] : null;

      // Parse status from __variant__ pattern or string
      let status: AuctionStatus = AuctionStatus.ACTIVE;
      if (typeof data.status === 'object' && '__variant__' in data.status) {
        const variant = data.status.__variant__;
        if (variant === 'Active') status = AuctionStatus.ACTIVE;
        else if (variant === 'Selecting') status = AuctionStatus.SELECTING;
        else if (variant === 'Completed') status = AuctionStatus.COMPLETED;
        else if (variant === 'Cancelled') status = AuctionStatus.CANCELLED;
      }

      return {
        intentId: BigInt(data.intent_id),
        startTime: BigInt(data.start_time),
        endTime: BigInt(data.end_time),
        solutionCount: Array.isArray(data.solutions) ? data.solutions.length : 0,
        winner: winnerAddress,
        status,
      };
    } catch (error) {
      console.error(`Error getting sealed bid auction:`, error);
      return null;
    }
  }

  /**
   * Get time remaining for a sealed bid auction
   */
  async getAuctionTimeRemaining(intentId: string): Promise<number> {
    try {
      const result = await this.client.view<[string]>({
        function: `${this.veloxAddress}::auction::get_time_remaining`,
        typeArguments: [],
        functionArguments: [this.veloxAddress, intentId],
      });
      return parseInt(result[0] || '0');
    } catch (error) {
      console.error(`Error getting auction time remaining:`, error);
      return 0;
    }
  }

  /**
   * Get winner of a sealed bid auction
   */
  async getAuctionWinner(intentId: string): Promise<string | null> {
    try {
      type WinnerResponse = { vec: string[] };
      const result = await this.client.view<[WinnerResponse]>({
        function: `${this.veloxAddress}::auction::get_winner`,
        typeArguments: [],
        functionArguments: [this.veloxAddress, intentId],
      });

      const winnerVec = result[0]?.vec;
      return winnerVec && winnerVec.length > 0 && winnerVec[0] ? winnerVec[0] : null;
    } catch (error) {
      console.error(`Error getting auction winner:`, error);
      return null;
    }
  }

  /**
   * Check if solver is the winner of a sealed bid auction
   */
  async isAuctionWinner(intentId: string): Promise<boolean> {
    const winner = await this.getAuctionWinner(intentId);
    if (!winner) return false;
    const solverAddress = this.client.getAccountAddress();
    return winner.toLowerCase() === solverAddress?.toLowerCase();
  }

  // ============ Sealed Bid Auction Transactions ============

  /**
   * Submit a bid to a sealed bid auction
   * Calls auction::submit_solution
   */
  async submitBid(
    intentId: string,
    outputAmount: bigint,
    executionPrice: bigint
  ): Promise<SolutionResult> {
    if (!this.client.hasAccount()) {
      throw new Error('Solver account not configured');
    }

    console.log(`Calling submit_solution (bid):`);
    console.log(`  Auction State: ${this.veloxAddress}`);
    console.log(`  Solver Registry: ${this.veloxAddress}`);
    console.log(`  Intent ID: ${intentId}`);
    console.log(`  Output Amount: ${outputAmount}`);
    console.log(`  Execution Price: ${executionPrice}`);

    try {
      const txHash = await this.client.submitTransaction({
        function: `${this.veloxAddress}::auction::submit_solution`,
        typeArguments: [],
        functionArguments: [
          this.veloxAddress, // auction_state_addr
          this.veloxAddress, // solver_registry_addr
          intentId,
          outputAmount.toString(),
          executionPrice.toString(),
        ],
      });

      console.log(`submit_solution (bid) transaction successful: ${txHash}`);
      return { success: true, txHash };
    } catch (error) {
      console.error(`submit_solution (bid) failed:`, error);
      return { success: false, error: (error as Error).message };
    }
  }

  /**
   * Close a sealed bid auction after duration ends
   * Calls auction::close_auction
   */
  async closeAuction(intentId: string): Promise<SolutionResult> {
    console.log(`Calling close_auction:`);
    console.log(`  Auction State: ${this.veloxAddress}`);
    console.log(`  Intent ID: ${intentId}`);

    try {
      const txHash = await this.client.submitTransaction({
        function: `${this.veloxAddress}::auction::close_auction`,
        typeArguments: [],
        functionArguments: [
          this.veloxAddress, // auction_state_addr
          this.veloxAddress, // solver_registry_addr
          intentId,
        ],
      });

      console.log(`close_auction transaction successful: ${txHash}`);
      return { success: true, txHash };
    } catch (error) {
      console.error(`close_auction failed:`, error);
      return { success: false, error: (error as Error).message };
    }
  }

  /**
   * Settle an intent from a completed sealed bid auction
   * Only the winner can settle
   * Calls settlement::settle_from_auction
   */
  async settleFromAuction(intentId: string): Promise<SolutionResult> {
    if (!this.client.hasAccount()) {
      throw new Error('Solver account not configured');
    }

    console.log(`Calling settle_from_auction:`);
    console.log(`  Registry: ${this.veloxAddress}`);
    console.log(`  Auction State: ${this.veloxAddress}`);
    console.log(`  Intent ID: ${intentId}`);

    try {
      const txHash = await this.client.submitTransaction({
        function: `${this.veloxAddress}::settlement::settle_from_auction`,
        typeArguments: [],
        functionArguments: [
          this.veloxAddress, // registry_addr
          this.veloxAddress, // auction_state_addr
          intentId,
        ],
      });

      console.log(`settle_from_auction transaction successful: ${txHash}`);
      return { success: true, txHash };
    } catch (error) {
      console.error(`settle_from_auction failed:`, error);
      return { success: false, error: (error as Error).message };
    }
  }

  /**
   * Monitor sealed bid auction and settle when won
   * Returns null if auction not won
   */
  async monitorAndSettleAuction(
    intentId: string,
    pollIntervalMs: number = 2000
  ): Promise<{ txHash: string } | null> {
    while (true) {
      const auction = await this.getSealedBidAuction(intentId);
      if (!auction) {
        console.log('Auction not found');
        return null;
      }

      console.log(`Auction status: ${auction.status}, solutions: ${auction.solutionCount}`);

      // Check if auction is completed
      if (auction.status === AuctionStatus.COMPLETED) {
        // Check if we won
        const isWinner = await this.isAuctionWinner(intentId);
        if (isWinner) {
          console.log('We won the auction! Settling...');
          const result = await this.settleFromAuction(intentId);
          if (result.success && result.txHash) {
            return { txHash: result.txHash };
          }
          console.error('Failed to settle:', result.error);
          return null;
        } else {
          console.log('Auction completed but we did not win');
          return null;
        }
      }

      // Check if auction was cancelled
      if (auction.status === AuctionStatus.CANCELLED) {
        console.log('Auction was cancelled');
        return null;
      }

      // Check if we should try to close the auction
      const timeRemaining = await this.getAuctionTimeRemaining(intentId);
      if (timeRemaining === 0 && (auction.status === AuctionStatus.ACTIVE || auction.status === AuctionStatus.SELECTING)) {
        console.log('Auction time expired, attempting to close...');
        const closeResult = await this.closeAuction(intentId);
        if (!closeResult.success) {
          console.log('Failed to close auction:', closeResult.error);
        }
      }

      await new Promise(resolve => setTimeout(resolve, pollIntervalMs));
    }
  }

  // ============ Solver Stats ============

  async getSolverStats(address?: string): Promise<SolverStats> {
    const solverAddress = address || this.client.getAccountAddress();
    if (!solverAddress) {
      throw new Error('No solver address provided');
    }

    const result = await this.client.view<unknown[]>({
      function: `${this.veloxAddress}::solver_registry::get_solver_info`,
      typeArguments: [],
      functionArguments: [solverAddress],
    });

    return this.parseSolverStats(result);
  }

  // ============ Private Methods ============

  private async pollIntents(callback: (intent: Intent) => void): Promise<void> {
    const lastSeen = new Set<string>();

    // If skipExistingOnStartup is enabled, pre-populate lastSeen with existing intents
    if (this.skipExistingOnStartup) {
      try {
        const existingIntents = await this.getPendingIntents();
        console.log(`Skipping ${existingIntents.length} existing pending intents...`);
        for (const intent of existingIntents) {
          lastSeen.add(intent.id);
        }
      } catch (error) {
        this.emit('error', error);
      }
    }

    while (this.isRunning) {
      try {
        const intents = await this.getPendingIntents();

        for (const intent of intents) {
          if (!lastSeen.has(intent.id)) {
            callback(intent);
            lastSeen.add(intent.id);
          }
        }
      } catch (error) {
        this.emit('error', error);
      }

      await new Promise((resolve) => setTimeout(resolve, this.pollingInterval));
    }
  }

  private parseIntents(raw: unknown[]): Intent[] {
    return raw.map((r) => this.parseIntent(r as RawIntentData));
  }

  private parseIntent(raw: unknown): Intent {
    const record = raw as Record<string, unknown>;

    const typeMap: Record<number, IntentType> = {
      0: IntentType.SWAP,
      1: IntentType.LIMIT_ORDER,
      2: IntentType.TWAP,
      3: IntentType.DCA,
    };

    const statusMap: Record<number, IntentStatus> = {
      0: IntentStatus.PENDING,
      1: IntentStatus.PARTIALLY_FILLED,
      2: IntentStatus.FILLED,
      3: IntentStatus.CANCELLED,
      4: IntentStatus.EXPIRED,
    };

    // Map for Move 2.0 enum __variant__ pattern
    const statusVariantMap: Record<string, IntentStatus> = {
      'Pending': IntentStatus.PENDING,
      'PartiallyFilled': IntentStatus.PARTIALLY_FILLED,
      'Filled': IntentStatus.FILLED,
      'Cancelled': IntentStatus.CANCELLED,
      'Expired': IntentStatus.EXPIRED,
    };

    // Helper to parse status from either number or __variant__ object
    const parseStatus = (status: unknown): IntentStatus => {
      if (typeof status === 'number') {
        return statusMap[status] ?? IntentStatus.PENDING;
      }
      if (status && typeof status === 'object' && '__variant__' in status) {
        const variant = (status as Record<string, unknown>).__variant__;
        if (typeof variant === 'string') {
          const mapped = statusVariantMap[variant];
          if (mapped !== undefined) {
            return mapped;
          }
        }
      }
      return IntentStatus.PENDING;
    };

    // Safe string extraction helper
    const safeGetString = (obj: Record<string, unknown> | undefined, key: string): string => {
      if (!obj) return '0';
      const value = obj[key];
      if (value === undefined || value === null) return '0';
      return String(value);
    };

    // Extract intent data - it may be wrapped in an enum variant like { Swap: { ... } }
    // or use __variant__ pattern like { __variant__: "LimitOrder", field1: ..., field2: ... }
    let intent = record.intent as Record<string, unknown> | undefined;
    let detectedType: IntentType | null = null;

    if (intent && typeof intent === 'object') {
      // Check for __variant__ pattern (Move 2.0 enum serialization)
      if ('__variant__' in intent) {
        const variant = intent.__variant__ as string;
        if (variant === 'Swap') detectedType = IntentType.SWAP;
        else if (variant === 'LimitOrder') detectedType = IntentType.LIMIT_ORDER;
        else if (variant === 'TWAP') detectedType = IntentType.TWAP;
        else if (variant === 'DCA') detectedType = IntentType.DCA;
        // intent fields are at the same level, no unwrapping needed
      } else {
        const keys = Object.keys(intent);
        const firstKey = keys[0];
        // Check for legacy pattern (e.g., { Swap: { ... } }, { LimitOrder: { ... } })
        if (keys.length === 1 && firstKey && typeof intent[firstKey] === 'object') {
          // Detect type from enum variant name
          if (firstKey === 'Swap') detectedType = IntentType.SWAP;
          else if (firstKey === 'LimitOrder') detectedType = IntentType.LIMIT_ORDER;
          else if (firstKey === 'TWAP') detectedType = IntentType.TWAP;
          else if (firstKey === 'DCA') detectedType = IntentType.DCA;

          intent = intent[firstKey] as Record<string, unknown>;
        }
      }
    }

    // Extract fields with fallbacks for different naming conventions
    const inputToken = safeGetString(intent, 'input_token') || safeGetString(intent, 'input_coin') || '';
    const outputToken = safeGetString(intent, 'output_token') || safeGetString(intent, 'output_coin') || '';
    const minAmountOut = safeGetString(intent, 'min_amount_out') || '0';
    const limitPrice = safeGetString(intent, 'limit_price');

    // DCA-specific fields
    const amountPerPeriod = safeGetString(intent, 'amount_per_period');
    const totalPeriods = safeGetString(intent, 'total_periods');
    const intervalSeconds = safeGetString(intent, 'interval_seconds');
    const nextExecution = safeGetString(intent, 'next_execution');

    // TWAP-specific fields
    const totalAmount = safeGetString(intent, 'total_amount');
    const numChunks = safeGetString(intent, 'num_chunks');
    const maxSlippageBps = safeGetString(intent, 'max_slippage_bps');
    const startTime = safeGetString(intent, 'start_time');

    // Calculate amount_in based on intent type
    let amountIn: string;
    if (detectedType === IntentType.DCA) {
      // For DCA, inputAmount is amount_per_period (what solver needs to handle per execution)
      amountIn = amountPerPeriod !== '0' ? amountPerPeriod : '0';
    } else if (detectedType === IntentType.TWAP) {
      // For TWAP, inputAmount is chunk amount (total_amount / num_chunks)
      const total = BigInt(totalAmount || '0');
      const chunks = BigInt(numChunks || '1');
      amountIn = chunks > 0 ? (total / chunks).toString() : '0';
    } else {
      amountIn = safeGetString(intent, 'amount_in') || safeGetString(intent, 'amount') || '0';
    }

    // Deadline/expiry extraction based on intent type
    let deadline: string;
    if (detectedType === IntentType.DCA) {
      // DCA deadline = next_execution + (total_periods * interval_seconds)
      const nextExec = BigInt(nextExecution || '0');
      const periods = BigInt(totalPeriods || '0');
      const interval = BigInt(intervalSeconds || '0');
      deadline = (nextExec + periods * interval).toString();
    } else if (detectedType === IntentType.TWAP) {
      // TWAP deadline = start_time + (num_chunks * interval_seconds)
      const start = BigInt(startTime || '0');
      const chunks = BigInt(numChunks || '0');
      const interval = BigInt(intervalSeconds || '0');
      deadline = (start + chunks * interval).toString();
    } else {
      const rawDeadline = safeGetString(intent, 'deadline');
      const rawExpiry = safeGetString(intent, 'expiry');
      deadline = rawDeadline !== '0' ? rawDeadline : rawExpiry !== '0' ? rawExpiry : '0';
    }

    // Determine intent type based on enum variant name or fields present
    let intentType = detectedType;
    if (!intentType) {
      // Fall back to field-based detection
      if (intent && 'limit_price' in intent) {
        intentType = IntentType.LIMIT_ORDER;
      } else if (intent && 'num_chunks' in intent) {
        intentType = IntentType.TWAP;
      } else if (intent && 'amount_per_period' in intent) {
        intentType = IntentType.DCA;
      } else {
        intentType = IntentType.SWAP;
      }
    }

    return {
      id: safeGetString(record, 'id'),
      type: intentType,
      user: safeGetString(record, 'user'),
      inputToken: { address: inputToken, symbol: '', decimals: 8 },
      outputToken: { address: outputToken, symbol: '', decimals: 8 },
      inputAmount: BigInt(amountIn),
      minOutputAmount: minAmountOut !== '0' ? BigInt(minAmountOut) : undefined,
      deadline: new Date(parseInt(deadline) * 1000),
      status: parseStatus(record.status),
      createdAt: new Date(parseInt(safeGetString(record, 'created_at')) * 1000),
      limitPrice: intent?.limit_price ? BigInt(safeGetString(intent, 'limit_price')) : undefined,
      partialFillAllowed: Boolean(intent?.partial_fill_allowed ?? intent?.partial_fill),
      // TWAP fields
      numChunks: numChunks !== '0' ? parseInt(numChunks) : undefined,
      interval: intervalSeconds !== '0' ? parseInt(intervalSeconds) : undefined,
      totalAmount: totalAmount !== '0' ? BigInt(totalAmount) : undefined,
      maxSlippageBps: maxSlippageBps !== '0' ? parseInt(maxSlippageBps) : undefined,
      startTime: startTime !== '0' ? new Date(parseInt(startTime) * 1000) : undefined,
      // DCA fields
      amountPerPeriod: amountPerPeriod !== '0' ? BigInt(amountPerPeriod) : undefined,
      totalPeriods: totalPeriods !== '0' ? parseInt(totalPeriods) : undefined,
      executedPeriods: record.filled_amount ? Math.floor(Number(record.filled_amount) / Number(amountPerPeriod || 1)) : 0,
      nextExecution: nextExecution !== '0' ? new Date(parseInt(nextExecution) * 1000) : undefined,
    };
  }

  private parseSolverStats(raw: unknown[]): SolverStats {
    const data = raw[0] as Record<string, unknown>;
    return {
      address: String(data.address || ''),
      totalSolutions: Number(data.total_solutions || 0),
      successfulSolutions: Number(data.successful_solutions || 0),
      totalVolume: BigInt(String(data.total_volume || '0')),
      reputation: Number(data.reputation || 0),
      isActive: Boolean(data.is_active),
    };
  }
}
