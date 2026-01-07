# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a complete Uniswap V2-style Automated Market Maker (AMM) implementation built for Movement blockchain using Move 1.0 syntax. It demonstrates production-ready DeFi mechanics including constant product formula pools, LP tokens, and factory registry patterns.

## Development Commands

### Compilation and Testing
```bash
# Compile the Move package
movement move compile

# Run all tests
movement move test

# Run specific test modules
movement move test --filter math_test
movement move test --filter pool_test
movement move test --filter factory_test
movement move test --filter integration_test

# Run tests with verbose output
movement move test -v
```

### Deployment
```bash
# Deploy to Movement network
movement move publish

# Initialize factory after deployment
movement move run --function-id 'YOUR_ADDRESS::factory::initialize' \
  --args address:FEE_SETTER_ADDRESS
```

### Development Workflow
```bash
# Standard development cycle
movement move compile && movement move test
```

## Architecture Overview

### Core Module Dependencies
The modules have the following dependency hierarchy:
- `errors.move` - Base error constants (no dependencies)
- `math.move` - Mathematical utilities (depends on errors)
- `lp_token.move` - LP token management (depends on errors)
- `pool.move` - Core AMM logic (depends on errors, math, lp_token)
- `factory.move` - Pool registry (depends on errors, pool)

### Key Design Patterns

**Resource Management**: Uses Move's ownership model for safe resource handling. All coin operations are explicit and type-safe.

**Generic Programming**: Heavy use of generics (`<X, Y>`) for type-safe token pair operations. Pool types are ordered alphabetically to prevent duplicate pools.

**Event-Driven Architecture**: Comprehensive event emission for off-chain indexing:
- `MintEvent`, `BurnEvent`, `SwapEvent` in pools
- `PoolCreatedEvent` in factory

**Capability-Based Security**: Uses signer-based access control for admin functions. Factory fee management requires proper authorization.

### Mathematical Foundation

**Constant Product Formula**: `x × y = k` implemented in `pool.move`
- Fee calculation: 0.3% (997/1000 factor) applied to input amounts
- Square root calculation for initial LP token supply
- Safe arithmetic operations throughout to prevent overflow

**Slippage Protection**: Router implements minimum output amounts and deadline checks for MEV protection.

## Common Development Tasks

### Adding New Pool Features
1. Add new functions to `pool.move`
2. Update corresponding events in pool events struct
3. Add comprehensive tests in `tests/pool_test.move`
4. Update router if multi-hop functionality needed

### Implementing New Token Standards
1. Ensure compatibility with Movement's coin framework
2. Update type constraints in generics as needed
3. Test with various token decimal precisions

### Future Router Implementation
1. Multi-hop routing system for swaps through multiple pools
2. Path optimization algorithms for best pricing
3. Price impact calculations and slippage protection

### Testing Strategy
- Unit tests for each module in `tests/` directory
- Integration tests for cross-module functionality
- Mathematical accuracy tests for fee and slippage calculations
- Edge case testing for error conditions

## Important Implementation Notes

### Type Ordering
Pools use alphabetical type ordering to prevent duplicate pools:
```move
fun is_ordered<X, Y>(): bool {
    let x_struct_name = type_info::struct_name(&x_type_info);
    let y_struct_name = type_info::struct_name(&y_type_info);
    &x_struct_name < &y_struct_name
}
```

### LP Token Security
- Minimum liquidity (1000 tokens) burned on first mint
- Uses Movement's native coin framework
- Supply tracking for proper share calculations

### Factory Registry
- Uses SimpleMap for efficient pool lookups
- Supports pagination for large pool lists
- Maintains both forward and reverse token pair lookups

### Error Handling
Centralized error constants in `errors.move` with descriptive names:
- Pool errors (creation, existence)
- Liquidity errors (insufficient amounts)
- Swap errors (slippage, deadlines)
- Math errors (overflow, division by zero)

## Security Considerations

### Arithmetic Safety
- All multiplication/division uses `safe_mul_div` to prevent overflow
- Square root implementation handles edge cases
- Fee calculations maintain precision

### Access Control
- Factory admin functions check signer authorization
- Pool creation is permissionless but validated
- No owner privileges in core pool operations

### MEV Protection
- Slippage protection via minimum output amounts
- Deadline enforcement prevents transaction replay
- Constant product formula provides predictable pricing

## Performance Optimizations

### Gas Efficiency
- Minimal storage operations
- Efficient algorithms for common operations
- Batched operations where possible

### Storage Optimization
- Compact data structures
- Event-based state tracking for off-chain queries
- Efficient pool lookup mechanisms

## CLI Testing Lifecycle

### Complete End-to-End Testing Commands

The following commands provide a complete lifecycle for testing the Uniswap V2 AMM implementation using the Movement CLI. Replace `YOUR_PROFILE` with your configured profile name and `YOUR_ADDRESS` with your deployment address.

#### 1. Compile and Deploy
```bash
# Compile the Move package
movement move compile --skip-fetch-latest-git-deps

# Deploy the contract (automatically initializes tokens)
movement move publish --profile YOUR_PROFILE
```

#### 2. Initialize Factory
```bash
# Initialize factory with your address as fee setter
movement move run --function-id 'YOUR_ADDRESS::factory::initialize' --args address:YOUR_ADDRESS --profile YOUR_PROFILE
```

#### 3. Mint Test Tokens
```bash
# Mint Token A to your account
movement move run --function-id 'YOUR_ADDRESS::token_a::mint_entry' --args address:YOUR_ADDRESS u64:1000000000000 --profile YOUR_PROFILE

# Mint Token B to your account  
movement move run --function-id 'YOUR_ADDRESS::token_b::mint_entry' --args address:YOUR_ADDRESS u64:1000000000000 --profile YOUR_PROFILE
```

