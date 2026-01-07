---
description: Implement new Move module or add features
argument: <feature description>
---

# Implement Move Feature

Feature: $ARGUMENTS

Load the `move-dev` skill before implementing.

## Before Writing Code

1. **Understand the requirement** - What exactly needs to be built?
2. **Check existing code** - What patterns exist in `contracts/sources/`?
3. **Look up documentation** - Use Context7 for Move/Aptos docs
4. **Plan the implementation** - Which modules need changes?

## Implementation Steps

### Step 1: Design

- Define structs/enums with proper abilities
- Plan event emissions for indexing
- Define error codes

### Step 2: Implement

```move
module moveintent::new_module {
    use std::signer;
    use aptos_framework::event;

    // Error codes
    const E_NOT_AUTHORIZED: u64 = 1;

    // Structs with abilities
    struct MyStruct has key, store, drop {
        field: u64,
    }

    // Events
    struct MyEvent has drop, store {
        value: u64,
    }

    // Entry functions
    public entry fun my_function(account: &signer, value: u64) {
        // Implementation
        event::emit(MyEvent { value });
    }

    // View functions
    #[view]
    public fun get_value(addr: address): u64 {
        // Return value
    }
}
```

### Step 3: Test

```bash
cd contracts
movement move test --filter test_new_feature
```

### Step 4: Prove (Optional)

```bash
cd contracts
movement move prove
```

## Checklist

- [ ] Structs have correct abilities
- [ ] Events emitted for all state changes
- [ ] Error codes defined and used
- [ ] Access control implemented
- [ ] Tests written and passing
- [ ] File under 300 lines
