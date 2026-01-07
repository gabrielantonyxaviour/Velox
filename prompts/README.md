# Velox Dutch Auction Implementation Prompts

This directory contains executable prompts for implementing Dutch Auction alongside the existing Sealed-Bid Auction. Each prompt is designed to be executed in a fresh Claude Code session.

## Execution

Use the `/run-prompt` command to execute prompts:

```bash
/run-prompt 1    # Design review
/run-prompt 2    # Contract implementation
/run-prompt 3    # Solver SDK updates
/run-prompt 4    # Frontend UI
```

## Prompt Overview

| Prompt | Description | Prerequisites |
|--------|-------------|---------------|
| **1.md** | Dutch Auction Design Spec | Existing contracts working |
| **2.md** | Dutch Auction Contract Implementation | Prompt 1 approved |
| **3.md** | Solver SDK Updates | Prompt 2 deployed |
| **4.md** | Frontend Dual Auction UI | Prompts 2-3 complete |

## Execution Order

```
1 (Design) → 2 (Contracts) → 3 (SDK) → 4 (Frontend)
```

## Key Addresses

```bash
VELOX=0x5cf7138d960b59b714b1d05774fdc2c26ae3f6d9f60808981f5d3c7e6004f840
TOKEN_A=0xd28177fbf37d818e493963c11fe567e3f6dad693a1406b309847f850ba6c31f0  # tUSDC
TOKEN_B=0x23dc029a2171449dd3a00598c6e83ef771ca4567818cea527d4ec6dd48c9701d  # tMOVE
```

## Status Checklist

- [ ] Prompt 1: Design approved
- [ ] Prompt 2: Contracts implemented and tested
- [ ] Prompt 3: SDK updated and tested
- [ ] Prompt 4: Frontend UI complete

## Critical Notes

**DO NOT break existing functionality:**
- Sealed-bid auction must continue working
- All existing intent types (Swap, Limit, TWAP, DCA) unaffected
- Solver registration and reputation system unchanged
- Fee structure unchanged

**Testing approach:**
- After each prompt, verify existing features still work
- Dutch auction is additive, not replacing existing code
