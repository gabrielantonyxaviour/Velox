/**
 * Shinami Gas Station Client for Velox
 * Provides gasless transaction sponsorship for user intent submissions
 */

import {
  AccountAuthenticatorEd25519,
  Ed25519PublicKey,
  Ed25519Signature,
  generateSigningMessageForTransaction,
  SimpleTransaction,
  AccountAuthenticator,
} from '@aptos-labs/ts-sdk';
import { aptos, toHex } from '../aptos';

// Shinami Gas Station API endpoint for Movement
const SHINAMI_GAS_STATION_URL = 'https://api.shinami.com/movement/gas/v1/';

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

/**
 * Get Shinami API key from environment
 */
function getShinamiKey(): string {
  const key = process.env.SHINAMI_KEY;
  if (!key) {
    throw new Error('SHINAMI_KEY not configured');
  }
  return key;
}

/**
 * Check if Gas Station sponsorship is available
 */
export function isSponsorshipEnabled(): boolean {
  return !!process.env.SHINAMI_KEY;
}

/**
 * Request transaction sponsorship from Shinami Gas Station
 */
export async function sponsorTransaction(
  rawTransaction: SimpleTransaction
): Promise<SponsorshipResult> {
  try {
    const apiKey = getShinamiKey();

    // Serialize the raw transaction to hex
    const rawTxHex = Buffer.from(rawTransaction.bcsToBytes()).toString('hex');

    const response = await fetch(SHINAMI_GAS_STATION_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': apiKey,
      },
      body: JSON.stringify({
        jsonrpc: '2.0',
        method: 'gas_sponsorTransaction',
        params: [`0x${rawTxHex}`],
        id: 1,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return {
        success: false,
        error: `Shinami API error: ${response.status} - ${errorText}`,
      };
    }

    const result = await response.json();

    if (result.error) {
      return {
        success: false,
        error: result.error.message || 'Sponsorship failed',
      };
    }

    return {
      success: true,
      feePayer: result.result.feePayer,
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
  // 1. Build the transaction
  const rawTxn = await aptos.transaction.build.simple({
    sender: walletAddress,
    data: {
      function: functionId,
      typeArguments: [],
      functionArguments: args,
    },
    withFeePayer: true, // Enable fee payer for sponsorship
  });

  // 2. Request sponsorship from Shinami
  const sponsorship = await sponsorTransaction(rawTxn);

  if (!sponsorship.success || !sponsorship.feePayer) {
    throw new Error(sponsorship.error || 'Failed to get transaction sponsorship');
  }

  // 3. Update transaction with fee payer address
  // The fee payer address is returned by Shinami after sponsorship

  // 4. Generate signing message and get user signature
  const message = generateSigningMessageForTransaction(rawTxn);
  const { signature: rawSignature } = await signRawHash({
    address: walletAddress,
    chainType: 'aptos',
    hash: `0x${toHex(message)}`,
  });

  // 5. Create sender authenticator
  let cleanPublicKey = publicKeyHex.startsWith('0x') ? publicKeyHex.slice(2) : publicKeyHex;
  if (cleanPublicKey.length === 66) {
    cleanPublicKey = cleanPublicKey.slice(2);
  }

  const senderAuthenticator = new AccountAuthenticatorEd25519(
    new Ed25519PublicKey(cleanPublicKey),
    new Ed25519Signature(rawSignature.startsWith('0x') ? rawSignature.slice(2) : rawSignature)
  );

  // 6. Create fee payer authenticator from Shinami's signature
  const feePayerSignatureBytes = new Uint8Array(sponsorship.feePayer.signature);
  const feePayerAuthenticator = AccountAuthenticator.deserialize(
    new (await import('@aptos-labs/ts-sdk')).Deserializer(feePayerSignatureBytes)
  );

  // 7. Submit the sponsored transaction
  const committedTx = await aptos.transaction.submit.simple({
    transaction: rawTxn,
    senderAuthenticator,
    feePayerAuthenticator,
  });

  // 8. Wait for confirmation
  const executed = await aptos.waitForTransaction({ transactionHash: committedTx.hash });
  if (!executed.success) {
    throw new Error('Sponsored transaction failed on-chain');
  }

  return committedTx.hash;
}

/**
 * Sponsored submit for native wallet adapters (Nightly, etc.)
 * Uses a different signing flow
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

  // 2. Request sponsorship from Shinami
  const sponsorship = await sponsorTransaction(rawTxn);

  if (!sponsorship.success || !sponsorship.feePayer) {
    throw new Error(sponsorship.error || 'Failed to get transaction sponsorship');
  }

  // 3. Get user signature via wallet adapter
  const senderAuthenticator = await signTransaction(rawTxn);

  // 4. Create fee payer authenticator from Shinami's signature
  const feePayerSignatureBytes = new Uint8Array(sponsorship.feePayer.signature);
  const feePayerAuthenticator = AccountAuthenticator.deserialize(
    new (await import('@aptos-labs/ts-sdk')).Deserializer(feePayerSignatureBytes)
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
