# Velox - Intent-Based DEX on Movement

Velox is the first intent-based DEX leveraging Move 2.0's enum types for type-safe order expression. Users declare what they want (swap, limit order, TWAP), and competing solvers fulfill intents optimally. Built on Movement's 10K+ TPS and sub-second finality.

---

## Starter Kits

**This project uses these starter templates:**

| Component | Starter Kit | URL |
|-----------|-------------|-----|
| **Move Contracts** | Movement DeFi UniV2 | https://github.com/movementlabsxyz/movement-defi-examples/tree/main/univ2 |
| **Frontend** | Movement Counter Template | https://github.com/dumbdevss/Movement-Counter-template |

### Contracts Starter (univ2) Structure
```
univ2/
├── sources/           # Move modules
│   ├── errors.move    # Error definitions
│   ├── math.move      # Math utilities (sqrt, safe arithmetic)
│   ├── lp_token.move  # LP token using fungible asset framework
│   ├── pool.move      # Core AMM logic
│   └── factory.move   # Pool registry
├── tests/             # Move tests
├── Move.toml          # Package config
└── CLAUDE.md          # Contract guidance
```

### Frontend Starter Structure
```
Movement-Counter-template/
├── app/
│   ├── components/
│   │   ├── wallet-provider.tsx    # Wallet context
│   │   ├── wallet-selection-modal.tsx
│   │   └── ui/                    # Radix UI components
│   ├── lib/
│   │   ├── aptos.ts               # Aptos SDK client
│   │   ├── transactions.ts        # Transaction helpers
│   │   └── privy-movement.ts      # Privy integration
│   ├── providers.tsx              # App providers
│   └── page.tsx                   # Main page
└── modules/                       # Move contracts (optional)
```

---

## Git Configuration (MANDATORY)

**ALWAYS use these credentials for ALL commits and pushes:**

| Setting | Value |
|---------|-------|
| **User Name** | `gabrielantonyxaviour` |
| **User Email** | `gabrielantony56@gmail.com` |

Before making any commits, ALWAYS run:
```bash
git config user.name "gabrielantonyxaviour"
git config user.email "gabrielantony56@gmail.com"
```

---

## Critical Rules

**NEVER mock or create placeholder code.** If blocked, STOP and explain why.

- No scope creep - only implement what's requested
- No assumptions - ask for clarification
- Follow existing patterns from starter kits
- Verify work before completing
- Use conventional commits (`feat:`, `fix:`, `refactor:`)

---

## File Size Limits (CRITICAL)

**HARD LIMIT: 300 lines per file maximum. NO EXCEPTIONS.**

| File Type | Max Lines | Purpose |
|-----------|-----------|---------|
| `page.tsx` | 150 | Orchestration only |
| `*-tab.tsx` | 250 | Tab components |
| `use-*.ts` | 200 | Hooks with business logic |
| `types.ts` | 100 | Type definitions |
| `*.move` | 300 | Move modules |

**See `code-structure` skill for detailed patterns.**

---

## Documentation Lookup (MANDATORY)

**ALWAYS use Context7 MCP for documentation. NEVER use WebFetch for docs.**

| Library | Context7 ID (resolve first) |
|---------|-------------|
| Next.js | `/vercel/next.js` |
| React | `/facebook/react` |
| shadcn/ui | `/shadcn-ui/ui` |
| Aptos SDK | Resolve: `aptos` |

---

## Skills (LOAD BEFORE STARTING TASKS)

| Task Type | Required Skill |
|-----------|----------------|
| **Any New Code** | `code-structure` |
| **UI/Frontend** | `ui-dev` |
| **Move Development** | `move-dev` |
| **Planning** | `strategy` (use `/strategy`) |

---

## Strategy Command

Use `/strategy <goal>` to enter planning mode and break down complex goals into executable prompts.

| Command | Purpose | Prompts Location |
|---------|---------|------------------|
| `/strategy <goal>` | Plan any development task | `prompts/` |

Prompts are numbered sequentially (1.md, 2.md, etc.) and executed with `/run-prompt <number>`.

---

## Repository Structure (Target)