#### 4. Create Pool
```bash
# Create liquidity pool for TokenA/TokenB pair
movement move run --function-id 'YOUR_ADDRESS::factory::create_pool_entry' --type-args 'YOUR_ADDRESS::token_a::TokenA' 'YOUR_ADDRESS::token_b::TokenB' --profile YOUR_PROFILE
```

#### 5. Add Initial Liquidity
```bash
# Add liquidity to the pool (100 tokens of each type)
movement move run --function-id 'YOUR_ADDRESS::pool::add_liquidity_entry' --type-args 'YOUR_ADDRESS::token_a::TokenA' 'YOUR_ADDRESS::token_b::TokenB' --args u64:100000000000 u64:100000000000 --profile YOUR_PROFILE
```

#### 6. Test Token Swaps
```bash
# Swap Token A for Token B (0.01 token A input, minimum 0.009 token B expected due to fees/slippage)
movement move run --function-id 'YOUR_ADDRESS::pool::swap_x_to_y_entry' --type-args 'YOUR_ADDRESS::token_a::TokenA' 'YOUR_ADDRESS::token_b::TokenB' --args u64:1000000000 u64:900000000 --profile YOUR_PROFILE

# Swap Token B for Token A (0.01 token B input, minimum 0.009 token A expected due to fees/slippage)
movement move run --function-id 'YOUR_ADDRESS::pool::swap_y_to_x_entry' --type-args 'YOUR_ADDRESS::token_a::TokenA' 'YOUR_ADDRESS::token_b::TokenB' --args u64:1000000000 u64:900000000 --profile YOUR_PROFILE
```

#### 7. Query Pool and LP Token State
```bash
# Check pool reserves and timestamp
movement move view --function-id 'YOUR_ADDRESS::pool::get_reserves' --type-args 'YOUR_ADDRESS::token_a::TokenA' 'YOUR_ADDRESS::token_b::TokenB' --profile YOUR_PROFILE

# Check factory pools
movement move view --function-id 'YOUR_ADDRESS::factory::all_pools_length' --profile YOUR_PROFILE

# Check your LP token balance
movement move view --function-id 'YOUR_ADDRESS::lp_token::get_balance' --type-args 'YOUR_ADDRESS::token_a::TokenA' 'YOUR_ADDRESS::token_b::TokenB' --args address:YOUR_ADDRESS --profile YOUR_PROFILE

# Check total LP token supply
movement move view --function-id 'YOUR_ADDRESS::lp_token::get_supply' --type-args 'YOUR_ADDRESS::token_a::TokenA' 'YOUR_ADDRESS::token_b::TokenB' --profile YOUR_PROFILE
```

#### 8. Remove Liquidity Tests
```bash
# First, check your LP token balance before removing (should be ~99999999000 after adding 100 tokens each)
movement move view --function-id 'YOUR_ADDRESS::lp_token::get_balance' --type-args 'YOUR_ADDRESS::token_a::TokenA' 'YOUR_ADDRESS::token_b::TokenB' --args address:YOUR_ADDRESS --profile YOUR_PROFILE

# Remove small amount of liquidity (1 LP token = 0.00000001 LP tokens)
movement move run --function-id 'YOUR_ADDRESS::pool::remove_liquidity_entry' --type-args 'YOUR_ADDRESS::token_a::TokenA' 'YOUR_ADDRESS::token_b::TokenB' --args u64:1000000000 --profile YOUR_PROFILE

# Remove larger amount (10 LP tokens)  
movement move run --function-id 'YOUR_ADDRESS::pool::remove_liquidity_entry' --type-args 'YOUR_ADDRESS::token_a::TokenA' 'YOUR_ADDRESS::token_b::TokenB' --args u64:10000000000 --profile YOUR_PROFILE

# Verify LP balance after removal
movement move view --function-id 'YOUR_ADDRESS::lp_token::get_balance' --type-args 'YOUR_ADDRESS::token_a::TokenA' 'YOUR_ADDRESS::token_b::TokenB' --args address:YOUR_ADDRESS --profile YOUR_PROFILE
```


### Testing Notes

**Token Amounts**: All amounts use 8 decimal places (10^8 = 1 token)
- `1000000000` = 0.01 tokens
- `100000000000` = 100 tokens  
- `1000000000000` = 1000 tokens

**Framework Compatibility**: The implementation uses fungible assets for tokens and supports both coin and fungible asset frameworks for LP tokens.

**Error Handling**: Test error conditions like insufficient balance, slippage protection, and unauthorized access.

**Event Monitoring**: All operations emit events for off-chain tracking:
- `MintEvent` for liquidity additions
- `BurnEvent` for liquidity removal  
- `SwapEvent` for token swaps
- `PoolCreatedEvent` for new pools

## Future Development Areas

1. **Multi-Hop Router**: Implementation of routing system for complex swaps
2. **Price Oracle Integration**: TWAP (Time-Weighted Average Price) implementation  
3. **Fee Tier Support**: Multiple fee tiers (0.05%, 0.3%, 1%)
4. **Concentrated Liquidity**: UniswapV3-style position management
5. **Flash Loans**: Uncollateralized lending within single transaction
6. **Governance**: Decentralized parameter management

## Testing Best Practices

- Always test with realistic token amounts and reserves
- Include edge cases (zero amounts, maximum values)  
- Test cross-module interactions thoroughly
- Verify mathematical accuracy with known expected values
- Test error conditions and proper failure modes