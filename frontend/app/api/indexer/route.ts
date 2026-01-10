import { NextRequest, NextResponse } from 'next/server';

const INDEXER_URL = 'https://indexer.testnet.movementnetwork.xyz/v1/graphql';
const VELOX_ADDRESS = '0x44acd76127a76012da5efb314c9a47882017c12b924181379ff3b9d17b3cc8fb';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const eventType = searchParams.get('eventType') || 'IntentCreated';

  const query = `{ events(where: {type: {_like: "%${VELOX_ADDRESS}%${eventType}%"}}, limit: 100) { transaction_version data type } }`;

  console.log('[API] Querying indexer with:', query);

  try {
    const response = await fetch(INDEXER_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
    });

    const data = await response.json();
    const eventCount = data?.data?.events?.length || 0;
    console.log('[API] Response event count:', eventCount);

    // Return the GraphQL response directly for simpler parsing
    return NextResponse.json(data);
  } catch (error) {
    console.error('[API] Error:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { query } = body;

    if (!query) {
      return NextResponse.json({ error: 'Query is required' }, { status: 400 });
    }

    console.log('[API] POST query:', query);

    const response = await fetch(INDEXER_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
    });

    const data = await response.json();
    console.log('[API] POST response events count:', data?.data?.events?.length || 0);

    return NextResponse.json(data);
  } catch (error) {
    console.error('[API] POST error:', error);
    return NextResponse.json({
      error: error instanceof Error ? error.message : 'Unknown error',
    }, { status: 500 });
  }
}
