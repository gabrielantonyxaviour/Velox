/**
 * Comprehensive configuration for Velox Solver
 * All values can be set via environment variables
 */

export interface SolverConfigOptions {
  // === Network Configuration ===
  /** Movement RPC endpoint URL */
  rpcUrl: string;
  /** Velox contract address on Movement */
  veloxAddress: string;
  /** Solver wallet private key (hex format) */
  privateKey: string;
  /** Optional GraphQL endpoint for faster queries */
  graphqlUrl?: string;
  /** Shinami Node Service API key for enhanced reliability */
  shinamiNodeKey?: string;

  // === Solver Behavior ===
  /** Polling interval for new intents in milliseconds (default: 5000) */
  pollingInterval?: number;
  /** Skip existing intents on startup (default: true) */
  skipExistingOnStartup?: boolean;
  /** Maximum concurrent intent processing (default: 5) */
  maxConcurrent?: number;
  /** Enable dry-run mode - simulate without submitting (default: false) */
  dryRun?: boolean;

  // === Intent Filtering ===
  /** Enable SWAP intent handling (default: true) */
  enableSwap?: boolean;
  /** Enable LIMIT_ORDER intent handling (default: true) */
  enableLimitOrder?: boolean;
  /** Enable TWAP intent handling (default: true) */
  enableTwap?: boolean;
  /** Enable DCA intent handling (default: true) */
  enableDca?: boolean;
  /** Enable sealed bid auction participation (default: true) */
  enableSealedBidAuction?: boolean;
  /** Enable Dutch auction participation (default: true) */
  enableDutchAuction?: boolean;
  /** Minimum input amount to consider (in smallest units) */
  minInputAmount?: bigint;
  /** Maximum input amount to consider (in smallest units) */
  maxInputAmount?: bigint;
  /** Whitelist of input token addresses (empty = all allowed) */
  inputTokenWhitelist?: string[];
  /** Whitelist of output token addresses (empty = all allowed) */
  outputTokenWhitelist?: string[];

  // === Profitability Settings ===
  /** Minimum profit margin in basis points (default: 10 = 0.1%) */
  minProfitBps?: number;
  /** Spread to apply for solver margin in basis points (default: 10) */
  spreadBps?: number;
  /** Maximum gas price willing to pay in octas (default: 1000) */
  maxGasPrice?: bigint;
  /** Skip intents with less than X seconds to deadline (default: 30) */
  minDeadlineSeconds?: number;

  // === Limit Order Settings ===
  /** How often to check limit order prices in ms (default: 15000) */
  limitOrderCheckInterval?: number;
  /** Enable partial fills for limit orders (default: true) */
  enablePartialFills?: boolean;

  // === DCA/TWAP Settings ===
  /** Continue monitoring scheduled intents (default: true) */
  monitorScheduledIntents?: boolean;
  /** How often to check scheduled intent readiness in ms (default: 5000) */
  scheduledCheckInterval?: number;

  // === Auction Settings ===
  /** Aggressiveness for Dutch auctions: 'conservative' | 'moderate' | 'aggressive' */
  dutchAuctionStrategy?: 'conservative' | 'moderate' | 'aggressive';
  /** Max price willing to accept in Dutch auctions (percentage of market, default: 102) */
  dutchMaxPricePercent?: number;
  /** How aggressively to bid in sealed auctions (default: 'moderate') */
  sealedBidStrategy?: 'conservative' | 'moderate' | 'aggressive';

  // === Logging & Monitoring ===
  /** Log level: 'debug' | 'info' | 'warn' | 'error' (default: 'info') */
  logLevel?: 'debug' | 'info' | 'warn' | 'error';
  /** Enable colored console output (default: true) */
  coloredOutput?: boolean;
  /** Webhook URL for notifications (optional) */
  webhookUrl?: string;
  /** Enable Prometheus metrics endpoint (default: false) */
  enableMetrics?: boolean;
  /** Metrics port (default: 9090) */
  metricsPort?: number;
}

