import {
  AccountAuthenticatorEd25519,
  AccountAuthenticator,
  Ed25519PublicKey,
  Ed25519Signature,
  generateSigningMessageForTransaction,
  SimpleTransaction,
} from '@aptos-labs/ts-sdk';
import { aptos, VELOX_ADDRESS, toHex } from '@/app/lib/aptos';
import { sponsoredSubmit, sponsoredSubmitNative, isSponsorshipEnabled } from '@/app/lib/shinami';

export interface SignRawHashFunction {
  (params: { address: string; chainType: 'aptos'; hash: `0x${string}` }): Promise<{
    signature: string;
  }>;
}

export type SignTransactionFunction = (args: {
  transactionOrPayload: SimpleTransaction;
  asFeePayer?: boolean;
}) => Promise<{ authenticator: AccountAuthenticator; rawTransaction: Uint8Array }>;

// Fallback: user pays gas (Privy)
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

// Fallback: user pays gas (Native)
async function signAndSubmitNative(
  walletAddress: string,
  functionId: `${string}::${string}::${string}`,
  args: (string | number | bigint | boolean)[],
  signAndSubmitTransaction: (payload: unknown) => Promise<{ hash: string }>
): Promise<string> {
  const response = await signAndSubmitTransaction({
    sender: walletAddress,
    data: {
      function: functionId,
      functionArguments: args,
    },
  });

  const executed = await aptos.waitForTransaction({ transactionHash: response.hash });
  if (!executed.success) {
    throw new Error('Transaction failed');
  }

  return response.hash;
}

// Smart submit with Shinami Gas Station (Privy)
async function smartSubmitWithPrivy(
  walletAddress: string,
  functionId: `${string}::${string}::${string}`,
  args: (string | number | bigint | boolean)[],
  publicKeyHex: string,
  signRawHash: SignRawHashFunction
): Promise<string> {
  const sponsorshipAvailable = await isSponsorshipEnabled();
  if (sponsorshipAvailable) {
    try {
      return await sponsoredSubmit(walletAddress, functionId, args, publicKeyHex, signRawHash);
    } catch (error) {
      console.warn('[Solver] Sponsored submission failed, falling back:', error);
    }
  }
  return signAndSubmitWithPrivy(walletAddress, functionId, args, publicKeyHex, signRawHash);
}

// Smart submit with Shinami Gas Station (Native)
async function smartSubmitNative(
  walletAddress: string,
  functionId: `${string}::${string}::${string}`,
  args: (string | number | bigint | boolean)[],
  signTransaction: SignTransactionFunction,
  signAndSubmitTransaction: (payload: unknown) => Promise<{ hash: string }>
): Promise<string> {
  const sponsorshipAvailable = await isSponsorshipEnabled();
  if (sponsorshipAvailable) {
    try {
      return await sponsoredSubmitNative(walletAddress, functionId, args, signTransaction);
    } catch (error) {
      console.warn('[Solver] Sponsored submission failed, falling back:', error);
    }
  }
  return signAndSubmitNative(walletAddress, functionId, args, signAndSubmitTransaction);
}

// Register as a solver
export async function registerSolver(
  walletAddress: string,
  stake: bigint,
  metadataUri: string,
  signRawHash: SignRawHashFunction,
  publicKeyHex: string
): Promise<string> {
  return smartSubmitWithPrivy(
    walletAddress,
    `${VELOX_ADDRESS}::solver_registry::register_and_stake`,
    [VELOX_ADDRESS, metadataUri, stake.toString()],
    publicKeyHex,
    signRawHash
  );
}

export async function registerSolverNative(
  walletAddress: string,
  stake: bigint,
  metadataUri: string,
  signTransaction: SignTransactionFunction,
  signAndSubmitTransaction: (payload: unknown) => Promise<{ hash: string }>
): Promise<string> {
  return smartSubmitNative(
    walletAddress,
    `${VELOX_ADDRESS}::solver_registry::register_and_stake`,
    [VELOX_ADDRESS, metadataUri, stake.toString()],
    signTransaction,
    signAndSubmitTransaction
  );
}

// Add stake
export async function addStake(
  walletAddress: string,
  amount: bigint,
  signRawHash: SignRawHashFunction,
  publicKeyHex: string
): Promise<string> {
  return smartSubmitWithPrivy(
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
  signTransaction: SignTransactionFunction,
  signAndSubmitTransaction: (payload: unknown) => Promise<{ hash: string }>
): Promise<string> {
  return smartSubmitNative(
    walletAddress,
    `${VELOX_ADDRESS}::solver_registry::add_stake`,
    [VELOX_ADDRESS, amount.toString()],
    signTransaction,
    signAndSubmitTransaction
  );
}

// Deactivate solver
export async function deactivateSolver(
  walletAddress: string,
  signRawHash: SignRawHashFunction,
  publicKeyHex: string
): Promise<string> {
  return smartSubmitWithPrivy(
    walletAddress,
    `${VELOX_ADDRESS}::solver_registry::deactivate`,
    [VELOX_ADDRESS],
    publicKeyHex,
    signRawHash
  );
}

export async function deactivateSolverNative(
  walletAddress: string,
  signTransaction: SignTransactionFunction,
  signAndSubmitTransaction: (payload: unknown) => Promise<{ hash: string }>
): Promise<string> {
  return smartSubmitNative(
    walletAddress,
    `${VELOX_ADDRESS}::solver_registry::deactivate`,
    [VELOX_ADDRESS],
    signTransaction,
    signAndSubmitTransaction
  );
}

// Reactivate solver
export async function reactivateSolver(
  walletAddress: string,
  signRawHash: SignRawHashFunction,
  publicKeyHex: string
): Promise<string> {
  return smartSubmitWithPrivy(
    walletAddress,
    `${VELOX_ADDRESS}::solver_registry::reactivate`,
    [VELOX_ADDRESS],
    publicKeyHex,
    signRawHash
  );
}

export async function reactivateSolverNative(
  walletAddress: string,
  signTransaction: SignTransactionFunction,
  signAndSubmitTransaction: (payload: unknown) => Promise<{ hash: string }>
): Promise<string> {
  return smartSubmitNative(
    walletAddress,
    `${VELOX_ADDRESS}::solver_registry::reactivate`,
    [VELOX_ADDRESS],
    signTransaction,
    signAndSubmitTransaction
  );
}
