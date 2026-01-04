/**
 * Script to complete a sealed bid auction and fill the swap as winner
 * Usage: npx ts-node src/scripts/complete-and-fill.ts <intentId>
 */
import {
  Aptos,
  AptosConfig,
  Network,
  Ed25519PrivateKey,
  Account,
} from '@aptos-labs/ts-sdk';

const VELOX_ADDRESS = process.env.VELOX_ADDRESS || '0x94d017d8d944702a976af2844bdf3534b946e712cad286610aef5969568ba470';
const RPC_URL = process.env.RPC_URL || 'https://testnet.movementnetwork.xyz/v1';

async function main() {
  const intentId = process.argv[2];
  if (!intentId) {
    console.error('Usage: npx ts-node src/scripts/complete-and-fill.ts <intentId>');
    process.exit(1);
  }

  const privateKey = process.env.SOLVER_PRIVATE_KEY;
  if (!privateKey) {
    console.error('SOLVER_PRIVATE_KEY environment variable required');
    process.exit(1);
  }

  console.log('=== Complete and Fill Script ===');
  console.log(`Intent ID: ${intentId}`);
  console.log(`Velox Address: ${VELOX_ADDRESS}`);
  console.log(`RPC URL: ${RPC_URL}`);

  const aptos = new Aptos(new AptosConfig({
    network: Network.CUSTOM,
    fullnode: RPC_URL,
  }));

  const account = Account.fromPrivateKey({
    privateKey: new Ed25519PrivateKey(privateKey),
  });

  console.log(`Solver Address: ${account.accountAddress.toString()}`);

  // Step 1: Get intent state
  console.log('\n--- Step 1: Check Intent State ---');
  const intentResult = await aptos.view({
    payload: {
      function: `${VELOX_ADDRESS}::submission::get_intent`,
      typeArguments: [],
      functionArguments: [VELOX_ADDRESS, intentId],
    },
  });

  const record = intentResult[0] as Record<string, unknown>;
  const auction = record.auction as Record<string, unknown>;
  const intent = record.intent as Record<string, unknown>;

  console.log(`Status: ${(record.status as Record<string, unknown>).__variant__}`);
  console.log(`Auction Type: ${auction.__variant__}`);
  console.log(`Escrow Remaining: ${record.escrow_remaining}`);

  if (auction.__variant__ === 'SealedBidActive') {
    console.log(`\nAuction is still active, completing...`);

    // Step 2: Complete the auction
    console.log('\n--- Step 2: Complete Sealed Bid Auction ---');

    const completeTx = await aptos.transaction.build.simple({
      sender: account.accountAddress,
      data: {
        function: `${VELOX_ADDRESS}::auction::complete_sealed_bid`,
        functionArguments: [VELOX_ADDRESS, intentId],
      },
    });

    const completeSigned = await aptos.signAndSubmitTransaction({
      signer: account,
      transaction: completeTx,
    });

    const completeResult = await aptos.waitForTransaction({
      transactionHash: completeSigned.hash,
    });

    if (completeResult.success) {
      console.log(`Auction completed! TX: ${completeResult.hash}`);
    } else {
      console.error(`Failed to complete auction: ${completeResult.vm_status}`);
      process.exit(1);
    }

    // Wait for state to update
    await new Promise(resolve => setTimeout(resolve, 2000));
  }

  // Step 3: Get updated intent state
  console.log('\n--- Step 3: Check Updated Intent State ---');
  const updatedIntentResult = await aptos.view({
    payload: {
      function: `${VELOX_ADDRESS}::submission::get_intent`,
      typeArguments: [],
      functionArguments: [VELOX_ADDRESS, intentId],
    },
  });

  const updatedRecord = updatedIntentResult[0] as Record<string, unknown>;
  const updatedAuction = updatedRecord.auction as Record<string, unknown>;
  const updatedIntent = updatedRecord.intent as Record<string, unknown>;

  console.log(`Status: ${(updatedRecord.status as Record<string, unknown>).__variant__}`);
  console.log(`Auction Type: ${updatedAuction.__variant__}`);

  if (updatedAuction.__variant__ === 'SealedBidCompleted') {
    const winner = updatedAuction.winner as string;
    console.log(`Winner: ${winner}`);
    console.log(`Our Address: ${account.accountAddress.toString()}`);

    if (winner.toLowerCase() !== account.accountAddress.toString().toLowerCase()) {
      console.log(`\nWe are NOT the winner. Cannot fill.`);
      process.exit(0);
    }

    // Step 4: Fill the swap
    console.log('\n--- Step 4: Fill Swap ---');

    const fillInput = updatedRecord.escrow_remaining as string;
    const winningBid = updatedAuction.winning_bid as string;

    console.log(`Fill Input: ${fillInput}`);
    console.log(`Output Amount: ${winningBid}`);

    const fillTx = await aptos.transaction.build.simple({
      sender: account.accountAddress,
      data: {
        function: `${VELOX_ADDRESS}::settlement::fill_swap`,
        functionArguments: [
          VELOX_ADDRESS,
          VELOX_ADDRESS,
          intentId,
          fillInput,
          winningBid,
        ],
      },
    });

    const fillSigned = await aptos.signAndSubmitTransaction({
      signer: account,
      transaction: fillTx,
    });

    const fillResult = await aptos.waitForTransaction({
      transactionHash: fillSigned.hash,
    });

    if (fillResult.success) {
      console.log(`\n=== Swap Filled Successfully! ===`);
      console.log(`TX: ${fillResult.hash}`);
    } else {
      console.error(`Failed to fill swap: ${fillResult.vm_status}`);
      process.exit(1);
    }
  } else {
    console.log(`Auction not in completed state: ${updatedAuction.__variant__}`);
  }
}

main().catch(console.error);
