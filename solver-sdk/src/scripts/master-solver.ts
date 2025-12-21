/**
 * Velox Master Solver
 *
 * This is a LOCAL-ONLY script that monitors sealed bid auctions and automatically
 * completes them when the bid period ends. It uses Shinami Invisible Wallet for
 * gasless transactions.
 *
 * NOTE: This script is NOT exported to npm - it's only for local use by the
 * Velox team to help facilitate auction completion.
 *
 * The `complete_sealed_bid` function is PERMISSIONLESS - anyone can call it
 * after the auction period ends. This script just automates that process.
 */

import 'dotenv/config';
import {
  AccountAddress,
  Aptos,
  AptosConfig,
  Network,
  SimpleTransaction,
} from '@aptos-labs/ts-sdk';
import {
  KeyClient,
  WalletClient,
  ShinamiWalletSigner,
  GasStationClient,
} from '@shinami/clients/aptos';
import {
  printVeloxLogo,
  printSection,
  printKeyValue,
  printSuccess,
  printError,
  printWarning,
  printInfo,
} from '../utils/cliStyle';

// ============ Configuration ============

interface MasterSolverConfig {
  shinamiAccessKey: string;
  walletId: string;
  walletSecret: string;
  veloxAddress: string;
  rpcUrl: string;
  pollingInterval: number;
  veloxApiUrl?: string;
}

// ============ Main Script ============

async function main() {
  // Load configuration from environment
  const config: MasterSolverConfig = {
    shinamiAccessKey: process.env.SHINAMI_ACCESS_KEY || '',
    walletId: process.env.SHINAMI_WALLET_ID || 'velox-master-solver',
    walletSecret: process.env.SHINAMI_WALLET_SECRET || '',
    veloxAddress: process.env.VELOX_ADDRESS || '0x44acd76127a76012da5efb314c9a47882017c12b924181379ff3b9d17b3cc8fb',
    rpcUrl: process.env.RPC_URL || 'https://testnet.movementnetwork.xyz/v1',
    pollingInterval: parseInt(process.env.POLLING_INTERVAL || '10000'),
    veloxApiUrl: process.env.VELOX_API_URL,
  };

  // Validate configuration
  printVeloxLogo();
  printSection('🔮 VELOX MASTER SOLVER');
  console.log('');
  printInfo('This solver monitors sealed bid auctions and completes them automatically.');
  console.log('');

  if (!config.shinamiAccessKey) {
    printError('Missing SHINAMI_ACCESS_KEY environment variable');
    printSection('❌ CONFIGURATION ERROR');
    console.log('');
    console.log('  Required Environment Variables:');
    console.log('  ├─ SHINAMI_ACCESS_KEY    (Shinami API key with Gas Station + Wallet Services)');
    console.log('  ├─ SHINAMI_WALLET_ID     (Unique wallet identifier, e.g., "velox-master-solver")');
    console.log('  ├─ SHINAMI_WALLET_SECRET (Secret for the wallet)');
    console.log('  ├─ VELOX_ADDRESS         (Velox contract address)');
    console.log('  └─ VELOX_API_URL         (Optional: API URL for recording transactions)');
    console.log('');
    process.exit(1);
  }

  if (!config.walletSecret) {
    printError('Missing SHINAMI_WALLET_SECRET environment variable');
    process.exit(1);
  }

  // Initialize Shinami clients
  printInfo('Initializing Shinami Invisible Wallet...');

  const movementClient = new Aptos(new AptosConfig({
    network: Network.CUSTOM,
    fullnode: config.rpcUrl,
  }));

  const keyClient = new KeyClient(config.shinamiAccessKey);
  const walletClient = new WalletClient(config.shinamiAccessKey);
  const gasClient = new GasStationClient(config.shinamiAccessKey);

  const signer = new ShinamiWalletSigner(
    config.walletId,
    walletClient,
    config.walletSecret,
    keyClient
  );

  // Get or create the invisible wallet
  const CREATE_WALLET_IF_NOT_FOUND = true;
  const INITIALIZE_ON_CHAIN = false;
  const walletAddress = await signer.getAddress(CREATE_WALLET_IF_NOT_FOUND, INITIALIZE_ON_CHAIN);

  printSuccess('Invisible Wallet initialized!');
  printKeyValue('Wallet Address', walletAddress.toString());
  printKeyValue('Velox Address', config.veloxAddress);
  printKeyValue('Polling Interval', `${config.pollingInterval}ms`);
  console.log('');

  // Start monitoring auctions
  printSection('🔄 MONITORING SEALED BID AUCTIONS');
  console.log('');

  const masterSolver = new MasterSolver(
    movementClient,
    signer,
    gasClient,
    config
  );

  await masterSolver.start();

  // Handle graceful shutdown
  process.on('SIGINT', () => {
    console.log('\n');
    printSection('⏹️  Shutting down Master Solver...');
    masterSolver.stop();
    process.exit(0);
  });
}

// ============ Master Solver Class ============

