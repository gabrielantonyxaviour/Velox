import { VeloxSolver } from '../VeloxSolver';
import { SolverConfig } from '../config/SolverConfig';
import { Intent, IntentType, IntentStatus } from '../types/intent';
import { Account, Ed25519PrivateKey } from '@aptos-labs/ts-sdk';

interface SolverRegistrationInfo {
  isRegistered: boolean;
  isActive: boolean;
  stake: bigint;
  reputation: number;
  totalIntentsSolved: number;
  successfulFills: number;
  failedFills: number;
  totalVolume: bigint;
  registeredAt: Date;
  lastActive: Date;
}

export class SolverRunner {
  private config: SolverConfig;
  private solver: VeloxSolver;
  private solverAddress: string;
  private isRunning = false;
  private processedCount = 0;
  private errorCount = 0;

  constructor(config: SolverConfig) {
    this.config = config;

    // Derive address from private key
    const privateKey = new Ed25519PrivateKey(config.privateKey);
    const account = Account.fromPrivateKey({ privateKey });
    this.solverAddress = account.accountAddress.toString();

    this.solver = new VeloxSolver({
      rpcUrl: config.rpcUrl,
      veloxAddress: config.veloxAddress,
      privateKey: config.privateKey,
      graphqlUrl: config.graphqlUrl,
      pollingInterval: config.pollingInterval,
      skipExistingOnStartup: config.skipExistingOnStartup,
      shinamiNodeKey: config.shinamiNodeKey,
    });
  }

  async start(checkRegistration = true): Promise<void> {
    this.printBanner();

    // Show configuration
    console.log(this.config.toSummary());
    console.log(`\n📍 Solver Address: ${this.solverAddress}`);

    if (checkRegistration) {
      console.log('\n🔍 Checking solver registration...');
      const registration = await this.checkRegistration();

      if (!registration.isRegistered) {
        console.error('\n❌ Solver is NOT registered!');
        console.log('\n📝 To register your solver:');
        console.log('   1. Go to the Velox UI at https://velox.movementlabs.xyz');
        console.log('   2. Connect your wallet');
        console.log('   3. Navigate to "Become a Solver"');
        console.log('   4. Stake the minimum required amount');
        console.log('\n   Or use the --skip-registration-check flag to bypass');
        process.exit(1);
      }

      if (!registration.isActive) {
        console.error('\n⚠️  Solver is registered but NOT ACTIVE!');
        console.log('   Your reputation may be too low or you may be deactivated.');
        console.log('   Current reputation:', registration.reputation);
        console.log('   Minimum required: 2000 (20%)');
        process.exit(1);
      }

      this.printRegistrationInfo(registration);
    }

    if (this.config.dryRun) {
      console.log('\n⚠️  DRY RUN MODE - No transactions will be submitted\n');
    }

    console.log('\n🚀 Starting solver...\n');
    this.isRunning = true;

    // Set up error handling
    this.solver.on('error', (error) => {
      this.errorCount++;
      this.log('error', `Solver error: ${error.message}`);
    });

    // Start listening for intents
    this.solver.startIntentStream(async (intent: Intent) => {
      await this.handleIntent(intent);
    });

    // Graceful shutdown
    process.on('SIGINT', () => this.shutdown());
    process.on('SIGTERM', () => this.shutdown());

    // Keep alive
    console.log('👂 Listening for intents... (Press Ctrl+C to stop)\n');
  }

  async showStatus(): Promise<void> {
    this.printBanner();
    console.log(`\n📍 Solver Address: ${this.solverAddress}\n`);

    try {
      const registration = await this.checkRegistration();

      if (!registration.isRegistered) {
        console.log('❌ Status: NOT REGISTERED\n');
        console.log('Register your solver on the Velox UI to get started.');
        return;
      }

      this.printRegistrationInfo(registration);

      // Show pending intents count
      console.log('\n📊 Current Market:');
      const pendingIntents = await this.solver.getPendingIntents();
      console.log(`   Pending Intents: ${pendingIntents.length}`);

      const byType = {
        swap: pendingIntents.filter((i) => i.type === IntentType.SWAP).length,
        limit: pendingIntents.filter((i) => i.type === IntentType.LIMIT_ORDER).length,
        twap: pendingIntents.filter((i) => i.type === IntentType.TWAP).length,
        dca: pendingIntents.filter((i) => i.type === IntentType.DCA).length,
      };

      console.log(`   By Type: ${byType.swap} Swap | ${byType.limit} Limit | ${byType.twap} TWAP | ${byType.dca} DCA`);
    } catch (error) {
      console.error('Failed to get status:', (error as Error).message);
    }
  }

