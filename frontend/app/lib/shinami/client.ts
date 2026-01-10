/**
 * Shinami Gas Station Client for Velox
 * Provides gasless transaction sponsorship for user intent submissions
 * Uses the recommended flow: Sign first, then sponsor+submit on backend
 *
 * Flow:
 * 1. Build feePayer transaction on frontend (with 0x0 placeholder)
 * 2. User signs the transaction FIRST
 * 3. Send signed tx to backend
 * 4. Backend calls gas_sponsorAndSubmitSignedTransaction (sponsors, sets fee payer, submits)
 */

import {
  AccountAuthenticator,
  AccountAuthenticatorEd25519,
  Ed25519PublicKey,
  Ed25519Signature,
  generateSigningMessageForTransaction,
  SimpleTransaction,
} from '@aptos-labs/ts-sdk';
import { aptos, toHex } from '../aptos';

export interface SignRawHashFunction {
  (params: { address: string; chainType: 'aptos'; hash: `0x${string}` }): Promise<{
    signature: string;
  }>;
}

export interface SponsorAndSubmitResult {
  success: boolean;
  hash?: string;
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
 * Send signed transaction to backend for sponsorship and submission
 * Backend uses gas_sponsorAndSubmitSignedTransaction
 */
async function sponsorAndSubmitSignedTransaction(
  rawTransaction: SimpleTransaction,
  senderAuthenticator: AccountAuthenticator
): Promise<SponsorAndSubmitResult> {
  try {
    // Serialize transaction and authenticator to hex
    const rawTxHex = rawTransaction.bcsToHex().toString();
    const senderAuthenticatorHex = senderAuthenticator.bcsToHex().toString();

    console.log('[Shinami API] Calling /api/sponsor...');
    const response = await fetch('/api/sponsor', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ rawTxHex, senderAuthenticatorHex }),
    });

    console.log('[Shinami API] Response status:', response.status);
    const result = await response.json();
    console.log('[Shinami API] Response body:', JSON.stringify(result, null, 2));

    if (!result.success) {
      console.error('[Shinami API] Response indicates failure:', result.error);
      return {
        success: false,
        error: result.error || 'Sponsorship and submission failed',
      };
    }

    console.log('[Shinami API] Success! Hash:', result.hash);
    return {
      success: true,
      hash: result.hash,
    };
  } catch (error) {
    console.error('[Shinami API] Fetch error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown sponsorship error',
    };
  }
}

/**
 * Custom error class to indicate transaction was submitted but confirmation failed
 * This prevents fallback to user-paid when tx is already on-chain
 */
export class TransactionSubmittedError extends Error {
  constructor(public hash: string, message: string) {
    super(message);
    this.name = 'TransactionSubmittedError';
  }
}

/**
 * Build, sign, sponsor, and submit a transaction with Shinami Gas Station
 * For Privy wallets using signRawHash
 *
 * Follows recommended flow:
 * 1. Build feePayer tx (with 0x0 placeholder)
 * 2. User signs FIRST
 * 3. Backend sponsors and submits
 */
