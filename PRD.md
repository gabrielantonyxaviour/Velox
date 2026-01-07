# PRD: Velox — Intent-Based DEX on Movement

## Track: Best New DeFi App

---

## Executive Summary

Velox is the first intent-based DEX leveraging Move 2.0's new enum types for type-safe order expression. Users declare *what* they want (swap, limit order, TWAP), and competing solvers fulfill intents optimally. Built on Movement's 10K+ TPS and sub-second finality.

---

## Problem Statement

Current DEX UX forces users to:
- Manually route trades across fragmented liquidity
- Accept slippage without knowing if better execution exists
- Execute complex strategies (DCA, TWAP) via external bots
- Trust MEV protection without verification

**Market Gap:** No Move-based chain has an intent architecture. Movement's Move 2.0 enums enable type-safe intent expression impossible on other chains.

---

## Solution Overview

### Core Concept
Users submit typed intents → Solvers compete to fill → Best execution wins → Settlement on Movement

### Move 2.0 Enum Innovation

```move
module velox::types {

    enum Intent has store, drop {
        // Simple swap with minimum output
        Swap {
            input_coin: address,
            output_coin: address,
            amount_in: u64,
            min_amount_out: u64,
            deadline: u64
        },

        // Limit order at specific price
        LimitOrder {
            input_coin: address,
            output_coin: address,
            amount: u64,
            price: u64,  // fixed-point
            expiry: u64,
            partial_fill: bool
        },

        // Time-weighted average price
        TWAP {
            input_coin: address,
            output_coin: address,
            total_amount: u64,
            chunks: u64,
            interval_seconds: u64,
            max_slippage_per_chunk: u64
        },

        // Dollar-cost average
        DCA {
            input_coin: address,
            output_coin: address,
            amount_per_period: u64,
            periods: u64,
            interval_seconds: u64
        },

        // Stop-loss / take-profit
        Conditional {
            input_coin: address,
            output_coin: address,
            amount: u64,
            trigger_price: u64,
            is_above: bool  // true = take-profit, false = stop-loss
        }
    }

    struct IntentSubmission has key {
        id: u64,
        user: address,
        intent: Intent,
        created_at: u64,
        status: IntentStatus,
        solver: Option<address>,
        execution_price: Option<u64>
    }

    enum IntentStatus has store, drop {
        Pending,
        PartiallyFilled { filled_amount: u64 },
        Filled,
        Cancelled,
        Expired
    }
}
```

---

## Technical Architecture

### System Components

```
┌─────────────────────────────────────────────────────────────┐
│                      User Interface                          │
│  (Next.js + Privy Embedded Wallet + Movement React SDK)     │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    Intent Submission                         │
│         (Move Module: velox::submission)               │
│  - Validates intent parameters                               │
│  - Locks user funds in escrow                               │
│  - Emits IntentCreated event                                │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    Solver Network                            │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐        │
│  │  Solver A   │  │  Solver B   │  │  Solver C   │        │
│  │  (Yuzu)     │  │  (Meridian) │  │  (Mosaic)   │        │
│  └─────────────┘  └─────────────┘  └─────────────┘        │
│         │                │                │                 │
│         └────────────────┼────────────────┘                 │
│                          ▼                                  │
│              Solution Submission                            │
│         (Within same block via FFS)                        │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                  Settlement Engine                           │
│         (Move Module: velox::settlement)               │
│  - Selects best solution (highest output for user)          │
│  - Executes atomic swap                                      │
│  - Releases funds from escrow                               │
│  - Distributes solver rewards                               │
└─────────────────────────────────────────────────────────────┘
```

### Move Modules Structure

```
sources/
├── types.move           # Intent enum definitions
├── submission.move      # Intent creation & escrow
├── settlement.move      # Solution selection & execution
├── solver_registry.move # Solver staking & reputation
├── auction.move         # Dutch auction for solver selection
└── fees.move            # Fee collection & distribution
```

### Solver Economics

| Action | Fee |
|--------|-----|
| User submits intent | 0% (free) |
| Solver fills intent | 0.05% of trade value |
| Protocol fee | 0.03% of trade value |
| Solver bond (slashed on failure) | 100 MOVE minimum stake |

### Data Flow

1. **User Action:** Creates intent via UI
2. **On-Chain:** Intent stored, funds escrowed
3. **Off-Chain:** Solvers monitor events via GraphQL indexer
4. **Solver Action:** Submit solutions within auction window (2 blocks ≈ 400ms)
5. **On-Chain:** Best solution selected, trade executed atomically
6. **Settlement:** User receives output, solver receives fee

---

## Feature Specifications

