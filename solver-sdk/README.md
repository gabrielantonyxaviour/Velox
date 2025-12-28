# Velox Solver SDK

TypeScript SDK for running intent solvers on the Velox DEX on Movement Network.

## Overview

Velox is the first intent-based DEX on Movement, leveraging Move 2.0's enum types for type-safe order expression. Solvers compete to fulfill user intents (swaps, limit orders, TWAP, DCA) with optimal execution.

This SDK allows anyone to run a solver instance by:
1. Registering as a solver on the Velox UI (stake required)
2. Configuring the SDK with your wallet's private key
3. Running the solver to automatically listen for and fill intents

## Quick Start

### Installation

```bash
npm install @velox-movement/solver
```

### 1. Register as a Solver

Before running the SDK, you must register your wallet as a solver:

1. Go to [Velox UI](https://velox.movementlabs.xyz)
2. Connect your wallet
3. Navigate to **"Become a Solver"**
4. Stake the minimum required amount (1,000,000 units)
5. Your wallet is now registered!

### 2. Generate Configuration

```bash
npx velox-solver init
```

This creates a `.env` file with all available configuration options.

### 3. Configure Your Solver

Edit the `.env` file:

```bash
# Required
RPC_URL=https://testnet.movementnetwork.xyz/v1
VELOX_ADDRESS=0x94d017d8d944702a976af2844bdf3534b946e712cad286610aef5969568ba470
SOLVER_PRIVATE_KEY=your_registered_wallet_private_key

# Optional - customize solver behavior
MIN_PROFIT_BPS=10
SPREAD_BPS=10
ENABLE_SWAP=true
ENABLE_LIMIT_ORDER=true
ENABLE_TWAP=true
ENABLE_DCA=true
```

### 4. Start Your Solver

```bash
npx velox-solver start
```

## CLI Commands

```bash
# Start the solver
npx velox-solver start

# Start with options
npx velox-solver start --dry-run              # Simulate without transactions
npx velox-solver start --skip-registration-check
npx velox-solver start -v                     # Verbose logging
npx velox-solver start -c ./config/.env.prod  # Custom config file

# Check solver status and stats
npx velox-solver status

# Validate configuration
npx velox-solver check-config

# Generate config template
npx velox-solver init
npx velox-solver init -o .env.production
```

## Configuration Reference

### Required Variables

| Variable | Description |
|----------|-------------|
| `RPC_URL` | Movement RPC endpoint |
| `VELOX_ADDRESS` | Velox contract address |
| `SOLVER_PRIVATE_KEY` | Your registered solver wallet private key |

### Network Options

| Variable | Default | Description |
|----------|---------|-------------|
| `GRAPHQL_URL` | - | GraphQL endpoint for faster queries |
| `SHINAMI_KEY` | - | Shinami Node Service API key |

### Solver Behavior

| Variable | Default | Description |
|----------|---------|-------------|
| `POLLING_INTERVAL` | 5000 | Intent polling interval (ms) |
| `SKIP_EXISTING` | true | Skip existing intents on startup |
| `MAX_CONCURRENT` | 5 | Max concurrent intent processing |
| `DRY_RUN` | false | Simulate without submitting transactions |

### Intent Types

| Variable | Default | Description |
|----------|---------|-------------|
| `ENABLE_SWAP` | true | Handle swap intents |
| `ENABLE_LIMIT_ORDER` | true | Handle limit orders |
| `ENABLE_TWAP` | true | Handle TWAP intents |
| `ENABLE_DCA` | true | Handle DCA intents |
| `ENABLE_SEALED_BID_AUCTION` | true | Participate in sealed-bid auctions |
| `ENABLE_DUTCH_AUCTION` | true | Participate in Dutch auctions |

### Intent Filtering

| Variable | Default | Description |
|----------|---------|-------------|
| `MIN_INPUT_AMOUNT` | 0 | Minimum input amount to consider |
| `MAX_INPUT_AMOUNT` | u64 max | Maximum input amount to consider |
| `INPUT_TOKEN_WHITELIST` | - | Comma-separated input token addresses |
| `OUTPUT_TOKEN_WHITELIST` | - | Comma-separated output token addresses |

### Profitability

| Variable | Default | Description |
|----------|---------|-------------|
| `MIN_PROFIT_BPS` | 10 | Minimum profit margin (basis points) |
| `SPREAD_BPS` | 10 | Spread for solver margin (basis points) |
| `MAX_GAS_PRICE` | 1000 | Maximum gas price (octas) |
| `MIN_DEADLINE_SECONDS` | 30 | Skip intents with less time to deadline |

### Limit Orders

| Variable | Default | Description |
|----------|---------|-------------|
| `LIMIT_ORDER_CHECK_INTERVAL` | 15000 | Price check interval (ms) |
| `ENABLE_PARTIAL_FILLS` | true | Enable partial fills |

### Scheduled Intents (DCA/TWAP)

| Variable | Default | Description |
|----------|---------|-------------|
| `MONITOR_SCHEDULED` | true | Monitor scheduled intents |
| `SCHEDULED_CHECK_INTERVAL` | 5000 | Check interval for scheduled readiness (ms) |

### Auction Strategies

| Variable | Default | Description |
|----------|---------|-------------|
| `DUTCH_AUCTION_STRATEGY` | moderate | conservative, moderate, or aggressive |
| `DUTCH_MAX_PRICE_PERCENT` | 102 | Max price as % of market price |
| `SEALED_BID_STRATEGY` | moderate | conservative, moderate, or aggressive |

### Logging & Monitoring

| Variable | Default | Description |
|----------|---------|-------------|
| `LOG_LEVEL` | info | debug, info, warn, or error |
| `COLORED_OUTPUT` | true | Enable colored console output |
| `WEBHOOK_URL` | - | Notification webhook URL |
| `ENABLE_METRICS` | false | Enable Prometheus metrics |
| `METRICS_PORT` | 9090 | Metrics endpoint port |

## Programmatic Usage

You can also use the SDK programmatically in your own applications:

```typescript
import { VeloxSolver, SolverConfig, Intent, IntentType } from '@velox-movement/solver';

// Create config from environment or manually
const config = SolverConfig.fromEnv();
// OR
const config = new SolverConfig({
  rpcUrl: 'https://testnet.movementnetwork.xyz/v1',
  veloxAddress: '0x...',
  privateKey: process.env.SOLVER_PRIVATE_KEY!,
  minProfitBps: 10,
  spreadBps: 10,
});

// Create solver instance
const solver = new VeloxSolver({
  rpcUrl: config.rpcUrl,
  veloxAddress: config.veloxAddress,
  privateKey: config.privateKey,
  pollingInterval: config.pollingInterval,
  skipExistingOnStartup: config.skipExistingOnStartup,
});

// Listen for new intents
solver.startIntentStream(async (intent: Intent) => {
  console.log(`New intent: ${intent.id} (${IntentType[intent.type]})`);

  // Calculate optimal solution
  const solution = await solver.calculateOptimalSolution(intent);

  // Check if profitable
  if (intent.minOutputAmount && solution.outputAmount < intent.minOutputAmount) {
    console.log('Cannot meet minimum output');
    return;
  }

  // Fill the intent
  const result = await solver.solveSwap(intent.id, solution.outputAmount);

  if (result.success) {
    console.log(`Filled! TX: ${result.txHash}`);
  }
});

// Graceful shutdown
process.on('SIGINT', () => {
  solver.stopIntentStream();
  process.exit(0);
});
```

## Intent Types

### Swap
Basic token swap with minimum output protection.

```typescript
await solver.solveSwap(intentId, outputAmount);
```

### Limit Order
Execute at specified price or better, supports partial fills.

```typescript
const { canFill, outputAmount } = await solver.canFillLimitOrder(intent);
if (canFill) {
  await solver.solveLimitOrder(intentId, fillAmount, outputAmount);
}
```

### TWAP (Time-Weighted Average Price)
Large orders split into chunks over time.

```typescript
const isReady = await solver.isTWAPChunkReady(intentId);
if (isReady) {
  await solver.solveTWAPChunk(intentId, outputAmount);
}
```

### DCA (Dollar-Cost Averaging)
Periodic buys over time.

```typescript
const isReady = await solver.isDCAPeriodReady(intentId);
if (isReady) {
  await solver.solveDCAPeriod(intentId, outputAmount);
}
```

## Auction Mechanisms

### Sealed-Bid Auction
Multiple solvers submit bids, best wins.

```typescript
// Submit bid
await solver.submitBid(intentId, outputAmount, executionPrice);

// Monitor and settle if won
const result = await solver.monitorAndSettleAuction(intentId);
```

### Dutch Auction
Price descends until a solver accepts.

```typescript
// Check current price
const price = await solver.getDutchPrice(intentId);

// Accept at current price
await solver.acceptDutchAuction(intentId);

// Settle
await solver.settleDutchAuction(intentId);
```

## Custom Strategies

Extend `BaseStrategy` to create custom solving strategies:

```typescript
import { BaseStrategy, Intent, Solution, VeloxSolver, IntentType } from '@velox-movement/solver';

class MyStrategy extends BaseStrategy {
  name = 'MyCustomStrategy';

  canHandle(intent: Intent): boolean {
    // Only handle swaps above 1000 units
    return intent.type === IntentType.SWAP && intent.inputAmount > BigInt(1000);
  }

  async calculateSolution(intent: Intent, solver: VeloxSolver): Promise<Solution | null> {
    // Your custom logic here
    const route = await solver.findBestRoute(
      intent.inputToken.address,
      intent.outputToken.address,
      intent.inputAmount
    );

    // Apply custom spread
    const outputWithSpread = route.expectedOutput * BigInt(9990) / BigInt(10000);

    return {
      intentId: intent.id,
      outputAmount: outputWithSpread,
      executionPrice: this.calculatePrice(intent, outputWithSpread),
      route,
      expiresAt: new Date(Date.now() + 60000),
    };
  }
}
```

## Solver Economics

### Fees
- **Protocol Fee**: 3 bps (collected from input tokens)
- **Solver Margin**: Determined by spread (difference between market price and offered price)

### Reputation System
- **Starting Reputation**: 5000/10000 (50%)
- **Minimum to Participate**: 2000/10000 (20%)
- **Success Bonus**: +100 per fill
- **Failure Penalty**: -200 per fail
- **Fast Execution Bonus**: +50 (fills < 5 seconds)
- **Better-than-expected Bonus**: +25

### Staking
- **Minimum Stake**: 1,000,000 units
- **Unstaking Cooldown**: 7 days

## Development

```bash
# Clone and install
git clone https://github.com/velox-protocol/solver-sdk
cd solver-sdk
npm install

# Run in development mode
npm run dev

# Run with custom config
npm run solver:start

# Check status
npm run solver:status

# Build for production
npm run build
```

## Support

- **Documentation**: [https://docs.velox.movementlabs.xyz](https://docs.velox.movementlabs.xyz)
- **Discord**: [Join our Discord](https://discord.gg/velox)
- **Issues**: [GitHub Issues](https://github.com/velox-protocol/solver-sdk/issues)

## License

MIT
