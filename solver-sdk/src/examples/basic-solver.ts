import 'dotenv/config';
import { VeloxSolver } from '../VeloxSolver';
import { Intent, IntentType } from '../types/intent';

async function main() {
  const solver = new VeloxSolver({
    rpcUrl: process.env.RPC_URL || 'https://rpc.ankr.com/http/movement_bardock',
    veloxAddress:
      process.env.VELOX_ADDRESS ||
      '0x951cb360d9b1d4cb4834cf76e4fca0f63a85237874d8b2d45b3056439b91cbb7',
    privateKey: process.env.SOLVER_PRIVATE_KEY,
    pollingInterval: 1000,
    // Skip processing intents that existed before solver started - only react to new ones
    skipExistingOnStartup: true,
  });

  console.log('Starting Velox Basic Solver...');
  console.log('Listening for pending intents...\n');

  // Handle errors
  solver.on('error', (error) => {
    console.error('Solver error:', error.message);
  });

  // Listen for new intents
  solver.startIntentStream(async (intent: Intent) => {
    console.log(`\n=== New Intent Detected ===`);
    console.log(`ID: ${intent.id}`);
    console.log(`Type: ${intent.type}`);
    console.log(`User: ${intent.user}`);

    // Show type-specific info
    if (intent.type === IntentType.DCA) {
      console.log(`Amount per Period: ${intent.amountPerPeriod}`);
      console.log(`Total Periods: ${intent.totalPeriods}`);
      console.log(`Interval: ${intent.interval} seconds`);
      console.log(`Next Execution: ${intent.nextExecution?.toISOString() || 'N/A'}`);
      console.log(`Total Investment: ${intent.inputAmount} (${intent.amountPerPeriod} x ${intent.totalPeriods})`);
    } else if (intent.type === IntentType.TWAP) {
      console.log(`Total Amount: ${intent.totalAmount}`);
      console.log(`Num Chunks: ${intent.numChunks}`);
      console.log(`Chunk Amount: ${intent.inputAmount}`);
    } else {
      console.log(`Input: ${intent.inputAmount} ${intent.inputToken.address}`);
    }

    console.log(`Output Token: ${intent.outputToken.address}`);
    console.log(`Deadline: ${intent.deadline.toISOString()}`);

    // Check if profitable
    if (!canSolveProfitably(intent)) {
      console.log('Skipping - not profitable');
      return;
    }

    try {
      if (intent.type === IntentType.SWAP) {
        await handleSwapIntent(solver, intent);
      } else if (intent.type === IntentType.LIMIT_ORDER) {
        await handleLimitOrderIntent(solver, intent);
      } else if (intent.type === IntentType.DCA) {
        await handleDCAIntent(solver, intent);
      } else if (intent.type === IntentType.TWAP) {
        await handleTWAPIntent(solver, intent);
      } else {
        console.log(`Skipping - unsupported intent type: ${intent.type}`);
      }
    } catch (error) {
      console.error('Error solving intent:', (error as Error).message);
    }
  });

  // Handle graceful shutdown
  process.on('SIGINT', () => {
    console.log('\nShutting down solver...');
    solver.stopIntentStream();
    process.exit(0);
  });

  process.on('SIGTERM', () => {
    solver.stopIntentStream();
    process.exit(0);
  });
}

async function handleSwapIntent(solver: VeloxSolver, intent: Intent): Promise<void> {
  // Calculate optimal solution using real-time CoinGecko prices
  console.log('Calculating optimal solution for swap...');
  const solution = await solver.calculateOptimalSolution(intent);

  console.log(`Solution found:`);
  console.log(`  Output: ${solution.outputAmount}`);
  console.log(`  Price: ${solution.executionPrice}`);

  // Check minimum output
  if (intent.minOutputAmount && solution.outputAmount < intent.minOutputAmount) {
    console.log(`Skipping - cannot meet minimum output`);
    console.log(`  Min required: ${intent.minOutputAmount}`);
    console.log(`  We can provide: ${solution.outputAmount}`);
    return;
  }

  // Solve the swap by calling settlement::solve_swap
  console.log('Solving swap intent...');
  const result = await solver.solveSwap(intent.id, solution.outputAmount);

  if (result.success) {
    console.log(`\n=== Swap Intent Filled Successfully! ===`);
    console.log(`TX Hash: ${result.txHash}`);
    console.log(`Output Amount: ${solution.outputAmount}`);
  } else {
    console.log(`\n=== Swap Solution Failed ===`);
    console.log(`Error: ${result.error}`);
  }
}

