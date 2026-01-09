/// Math Edge Case Tests
/// Tests mathematical operations, overflow handling, and price calculations
#[test_only]
module velox::math_tests {
    use velox::math;

    // ============ Constants ============
    const U64_MAX: u64 = 18446744073709551615;

    // ============ safe_mul_div Tests ============

    #[test]
    fun test_safe_mul_div_basic() {
        assert!(math::safe_mul_div(100, 200, 50) == 400, 1);
        assert!(math::safe_mul_div(1000, 500, 250) == 2000, 2);
        assert!(math::safe_mul_div(1, 1, 1) == 1, 3);
    }

    #[test]
    fun test_safe_mul_div_zero_numerator() {
        assert!(math::safe_mul_div(0, 100, 50) == 0, 1);
        assert!(math::safe_mul_div(100, 0, 50) == 0, 2);
        assert!(math::safe_mul_div(0, 0, 1) == 0, 3);
    }

    #[test]
    #[expected_failure(abort_code = 61, location = velox::math)]
    fun test_safe_mul_div_division_by_zero_fails() {
        math::safe_mul_div(100, 200, 0);
    }

    #[test]
    fun test_safe_mul_div_large_numbers() {
        // Test with large numbers that would overflow u64 in intermediate step
        let result = math::safe_mul_div(U64_MAX / 2, 2, 2);
        assert!(result == U64_MAX / 2, 1);
    }

    #[test]
    fun test_safe_mul_div_fee_calculation_rounding() {
        // 100 * 30 / 10000 = 0 (rounds down)
        assert!(math::safe_mul_div(100, 30, 10000) == 0, 1);
        // 10000 * 30 / 10000 = 30
        assert!(math::safe_mul_div(10000, 30, 10000) == 30, 2);
        // 3333 * 30 / 10000 = 9 (rounds down from 9.999)
        assert!(math::safe_mul_div(3333, 30, 10000) == 9, 3);
    }

    // ============ safe_add Tests ============

    #[test]
    fun test_safe_add_basic() {
        assert!(math::safe_add(100, 200) == 300, 1);
        assert!(math::safe_add(0, 0) == 0, 2);
        assert!(math::safe_add(1, 0) == 1, 3);
        assert!(math::safe_add(0, 1) == 1, 4);
    }

    #[test]
    fun test_safe_add_large_numbers() {
        let half_max = U64_MAX / 2;
        assert!(math::safe_add(half_max, half_max) == U64_MAX - 1, 1);
    }

    #[test]
    #[expected_failure(abort_code = 60, location = velox::math)]
    fun test_safe_add_overflow_fails() {
        math::safe_add(U64_MAX, 1);
    }

    // ============ safe_sub Tests ============

    #[test]
    fun test_safe_sub_basic() {
        assert!(math::safe_sub(200, 100) == 100, 1);
        assert!(math::safe_sub(100, 100) == 0, 2);
        assert!(math::safe_sub(100, 0) == 100, 3);
    }

    #[test]
    #[expected_failure(abort_code = 60, location = velox::math)]
    fun test_safe_sub_underflow_fails() {
        math::safe_sub(100, 200);
    }

    // ============ min/max Tests ============

    #[test]
    fun test_min() {
        assert!(math::min(100, 200) == 100, 1);
        assert!(math::min(200, 100) == 100, 2);
        assert!(math::min(100, 100) == 100, 3);
        assert!(math::min(0, U64_MAX) == 0, 4);
    }

    #[test]
    fun test_max() {
        assert!(math::max(100, 200) == 200, 1);
        assert!(math::max(200, 100) == 200, 2);
        assert!(math::max(100, 100) == 100, 3);
        assert!(math::max(0, U64_MAX) == U64_MAX, 4);
    }

    // ============ calculate_fee Tests ============

    #[test]
    fun test_calculate_fee_basic() {
        // 1% fee (100 bps) on 10000 = 100
        assert!(math::calculate_fee(10000, 100) == 100, 1);
        // 0.3% fee (30 bps) on 10000 = 30
        assert!(math::calculate_fee(10000, 30) == 30, 2);
        // 2.5% fee (250 bps) on 1000 = 25
        assert!(math::calculate_fee(1000, 250) == 25, 3);
    }

    #[test]
    fun test_calculate_fee_zero_amount() {
        assert!(math::calculate_fee(0, 100) == 0, 1);
    }

    #[test]
    fun test_calculate_fee_zero_bps() {
        assert!(math::calculate_fee(10000, 0) == 0, 1);
    }

    #[test]
    fun test_calculate_fee_max_bps() {
        // 100% fee (10000 bps) on 10000 = 10000
        assert!(math::calculate_fee(10000, 10000) == 10000, 1);
    }

    #[test]
    fun test_calculate_fee_rounding() {
        // 1 * 30 / 10000 = 0 (rounds down)
        assert!(math::calculate_fee(1, 30) == 0, 1);
        // 333 * 30 / 10000 = 0.999 rounds to 0
        assert!(math::calculate_fee(333, 30) == 0, 2);
        // 334 * 30 / 10000 = 1.002 rounds to 1
        assert!(math::calculate_fee(334, 30) == 1, 3);
    }

    // ============ amount_after_fee Tests ============

    #[test]
    fun test_amount_after_fee_basic() {
        // 10000 - 1% = 9900
        assert!(math::amount_after_fee(10000, 100) == 9900, 1);
        // 10000 - 0.3% = 9970
        assert!(math::amount_after_fee(10000, 30) == 9970, 2);
    }

    // ============ Dutch Auction Price Tests ============

    #[test]
    fun test_dutch_auction_price_at_start() {
        let price = math::dutch_auction_price(1000, 500, 100, 200, 100);
        assert!(price == 1000, 1);
    }

