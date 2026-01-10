import { NextRequest, NextResponse } from 'next/server';
import { GasStationClient } from '@shinami/clients/aptos';
import {
  AccountAuthenticator,
  SimpleTransaction,
  Deserializer,
  Hex,
} from '@aptos-labs/ts-sdk';

// Lazy-initialized Gas Station client
let gasClient: GasStationClient | null = null;

function getGasClient(): GasStationClient | null {
  if (gasClient) return gasClient;

  const apiKey = process.env.SHINAMI_KEY;
  if (!apiKey) return null;

  gasClient = new GasStationClient(apiKey);
  return gasClient;
}

/**
 * Sponsor and submit a signed transaction using Shinami SDK
 */
export async function POST(request: NextRequest) {
  try {
    const client = getGasClient();

    if (!client) {
      return NextResponse.json(
        { success: false, error: 'Shinami not configured' },
        { status: 503 }
      );
    }

    const { rawTxHex, senderAuthenticatorHex } = await request.json();

    if (!rawTxHex || !senderAuthenticatorHex) {
      return NextResponse.json(
        { success: false, error: 'Missing rawTxHex or senderAuthenticatorHex' },
        { status: 400 }
      );
    }

    // Deserialize the transaction and authenticator
    const formattedTxHex = rawTxHex.startsWith('0x') ? rawTxHex : `0x${rawTxHex}`;
    const formattedAuthHex = senderAuthenticatorHex.startsWith('0x')
      ? senderAuthenticatorHex
      : `0x${senderAuthenticatorHex}`;

    const simpleTx = SimpleTransaction.deserialize(
      new Deserializer(Hex.fromHexString(formattedTxHex).toUint8Array())
    );
    const senderAuth = AccountAuthenticator.deserialize(
      new Deserializer(Hex.fromHexString(formattedAuthHex).toUint8Array())
    );

    console.log('[Sponsor API] Calling Shinami SDK sponsorAndSubmitSignedTransaction...');

    // Use Shinami SDK - returns PendingTransactionResponse directly
    const pendingTransaction = await client.sponsorAndSubmitSignedTransaction(
      simpleTx,
      senderAuth
    );

    console.log('[Sponsor API] Success! Hash:', pendingTransaction.hash);

    return NextResponse.json({
      success: true,
      hash: pendingTransaction.hash,
      pendingTransaction,
    });
  } catch (error) {
    console.error('[Sponsor API] Error:', error);
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

// Health check - also indicates if sponsorship is available
export async function GET() {
  const isConfigured = !!process.env.SHINAMI_KEY;
  return NextResponse.json({
    enabled: isConfigured,
    service: 'Shinami Gas Station'
  });
}
