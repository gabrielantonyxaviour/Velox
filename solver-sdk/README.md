# Velox Solver SDK

TypeScript SDK for building solvers on the Velox intent-based DEX on Movement.

## Installation

```bash
npm install @velox/solver-sdk
```

## Quick Start

```typescript
import { VeloxSolver, Intent } from '@velox/solver-sdk';

const solver = new VeloxSolver({
  rpcUrl: 'https://testnet.movementnetwork.xyz/v1',
  veloxAddress: '0x...',
  privateKey: process.env.SOLVER_PRIVATE_KEY,
});

// Listen for new intents
solver.startIntentStream(async (intent: Intent) => {
  console.log(`New intent: ${intent.id}`);

  // Calculate optimal solution
  const solution = await solver.calculateOptimalSolution(intent);

  // Submit solution
  const result = await solver.submitSolution(solution);
  console.log(`Submitted: ${result.txHash}`);
});
```

## Features

- Intent discovery and streaming
- Solution calculation and submission
- Built-in strategies (Arbitrage, Market Maker)
- Gas estimation utilities
- GraphQL support for faster queries

## Configuration

```typescript
interface VeloxSolverConfig {
  rpcUrl: string;          // Movement RPC endpoint
  veloxAddress: string;    // Velox contract address
  privateKey?: string;     // Solver private key
  graphqlUrl?: string;     // Optional GraphQL endpoint
  pollingInterval?: number; // Polling interval in ms (default: 1000)
}
```

## Strategies

### ArbitrageStrategy

Looks for profitable swap opportunities:

```typescript
import { ArbitrageStrategy } from '@velox/solver-sdk';

const strategy = new ArbitrageStrategy(10); // 10 bps min profit
```

### MarketMakerStrategy

Provides liquidity and captures spread:

```typescript
import { MarketMakerStrategy } from '@velox/solver-sdk';

const strategy = new MarketMakerStrategy(
  50,              // 50 bps spread
  1000000000000n   // max exposure
);
```

### Custom Strategy

```typescript
import { BaseStrategy, Intent, Solution, VeloxSolver } from '@velox/solver-sdk';

class MyStrategy extends BaseStrategy {
  name = 'MyStrategy';

  canHandle(intent: Intent): boolean {
    return intent.type === IntentType.SWAP;
  }

  async calculateSolution(
    intent: Intent,
    solver: VeloxSolver
  ): Promise<Solution | null> {
    // Your logic here
  }
}
```

## API Reference

### VeloxSolver

#### Methods

- `getPendingIntents()`: Get all pending intents
- `getIntent(id)`: Get intent by ID
- `startIntentStream(callback)`: Start listening for intents
- `stopIntentStream()`: Stop listening
- `submitSolution(solution)`: Submit a solution
- `executeSettlement(intentId)`: Execute settlement
- `calculateOptimalSolution(intent)`: Calculate optimal output
- `getSolverStats(address?)`: Get solver statistics

### Types

```typescript
interface Intent {
  id: string;
  type: IntentType;
  user: string;
  inputToken: TokenInfo;
  outputToken: TokenInfo;
  inputAmount: bigint;
  minOutputAmount?: bigint;
  deadline: Date;
  status: IntentStatus;
}

interface Solution {
  intentId: string;
  outputAmount: bigint;
  executionPrice: bigint;
  route?: SwapRoute;
  expiresAt: Date;
}
```

## Environment Variables

```bash
RPC_URL=https://testnet.movementnetwork.xyz/v1
VELOX_ADDRESS=0x...
SOLVER_PRIVATE_KEY=0x...
MIN_PROFIT_BPS=10
MAX_CONCURRENT=5
```

## Running Examples

```bash
# Basic solver
npm run dev

# Advanced solver with strategies
npm run dev:advanced
```

## License

MIT
