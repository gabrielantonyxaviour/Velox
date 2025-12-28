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
 * POST /api/submit-bid
 *
 * Submits a bid for a sealed bid auction using the Shinami Invisible Wallet.
 *
 * Body: { intentId: number, outputAmount: string }
 */
export async function POST(request: NextRequest) {
  try {
    const { intentId, outputAmount } = await request.json();

    if (intentId === undefined || !outputAmount) {
      return NextResponse.json(
        { error: 'Missing required fields: intentId, outputAmount' },
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

    console.log(`[submit-bid] Submitting bid for intent ${intentId}`);
    console.log(`[submit-bid] Wallet: ${walletAddress.toString()}`);
    console.log(`[submit-bid] Output amount: ${outputAmount}`);

    const transaction = await movementClient.transaction.build.simple({
      sender: walletAddress,
      withFeePayer: true,
      data: {
        function: `${VELOX_ADDRESS}::auction::submit_bid`,
        functionArguments: [
          VELOX_ADDRESS,
          intentId.toString(),
          outputAmount.toString(),
        ],
      },
    });

    const pendingTx = await signer.executeGaslessTransaction(transaction);

    const executedTx = await movementClient.waitForTransaction({
      transactionHash: pendingTx.hash,
    });

    if (executedTx.success) {
      console.log(`[submit-bid] Success! TX: ${executedTx.hash}`);

      // Record bid transaction
      try {
        await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3001'}/api/transactions/taker`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            intent_id: intentId.toString(),
            taker_tx_hash: executedTx.hash,
            solver_address: walletAddress.toString(),
          }),
        });
      } catch (recordError) {
        console.warn('[submit-bid] Failed to record bid TX:', recordError);
      }

      return NextResponse.json({
        success: true,
        intentId,
        txHash: executedTx.hash,
        outputAmount,
        bidder: walletAddress.toString(),
      });
    } else {
      console.error(`[submit-bid] Failed! VM Status: ${executedTx.vm_status}`);
      return NextResponse.json({
        success: false,
        intentId,
        txHash: executedTx.hash,
        error: executedTx.vm_status,
      }, { status: 400 });
    }
  } catch (error) {
    console.error('[submit-bid] Error:', error);
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
