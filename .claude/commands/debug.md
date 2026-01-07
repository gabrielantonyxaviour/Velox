---
description: Strategic debugging across Move contracts and frontend
argument: <error description or unexpected behavior>
---

# Full-Stack Debug

Strategic debugging for: $ARGUMENTS

**SINGLE SOURCE OF TRUTH:** `contracts/deployment.json`
**NO GARBAGE FILES:** Do not create markdown, temp, or documentation files.

## Debug Strategy

### Phase 1: Classify the Issue

| Symptom | Primary Layer | Check Also |
|---------|---------------|------------|
| Transaction reverts | Contracts | Frontend (wrong params) |
| UI shows wrong data | Frontend | Contract (view functions) |
| Wallet won't connect | Frontend | Privy config, network |
| "Function not found" | Frontend | Move module address/function name |
| Move Prover fails | Contracts | Assertions, invariants |

### Phase 2: Cross-Layer Verification

```
┌─────────────┐     ┌─────────────┐
│  Contracts  │────▶│  Frontend   │
└─────────────┘     └─────────────┘
       │                   │
       ▼                   ▼
  deployment.json    constants/
  sources/*.move     lib/movement/
```

**Address Consistency Check:**
```bash
# Source of truth: deployment
cat contracts/deployment.json

# Frontend constants
cat frontend/constants/addresses.ts
```

### Phase 3: Contract Issues

1. **Transaction Reverts:**
   ```bash
   cd contracts
   movement move test --filter test_name -v
   ```

2. **View Function Returns Wrong Data:**
   - Check function parameters
   - Verify resource exists at address
   - Check abilities on structs

3. **Move Prover Fails:**
   ```bash
   cd contracts
   movement move prove
   ```

### Phase 4: Frontend Issues

1. **Privy Connection Fails:**
   - Check `NEXT_PUBLIC_PRIVY_APP_ID`
   - Verify chain config in providers.tsx

2. **Transaction Fails:**
   - Check contract address in constants
   - Verify function name matches Move module
   - Check argument types and order

3. **View Call Returns Empty:**
   - Verify resource exists
   - Check address format (0x prefix)

### Phase 5: Resolution

After identifying the issue:
1. **If contract bug:** Fix contract → run `movement move test`
2. **If frontend bug:** Fix component → test locally

## Debug Checklist

```
□ Reproduced the issue
□ Identified which layer (contracts/frontend)
□ Checked address consistency
□ Checked function/module names
□ Read error messages carefully
□ Fixed and verified resolution
```
