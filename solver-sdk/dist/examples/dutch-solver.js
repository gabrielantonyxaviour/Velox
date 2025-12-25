"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const VeloxSolver_1 = require("../VeloxSolver");
const intent_1 = require("../types/intent");
const cliStyle_1 = require("../utils/cliStyle");
async function main() {
    // Beautiful startup banner
    (0, cliStyle_1.printVeloxLogo)();
    (0, cliStyle_1.printSection)('💎 VELOX DUTCH AUCTION SOLVER');
    console.log('');
    (0, cliStyle_1.printKeyValue)('⏱️  Polling Interval', '5,000ms (5 seconds)');
    (0, cliStyle_1.printKeyValue)('🎯 Auction Type', 'Dutch (Descending Price)');
    (0, cliStyle_1.printKeyValue)('⏭️  Skip Existing Intents', 'ENABLED');
    console.log('');
    const solver = new VeloxSolver_1.VeloxSolver({
        rpcUrl: process.env.RPC_URL || 'https://testnet.movementnetwork.xyz/v1',
        veloxAddress: process.env.VELOX_ADDRESS ||
            '0x94d017d8d944702a976af2844bdf3534b946e712cad286610aef5969568ba470',
        privateKey: process.env.SOLVER_PRIVATE_KEY,
        pollingInterval: 5000, // 5 seconds to avoid rate limiting
        skipExistingOnStartup: true,
    });
    // Handle errors
    solver.on('error', (error) => {
        console.error('\n  ❌ Solver error:', error.message);
    });
    // Listen for new intents - validates registration before starting
    // Check all SWAP intents for Dutch auctions
    await solver.startIntentStream(async (intent) => {
        // Only handle SWAP intents that might have Dutch auctions
        if (intent.type !== intent_1.IntentType.SWAP) {
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
        }
        catch (error) {
            console.error('Error handling Dutch auction:', error.message);
        }
    });
    // Handle graceful shutdown
    process.on('SIGINT', () => {
        console.log('\n');
        console.log('╔' + '═'.repeat(78) + '╗');
        console.log('║' + '  ⏹️  Shutting down Dutch auction solver...'.padEnd(78) + '║');
        console.log('╚' + '═'.repeat(78) + '╝');
        solver.stopIntentStream();
        process.exit(0);
    });
    process.on('SIGTERM', () => {
        console.log('\n');
        console.log('╔' + '═'.repeat(78) + '╗');
        console.log('║' + '  ⏹️  Terminating Dutch auction solver...'.padEnd(78) + '║');
        console.log('╚' + '═'.repeat(78) + '╝');
        solver.stopIntentStream();
        process.exit(0);
    });
}
async function handleDutchAuction(solver, intent, dutch) {
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
    }
    else {
        console.log(`\nPrice too high. Monitoring for price drop...`);
        // Calculate time to wait
        const timeToPrice = solver.calculateTimeToPrice(dutch, maxPrice);
        console.log(`Estimated time to target: ${timeToPrice}s`);
        // Monitor and accept when price reaches threshold
        const result = await solver.monitorAndAcceptDutch(intent.id, maxPrice, 500 // Poll every 500ms
        );
        if (result) {
            console.log(`\n=== Won Dutch Auction! ===`);
            console.log(`Accept TX: ${result.txHash}`);
            console.log(`Accepted Price: ${result.price}`);
            // Settle the auction
            await settleAuction(solver, intent.id);
        }
        else {
            console.log(`Failed to win auction (likely outbid)`);
        }
    }
}
async function acceptAndSettle(solver, intentId, price) {
    const acceptResult = await solver.acceptDutchAuction(intentId);
    if (acceptResult.success) {
        console.log(`Accept TX: ${acceptResult.txHash}`);
        console.log(`Accepted Price: ${price}`);
        await settleAuction(solver, intentId);
    }
    else {
        console.log(`Failed to accept: ${acceptResult.error}`);
    }
}
async function settleAuction(solver, intentId) {
    console.log('\nSettling auction...');
    const settleResult = await solver.settleDutchAuction(intentId);
    if (settleResult.success) {
        console.log(`\n=== Auction Settled Successfully! ===`);
        console.log(`Settle TX: ${settleResult.txHash}`);
    }
    else {
        console.log(`\n=== Settlement Failed ===`);
        console.log(`Error: ${settleResult.error}`);
    }
}
main().catch((error) => {
    console.error('Fatal error:', error);
    process.exit(1);
});
//# sourceMappingURL=dutch-solver.js.map