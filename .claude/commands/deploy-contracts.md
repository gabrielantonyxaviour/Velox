---
description: Deploy Move contracts to Movement testnet
argument: <optional: testnet or mainnet (default: testnet)>
---

# Deploy Move Contracts

**SINGLE SOURCE OF TRUTH:** `contracts/deployment.json`
**NO GARBAGE FILES:** Do not create markdown, temp, or documentation files.

## Prerequisites

- Load `move-dev` skill
- Read `contracts/Move.toml` for package configuration
- Ensure Movement CLI is configured with wallet

## Phase 1: Build & Test

```bash
cd contracts

# Build
movement move compile

# Test
movement move test

# Prove (optional but recommended)
movement move prove
```

**HALT if any step fails.**

## Phase 2: Deploy

```bash
cd contracts

# Deploy to testnet (default)
movement move publish --named-addresses moveintent=default

# Or deploy to mainnet
# movement move publish --named-addresses moveintent=default --network mainnet
```

## Phase 3: Update Deployment Config

After successful deployment, update `contracts/deployment.json`:

```json
{
  "network": "testnet",
  "address": "0x...",
  "modules": {
    "types": "deployed",
    "submission": "deployed",
    "settlement": "deployed",
    "solver_registry": "deployed",
    "fees": "deployed"
  },
  "deployedAt": "2024-01-01T00:00:00Z"
}
```

## Phase 4: Sync to Frontend

Update `frontend/constants/addresses.ts` with new deployment address.

## Success Checklist

- [ ] All tests pass
- [ ] Contracts deployed successfully
- [ ] `deployment.json` updated with address
- [ ] Frontend constants updated
- [ ] Verified on Movement Explorer

**Explorer:** `https://explorer.testnet.movement.network/account/${address}`
