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
    console.log('[Sponsor API] Calling Shinami API...');
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

    console.log('[Sponsor API] Shinami response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('[Sponsor API] Shinami HTTP error:', response.status, errorText);
      return NextResponse.json(
        { success: false, error: `Shinami API error: ${response.status}` },
        { status: 502 }
      );
    }

    const result = await response.json();
    console.log('[Sponsor API] Shinami raw result:', JSON.stringify(result, null, 2));

    if (result.error) {
      console.error('[Sponsor API] Shinami RPC error:', result.error);
      return NextResponse.json(
        { success: false, error: result.error.message || 'Sponsorship failed' },
        { status: 400 }
      );
    }

    // Try different paths to find the transaction hash
    // Shinami might return it in different locations depending on the response format
    const txHash =
      result.result?.hash ||           // Standard: result.result.hash
      result.hash ||                   // Direct: result.hash
      result.result?.transaction_hash || // Alternative: result.result.transaction_hash
      result.transaction_hash ||       // Alternative: result.transaction_hash
      (typeof result.result === 'string' ? result.result : null); // Sometimes just the hash as string

    console.log('[Sponsor API] Extracted transaction hash:', txHash);
    console.log('[Sponsor API] result.result type:', typeof result.result);
    console.log('[Sponsor API] result.result value:', result.result);

    if (!txHash) {
      console.error('[Sponsor API] Could not find hash in result. Full response:', JSON.stringify(result, null, 2));
      // Return the full Shinami response for debugging
      return NextResponse.json(
        {
          success: false,
          error: 'No transaction hash in response',
          debug_shinami_response: result  // Include full response for debugging
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      hash: txHash,
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