### MVP Features (Hackathon Scope)

| Feature | Priority | Complexity |
|---------|----------|------------|
| Swap intent type | P0 | Low |
| Limit order intent | P0 | Medium |
| Single solver (self-solving) | P0 | Low |
| Basic UI (swap + limit) | P0 | Medium |
| Privy wallet integration | P0 | Low |
| Intent status tracking | P0 | Low |

### Post-Hackathon Features

| Feature | Priority | Complexity |
|---------|----------|------------|
| TWAP intent type | P1 | Medium |
| DCA intent type | P1 | Medium |
| Multi-solver auction | P1 | High |
| Conditional orders | P2 | Medium |
| Solver reputation system | P2 | Medium |
| Cross-DEX routing | P2 | High |

---

## User Stories

### User: Trader
- **As a** trader, **I want to** submit a limit order without monitoring prices, **so that** I can set-and-forget my trades.
- **As a** trader, **I want to** see the best execution price before confirming, **so that** I know I'm getting fair value.
- **As a** trader, **I want to** cancel pending intents, **so that** I can change my strategy.

### User: Solver
- **As a** solver, **I want to** view all pending intents via API, **so that** I can identify profitable fills.
- **As a** solver, **I want to** stake MOVE to become eligible, **so that** I can earn fees.
- **As a** solver, **I want to** see my fill rate and earnings, **so that** I can optimize my strategy.

---

## Technical Requirements

### Smart Contract Requirements
- Move 2.0 compatible (enum support required)
- Movement Testnet deployment
- Formal verification via Move Prover for critical paths
- Event emission for all state changes

### Frontend Requirements
- Next.js 14+ with App Router
- Movement React Template as base
- Privy for wallet connection + social login
- Real-time updates via WebSocket/GraphQL subscriptions
- Mobile-responsive design

### Backend Requirements
- GraphQL indexer for intent monitoring
- Solver SDK (TypeScript) for integration
- Price feed integration (Pyth/Switchboard)

---

## Success Metrics

| Metric | Target (Hackathon) | Target (30 days post-launch) |
|--------|-------------------|------------------------------|
| Intents submitted | 100+ | 10,000+ |
| Unique users | 50+ | 1,000+ |
| Total volume | $10,000+ | $1M+ |
| Fill rate | >90% | >95% |
| Avg execution improvement vs AMM | >0.1% | >0.3% |

---

## Competitive Analysis

| Protocol | Chain | Intent Types | Move 2.0 Enums | Sub-second Finality |
|----------|-------|--------------|----------------|---------------------|
| CoW Protocol | Ethereum | Yes | No | No |
| 1inch Fusion | Multi-EVM | Yes | No | No |
| Jupiter | Solana | Limited | No | Yes |
| **Velox** | **Movement** | **Yes** | **Yes** | **Yes** |

---

## Risk Assessment

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| No solver adoption | Medium | High | Self-solve all intents in MVP |
| Move 2.0 bugs | Low | High | Extensive testnet testing |
| Poor UX | Medium | Medium | User testing, iterate fast |
| Low liquidity | Medium | Medium | Integrate existing DEXs (Yuzu, Meridian) |

---

## Development Timeline

### Week 1: Core Contracts
- [ ] Intent enum definitions
- [ ] Submission module with escrow
- [ ] Basic settlement (self-solve)
- [ ] Deploy to testnet

### Week 2: Frontend + Integration
- [ ] Next.js app with Privy
- [ ] Swap intent UI
- [ ] Limit order UI
- [ ] Transaction status tracking

### Week 3: Polish + Demo
- [ ] Solver SDK
- [ ] Documentation
- [ ] Demo video
- [ ] Pitch deck

### Week 4: Buffer + Submission
- [ ] Bug fixes
- [ ] Performance optimization
- [ ] Hackathon submission

---

## Revenue Model

### Phase 1: Protocol Fees
- 0.03% on all settled intents
- At $1M monthly volume = $300/month

### Phase 2: Solver Subscriptions
- Premium solver features (priority, analytics)
- $99/month per solver

### Phase 3: Intent-as-a-Service
- White-label intent infrastructure for other dApps
- Revenue share model

---

## Appendix

### Resources
- [Movement Developer Portal](https://developer.movementnetwork.xyz/)
- [Move 2.0 Documentation](https://docs.movementnetwork.xyz/)
- [Privy Integration Guide](https://docs.privy.io/)
- [CoW Protocol (Reference)](https://cow.fi/)

### Team Requirements
- 1 Move developer (smart contracts)
- 1 Full-stack developer (frontend + backend)
- 1 Designer (optional but helpful)