export class SolverConfig {
  // Network
  readonly rpcUrl: string;
  readonly veloxAddress: string;
  readonly privateKey: string;
  readonly graphqlUrl?: string;
  readonly shinamiNodeKey?: string;

  // Behavior
  readonly pollingInterval: number;
  readonly skipExistingOnStartup: boolean;
  readonly maxConcurrent: number;
  readonly dryRun: boolean;

  // Intent Filtering
  readonly enableSwap: boolean;
  readonly enableLimitOrder: boolean;
  readonly enableTwap: boolean;
  readonly enableDca: boolean;
  readonly enableSealedBidAuction: boolean;
  readonly enableDutchAuction: boolean;
  readonly minInputAmount: bigint;
  readonly maxInputAmount: bigint;
  readonly inputTokenWhitelist: string[];
  readonly outputTokenWhitelist: string[];

  // Profitability
  readonly minProfitBps: number;
  readonly spreadBps: number;
  readonly maxGasPrice: bigint;
  readonly minDeadlineSeconds: number;

  // Limit Order
  readonly limitOrderCheckInterval: number;
  readonly enablePartialFills: boolean;

  // DCA/TWAP
  readonly monitorScheduledIntents: boolean;
  readonly scheduledCheckInterval: number;

  // Auction
  readonly dutchAuctionStrategy: 'conservative' | 'moderate' | 'aggressive';
  readonly dutchMaxPricePercent: number;
  readonly sealedBidStrategy: 'conservative' | 'moderate' | 'aggressive';

  // Logging
  readonly logLevel: 'debug' | 'info' | 'warn' | 'error';
  readonly coloredOutput: boolean;
  readonly webhookUrl?: string;
  readonly enableMetrics: boolean;
  readonly metricsPort: number;

  constructor(options: SolverConfigOptions) {
    // Required fields
    this.rpcUrl = options.rpcUrl;
    this.veloxAddress = options.veloxAddress;
    this.privateKey = options.privateKey;

    // Optional network
    this.graphqlUrl = options.graphqlUrl;
    this.shinamiNodeKey = options.shinamiNodeKey;

    // Behavior defaults
    this.pollingInterval = options.pollingInterval ?? 5000;
    this.skipExistingOnStartup = options.skipExistingOnStartup ?? true;
    this.maxConcurrent = options.maxConcurrent ?? 5;
    this.dryRun = options.dryRun ?? false;

    // Intent filtering defaults
    this.enableSwap = options.enableSwap ?? true;
    this.enableLimitOrder = options.enableLimitOrder ?? true;
    this.enableTwap = options.enableTwap ?? true;
    this.enableDca = options.enableDca ?? true;
    this.enableSealedBidAuction = options.enableSealedBidAuction ?? true;
    this.enableDutchAuction = options.enableDutchAuction ?? true;
    this.minInputAmount = options.minInputAmount ?? BigInt(0);
    this.maxInputAmount = options.maxInputAmount ?? BigInt('18446744073709551615');
    this.inputTokenWhitelist = options.inputTokenWhitelist ?? [];
    this.outputTokenWhitelist = options.outputTokenWhitelist ?? [];

    // Profitability defaults
    this.minProfitBps = options.minProfitBps ?? 10;
    this.spreadBps = options.spreadBps ?? 10;
    this.maxGasPrice = options.maxGasPrice ?? BigInt(1000);
    this.minDeadlineSeconds = options.minDeadlineSeconds ?? 30;

    // Limit order defaults
    this.limitOrderCheckInterval = options.limitOrderCheckInterval ?? 15000;
    this.enablePartialFills = options.enablePartialFills ?? true;

    // Scheduled defaults
    this.monitorScheduledIntents = options.monitorScheduledIntents ?? true;
    this.scheduledCheckInterval = options.scheduledCheckInterval ?? 5000;

    // Auction defaults
    this.dutchAuctionStrategy = options.dutchAuctionStrategy ?? 'moderate';
    this.dutchMaxPricePercent = options.dutchMaxPricePercent ?? 102;
    this.sealedBidStrategy = options.sealedBidStrategy ?? 'moderate';

    // Logging defaults
    this.logLevel = options.logLevel ?? 'info';
    this.coloredOutput = options.coloredOutput ?? true;
    this.webhookUrl = options.webhookUrl;
    this.enableMetrics = options.enableMetrics ?? false;
    this.metricsPort = options.metricsPort ?? 9090;
  }

