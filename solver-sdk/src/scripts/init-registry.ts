import 'dotenv/config';
import { Aptos, AptosConfig, Network, Account, Ed25519PrivateKey } from '@aptos-labs/ts-sdk';

const VELOX_ADDRESS = process.env.VELOX_ADDRESS || '0x94d017d8d944702a976af2844bdf3534b946e712cad286610aef5969568ba470';
const RPC_URL = process.env.RPC_URL || 'https://testnet.movementnetwork.xyz/v1';
const PRIVATE_KEY = process.env.SOLVER_PRIVATE_KEY;

async function main() {
  if (!PRIVATE_KEY) {
    throw new Error('SOLVER_PRIVATE_KEY is required');
  }

  const aptos = new Aptos(
    new AptosConfig({
      network: Network.CUSTOM,
      fullnode: RPC_URL,
    })
  );

  const privateKey = new Ed25519PrivateKey(PRIVATE_KEY);
  const account = Account.fromPrivateKey({ privateKey });

  console.log('Account:', account.accountAddress.toString());
  console.log('Velox Address:', VELOX_ADDRESS);
  console.log('RPC URL:', RPC_URL);

  // Initialize submission registry
  console.log('\nInitializing Submission IntentRegistry...');
  try {
    const tx = await aptos.transaction.build.simple({
      sender: account.accountAddress,
      data: {
        function: `${VELOX_ADDRESS}::submission::initialize` as `${string}::${string}::${string}`,
        typeArguments: [],
        functionArguments: [],
      },
    });

    const signedTx = await aptos.signAndSubmitTransaction({
      signer: account,
      transaction: tx,
    });

    await aptos.waitForTransaction({ transactionHash: signedTx.hash });
    console.log('Submission registry initialized! TX:', signedTx.hash);
  } catch (error) {
    console.log('Submission init error:', (error as Error).message);
    if ((error as Error).message.includes('ALREADY_EXISTS') ||
        (error as Error).message.includes('already_exists')) {
      console.log('Already initialized, continuing...');
    } else {
      throw error;
    }
  }

  // Initialize scheduled registry
  console.log('\nInitializing Scheduled Registry...');
  try {
    const tx = await aptos.transaction.build.simple({
      sender: account.accountAddress,
      data: {
        function: `${VELOX_ADDRESS}::scheduled::initialize` as `${string}::${string}::${string}`,
        typeArguments: [],
        functionArguments: [],
      },
    });

    const signedTx = await aptos.signAndSubmitTransaction({
      signer: account,
      transaction: tx,
    });

    await aptos.waitForTransaction({ transactionHash: signedTx.hash });
    console.log('Scheduled registry initialized! TX:', signedTx.hash);
  } catch (error) {
    console.log('Scheduled init error:', (error as Error).message);
  }

  // Initialize auction state
  console.log('\nInitializing Auction State...');
  try {
    const tx = await aptos.transaction.build.simple({
      sender: account.accountAddress,
      data: {
        function: `${VELOX_ADDRESS}::auction::initialize` as `${string}::${string}::${string}`,
        typeArguments: [],
        functionArguments: [],
      },
    });

    const signedTx = await aptos.signAndSubmitTransaction({
      signer: account,
      transaction: tx,
    });

    await aptos.waitForTransaction({ transactionHash: signedTx.hash });
    console.log('Auction state initialized! TX:', signedTx.hash);
  } catch (error) {
    console.log('Auction init error:', (error as Error).message);
  }

  console.log('\nDone!');
}

main().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});
