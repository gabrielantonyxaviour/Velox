/// Velox Error Codes Module
/// Centralized error definitions for the Velox intent-based DEX
module velox::errors {

    // ============ Intent Errors (1-9) ============
    const EINTENT_NOT_FOUND: u64 = 1;
    const EINTENT_ALREADY_FILLED: u64 = 2;
    const EINTENT_EXPIRED: u64 = 3;
    const EINTENT_CANCELLED: u64 = 4;
    const EINTENT_NOT_ACTIVE: u64 = 5;
    const EINTENT_ALREADY_EXISTS: u64 = 6;
    const EMAX_FILLS_REACHED: u64 = 7;

    // ============ Amount Errors (10-19) ============
    const EZERO_AMOUNT: u64 = 10;
    const EINSUFFICIENT_AMOUNT: u64 = 11;
    const EMIN_AMOUNT_NOT_MET: u64 = 12;
    const EINSUFFICIENT_OUTPUT: u64 = 13;
    const EINSUFFICIENT_INPUT: u64 = 14;
    const EINSUFFICIENT_BALANCE: u64 = 15;
    const EEXCEEDS_REMAINING: u64 = 16;

    // ============ Solver Errors (20-29) ============
    const ESOLVER_NOT_REGISTERED: u64 = 20;
    const ESOLVER_ALREADY_REGISTERED: u64 = 21;
    const EINSUFFICIENT_STAKE: u64 = 22;
    const ESOLVER_INACTIVE: u64 = 23;
    const ESOLVER_NOT_WINNER: u64 = 24;
    const ECOOLDOWN_NOT_COMPLETE: u64 = 25;
    const ENO_PENDING_UNSTAKE: u64 = 26;

    // ============ Authorization Errors (30-39) ============
    const ENOT_AUTHORIZED: u64 = 30;
    const ENOT_OWNER: u64 = 31;
    const ENOT_INTENT_OWNER: u64 = 32;
    const ENOT_ADMIN: u64 = 33;
    const EALREADY_INITIALIZED: u64 = 34;
    const ENOT_INITIALIZED: u64 = 35;

    // ============ Auction Errors (40-59) ============
    const EAUCTION_NOT_ACTIVE: u64 = 40;
    const EAUCTION_ENDED: u64 = 41;
    const EAUCTION_IN_PROGRESS: u64 = 42;
    const EAUCTION_NOT_SEALED_BID: u64 = 43;
    const EAUCTION_NOT_DUTCH: u64 = 44;
    const EAUCTION_NO_BIDS: u64 = 45;
    const EAUCTION_ALREADY_COMPLETED: u64 = 46;
    const EFILL_DEADLINE_PASSED: u64 = 47;
    const EBID_TOO_LOW: u64 = 48;
    const EDUTCH_PRICE_NOT_MET: u64 = 49;
    const EINVALID_AUCTION_PARAMS: u64 = 50;
    const EAUCTION_NOT_NONE: u64 = 51;

    // ============ Math Errors (60-69) ============
    const EOVERFLOW: u64 = 60;
    const EDIVISION_BY_ZERO: u64 = 61;

    // ============ Token Errors (70-79) ============
    const EINVALID_TOKEN: u64 = 70;
    const ETOKEN_MISMATCH: u64 = 71;
    const EESCROW_INSUFFICIENT: u64 = 72;

    // ============ Scheduled Intent Errors (80-89) ============
    const ECHUNK_NOT_READY: u64 = 80;
    const EPERIOD_NOT_READY: u64 = 81;
    const ESCHEDULED_COMPLETED: u64 = 82;
    const EINVALID_INTERVAL: u64 = 83;
    const EINVALID_CHUNKS: u64 = 84;

    // ============ Time Errors (90-99) ============
    const EDEADLINE_PASSED: u64 = 90;
    const EEXPIRY_PASSED: u64 = 91;
    const ETOO_EARLY: u64 = 92;
    const EINVALID_DEADLINE: u64 = 93;

    // ============ Intent Error Getters ============
    public fun intent_not_found(): u64 { EINTENT_NOT_FOUND }
    public fun intent_already_filled(): u64 { EINTENT_ALREADY_FILLED }
    public fun intent_expired(): u64 { EINTENT_EXPIRED }
    public fun intent_cancelled(): u64 { EINTENT_CANCELLED }
    public fun intent_not_active(): u64 { EINTENT_NOT_ACTIVE }
    public fun intent_already_exists(): u64 { EINTENT_ALREADY_EXISTS }
    public fun max_fills_reached(): u64 { EMAX_FILLS_REACHED }

