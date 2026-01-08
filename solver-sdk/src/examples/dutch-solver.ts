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
    pollingInterval: 500, // Faster polling for Dutch auctions
    skipExistingOnStartup: true,
  });

  console.log('Starting Velox Dutch Auction Solver...');
  console.log('Listening for Dutch auctions...\n');

  // Handle errors
  solver.on('error', (error) => {
    console.error('Solver error:', error.message);
  });

  // Listen for new intents - check all SWAP intents for Dutch auctions
  solver.startIntentStream(async (intent: Intent) => {
    // Only handle SWAP intents that might have Dutch auctions
    if (intent.type !== IntentType.SWAP) {
      console.log(`Skipping intent ${intent.id} - not a SWAP type`);
      return;
    }

    // Check if this intent has a Dutch auction associated with it
    const dutch = await solver.getDutchAuction(intent.id);
    if (!dutch || !dutch.isActive) {
      console.log(`Skipping intent ${intent.id} - no active Dutch auction`);
      return;
    }

    console.log(`\n=== New Dutch Auction Intent ===`);
    console.log(`ID: ${intent.id}`);
    console.log(`Type: ${intent.type}`);
    console.log(`User: ${intent.user}`);
    console.log(`Input: ${intent.inputAmount} ${intent.inputToken.address}`);
    console.log(`Output Token: ${intent.outputToken.address}`);

    try {
      await handleDutchAuction(solver, intent, dutch);
    } catch (error) {
      console.error('Error handling Dutch auction:', (error as Error).message);
    }
  });

  // Handle graceful shutdown
  process.on('SIGINT', () => {
    console.log('\nShutting down Dutch solver...');
    solver.stopIntentStream();
    process.exit(0);
  });

  process.on('SIGTERM', () => {
    solver.stopIntentStream();
    process.exit(0);
  });
}

async function handleDutchAuction(solver: VeloxSolver, intent: Intent, dutch: NonNullable<Awaited<ReturnType<typeof solver.getDutchAuction>>>): Promise<void> {
  console.log(`\n=== Dutch Auction Details ===`);
  console.log(`Start Price: ${dutch.startPrice}`);
  console.log(`End Price: ${dutch.endPrice}`);
  console.log(`Duration: ${dutch.duration}s`);
  console.log(`Is Active: ${dutch.isActive}`);

  if (!dutch.isActive) {
    console.log('Auction no longer active');
    return;
  }

  // Get current price
  const currentPrice = await solver.getDutchPrice(intent.id);
  console.log(`Current Price: ${currentPrice}`);

  // Calculate our max acceptable price
  // Strategy: Accept at any price in the lower 25% of the range
  const priceRange = dutch.startPrice - dutch.endPrice;
  const maxPrice = dutch.endPrice + (priceRange / 4n);
  console.log(`Max Acceptable Price: ${maxPrice}`);

  // Check if we should accept now or wait
  if (currentPrice <= maxPrice) {
    console.log(`\nPrice acceptable! Accepting immediately...`);
    await acceptAndSettle(solver, intent.id, currentPrice);
  } else {
    console.log(`\nPrice too high. Monitoring for price drop...`);

    // Calculate time to wait
    const timeToPrice = solver.calculateTimeToPrice(dutch, maxPrice);
    console.log(`Estimated time to target: ${timeToPrice}s`);

    // Monitor and accept when price reaches threshold
    const result = await solver.monitorAndAcceptDutch(
      intent.id,
      maxPrice,
      500 // Poll every 500ms
    );

    if (result) {
      console.log(`\n=== Won Dutch Auction! ===`);
      console.log(`Accept TX: ${result.txHash}`);
      console.log(`Accepted Price: ${result.price}`);

      // Settle the auction
      await settleAuction(solver, intent.id);
    } else {
      console.log(`Failed to win auction (likely outbid)`);
    }
  }
}

async function acceptAndSettle(
  solver: VeloxSolver,
  intentId: string,
  price: bigint
): Promise<void> {
  const acceptResult = await solver.acceptDutchAuction(intentId);

  if (acceptResult.success) {
    console.log(`Accept TX: ${acceptResult.txHash}`);
    console.log(`Accepted Price: ${price}`);
    await settleAuction(solver, intentId);
  } else {
    console.log(`Failed to accept: ${acceptResult.error}`);
  }
}

async function settleAuction(solver: VeloxSolver, intentId: string): Promise<void> {
  console.log('\nSettling auction...');
  const settleResult = await solver.settleDutchAuction(intentId);

  if (settleResult.success) {
    console.log(`\n=== Auction Settled Successfully! ===`);
    console.log(`Settle TX: ${settleResult.txHash}`);
  } else {
    console.log(`\n=== Settlement Failed ===`);
    console.log(`Error: ${settleResult.error}`);
  }
}

main().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});
