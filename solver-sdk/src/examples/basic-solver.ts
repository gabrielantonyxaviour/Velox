import 'dotenv/config';
import { VeloxSolver } from '../VeloxSolver';
import { IntentRecord, IntentType, IntentStatus, AuctionType, isNextChunkReady, getRemainingChunks } from '../types/intent';
import { printVeloxLogo, printSection, printKeyValue, printSuccess, printLoadingAnimation } from '../utils/cliStyle';

// Helper to record bid transaction to API
async function recordBidTransaction(
  intentId: number,
  bidTxHash: string,
  solverAddress: string,
  bidAmount: bigint
): Promise<void> {
  const apiUrl = process.env.VELOX_API_URL;
  if (!apiUrl) {
    console.log(`[Bid TX] VELOX_API_URL not configured - bid not recorded`);
    return;
  }

  try {
    const response = await fetch(`${apiUrl}/api/transactions/bid`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        intent_id: intentId.toString(),
        bid_tx_hash: bidTxHash,
        solver_address: solverAddress,
        bid_amount: bidAmount.toString(),
      }),
    });

    if (response.ok) {
      console.log(`[Bid TX] Recorded bid transaction to API`);
    } else {
      const data = await response.json();
      console.log(`[Bid TX] Failed to record: ${data.error}`);
    }
  } catch (error) {
    console.error(`[Bid TX] API call failed:`, (error as Error).message);
  }
}

// Helper to call the complete-auction API
async function triggerAuctionCompletion(intentId: number): Promise<{ success: boolean; txHash?: string; error?: string }> {
  const apiUrl = process.env.VELOX_API_URL;
  if (!apiUrl) {
    return { success: false, error: 'VELOX_API_URL not configured' };
  }

  try {
    console.log(`Triggering auction completion via API...`);
    const response = await fetch(`${apiUrl}/api/complete-auction`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ intentId: Number(intentId) }),
    });

    const data = await response.json();
    if (data.success) {
      console.log(`Auction completion triggered! TX: ${data.txHash}`);
      return { success: true, txHash: data.txHash };
    } else {
      console.log(`Auction completion failed: ${data.error}`);
      return { success: false, error: data.error };
    }
  } catch (error) {
    console.error(`API call failed:`, (error as Error).message);
    return { success: false, error: (error as Error).message };
  }
}

// Track scheduled completions to avoid duplicates
const scheduledCompletions = new Set<number>();

// Schedule auction completion to run after delay (non-blocking)
function scheduleAuctionCompletion(intentId: number, delayMs: number, callback: () => Promise<void>): void {
  if (scheduledCompletions.has(intentId)) {
    console.log(`[Scheduler] Completion already scheduled for intent #${intentId}`);
    return;
  }

  scheduledCompletions.add(intentId);
  console.log(`[Scheduler] Will complete auction #${intentId} in ${(delayMs / 1000).toFixed(0)}s`);

  setTimeout(async () => {
    try {
      await callback();
    } catch (error) {
      console.error(`[Scheduler] Error completing auction #${intentId}:`, error);
    } finally {
      scheduledCompletions.delete(intentId);
    }
  }, delayMs);
}

