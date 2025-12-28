import 'dotenv/config';
import { Aptos, AptosConfig, Network, Ed25519PrivateKey, Account } from '@aptos-labs/ts-sdk';

const VELOX_ADDRESS = process.env.VELOX_ADDRESS || '0x94d017d8d944702a976af2844bdf3534b946e712cad286610aef5969568ba470';
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

  console.log('=== Submit DCA Intent ===');
  console.log('User Address:', user.accountAddress.toString());
  console.log('');

  // DCA: 0.5 tUSDC per period, 4 periods, 30 second interval = 2 tUSDC total over 2 minutes
  const amountPerPeriod = 50000000; // 0.5 tUSDC
  const totalPeriods = 4;
  const intervalSeconds = 30; // 30 seconds between periods

  console.log('Submitting DCA:');
  console.log(`  Amount per period: ${amountPerPeriod / 1e8} tUSDC`);
  console.log(`  Total periods: ${totalPeriods}`);
  console.log(`  Interval: ${intervalSeconds} seconds`);
  console.log(`  Total investment: ${(amountPerPeriod * totalPeriods) / 1e8} tUSDC`);
  console.log(`  Duration: ${(totalPeriods * intervalSeconds) / 60} minutes`);

  try {
    const tx = await aptos.transaction.build.simple({
      sender: user.accountAddress,
      data: {
        function: `${VELOX_ADDRESS}::submission::submit_dca` as `${string}::${string}::${string}`,
        typeArguments: [],
        functionArguments: [
          VELOX_ADDRESS, // registry
          VELOX_ADDRESS, // scheduled registry (same address)
          TOKEN_ADDRESSES.tUSDC, // input token
          TOKEN_ADDRESSES.tMOVE, // output token
          amountPerPeriod.toString(), // amount per period
          totalPeriods.toString(), // total periods
          intervalSeconds.toString(), // interval seconds
        ],
      },
    });

    const signedTx = await aptos.transaction.sign({ signer: user, transaction: tx });
    const result = await aptos.transaction.submit.simple({ transaction: tx, senderAuthenticator: signedTx });

    console.log('');
    console.log('=== DCA Intent Submitted! ===');
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
    console.log('The solver should execute periods every', intervalSeconds, 'seconds...');
  } catch (error) {
    console.error('Error submitting DCA:', (error as Error).message);
    process.exit(1);
  }
}

main().catch((error) => {
  console.error('Error:', error);
  process.exit(1);
});