  private async checkRegistration(): Promise<SolverRegistrationInfo> {
    try {
      const result = await this.solver['client'].view<[{
        solver: string;
        stake: string;
        is_active: boolean;
        registered_at: string;
        reputation_score: string;
        total_intents_solved: string;
        successful_fills: string;
        failed_fills: string;
        total_volume: string;
        last_active: string;
      }]>({
        function: `${this.config.veloxAddress}::solver_registry::get_solver_info`,
        typeArguments: [],
        functionArguments: [this.config.veloxAddress, this.solverAddress],
      });

      const info = result[0];
      return {
        isRegistered: true,
        isActive: info.is_active,
        stake: BigInt(info.stake),
        reputation: parseInt(info.reputation_score),
        totalIntentsSolved: parseInt(info.total_intents_solved),
        successfulFills: parseInt(info.successful_fills),
        failedFills: parseInt(info.failed_fills),
        totalVolume: BigInt(info.total_volume),
        registeredAt: new Date(parseInt(info.registered_at) * 1000),
        lastActive: new Date(parseInt(info.last_active) * 1000),
      };
    } catch {
      return {
        isRegistered: false,
        isActive: false,
        stake: BigInt(0),
        reputation: 0,
        totalIntentsSolved: 0,
        successfulFills: 0,
        failedFills: 0,
        totalVolume: BigInt(0),
        registeredAt: new Date(0),
        lastActive: new Date(0),
      };
    }
  }

  private printRegistrationInfo(info: SolverRegistrationInfo): void {
    const reputationPercent = (info.reputation / 100).toFixed(1);
    const successRate = info.totalIntentsSolved > 0
      ? ((info.successfulFills / info.totalIntentsSolved) * 100).toFixed(1)
      : '0.0';

    console.log('\n┌─ Solver Registration ───────────────────────────┐');
    console.log(`│ Status: ${info.isActive ? '✅ ACTIVE' : '❌ INACTIVE'}`);
    console.log(`│ Stake: ${this.formatAmount(info.stake)} MOVE`);
    console.log(`│ Reputation: ${info.reputation}/10000 (${reputationPercent}%)`);
    console.log(`│ Registered: ${info.registeredAt.toLocaleDateString()}`);
    console.log('├─ Performance ────────────────────────────────────┤');
    console.log(`│ Total Solved: ${info.totalIntentsSolved}`);
    console.log(`│ Success Rate: ${successRate}% (${info.successfulFills}/${info.totalIntentsSolved})`);
    console.log(`│ Total Volume: ${this.formatAmount(info.totalVolume)}`);
    console.log(`│ Last Active: ${info.lastActive.toLocaleString()}`);
    console.log('└──────────────────────────────────────────────────┘');
  }

  private async handleIntent(intent: Intent): Promise<void> {
    // Filter by intent type
    if (!this.shouldHandleIntent(intent)) {
      this.log('debug', `Skipping intent ${intent.id} - filtered by config`);
      return;
    }

    // Filter by token whitelist
    if (!this.isTokenAllowed(intent)) {
      this.log('debug', `Skipping intent ${intent.id} - token not in whitelist`);
      return;
    }

    // Filter by amount
    if (!this.isAmountInRange(intent)) {
      this.log('debug', `Skipping intent ${intent.id} - amount out of range`);
      return;
    }

    // Check deadline
    if (!this.hasEnoughTime(intent)) {
      this.log('debug', `Skipping intent ${intent.id} - deadline too close`);
      return;
    }

    this.log('info', `\n═══ New Intent ═══════════════════════════════════`);
    this.log('info', `ID: ${intent.id} | Type: ${IntentType[intent.type]}`);
    this.log('info', `User: ${intent.user.slice(0, 10)}...${intent.user.slice(-8)}`);
    this.log('info', `Input: ${intent.inputAmount} | Output Token: ${intent.outputToken.address.slice(0, 20)}...`);

    if (this.config.dryRun) {
      this.log('info', `[DRY RUN] Would process intent ${intent.id}`);
      return;
    }

    try {
      await this.processIntent(intent);
      this.processedCount++;
    } catch (error) {
      this.errorCount++;
      this.log('error', `Failed to process intent ${intent.id}: ${(error as Error).message}`);
    }
  }