export async function sponsoredSubmit(
  walletAddress: string,
  functionId: `${string}::${string}::${string}`,
  args: (string | number | bigint | boolean)[],
  publicKeyHex: string,
  signRawHash: SignRawHashFunction
): Promise<string> {
  console.log('[Shinami] sponsoredSubmit called for function:', functionId);

  // 1. Build the transaction with fee payer enabled (uses 0x0 placeholder)
  console.log('[Shinami] Step 1: Building transaction with feePayer...');
  const rawTxn = await aptos.transaction.build.simple({
    sender: walletAddress,
    data: {
      function: functionId,
      typeArguments: [],
      functionArguments: args,
    },
    withFeePayer: true,
  });
  console.log('[Shinami] Transaction built successfully');

  // 2. Generate signing message and get user signature FIRST
  console.log('[Shinami] Step 2: Getting user signature via signRawHash...');
  const message = generateSigningMessageForTransaction(rawTxn);
  const { signature: rawSignature } = await signRawHash({
    address: walletAddress,
    chainType: 'aptos',
    hash: `0x${toHex(message)}`,
  });
  console.log('[Shinami] User signature obtained');

  // 3. Create sender authenticator
  console.log('[Shinami] Step 3: Creating sender authenticator...');
  let cleanPublicKey = publicKeyHex.startsWith('0x') ? publicKeyHex.slice(2) : publicKeyHex;
  if (cleanPublicKey.length === 66) {
    cleanPublicKey = cleanPublicKey.slice(2);
  }

  const senderAuthenticator = new AccountAuthenticatorEd25519(
    new Ed25519PublicKey(cleanPublicKey),
    new Ed25519Signature(
      rawSignature.startsWith('0x') ? rawSignature.slice(2) : rawSignature
    )
  );
  console.log('[Shinami] Authenticator created');

  // 4. Send to backend for sponsorship and submission
  console.log('[Shinami] Step 4: Sending to backend for sponsorship...');
  const result = await sponsorAndSubmitSignedTransaction(rawTxn, senderAuthenticator);
  console.log('[Shinami] Backend response:', JSON.stringify(result, null, 2));
  console.log('[Shinami] result.success:', result.success, 'result.hash:', result.hash);

  if (!result.success || !result.hash) {
    // Log what we got back
    console.error('[Shinami] Backend response missing success or hash');
    console.error('[Shinami] Full result:', result);
    console.error('[Shinami] result.error:', result.error);
    throw new Error(result.error || 'Sponsored submission failed');
  }

  console.log('[Shinami] Transaction SUBMITTED to chain! Hash:', result.hash);

  // 5. Wait for transaction confirmation
  // IMPORTANT: At this point, tx IS submitted. If waitForTransaction fails,
  // we must NOT allow fallback to user-paid (would cause double tx)
  console.log('[Shinami] Step 5: Waiting for confirmation...');
  try {
    const executed = await aptos.waitForTransaction({ transactionHash: result.hash });
    if (!executed.success) {
      // Tx was submitted but failed on-chain - throw special error to prevent fallback
      console.error('[Shinami] Tx confirmed but FAILED on-chain');
      throw new TransactionSubmittedError(result.hash, 'Sponsored transaction failed on-chain');
    }
    console.log('[Shinami] Transaction CONFIRMED successfully!');
  } catch (error) {
    if (error instanceof TransactionSubmittedError) {
      throw error;
    }
    // waitForTransaction threw (timeout, network error, etc.) - tx may be pending
    // Throw special error to prevent fallback and return the hash anyway
    console.error('[Shinami] waitForTransaction threw, but tx IS submitted:', error);
    throw new TransactionSubmittedError(result.hash, `Transaction submitted but confirmation failed: ${error}`);
  }

  return result.hash;
}

/**
 * Build, sign, sponsor, and submit a transaction with Shinami Gas Station
 * For native wallets (Nightly, Petra, etc.) using wallet adapter signTransaction
 *
 * Follows recommended flow:
 * 1. Build feePayer tx (with 0x0 placeholder)
 * 2. User signs FIRST via wallet adapter
 * 3. Backend sponsors and submits
 */
export async function sponsoredSubmitNative(
  walletAddress: string,
  functionId: `${string}::${string}::${string}`,
  args: (string | number | bigint | boolean)[],
  signTransaction: (args: { transactionOrPayload: SimpleTransaction; asFeePayer?: boolean }) => Promise<{ authenticator: AccountAuthenticator; rawTransaction: Uint8Array }>
): Promise<string> {
  // 1. Build the transaction with fee payer enabled (uses 0x0 placeholder)
  const rawTxn = await aptos.transaction.build.simple({
    sender: walletAddress,
    data: {
      function: functionId,
      typeArguments: [],
      functionArguments: args,
    },
    withFeePayer: true,
  });

  // 2. Get user signature FIRST via wallet adapter
  const { authenticator: senderAuthenticator } = await signTransaction({ transactionOrPayload: rawTxn });

  // 3. Send to backend for sponsorship and submission
  const result = await sponsorAndSubmitSignedTransaction(rawTxn, senderAuthenticator);

  if (!result.success || !result.hash) {
    // Safe to fall back - transaction was NOT submitted
    throw new Error(result.error || 'Sponsored submission failed');
  }

  // 4. Wait for transaction confirmation
  // IMPORTANT: At this point, tx IS submitted. If waitForTransaction fails,
  // we must NOT allow fallback to user-paid (would cause double tx)
  try {
    const executed = await aptos.waitForTransaction({ transactionHash: result.hash });
    if (!executed.success) {
      throw new TransactionSubmittedError(result.hash, 'Sponsored transaction failed on-chain');
    }
  } catch (error) {
    if (error instanceof TransactionSubmittedError) {
      throw error;
    }
    // waitForTransaction threw (timeout, network error, etc.) - tx may be pending
    throw new TransactionSubmittedError(result.hash, `Transaction submitted but confirmation failed: ${error}`);
  }

  return result.hash;
}
