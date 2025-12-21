"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VeloxSolver = void 0;
const events_1 = require("events");
const AptosClient_1 = require("./client/AptosClient");
const GraphQLClient_1 = require("./client/GraphQLClient");
const intent_1 = require("./types/intent");
const coingecko_1 = require("./utils/coingecko");
const cliStyle_1 = require("./utils/cliStyle");
class VeloxSolver extends events_1.EventEmitter {
    client;
    graphql;
    veloxAddress;
    feeConfigAddr;
    isRunning = false;
    pollingInterval;
    skipExistingOnStartup;
    registeredSolverAddress;
    veloxApiUrl;
    constructor(config) {
        super();
        this.client = new AptosClient_1.VeloxAptosClient({
            rpcUrl: config.rpcUrl,
            privateKey: config.privateKey,
            shinamiNodeKey: config.shinamiNodeKey,
        });
        this.veloxAddress = config.veloxAddress;
        this.feeConfigAddr = config.feeConfigAddr || config.veloxAddress;
        this.pollingInterval = config.pollingInterval || 1000;
        this.skipExistingOnStartup = config.skipExistingOnStartup ?? false;
        this.registeredSolverAddress = config.registeredSolverAddress;
        if (config.graphqlUrl) {
            this.graphql = new GraphQLClient_1.VeloxGraphQLClient({ url: config.graphqlUrl });
        }
        if (config.shinamiNodeKey) {
            console.log('[VeloxSolver] Shinami Node Service enabled for enhanced reliability');
        }
        this.veloxApiUrl = config.veloxApiUrl;
        if (this.veloxApiUrl) {
            console.log(`[VeloxSolver] Velox API configured: ${this.veloxApiUrl}`);
        }
    }
    // ============ Intent Discovery ============
    async getActiveIntents() {
        // Get total intents count
        const totalResult = await this.client.view({
            function: `${this.veloxAddress}::submission::get_total_intents`,
            typeArguments: [],
            functionArguments: [this.veloxAddress],
        });
        const totalIntents = parseInt(totalResult[0] || '0');
        const activeIntents = [];
        // Iterate through all intents and filter active ones
        for (let i = 0; i < totalIntents; i++) {
            try {
                const intentResult = await this.client.view({
                    function: `${this.veloxAddress}::submission::get_intent`,
                    typeArguments: [],
                    functionArguments: [this.veloxAddress, i],
                });
                if (intentResult[0]) {
                    const record = this.parseIntentRecord(intentResult[0]);
                    if (record.status === intent_1.IntentStatus.ACTIVE) {
                        activeIntents.push(record);
                    }
                }
            }
            catch (error) {
                console.log(`Skipping intent ${i}:`, error.message);
            }
        }
        return activeIntents;
    }
    async getIntent(intentId) {
        try {
            const result = await this.client.view({
                function: `${this.veloxAddress}::submission::get_intent`,
                typeArguments: [],
                functionArguments: [this.veloxAddress, intentId],
            });
            return result[0] ? this.parseIntentRecord(result[0]) : null;
        }
        catch {
            return null;
        }
    }
    async startIntentStream(callback) {
        // Validate solver registration before starting
        await this.validateSolverRegistration();
        this.isRunning = true;
        this.pollIntents(callback);
    }
    stopIntentStream() {
        this.isRunning = false;
    }
    // ============ Solver Registration Validation ============
    /**
     * Validate that solver is registered with stake before starting
     * Fetches and displays solver metadata
     */
    async validateSolverRegistration() {
        if (!this.client.hasAccount()) {
            throw new Error('❌ SOLVER ACCOUNT INITIALIZATION FAILED\n\n' +
                'Could not initialize account from SOLVER_PRIVATE_KEY.\n' +
                'This usually means:\n' +
                '  1. SOLVER_PRIVATE_KEY is not set in .env\n' +
                '  2. SOLVER_PRIVATE_KEY is in an invalid format (should be 0x...)\n' +
                '  3. Private key is malformed or corrupted\n\n' +
                'Please verify your .env configuration and try again.');
        }
        const operatorAddress = this.client.getAccountAddress();
        if (!operatorAddress) {
            throw new Error('❌ OPERATOR ADDRESS DERIVATION FAILED\n\n' +
                'Could not derive operator address from private key.\n' +
                'Please check that your SOLVER_PRIVATE_KEY is valid.');
        }
        // Use registered solver address if provided, otherwise use operator address
        const solverAddress = this.registeredSolverAddress || operatorAddress;
        (0, cliStyle_1.printVeloxLogo)();
        (0, cliStyle_1.printSection)('🔐 SOLVER REGISTRATION VALIDATION');
        await (0, cliStyle_1.printLoadingAnimation)('📋 Validating solver credentials', 1000);
        (0, cliStyle_1.printInfo)(`Registered Solver Address: ${solverAddress}`);
        if (this.registeredSolverAddress) {
            (0, cliStyle_1.printInfo)(`Operator Address: ${operatorAddress}`);
        }
        try {
            const stats = await this.getSolverStats(solverAddress);
            if (!stats.isRegistered) {
                (0, cliStyle_1.printError)('Solver is NOT registered with Velox network');
                (0, cliStyle_1.printSection)('❌ REGISTRATION REQUIRED');
                console.log('');
                console.log('  Your solver must be registered before starting.');
                console.log('');
                (0, cliStyle_1.printInfo)('Run this command to register with stake:');
                console.log('');
                console.log('  \x1b[1mmovement move run \\');
                console.log('    --function-id <VELOX>::solver_registry::register_and_stake \\');
                console.log('    --args \\');
                console.log('      string:"<metadata_uri>" \\');
                console.log('      u64:<stake_amount>\x1b[0m');
                console.log('');
                (0, cliStyle_1.printInfo)('Example (with 1 MOVE stake):');
                console.log('');
                console.log('  \x1b[1mmovement move run \\');
                console.log('    --function-id 0x123...::solver_registry::register_and_stake \\');
                console.log('    --args \\');
                console.log('      string:"https://example.com/solver" \\');
                console.log('      u64:1000000000\x1b[0m');
                console.log('');
                throw new Error('Solver not registered');
            }
            if (stats.stake === 0n) {
                (0, cliStyle_1.printWarning)('Solver has no stake');
                (0, cliStyle_1.printSection)('⚠️  NO STAKE FOUND');
                console.log('');
                console.log('  Your solver is registered but has no active stake.');
                console.log('');
                (0, cliStyle_1.printInfo)('Add stake using:');
                console.log('');
                console.log('  \x1b[1mmovement move run \\');
                console.log('    --function-id <VELOX>::solver_registry::add_stake \\');
                console.log('    --args \\');
                console.log('      address:<registry_address> \\');
                console.log('      u64:<stake_amount>\x1b[0m');
                console.log('');
                throw new Error('Solver has no stake');
            }
            await (0, cliStyle_1.printLoadingAnimation)('📊 Loading solver profile', 800);
            (0, cliStyle_1.printSuccess)('Solver validation PASSED');
            (0, cliStyle_1.printSection)('✅ SOLVER READY TO START');
            // Profile metrics
            (0, cliStyle_1.printMetricBox)('📊 SOLVER PROFILE', [
                { label: 'Address', value: stats.address.slice(0, 12) + '...' + stats.address.slice(-8) },
                { label: 'Status', value: stats.isActive ? '🟢 ACTIVE' : '🔴 INACTIVE' },
                { label: 'Registered', value: stats.isRegistered ? '✓ Yes' : '✗ No' },
            ]);
            // Stake metrics
            (0, cliStyle_1.printMetricBox)('💰 STAKE INFORMATION', [
                { label: 'Total Stake (Octas)', value: stats.stake.toString() },
                { label: 'Pending Unstake', value: stats.pendingUnstake.toString() },
            ]);
            // Performance metrics
            (0, cliStyle_1.printMetricBox)('🎯 PERFORMANCE METRICS', [
                { label: 'Reputation Score', value: `${stats.reputationScore}/10000` },
                { label: 'Successful Fills', value: stats.successfulFills.toString() },
                { label: 'Failed Fills', value: stats.failedFills.toString() },
                { label: 'Total Volume (Octas)', value: stats.totalVolume.toString() },
            ]);
            // Activity metrics
            const registeredDate = new Date(stats.registeredAt * 1000).toISOString();
            const lastActiveDate = stats.lastActive > 0 ? new Date(stats.lastActive * 1000).toISOString() : 'Never';
            (0, cliStyle_1.printMetricBox)('📅 ACTIVITY LOG', [
                { label: 'Registered At', value: registeredDate },
                { label: 'Last Active', value: lastActiveDate },
            ]);
            await (0, cliStyle_1.printLoadingAnimation)('🚀 Initializing intent stream', 1200);
            (0, cliStyle_1.printSuccess)('Solver initialized and ready!');
            console.log('');
        }
        catch (error) {
            if (error instanceof Error && (error.message.includes('not registered') || error.message.includes('no stake'))) {
                throw error;
            }
            throw new Error(`Failed to validate solver registration: ${error.message}`);
        }
    }
    // ============ Fill Functions (NEW) ============
    /**
     * Fill a swap intent (partial or full)
     * Uses settlement::fill_swap
     */
    async fillSwap(params) {
        if (!this.client.hasAccount()) {
            throw new Error('Solver account not configured');
        }
        console.log(`Calling fill_swap:`);
        console.log(`  Registry: ${this.veloxAddress}`);
        console.log(`  Fee Config: ${this.feeConfigAddr}`);
        console.log(`  Intent ID: ${params.intentId}`);
        console.log(`  Fill Input: ${params.fillInput}`);
        console.log(`  Output Amount: ${params.outputAmount}`);
        try {
            const txHash = await this.client.submitTransaction({
                function: `${this.veloxAddress}::settlement::fill_swap`,
                typeArguments: [],
                functionArguments: [
                    this.veloxAddress,
                    this.feeConfigAddr,
                    params.intentId.toString(),
                    params.fillInput.toString(),
                    params.outputAmount.toString(),
                ],
            });
            console.log(`fill_swap transaction successful: ${txHash}`);
            // Record taker transaction in Velox API
            await this.recordTakerTransaction(params.intentId, txHash, params.fillInput);
            return {
                success: true,
                txHash,
                fillInput: params.fillInput,
                outputAmount: params.outputAmount,
            };
        }
        catch (error) {
            console.error(`fill_swap failed:`, error);
            return { success: false, error: error.message };
        }
    }
    /**
     * Fill a limit order (partial or full)
     * Uses settlement::fill_limit_order
     */
    async fillLimitOrder(params) {
        if (!this.client.hasAccount()) {
            throw new Error('Solver account not configured');
        }
        console.log(`Calling fill_limit_order:`);
        console.log(`  Registry: ${this.veloxAddress}`);
        console.log(`  Fee Config: ${this.feeConfigAddr}`);
        console.log(`  Intent ID: ${params.intentId}`);
        console.log(`  Fill Input: ${params.fillInput}`);
        console.log(`  Output Amount: ${params.outputAmount}`);
        try {
            const txHash = await this.client.submitTransaction({
                function: `${this.veloxAddress}::settlement::fill_limit_order`,
                typeArguments: [],
                functionArguments: [
                    this.veloxAddress,
                    this.feeConfigAddr,
                    params.intentId.toString(),
                    params.fillInput.toString(),
                    params.outputAmount.toString(),
                ],
            });
            console.log(`fill_limit_order transaction successful: ${txHash}`);
            // Record taker transaction in Velox API
            await this.recordTakerTransaction(params.intentId, txHash, params.fillInput);
            return {
                success: true,
                txHash,
                fillInput: params.fillInput,
                outputAmount: params.outputAmount,
            };
        }
        catch (error) {
            console.error(`fill_limit_order failed:`, error);
            return { success: false, error: error.message };
        }
    }
    /**
     * Fill a TWAP chunk
     * Uses settlement::fill_twap_chunk
     */
    async fillTwapChunk(params) {
        if (!this.client.hasAccount()) {
            throw new Error('Solver account not configured');
        }
        console.log(`Calling fill_twap_chunk:`);
        console.log(`  Registry: ${this.veloxAddress}`);
        console.log(`  Fee Config: ${this.feeConfigAddr}`);
        console.log(`  Intent ID: ${params.intentId}`);
        console.log(`  Output Amount: ${params.outputAmount}`);
        try {
            const txHash = await this.client.submitTransaction({
                function: `${this.veloxAddress}::settlement::fill_twap_chunk`,
                typeArguments: [],
                functionArguments: [
                    this.veloxAddress,
                    this.feeConfigAddr,
                    params.intentId.toString(),
                    params.outputAmount.toString(),
                ],
            });
            console.log(`fill_twap_chunk transaction successful: ${txHash}`);
            // Record taker transaction in Velox API
            await this.recordTakerTransaction(params.intentId, txHash, params.outputAmount);
            return { success: true, txHash, outputAmount: params.outputAmount };
        }
        catch (error) {
            console.error(`fill_twap_chunk failed:`, error);
            return { success: false, error: error.message };
        }
    }
    /**
     * Fill a DCA period
     * Uses settlement::fill_dca_period
     */
    async fillDcaPeriod(params) {
        if (!this.client.hasAccount()) {
            throw new Error('Solver account not configured');
        }
        console.log(`Calling fill_dca_period:`);
        console.log(`  Registry: ${this.veloxAddress}`);
        console.log(`  Fee Config: ${this.feeConfigAddr}`);
        console.log(`  Intent ID: ${params.intentId}`);
        console.log(`  Output Amount: ${params.outputAmount}`);
        try {
            const txHash = await this.client.submitTransaction({
                function: `${this.veloxAddress}::settlement::fill_dca_period`,
                typeArguments: [],
                functionArguments: [
                    this.veloxAddress,
                    this.feeConfigAddr,
                    params.intentId.toString(),
                    params.outputAmount.toString(),
                ],
            });
            console.log(`fill_dca_period transaction successful: ${txHash}`);
            // Record taker transaction in Velox API
            await this.recordTakerTransaction(params.intentId, txHash, params.outputAmount);
            return { success: true, txHash, outputAmount: params.outputAmount };
        }
        catch (error) {
            console.error(`fill_dca_period failed:`, error);
            return { success: false, error: error.message };
        }
    }
    /**
     * Record a taker transaction in the Velox API (Supabase)
     * Called automatically after successful fills if veloxApiUrl is configured
     */
    async recordTakerTransaction(intentId, txHash, fillAmount) {
        if (!this.veloxApiUrl) {
            console.log('[VeloxSolver] No Velox API URL configured, skipping transaction recording');
            return;
        }
        const solverAddress = this.client.getAccountAddress();
        if (!solverAddress) {
            console.warn('[VeloxSolver] No solver address available for recording transaction');
            return;
        }
        try {
            const response = await fetch(`${this.veloxApiUrl}/api/transactions/taker`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    intent_id: intentId.toString(),
                    taker_tx_hash: txHash,
                    solver_address: solverAddress,
                    fill_amount: fillAmount?.toString(),
                }),
            });
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                console.warn(`[VeloxSolver] Failed to record taker tx: ${response.status}`, errorData);
                return;
            }
            console.log(`[VeloxSolver] Taker transaction recorded: ${txHash}`);
        }
        catch (error) {
            console.warn('[VeloxSolver] Error recording taker transaction:', error.message);
        }
    }
    // ============ View Functions ============
    /**
     * Check if solver can fill an intent
     */
    async canFill(intentId) {
        try {
            const solverAddr = this.client.getAccountAddress();
            if (!solverAddr)
                return false;
            const result = await this.client.view({
                function: `${this.veloxAddress}::settlement::can_fill`,
                typeArguments: [],
                functionArguments: [this.veloxAddress, intentId.toString(), solverAddr],
            });
            return result[0] ?? false;
        }
        catch (error) {
            console.error(`Error checking can_fill:`, error);
            return false;
        }
    }
    /**
     * Calculate minimum output for a partial fill
     */
    async calculateMinOutput(intentId, fillInput) {
        try {
            const result = await this.client.view({
                function: `${this.veloxAddress}::settlement::calculate_min_output_for_fill`,
                typeArguments: [],
                functionArguments: [this.veloxAddress, intentId.toString(), fillInput.toString()],
            });
            return BigInt(result[0] || '0');
        }
        catch (error) {
            console.error(`Error calculating min output:`, error);
            return 0n;
        }
    }
    /**
     * Get current Dutch auction price
     */
    async getDutchPrice(intentId) {
        try {
            const result = await this.client.view({
                function: `${this.veloxAddress}::auction::get_current_dutch_price`,
                typeArguments: [],
                functionArguments: [this.veloxAddress, intentId.toString()],
            });
            return BigInt(result[0] || '0');
        }
        catch (error) {
            console.error(`Error getting Dutch price:`, error);
            return 0n;
        }
    }
    /**
     * Get auction winner
     */
    async getAuctionWinner(intentId) {
        try {
            const result = await this.client.view({
                function: `${this.veloxAddress}::auction::get_winner`,
                typeArguments: [],
                functionArguments: [this.veloxAddress, intentId.toString()],
            });
            return { hasWinner: result[0] ?? false, winner: result[1] ?? '' };
        }
        catch (error) {
            console.error(`Error getting auction winner:`, error);
            return { hasWinner: false, winner: '' };
        }
    }
    /**
     * Get fee basis points
     */
    async getFeeBps() {
        try {
            const result = await this.client.view({
                function: `${this.veloxAddress}::settlement::get_fee_bps`,
                typeArguments: [],
                functionArguments: [this.feeConfigAddr],
            });
            return Number(result[0] || '30');
        }
        catch (error) {
            console.error(`Error getting fee bps:`, error);
            return 30; // Default 0.3%
        }
    }
    // ============ Auction Functions ============
    /**
     * Submit a bid to a sealed-bid auction
     */
    async submitBid(intentId, outputAmount) {
        if (!this.client.hasAccount()) {
            throw new Error('Solver account not configured');
        }
        console.log(`Calling submit_bid:`);
        console.log(`  Registry: ${this.veloxAddress}`);
        console.log(`  Intent ID: ${intentId}`);
        console.log(`  Output Amount: ${outputAmount}`);
        try {
            const txHash = await this.client.submitTransaction({
                function: `${this.veloxAddress}::auction::submit_bid`,
                typeArguments: [],
                functionArguments: [
                    this.veloxAddress,
                    intentId.toString(),
                    outputAmount.toString(),
                ],
            });
            console.log(`submit_bid transaction successful: ${txHash}`);
            return { success: true, txHash };
        }
        catch (error) {
            console.error(`submit_bid failed:`, error);
            return { success: false, error: error.message };
        }
    }
    /**
     * Accept a Dutch auction at current price
     */
    async acceptDutchAuction(intentId) {
        if (!this.client.hasAccount()) {
            throw new Error('Solver account not configured');
        }
        console.log(`Calling accept_dutch:`);
        console.log(`  Registry: ${this.veloxAddress}`);
        console.log(`  Intent ID: ${intentId}`);
        try {
            const txHash = await this.client.submitTransaction({
                function: `${this.veloxAddress}::auction::accept_dutch`,
                typeArguments: [],
                functionArguments: [this.veloxAddress, intentId.toString()],
            });
            console.log(`accept_dutch transaction successful: ${txHash}`);
            return { success: true, txHash };
        }
        catch (error) {
            console.error(`accept_dutch failed:`, error);
            return { success: false, error: error.message };
        }
    }
    /**
     * Complete a sealed-bid auction (after end time)
     */
    async completeSealedBid(intentId) {
        console.log(`Calling complete_sealed_bid:`);
        console.log(`  Registry: ${this.veloxAddress}`);
        console.log(`  Intent ID: ${intentId}`);
        try {
            const txHash = await this.client.submitTransaction({
                function: `${this.veloxAddress}::auction::complete_sealed_bid`,
                typeArguments: [],
                functionArguments: [this.veloxAddress, intentId.toString()],
            });
            console.log(`complete_sealed_bid transaction successful: ${txHash}`);
            return { success: true, txHash };
        }
        catch (error) {
            console.error(`complete_sealed_bid failed:`, error);
            return { success: false, error: error.message };
        }
    }
    // ============ Pricing & Routing ============
    async findBestRoute(tokenIn, tokenOut, amountIn) {
        // Use CoinGecko pricing to calculate output
        const { outputAmount } = await (0, coingecko_1.calculateOutputFromPrices)(tokenIn, tokenOut, amountIn, 8, // input decimals
        8 // output decimals
        );
        // Apply a small spread for solver profit (0.1%)
        const finalOutput = (0, coingecko_1.applySpread)(outputAmount, 10);
        console.log(`Route found: ${(0, coingecko_1.getTokenSymbol)(tokenIn)} -> ${(0, coingecko_1.getTokenSymbol)(tokenOut)}`);
        console.log(`  Raw output: ${outputAmount}`);
        console.log(`  After spread: ${finalOutput}`);
        return {
            steps: [
                {
                    dexId: 0,
                    poolAddress: 'direct',
                    tokenIn,
                    tokenOut,
                    amountIn,
                    expectedOut: finalOutput,
                },
            ],
            expectedOutput: finalOutput,
            priceImpact: 0,
        };
    }
    // ============ Solver Stats ============
    async getSolverStats(address) {
        const solverAddress = address || this.client.getAccountAddress();
        if (!solverAddress) {
            throw new Error('No solver address provided');
        }
        try {
            const result = await this.client.view({
                function: `${this.veloxAddress}::solver_registry::get_solver_info`,
                typeArguments: [],
                functionArguments: [this.veloxAddress, solverAddress],
            });
            return this.parseSolverStats(result[0], solverAddress);
        }
        catch (error) {
            console.error(`Error getting solver stats:`, error);
            return {
                address: solverAddress,
                isRegistered: false,
                isActive: false,
                stake: 0n,
                pendingUnstake: 0n,
                unstakeAvailableAt: 0,
                reputationScore: 0,
                successfulFills: 0,
                failedFills: 0,
                totalVolume: 0n,
                registeredAt: 0,
                lastActive: 0,
            };
        }
    }
    // ============ Private Methods ============
    async pollIntents(callback) {
        const lastSeen = new Set();
        if (this.skipExistingOnStartup) {
            try {
                const existingIntents = await this.getActiveIntents();
                console.log(`Skipping ${existingIntents.length} existing active intents...`);
                for (const record of existingIntents) {
                    lastSeen.add(record.id);
                }
            }
            catch (error) {
                this.emit('error', error);
            }
        }
        while (this.isRunning) {
            try {
                const intents = await this.getActiveIntents();
                for (const record of intents) {
                    if (!lastSeen.has(record.id)) {
                        callback(record);
                        lastSeen.add(record.id);
                    }
                }
            }
            catch (error) {
                this.emit('error', error);
            }
            await new Promise((resolve) => setTimeout(resolve, this.pollingInterval));
        }
    }
    parseIntentRecord(raw) {
        const data = raw;
        // Parse intent from enum variant
        const rawIntent = data.intent;
        const intent = this.parseIntent(rawIntent);
        // Parse auction state - use empty auction if not present
        const rawAuction = data.auction;
        const auction = rawAuction ? this.parseAuctionState(rawAuction) : { type: intent_1.AuctionType.NONE };
        // Parse status - default to ACTIVE if not present
        const rawStatus = data.status;
        const status = rawStatus?.type
            ? (0, intent_1.parseIntentStatus)(rawStatus)
            : intent_1.IntentStatus.ACTIVE;
        // Parse fills - default to empty array if not present
        const rawFills = data.fills || [];
        const fills = rawFills.map((f) => {
            const fill = f;
            return {
                solver: String(fill.solver || ''),
                inputAmount: BigInt(String(fill.input_amount || '0')),
                outputAmount: BigInt(String(fill.output_amount || '0')),
                filledAt: Number(fill.filled_at || 0),
            };
        });
        // Use escrowed_amount as escrow_remaining fallback
        const escrowRemaining = data.escrow_remaining || data.escrowed_amount;
        const totalOutputReceived = data.total_output_received || data.filled_amount || '0';
        return {
            id: Number(data.id || 0),
            user: String(data.user || ''),
            createdAt: Number(data.created_at || 0),
            intent,
            auction,
            status,
            escrowRemaining: BigInt(String(escrowRemaining || '0')),
            totalOutputReceived: BigInt(String(totalOutputReceived || '0')),
            fills,
            chunksExecuted: Number(data.chunks_executed || 0),
            nextExecution: Number(data.next_execution || 0),
        };
    }
    parseIntent(raw) {
        // Handle Move 2.0 enum variant pattern
        const variant = raw.__variant__ || raw.type || raw.variant;
        let type = intent_1.IntentType.SWAP;
        if (typeof variant === 'string') {
            type = (0, intent_1.parseIntentType)({ type: variant });
        }
        // Extract fields based on type
        const inputToken = String(raw.input_token || '');
        const outputToken = String(raw.output_token || '');
        const intent = {
            type,
            inputToken,
            outputToken,
        };
        // Swap fields
        if (raw.amount_in)
            intent.amountIn = BigInt(String(raw.amount_in));
        if (raw.min_amount_out)
            intent.minAmountOut = BigInt(String(raw.min_amount_out));
        if (raw.deadline)
            intent.deadline = Number(raw.deadline);
        // LimitOrder fields
        if (raw.limit_price)
            intent.limitPrice = BigInt(String(raw.limit_price));
        if (raw.expiry)
            intent.expiry = Number(raw.expiry);
        // TWAP fields
        if (raw.total_amount)
            intent.totalAmount = BigInt(String(raw.total_amount));
        if (raw.num_chunks)
            intent.numChunks = Number(raw.num_chunks);
        if (raw.interval_seconds)
            intent.intervalSeconds = Number(raw.interval_seconds);
        if (raw.max_slippage_bps)
            intent.maxSlippageBps = Number(raw.max_slippage_bps);
        if (raw.start_time)
            intent.startTime = Number(raw.start_time);
        // DCA fields
        if (raw.amount_per_period)
            intent.amountPerPeriod = BigInt(String(raw.amount_per_period));
        if (raw.total_periods)
            intent.totalPeriods = Number(raw.total_periods);
        return intent;
    }
    parseAuctionState(raw) {
        const variant = raw.__variant__ || raw.type;
        if (!variant || variant === 'None') {
            return { type: intent_1.AuctionType.NONE };
        }
        const type = (0, intent_1.parseAuctionType)({ type: String(variant) });
        const auction = { type };
        // SealedBidActive fields
        if (raw.end_time)
            auction.endTime = Number(raw.end_time);
        if (raw.bids && Array.isArray(raw.bids)) {
            auction.bids = raw.bids.map((b) => {
                const bid = b;
                return {
                    solver: String(bid.solver || ''),
                    outputAmount: BigInt(String(bid.output_amount || '0')),
                    submittedAt: Number(bid.submitted_at || 0),
                };
            });
        }
        // SealedBidCompleted fields
        if (raw.winner)
            auction.winner = String(raw.winner);
        if (raw.winning_bid)
            auction.winningBid = BigInt(String(raw.winning_bid));
        if (raw.fill_deadline)
            auction.fillDeadline = Number(raw.fill_deadline);
        // DutchActive fields
        if (raw.start_price)
            auction.startPrice = BigInt(String(raw.start_price));
        if (raw.end_price)
            auction.endPrice = BigInt(String(raw.end_price));
        // DutchAccepted fields
        if (raw.accepted_price)
            auction.acceptedPrice = BigInt(String(raw.accepted_price));
        return auction;
    }
    parseSolverStats(raw, address) {
        const data = raw;
        return {
            address,
            isRegistered: true,
            isActive: Boolean(data.is_active),
            stake: BigInt(String(data.stake || '0')),
            pendingUnstake: BigInt(String(data.pending_unstake || '0')),
            unstakeAvailableAt: Number(data.unstake_available_at || 0),
            reputationScore: Number(data.reputation_score || 0),
            successfulFills: Number(data.successful_fills || 0),
            failedFills: Number(data.failed_fills || 0),
            totalVolume: BigInt(String(data.total_volume || '0')),
            registeredAt: Number(data.registered_at || 0),
            lastActive: Number(data.last_active || 0),
        };
    }
}
exports.VeloxSolver = VeloxSolver;
//# sourceMappingURL=VeloxSolver.js.map