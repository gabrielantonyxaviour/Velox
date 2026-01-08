import 'dotenv/config';
import { VeloxSolver } from '../VeloxSolver';
import { Intent, IntentType, AuctionStatus } from '../types/intent';

async function main() {
  const solver = new VeloxSolver({
    rpcUrl: process.env.RPC_URL || 'https://testnet.movementnetwork.xyz/v1',
    veloxAddress:
      process.env.VELOX_ADDRESS ||
      '0x951cb360d9b1d4cb4834cf76e4fca0f63a85237874d8b2d45b3056439b91cbb7',
    privateKey: process.env.SOLVER_PRIVATE_KEY,
    pollingInterval: 5000, // 5 seconds to avoid rate limiting
    skipExistingOnStartup: true,
  });

  console.log('Starting Velox Sealed Bid Auction Solver...');
  console.log('Listening for sealed bid auctions...\n');

  // Handle errors
  solver.on('error', (error) => {
    console.error('Solver error:', error.message);
  });

  // Listen for new intents - check all SWAP intents for sealed bid auctions
  solver.startIntentStream(async (intent: Intent) => {
    // Only handle SWAP intents that might have sealed bid auctions
    if (intent.type !== IntentType.SWAP) {
      console.log(`Skipping intent ${intent.id} - not a SWAP type`);
      return;
    }

    // Check if this intent has a sealed bid auction
    const hasAuction = await solver.isSealedBidAuctionActive(intent.id);
    if (!hasAuction) {
      console.log(`Skipping intent ${intent.id} - no active sealed bid auction`);
      return;
    }

    console.log(`\n=== New Sealed Bid Auction Intent ===`);
    console.log(`ID: ${intent.id}`);
    console.log(`Type: ${intent.type}`);
    console.log(`User: ${intent.user}`);
    console.log(`Input: ${intent.inputAmount} ${intent.inputToken.address}`);
    console.log(`Output Token: ${intent.outputToken.address}`);

    try {
      await handleSealedBidAuction(solver, intent);
    } catch (error) {
      console.error('Error handling sealed bid auction:', (error as Error).message);
    }
  });

  // Handle graceful shutdown
  process.on('SIGINT', () => {
    console.log('\nShutting down sealed bid solver...');
    solver.stopIntentStream();
    process.exit(0);
  });

  process.on('SIGTERM', () => {
    solver.stopIntentStream();
    process.exit(0);
  });
}

async function handleSealedBidAuction(solver: VeloxSolver, intent: Intent): Promise<void> {
  // Get auction details
  const auction = await solver.getSealedBidAuction(intent.id);
  if (!auction) {
    console.log('Could not get auction details');
    return;
  }

  console.log(`\n=== Sealed Bid Auction Details ===`);
  console.log(`Start Time: ${new Date(Number(auction.startTime) * 1000).toISOString()}`);
  console.log(`End Time: ${new Date(Number(auction.endTime) * 1000).toISOString()}`);
  console.log(`Status: ${auction.status}`);
  console.log(`Solutions submitted: ${auction.solutionCount}`);

  const timeRemaining = await solver.getAuctionTimeRemaining(intent.id);
  console.log(`Time remaining: ${timeRemaining} seconds`);

  // If auction is already completed or cancelled, skip
  if (auction.status === AuctionStatus.COMPLETED) {
    console.log('Auction already completed');
    return;
  }
  if (auction.status === AuctionStatus.CANCELLED) {
    console.log('Auction was cancelled');
    return;
  }

  // Calculate our bid
  console.log('\nCalculating optimal bid...');
  const solution = await solver.calculateOptimalSolution(intent);

  // Add a small premium to our bid to be competitive (extra 0.5% output)
  const premiumOutput = (solution.outputAmount * BigInt(1005)) / BigInt(1000);

  console.log(`Our bid:`);
  console.log(`  Base Output: ${solution.outputAmount}`);
  console.log(`  With Premium: ${premiumOutput}`);
  console.log(`  Execution Price: ${solution.executionPrice}`);

  // Check minimum output
  if (intent.minOutputAmount && premiumOutput < intent.minOutputAmount) {
    console.log(`Skipping - cannot meet minimum output even with premium`);
    console.log(`  Min required: ${intent.minOutputAmount}`);
    console.log(`  We can provide: ${premiumOutput}`);
    return;
  }

  // Submit our bid
  console.log('\nSubmitting bid to auction...');
  const bidResult = await solver.submitBid(
    intent.id,
    premiumOutput,
    solution.executionPrice
  );

  if (!bidResult.success) {
    console.log(`Failed to submit bid: ${bidResult.error}`);
    return;
  }

  console.log(`\n=== Bid Submitted Successfully! ===`);
  console.log(`TX Hash: ${bidResult.txHash}`);
  console.log(`Output Amount: ${premiumOutput}`);
  console.log(`\nWaiting for auction to complete (${timeRemaining}s remaining)...`);

  // Monitor auction and settle if we win
  const settleResult = await solver.monitorAndSettleAuction(intent.id, 2000);

  if (settleResult) {
    console.log(`\n=== Won Auction & Settled Successfully! ===`);
    console.log(`Settle TX: ${settleResult.txHash}`);
    console.log(`Intent ${intent.id} fulfilled!`);
  } else {
    console.log(`\n=== Did not win the auction ===`);
    console.log(`Another solver had a better bid`);
  }
}

main().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});
