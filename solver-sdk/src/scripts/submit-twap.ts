import 'dotenv/config';
import { Aptos, AptosConfig, Network, Ed25519PrivateKey, Account } from '@aptos-labs/ts-sdk';

const VELOX_ADDRESS = process.env.VELOX_ADDRESS || '0x951cb360d9b1d4cb4834cf76e4fca0f63a85237874d8b2d45b3056439b91cbb7';
const RPC_URL = process.env.RPC_URL || 'https://testnet.movementnetwork.xyz/v1';
const USER_PRIVATE_KEY = process.env.USER_PRIVATE_KEY;

const TOKEN_ADDRESSES = {
  tUSDC: '0x194eede164d0a9ee0c8082ff82eebdf146b3936872c203cf9282cd54ea5287ce',
  tMOVE: '0x626598b71b290f416b9e906dc3dfff337bf0364b3bf53b0bbb6ffab1c0dc373b',
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

  console.log('=== Submit TWAP Intent ===');
  console.log('User Address:', user.accountAddress.toString());
  console.log('');

  // TWAP: 2 tUSDC total, 4 chunks (0.5 tUSDC each), 30 second interval, 50 bps max slippage
  const totalAmount = 200000000; // 2 tUSDC
  const numChunks = 4;
  const intervalSeconds = 30;
  const maxSlippageBps = 50; // 0.5%
  const startTime = Math.floor(Date.now() / 1000) + 5; // start in 5 seconds to allow tx processing

  console.log('Submitting TWAP:');
  console.log(`  Total amount: ${totalAmount / 1e8} tUSDC`);
  console.log(`  Num chunks: ${numChunks}`);
  console.log(`  Chunk size: ${totalAmount / numChunks / 1e8} tUSDC`);
  console.log(`  Interval: ${intervalSeconds} seconds`);
  console.log(`  Max slippage: ${maxSlippageBps} bps (${maxSlippageBps / 100}%)`);
  console.log(`  Start time: ${new Date(startTime * 1000).toISOString()}`);
  console.log(`  Duration: ${(numChunks * intervalSeconds) / 60} minutes`);

  try {
    const tx = await aptos.transaction.build.simple({
      sender: user.accountAddress,
      data: {
        function: `${VELOX_ADDRESS}::submission::submit_twap` as `${string}::${string}::${string}`,
        typeArguments: [],
        functionArguments: [
          VELOX_ADDRESS, // registry
          VELOX_ADDRESS, // scheduled registry (same address)
          TOKEN_ADDRESSES.tUSDC, // input token
          TOKEN_ADDRESSES.tMOVE, // output token
          totalAmount.toString(), // total amount
          numChunks.toString(), // num chunks
          intervalSeconds.toString(), // interval seconds
          maxSlippageBps.toString(), // max slippage bps
          startTime.toString(), // start time
        ],
      },
    });

    const signedTx = await aptos.transaction.sign({ signer: user, transaction: tx });
    const result = await aptos.transaction.submit.simple({ transaction: tx, senderAuthenticator: signedTx });

    console.log('');
    console.log('=== TWAP Intent Submitted! ===');
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
    console.log('');
    console.log('The solver should execute chunks every', intervalSeconds, 'seconds...');
  } catch (error) {
    console.error('Error submitting TWAP:', (error as Error).message);
    process.exit(1);
  }
}

main().catch((error) => {
  console.error('Error:', error);
  process.exit(1);
});