async function handleLimitOrderIntent(solver: VeloxSolver, intent: Intent): Promise<void> {
  console.log('Processing limit order...');
  console.log(`  Limit Price: ${intent.limitPrice}`);
  console.log(`  Partial Fill Allowed: ${intent.partialFillAllowed}`);

  // Check if current market price meets the limit price
  const { canFill, executionPrice, outputAmount } = await solver.canFillLimitOrder(intent);

  if (!canFill) {
    console.log(`Skipping limit order - price not met`);
    console.log(`  Required limit price: ${intent.limitPrice}`);
    console.log(`  Current execution price: ${executionPrice}`);
    return;
  }

  console.log(`Limit price met! Filling order...`);
  console.log(`  Fill amount: ${intent.inputAmount}`);
  console.log(`  Output amount: ${outputAmount}`);
  console.log(`  Execution price: ${executionPrice}`);

  // For now, fill the entire order
  // TODO: Support partial fills based on liquidity/strategy
  const result = await solver.solveLimitOrder(intent.id, intent.inputAmount, outputAmount);

  if (result.success) {
    console.log(`\n=== Limit Order Filled Successfully! ===`);
    console.log(`TX Hash: ${result.txHash}`);
    console.log(`Fill Amount: ${intent.inputAmount}`);
    console.log(`Output Amount: ${outputAmount}`);
  } else {
    console.log(`\n=== Limit Order Failed ===`);
    console.log(`Error: ${result.error}`);
  }
}

async function handleDCAIntent(solver: VeloxSolver, intent: Intent): Promise<void> {
  console.log('Processing DCA intent...');
  console.log(`  Amount per Period: ${intent.amountPerPeriod}`);
  console.log(`  Total Periods: ${intent.totalPeriods}`);
  console.log(`  Interval: ${intent.interval} seconds`);
  console.log(`  Next Execution: ${intent.nextExecution?.toISOString()}`);

  // Check if this period is ready for execution
  const isReady = await solver.isDCAPeriodReady(intent.id);
  if (!isReady) {
    console.log(`Skipping DCA - period not ready for execution yet`);
    console.log(`  Next execution time: ${intent.nextExecution?.toISOString()}`);
    return;
  }

  // Check if DCA is completed
  const isCompleted = await solver.isScheduledCompleted(intent.id);
  if (isCompleted) {
    console.log(`Skipping DCA - all periods completed`);
    return;
  }

  // Get executed periods
  const executedPeriods = await solver.getExecutedPeriods(intent.id);
  console.log(`  Periods Executed: ${executedPeriods}/${intent.totalPeriods}`);

  // Calculate output for this period using CoinGecko prices
  // For DCA, inputAmount is the amount_per_period
  console.log('Calculating optimal solution for DCA period...');
  const route = await solver.findBestRoute(
    intent.inputToken.address,
    intent.outputToken.address,
    intent.inputAmount // This is amount_per_period for DCA
  );

  const outputAmount = route.expectedOutput;
  console.log(`  Period Output: ${outputAmount}`);

  // Solve the DCA period
  console.log('Solving DCA period...');
  const result = await solver.solveDCAPeriod(intent.id, outputAmount);

  if (result.success) {
    console.log(`\n=== DCA Period Filled Successfully! ===`);
    console.log(`TX Hash: ${result.txHash}`);
    console.log(`Period: ${executedPeriods + 1}/${intent.totalPeriods}`);
    console.log(`Period Input: ${intent.inputAmount}`);
    console.log(`Period Output: ${outputAmount}`);
  } else {
    console.log(`\n=== DCA Period Failed ===`);
    console.log(`Error: ${result.error}`);
  }
}

