# Velox - Intent-Based DEX on Movement

> **The first intent-based DEX leveraging Move 2.0's enum types for type-safe order expression.**

---

## Problem Statement

### The Broken State of DEX Trading

**1. Fragmented Liquidity & Poor Execution**
Traditional AMMs force users to manually route trades across multiple pools. This leads to:
- 0.5-3% slippage on medium-sized trades
- No price discovery mechanism
- Users accept whatever price the AMM offers

**2. MEV Extraction Drains User Value**
On Ethereum, MEV bots extract $500M+ annually from traders through:
- Sandwich attacks (front-running + back-running)
- Just-in-time liquidity attacks
- Transaction reordering

**3. Complex Strategies Require External Tools**
Want to DCA into a position? Execute a large trade over time (TWAP)? Set a limit order?
- Users must use centralized services or run their own bots
- External dependencies create security risks
- No native support on existing DEXs

**4. No Accountability for Execution Quality**
Who filled your order? How well did they perform? Was there a better option?
- Current DEXs provide zero transparency
- No mechanism to reward good execution
- No penalty for extractive behavior

---

## Solution: Velox

Velox introduces **intent-based trading** to Movement Network: users declare *what* they want, and competing solvers find the optimal *how*.

### Core Innovation: Declarative Trading

Instead of:
```
"Swap 100 USDC for ETH on Pool X at price Y"
```

Users simply declare:
```
"I want to swap 100 USDC for at least 0.05 ETH by 5:00 PM"
```

Solvers compete to fulfill this intent with the best execution.

### Four Intent Types

| Intent | Use Case | Example |
|--------|----------|---------|
| **Swap** | Instant exchange | "Swap 100 USDC → MOVE, min 50 MOVE" |
| **Limit Order** | Price-triggered | "Buy MOVE at 1.8 USDC or better" |
| **TWAP** | Large trades | "Sell 10K MOVE over 1 hour in 10 chunks" |
| **DCA** | Dollar-cost average | "Buy 100 USDC of MOVE every day for 30 days" |

### Multi-Solver Competition

```
User submits intent
        ↓
┌─────────────────────────────────┐
│     SOLVER AUCTION (400ms)      │
├─────────────────────────────────┤
│  Solver A: 52.3 MOVE output     │
│  Solver B: 51.8 MOVE output     │
│  Solver C: 52.1 MOVE output     │
└─────────────────────────────────┘
        ↓
Winner: Solver A (best output + reputation)
        ↓
User receives 52.3 MOVE
```

---

## Why Movement Network?

### 1. Move 2.0 Enum Type Safety

Velox is **only possible on Movement** because of Move 2.0's enum types:

```move
enum Intent has store, drop {
    Swap { input_token: address, output_token: address, amount_in: u64, min_amount_out: u64, deadline: u64 },
    LimitOrder { input_token: address, output_token: address, amount_in: u64, limit_price: u64, expiry: u64, partial_fill: bool },
    TWAP { input_token: address, output_token: address, total_amount: u64, num_chunks: u64, interval_seconds: u64, ... },
    DCA { input_token: address, output_token: address, amount_per_period: u64, total_periods: u64, interval_seconds: u64, ... }
}
```

**Why this matters:**
- Compile-time verification of intent structure
- Pattern matching ensures all cases handled
- Impossible to submit malformed intents
- No equivalent exists on EVM chains

### 2. Sub-Second Finality

| Metric | Movement | Ethereum | Solana |
|--------|----------|----------|--------|
| Block time | 200ms | 12s | 400ms |
| Intent settlement | ~400ms | ~60s | ~1s |
| Auction rounds | 1 | 3-5 | 1-2 |

**400ms auctions** mean:
- Faster solver competition
- Tighter spreads
- Real-time price discovery

### 3. High Throughput

Movement's **10,000+ TPS** enables:
- Many concurrent intents without congestion
- Solvers can batch multiple settlements
- TWAP/DCA execution at scale

---

## Technical Architecture

### System Overview

```
┌──────────────────────────────────────────────────────────────────┐
│                         FRONTEND                                  │
│  Next.js + Privy Wallet + shadcn/ui + Movement SDK               │
│  - Intent creation forms (Swap, Limit, DCA, TWAP)                │
│  - Real-time status tracking                                      │
│  - Solver dashboard & reputation display                          │
└──────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌──────────────────────────────────────────────────────────────────┐
│                      MOVE SMART CONTRACTS                         │
├──────────────────────────────────────────────────────────────────┤
│  types.move        │ Intent & Status enums (Move 2.0)            │
│  submission.move   │ Intent creation, escrow, cancellation       │
│  settlement.move   │ Solution execution, fee distribution        │
│  auction.move      │ Sealed-bid & Dutch auction engines          │
│  solver_registry   │ Reputation tracking, staking, slashing      │
│  scheduled.move    │ TWAP/DCA execution scheduler                │
└──────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌──────────────────────────────────────────────────────────────────┐
│                        SOLVER SDK                                 │
│  TypeScript + Aptos SDK + CoinGecko                              │
│  - Intent discovery & streaming                                   │
│  - Optimal route calculation                                      │
│  - Auction participation (sealed-bid + Dutch)                     │
│  - Reputation management                                          │
└──────────────────────────────────────────────────────────────────┘
```

