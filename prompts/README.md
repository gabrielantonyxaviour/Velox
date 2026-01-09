# Velox Deployment & Update Strategy

## Overview

This strategy covers deploying the rewritten Velox contracts to a fresh Movement testnet address and updating the SDK and frontend to use the new interfaces.

## Prompts

| # | Title | Description |
|---|-------|-------------|
| 1 | Deploy Contracts | Deploy to fresh address, initialize modules, update configs |
| 2 | Update SDK Types | Update type definitions to match new contract interfaces |
| 3 | Update SDK VeloxSolver | Update function names, parameters, view calls |
| 4 | Update Frontend Types | Update TypeScript types and parsing functions |
| 5 | Update Frontend Transactions | Update transaction builders and view functions |
| 6 | Update Frontend Components | Create rich UX with all available data |
| 7 | Add Data Fetching Hooks | Create React hooks for live data management |
| 8 | End-to-End Testing | Verify all updates work correctly |

## Key Changes Summary

### Contract Function Renames
- `solve_swap` → `fill_swap`
- `solve_limit_order` → `fill_limit_order`
- `solve_twap_chunk` → `fill_twap_chunk`
- `solve_dca_period` → `fill_dca_period`

### New Parameters
- All fill functions now require `fee_config_addr`
- Swap/limit fills require `fill_input` for partial fill amount

### Status Changes
- `Pending` → `Active`
- `PartiallyFilled` → Use `escrowRemaining > 0` with `Active`

### Removed
- `scheduled` module (integrated into IntentRecord)
- `partialFillAllowed` parameter (always allowed, max 5 fills)

### New Data Available
- `fills` array with solver, amounts, timestamps
- `chunksExecuted` and `nextExecution` for TWAP/DCA
- `auction` state with bids, winner, prices
- `totalOutputReceived` for tracking output

## Execution Order

```
1. Deploy contracts (prompt 1)
   ↓
2. Update SDK types (prompt 2)
   ↓
3. Update SDK solver class (prompt 3)
   ↓
4. Update frontend types (prompt 4)
   ↓
5. Update frontend transactions (prompt 5)
   ↓
6. Update frontend components (prompt 6)
   ↓
7. Add data fetching hooks (prompt 7)
   ↓
8. End-to-end testing (prompt 8)
```

## Usage

Execute prompts in order:
```
/run-prompt 1
/run-prompt 2
...
```

Each prompt is self-contained with verification checklists.
