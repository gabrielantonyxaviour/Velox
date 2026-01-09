/// Velox Math Module
/// Safe mathematical operations and price calculations
module velox::math {
    use velox::errors;

    // ============ Constants ============
    const U64_MAX: u128 = 18446744073709551615;
    const BPS_DENOMINATOR: u64 = 10000; // Basis points denominator

    // ============ Basic Math ============

    /// Safe multiplication followed by division, using u128 for intermediate value
    public fun safe_mul_div(a: u64, b: u64, c: u64): u64 {
        assert!(c != 0, errors::division_by_zero());
        let a_u128 = (a as u128);
        let b_u128 = (b as u128);
        let c_u128 = (c as u128);

        let product = a_u128 * b_u128;
        let result = product / c_u128;
        assert!(result <= U64_MAX, errors::overflow());
        (result as u64)
    }

    /// Safe addition with overflow check
    public fun safe_add(a: u64, b: u64): u64 {
        let result = (a as u128) + (b as u128);
        assert!(result <= U64_MAX, errors::overflow());
        (result as u64)
    }

    /// Safe subtraction with underflow check
    public fun safe_sub(a: u64, b: u64): u64 {
        assert!(a >= b, errors::overflow());
        a - b
    }

    /// Return the minimum of two values
    public fun min(a: u64, b: u64): u64 {
        if (a < b) a else b
    }

    /// Return the maximum of two values
    public fun max(a: u64, b: u64): u64 {
        if (a > b) a else b
    }

    // ============ Fee Calculations ============

    /// Calculate fee amount from total (fee in basis points)
    /// Returns the fee portion: (amount * fee_bps) / 10000
    public fun calculate_fee(amount: u64, fee_bps: u64): u64 {
        safe_mul_div(amount, fee_bps, BPS_DENOMINATOR)
    }

    /// Calculate amount after fee deduction
    /// Returns: amount - fee
    public fun amount_after_fee(amount: u64, fee_bps: u64): u64 {
        let fee = calculate_fee(amount, fee_bps);
        safe_sub(amount, fee)
    }

    /// Get basis points denominator
    public fun bps_denominator(): u64 {
        BPS_DENOMINATOR
    }

    // ============ Dutch Auction Price ============

    /// Calculate current Dutch auction price based on linear decay
    /// Price decays linearly from start_price to end_price over the auction duration
    /// Returns: current_price at given timestamp
    public fun dutch_auction_price(
        start_price: u64,
        end_price: u64,
        start_time: u64,
        end_time: u64,
        current_time: u64
    ): u64 {
        // If auction hasn't started, return start price
        if (current_time <= start_time) {
            return start_price
        };

        // If auction has ended, return end price
        if (current_time >= end_time) {
            return end_price
        };

        // Linear interpolation: price decays from start to end
        let duration = end_time - start_time;
        let elapsed = current_time - start_time;
        let price_diff = start_price - end_price;

        // current_price = start_price - (price_diff * elapsed / duration)
        let decay = safe_mul_div(price_diff, elapsed, duration);
        safe_sub(start_price, decay)
    }

    // ============ Slippage Calculations ============

    /// Check if output meets minimum with slippage tolerance
    /// min_acceptable = expected * (10000 - slippage_bps) / 10000
    public fun meets_slippage(
        actual_output: u64,
        expected_output: u64,
        slippage_bps: u64
    ): bool {
        let min_acceptable = safe_mul_div(
            expected_output,
            safe_sub(BPS_DENOMINATOR, slippage_bps),
            BPS_DENOMINATOR
        );
        actual_output >= min_acceptable
    }

    /// Calculate minimum output given slippage tolerance
    public fun min_output_with_slippage(amount: u64, slippage_bps: u64): u64 {
        safe_mul_div(amount, safe_sub(BPS_DENOMINATOR, slippage_bps), BPS_DENOMINATOR)
    }

    // ============ Chunk Calculations (TWAP/DCA) ============

    /// Calculate amount per chunk for TWAP/DCA
    public fun amount_per_chunk(total_amount: u64, num_chunks: u64): u64 {
        assert!(num_chunks > 0, errors::division_by_zero());
        total_amount / num_chunks
    }

