# Move Issues & Learnings

Move language, Aptos SDK, and contract deployment issues.

## Quick Reference

| ID | Issue | Tags |
|----|-------|------|
| MOVE-001 | Move 2.0 enum serialization uses `__variant__` pattern | `enum`, `serialization`, `sdk` |
| MOVE-002 | Field names differ between intent types | `fields`, `parsing` |

---

## [MOVE-001] Move 2.0 Enum Serialization Pattern

**Problem:** TypeScript SDK fails to parse Move 2.0 enum variants correctly

---

### Pitfall: `__variant__` Pattern

Move 2.0 enums serialize with a `__variant__` field instead of nested object pattern.

```typescript
// ❌ BAD - Expected legacy pattern
const intent = {
  LimitOrder: {
    input_token: "0x...",
    limit_price: 200000
  }
}

// ✅ GOOD - Actual Move 2.0 pattern
const intent = {
  __variant__: "LimitOrder",
  input_token: "0x...",
  limit_price: 200000
}

// Fix: Check for __variant__ first
if ('__variant__' in intent) {
  const variant = intent.__variant__ as string;
  if (variant === 'LimitOrder') intentType = IntentType.LIMIT_ORDER;
}
```

**Fix:** Always check for `__variant__` field when parsing Move enum data in TypeScript.

---

**Tags:** `enum`, `serialization`, `sdk`, `move-2.0`

---

## [MOVE-002] Field Name Differences Between Intent Types

**Problem:** Same logical field has different names across intent variants

---

### Pitfall: Inconsistent Field Names

Different intent types use different field names for similar concepts:

```typescript
// ❌ BAD - Assuming consistent names
const deadline = intent.deadline; // Works for Swap, fails for LimitOrder

// ✅ GOOD - Check both field names
const deadline = intent.deadline || intent.expiry;

// Or with explicit priority
const rawDeadline = safeGetString(intent, 'deadline');
const rawExpiry = safeGetString(intent, 'expiry');
const deadline = rawDeadline !== '0' ? rawDeadline : rawExpiry;
```

| Intent Type | Deadline Field | Amount Field |
|-------------|----------------|--------------|
| Swap | `deadline` | `amount_in` |
| LimitOrder | `expiry` | `amount` |
| TWAP | `expiry` | `total_amount` |

**Fix:** Always check for alternative field names when parsing intent data.

---

**Tags:** `fields`, `parsing`, `intent-types`

---

<!-- Add new issues below this line -->
