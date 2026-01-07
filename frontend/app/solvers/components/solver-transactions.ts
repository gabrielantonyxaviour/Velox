import {
  AccountAuthenticatorEd25519,
  Ed25519PublicKey,
  Ed25519Signature,
  generateSigningMessageForTransaction,
} from '@aptos-labs/ts-sdk';
import { aptos, VELOX_ADDRESS, toHex } from '@/app/lib/aptos';

export interface SignRawHashFunction {
  (params: { address: string; chainType: 'aptos'; hash: `0x${string}` }): Promise<{
    signature: string;
  }>;
}

async function signAndSubmitWithPrivy(
  walletAddress: string,
  functionId: `${string}::${string}::${string}`,
  args: (string | number | bigint | boolean)[],
  publicKeyHex: string,
  signRawHash: SignRawHashFunction
): Promise<string> {
  const rawTxn = await aptos.transaction.build.simple({
    sender: walletAddress,
    data: {
      function: functionId,
      typeArguments: [],
      functionArguments: args,
    },
  });

  const message = generateSigningMessageForTransaction(rawTxn);
  const { signature: rawSignature } = await signRawHash({
    address: walletAddress,
    chainType: 'aptos',
    hash: `0x${toHex(message)}`,
  });

  let cleanPublicKey = publicKeyHex.startsWith('0x') ? publicKeyHex.slice(2) : publicKeyHex;
  if (cleanPublicKey.length === 66) {
    cleanPublicKey = cleanPublicKey.slice(2);
  }

  const senderAuthenticator = new AccountAuthenticatorEd25519(
    new Ed25519PublicKey(cleanPublicKey),
    new Ed25519Signature(rawSignature.startsWith('0x') ? rawSignature.slice(2) : rawSignature)
  );

  const committedTx = await aptos.transaction.submit.simple({
    transaction: rawTxn,
    senderAuthenticator,
  });

  const executed = await aptos.waitForTransaction({ transactionHash: committedTx.hash });
  if (!executed.success) {
    throw new Error('Transaction failed');
  }

  return committedTx.hash;
}

// Register as a solver
export async function registerSolver(
  walletAddress: string,
  stake: bigint,
  signRawHash: SignRawHashFunction,
  publicKeyHex: string
): Promise<string> {
  return signAndSubmitWithPrivy(
    walletAddress,
    `${VELOX_ADDRESS}::solver_registry::register`,
    [VELOX_ADDRESS, stake.toString()],
    publicKeyHex,
    signRawHash
  );
}

export async function registerSolverNative(
  walletAddress: string,
  stake: bigint,
  signAndSubmitTransaction: (payload: unknown) => Promise<{ hash: string }>
): Promise<string> {
  const response = await signAndSubmitTransaction({
    sender: walletAddress,
    data: {
      function: `${VELOX_ADDRESS}::solver_registry::register`,
      functionArguments: [VELOX_ADDRESS, stake.toString()],
    },
  });

  const executed = await aptos.waitForTransaction({ transactionHash: response.hash });
  if (!executed.success) {
    throw new Error('Transaction failed');
  }

  return response.hash;
}

// Add stake
export async function addStake(
  walletAddress: string,
  amount: bigint,
  signRawHash: SignRawHashFunction,
  publicKeyHex: string
): Promise<string> {
  return signAndSubmitWithPrivy(
    walletAddress,
    `${VELOX_ADDRESS}::solver_registry::add_stake`,
    [VELOX_ADDRESS, amount.toString()],
    publicKeyHex,
    signRawHash
  );
}

export async function addStakeNative(
  walletAddress: string,
  amount: bigint,
  signAndSubmitTransaction: (payload: unknown) => Promise<{ hash: string }>
): Promise<string> {
  const response = await signAndSubmitTransaction({
    sender: walletAddress,
    data: {
      function: `${VELOX_ADDRESS}::solver_registry::add_stake`,
      functionArguments: [VELOX_ADDRESS, amount.toString()],
    },
  });

  const executed = await aptos.waitForTransaction({ transactionHash: response.hash });
  if (!executed.success) {
    throw new Error('Transaction failed');
  }

  return response.hash;
}

// Deactivate solver
export async function deactivateSolver(
  walletAddress: string,
  signRawHash: SignRawHashFunction,
  publicKeyHex: string
): Promise<string> {
  return signAndSubmitWithPrivy(
    walletAddress,
    `${VELOX_ADDRESS}::solver_registry::deactivate`,
    [VELOX_ADDRESS],
    publicKeyHex,
    signRawHash
  );
}

export async function deactivateSolverNative(
  walletAddress: string,
  signAndSubmitTransaction: (payload: unknown) => Promise<{ hash: string }>
): Promise<string> {
  const response = await signAndSubmitTransaction({
    sender: walletAddress,
    data: {
      function: `${VELOX_ADDRESS}::solver_registry::deactivate`,
      functionArguments: [VELOX_ADDRESS],
    },
  });

  const executed = await aptos.waitForTransaction({ transactionHash: response.hash });
  if (!executed.success) {
    throw new Error('Transaction failed');
  }

  return response.hash;
}

// Reactivate solver
export async function reactivateSolver(
  walletAddress: string,
  signRawHash: SignRawHashFunction,
  publicKeyHex: string
): Promise<string> {
  return signAndSubmitWithPrivy(
    walletAddress,
    `${VELOX_ADDRESS}::solver_registry::reactivate`,
    [VELOX_ADDRESS],
    publicKeyHex,
    signRawHash
  );
}

export async function reactivateSolverNative(
  walletAddress: string,
  signAndSubmitTransaction: (payload: unknown) => Promise<{ hash: string }>
): Promise<string> {
  const response = await signAndSubmitTransaction({
    sender: walletAddress,
    data: {
      function: `${VELOX_ADDRESS}::solver_registry::reactivate`,
      functionArguments: [VELOX_ADDRESS],
    },
  });

  const executed = await aptos.waitForTransaction({ transactionHash: response.hash });
  if (!executed.success) {
    throw new Error('Transaction failed');
  }

  return response.hash;
}