    /// Calculate remaining amount after executed chunks
    public fun remaining_after_chunks(
        total_amount: u64,
        chunk_size: u64,
        chunks_executed: u64
    ): u64 {
        let executed_amount = chunk_size * chunks_executed;
        if (executed_amount >= total_amount) {
            0
        } else {
            total_amount - executed_amount
        }
    }

    // ============ Tests ============

    #[test]
    fun test_safe_mul_div() {
        assert!(safe_mul_div(100, 200, 50) == 400, 1);
        assert!(safe_mul_div(1000, 500, 250) == 2000, 2);
        assert!(safe_mul_div(100, 30, 10000) == 0, 3); // 0.3% rounds to 0
        assert!(safe_mul_div(10000, 30, 10000) == 30, 4); // 0.3% of 10000 = 30
    }

    #[test]
    #[expected_failure(abort_code = 61, location = velox::math)]
    fun test_safe_mul_div_division_by_zero() {
        safe_mul_div(100, 200, 0);
    }

    #[test]
    fun test_safe_add() {
        assert!(safe_add(100, 200) == 300, 1);
        assert!(safe_add(0, 0) == 0, 2);
    }

    #[test]
    fun test_safe_sub() {
        assert!(safe_sub(200, 100) == 100, 1);
        assert!(safe_sub(100, 100) == 0, 2);
    }

    #[test]
    #[expected_failure(abort_code = 60, location = velox::math)]
    fun test_safe_sub_underflow() {
        safe_sub(100, 200);
    }

    #[test]
    fun test_calculate_fee() {
        // 1% fee (100 bps) on 10000 = 100
        assert!(calculate_fee(10000, 100) == 100, 1);
        // 0.3% fee (30 bps) on 10000 = 30
        assert!(calculate_fee(10000, 30) == 30, 2);
        // 2.5% fee (250 bps) on 1000 = 25
        assert!(calculate_fee(1000, 250) == 25, 3);
    }

    #[test]
    fun test_amount_after_fee() {
        // 10000 - 1% = 9900
        assert!(amount_after_fee(10000, 100) == 9900, 1);
        // 10000 - 0.3% = 9970
        assert!(amount_after_fee(10000, 30) == 9970, 2);
    }

    #[test]
    fun test_dutch_auction_price() {
        let start_price: u64 = 1000;
        let end_price: u64 = 500;
        let start_time: u64 = 100;
        let end_time: u64 = 200;

        // Before start: returns start price
        assert!(dutch_auction_price(start_price, end_price, start_time, end_time, 50) == 1000, 1);

        // At start: returns start price
        assert!(dutch_auction_price(start_price, end_price, start_time, end_time, 100) == 1000, 2);

        // At midpoint: returns midpoint price
        assert!(dutch_auction_price(start_price, end_price, start_time, end_time, 150) == 750, 3);

        // At end: returns end price
        assert!(dutch_auction_price(start_price, end_price, start_time, end_time, 200) == 500, 4);

        // After end: returns end price
        assert!(dutch_auction_price(start_price, end_price, start_time, end_time, 250) == 500, 5);
    }

    #[test]
    fun test_meets_slippage() {
        // 1000 expected, 1% slippage (100 bps), min = 990
        assert!(meets_slippage(1000, 1000, 100) == true, 1); // exact
        assert!(meets_slippage(990, 1000, 100) == true, 2);  // at min
        assert!(meets_slippage(989, 1000, 100) == false, 3); // below min
        assert!(meets_slippage(1100, 1000, 100) == true, 4); // above expected
    }

    #[test]
    fun test_min_output_with_slippage() {
        // 1000 with 1% slippage = 990
        assert!(min_output_with_slippage(1000, 100) == 990, 1);
        // 10000 with 0.5% slippage = 9950
        assert!(min_output_with_slippage(10000, 50) == 9950, 2);
    }

    #[test]
    fun test_amount_per_chunk() {
        assert!(amount_per_chunk(1000, 10) == 100, 1);
        assert!(amount_per_chunk(1000, 3) == 333, 2); // integer division
    }

    #[test]
    fun test_remaining_after_chunks() {
        assert!(remaining_after_chunks(1000, 100, 5) == 500, 1);
        assert!(remaining_after_chunks(1000, 100, 10) == 0, 2);
        assert!(remaining_after_chunks(1000, 100, 15) == 0, 3); // over-executed
    }
}
