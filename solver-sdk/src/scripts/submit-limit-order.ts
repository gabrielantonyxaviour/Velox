import 'dotenv/config';
import { Aptos, AptosConfig, Network, Ed25519PrivateKey, Account } from '@aptos-labs/ts-sdk';

const VELOX_ADDRESS = process.env.VELOX_ADDRESS || '0x951cb360d9b1d4cb4834cf76e4fca0f63a85237874d8b2d45b3056439b91cbb7';
const RPC_URL = process.env.RPC_URL || 'https://testnet.movementnetwork.xyz/v1';
const USER_PRIVATE_KEY = process.env.USER_PRIVATE_KEY;

const TOKEN_ADDRESSES = {
  tUSDC: '0xfb34c9c1600d86a9acdb351aaf6fddce6a0de7254bced08c38fcaf364e525297',
  tMOVE: '0x8f82fb318e613f63aca2168b11ba2a08a66606c7e862c38128e414856b840ec5',
};

async function main() {
  const aptos = new Aptos(
    new AptosConfig({
      network: Network.CUSTOM,
      fullnode: RPC_URL,
    })
  );

  if (!USER_PRIVATE_KEY) {
    console.error('USER_PRIVATE_KEY not set');
    process.exit(1);
  }

  const privateKey = new Ed25519PrivateKey(USER_PRIVATE_KEY);
  const user = Account.fromPrivateKey({ privateKey });

  console.log('=== Submit Limit Order Intent ===');
  console.log('User Address:', user.accountAddress.toString());
  console.log('');

  // Limit order: 1 tUSDC for tMOVE at limit price of 25 tMOVE per tUSDC
  // execution_price = (output_amount * 10000) / input_amount
  // For 25 tMOVE per 1 tUSDC: (25 * 10^8 * 10000) / 10^8 = 250000
  const inputAmount = 100000000; // 1 tUSDC
  const limitPrice = 250000; // 25 tMOVE per tUSDC in solver's scale
  const expiry = Math.floor(Date.now() / 1000) + 600; // 10 minutes from now
  const partialFillAllowed = false;

  console.log('Submitting limit order:');
  console.log(`  Input: ${inputAmount / 1e8} tUSDC`);
  console.log(`  Output: tMOVE`);
  console.log(`  Limit price: ${limitPrice} (scaled)`);
  console.log(`  Expiry: ${new Date(expiry * 1000).toISOString()}`);
  console.log(`  Partial fill: ${partialFillAllowed}`);

  try {
    const tx = await aptos.transaction.build.simple({
      sender: user.accountAddress,
      data: {
        function: `${VELOX_ADDRESS}::submission::submit_limit_order` as `${string}::${string}::${string}`,
        typeArguments: [],
        functionArguments: [
          VELOX_ADDRESS, // registry
          TOKEN_ADDRESSES.tUSDC, // input token
          TOKEN_ADDRESSES.tMOVE, // output token
          inputAmount.toString(), // amount
          limitPrice.toString(), // limit price
          expiry.toString(), // expiry
          partialFillAllowed, // partial fill allowed
        ],
      },
    });

    const signedTx = await aptos.transaction.sign({ signer: user, transaction: tx });
    const result = await aptos.transaction.submit.simple({ transaction: tx, senderAuthenticator: signedTx });

    console.log('');
    console.log('=== Limit Order Submitted! ===');
    console.log('TX Hash:', result.hash);

    await aptos.waitForTransaction({ transactionHash: result.hash });
    console.log('Transaction confirmed!');

    // Get intent ID
    const totalResult = await aptos.view({
      payload: {
        function: `${VELOX_ADDRESS}::submission::get_total_intents` as `${string}::${string}::${string}`,
        typeArguments: [],
        functionArguments: [VELOX_ADDRESS],
      },
    });
    const totalIntents = Number(totalResult[0]);
    console.log('New Intent ID:', totalIntents - 1);
  } catch (error) {
    console.error('Error submitting limit order:', (error as Error).message);
    process.exit(1);
  }
}

main().catch((error) => {
  console.error('Error:', error);
  process.exit(1);
});