```
velox/
├── contracts/              # Move smart contracts (from univ2 starter)
│   ├── sources/
│   │   ├── types.move      # Intent enum definitions
│   │   ├── submission.move # Intent creation & escrow
│   │   ├── settlement.move # Solution selection & execution
│   │   ├── solver_registry.move
│   │   ├── fees.move
│   │   ├── math.move       # From starter
│   │   └── errors.move     # From starter
│   ├── tests/
│   ├── Move.toml
│   └── deployment.json
│
├── frontend/               # Next.js app (from Counter template)
│   ├── app/
│   │   ├── components/
│   │   │   ├── intent/     # Intent-specific components
│   │   │   ├── web3/       # Wallet components (from starter)
│   │   │   └── ui/         # Radix UI (from starter)
│   │   ├── lib/
│   │   │   ├── aptos.ts    # From starter
│   │   │   ├── transactions.ts
│   │   │   └── velox/      # Velox-specific
│   │   └── page.tsx
│   └── constants/
│
├── prompts/                # Strategy prompts (1.md, 2.md, etc.)
│
└── .claude/
    ├── commands/
    │   └── strategy.md
    └── skills/
```

---

## Move Development (Velox-Specific)

### Intent Types (Move 2.0 Enums)

```move
module velox::types {
    enum Intent has store, drop {
        Swap { input_coin: address, output_coin: address, amount_in: u64, min_amount_out: u64, deadline: u64 },
        LimitOrder { input_coin: address, output_coin: address, amount: u64, price: u64, expiry: u64, partial_fill: bool },
        TWAP { ... },
        DCA { ... },
        Conditional { ... }
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

### Building on UniV2 Starter

The univ2 starter provides:
- `math.move` - Reuse sqrt, safe arithmetic for price calculations
- `errors.move` - Extend with Velox-specific errors
- `pool.move` patterns - Reference for swap execution logic

---

## Frontend Development (Velox-Specific)

### Building on Counter Template

The Counter template provides:
- `wallet-provider.tsx` - Privy + Aptos wallet integration (reuse as-is)
- `lib/aptos.ts` - Aptos SDK client config (adapt for Velox)
- `lib/transactions.ts` - Transaction helpers (extend for intents)
- `providers.tsx` - App providers setup (reuse)

### Key Components to Build

```
components/intent/
├── swap-form.tsx        # Swap intent UI
├── limit-form.tsx       # Limit order UI
├── token-selector.tsx   # Token selection
├── intent-status.tsx    # Status tracking
└── history-list.tsx     # Intent history
```

---

## Commands Reference

| Command | Description |
|---------|-------------|
| `/strategy <goal>` | Plan development work → `prompts/` |
| `/run-prompt <number>` | Execute prompt (e.g., `/run-prompt 1`) |
| `/debug` | Strategic debugging |
| `/deploy-contracts` | Deploy Move contracts |
| `/move-test` | Run Move tests |

---

## Issues & Learnings System

### Before Starting These Tasks, Read Relevant Issues:

| Task Type | Read First |
|-----------|------------|
| UI/Frontend | `docs/issues/ui/README.md` |
| Move contracts | `docs/issues/move/README.md` |
| Indexing/GraphQL | `docs/issues/indexer/README.md` |
| Movement network | `docs/issues/movement/README.md` |
| Claude Code/Tooling | `docs/issues/tooling/README.md` |

### When to Document a New Learning

**DOCUMENT if ALL of these are true:**
1. It caused repeated back-and-forth debugging (wasted user's time)
2. It's non-obvious (you wouldn't naturally avoid it)
3. It will happen again in future projects
4. The fix isn't easily searchable in official docs

**DO NOT document:**
- Basic syntax errors or typos
- Standard patterns you already know
- One-off edge cases unlikely to repeat
- Things covered in official documentation

### How to Add a Learning

1. Determine category: `ui/`, `move/`, `indexer/`, `movement/`, or `tooling/`
2. Read the existing README.md in that folder
3. Add new issue following the template format (increment ID)
4. Keep it focused: problem → root cause → solution → prevention

---

## DO NOT

- Create files over 300 lines
- Put everything in page.tsx
- Use WebFetch for documentation
- Skip loading skills
- Guess Move syntax - use Context7
- Deviate from starter kit patterns unnecessarily

## DO

- Keep files under 300 lines
- Load skills FIRST before any task
- Use Context7 MCP for ALL documentation
- Follow starter kit patterns
- Emit events in Move contracts (for indexing)
- Use Privy + Aptos SDK patterns from Counter template
