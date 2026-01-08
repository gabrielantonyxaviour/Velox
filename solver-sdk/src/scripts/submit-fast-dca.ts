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

  // Fast DCA: 0.1 tUSDC per period, 2 periods, 10 second interval
  const amountPerPeriod = 10000000; // 0.1 tUSDC
  const totalPeriods = 2;
  const intervalSeconds = 10;

  console.log('Submitting FAST DCA (10s interval, 2 periods)...');

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
}

main().catch(console.error);