class MasterSolver {
  private movementClient: Aptos;
  private signer: ShinamiWalletSigner;
  private gasClient: GasStationClient;
  private config: MasterSolverConfig;
  private isRunning: boolean = false;
  private processedAuctions: Set<number> = new Set();

  constructor(
    movementClient: Aptos,
    signer: ShinamiWalletSigner,
    gasClient: GasStationClient,
    config: MasterSolverConfig
  ) {
    this.movementClient = movementClient;
    this.signer = signer;
    this.gasClient = gasClient;
    this.config = config;
  }

  async start(): Promise<void> {
    this.isRunning = true;
    await this.pollAuctions();
  }

  stop(): void {
    this.isRunning = false;
  }

  private async pollAuctions(): Promise<void> {
    while (this.isRunning) {
      try {
        await this.checkAndCompleteAuctions();
      } catch (error) {
        printError(`Polling error: ${(error as Error).message}`);
      }

      await new Promise(resolve => setTimeout(resolve, this.config.pollingInterval));
    }
  }

  private async checkAndCompleteAuctions(): Promise<void> {
    // Get total intents
    const totalIntents = await this.getTotalIntents();
    const now = Math.floor(Date.now() / 1000);

    // Check each intent for sealed bid auctions that need completion
    for (let i = 0; i < totalIntents; i++) {
      if (this.processedAuctions.has(i)) continue;

      try {
        const intent = await this.getIntent(i);
        if (!intent) continue;

        // Check if it's a sealed bid auction that has ended but not completed
        if (intent.auction?.__variant__ === 'SealedBidActive') {
          const endTime = parseInt(intent.auction.end_time || '0');

          if (now >= endTime) {
            console.log(`\n[Intent ${i}] Sealed bid auction ended - completing...`);
            console.log(`  End time: ${new Date(endTime * 1000).toISOString()}`);
            console.log(`  Bids: ${intent.auction.bids?.length || 0}`);

            await this.completeSealedBid(i);
            this.processedAuctions.add(i);
          }
        } else if (
          intent.auction?.__variant__ === 'SealedBidCompleted' ||
          intent.auction?.__variant__ === 'Failed' ||
          intent.status?.__variant__ === 'Filled' ||
          intent.status?.__variant__ === 'Cancelled'
        ) {
          // Mark as processed so we don't check again
          this.processedAuctions.add(i);
        }
      } catch (error) {
        // Intent might not exist or other error - skip
      }
    }
  }

  private async getTotalIntents(): Promise<number> {
    try {
      const result = await this.movementClient.view({
        payload: {
          function: `${this.config.veloxAddress}::submission::get_total_intents`,
          typeArguments: [],
          functionArguments: [this.config.veloxAddress],
        },
      });
      return parseInt((result[0] as string) || '0');
    } catch (error) {
      return 0;
    }
  }

  private async getIntent(intentId: number): Promise<any> {
    try {
      const result = await this.movementClient.view({
        payload: {
          function: `${this.config.veloxAddress}::submission::get_intent`,
          typeArguments: [],
          functionArguments: [this.config.veloxAddress, intentId.toString()],
        },
      });
      return result[0];
    } catch (error) {
      return null;
    }
  }

  private async completeSealedBid(intentId: number): Promise<void> {
    try {
      const walletAddress = await this.signer.getAddress(false, false);

      // Build the transaction
      const transaction = await this.movementClient.transaction.build.simple({
        sender: walletAddress,
        withFeePayer: true,
        data: {
          function: `${this.config.veloxAddress}::auction::complete_sealed_bid`,
          functionArguments: [this.config.veloxAddress, intentId.toString()],
        },
      });

      // Execute gaslessly using Shinami
      const pendingTx = await this.signer.executeGaslessTransaction(transaction);

      // Wait for transaction
      const executedTx = await this.movementClient.waitForTransaction({
        transactionHash: pendingTx.hash,
      });

      if (executedTx.success) {
        printSuccess(`Auction completed for intent ${intentId}`);
        console.log(`  TX Hash: ${executedTx.hash}`);

        // Optionally record to Velox API
        if (this.config.veloxApiUrl) {
          await this.recordAuctionCompletion(intentId, executedTx.hash);
        }
      } else {
        printError(`Auction completion failed for intent ${intentId}`);
        console.log(`  VM Status: ${executedTx.vm_status}`);
      }
    } catch (error) {
      printError(`Failed to complete auction ${intentId}: ${(error as Error).message}`);
    }
  }

  private async recordAuctionCompletion(intentId: number, txHash: string): Promise<void> {
    if (!this.config.veloxApiUrl) return;

    try {
      // Could add an API endpoint to record auction completions
      // For now, just log it
      console.log(`  [API] Would record auction completion to ${this.config.veloxApiUrl}`);
    } catch (error) {
      printWarning(`Failed to record auction completion: ${(error as Error).message}`);
    }
  }
}

// Run the script
main().catch((error) => {
  printError(`Fatal error: ${error.message}`);
  process.exit(1);
});
