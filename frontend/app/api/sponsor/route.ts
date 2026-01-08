import { NextRequest, NextResponse } from 'next/server';

// Shinami Gas Station API endpoint for Movement
const SHINAMI_GAS_STATION_URL = 'https://api.shinami.com/movement/gas/v1/';

export async function POST(request: NextRequest) {
  try {
    const apiKey = process.env.SHINAMI_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { success: false, error: 'Shinami not configured' },
        { status: 503 }
      );
    }

    const { rawTxHex } = await request.json();

    if (!rawTxHex) {
      return NextResponse.json(
        { success: false, error: 'Missing rawTxHex' },
        { status: 400 }
      );
    }

    // Call Shinami Gas Station API
    const response = await fetch(SHINAMI_GAS_STATION_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': apiKey,
      },
      body: JSON.stringify({
        jsonrpc: '2.0',
        method: 'gas_sponsorTransaction',
        params: [rawTxHex.startsWith('0x') ? rawTxHex : `0x${rawTxHex}`],
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

    return NextResponse.json({
      success: true,
      feePayer: result.result.feePayer,
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
