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
    // Log whether key is configured (without exposing the actual key)
    const keyExists = !!process.env.SHINAMI_KEY;
    const keyLength = process.env.SHINAMI_KEY?.length || 0;
    console.log('[Sponsor API] SHINAMI_KEY exists:', keyExists, 'length:', keyLength);

    const client = getGasClient();

    if (!client) {
      console.error('[Sponsor API] GasStationClient is null - SHINAMI_KEY not configured');
      return NextResponse.json(
        { success: false, error: 'Shinami not configured - check SHINAMI_KEY env var' },
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
    // Log full error details for debugging
    if (error instanceof Error) {
      console.error('[Sponsor API] Error name:', error.name);
      console.error('[Sponsor API] Error message:', error.message);
      console.error('[Sponsor API] Error stack:', error.stack);
    }
    // Check if it's a Shinami API error with more details
    const errorDetails = error && typeof error === 'object' ? JSON.stringify(error, null, 2) : String(error);
    console.error('[Sponsor API] Full error object:', errorDetails);

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        debug: process.env.NODE_ENV === 'development' ? errorDetails : undefined
      },
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
