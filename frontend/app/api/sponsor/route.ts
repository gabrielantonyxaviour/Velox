import { NextRequest, NextResponse } from 'next/server';

// Shinami Gas Station API endpoint for Movement
const SHINAMI_GAS_STATION_URL = 'https://api.shinami.com/movement/gas/v1/';

/**
 * Sponsor and submit a signed transaction
 * Uses gas_sponsorAndSubmitSignedTransaction - the recommended approach
 * This sets the fee payer address and submits in one call
 */
export async function POST(request: NextRequest) {
  try {
    const apiKey = process.env.SHINAMI_KEY;

    if (!apiKey) {
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

    // Format hex strings
    const formattedTxHex = rawTxHex.startsWith('0x') ? rawTxHex : `0x${rawTxHex}`;
    const formattedAuthHex = senderAuthenticatorHex.startsWith('0x')
      ? senderAuthenticatorHex
      : `0x${senderAuthenticatorHex}`;

    // Call Shinami Gas Station API with gas_sponsorAndSubmitSignedTransaction
    // This method sponsors the transaction, sets the fee payer address, and submits it
    const response = await fetch(SHINAMI_GAS_STATION_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': apiKey,
      },
      body: JSON.stringify({
        jsonrpc: '2.0',
        method: 'gas_sponsorAndSubmitSignedTransaction',
        params: [formattedTxHex, formattedAuthHex],
        id: 1,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('[Sponsor API] Shinami error:', response.status, errorText);
      return NextResponse.json(
        { success: false, error: `Shinami API error: ${response.status}` },
        { status: 502 }
      );
    }

    const result = await response.json();

    if (result.error) {
      console.error('[Sponsor API] Shinami RPC error:', result.error);
      return NextResponse.json(
        { success: false, error: result.error.message || 'Sponsorship failed' },
        { status: 400 }
      );
    }

    // Result contains PendingTransactionResponse with hash
    return NextResponse.json({
      success: true,
      hash: result.result.hash,
      pendingTransaction: result.result,
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