    // ============ Amount Error Getters ============
    public fun zero_amount(): u64 { EZERO_AMOUNT }
    public fun insufficient_amount(): u64 { EINSUFFICIENT_AMOUNT }
    public fun min_amount_not_met(): u64 { EMIN_AMOUNT_NOT_MET }
    public fun insufficient_output(): u64 { EINSUFFICIENT_OUTPUT }
    public fun insufficient_input(): u64 { EINSUFFICIENT_INPUT }
    public fun insufficient_balance(): u64 { EINSUFFICIENT_BALANCE }
    public fun exceeds_remaining(): u64 { EEXCEEDS_REMAINING }

    // ============ Solver Error Getters ============
    public fun solver_not_registered(): u64 { ESOLVER_NOT_REGISTERED }
    public fun solver_already_registered(): u64 { ESOLVER_ALREADY_REGISTERED }
    public fun insufficient_stake(): u64 { EINSUFFICIENT_STAKE }
    public fun solver_inactive(): u64 { ESOLVER_INACTIVE }
    public fun solver_not_winner(): u64 { ESOLVER_NOT_WINNER }
    public fun cooldown_not_complete(): u64 { ECOOLDOWN_NOT_COMPLETE }
    public fun no_pending_unstake(): u64 { ENO_PENDING_UNSTAKE }

    // ============ Authorization Error Getters ============
    public fun not_authorized(): u64 { ENOT_AUTHORIZED }
    public fun not_owner(): u64 { ENOT_OWNER }
    public fun not_intent_owner(): u64 { ENOT_INTENT_OWNER }
    public fun not_admin(): u64 { ENOT_ADMIN }
    public fun already_initialized(): u64 { EALREADY_INITIALIZED }
    public fun not_initialized(): u64 { ENOT_INITIALIZED }

    // ============ Auction Error Getters ============
    public fun auction_not_active(): u64 { EAUCTION_NOT_ACTIVE }
    public fun auction_ended(): u64 { EAUCTION_ENDED }
    public fun auction_in_progress(): u64 { EAUCTION_IN_PROGRESS }
    public fun auction_not_sealed_bid(): u64 { EAUCTION_NOT_SEALED_BID }
    public fun auction_not_dutch(): u64 { EAUCTION_NOT_DUTCH }
    public fun auction_no_bids(): u64 { EAUCTION_NO_BIDS }
    public fun auction_already_completed(): u64 { EAUCTION_ALREADY_COMPLETED }
    public fun fill_deadline_passed(): u64 { EFILL_DEADLINE_PASSED }
    public fun bid_too_low(): u64 { EBID_TOO_LOW }
    public fun dutch_price_not_met(): u64 { EDUTCH_PRICE_NOT_MET }
    public fun invalid_auction_params(): u64 { EINVALID_AUCTION_PARAMS }
    public fun auction_not_none(): u64 { EAUCTION_NOT_NONE }

    // ============ Math Error Getters ============
    public fun overflow(): u64 { EOVERFLOW }
    public fun division_by_zero(): u64 { EDIVISION_BY_ZERO }

    // ============ Token Error Getters ============
    public fun invalid_token(): u64 { EINVALID_TOKEN }
    public fun token_mismatch(): u64 { ETOKEN_MISMATCH }
    public fun escrow_insufficient(): u64 { EESCROW_INSUFFICIENT }

    // ============ Scheduled Intent Error Getters ============
    public fun chunk_not_ready(): u64 { ECHUNK_NOT_READY }
    public fun period_not_ready(): u64 { EPERIOD_NOT_READY }
    public fun scheduled_completed(): u64 { ESCHEDULED_COMPLETED }
    public fun invalid_interval(): u64 { EINVALID_INTERVAL }
    public fun invalid_chunks(): u64 { EINVALID_CHUNKS }

    // ============ Time Error Getters ============
    public fun deadline_passed(): u64 { EDEADLINE_PASSED }
    public fun expiry_passed(): u64 { EEXPIRY_PASSED }
    public fun too_early(): u64 { ETOO_EARLY }
    public fun invalid_deadline(): u64 { EINVALID_DEADLINE }
}
