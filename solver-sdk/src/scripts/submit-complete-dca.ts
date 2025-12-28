import 'dotenv/config';
import { Aptos, AptosConfig, Network, Ed25519PrivateKey, Account } from '@aptos-labs/ts-sdk';

const VELOX_ADDRESS = process.env.VELOX_ADDRESS || '0x94d017d8d944702a976af2844bdf3534b946e712cad286610aef5969568ba470';
const RPC_URL = 'https://testnet.movementnetwork.xyz/v1';
const USER_PRIVATE_KEY = process.env.USER_PRIVATE_KEY;

const TOKEN_ADDRESSES = {
  tUSDC: '0xfb34c9c1600d86a9acdb351aaf6fddce6a0de7254bced08c38fcaf364e525297',
  tMOVE: '0x8f82fb318e613f63aca2168b11ba2a08a66606c7e862c38128e414856b840ec5',
};

async function main() {
  const aptos = new Aptos(new AptosConfig({ network: Network.CUSTOM, fullnode: RPC_URL }));
  if (!USER_PRIVATE_KEY) { console.error('USER_PRIVATE_KEY not set'); process.exit(1); }
  const privateKey = new Ed25519PrivateKey(USER_PRIVATE_KEY);
  const user = Account.fromPrivateKey({ privateKey });

  // DCA with longer intervals (30s) to ensure solver can process all periods
  // 2 periods * 30s interval = 60s total, deadline = now + 60s
  // Solver polls every 10s, so ~3 polls per interval = plenty of buffer
  const amountPerPeriod = 10000000; // 0.1 tUSDC
  const totalPeriods = 2;
  const intervalSeconds = 30; // 30 seconds between periods

  console.log('Submitting DCA (30s interval, 2 periods)...');
  console.log('Expected timeline:');
  console.log('  - Period 1: Can execute immediately');
  console.log('  - Period 2: Can execute after 30s');
  console.log('  - Deadline: ~60s from now');

  const tx = await aptos.transaction.build.simple({
    sender: user.accountAddress,
    data: {
      function: `${VELOX_ADDRESS}::submission::submit_dca` as `${string}::${string}::${string}`,
      typeArguments: [],
      functionArguments: [VELOX_ADDRESS, VELOX_ADDRESS, TOKEN_ADDRESSES.tUSDC, TOKEN_ADDRESSES.tMOVE,
        amountPerPeriod.toString(), totalPeriods.toString(), intervalSeconds.toString()],
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
  console.log('\nMonitor with: watch the solver output for DCA period fills');
}

main().catch(console.error);