  /**
   * Create config from environment variables
   */
  static fromEnv(): SolverConfig {
    const requiredEnvVars = ['RPC_URL', 'VELOX_ADDRESS', 'SOLVER_PRIVATE_KEY'];
    const missing = requiredEnvVars.filter((v) => !process.env[v]);

    if (missing.length > 0) {
      throw new Error(
        `Missing required environment variables: ${missing.join(', ')}\n` +
          'Please set these in your .env file or environment.'
      );
    }

    return new SolverConfig({
      // Network
      rpcUrl: process.env.RPC_URL!,
      veloxAddress: process.env.VELOX_ADDRESS!,
      privateKey: process.env.SOLVER_PRIVATE_KEY!,
      graphqlUrl: process.env.GRAPHQL_URL,
      shinamiNodeKey: process.env.SHINAMI_KEY,

      // Behavior
      pollingInterval: parseInt(process.env.POLLING_INTERVAL || '5000'),
      skipExistingOnStartup: process.env.SKIP_EXISTING !== 'false',
      maxConcurrent: parseInt(process.env.MAX_CONCURRENT || '5'),
      dryRun: process.env.DRY_RUN === 'true',

      // Intent filtering
      enableSwap: process.env.ENABLE_SWAP !== 'false',
      enableLimitOrder: process.env.ENABLE_LIMIT_ORDER !== 'false',
      enableTwap: process.env.ENABLE_TWAP !== 'false',
      enableDca: process.env.ENABLE_DCA !== 'false',
      enableSealedBidAuction: process.env.ENABLE_SEALED_BID_AUCTION !== 'false',
      enableDutchAuction: process.env.ENABLE_DUTCH_AUCTION !== 'false',
      minInputAmount: BigInt(process.env.MIN_INPUT_AMOUNT || '0'),
      maxInputAmount: BigInt(process.env.MAX_INPUT_AMOUNT || '18446744073709551615'),
      inputTokenWhitelist: process.env.INPUT_TOKEN_WHITELIST?.split(',').filter(Boolean) || [],
      outputTokenWhitelist: process.env.OUTPUT_TOKEN_WHITELIST?.split(',').filter(Boolean) || [],

      // Profitability
      minProfitBps: parseInt(process.env.MIN_PROFIT_BPS || '10'),
      spreadBps: parseInt(process.env.SPREAD_BPS || '10'),
      maxGasPrice: BigInt(process.env.MAX_GAS_PRICE || '1000'),
      minDeadlineSeconds: parseInt(process.env.MIN_DEADLINE_SECONDS || '30'),

      // Limit order
      limitOrderCheckInterval: parseInt(process.env.LIMIT_ORDER_CHECK_INTERVAL || '15000'),
      enablePartialFills: process.env.ENABLE_PARTIAL_FILLS !== 'false',

      // Scheduled
      monitorScheduledIntents: process.env.MONITOR_SCHEDULED !== 'false',
      scheduledCheckInterval: parseInt(process.env.SCHEDULED_CHECK_INTERVAL || '5000'),

      // Auction
      dutchAuctionStrategy: (process.env.DUTCH_AUCTION_STRATEGY as 'conservative' | 'moderate' | 'aggressive') || 'moderate',
      dutchMaxPricePercent: parseInt(process.env.DUTCH_MAX_PRICE_PERCENT || '102'),
      sealedBidStrategy: (process.env.SEALED_BID_STRATEGY as 'conservative' | 'moderate' | 'aggressive') || 'moderate',

      // Logging
      logLevel: (process.env.LOG_LEVEL as 'debug' | 'info' | 'warn' | 'error') || 'info',
      coloredOutput: process.env.COLORED_OUTPUT !== 'false',
      webhookUrl: process.env.WEBHOOK_URL,
      enableMetrics: process.env.ENABLE_METRICS === 'true',
      metricsPort: parseInt(process.env.METRICS_PORT || '9090'),
    });
  }

