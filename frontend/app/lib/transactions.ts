import {
  AccountAuthenticatorEd25519,
  AccountAuthenticator,
  Ed25519PublicKey,
  Ed25519Signature,
  generateSigningMessageForTransaction,
  SimpleTransaction,
} from '@aptos-labs/ts-sdk';
import { aptos, VELOX_ADDRESS as CONTRACT_ADDRESS, toHex } from './aptos';
import { sponsoredSubmit, sponsoredSubmitNative, isSponsorshipEnabled } from './shinami';

export type CounterAction = 'increment' | 'decrement';

export interface CounterTransaction {
  action: CounterAction;
  amount: number;
}

export interface SignRawHashFunction {
  (params: { address: string; chainType: 'aptos'; hash: `0x${string}` }): Promise<{
    signature: string;
  }>;
}

export type SignTransactionFunction = (args: {
  transactionOrPayload: SimpleTransaction;
  asFeePayer?: boolean;
}) => Promise<{ authenticator: AccountAuthenticator; rawTransaction: Uint8Array }>;

/**
 * Get the contract function name for a counter action
 */
export const getCounterFunction = (action: CounterAction): `${string}::${string}::${string}` => {
  const functionName = action === 'increment' ? 'add_counter' : 'subtract_counter';
  return `${CONTRACT_ADDRESS}::counter::${functionName}` as `${string}::${string}::${string}`;
};

// Fallback: user pays gas (Privy)
const submitCounterTransactionFallback = async (
  action: CounterAction,
  amount: number,
  walletAddress: string,
  publicKeyHex: string,
  signRawHash: SignRawHashFunction
): Promise<string> => {
  const rawTxn = await aptos.transaction.build.simple({
    sender: walletAddress,
    data: {
      function: getCounterFunction(action),
      typeArguments: [],
      functionArguments: [amount],
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

  const committedTransaction = await aptos.transaction.submit.simple({
    transaction: rawTxn,
    senderAuthenticator,
  });

  const executed = await aptos.waitForTransaction({
    transactionHash: committedTransaction.hash,
  });

  if (!executed.success) {
    throw new Error('Transaction failed');
  }

  return committedTransaction.hash;
};

// Fallback: user pays gas (Native)
const submitCounterTransactionNativeFallback = async (
  action: CounterAction,
  amount: number,
  walletAddress: string,
  signAndSubmitTransaction: (payload: unknown) => Promise<{ hash: string }>
): Promise<string> => {
  const response = await signAndSubmitTransaction({
    sender: walletAddress,
    data: {
      function: getCounterFunction(action),
      functionArguments: [amount],
    },
  });

  const executed = await aptos.waitForTransaction({
    transactionHash: response.hash,
  });

  if (!executed.success) {
    throw new Error('Transaction failed');
  }

  return response.hash;
};

/**
 * Build and submit a single counter transaction with Shinami Gas Station
 */
export const submitCounterTransaction = async (
  action: CounterAction,
  amount: number,
  walletAddress: string,
  publicKeyHex: string,
  signRawHash: SignRawHashFunction
): Promise<string> => {
  try {
    console.log(`[Counter] Starting ${action} transaction`);

    const sponsorshipAvailable = await isSponsorshipEnabled();
    if (sponsorshipAvailable) {
      try {
        console.log('[Counter] Using Shinami Gas Station (Privy)');
        return await sponsoredSubmit(
          walletAddress,
          getCounterFunction(action),
          [amount],
          publicKeyHex,
          signRawHash
        );
      } catch (error) {
        console.warn('[Counter] Sponsored submission failed, falling back:', error);
      }
    }

    console.log('[Counter] Using user-paid gas (Privy)');
    return submitCounterTransactionFallback(action, amount, walletAddress, publicKeyHex, signRawHash);
  } catch (error) {
    console.error(`Error submitting ${action} transaction:`, error);
    throw error;
  }
};

/**
 * Submit counter transaction using native wallet adapter with Shinami Gas Station
 */
export const submitCounterTransactionNative = async (
  action: CounterAction,
  amount: number,
  walletAddress: string,
  signTransaction: SignTransactionFunction,
  signAndSubmitTransaction: (payload: unknown) => Promise<{ hash: string }>
): Promise<string> => {
  try {
    console.log(`[Counter] Starting ${action} transaction (Native)`);

    const sponsorshipAvailable = await isSponsorshipEnabled();
    if (sponsorshipAvailable) {
      try {
        console.log('[Counter] Using Shinami Gas Station (Native)');
        return await sponsoredSubmitNative(
          walletAddress,
          getCounterFunction(action),
          [amount],
          signTransaction
        );
      } catch (error) {
        console.warn('[Counter] Sponsored submission failed, falling back:', error);
      }
    }

    console.log('[Counter] Using user-paid gas (Native)');
    return submitCounterTransactionNativeFallback(action, amount, walletAddress, signAndSubmitTransaction);
  } catch (error) {
    console.error(`Error submitting ${action} transaction with native wallet:`, error);
    throw error;
  }
};

/**
 * Fetch current counter value from blockchain
 */
export const fetchCounterValue = async (address: string): Promise<number | null> => {
  try {
    const result = await aptos.view({
      payload: {
        function: `${CONTRACT_ADDRESS}::counter::get_counter`,
        typeArguments: [],
        functionArguments: [address],
      },
    });

    return Number(result[0]);
  } catch (error) {
    console.error('Error fetching counter value:', error);
    return null;
  }
};