  private async processIntent(intent: Intent): Promise<void> {
    switch (intent.type) {
      case IntentType.SWAP:
        await this.handleSwap(intent);
        break;
      case IntentType.LIMIT_ORDER:
        await this.handleLimitOrder(intent);
        break;
      case IntentType.TWAP:
        await this.handleTWAP(intent);
        break;
      case IntentType.DCA:
        await this.handleDCA(intent);
        break;
      default:
        this.log('warn', `Unknown intent type: ${intent.type}`);
    }
  }

  private async handleSwap(intent: Intent): Promise<void> {
    // Check for auctions
    if (this.config.enableSealedBidAuction) {
      const hasAuction = await this.solver.isSealedBidAuctionActive(intent.id);
      if (hasAuction) {
        await this.handleSealedBidAuction(intent);
        return;
      }
    }

    if (this.config.enableDutchAuction) {
      const dutch = await this.solver.getDutchAuction(intent.id);
      if (dutch && dutch.isActive) {
        await this.handleDutchAuction(intent, dutch);
        return;
      }
    }

    // Direct swap
    const solution = await this.solver.calculateOptimalSolution(intent);

    if (intent.minOutputAmount && solution.outputAmount < intent.minOutputAmount) {
      this.log('info', `Cannot meet min output - skipping`);
      return;
    }

    const result = await this.solver.solveSwap(intent.id, solution.outputAmount);

    if (result.success) {
      this.log('info', `✅ Swap filled! TX: ${result.txHash?.slice(0, 20)}...`);
    } else {
      this.log('error', `❌ Swap failed: ${result.error}`);
    }
  }

  private async handleLimitOrder(intent: Intent): Promise<void> {
    const { canFill, outputAmount } = await this.solver.canFillLimitOrder(intent);

    if (!canFill) {
      this.log('info', `Limit price not met - will monitor`);
      // TODO: Add to monitoring queue
      return;
    }

    const result = await this.solver.solveLimitOrder(intent.id, intent.inputAmount, outputAmount);

    if (result.success) {
      this.log('info', `✅ Limit order filled! TX: ${result.txHash?.slice(0, 20)}...`);
    } else {
      this.log('error', `❌ Limit order failed: ${result.error}`);
    }
  }

  private async handleTWAP(intent: Intent): Promise<void> {
    const isReady = await this.solver.isTWAPChunkReady(intent.id);
    if (!isReady) {
      this.log('debug', `TWAP chunk not ready yet`);
      return;
    }

    const route = await this.solver.findBestRoute(
      intent.inputToken.address,
      intent.outputToken.address,
      intent.inputAmount
    );

    const result = await this.solver.solveTWAPChunk(intent.id, route.expectedOutput);

    if (result.success) {
      this.log('info', `✅ TWAP chunk filled! TX: ${result.txHash?.slice(0, 20)}...`);
    } else {
      this.log('error', `❌ TWAP chunk failed: ${result.error}`);
    }
  }

  private async handleDCA(intent: Intent): Promise<void> {
    const isReady = await this.solver.isDCAPeriodReady(intent.id);
    if (!isReady) {
      this.log('debug', `DCA period not ready yet`);
      return;
    }

    const route = await this.solver.findBestRoute(
      intent.inputToken.address,
      intent.outputToken.address,
      intent.inputAmount
    );

    const result = await this.solver.solveDCAPeriod(intent.id, route.expectedOutput);

    if (result.success) {
      this.log('info', `✅ DCA period filled! TX: ${result.txHash?.slice(0, 20)}...`);
    } else {
      this.log('error', `❌ DCA period failed: ${result.error}`);
    }
  }

  private async handleSealedBidAuction(intent: Intent): Promise<void> {
    const solution = await this.solver.calculateOptimalSolution(intent);
    const bidResult = await this.solver.submitBid(intent.id, solution.outputAmount, solution.executionPrice);

    if (bidResult.success) {
      this.log('info', `📝 Bid submitted! TX: ${bidResult.txHash?.slice(0, 20)}...`);
      // Monitor for settlement handled separately
    } else {
      this.log('error', `❌ Bid failed: ${bidResult.error}`);
    }
  }