  /**
   * Validate configuration
   */
  validate(): string[] {
    const errors: string[] = [];

    // Validate RPC URL
    try {
      new URL(this.rpcUrl);
    } catch {
      errors.push('Invalid RPC_URL format');
    }

    // Validate address format
    if (!this.veloxAddress.startsWith('0x') || this.veloxAddress.length < 10) {
      errors.push('Invalid VELOX_ADDRESS format');
    }

    // Validate private key
    if (!this.privateKey || this.privateKey.length < 64) {
      errors.push('Invalid SOLVER_PRIVATE_KEY format');
    }

    // Validate numeric ranges
    if (this.pollingInterval < 1000) {
      errors.push('POLLING_INTERVAL must be at least 1000ms');
    }

    if (this.minProfitBps < 0 || this.minProfitBps > 10000) {
      errors.push('MIN_PROFIT_BPS must be between 0 and 10000');
    }

    if (this.spreadBps < 0 || this.spreadBps > 10000) {
      errors.push('SPREAD_BPS must be between 0 and 10000');
    }

    if (this.minDeadlineSeconds < 5) {
      errors.push('MIN_DEADLINE_SECONDS must be at least 5');
    }

    if (this.maxConcurrent < 1 || this.maxConcurrent > 100) {
      errors.push('MAX_CONCURRENT must be between 1 and 100');
    }

    return errors;
  }

  /**
   * Get a summary of the configuration for display
   */
  toSummary(): string {
    const lines = [
      '┌─ Network ─────────────────────────────────────┐',
      `│ RPC URL: ${this.rpcUrl.slice(0, 40)}...`,
      `│ Velox Address: ${this.veloxAddress.slice(0, 10)}...${this.veloxAddress.slice(-8)}`,
      `│ GraphQL: ${this.graphqlUrl ? 'Enabled' : 'Disabled'}`,
      `│ Shinami: ${this.shinamiNodeKey ? 'Enabled' : 'Disabled'}`,
      '├─ Intent Types ─────────────────────────────────┤',
      `│ Swap: ${this.enableSwap ? '✓' : '✗'} | Limit: ${this.enableLimitOrder ? '✓' : '✗'} | TWAP: ${this.enableTwap ? '✓' : '✗'} | DCA: ${this.enableDca ? '✓' : '✗'}`,
      `│ Sealed Bid: ${this.enableSealedBidAuction ? '✓' : '✗'} | Dutch: ${this.enableDutchAuction ? '✓' : '✗'}`,
      '├─ Profitability ────────────────────────────────┤',
      `│ Min Profit: ${this.minProfitBps} bps | Spread: ${this.spreadBps} bps`,
      `│ Min Deadline: ${this.minDeadlineSeconds}s | Max Gas: ${this.maxGasPrice}`,
      '├─ Behavior ─────────────────────────────────────┤',
      `│ Polling: ${this.pollingInterval}ms | Max Concurrent: ${this.maxConcurrent}`,
      `│ Skip Existing: ${this.skipExistingOnStartup ? '✓' : '✗'} | Dry Run: ${this.dryRun ? '✓' : '✗'}`,
      '└───────────────────────────────────────────────┘',
    ];
    return lines.join('\n');
  }
}
