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

  console.log('=== Submit Dutch Auction Intent ===');
  console.log('User Address:', user.accountAddress.toString());
  console.log('');

  // Dutch Auction: 1 tUSDC with price declining from 30 tMOVE to 20 tMOVE over 60 seconds
  const inputAmount = 100000000; // 1 tUSDC
  const startPrice = 3000000000; // 30 tMOVE (start high)
  const minAmountOut = 2000000000; // 20 tMOVE (end low / minimum acceptable)
  const deadline = Math.floor(Date.now() / 1000) + 300; // 5 minutes from now
  const auctionDuration = 60; // 60 seconds

  console.log('Submitting Dutch Auction:');
  console.log(`  Input: ${inputAmount / 1e8} tUSDC`);
  console.log(`  Start Price: ${startPrice / 1e8} tMOVE (high)`);
  console.log(`  End Price: ${minAmountOut / 1e8} tMOVE (low/min)`);
  console.log(`  Auction Duration: ${auctionDuration} seconds`);
  console.log(`  Deadline: ${new Date(deadline * 1000).toISOString()}`);
  console.log('');
  console.log('Price declines from 30 tMOVE to 20 tMOVE over 60 seconds.');
  console.log('Solvers can accept at any price along the curve.');

  try {
    const tx = await aptos.transaction.build.simple({
      sender: user.accountAddress,
      data: {
        function: `${VELOX_ADDRESS}::submission::submit_swap_dutch` as `${string}::${string}::${string}`,
        typeArguments: [],
        functionArguments: [
          VELOX_ADDRESS, // registry
          VELOX_ADDRESS, // auction state (same address)
          TOKEN_ADDRESSES.tUSDC, // input token
          TOKEN_ADDRESSES.tMOVE, // output token
          inputAmount.toString(), // amount in
          minAmountOut.toString(), // min amount out (end price)
          startPrice.toString(), // start price
          deadline.toString(), // deadline
          auctionDuration.toString(), // auction duration
        ],
      },
    });

    const signedTx = await aptos.transaction.sign({ signer: user, transaction: tx });
    const result = await aptos.transaction.submit.simple({ transaction: tx, senderAuthenticator: signedTx });

    console.log('');
    console.log('=== Dutch Auction Submitted! ===');
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
    console.log('Use the dutch-solver to accept this auction...');
  } catch (error) {
    console.error('Error submitting Dutch auction:', (error as Error).message);
    process.exit(1);
  }
}

main().catch((error) => {
  console.error('Error:', error);
  process.exit(1);
});
