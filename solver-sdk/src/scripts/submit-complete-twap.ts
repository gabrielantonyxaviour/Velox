import 'dotenv/config';
import { Aptos, AptosConfig, Network, Ed25519PrivateKey, Account } from '@aptos-labs/ts-sdk';

const VELOX_ADDRESS = process.env.VELOX_ADDRESS || '0x951cb360d9b1d4cb4834cf76e4fca0f63a85237874d8b2d45b3056439b91cbb7';
const RPC_URL = 'https://testnet.movementnetwork.xyz/v1';
const USER_PRIVATE_KEY = process.env.USER_PRIVATE_KEY;

const TOKEN_ADDRESSES = {
  tUSDC: '0x194eede164d0a9ee0c8082ff82eebdf146b3936872c203cf9282cd54ea5287ce',
  tMOVE: '0x626598b71b290f416b9e906dc3dfff337bf0364b3bf53b0bbb6ffab1c0dc373b',
};

async function main() {
  const aptos = new Aptos(new AptosConfig({ network: Network.CUSTOM, fullnode: RPC_URL }));
  if (!USER_PRIVATE_KEY) { console.error('USER_PRIVATE_KEY not set'); process.exit(1); }
  const privateKey = new Ed25519PrivateKey(USER_PRIVATE_KEY);
  const user = Account.fromPrivateKey({ privateKey });

  // TWAP with longer intervals (30s) to ensure solver can process all chunks
  // 2 chunks * 30s interval = 60s total, deadline = start_time + 60s
  // Solver polls every 10s, so ~3 polls per interval = plenty of buffer
  const totalAmount = 20000000; // 0.2 tUSDC
  const numChunks = 2;
  const intervalSeconds = 30; // 30 seconds between chunks
  const maxSlippageBps = 50;
  const startTime = Math.floor(Date.now() / 1000) + 5; // Start in 5 seconds

  console.log('Submitting TWAP (30s interval, 2 chunks)...');
  console.log('Expected timeline:');
  console.log(`  - Chunk 1: Can execute at ${new Date(startTime * 1000).toISOString()}`);
  console.log(`  - Chunk 2: Can execute at ${new Date((startTime + 30) * 1000).toISOString()}`);
  console.log(`  - Deadline: ~${new Date((startTime + 60) * 1000).toISOString()}`);

  const tx = await aptos.transaction.build.simple({
    sender: user.accountAddress,
    data: {
      function: `${VELOX_ADDRESS}::submission::submit_twap` as `${string}::${string}::${string}`,
      typeArguments: [],
      functionArguments: [VELOX_ADDRESS, VELOX_ADDRESS, TOKEN_ADDRESSES.tUSDC, TOKEN_ADDRESSES.tMOVE,
        totalAmount.toString(), numChunks.toString(), intervalSeconds.toString(),
        maxSlippageBps.toString(), startTime.toString()],
    },
  });

  const signedTx = await aptos.transaction.sign({ signer: user, transaction: tx });
  const result = await aptos.transaction.submit.simple({ transaction: tx, senderAuthenticator: signedTx });
  console.log('TX:', result.hash);
  await aptos.waitForTransaction({ transactionHash: result.hash });

  const totalResult = await aptos.view({
    payload: { function: `${VELOX_ADDRESS}::submission::get_total_intents` as `${string}::${string}::${string}`,
      typeArguments: [], functionArguments: [VELOX_ADDRESS] },
  });
  console.log('Intent ID:', Number(totalResult[0]) - 1);
  console.log('\nMonitor with: watch the solver output for TWAP chunk fills');
}

main().catch(console.error);
