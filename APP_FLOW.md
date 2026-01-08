# Velox App Flow - Testing Guide

## Quick Start

### Prerequisites
- Node.js 18+
- Wallet with MOVE tokens (get from [faucet](https://faucet.testnet.movementnetwork.xyz/))

### Key Addresses
| Resource | Address |
|----------|---------|
| Velox Contract | `0x951cb360d9b1d4cb4834cf76e4fca0f63a85237874d8b2d45b3056439b91cbb7` |
| tUSDC | `0x194eede164d0a9ee0c8082ff82eebdf146b3936872c203cf9282cd54ea5287ce` |
| tMOVE | `0x626598b71b290f416b9e906dc3dfff337bf0364b3bf53b0bbb6ffab1c0dc373b` |
| Network | Movement Bardock Testnet (Chain ID: 250) |

---

## Terminal Setup (3 terminals)

### Terminal 1: Frontend
```bash
cd frontend
npm install
npm run dev
# Opens http://localhost:3001
```

### Terminal 2: Solver
```bash
cd solver-sdk
npm install

# Create .env file:
cat > .env << 'EOF'
RPC_URL=https://testnet.movementnetwork.xyz/v1
VELOX_ADDRESS=0x951cb360d9b1d4cb4834cf76e4fca0f63a85237874d8b2d45b3056439b91cbb7
SOLVER_PRIVATE_KEY=0x_YOUR_SOLVER_PRIVATE_KEY_HERE
POLLING_INTERVAL=10000
EOF

# Start solver
npm run dev
```

### Terminal 3: Utility Scripts
```bash
cd solver-sdk

# Mint test tokens to your wallet
npm run exec -- src/scripts/mint-tokens.ts

# Check balances
npm run exec -- src/scripts/check-balances.ts

# Submit test intents manually
npm run exec -- src/scripts/submit-swap.ts
npm run exec -- src/scripts/submit-twap.ts
npm run exec -- src/scripts/submit-dca.ts
```

---

## End-to-End Test Flow

### Step 1: Connect Wallet
1. Open http://localhost:3001
2. Click "Connect Wallet"
3. Choose Privy (email/social) or Native wallet (Nightly)
4. Approve connection - address shows on page

### Step 2: Get Test Tokens
Run in Terminal 3:
```bash
npm run exec -- src/scripts/mint-tokens.ts
```
Or use the faucet on Movement testnet.

### Step 3: Create Intent (Frontend)
1. Select intent type: **Swap** | Limit Order | TWAP | DCA
2. For Swap:
   - Input: tUSDC, Amount: 10
   - Output: tMOVE
   - Deadline: 10 minutes
3. Click "Submit Intent"
4. Confirm in dialog
5. Copy transaction hash

### Step 4: Verify Intent Created
- Go to http://localhost:3001/explorer
- See your intent in "Recent Intents"
- Status: **Pending**

### Step 5: Solver Fulfills Intent
Watch Terminal 2 (solver):
```
=== New Intent Detected ===
ID: 1
Type: Swap
User: 0x123...
Calculating solution...
Solution submitted: 0xabc...
```

### Step 6: Verify Settlement
- Refresh explorer page
- Intent status: **Filled**
- Solver address shown

### Step 7: Check Solver Stats
- Go to http://localhost:3001/solvers
- View global solver statistics
- Your solver shows fill count + volume

---

## Complete Application Flow

### Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                         USER FLOW                                │
├─────────────────────────────────────────────────────────────────┤
│  Connect Wallet → Select Intent Type → Fill Form → Submit       │
│        ↓                                                         │
│  [Privy/Native] → [Swap/Limit/DCA/TWAP] → [Tokens/Amounts] →    │
│        ↓                                                         │
│  Transaction signed → Intent created on-chain → Tokens escrowed │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                       SMART CONTRACTS                            │
├─────────────────────────────────────────────────────────────────┤
│  submission.move    → Creates IntentRecord, escrows tokens      │
│  scheduled.move     → Tracks TWAP/DCA execution schedule        │
│  auction.move       → Manages sealed-bid & Dutch auctions       │
│  settlement.move    → Fulfills intents, transfers tokens        │
│  solver_registry    → Tracks solver reputation & stakes         │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                        SOLVER FLOW                               │
├─────────────────────────────────────────────────────────────────┤
│  Poll pending intents → Calculate optimal solution →            │
│  Check profitability → Submit solution → Receive escrowed tokens│
└─────────────────────────────────────────────────────────────────┘
```

---

## Intent Types Reference

| Type | Description | Key Parameters |
|------|-------------|----------------|
| **Swap** | Immediate token exchange | amount_in, min_amount_out, deadline |
| **Limit Order** | Execute at specific price | limit_price, expiry, partial_fill |
| **TWAP** | Split order over time | num_chunks, interval_seconds |
| **DCA** | Periodic purchases | amount_per_period, total_periods |

---

## Testing Checklist

### Basic Flow
- [ ] Frontend runs on port 3001
- [ ] Wallet connects successfully
- [ ] Token balances display correctly
- [ ] Can create Swap intent
- [ ] Intent appears in explorer (Pending)
- [ ] Solver detects and processes intent
- [ ] Solver submits solution
- [ ] Intent status changes to Filled
- [ ] Solver stats update on dashboard
- [ ] Transaction links work on explorer

### Test All Intent Types
- [ ] Swap intent
- [ ] Limit Order (set price, check partial fill)
- [ ] TWAP (verify chunked execution)
- [ ] DCA (verify periodic execution)

### Solver Registration
- [ ] Navigate to /solvers
- [ ] Register solver with stake
- [ ] Verify solver appears in registry
- [ ] Complete intents, check reputation

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| "Wrong Network" | Switch wallet to Movement Bardock (250) |
| "Insufficient Balance" | Get MOVE from faucet |
| Intent not in explorer | Wait 10-30s for indexing |
| Solver not detecting | Check SOLVER_PRIVATE_KEY in .env |
| RPC rate limited | Add SHINAMI_KEY to .env |
| DCA/TWAP not executing | Wait for next_execution timestamp |

---

## File Structure

```
Velox/
├── contracts/sources/
│   ├── types.move          # Intent enums (Swap, Limit, DCA, TWAP)
│   ├── submission.move     # Intent creation & escrow
│   ├── settlement.move     # Intent fulfillment
│   ├── scheduled.move      # TWAP/DCA scheduling
│   ├── auction.move        # Sealed-bid & Dutch auctions
│   └── solver_registry.move # Solver reputation
│
├── frontend/
│   ├── app/
│   │   ├── page.tsx        # Home with intent forms
│   │   ├── solvers/        # Solver dashboard
│   │   ├── explorer/       # Intent explorer
│   │   ├── components/intent/  # Intent form components
│   │   └── hooks/          # Real-time data hooks
│   └── lib/velox/          # Contract interactions
│
└── solver-sdk/
    ├── src/
    │   ├── VeloxSolver.ts  # Main SDK class
    │   ├── examples/       # Solver implementations
    │   └── scripts/        # Testing scripts
    └── dist/               # Compiled JS
```

---

## Scripts Reference

```bash
# Solver SDK Scripts (run from solver-sdk/)
npm run dev                              # Run basic solver
npm run dev:advanced                     # Run advanced solver
npm run dev:dutch                        # Run dutch auction solver

npm run exec -- src/scripts/mint-tokens.ts         # Mint test tokens
npm run exec -- src/scripts/check-balances.ts      # Check wallet balance
npm run exec -- src/scripts/init-registry.ts       # Initialize solver registry
npm run exec -- src/scripts/submit-swap.ts         # Submit test swap
npm run exec -- src/scripts/submit-twap.ts         # Submit test TWAP
npm run exec -- src/scripts/submit-dca.ts          # Submit test DCA
npm run exec -- src/scripts/submit-dutch-auction.ts # Submit dutch auction
```

---

## Environment Variables

### Frontend (`frontend/.env.local`)
```env
NEXT_PUBLIC_PRIVY_APP_ID=your_privy_app_id  # Optional
NEXT_PUBLIC_SHINAMI_NODE_KEY=your_key       # Optional, for sponsored txs
```

### Solver SDK (`solver-sdk/.env`)
```env
RPC_URL=https://testnet.movementnetwork.xyz/v1
VELOX_ADDRESS=0x951cb360d9b1d4cb4834cf76e4fca0f63a85237874d8b2d45b3056439b91cbb7
SOLVER_PRIVATE_KEY=0x...
POLLING_INTERVAL=10000
SHINAMI_KEY=your_key                        # Optional, for reliability
```

---

## Key Contracts

| Module | Purpose | Key Functions |
|--------|---------|---------------|
| `submission` | Create intents | `submit_swap`, `submit_limit_order`, `submit_dca`, `submit_twap` |
| `settlement` | Fulfill intents | `solve_swap`, `solve_limit_order`, `solve_dca_period`, `solve_twap_chunk` |
| `scheduled` | Track timing | `register_twap`, `register_dca`, `is_ready_for_execution` |
| `auction` | Competition | `submit_solution`, `close_auction`, `accept_dutch_auction` |
| `solver_registry` | Reputation | `register_solver`, `update_reputation`, `get_solver_info` |

---

## Intent Lifecycle

```
Created → [Pending] → [PartiallyFilled] → [Filled]
                   ↘ [Cancelled]
                   ↘ [Expired]
```

## Fee Structure
- Protocol fee: 0.03% (3 basis points)
- Solver fee: 0.05% (5 basis points)
