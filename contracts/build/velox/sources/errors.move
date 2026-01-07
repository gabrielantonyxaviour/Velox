module velox::errors {

    // Intent errors
    const EINTENT_NOT_FOUND: u64 = 1;
    const EINTENT_ALREADY_FILLED: u64 = 2;
    const EINTENT_EXPIRED: u64 = 3;
    const EINTENT_CANCELLED: u64 = 4;
    const EINTENT_NOT_PENDING: u64 = 5;
    const EINTENT_ALREADY_EXISTS: u64 = 6;

    // Amount errors
    const EZERO_AMOUNT: u64 = 10;
    const EINSUFFICIENT_AMOUNT: u64 = 11;
    const EMIN_AMOUNT_NOT_MET: u64 = 12;
    const EINSUFFICIENT_OUTPUT_AMOUNT: u64 = 13;
    const EINSUFFICIENT_INPUT_AMOUNT: u64 = 14;
    const EINSUFFICIENT_BALANCE: u64 = 15;

    // Solver errors
    const ESOLVER_NOT_REGISTERED: u64 = 20;
    const ESOLVER_ALREADY_REGISTERED: u64 = 21;
    const EINSUFFICIENT_STAKE: u64 = 22;
    const ESOLVER_SLASHED: u64 = 23;
    const ESOLVER_NOT_WINNER: u64 = 24;
    const EREPUTATION_TOO_LOW: u64 = 25;
    const ESOLVER_SUSPENDED: u64 = 26;
    const ECOOLDOWN_NOT_COMPLETE: u64 = 27;
    const ESLASH_EXCEEDS_STAKE: u64 = 28;

    // Authorization errors
    const ENOT_AUTHORIZED: u64 = 30;
    const ENOT_OWNER: u64 = 31;
    const ENOT_INTENT_OWNER: u64 = 32;
    const ENOT_ADMIN: u64 = 33;

    // Time errors
    const EDEADLINE_PASSED: u64 = 40;
    const EAUCTION_NOT_STARTED: u64 = 41;
    const EAUCTION_ENDED: u64 = 42;
    const EAUCTION_IN_PROGRESS: u64 = 43;
    const ETOO_EARLY: u64 = 44;
    const EAUCTION_NOT_ACTIVE: u64 = 45;
    const EAUCTION_NOT_READY: u64 = 46;
    const ENO_SOLUTIONS: u64 = 47;
    const ESOLUTION_TOO_LOW: u64 = 48;

    // Scheduled intent errors
    const ECHUNK_NOT_READY: u64 = 80;
    const EPERIOD_NOT_READY: u64 = 81;
    const ETWAP_COMPLETED: u64 = 82;
    const EDCA_COMPLETED: u64 = 83;

    // Math errors
    const EOVERFLOW: u64 = 50;
    const EDIVISION_BY_ZERO: u64 = 51;
    const ESQRT_OVERFLOW: u64 = 52;

    // Solution errors
    const ESOLUTION_NOT_FOUND: u64 = 60;
    const ESOLUTION_INVALID: u64 = 61;
    const ESOLUTION_ALREADY_SUBMITTED: u64 = 62;

    // Token errors
    const EINVALID_TOKEN: u64 = 70;
    const ETOKEN_MISMATCH: u64 = 71;

    // Conditional order errors
    const EPRICE_STALE: u64 = 90;
    const ECONDITION_NOT_MET: u64 = 91;
    const EOCO_CANCELLED: u64 = 92;
    const EINVALID_TRIGGER_PRICE: u64 = 93;
    const ENOT_UPDATER: u64 = 94;
    const EORACLE_NOT_INITIALIZED: u64 = 95;

    // Dutch auction errors
    const EDUTCH_AUCTION_NOT_FOUND: u64 = 120;
    const EDUTCH_AUCTION_EXPIRED: u64 = 121;
    const EDUTCH_AUCTION_INACTIVE: u64 = 122;
    const EINVALID_DUTCH_PARAMS: u64 = 123;
    const ESTART_PRICE_TOO_LOW: u64 = 124;
    const ENOT_DUTCH_WINNER: u64 = 125;

    // Router errors
    const ENO_ROUTE_FOUND: u64 = 100;
    const EROUTE_EXPIRED: u64 = 101;
    const EPRICE_IMPACT_TOO_HIGH: u64 = 102;
    const EPOOL_NOT_FOUND: u64 = 103;
    const EINVALID_DEX_ADAPTER: u64 = 104;
    const EHOP_LIMIT_EXCEEDED: u64 = 105;
    const EROUTER_NOT_INITIALIZED: u64 = 106;
    const EDEX_ALREADY_REGISTERED: u64 = 107;
    const EPOOL_ALREADY_REGISTERED: u64 = 108;
    const EPOOL_NOT_ACTIVE: u64 = 109;
    const EEMPTY_ROUTE: u64 = 110;

    // Intent error getters
    public fun intent_not_found(): u64 { EINTENT_NOT_FOUND }
    public fun intent_already_filled(): u64 { EINTENT_ALREADY_FILLED }
    public fun intent_expired(): u64 { EINTENT_EXPIRED }
    public fun intent_cancelled(): u64 { EINTENT_CANCELLED }
    public fun intent_not_pending(): u64 { EINTENT_NOT_PENDING }
    public fun intent_already_exists(): u64 { EINTENT_ALREADY_EXISTS }

    // Amount error getters
    public fun zero_amount(): u64 { EZERO_AMOUNT }
    public fun insufficient_amount(): u64 { EINSUFFICIENT_AMOUNT }
    public fun min_amount_not_met(): u64 { EMIN_AMOUNT_NOT_MET }
    public fun insufficient_output_amount(): u64 { EINSUFFICIENT_OUTPUT_AMOUNT }
    public fun insufficient_input_amount(): u64 { EINSUFFICIENT_INPUT_AMOUNT }
    public fun insufficient_balance(): u64 { EINSUFFICIENT_BALANCE }

    // Solver error getters
    public fun solver_not_registered(): u64 { ESOLVER_NOT_REGISTERED }
    public fun solver_already_registered(): u64 { ESOLVER_ALREADY_REGISTERED }
    public fun insufficient_stake(): u64 { EINSUFFICIENT_STAKE }
    public fun solver_slashed(): u64 { ESOLVER_SLASHED }
    public fun solver_not_winner(): u64 { ESOLVER_NOT_WINNER }
    public fun reputation_too_low(): u64 { EREPUTATION_TOO_LOW }
    public fun solver_suspended(): u64 { ESOLVER_SUSPENDED }
    public fun cooldown_not_complete(): u64 { ECOOLDOWN_NOT_COMPLETE }
    public fun slash_exceeds_stake(): u64 { ESLASH_EXCEEDS_STAKE }

    // Authorization error getters
    public fun not_authorized(): u64 { ENOT_AUTHORIZED }
    public fun not_owner(): u64 { ENOT_OWNER }
    public fun not_intent_owner(): u64 { ENOT_INTENT_OWNER }
    public fun not_admin(): u64 { ENOT_ADMIN }

    // Time error getters
    public fun deadline_passed(): u64 { EDEADLINE_PASSED }
    public fun auction_not_started(): u64 { EAUCTION_NOT_STARTED }
    public fun auction_ended(): u64 { EAUCTION_ENDED }
    public fun auction_in_progress(): u64 { EAUCTION_IN_PROGRESS }
    public fun too_early(): u64 { ETOO_EARLY }
    public fun auction_not_active(): u64 { EAUCTION_NOT_ACTIVE }
    public fun auction_not_ready(): u64 { EAUCTION_NOT_READY }
    public fun no_solutions(): u64 { ENO_SOLUTIONS }
    public fun solution_too_low(): u64 { ESOLUTION_TOO_LOW }

    // Scheduled intent error getters
    public fun chunk_not_ready(): u64 { ECHUNK_NOT_READY }
    public fun period_not_ready(): u64 { EPERIOD_NOT_READY }
    public fun twap_completed(): u64 { ETWAP_COMPLETED }
    public fun dca_completed(): u64 { EDCA_COMPLETED }

    // Math error getters
    public fun overflow(): u64 { EOVERFLOW }
    public fun division_by_zero(): u64 { EDIVISION_BY_ZERO }
    public fun sqrt_overflow(): u64 { ESQRT_OVERFLOW }

    // Solution error getters
    public fun solution_not_found(): u64 { ESOLUTION_NOT_FOUND }
    public fun solution_invalid(): u64 { ESOLUTION_INVALID }
    public fun solution_already_submitted(): u64 { ESOLUTION_ALREADY_SUBMITTED }

    // Token error getters
    public fun invalid_token(): u64 { EINVALID_TOKEN }
    public fun token_mismatch(): u64 { ETOKEN_MISMATCH }

    // Conditional order error getters
    public fun price_stale(): u64 { EPRICE_STALE }
    public fun condition_not_met(): u64 { ECONDITION_NOT_MET }
    public fun oco_cancelled(): u64 { EOCO_CANCELLED }
    public fun invalid_trigger_price(): u64 { EINVALID_TRIGGER_PRICE }
    public fun not_updater(): u64 { ENOT_UPDATER }
    public fun oracle_not_initialized(): u64 { EORACLE_NOT_INITIALIZED }

    // Dutch auction error getters
    public fun dutch_auction_not_found(): u64 { EDUTCH_AUCTION_NOT_FOUND }
    public fun dutch_auction_expired(): u64 { EDUTCH_AUCTION_EXPIRED }
    public fun dutch_auction_inactive(): u64 { EDUTCH_AUCTION_INACTIVE }
    public fun invalid_dutch_params(): u64 { EINVALID_DUTCH_PARAMS }
    public fun start_price_too_low(): u64 { ESTART_PRICE_TOO_LOW }
    public fun not_dutch_winner(): u64 { ENOT_DUTCH_WINNER }

    // Router error getters
    public fun no_route_found(): u64 { ENO_ROUTE_FOUND }
    public fun route_expired(): u64 { EROUTE_EXPIRED }
    public fun price_impact_too_high(): u64 { EPRICE_IMPACT_TOO_HIGH }
    public fun pool_not_found(): u64 { EPOOL_NOT_FOUND }
    public fun invalid_dex_adapter(): u64 { EINVALID_DEX_ADAPTER }
    public fun hop_limit_exceeded(): u64 { EHOP_LIMIT_EXCEEDED }
    public fun router_not_initialized(): u64 { EROUTER_NOT_INITIALIZED }
    public fun dex_already_registered(): u64 { EDEX_ALREADY_REGISTERED }
    public fun pool_already_registered(): u64 { EPOOL_ALREADY_REGISTERED }
    public fun pool_not_active(): u64 { EPOOL_NOT_ACTIVE }
    public fun empty_route(): u64 { EEMPTY_ROUTE }
}
