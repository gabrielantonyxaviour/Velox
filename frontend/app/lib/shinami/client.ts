/**
 * Shinami Gas Station Client for Velox
 * Provides gasless transaction sponsorship for user intent submissions
 * Uses server-side API route to keep SHINAMI_KEY secret
 */

import {
  AccountAuthenticatorEd25519,
  Ed25519PublicKey,
  Ed25519Signature,
  generateSigningMessageForTransaction,
  SimpleTransaction,
  AccountAuthenticator,
  Deserializer,
} from '@aptos-labs/ts-sdk';
import { aptos, toHex } from '../aptos';

export interface SignRawHashFunction {
  (params: { address: string; chainType: 'aptos'; hash: `0x${string}` }): Promise<{
    signature: string;
  }>;
}

export interface SponsorshipResult {
  success: boolean;
  feePayer?: {
    address: string;
    signature: number[];
  };
  error?: string;
}

// Cache for sponsorship availability check
let sponsorshipEnabled: boolean | null = null;

/**
 * Check if Gas Station sponsorship is available (server-side configured)
 */
export async function isSponsorshipEnabled(): Promise<boolean> {
  if (sponsorshipEnabled !== null) {
    return sponsorshipEnabled;
  }

  try {
    const response = await fetch('/api/sponsor');
    const data = await response.json();
    sponsorshipEnabled = data.enabled === true;
    return sponsorshipEnabled;
  } catch {
    sponsorshipEnabled = false;
    return false;
  }
}

/**
 * Request transaction sponsorship via server-side API route
 */
export async function sponsorTransaction(
  rawTransaction: SimpleTransaction
): Promise<SponsorshipResult> {
  try {
    // Serialize the raw transaction to hex
    const rawTxHex = Buffer.from(rawTransaction.bcsToBytes()).toString('hex');

    const response = await fetch('/api/sponsor', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ rawTxHex }),
    });

    const result = await response.json();

    if (!result.success) {
      return {
        success: false,
        error: result.error || 'Sponsorship failed',
      };
    }

    return {
      success: true,
      feePayer: result.feePayer,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown sponsorship error',
    };
  }
}

/**
 * Build, sponsor, sign, and submit a transaction with Shinami Gas Station
 * This is the main function for gasless intent submissions
 */
export async function sponsoredSubmit(
  walletAddress: string,
  functionId: `${string}::${string}::${string}`,
  args: (string | number | bigint | boolean)[],
  publicKeyHex: string,
  signRawHash: SignRawHashFunction
): Promise<string> {
  // 1. Build the transaction with fee payer enabled
  const rawTxn = await aptos.transaction.build.simple({
    sender: walletAddress,
    data: {
      function: functionId,
      typeArguments: [],
      functionArguments: args,
    },
    withFeePayer: true,
  });

  // 2. Request sponsorship from server-side API
  const sponsorship = await sponsorTransaction(rawTxn);

  if (!sponsorship.success || !sponsorship.feePayer) {
    throw new Error(sponsorship.error || 'Failed to get transaction sponsorship');
  }

  // 3. Generate signing message and get user signature
  const message = generateSigningMessageForTransaction(rawTxn);
  const { signature: rawSignature } = await signRawHash({
    address: walletAddress,
    chainType: 'aptos',
    hash: `0x${toHex(message)}`,
  });

  // 4. Create sender authenticator
  let cleanPublicKey = publicKeyHex.startsWith('0x') ? publicKeyHex.slice(2) : publicKeyHex;
  if (cleanPublicKey.length === 66) {
    cleanPublicKey = cleanPublicKey.slice(2);
  }

  const senderAuthenticator = new AccountAuthenticatorEd25519(
    new Ed25519PublicKey(cleanPublicKey),
    new Ed25519Signature(rawSignature.startsWith('0x') ? rawSignature.slice(2) : rawSignature)
  );

  // 5. Create fee payer authenticator from Shinami's signature
  const feePayerSignatureBytes = new Uint8Array(sponsorship.feePayer.signature);
  const feePayerAuthenticator = AccountAuthenticator.deserialize(
    new Deserializer(feePayerSignatureBytes)
  );

  // 6. Submit the sponsored transaction
  const committedTx = await aptos.transaction.submit.simple({
    transaction: rawTxn,
    senderAuthenticator,
    feePayerAuthenticator,
  });

  // 7. Wait for confirmation
  const executed = await aptos.waitForTransaction({ transactionHash: committedTx.hash });
  if (!executed.success) {
    throw new Error('Sponsored transaction failed on-chain');
  }

  return committedTx.hash;
}

/**
 * Sponsored submit for native wallet adapters (Nightly, etc.)
 */
export async function sponsoredSubmitNative(
  walletAddress: string,
  functionId: `${string}::${string}::${string}`,
  args: (string | number | bigint | boolean)[],
  signTransaction: (transaction: SimpleTransaction) => Promise<AccountAuthenticator>
): Promise<string> {
  // 1. Build the transaction with fee payer
  const rawTxn = await aptos.transaction.build.simple({
    sender: walletAddress,
    data: {
      function: functionId,
      typeArguments: [],
      functionArguments: args,
    },
    withFeePayer: true,
  });

  // 2. Request sponsorship from server-side API
  const sponsorship = await sponsorTransaction(rawTxn);

  if (!sponsorship.success || !sponsorship.feePayer) {
    throw new Error(sponsorship.error || 'Failed to get transaction sponsorship');
  }

  // 3. Get user signature via wallet adapter
  const senderAuthenticator = await signTransaction(rawTxn);

  // 4. Create fee payer authenticator from Shinami's signature
  const feePayerSignatureBytes = new Uint8Array(sponsorship.feePayer.signature);
  const feePayerAuthenticator = AccountAuthenticator.deserialize(
    new Deserializer(feePayerSignatureBytes)
  );

  // 5. Submit the sponsored transaction
  const committedTx = await aptos.transaction.submit.simple({
    transaction: rawTxn,
    senderAuthenticator,
    feePayerAuthenticator,
  });

  // 6. Wait for confirmation
  const executed = await aptos.waitForTransaction({ transactionHash: committedTx.hash });
  if (!executed.success) {
    throw new Error('Sponsored transaction failed on-chain');
  }

  return committedTx.hash;
}
