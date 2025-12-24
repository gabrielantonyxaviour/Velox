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
 * POST /api/complete-auction
 *
 * Completes a sealed bid auction after the bidding period ends.
 * Uses Shinami Invisible Wallet for gasless transactions.
 *
 * This endpoint is PERMISSIONLESS - the complete_sealed_bid function
 * can be called by anyone after the auction ends. We use an invisible
 * wallet so solvers don't need to pay gas for this operation.
 *
 * Body: { intentId: number }
 */
export async function POST(request: NextRequest) {
  try {
    const { intentId } = await request.json();

    if (intentId === undefined || intentId === null) {
      return NextResponse.json(
        { error: 'Missing intentId in request body' },
        { status: 400 }
      );
    }

    // Validate environment variables
    const shinamiAccessKey = process.env.SHINAMI_KEY;
    const walletId = process.env.SHINAMI_WALLET_ID || 'velox-master-solver';
    const walletSecret = process.env.SHINAMI_WALLET_SECRET;

    if (!shinamiAccessKey || !walletSecret) {
      console.error('Missing Shinami environment variables');
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      );
    }

    // Initialize clients
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

    // Get wallet address
    const walletAddress = await signer.getAddress(true, false);

    console.log(`[complete-auction] Completing auction for intent ${intentId}`);
    console.log(`[complete-auction] Using wallet: ${walletAddress.toString()}`);

    // Build the transaction
    const transaction = await movementClient.transaction.build.simple({
      sender: walletAddress,
      withFeePayer: true,
      data: {
        function: `${VELOX_ADDRESS}::auction::complete_sealed_bid`,
        functionArguments: [VELOX_ADDRESS, intentId.toString()],
      },
    });

    // Execute gaslessly using Shinami
    const pendingTx = await signer.executeGaslessTransaction(transaction);

    // Wait for transaction
    const executedTx = await movementClient.waitForTransaction({
      transactionHash: pendingTx.hash,
    });

    if (executedTx.success) {
      console.log(`[complete-auction] Success! TX: ${executedTx.hash}`);

      // Fetch the intent to get the winner address and fill details
      try {
        const intentResult = await movementClient.view({
          payload: {
            function: `${VELOX_ADDRESS}::submission::get_intent`,
            typeArguments: [],
            functionArguments: [VELOX_ADDRESS, intentId.toString()],
          },
        });

        console.log(`[complete-auction] Intent result:`, JSON.stringify(intentResult[0], null, 2));

        if (intentResult && intentResult[0]) {
          const record = intentResult[0] as Record<string, unknown>;
          const auction = record.auction as Record<string, unknown>;
          const fills = record.fills as Array<Record<string, unknown>>;

          // Get winner from SealedBidCompleted auction state
          const winner = auction?.winner as string;
          // Get fill amount from the fills array (should have 1 fill after completion)
          const fillAmount = fills && fills.length > 0
            ? (fills[0].input_amount as string)
            : undefined;

          console.log(`[complete-auction] Winner: ${winner}, Fill amount: ${fillAmount}`);

          if (winner) {
            // Record the taker transaction (the complete_sealed_bid is the fill)
            const takerResponse = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3001'}/api/transactions/taker`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                intent_id: intentId.toString(),
                taker_tx_hash: executedTx.hash,
                solver_address: winner,
                fill_amount: fillAmount,
              }),
            });

            const takerResult = await takerResponse.json();
            console.log(`[complete-auction] Taker TX response:`, takerResult);

            if (takerResponse.ok) {
              console.log(`[complete-auction] Recorded taker TX for winner: ${winner}`);
            } else {
              console.warn(`[complete-auction] Failed to record taker TX:`, takerResult);
            }
          } else {
            console.warn(`[complete-auction] No winner found in auction:`, auction);
          }
        }
      } catch (recordError) {
        console.warn('[complete-auction] Failed to record taker TX:', recordError);
        // Don't fail the response - the auction was still completed
      }

      return NextResponse.json({
        success: true,
        intentId,
        txHash: executedTx.hash,
        message: 'Sealed bid auction completed successfully',
      });
    } else {
      console.error(`[complete-auction] Failed! VM Status: ${executedTx.vm_status}`);
      return NextResponse.json({
        success: false,
        intentId,
        txHash: executedTx.hash,
        error: executedTx.vm_status,
      }, { status: 400 });
    }
  } catch (error) {
    console.error('[complete-auction] Error:', error);
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}

/**
 * GET /api/complete-auction
 *
 * Returns the invisible wallet address used for auction completion.
 * Useful for configuring contracts.
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
    console.error('[complete-auction] GET Error:', error);
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
