"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const VeloxSolver_1 = require("../VeloxSolver");
const ArbitrageStrategy_1 = require("../strategies/ArbitrageStrategy");
const MarketMakerStrategy_1 = require("../strategies/MarketMakerStrategy");
const gas_1 = require("../utils/gas");
const cliStyle_1 = require("../utils/cliStyle");
class AdvancedSolver {
    solver;
    strategies;
    activeIntents;
    config;
    constructor(config) {
        this.config = config;
        this.solver = new VeloxSolver_1.VeloxSolver({
            rpcUrl: config.rpcUrl,
            veloxAddress: config.veloxAddress,
            privateKey: config.privateKey,
        });
        this.strategies = [
            new ArbitrageStrategy_1.ArbitrageStrategy(config.minProfitBps),
            new MarketMakerStrategy_1.MarketMakerStrategy(50, 1000000000000n),
        ];
        this.activeIntents = new Set();
    }
    async start() {
        console.log('Starting Advanced Velox Solver...');
        console.log(`Strategies: ${this.strategies.map((s) => s.name).join(', ')}`);
        console.log(`Max concurrent intents: ${this.config.maxConcurrentIntents}\n`);
        this.solver.on('error', (error) => {
            console.error('Solver error:', error.message);
        });
        // Validates registration before starting
        await this.solver.startIntentStream((intent) => this.handleIntent(intent));
    }
    stop() {
        this.solver.stopIntentStream();
    }
    async handleIntent(intent) {
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
        }
        finally {
            this.activeIntents.delete(intent.id);
        }
    }
    async processIntent(intent) {
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
        const gasEstimate = (0, gas_1.estimateGas)('SUBMIT_SOLUTION', 100n);
        if (!(0, gas_1.isProfitableAfterGas)(profit, gasEstimate)) {
            console.log('  Not profitable after gas costs');
            return;
        }
        console.log(`  Expected profit: ${profit}`);
        // Submit solution
        await this.submitWithRetry(solution, 3);
    }
    findBestStrategy(intent) {
        for (const strategy of this.strategies) {
            if (strategy.canHandle(intent)) {
                return strategy;
            }
        }
        return null;
    }
    async submitWithRetry(solution, maxRetries) {
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
    // Beautiful startup banner
    (0, cliStyle_1.printVeloxLogo)();
    (0, cliStyle_1.printSection)('⚡ VELOX ADVANCED SOLVER');
    const minProfitBps = parseInt(process.env.MIN_PROFIT_BPS || '10');
    const maxConcurrent = parseInt(process.env.MAX_CONCURRENT || '5');
    console.log('');
    (0, cliStyle_1.printKeyValue)('🎯 Min Profit Threshold', minProfitBps.toString() + ' bps');
    (0, cliStyle_1.printKeyValue)('🔄 Max Concurrent Intents', maxConcurrent.toString());
    (0, cliStyle_1.printKeyValue)('📊 Strategy Types', 'Arbitrage, Market Making');
    console.log('');
    const solver = new AdvancedSolver({
        rpcUrl: process.env.RPC_URL || 'https://testnet.movementnetwork.xyz/v1',
        veloxAddress: process.env.VELOX_ADDRESS ||
            '0x94d017d8d944702a976af2844bdf3534b946e712cad286610aef5969568ba470',
        privateKey: process.env.SOLVER_PRIVATE_KEY || '',
        minProfitBps,
        maxConcurrentIntents: maxConcurrent,
    });
    await solver.start();
    process.on('SIGINT', () => {
        console.log('\n');
        console.log('╔' + '═'.repeat(78) + '╗');
        console.log('║' + '  ⏹️  Shutting down advanced solver...'.padEnd(78) + '║');
        console.log('╚' + '═'.repeat(78) + '╝');
        solver.stop();
        process.exit(0);
    });
}
main().catch((error) => {
    console.error('Fatal error:', error);
    process.exit(1);
});
//# sourceMappingURL=advanced-solver.js.map