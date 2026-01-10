import 'dotenv/config';
import { VeloxSolver } from '../VeloxSolver';
import { IntentRecord, IntentType, IntentStatus, isNextChunkReady, getRemainingChunks } from '../types/intent';

async function main() {
  const shinamiNodeKey = process.env.SHINAMI_KEY;

  // Beautiful startup banner
  console.log('\n');
  console.log('╔' + '═'.repeat(78) + '╗');
  console.log('║' + ' '.repeat(78) + '║');
  console.log('║' + '  🚀 VELOX BASIC SOLVER'.padEnd(78) + '║');
  console.log('║' + ' '.repeat(78) + '║');
  console.log('╚' + '═'.repeat(78) + '╝');
  console.log('');
  console.log('  ⏱️  Polling Interval        10,000ms (10 seconds)');
  console.log(`  ${shinamiNodeKey ? '✅' : '⏭️ '} Shinami Node Service      ${shinamiNodeKey ? 'CONFIGURED' : 'DISABLED'}`);
  console.log('  ⏭️  Skip Existing Intents   ENABLED');
  console.log('');

  const solver = new VeloxSolver({
    rpcUrl: process.env.RPC_URL || 'https://testnet.movementnetwork.xyz/v1',
    veloxAddress:
      process.env.VELOX_ADDRESS ||
      '0x44acd76127a76012da5efb314c9a47882017c12b924181379ff3b9d17b3cc8fb',
    privateKey: process.env.SOLVER_PRIVATE_KEY,
    pollingInterval: 10000, // 10 seconds to avoid rate limiting
    skipExistingOnStartup: true,
    shinamiNodeKey,
  });

  // Handle errors
  solver.on('error', (error) => {
    console.error('\n  ❌ Solver error:', error.message);
  });

  // Listen for new intents - validates registration before starting
  await solver.startIntentStream(async (record: IntentRecord) => {
    console.log(`\n=== New Intent Detected ===`);
    console.log(`ID: ${record.id}`);
    console.log(`Type: ${record.intent.type}`);
    console.log(`User: ${record.user}`);
    console.log(`Status: ${record.status}`);

    // Check if we can fill this intent
    if (record.status !== IntentStatus.ACTIVE) {
      console.log(`Skipping - intent status is ${record.status}`);
      return;
    }

    try {
      if (record.intent.type === IntentType.SWAP) {
        await handleSwapIntent(solver, record);
      } else if (record.intent.type === IntentType.LIMIT_ORDER) {
        await handleLimitOrderIntent(solver, record);
      } else if (record.intent.type === IntentType.DCA) {
        await handleDCAIntent(solver, record);
      } else if (record.intent.type === IntentType.TWAP) {
        await handleTWAPIntent(solver, record);
      } else {
        console.log(`Skipping - unsupported intent type: ${record.intent.type}`);
      }
    } catch (error) {
      console.error('Error solving intent:', (error as Error).message);
    }
  });

  // Handle graceful shutdown
  process.on('SIGINT', () => {
    console.log('\n');
    console.log('╔' + '═'.repeat(78) + '╗');
    console.log('║' + '  ⏹️  Shutting down Velox solver...'.padEnd(78) + '║');
    console.log('╚' + '═'.repeat(78) + '╝');
    solver.stopIntentStream();
    process.exit(0);
  });

  process.on('SIGTERM', () => {
    console.log('\n');
    console.log('╔' + '═'.repeat(78) + '╗');
    console.log('║' + '  ⏹️  Terminating Velox solver...'.padEnd(78) + '║');
    console.log('╚' + '═'.repeat(78) + '╝');
    solver.stopIntentStream();
    process.exit(0);
  });
}

async function handleSwapIntent(solver: VeloxSolver, record: IntentRecord): Promise<void> {
  const intent = record.intent;

  console.log(`Processing SWAP intent...`);
  console.log(`  Input: ${intent.amountIn} from ${intent.inputToken}`);
  console.log(`  Output Token: ${intent.outputToken}`);
  console.log(`  Min Output Required: ${intent.minAmountOut}`);

  // Note: canFill check currently has SDK issues, skipping for now
  // const canFill = await solver.canFill(record.id);
  // if (!canFill) {
  //   console.log(`Skipping - cannot fill this intent`);
  //   return;
  // }

  // Find best route for the swap
  console.log('Finding best swap route...');
  const route = await solver.findBestRoute(
    intent.inputToken,
    intent.outputToken,
    intent.amountIn!
  );

  console.log(`Route found:`);
  console.log(`  Expected output: ${route.expectedOutput}`);
  console.log(`  Price impact: ${route.priceImpact}`);

  // Check if output meets minimum requirement
  if (route.expectedOutput < intent.minAmountOut!) {
    console.log(`Skipping - output does not meet minimum`);
    console.log(`  Expected: ${route.expectedOutput}`);
    console.log(`  Required: ${intent.minAmountOut}`);
    return;
  }

  // Check deadline
  const deadline = intent.deadline || Date.now() / 1000;
  const now = Date.now() / 1000;
  if (now > deadline) {
    console.log(`Skipping - intent deadline passed`);
    return;
  }

  // Fill the swap
  console.log('Filling swap intent...');
  const result = await solver.fillSwap({
    intentId: record.id,
    fillInput: intent.amountIn!,
    outputAmount: route.expectedOutput,
  });

  if (result.success) {
    console.log(`\n=== Swap Filled Successfully! ===`);
    console.log(`TX Hash: ${result.txHash}`);
    console.log(`Output Amount: ${route.expectedOutput}`);
  } else {
    console.log(`\n=== Swap Fill Failed ===`);
    console.log(`Error: ${result.error}`);
  }
}