  private async handleDutchAuction(intent: Intent, dutch: { startPrice: bigint; endPrice: bigint }): Promise<void> {
    const currentPrice = await this.solver.getDutchPrice(intent.id);
    const marketPrice = BigInt(Math.floor(Number(dutch.endPrice) * (this.config.dutchMaxPricePercent / 100)));

    if (currentPrice <= marketPrice) {
      const result = await this.solver.acceptDutchAuction(intent.id);
      if (result.success) {
        this.log('info', `🎯 Dutch auction accepted! TX: ${result.txHash?.slice(0, 20)}...`);
        // Settle
        const settleResult = await this.solver.settleDutchAuction(intent.id);
        if (settleResult.success) {
          this.log('info', `✅ Dutch auction settled! TX: ${settleResult.txHash?.slice(0, 20)}...`);
        }
      }
    } else {
      this.log('debug', `Dutch price ${currentPrice} > max ${marketPrice} - waiting`);
    }
  }

  private shouldHandleIntent(intent: Intent): boolean {
    switch (intent.type) {
      case IntentType.SWAP:
        return this.config.enableSwap;
      case IntentType.LIMIT_ORDER:
        return this.config.enableLimitOrder;
      case IntentType.TWAP:
        return this.config.enableTwap;
      case IntentType.DCA:
        return this.config.enableDca;
      default:
        return false;
    }
  }

  private isTokenAllowed(intent: Intent): boolean {
    if (this.config.inputTokenWhitelist.length > 0) {
      if (!this.config.inputTokenWhitelist.includes(intent.inputToken.address)) {
        return false;
      }
    }
    if (this.config.outputTokenWhitelist.length > 0) {
      if (!this.config.outputTokenWhitelist.includes(intent.outputToken.address)) {
        return false;
      }
    }
    return true;
  }

  private isAmountInRange(intent: Intent): boolean {
    return intent.inputAmount >= this.config.minInputAmount && intent.inputAmount <= this.config.maxInputAmount;
  }

  private hasEnoughTime(intent: Intent): boolean {
    const secondsToDeadline = (intent.deadline.getTime() - Date.now()) / 1000;
    return secondsToDeadline >= this.config.minDeadlineSeconds;
  }

  private formatAmount(amount: bigint): string {
    const num = Number(amount) / 1e8;
    return num.toLocaleString(undefined, { maximumFractionDigits: 4 });
  }

  private log(level: 'debug' | 'info' | 'warn' | 'error', message: string): void {
    const levels = { debug: 0, info: 1, warn: 2, error: 3 };
    if (levels[level] < levels[this.config.logLevel]) return;

    const timestamp = new Date().toISOString().slice(11, 19);
    const prefix = this.config.coloredOutput
      ? this.getColoredPrefix(level)
      : `[${level.toUpperCase()}]`;

    console.log(`${timestamp} ${prefix} ${message}`);
  }

  private getColoredPrefix(level: string): string {
    const colors: Record<string, string> = {
      debug: '\x1b[36m[DEBUG]\x1b[0m',
      info: '\x1b[32m[INFO]\x1b[0m',
      warn: '\x1b[33m[WARN]\x1b[0m',
      error: '\x1b[31m[ERROR]\x1b[0m',
    };
    return colors[level] || `[${level.toUpperCase()}]`;
  }

  private shutdown(): void {
    console.log('\n\n🛑 Shutting down solver...');
    console.log(`   Processed: ${this.processedCount} intents`);
    console.log(`   Errors: ${this.errorCount}`);
    this.solver.stopIntentStream();
    this.isRunning = false;
    process.exit(0);
  }

  private printBanner(): void {
    console.log(`
 ██╗   ██╗███████╗██╗      ██████╗ ██╗  ██╗
 ██║   ██║██╔════╝██║     ██╔═══██╗╚██╗██╔╝
 ██║   ██║█████╗  ██║     ██║   ██║ ╚███╔╝
 ╚██╗ ██╔╝██╔══╝  ██║     ██║   ██║ ██╔██╗
  ╚████╔╝ ███████╗███████╗╚██████╔╝██╔╝ ██╗
   ╚═══╝  ╚══════╝╚══════╝ ╚═════╝ ╚═╝  ╚═╝
                           Solver SDK v1.0.0
`);
  }
}