### Smart Contract Modules (13 Total)

| Module | Lines | Purpose |
|--------|-------|---------|
| `types.move` | 575 | Move 2.0 enum definitions for intents & status |
| `submission.move` | 580 | Intent creation, token escrow, cancellation |
| `settlement.move` | 765 | Solution execution, atomic swaps, fee distribution |
| `auction.move` | 693 | Sealed-bid & Dutch auction mechanisms |
| `solver_registry.move` | 448 | Reputation system, staking, slashing |
| `scheduled.move` | 226 | TWAP/DCA time-based execution |
| `router.move` | 422 | Multi-DEX routing & price impact protection |
| `price_oracle.move` | 297 | Price feed management |
| `dex_adapter.move` | - | DEX integration adapter |
| `fees.move` | - | Fee collection & distribution |
| `errors.move` | - | Centralized error codes |
| `math.move` | - | Safe arithmetic utilities |
| `test_tokens.move` | - | tUSDC & tMOVE test tokens |

**Total: 5,500+ lines of Move code**

### Key Innovations

#### 1. On-Chain Solver Reputation

```move
struct SolverInfo has store {
    reputation_score: u64,        // 0-10000 basis points
    total_intents_solved: u64,
    successful_fills: u64,
    failed_fills: u64,
    total_volume: u128,
    average_slippage: u64,
    average_execution_time: u64,
    stake: u64                    // Slashable bond
}
```

**Reputation Mechanics:**
- +100 points per successful fill
- -200 points per failed fill
- -10 bps daily decay (prevents hoarding)
- 20% minimum threshold to participate
- Stake slashing for repeated failures

#### 2. Dual Auction System

**Sealed-Bid Auction:**
- Solvers submit secret bids
- Best solution wins (90% output, 10% reputation)
- Prevents collusion and front-running

**Dutch Auction:**
- Price decreases over time
- First solver to accept wins
- Built-in price discovery

#### 3. Atomic Escrow Settlement

```
Intent Created → Tokens Escrowed → Solver Wins Auction →
→ Solver Transfers Output → Escrow Released → Intent Filled
```

No partial execution risk. Funds are safe until settlement completes.

---

## Tech Stack

### Frontend
| Technology | Purpose |
|------------|---------|
| Next.js 16 | React framework with App Router |
| React 18 | UI library |
| Privy | Embedded wallet + social login |
| shadcn/ui + Radix | Component library |
| Tailwind CSS | Styling |
| Aptos SDK | Blockchain interactions |
| Shinami | Gas sponsorship (gasless UX) |

### Smart Contracts
| Technology | Purpose |
|------------|---------|
| Move 2.0 | Smart contract language |
| Aptos Framework | Core dependencies |
| Fungible Asset | Token standard |
| SmartTable | Scalable storage |

### Solver SDK
| Technology | Purpose |
|------------|---------|
| TypeScript | SDK language |
| Aptos SDK | Chain interactions |
| CoinGecko API | Price feeds |
| Shinami | Gas sponsorship |

---

## Business Model

### Revenue Streams

#### 1. Protocol Fees
```
Protocol Fee: 0.03% (3 basis points) per trade
```
- Collected on every settled intent
- Sustainable at scale: $1M volume = $300 revenue

#### 2. Premium Intent Types (Future)
- Advanced order types (stop-loss, trailing stop)
- Priority auction access
- Custom execution strategies

#### 3. Solver Licensing (Future)
- Enterprise solver SDK
- Dedicated support
- Custom integrations

### Fee Distribution

```
User Trade: 100 USDC → 52 MOVE

Protocol fee: 0.03% = 0.0156 MOVE
Solver fee:   0.05% = 0.026 MOVE
─────────────────────────────────
User receives: 51.96 MOVE
```

### Market Opportunity

| Metric | Current Market | Movement Opportunity |
|--------|----------------|---------------------|
| DEX Volume (daily) | $5B+ (all chains) | $10M+ potential |
| Intent Protocols | $500M+ (CoW, 1inch Fusion) | First mover on Movement |
| User Pain Point | MEV, poor execution | Direct solution |

---

## Competitive Analysis

### vs. Traditional AMMs (Uniswap, Yuzu)

| Feature | Velox | Traditional AMM |
|---------|-------|-----------------|
| Execution optimization | Solver competition | Fixed formula |
| MEV protection | Auction mechanism | None |
| Limit orders | Native | Not supported |
| TWAP/DCA | Native | External bots required |
| Price improvement | Yes (auction discovery) | No |

### vs. Other Intent Protocols

| Feature | Velox | CoW Protocol | 1inch Fusion |
|---------|-------|--------------|--------------|
| Chain | Movement | Ethereum | Ethereum |
| Settlement time | 400ms | 60s+ | 30s+ |
| Type safety | Move 2.0 enums | None | None |
| Solver reputation | On-chain | Off-chain | None |
| TWAP/DCA | Native | Not supported | Not supported |
| Dutch auctions | Yes | No | Yes |