async function handleLimitOrderIntent(solver: VeloxSolver, record: IntentRecord): Promise<void> {
  const intent = record.intent;

  console.log(`Processing LIMIT ORDER intent...`);
  console.log(`  Input: ${intent.amountIn} from ${intent.inputToken}`);
  console.log(`  Output Token: ${intent.outputToken}`);
  console.log(`  Limit Price: ${intent.limitPrice}`);
  console.log(`  Expiry: ${intent.expiry}`);

  // Check deadline
  const expiry = intent.expiry || Date.now() / 1000;
  const now = Date.now() / 1000;
  if (now > expiry) {
    console.log(`Skipping - limit order expired`);
    return;
  }

  // Find best route to check if we can meet limit price
  console.log('Finding best route...');
  const route = await solver.findBestRoute(
    intent.inputToken,
    intent.outputToken,
    intent.amountIn!
  );

  console.log(`Current market output: ${route.expectedOutput}`);
  console.log(`Required min output: ${intent.limitPrice}`);

  // For limit orders, check if current price meets the limit
  if (route.expectedOutput < intent.limitPrice!) {
    console.log(`Skipping - market price does not meet limit price`);
    return;
  }

  // Fill the limit order
  console.log('Filling limit order...');
  const result = await solver.fillLimitOrder({
    intentId: record.id,
    fillInput: intent.amountIn!,
    outputAmount: route.expectedOutput,
  });

  if (result.success) {
    console.log(`\n=== Limit Order Filled Successfully! ===`);
    console.log(`TX Hash: ${result.txHash}`);
    console.log(`Output Amount: ${route.expectedOutput}`);
  } else {
    console.log(`\n=== Limit Order Fill Failed ===`);
    console.log(`Error: ${result.error}`);
  }
}

async function handleDCAIntent(solver: VeloxSolver, record: IntentRecord): Promise<void> {
  const intent = record.intent;

  console.log(`Processing DCA intent...`);
  console.log(`  Amount per Period: ${intent.amountPerPeriod}`);
  console.log(`  Total Periods: ${intent.totalPeriods}`);
  console.log(`  Interval: ${intent.intervalSeconds}s`);
  console.log(`  Periods executed: ${record.chunksExecuted}/${intent.totalPeriods}`);

  // Check if next period is ready
  const isReady = isNextChunkReady(record);
  if (!isReady) {
    const nextTime = new Date(record.nextExecution * 1000).toISOString();
    console.log(`Skipping - next period not ready until ${nextTime}`);
    return;
  }

  // Check if all periods are complete
  const remaining = getRemainingChunks(record);
  if (remaining <= 0) {
    console.log(`Skipping - all DCA periods completed`);
    return;
  }

  // Find best route for this period
  console.log('Finding best route for DCA period...');
  const route = await solver.findBestRoute(
    intent.inputToken,
    intent.outputToken,
    intent.amountPerPeriod!
  );

  console.log(`  Period Output: ${route.expectedOutput}`);

  // Fill the DCA period
  console.log('Filling DCA period...');
  const result = await solver.fillDcaPeriod({
    intentId: record.id,
    outputAmount: route.expectedOutput,
  });

  if (result.success) {
    console.log(`\n=== DCA Period Filled Successfully! ===`);
    console.log(`TX Hash: ${result.txHash}`);
    console.log(`Period: ${record.chunksExecuted + 1}/${intent.totalPeriods}`);
    console.log(`Period Output: ${route.expectedOutput}`);
  } else {
    console.log(`\n=== DCA Period Fill Failed ===`);
    console.log(`Error: ${result.error}`);
  }
}

async function handleTWAPIntent(solver: VeloxSolver, record: IntentRecord): Promise<void> {
  const intent = record.intent;

  console.log(`Processing TWAP intent...`);
  console.log(`  Total Amount: ${intent.totalAmount}`);
  console.log(`  Num Chunks: ${intent.numChunks}`);
  console.log(`  Interval: ${intent.intervalSeconds}s`);
  console.log(`  Max Slippage: ${intent.maxSlippageBps}bps`);
  console.log(`  Chunks executed: ${record.chunksExecuted}/${intent.numChunks}`);

  // Check if next chunk is ready
  const isReady = isNextChunkReady(record);
  if (!isReady) {
    const nextTime = new Date(record.nextExecution * 1000).toISOString();
    console.log(`Skipping - next chunk not ready until ${nextTime}`);
    return;
  }

  // Check if all chunks are complete
  const remaining = getRemainingChunks(record);
  if (remaining <= 0) {
    console.log(`Skipping - all TWAP chunks completed`);
    return;
  }

  // Calculate chunk amount
  const chunkAmount = (intent.totalAmount ?? BigInt(0)) / BigInt(intent.numChunks ?? 1);

  // Find best route for this chunk
  console.log('Finding best route for TWAP chunk...');
  const route = await solver.findBestRoute(
    intent.inputToken,
    intent.outputToken,
    chunkAmount
  );

  console.log(`  Chunk Output: ${route.expectedOutput}`);

  // Fill the TWAP chunk
  console.log('Filling TWAP chunk...');
  const result = await solver.fillTwapChunk({
    intentId: record.id,
    outputAmount: route.expectedOutput,
  });

  if (result.success) {
    console.log(`\n=== TWAP Chunk Filled Successfully! ===`);
    console.log(`TX Hash: ${result.txHash}`);
    console.log(`Chunk: ${record.chunksExecuted + 1}/${intent.numChunks}`);
    console.log(`Chunk Output: ${route.expectedOutput}`);
  } else {
    console.log(`\n=== TWAP Chunk Fill Failed ===`);
    console.log(`Error: ${result.error}`);
  }
}

main().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});
