import { NextRequest, NextResponse } from 'next/server';
import {
  Aptos,
  AptosConfig,
  Network,
} from '@aptos-labs/ts-sdk';
import {
  KeyClient,
  WalletClient,
  ShinamiWalletSigner,
} from '@shinami/clients/aptos';

const VELOX_ADDRESS = process.env.NEXT_PUBLIC_VELOX_ADDRESS ||
  '0x94d017d8d944702a976af2844bdf3534b946e712cad286610aef5969568ba470';
const RPC_URL = process.env.NEXT_PUBLIC_RPC_URL ||
  'https://testnet.movementnetwork.xyz/v1';

/**
 * POST /api/fill-swap
 *
 * Fills a swap intent using the Shinami Invisible Wallet.
 * The invisible wallet must be the auction winner to fill.
 *
 * Body: { intentId: number, fillInput: string, outputAmount: string }
 */
export async function POST(request: NextRequest) {
  try {
    const { intentId, fillInput, outputAmount } = await request.json();

    if (intentId === undefined || !fillInput || !outputAmount) {
      return NextResponse.json(
        { error: 'Missing required fields: intentId, fillInput, outputAmount' },
        { status: 400 }
      );
    }

    const shinamiAccessKey = process.env.SHINAMI_KEY;
    const walletId = process.env.SHINAMI_WALLET_ID || 'velox-master-solver';
    const walletSecret = process.env.SHINAMI_WALLET_SECRET;

    if (!shinamiAccessKey || !walletSecret) {
      return NextResponse.json(
        { error: 'Server configuration error - missing Shinami credentials' },
        { status: 500 }
      );
    }

    const movementClient = new Aptos(new AptosConfig({
      network: Network.CUSTOM,
      fullnode: RPC_URL,
    }));

    const keyClient = new KeyClient(shinamiAccessKey);
    const walletClient = new WalletClient(shinamiAccessKey);

    const signer = new ShinamiWalletSigner(
      walletId,
      walletClient,
      walletSecret,
      keyClient
    );

    const walletAddress = await signer.getAddress(true, false);

    console.log(`[fill-swap] Filling intent ${intentId}`);
    console.log(`[fill-swap] Wallet: ${walletAddress.toString()}`);
    console.log(`[fill-swap] Fill input: ${fillInput}, Output: ${outputAmount}`);

    const transaction = await movementClient.transaction.build.simple({
      sender: walletAddress,
      withFeePayer: true,
      data: {
        function: `${VELOX_ADDRESS}::settlement::fill_swap`,
        functionArguments: [
          VELOX_ADDRESS,
          VELOX_ADDRESS,
          intentId.toString(),
          fillInput.toString(),
          outputAmount.toString(),
        ],
      },
    });

    const pendingTx = await signer.executeGaslessTransaction(transaction);

    const executedTx = await movementClient.waitForTransaction({
      transactionHash: pendingTx.hash,
    });

    if (executedTx.success) {
      console.log(`[fill-swap] Success! TX: ${executedTx.hash}`);

      // Record taker transaction
      try {
        await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3001'}/api/transactions/taker`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            intent_id: intentId.toString(),
            taker_tx_hash: executedTx.hash,
            solver_address: walletAddress.toString(),
            fill_amount: fillInput.toString(),
          }),
        });
      } catch (recordError) {
        console.warn('[fill-swap] Failed to record taker TX:', recordError);
      }

      return NextResponse.json({
        success: true,
        intentId,
        txHash: executedTx.hash,
        fillInput,
        outputAmount,
      });
    } else {
      console.error(`[fill-swap] Failed! VM Status: ${executedTx.vm_status}`);
      return NextResponse.json({
        success: false,
        intentId,
        txHash: executedTx.hash,
        error: executedTx.vm_status,
      }, { status: 400 });
    }
  } catch (error) {
    console.error('[fill-swap] Error:', error);
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}

/**
 * GET /api/fill-swap
 *
 * Returns the invisible wallet address for filling swaps.
 */
export async function GET() {
  try {
    const shinamiAccessKey = process.env.SHINAMI_KEY;
    const walletId = process.env.SHINAMI_WALLET_ID || 'velox-master-solver';
    const walletSecret = process.env.SHINAMI_WALLET_SECRET;

    if (!shinamiAccessKey || !walletSecret) {
      return NextResponse.json(
        { error: 'Missing Shinami environment variables' },
        { status: 500 }
      );
    }

    const keyClient = new KeyClient(shinamiAccessKey);
    const walletClient = new WalletClient(shinamiAccessKey);

    const signer = new ShinamiWalletSigner(
      walletId,
      walletClient,
      walletSecret,
      keyClient
    );

    const walletAddress = await signer.getAddress(true, false);

    return NextResponse.json({
      walletId,
      walletAddress: walletAddress.toString(),
    });
  } catch (error) {
    console.error('[fill-swap] GET Error:', error);
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
