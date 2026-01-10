import { VeloxSolver } from '../VeloxSolver';
import { Intent, IntentType } from '../types/intent';
import { Solution } from '../types/solution';
import { SolverStrategy } from '../strategies/BaseStrategy';
import { ArbitrageStrategy } from '../strategies/ArbitrageStrategy';
import { MarketMakerStrategy } from '../strategies/MarketMakerStrategy';
import { estimateGas, isProfitableAfterGas } from '../utils/gas';

interface SolverConfig {
  rpcUrl: string;
  veloxAddress: string;
  privateKey: string;
  minProfitBps: number;
  maxConcurrentIntents: number;
}

class AdvancedSolver {
  private solver: VeloxSolver;
  private strategies: SolverStrategy[];
  private activeIntents: Set<string>;
  private config: SolverConfig;

  constructor(config: SolverConfig) {
    this.config = config;
    this.solver = new VeloxSolver({
      rpcUrl: config.rpcUrl,
      veloxAddress: config.veloxAddress,
      privateKey: config.privateKey,
    });

    this.strategies = [
      new ArbitrageStrategy(config.minProfitBps),
      new MarketMakerStrategy(50, 1000000000000n),
    ];

    this.activeIntents = new Set();
  }

  async start(): Promise<void> {
    console.log('Starting Advanced Velox Solver...');
    console.log(`Strategies: ${this.strategies.map((s) => s.name).join(', ')}`);
    console.log(`Max concurrent intents: ${this.config.maxConcurrentIntents}\n`);

    this.solver.on('error', (error) => {
      console.error('Solver error:', error.message);
    });

    this.solver.startIntentStream((intent) => this.handleIntent(intent));
  }

  stop(): void {
    this.solver.stopIntentStream();
  }

  private async handleIntent(intent: Intent): Promise<void> {
    // Skip if at capacity
    if (this.activeIntents.size >= this.config.maxConcurrentIntents) {
      return;
    }

    // Skip if already processing
    if (this.activeIntents.has(intent.id)) {
      return;
    }

    this.activeIntents.add(intent.id);

    try {
      await this.processIntent(intent);
    } finally {
      this.activeIntents.delete(intent.id);
    }
  }

  private async processIntent(intent: Intent): Promise<void> {
    console.log(`\nProcessing intent ${intent.id} (${intent.type})`);

    // Find best strategy
    const strategy = this.findBestStrategy(intent);
    if (!strategy) {
      console.log('  No suitable strategy found');
      return;
    }

    console.log(`  Using strategy: ${strategy.name}`);

    // Calculate solution
    const solution = await strategy.calculateSolution(intent, this.solver);
    if (!solution) {
      console.log('  Strategy returned no solution');
      return;
    }

    // Check profitability after gas
    const profit = strategy.estimateProfit(intent, solution);
    const gasEstimate = estimateGas('SUBMIT_SOLUTION', 100n);

    if (!isProfitableAfterGas(profit, gasEstimate)) {
      console.log('  Not profitable after gas costs');
      return;
    }

    console.log(`  Expected profit: ${profit}`);

    // Submit solution
    await this.submitWithRetry(solution, 3);
  }

  private findBestStrategy(intent: Intent): SolverStrategy | null {
    for (const strategy of this.strategies) {
      if (strategy.canHandle(intent)) {
        return strategy;
      }
    }
    return null;
  }

  private async submitWithRetry(
    solution: Solution,
    maxRetries: number
  ): Promise<void> {
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      const result = await this.solver.submitSolution(solution);

      if (result.success) {
        console.log(`  Solution submitted: ${result.txHash}`);
        return;
      }

      console.log(`  Attempt ${attempt} failed: ${result.error}`);

      if (attempt < maxRetries) {
        await new Promise((r) => setTimeout(r, 1000 * attempt));
      }
    }

    console.log('  All submission attempts failed');
  }
}

async function main() {
  const solver = new AdvancedSolver({
    rpcUrl: process.env.RPC_URL || 'https://testnet.movementnetwork.xyz/v1',
    veloxAddress:
      process.env.VELOX_ADDRESS ||
      '0x44acd76127a76012da5efb314c9a47882017c12b924181379ff3b9d17b3cc8fb',
    privateKey: process.env.SOLVER_PRIVATE_KEY || '',
    minProfitBps: parseInt(process.env.MIN_PROFIT_BPS || '10'),
    maxConcurrentIntents: parseInt(process.env.MAX_CONCURRENT || '5'),
  });

  await solver.start();

  process.on('SIGINT', () => {
    console.log('\nShutting down...');
    solver.stop();
    process.exit(0);
  });
}

main().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});
