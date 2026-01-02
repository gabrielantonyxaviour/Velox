import 'dotenv/config';
import { Aptos, AptosConfig, Network, Ed25519PrivateKey, Account } from '@aptos-labs/ts-sdk';

const VELOX_ADDRESS = process.env.VELOX_ADDRESS || '0x951cb360d9b1d4cb4834cf76e4fca0f63a85237874d8b2d45b3056439b91cbb7';
const RPC_URL = 'https://testnet.movementnetwork.xyz/v1';
const USER_PRIVATE_KEY = process.env.USER_PRIVATE_KEY;

const TOKEN_ADDRESSES = {
  tUSDC: '0xd249fd3776a6bf959963d2f7712386da3f343a973f0d88ed05b1e9e6be6cb015',
  tMOVE: '0x9913b3a2cd19b572521bcc890058dfd285943fbfa33b7c954879f55bbe5da89',
};

async function main() {
  const aptos = new Aptos(new AptosConfig({ network: Network.CUSTOM, fullnode: RPC_URL }));
  if (!USER_PRIVATE_KEY) { console.error('USER_PRIVATE_KEY not set'); process.exit(1); }
  const privateKey = new Ed25519PrivateKey(USER_PRIVATE_KEY);
  const user = Account.fromPrivateKey({ privateKey });

  // Fast TWAP: 0.2 tUSDC total, 2 chunks, 10 second interval
  const totalAmount = 20000000; // 0.2 tUSDC
  const numChunks = 2;
  const intervalSeconds = 10;
  const maxSlippageBps = 50;
  const startTime = Math.floor(Date.now() / 1000) + 5;

  console.log('Submitting FAST TWAP (10s interval, 2 chunks)...');

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
}

main().catch(console.error);
