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

  console.log('=== Minting Tokens to Solver ===');
  console.log('Account:', account.accountAddress.toString());

  const amount = 1000 * 1e8; // 1000 tokens with 8 decimals

  // Mint 1000 tUSDC
  console.log('\nMinting 1000 tUSDC...');
  try {
    const tx = await aptos.transaction.build.simple({
      sender: account.accountAddress,
      data: {
        function: `${VELOX_ADDRESS}::test_tokens::faucet_token_a` as `${string}::${string}::${string}`,
        typeArguments: [],
        functionArguments: [VELOX_ADDRESS, amount],
      },
    });

    const signedTx = await aptos.signAndSubmitTransaction({
      signer: account,
      transaction: tx,
    });

    await aptos.waitForTransaction({ transactionHash: signedTx.hash });
    console.log('tUSDC minted! TX:', signedTx.hash);
  } catch (error) {
    console.log('tUSDC mint error:', (error as Error).message);
  }

  // Mint 1000 tMOVE
  console.log('\nMinting 1000 tMOVE...');
  try {
    const tx = await aptos.transaction.build.simple({
      sender: account.accountAddress,
      data: {
        function: `${VELOX_ADDRESS}::test_tokens::faucet_token_b` as `${string}::${string}::${string}`,
        typeArguments: [],
        functionArguments: [VELOX_ADDRESS, amount],
      },
    });

    const signedTx = await aptos.signAndSubmitTransaction({
      signer: account,
      transaction: tx,
    });

    await aptos.waitForTransaction({ transactionHash: signedTx.hash });
    console.log('tMOVE minted! TX:', signedTx.hash);
  } catch (error) {
    console.log('tMOVE mint error:', (error as Error).message);
  }

  console.log('\nDone! Run check-balances.ts to verify.');
}

main().catch((error) => {
  console.error('Error:', error);
  process.exit(1);
});
