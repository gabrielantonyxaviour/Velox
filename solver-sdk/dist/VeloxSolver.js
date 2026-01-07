"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VeloxSolver = void 0;
const events_1 = require("events");
const AptosClient_1 = require("./client/AptosClient");
const GraphQLClient_1 = require("./client/GraphQLClient");
const intent_1 = require("./types/intent");
const pricing_1 = require("./utils/pricing");
const coingecko_1 = require("./utils/coingecko");
class VeloxSolver extends events_1.EventEmitter {
    client;
    graphql;
    veloxAddress;
    isRunning = false;
    pollingInterval;
    skipExistingOnStartup;
    constructor(config) {
        super();
        this.client = new AptosClient_1.VeloxAptosClient({
            rpcUrl: config.rpcUrl,
            privateKey: config.privateKey,
        });
        this.veloxAddress = config.veloxAddress;
        this.pollingInterval = config.pollingInterval || 1000;
        this.skipExistingOnStartup = config.skipExistingOnStartup ?? false;
        if (config.graphqlUrl) {
            this.graphql = new GraphQLClient_1.VeloxGraphQLClient({ url: config.graphqlUrl });
        }
    }
    // ============ Intent Discovery ============
    async getPendingIntents() {
        if (this.graphql) {
            return this.graphql.getPendingIntents();
        }
        // Get total intents count
        const totalResult = await this.client.view({
            function: `${this.veloxAddress}::submission::get_total_intents`,
            typeArguments: [],
            functionArguments: [this.veloxAddress],
        });
        const totalIntents = parseInt(totalResult[0] || '0');
        const pendingIntents = [];
        // Iterate through all intents and filter pending ones
        for (let i = 0; i < totalIntents; i++) {
            try {
                const intentResult = await this.client.view({
                    function: `${this.veloxAddress}::submission::get_intent`,
                    typeArguments: [],
                    functionArguments: [this.veloxAddress, i],
                });
                if (intentResult[0]) {
                    const intent = this.parseIntent(intentResult[0]);
                    // Only include pending intents (status 0)
                    if (intent.status === intent_1.IntentStatus.PENDING) {
                        pendingIntents.push(intent);
                    }
                }
            }
            catch (error) {
                // Intent might not exist or be in unexpected format, skip it
                console.log(`Skipping intent ${i}:`, error.message);
            }
        }
        return pendingIntents;
    }
    async getIntent(intentId) {
        if (this.graphql) {
            return this.graphql.getIntentById(intentId);
        }
        try {
            const result = await this.client.view({
                function: `${this.veloxAddress}::submission::get_intent`,
                typeArguments: [],
                functionArguments: [this.veloxAddress, intentId],
            });
            return result[0] ? this.parseIntent(result[0]) : null;
        }
        catch {
            return null;
        }
    }
    startIntentStream(callback) {
        this.isRunning = true;
        this.pollIntents(callback);
    }
    stopIntentStream() {
        this.isRunning = false;
    }
    // ============ Solution Submission ============
    async submitSolution(solution) {
        if (!this.client.hasAccount()) {
            throw new Error('Solver account not configured');
        }
        try {
            const txHash = await this.client.submitTransaction({
                function: `${this.veloxAddress}::settlement::submit_solution`,
                typeArguments: [],
                functionArguments: [
                    solution.intentId,
                    solution.outputAmount.toString(),
                    solution.executionPrice.toString(),
                ],
            });
            return { success: true, txHash };
        }
        catch (error) {
            return { success: false, error: error.message };
        }
    }
    async executeSettlement(intentId) {
        if (!this.client.hasAccount()) {
            throw new Error('Solver account not configured');
        }
        try {
            const txHash = await this.client.submitTransaction({
                function: `${this.veloxAddress}::settlement::execute_settlement`,
                typeArguments: [],
                functionArguments: [intentId],
            });
            return { success: true, txHash };
        }
        catch (error) {
            return { success: false, error: error.message };
        }
    }
    /**
     * Solve a swap intent by directly providing output tokens
     * Calls settlement::solve_swap which transfers:
     * - Output tokens from solver to user
     * - Input tokens from escrow to solver
     */
    async solveSwap(intentId, outputAmount) {
        if (!this.client.hasAccount()) {
            throw new Error('Solver account not configured');
        }
        console.log(`Calling solve_swap:`);
        console.log(`  Registry: ${this.veloxAddress}`);
        console.log(`  Intent ID: ${intentId}`);
        console.log(`  Output Amount: ${outputAmount}`);
        try {
            const txHash = await this.client.submitTransaction({
                function: `${this.veloxAddress}::settlement::solve_swap`,
                typeArguments: [],
                functionArguments: [this.veloxAddress, intentId, outputAmount.toString()],
            });
            console.log(`solve_swap transaction successful: ${txHash}`);
            return { success: true, txHash };
        }
        catch (error) {
            console.error(`solve_swap failed:`, error);
            return { success: false, error: error.message };
        }
    }
    /**
     * Solve a limit order intent (supports partial fills)
     * Calls settlement::solve_limit_order which:
     * - Validates price meets limit_price constraint
     * - Transfers output tokens from solver to user
     * - Transfers fill_amount of input tokens from escrow to solver
     */
    async solveLimitOrder(intentId, fillAmount, outputAmount) {
        if (!this.client.hasAccount()) {
            throw new Error('Solver account not configured');
        }
        console.log(`Calling solve_limit_order:`);
        console.log(`  Registry: ${this.veloxAddress}`);
        console.log(`  Intent ID: ${intentId}`);
        console.log(`  Fill Amount: ${fillAmount}`);
        console.log(`  Output Amount: ${outputAmount}`);
        try {
            const txHash = await this.client.submitTransaction({
                function: `${this.veloxAddress}::settlement::solve_limit_order`,
                typeArguments: [],
                functionArguments: [
                    this.veloxAddress,
                    intentId,
                    fillAmount.toString(),
                    outputAmount.toString(),
                ],
            });
            console.log(`solve_limit_order transaction successful: ${txHash}`);
            return { success: true, txHash };
        }
        catch (error) {
            console.error(`solve_limit_order failed:`, error);
            return { success: false, error: error.message };
        }
    }
    /**
     * Solve a DCA period by directly providing output tokens
     * Calls settlement::solve_dca_period which transfers:
     * - Output tokens from solver to user
     * - Period's input tokens from escrow to solver
     */
    async solveDCAPeriod(intentId, outputAmount, scheduledRegistryAddr) {
        if (!this.client.hasAccount()) {
            throw new Error('Solver account not configured');
        }
        const registryAddr = scheduledRegistryAddr || this.veloxAddress;
        console.log(`Calling solve_dca_period:`);
        console.log(`  Registry: ${this.veloxAddress}`);
        console.log(`  Scheduled Registry: ${registryAddr}`);
        console.log(`  Intent ID: ${intentId}`);
        console.log(`  Output Amount: ${outputAmount}`);
        try {
            const txHash = await this.client.submitTransaction({
                function: `${this.veloxAddress}::settlement::solve_dca_period`,
                typeArguments: [],
                functionArguments: [
                    this.veloxAddress,
                    registryAddr,
                    intentId,
                    outputAmount.toString(),
                ],
            });
            console.log(`solve_dca_period transaction successful: ${txHash}`);
            return { success: true, txHash };
        }
        catch (error) {
            console.error(`solve_dca_period failed:`, error);
            return { success: false, error: error.message };
        }
    }
    /**
     * Solve a TWAP chunk by directly providing output tokens
     * Calls settlement::solve_twap_chunk which transfers:
     * - Output tokens from solver to user
     * - Chunk's input tokens from escrow to solver
     */
    async solveTWAPChunk(intentId, outputAmount, scheduledRegistryAddr) {
        if (!this.client.hasAccount()) {
            throw new Error('Solver account not configured');
        }
        const registryAddr = scheduledRegistryAddr || this.veloxAddress;
        console.log(`Calling solve_twap_chunk:`);
        console.log(`  Registry: ${this.veloxAddress}`);
        console.log(`  Scheduled Registry: ${registryAddr}`);
        console.log(`  Intent ID: ${intentId}`);
        console.log(`  Output Amount: ${outputAmount}`);
        try {
            const txHash = await this.client.submitTransaction({
                function: `${this.veloxAddress}::settlement::solve_twap_chunk`,
                typeArguments: [],
                functionArguments: [
                    this.veloxAddress,
                    registryAddr,
                    intentId,
                    outputAmount.toString(),
                ],
            });
            console.log(`solve_twap_chunk transaction successful: ${txHash}`);
            return { success: true, txHash };
        }
        catch (error) {
            console.error(`solve_twap_chunk failed:`, error);
            return { success: false, error: error.message };
        }
    }
    /**
     * Check if a TWAP chunk is ready for execution
     */
    async isTWAPChunkReady(intentId, scheduledRegistryAddr) {
        const registryAddr = scheduledRegistryAddr || this.veloxAddress;
        try {
            const result = await this.client.view({
                function: `${this.veloxAddress}::scheduled::is_ready_for_execution`,
                typeArguments: [],
                functionArguments: [registryAddr, intentId],
            });
            return result[0] ?? false;
        }
        catch (error) {
            console.error(`Error checking TWAP chunk readiness:`, error);
            return false;
        }
    }
    /**
     * Check if a DCA period is ready for execution
     */
    async isDCAPeriodReady(intentId, scheduledRegistryAddr) {
        const registryAddr = scheduledRegistryAddr || this.veloxAddress;
        try {
            const result = await this.client.view({
                function: `${this.veloxAddress}::scheduled::is_ready_for_execution`,
                typeArguments: [],
                functionArguments: [registryAddr, intentId],
            });
            return result[0] ?? false;
        }
        catch (error) {
            console.error(`Error checking DCA period readiness:`, error);
            return false;
        }
    }
    /**
     * Check if a DCA/TWAP is completed
     */
    async isScheduledCompleted(intentId, scheduledRegistryAddr) {
        const registryAddr = scheduledRegistryAddr || this.veloxAddress;
        try {
            const result = await this.client.view({
                function: `${this.veloxAddress}::scheduled::is_completed`,
                typeArguments: [],
                functionArguments: [registryAddr, intentId],
            });
            return result[0] ?? false;
        }
        catch (error) {
            console.error(`Error checking completion status:`, error);
            return false;
        }
    }
    /**
     * Get the number of periods/chunks executed for a scheduled intent
     */
    async getExecutedPeriods(intentId, scheduledRegistryAddr) {
        const registryAddr = scheduledRegistryAddr || this.veloxAddress;
        try {
            const result = await this.client.view({
                function: `${this.veloxAddress}::scheduled::get_chunks_executed`,
                typeArguments: [],
                functionArguments: [registryAddr, intentId],
            });
            return parseInt(result[0] || '0');
        }
        catch (error) {
            console.error(`Error getting executed periods:`, error);
            return 0;
        }
    }
    /**
     * Check if a limit order can be filled at current market price
     * Returns the execution price if fillable, null otherwise
     */
    async canFillLimitOrder(intent) {
        if (!intent.limitPrice) {
            return { canFill: false, executionPrice: BigInt(0), outputAmount: BigInt(0) };
        }
        // Get market price and calculate output
        const route = await this.findBestRoute(intent.inputToken.address, intent.outputToken.address, intent.inputAmount);
        const outputAmount = route.expectedOutput;
        // execution_price = (output_amount * 10000) / input_amount
        const executionPrice = (outputAmount * BigInt(10000)) / intent.inputAmount;
        // Order fills only if execution_price >= limit_price
        const canFill = executionPrice >= intent.limitPrice;
        console.log(`Limit order check:`);
        console.log(`  Limit price: ${intent.limitPrice}`);
        console.log(`  Execution price: ${executionPrice}`);
        console.log(`  Can fill: ${canFill}`);
        return { canFill, executionPrice, outputAmount };
    }
    // ============ Pricing & Routing ============
    async calculateOptimalSolution(intent) {
        const route = await this.findBestRoute(intent.inputToken.address, intent.outputToken.address, intent.inputAmount);
        const outputAmount = route.expectedOutput;
        const executionPrice = (0, pricing_1.calculatePrice)(intent.inputAmount, outputAmount, intent.inputToken.decimals, intent.outputToken.decimals);
        return {
            intentId: intent.id,
            outputAmount,
            executionPrice,
            route,
            expiresAt: new Date(Date.now() + 60000),
        };
    }
    async findBestRoute(tokenIn, tokenOut, amountIn) {
        // Use CoinGecko pricing to calculate output (no pools needed)
        const { outputAmount, exchangeRate } = await (0, coingecko_1.calculateOutputFromPrices)(tokenIn, tokenOut, amountIn, 8, // input decimals
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
                    poolAddress: 'direct', // Direct solver fill, no pool
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
    // ============ Dutch Auction Queries ============
    async getDutchAuction(intentId) {
        try {
            const result = await this.client.view({
                function: `${this.veloxAddress}::auction::get_dutch_auction`,
                typeArguments: [],
                functionArguments: [this.veloxAddress, intentId],
            });
            const [startTime, startPrice, endPrice, duration, isActive, winner, acceptedPrice] = result;
            return {
                intentId: BigInt(intentId),
                startTime: BigInt(startTime),
                startPrice: BigInt(startPrice),
                endPrice: BigInt(endPrice),
                duration: BigInt(duration),
                isActive: isActive,
                winner: winner === '0x0' ? null : winner,
                acceptedPrice: BigInt(acceptedPrice),
            };
        }
        catch (error) {
            console.error(`Error getting Dutch auction:`, error);
            return null;
        }
    }
    async getDutchPrice(intentId) {
        const result = await this.client.view({
            function: `${this.veloxAddress}::auction::get_dutch_price`,
            typeArguments: [],
            functionArguments: [this.veloxAddress, intentId],
        });
        return BigInt(result[0]);
    }
    async isDutchActive(intentId) {
        const result = await this.client.view({
            function: `${this.veloxAddress}::auction::is_dutch_active`,
            typeArguments: [],
            functionArguments: [this.veloxAddress, intentId],
        });
        return result[0];
    }
    async getActiveDutchCount() {
        const result = await this.client.view({
            function: `${this.veloxAddress}::auction::get_active_dutch_count`,
            typeArguments: [],
            functionArguments: [this.veloxAddress],
        });
        return BigInt(result[0]);
    }
    // ============ Dutch Auction Transactions ============
    async acceptDutchAuction(intentId) {
        if (!this.client.hasAccount()) {
            throw new Error('Solver account not configured');
        }
        console.log(`Calling accept_dutch_auction:`);
        console.log(`  Registry: ${this.veloxAddress}`);
        console.log(`  Intent ID: ${intentId}`);
        try {
            const txHash = await this.client.submitTransaction({
                function: `${this.veloxAddress}::auction::accept_dutch_auction`,
                typeArguments: [],
                functionArguments: [this.veloxAddress, this.veloxAddress, intentId],
            });
            console.log(`accept_dutch_auction transaction successful: ${txHash}`);
            return { success: true, txHash };
        }
        catch (error) {
            console.error(`accept_dutch_auction failed:`, error);
            return { success: false, error: error.message };
        }
    }
    async settleDutchAuction(intentId) {
        if (!this.client.hasAccount()) {
            throw new Error('Solver account not configured');
        }
        console.log(`Calling settle_dutch_auction:`);
        console.log(`  Registry: ${this.veloxAddress}`);
        console.log(`  Intent ID: ${intentId}`);
        try {
            const txHash = await this.client.submitTransaction({
                function: `${this.veloxAddress}::settlement::settle_dutch_auction`,
                typeArguments: [],
                functionArguments: [this.veloxAddress, this.veloxAddress, intentId],
            });
            console.log(`settle_dutch_auction transaction successful: ${txHash}`);
            return { success: true, txHash };
        }
        catch (error) {
            console.error(`settle_dutch_auction failed:`, error);
            return { success: false, error: error.message };
        }
    }
    // ============ Dutch Auction Utilities ============
    /**
     * Calculate time until Dutch price reaches target price
     */
    calculateTimeToPrice(dutch, targetPrice) {
        if (targetPrice >= dutch.startPrice)
            return 0n;
        if (targetPrice <= dutch.endPrice)
            return dutch.duration;
        const priceRange = dutch.startPrice - dutch.endPrice;
        const priceDropNeeded = dutch.startPrice - targetPrice;
        return (priceDropNeeded * dutch.duration) / priceRange;
    }
    /**
     * Monitor Dutch auction and accept when price reaches threshold
     */
    async monitorAndAcceptDutch(intentId, maxPrice, pollIntervalMs = 1000) {
        while (true) {
            const isActive = await this.isDutchActive(intentId);
            if (!isActive) {
                console.log('Dutch auction no longer active');
                return null;
            }
            const currentPrice = await this.getDutchPrice(intentId);
            console.log(`Current Dutch price: ${currentPrice}`);
            if (currentPrice <= maxPrice) {
                console.log(`Price acceptable. Accepting at ${currentPrice}`);
                try {
                    const result = await this.acceptDutchAuction(intentId);
                    if (result.success && result.txHash) {
                        return { txHash: result.txHash, price: currentPrice };
                    }
                    console.error('Failed to accept:', result.error);
                    return null;
                }
                catch (error) {
                    console.error('Failed to accept (someone else may have won):', error);
                    return null;
                }
            }
            await new Promise(resolve => setTimeout(resolve, pollIntervalMs));
        }
    }
    // ============ Solver Stats ============
    async getSolverStats(address) {
        const solverAddress = address || this.client.getAccountAddress();
        if (!solverAddress) {
            throw new Error('No solver address provided');
        }
        const result = await this.client.view({
            function: `${this.veloxAddress}::solver_registry::get_solver_info`,
            typeArguments: [],
            functionArguments: [solverAddress],
        });
        return this.parseSolverStats(result);
    }
    // ============ Private Methods ============
    async pollIntents(callback) {
        const lastSeen = new Set();
        // If skipExistingOnStartup is enabled, pre-populate lastSeen with existing intents
        if (this.skipExistingOnStartup) {
            try {
                const existingIntents = await this.getPendingIntents();
                console.log(`Skipping ${existingIntents.length} existing pending intents...`);
                for (const intent of existingIntents) {
                    lastSeen.add(intent.id);
                }
            }
            catch (error) {
                this.emit('error', error);
            }
        }
        while (this.isRunning) {
            try {
                const intents = await this.getPendingIntents();
                for (const intent of intents) {
                    if (!lastSeen.has(intent.id)) {
                        callback(intent);
                        lastSeen.add(intent.id);
                    }
                }
            }
            catch (error) {
                this.emit('error', error);
            }
            await new Promise((resolve) => setTimeout(resolve, this.pollingInterval));
        }
    }
    parseIntents(raw) {
        return raw.map((r) => this.parseIntent(r));
    }
    parseIntent(raw) {
        const record = raw;
        const typeMap = {
            0: intent_1.IntentType.SWAP,
            1: intent_1.IntentType.LIMIT_ORDER,
            2: intent_1.IntentType.TWAP,
            3: intent_1.IntentType.DCA,
        };
        const statusMap = {
            0: intent_1.IntentStatus.PENDING,
            1: intent_1.IntentStatus.PARTIALLY_FILLED,
            2: intent_1.IntentStatus.FILLED,
            3: intent_1.IntentStatus.CANCELLED,
            4: intent_1.IntentStatus.EXPIRED,
        };
        // Safe string extraction helper
        const safeGetString = (obj, key) => {
            if (!obj)
                return '0';
            const value = obj[key];
            if (value === undefined || value === null)
                return '0';
            return String(value);
        };
        // Extract intent data - it may be wrapped in an enum variant like { Swap: { ... } }
        // or use __variant__ pattern like { __variant__: "LimitOrder", field1: ..., field2: ... }
        let intent = record.intent;
        let detectedType = null;
        if (intent && typeof intent === 'object') {
            // Check for __variant__ pattern (Move 2.0 enum serialization)
            if ('__variant__' in intent) {
                const variant = intent.__variant__;
                if (variant === 'Swap')
                    detectedType = intent_1.IntentType.SWAP;
                else if (variant === 'LimitOrder')
                    detectedType = intent_1.IntentType.LIMIT_ORDER;
                else if (variant === 'TWAP')
                    detectedType = intent_1.IntentType.TWAP;
                else if (variant === 'DCA')
                    detectedType = intent_1.IntentType.DCA;
                // intent fields are at the same level, no unwrapping needed
            }
            else {
                const keys = Object.keys(intent);
                const firstKey = keys[0];
                // Check for legacy pattern (e.g., { Swap: { ... } }, { LimitOrder: { ... } })
                if (keys.length === 1 && firstKey && typeof intent[firstKey] === 'object') {
                    // Detect type from enum variant name
                    if (firstKey === 'Swap')
                        detectedType = intent_1.IntentType.SWAP;
                    else if (firstKey === 'LimitOrder')
                        detectedType = intent_1.IntentType.LIMIT_ORDER;
                    else if (firstKey === 'TWAP')
                        detectedType = intent_1.IntentType.TWAP;
                    else if (firstKey === 'DCA')
                        detectedType = intent_1.IntentType.DCA;
                    intent = intent[firstKey];
                }
            }
        }
        // Extract fields with fallbacks for different naming conventions
        const inputToken = safeGetString(intent, 'input_token') || safeGetString(intent, 'input_coin') || '';
        const outputToken = safeGetString(intent, 'output_token') || safeGetString(intent, 'output_coin') || '';
        const minAmountOut = safeGetString(intent, 'min_amount_out') || '0';
        const limitPrice = safeGetString(intent, 'limit_price');
        // DCA-specific fields
        const amountPerPeriod = safeGetString(intent, 'amount_per_period');
        const totalPeriods = safeGetString(intent, 'total_periods');
        const intervalSeconds = safeGetString(intent, 'interval_seconds');
        const nextExecution = safeGetString(intent, 'next_execution');
        // TWAP-specific fields
        const totalAmount = safeGetString(intent, 'total_amount');
        const numChunks = safeGetString(intent, 'num_chunks');
        const maxSlippageBps = safeGetString(intent, 'max_slippage_bps');
        const startTime = safeGetString(intent, 'start_time');
        // Calculate amount_in based on intent type
        let amountIn;
        if (detectedType === intent_1.IntentType.DCA) {
            // For DCA, inputAmount is amount_per_period (what solver needs to handle per execution)
            amountIn = amountPerPeriod !== '0' ? amountPerPeriod : '0';
        }
        else if (detectedType === intent_1.IntentType.TWAP) {
            // For TWAP, inputAmount is chunk amount (total_amount / num_chunks)
            const total = BigInt(totalAmount || '0');
            const chunks = BigInt(numChunks || '1');
            amountIn = chunks > 0 ? (total / chunks).toString() : '0';
        }
        else {
            amountIn = safeGetString(intent, 'amount_in') || safeGetString(intent, 'amount') || '0';
        }
        // Deadline/expiry extraction based on intent type
        let deadline;
        if (detectedType === intent_1.IntentType.DCA) {
            // DCA deadline = next_execution + (total_periods * interval_seconds)
            const nextExec = BigInt(nextExecution || '0');
            const periods = BigInt(totalPeriods || '0');
            const interval = BigInt(intervalSeconds || '0');
            deadline = (nextExec + periods * interval).toString();
        }
        else if (detectedType === intent_1.IntentType.TWAP) {
            // TWAP deadline = start_time + (num_chunks * interval_seconds)
            const start = BigInt(startTime || '0');
            const chunks = BigInt(numChunks || '0');
            const interval = BigInt(intervalSeconds || '0');
            deadline = (start + chunks * interval).toString();
        }
        else {
            const rawDeadline = safeGetString(intent, 'deadline');
            const rawExpiry = safeGetString(intent, 'expiry');
            deadline = rawDeadline !== '0' ? rawDeadline : rawExpiry !== '0' ? rawExpiry : '0';
        }
        // Determine intent type based on enum variant name or fields present
        let intentType = detectedType;
        if (!intentType) {
            // Fall back to field-based detection
            if (intent && 'limit_price' in intent) {
                intentType = intent_1.IntentType.LIMIT_ORDER;
            }
            else if (intent && 'num_chunks' in intent) {
                intentType = intent_1.IntentType.TWAP;
            }
            else if (intent && 'amount_per_period' in intent) {
                intentType = intent_1.IntentType.DCA;
            }
            else {
                intentType = intent_1.IntentType.SWAP;
            }
        }
        return {
            id: safeGetString(record, 'id'),
            type: intentType,
            user: safeGetString(record, 'user'),
            inputToken: { address: inputToken, symbol: '', decimals: 8 },
            outputToken: { address: outputToken, symbol: '', decimals: 8 },
            inputAmount: BigInt(amountIn),
            minOutputAmount: minAmountOut !== '0' ? BigInt(minAmountOut) : undefined,
            deadline: new Date(parseInt(deadline) * 1000),
            status: statusMap[Number(record.status ?? 0)] || intent_1.IntentStatus.PENDING,
            createdAt: new Date(parseInt(safeGetString(record, 'created_at')) * 1000),
            limitPrice: intent?.limit_price ? BigInt(safeGetString(intent, 'limit_price')) : undefined,
            partialFillAllowed: Boolean(intent?.partial_fill_allowed ?? intent?.partial_fill),
            // TWAP fields
            numChunks: numChunks !== '0' ? parseInt(numChunks) : undefined,
            interval: intervalSeconds !== '0' ? parseInt(intervalSeconds) : undefined,
            totalAmount: totalAmount !== '0' ? BigInt(totalAmount) : undefined,
            maxSlippageBps: maxSlippageBps !== '0' ? parseInt(maxSlippageBps) : undefined,
            startTime: startTime !== '0' ? new Date(parseInt(startTime) * 1000) : undefined,
            // DCA fields
            amountPerPeriod: amountPerPeriod !== '0' ? BigInt(amountPerPeriod) : undefined,
            totalPeriods: totalPeriods !== '0' ? parseInt(totalPeriods) : undefined,
            executedPeriods: record.filled_amount ? Math.floor(Number(record.filled_amount) / Number(amountPerPeriod || 1)) : 0,
            nextExecution: nextExecution !== '0' ? new Date(parseInt(nextExecution) * 1000) : undefined,
        };
    }
    parseSolverStats(raw) {
        const data = raw[0];
        return {
            address: String(data.address || ''),
            totalSolutions: Number(data.total_solutions || 0),
            successfulSolutions: Number(data.successful_solutions || 0),
            totalVolume: BigInt(String(data.total_volume || '0')),
            reputation: Number(data.reputation || 0),
            isActive: Boolean(data.is_active),
        };
    }
}
exports.VeloxSolver = VeloxSolver;
//# sourceMappingURL=VeloxSolver.js.map