async function handleTWAPIntent(solver: VeloxSolver, intent: Intent): Promise<void> {
  console.log('Processing TWAP intent...');
  console.log(`  Total Amount: ${intent.totalAmount}`);
  console.log(`  Num Chunks: ${intent.numChunks}`);
  console.log(`  Chunk Amount: ${intent.inputAmount}`);
  console.log(`  Interval: ${intent.interval} seconds`);
  console.log(`  Max Slippage: ${intent.maxSlippageBps} bps`);
  console.log(`  Start Time: ${intent.startTime?.toISOString()}`);

  // Check if this chunk is ready for execution
  const isReady = await solver.isTWAPChunkReady(intent.id);
  if (!isReady) {
    console.log(`Skipping TWAP - chunk not ready for execution yet`);
    console.log(`  Start time: ${intent.startTime?.toISOString()}`);
    return;
  }

  // Check if TWAP is completed
  const isCompleted = await solver.isScheduledCompleted(intent.id);
  if (isCompleted) {
    console.log(`Skipping TWAP - all chunks completed`);
    return;
  }

  // Get executed chunks
  const executedChunks = await solver.getExecutedPeriods(intent.id);
  console.log(`  Chunks Executed: ${executedChunks}/${intent.numChunks}`);

  // Calculate output for this chunk using CoinGecko prices
  // For TWAP, inputAmount is the chunk amount (total_amount / num_chunks)
  console.log('Calculating optimal solution for TWAP chunk...');
  const route = await solver.findBestRoute(
    intent.inputToken.address,
    intent.outputToken.address,
    intent.inputAmount // This is chunk amount for TWAP
  );

  const outputAmount = route.expectedOutput;
  console.log(`  Chunk Output: ${outputAmount}`);

  // Solve the TWAP chunk
  console.log('Solving TWAP chunk...');
  const result = await solver.solveTWAPChunk(intent.id, outputAmount);

  if (result.success) {
    console.log(`\n=== TWAP Chunk Filled Successfully! ===`);
    console.log(`TX Hash: ${result.txHash}`);
    console.log(`Chunk: ${executedChunks + 1}/${intent.numChunks}`);
    console.log(`Chunk Input: ${intent.inputAmount}`);
    console.log(`Chunk Output: ${outputAmount}`);
  } else {
    console.log(`\n=== TWAP Chunk Failed ===`);
    console.log(`Error: ${result.error}`);
  }
}

function canSolveProfitably(intent: Intent): boolean {
  // Basic profitability check
  // In production, this should consider:
  // - Gas costs
  // - Price impact
  // - Competition from other solvers
  // - Current market conditions

  const now = new Date();

  // For DCA intents, check next execution time instead of deadline
  if (intent.type === IntentType.DCA) {
    // DCA intents are always potentially profitable if not completed
    // The actual timing check happens in handleDCAIntent via isDCAPeriodReady
    // Just verify the overall deadline hasn't passed
    const timeToDeadline = intent.deadline.getTime() - now.getTime();
    if (timeToDeadline < 0) {
      console.log(`DCA deadline passed: ${intent.deadline.toISOString()}`);
      return false;
    }
    return true;
  }

  // For TWAP intents, similar logic
  if (intent.type === IntentType.TWAP) {
    const timeToDeadline = intent.deadline.getTime() - now.getTime();
    if (timeToDeadline < 0) {
      return false;
    }
    return true;
  }

  // For Swap and LimitOrder, use the existing deadline check
  const timeToDeadline = intent.deadline.getTime() - now.getTime();

  // Skip if less than 10 seconds to deadline
  if (timeToDeadline < 10000) {
    return false;
  }

  return true;
}

main().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});