### Competitive Moats

1. **Move 2.0 Exclusivity**: Enum-based intent safety impossible on EVM
2. **Speed Advantage**: Sub-second settlement vs. minute+ on Ethereum
3. **Reputation System**: Only intent protocol with on-chain solver accountability
4. **Comprehensive Orders**: TWAP + DCA + Limits in single protocol

---

## Roadmap

### Phase 1: Hackathon MVP (Complete)
- [x] Move 2.0 intent enums
- [x] Swap, Limit, DCA, TWAP intents
- [x] Sealed-bid & Dutch auctions
- [x] Solver reputation system
- [x] Frontend with Privy wallet
- [x] Solver SDK with examples
- [x] Testnet deployment

### Phase 2: Mainnet Launch (Q1 2025)
- [ ] Security audit
- [ ] Mainnet deployment
- [ ] Initial solver onboarding
- [ ] Marketing campaign
- [ ] $50K volume target

### Phase 3: Advanced Features (Q2 2025)
- [ ] Multi-hop routing optimization
- [ ] Cross-DEX aggregation
- [ ] Stop-loss & trailing stop orders
- [ ] API for institutional solvers
- [ ] Mobile app

### Phase 4: Ecosystem Growth (Q3-Q4 2025)
- [ ] Solver incentive program
- [ ] Governance token
- [ ] DAO transition
- [ ] Cross-chain intents (Movement ↔ Ethereum)
- [ ] $10M monthly volume target

---

## Traction & Metrics

### Hackathon Deliverables

| Metric | Target | Achieved |
|--------|--------|----------|
| Intent types | 4 | ✅ 4 (Swap, Limit, TWAP, DCA) |
| Smart contract modules | 10+ | ✅ 13 modules |
| Frontend components | 28+ | ✅ 30+ components |
| Solver strategies | 4 | ✅ 4 (basic, advanced, dutch, sealed-bid) |
| Lines of Move code | 3,000+ | ✅ 5,500+ lines |
| Testnet deployment | Yes | ✅ Movement Bardock |
| Gas sponsorship | Yes | ✅ Shinami integrated |

### Technical Achievements

- **First** intent-based DEX on Movement Network
- **First** protocol using Move 2.0 enums for order types
- **Only** DEX with on-chain solver reputation system
- **Only** DEX combining TWAP + DCA + Limits + Auctions natively
- **Only** Movement DEX with Shinami gas sponsorship for gasless UX

---

## Future Scope

### 1. Cross-Chain Intents
Extend intent model to bridge assets across chains:
```
Intent: "Swap 100 USDC on Ethereum for MOVE on Movement"
```
- LayerZero/Wormhole integration
- Cross-chain solver network
- Unified liquidity access

### 2. Conditional Intents
Complex order types with multiple triggers:
```
Intent: "If ETH drops below $3000, buy 1 ETH; else if above $4000, sell 0.5 ETH"
```
- Oracle integration
- Multi-condition logic
- Automated portfolio rebalancing

### 3. Solver Marketplace
- Specialized solvers (MEV protection, privacy, speed)
- Solver discovery and ratings
- Custom execution strategies

### 4. Institutional Features
- RFQ (Request for Quote) system
- Dark pool execution
- Compliance tools
- API-first access

### 5. Governance & Tokenomics
- VLX governance token
- Fee sharing with token holders
- Solver staking rewards
- Protocol-owned liquidity

---

## Why Velox Wins

### For Users
- **Better prices**: Solver competition finds optimal execution
- **Set and forget**: TWAP/DCA without external bots
- **MEV protection**: Auction mechanism prevents extraction
- **Simple UX**: Declare what you want, not how to get it

### For Solvers
- **Fair competition**: Transparent reputation system
- **Profitable**: 5 bps per trade, volume-based income
- **Accountable**: On-chain track record builds trust

### For Movement
- **Showcase project**: Demonstrates Move 2.0 capabilities
- **DeFi primitive**: Foundation for advanced trading
- **User acquisition**: Better DEX → more users

---

## Technical Differentiators Summary

| Innovation | Implementation | Impact |
|------------|----------------|--------|
| Move 2.0 Enums | Type-safe intent variants | Compile-time order validation |
| 400ms Auctions | Movement's sub-second finality | Tighter spreads, faster fills |
| On-Chain Reputation | SolverInfo struct with decay | Accountable, trusted execution |
| Dual Auctions | Sealed-bid + Dutch | Multiple price discovery mechanisms |
| Native Scheduling | scheduled.move module | TWAP/DCA without external services |
| Atomic Escrow | Escrow object pattern | Zero partial execution risk |

---

## Conclusion

Velox represents a paradigm shift in DEX design. By leveraging Movement's unique capabilities—Move 2.0 enums, sub-second finality, and high throughput—we've built the most sophisticated intent-based trading system on any blockchain.

**Users get better execution. Solvers get fair competition. Movement gets a killer app.**