async function main() {
  const shinamiNodeKey = process.env.SHINAMI_KEY;
  const solverPrivateKey = process.env.SOLVER_PRIVATE_KEY;
  const registeredSolverAddress = process.env.REGISTERED_SOLVER_ADDRESS;

  // Beautiful startup banner
  printVeloxLogo();
  printSection('🚀 VELOX BASIC SOLVER');
  console.log('');

  // Validate configuration before proceeding
  if (!solverPrivateKey) {
    printSection('❌ CONFIGURATION ERROR');
    console.log('');
    console.log('  Missing required environment variable: SOLVER_PRIVATE_KEY');
    console.log('');
    console.log('  Required Configuration:');
    console.log('  ├─ SOLVER_PRIVATE_KEY       (operator wallet private key - REQUIRED)');
    console.log('  ├─ REGISTERED_SOLVER_ADDRESS (on-chain solver address - OPTIONAL)');
    console.log('  ├─ RPC_URL                   (defaults to testnet)');
    console.log('  ├─ VELOX_ADDRESS             (defaults to deployed address)');
    console.log('  └─ VELOX_API_URL             (for recording taker txs - OPTIONAL)');
    console.log('');
    console.log('  Setup:');
    console.log('  1. Copy .env.example to .env:');
    console.log('     cp .env.example .env');
    console.log('');
    console.log('  2. Edit .env and add your configuration:');
    console.log('     SOLVER_PRIVATE_KEY=0x...');
    console.log('     REGISTERED_SOLVER_ADDRESS=0x...');
    console.log('     VELOX_API_URL=https://your-velox-frontend.vercel.app');
    console.log('');
    process.exit(1);
  }

  // Display configuration status
  const veloxApiUrl = process.env.VELOX_API_URL;

  printKeyValue('⏱️  Polling Interval', '10,000ms (10 seconds)');
  printKeyValue(`${shinamiNodeKey ? '✅' : '⏭️ '} Shinami Node Service`, shinamiNodeKey ? 'CONFIGURED' : 'DISABLED');
  printKeyValue(`${registeredSolverAddress ? '✅' : '⏭️ '} Registered Solver Address`, registeredSolverAddress ? 'CONFIGURED' : 'WILL USE OPERATOR ADDRESS');
  printKeyValue(`${veloxApiUrl ? '✅' : '⏭️ '} Velox API URL`, veloxApiUrl || 'NOT CONFIGURED (taker txs not recorded)');
  const skipExisting = process.env.SKIP_EXISTING !== 'false';
  printKeyValue('⏭️  Skip Existing Intents', skipExisting ? 'ENABLED' : 'DISABLED');
  console.log('');

  const solver = new VeloxSolver({
    rpcUrl: process.env.RPC_URL || 'https://testnet.movementnetwork.xyz/v1',
    veloxAddress:
      process.env.VELOX_ADDRESS ||
      '0x94d017d8d944702a976af2844bdf3534b946e712cad286610aef5969568ba470',
    // Private key of the operator wallet (used for signing transactions)
    privateKey: process.env.SOLVER_PRIVATE_KEY,
    // Address where solver is registered on-chain (can be different from operator)
    // If not provided, will use the address derived from privateKey
    registeredSolverAddress: process.env.REGISTERED_SOLVER_ADDRESS,
    pollingInterval: 10000, // 10 seconds to avoid rate limiting
    skipExistingOnStartup: skipExisting,
    shinamiNodeKey,
    // Velox API URL for recording taker transactions (optional)
    // Set to your deployed frontend URL (e.g., https://velox.vercel.app)
    veloxApiUrl,
  });

  // Handle errors
  solver.on('error', (error) => {
    console.error('\n  ❌ Solver error:', error.message);
  });

  // Track intents we've already seen (for less verbose logging on re-checks)
  const seenIntents = new Set<number>();

  // Listen for new intents - validates registration before starting
  await solver.startIntentStream(async (record: IntentRecord) => {
    const isFirstSeen = !seenIntents.has(record.id);
    const isScheduled = record.intent.type === IntentType.TWAP || record.intent.type === IntentType.DCA;

    if (isFirstSeen) {
      seenIntents.add(record.id);
      console.log(`\n=== New Intent Detected ===`);
      console.log(`ID: ${record.id}`);
      console.log(`Type: ${record.intent.type}`);
      console.log(`User: ${record.user}`);
      console.log(`Status: ${record.status}`);
    }

    // Check if we can fill this intent
    if (record.status !== IntentStatus.ACTIVE) {
      if (isFirstSeen) {
        console.log(`Skipping - intent status is ${record.status}`);
      }
      // Remove from seen if no longer active (completed/cancelled)
      seenIntents.delete(record.id);
      return;
    }

    try {
      if (record.intent.type === IntentType.SWAP) {
        await handleSwapIntent(solver, record);
      } else if (record.intent.type === IntentType.LIMIT_ORDER) {
        await handleLimitOrderIntent(solver, record);
      } else if (record.intent.type === IntentType.DCA) {
        await handleDCAIntent(solver, record, isFirstSeen);
      } else if (record.intent.type === IntentType.TWAP) {
        await handleTWAPIntent(solver, record, isFirstSeen);
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
  const auction = record.auction;

  console.log(`Processing SWAP intent...`);
  console.log(`  Input: ${intent.amountIn} from ${intent.inputToken}`);
  console.log(`  Output Token: ${intent.outputToken}`);
  console.log(`  Min Output Required: ${intent.minAmountOut}`);
  console.log(`  Auction Type: ${auction.type}`);

  // Check deadline
  const deadline = intent.deadline || Date.now() / 1000;
  const now = Date.now() / 1000;
  if (now > deadline) {
    console.log(`Skipping - intent deadline passed`);
    return;
  }

  // Find best route for pricing
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

  // Handle different auction types
  switch (auction.type) {
    case AuctionType.NONE:
      // No auction - fill directly
      await fillSwapDirect(solver, record, route.expectedOutput);
      break;

    case AuctionType.SEALED_BID_ACTIVE:
      // Auction is active - submit a bid
      await submitSwapBid(solver, record, route.expectedOutput);
      break;

    case AuctionType.SEALED_BID_COMPLETED:
      // Auction completed - check if we're the winner and fill
      await fillSwapAsWinner(solver, record, route.expectedOutput);
      break;

    case AuctionType.DUTCH_ACTIVE:
      // Dutch auction - accept at current price
      console.log(`Dutch auction active - accepting current price...`);
      const dutchResult = await solver.acceptDutchAuction(record.id);
      if (dutchResult.success) {
        console.log(`Dutch auction accepted! TX: ${dutchResult.txHash}`);
        // After accepting, we can fill
        await fillSwapDirect(solver, record, route.expectedOutput);
      } else {
        console.log(`Dutch auction acceptance failed: ${dutchResult.error}`);
      }
      break;

    case AuctionType.DUTCH_ACCEPTED:
      // Check if we're the accepted solver
      const solverAddr = await solver.getSolverStats();
      if (auction.winner === solverAddr.address) {
        await fillSwapDirect(solver, record, route.expectedOutput);
      } else {
        console.log(`Skipping - another solver accepted the Dutch auction`);
      }
      break;

    case AuctionType.FAILED:
      console.log(`Skipping - auction failed`);
      break;

    default:
      console.log(`Unknown auction type: ${auction.type}`);
  }
}

async function fillSwapDirect(solver: VeloxSolver, record: IntentRecord, outputAmount: bigint): Promise<void> {
  console.log('Filling swap intent directly...');
  const result = await solver.fillSwap({
    intentId: record.id,
    fillInput: record.intent.amountIn!,
    outputAmount,
  });

  if (result.success) {
    console.log(`\n=== Swap Filled Successfully! ===`);
    console.log(`TX Hash: ${result.txHash}`);
    console.log(`Output Amount: ${outputAmount}`);
  } else {
    console.log(`\n=== Swap Fill Failed ===`);
    console.log(`Error: ${result.error}`);
  }
}

async function submitSwapBid(solver: VeloxSolver, record: IntentRecord, outputAmount: bigint): Promise<void> {
  const auction = record.auction;
  const endTime = auction.endTime || 0;
  const now = Date.now() / 1000;

  if (now >= endTime) {
    console.log(`Auction period ended - triggering completion via invisible wallet...`);
    console.log(`  Auction ended at: ${new Date(endTime * 1000).toISOString()}`);

    // Trigger auction completion via API (automatically settles the swap)
    const completionResult = await triggerAuctionCompletion(record.id);
    if (completionResult.success) {
      console.log(`Auction #${record.id} completed and settled via invisible wallet!`);
      console.log(`TX Hash: ${completionResult.txHash}`);
    } else {
      console.log(`Auction #${record.id} completion failed: ${completionResult.error}`);
    }
    return;
  }

  const timeRemaining = endTime - now;
  console.log(`Sealed bid auction active - submitting bid...`);
  console.log(`  Time remaining: ${timeRemaining.toFixed(0)}s`);
  console.log(`  Bid amount (output): ${outputAmount}`);

  const result = await solver.submitBid(record.id, outputAmount);

  if (result.success) {
    console.log(`\n=== Bid Submitted Successfully! ===`);
    console.log(`TX Hash: ${result.txHash}`);
    console.log(`Bid Output Amount: ${outputAmount}`);
    console.log(`Auction ends: ${new Date(endTime * 1000).toISOString()}`);

    // Record bid transaction to API
    const solverStats = await solver.getSolverStats();
    await recordBidTransaction(record.id, result.txHash!, solverStats.address, outputAmount);

    // Schedule auction completion after it ends
    // Run in background so we don't block processing of other intents
    const waitTime = Math.max(0, timeRemaining + 1) * 1000;
    console.log(`Scheduling auction completion in ${(waitTime / 1000).toFixed(0)}s...`);

    scheduleAuctionCompletion(record.id, waitTime, async () => {
      console.log(`\n=== Triggering Auction Completion for Intent #${record.id} ===`);
      const completionResult = await triggerAuctionCompletion(record.id);
      if (completionResult.success) {
        console.log(`Auction #${record.id} completed via invisible wallet!`);
        console.log(`TX Hash: ${completionResult.txHash}`);
      } else {
        console.log(`Auction #${record.id} completion failed: ${completionResult.error}`);
      }
    });
  } else {
    console.log(`\n=== Bid Submission Failed ===`);
    console.log(`Error: ${result.error}`);
  }
}

async function fillSwapAsWinner(solver: VeloxSolver, record: IntentRecord, outputAmount: bigint): Promise<void> {
  const auction = record.auction;
  const solverStats = await solver.getSolverStats();

  console.log(`Sealed bid auction completed`);
  console.log(`  Winner: ${auction.winner}`);
  console.log(`  Our address: ${solverStats.address}`);

  if (auction.winner !== solverStats.address) {
    console.log(`Skipping - we are not the auction winner`);
    return;
  }

  // Check fill deadline
  const fillDeadline = auction.fillDeadline || 0;
  const now = Date.now() / 1000;
  if (now > fillDeadline) {
    console.log(`Skipping - fill deadline passed`);
    return;
  }

  console.log(`We won the auction! Filling swap...`);
  console.log(`  Winning bid: ${auction.winningBid}`);
  console.log(`  Fill deadline: ${new Date(fillDeadline * 1000).toISOString()}`);

  // Use winning bid amount as output (we committed to it)
  const fillAmount = auction.winningBid || outputAmount;

  const result = await solver.fillSwap({
    intentId: record.id,
    fillInput: record.intent.amountIn!,
    outputAmount: fillAmount,
  });

  if (result.success) {
    console.log(`\n=== Swap Filled as Auction Winner! ===`);
    console.log(`TX Hash: ${result.txHash}`);
    console.log(`Output Amount: ${fillAmount}`);
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

async function handleDCAIntent(solver: VeloxSolver, record: IntentRecord, isFirstSeen: boolean = true): Promise<void> {
  const intent = record.intent;

  if (isFirstSeen) {
    console.log(`Processing DCA intent...`);
    console.log(`  Amount per Period: ${intent.amountPerPeriod}`);
    console.log(`  Total Periods: ${intent.totalPeriods}`);
    console.log(`  Interval: ${intent.intervalSeconds}s`);
    console.log(`  Periods executed: ${record.chunksExecuted}/${intent.totalPeriods}`);
  }

  // Check if next period is ready
  const isReady = isNextChunkReady(record);
  if (!isReady) {
    if (isFirstSeen) {
      const nextTime = new Date(record.nextExecution * 1000).toISOString();
      console.log(`Skipping - next period not ready until ${nextTime}`);
    }
    return;
  }

  // Log when we're actually processing a period (either first time or re-check)
  console.log(`\n=== DCA Period Ready (Intent #${record.id}) ===`);
  console.log(`  Periods executed: ${record.chunksExecuted}/${intent.totalPeriods}`);

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

async function handleTWAPIntent(solver: VeloxSolver, record: IntentRecord, isFirstSeen: boolean = true): Promise<void> {
  const intent = record.intent;

  if (isFirstSeen) {
    console.log(`Processing TWAP intent...`);
    console.log(`  Total Amount: ${intent.totalAmount}`);
    console.log(`  Num Chunks: ${intent.numChunks}`);
    console.log(`  Interval: ${intent.intervalSeconds}s`);
    console.log(`  Max Slippage: ${intent.maxSlippageBps}bps`);
    console.log(`  Chunks executed: ${record.chunksExecuted}/${intent.numChunks}`);
  }

  // Check if next chunk is ready
  const isReady = isNextChunkReady(record);
  if (!isReady) {
    if (isFirstSeen) {
      const nextTime = new Date(record.nextExecution * 1000).toISOString();
      console.log(`Skipping - next chunk not ready until ${nextTime}`);
    }
    return;
  }

  // Log when we're actually processing a chunk (either first time or re-check)
  console.log(`\n=== TWAP Chunk Ready (Intent #${record.id}) ===`);
  console.log(`  Chunks executed: ${record.chunksExecuted}/${intent.numChunks}`);

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
