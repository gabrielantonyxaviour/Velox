# Indexer Issues & Learnings

GraphQL, data fetching, and indexer issues.

## Quick Reference

| ID | Issue | Tags |
|----|-------|------|
| INDEXER-001 | Movement testnet indexer returns 403 Forbidden | `rpc-mode`, `movement`, `api-access` |
| INDEXER-002 | DB status format must match resolver mappings | `prisma`, `graphql`, `resolver` |

---

## [INDEXER-001] Movement Testnet Indexer Returns 403 Forbidden

**Problem:** RPC mode indexer fails to fetch events because Movement's GraphQL indexer API returns 403 Forbidden.

---

### Pitfall: Movement Indexer API Access Blocked

The indexer RPC mode uses `aptos.getEvents()` which internally calls Movement's GraphQL indexer at `https://indexer.testnet.movementnetwork.xyz/v1/graphql`. This endpoint returns HTTP 403 Forbidden.

```bash
# This returns 403:
curl -s 'https://indexer.testnet.movementnetwork.xyz/v1/graphql' -X POST \
  -H "Content-Type: application/json" \
  -d '{"query": "{ events(limit: 1) { data } }"}'
# Returns: <html><head><title>403 Forbidden</title></head>...
```

```typescript
// ❌ BAD - SDK silently fails with undefined response
const events = await aptos.getEvents({
  options: {
    where: { indexed_type: { _eq: "..." } },
    limit: 100,
  },
});
// events is undefined, leads to "Cannot read properties of undefined"
```

**Workarounds:**
1. Use Goldsky mode (`INDEXER_MODE=goldsky`) for production - syncs events to your own DB
2. Query on-chain state directly via `aptos.view()` for testing
3. Manually sync intents from on-chain data

**Root Cause:** Movement testnet may require API keys or have rate limiting/access restrictions.

---

**Tags:** `rpc-mode`, `movement`, `api-access`, `403`

---

## [INDEXER-002] DB Status Format Must Match Resolver Mappings

**Problem:** GraphQL returns incorrect status because DB values don't match resolver's mapping keys.

---

### Pitfall: Case Sensitivity in Status Mapping

The GraphQL resolver maps DB status (PascalCase) to GraphQL enum (UPPER_SNAKE_CASE):

```typescript
// resolver/intent.ts
const statusMap: Record<string, string> = {
  'Pending': 'PENDING',
  'Filled': 'FILLED',      // <-- expects PascalCase
  'Cancelled': 'CANCELLED',
};
return statusMap[intent.status] || 'PENDING';  // Falls back to PENDING!
```

```typescript
// ❌ BAD - Storing UPPER_SNAKE_CASE
await prisma.intent.update({
  data: { status: 'FILLED' },  // Won't match 'Filled' key
});
// GraphQL returns PENDING (fallback)

// ✅ GOOD - Store PascalCase
await prisma.intent.update({
  data: { status: 'Filled' },  // Matches resolver mapping
});
// GraphQL returns FILLED
```

**Fix:** Always store status/type in PascalCase format to match resolver mappings.

---

**Tags:** `prisma`, `graphql`, `resolver`, `status-mapping`

---

<!-- Add new issues below this line -->
