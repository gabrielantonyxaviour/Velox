---
description: Run Move tests
argument: <optional: test filter>
---

# Run Move Tests

Load the `move-dev` skill before executing.

## Run Tests

```bash
cd contracts

# Run all tests
movement move test

# Run specific test
movement move test --filter $ARGUMENTS

# Run with verbose output
movement move test -v
```

## Test Naming Convention

| Pattern | Example | Use Case |
|---------|---------|----------|
| `test_feature_happy_path` | `test_submit_swap_success` | Happy path |
| `test_feature_fails_when` | `test_submit_fails_when_zero` | Expected failure |

## Expected Output

```
Running Move unit tests
[ PASS    ] moveintent::types_tests::test_intent_enum
[ PASS    ] moveintent::submission_tests::test_submit_swap_success
...
Test result: OK. X passed; 0 failed; 0 skipped
```

## If Tests Fail

1. Read the error message carefully
2. Check the assertion that failed
3. Verify test setup is correct
4. Fix the issue and re-run

## Move Prover (Optional)

```bash
cd contracts
movement move prove
```

This runs formal verification on your contracts.