    #[test]
    fun test_dutch_auction_price_at_end() {
        let price = math::dutch_auction_price(1000, 500, 100, 200, 200);
        assert!(price == 500, 1);
    }

    #[test]
    fun test_dutch_auction_price_at_midpoint() {
        let price = math::dutch_auction_price(1000, 500, 100, 200, 150);
        // At 50%: 1000 - (500 * 0.5) = 750
        assert!(price == 750, 1);
    }

    #[test]
    fun test_dutch_auction_price_before_start() {
        let price = math::dutch_auction_price(1000, 500, 100, 200, 50);
        assert!(price == 1000, 1); // Returns start price
    }

    #[test]
    fun test_dutch_auction_price_after_end() {
        let price = math::dutch_auction_price(1000, 500, 100, 200, 250);
        assert!(price == 500, 1); // Returns end price
    }

    #[test]
    fun test_dutch_auction_price_linear_decay() {
        let start_price: u64 = 1000;
        let end_price: u64 = 500;
        let start_time: u64 = 100;
        let end_time: u64 = 200;

        // 25% through: 1000 - (500 * 0.25) = 875
        let price_25 = math::dutch_auction_price(start_price, end_price, start_time, end_time, 125);
        assert!(price_25 == 875, 1);

        // 75% through: 1000 - (500 * 0.75) = 625
        let price_75 = math::dutch_auction_price(start_price, end_price, start_time, end_time, 175);
        assert!(price_75 == 625, 2);
    }

    // ============ Slippage Tests ============

    #[test]
    fun test_meets_slippage_exact() {
        // Expected 1000, actual 1000, 1% slippage allowed
        assert!(math::meets_slippage(1000, 1000, 100) == true, 1);
    }

    #[test]
    fun test_meets_slippage_at_minimum() {
        // Expected 1000, actual 990, 1% slippage allowed (min = 990)
        assert!(math::meets_slippage(990, 1000, 100) == true, 1);
    }

    #[test]
    fun test_meets_slippage_below_minimum() {
        // Expected 1000, actual 989, 1% slippage allowed (min = 990)
        assert!(math::meets_slippage(989, 1000, 100) == false, 1);
    }

    #[test]
    fun test_meets_slippage_above_expected() {
        // Expected 1000, actual 1100, 1% slippage allowed
        assert!(math::meets_slippage(1100, 1000, 100) == true, 1);
    }

    #[test]
    fun test_min_output_with_slippage_basic() {
        // 1000 with 1% slippage = 990
        assert!(math::min_output_with_slippage(1000, 100) == 990, 1);
        // 10000 with 0.5% slippage = 9950
        assert!(math::min_output_with_slippage(10000, 50) == 9950, 2);
    }

    #[test]
    fun test_min_output_with_slippage_zero() {
        // 0% slippage means exact amount required
        assert!(math::min_output_with_slippage(1000, 0) == 1000, 1);
    }

    #[test]
    fun test_min_output_with_slippage_100_percent() {
        // 100% slippage means 0 minimum
        assert!(math::min_output_with_slippage(1000, 10000) == 0, 1);
    }

    // ============ Chunk Calculation Tests ============

    #[test]
    fun test_amount_per_chunk_exact_division() {
        assert!(math::amount_per_chunk(1000, 10) == 100, 1);
        assert!(math::amount_per_chunk(500, 5) == 100, 2);
    }

    #[test]
    fun test_amount_per_chunk_with_remainder() {
        // 1000 / 3 = 333 (integer division)
        assert!(math::amount_per_chunk(1000, 3) == 333, 1);
        // 100 / 3 = 33
        assert!(math::amount_per_chunk(100, 3) == 33, 2);
    }

    #[test]
    #[expected_failure(abort_code = 61, location = velox::math)]
    fun test_amount_per_chunk_zero_chunks_fails() {
        math::amount_per_chunk(1000, 0);
    }

    #[test]
    fun test_remaining_after_chunks_basic() {
        // 1000 total, 100 per chunk, 5 executed = 500 remaining
        assert!(math::remaining_after_chunks(1000, 100, 5) == 500, 1);
        // All executed
        assert!(math::remaining_after_chunks(1000, 100, 10) == 0, 2);
    }

    #[test]
    fun test_remaining_after_chunks_over_executed() {
        // More chunks executed than total - returns 0
        assert!(math::remaining_after_chunks(1000, 100, 15) == 0, 1);
    }

    #[test]
    fun test_remaining_after_chunks_none_executed() {
        assert!(math::remaining_after_chunks(1000, 100, 0) == 1000, 1);
    }

    // ============ BPS Denominator Test ============

    #[test]
    fun test_bps_denominator() {
        assert!(math::bps_denominator() == 10000, 1);
    }

    // ============ Edge Case Combinations ============

    #[test]
    fun test_fee_on_max_u64() {
        // This tests that u128 intermediate works for large numbers
        let fee = math::calculate_fee(U64_MAX, 30);
        // fee = U64_MAX * 30 / 10000 (should not overflow with u128)
        assert!(fee > 0, 1);
    }

    #[test]
    fun test_slippage_calculation_precision() {
        // Test precision at various amounts
        // 1 with 100 bps (1%) = 0 (rounds down from 0.01)
        assert!(math::min_output_with_slippage(1, 100) == 0, 1);
        // 100 with 100 bps = 99
        assert!(math::min_output_with_slippage(100, 100) == 99, 2);
        // 9999 with 100 bps = 9899 (99% of 9999 = 9899.01)
        assert!(math::min_output_with_slippage(9999, 100) == 9899, 3);
    }
}
