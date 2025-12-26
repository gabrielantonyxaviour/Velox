import { NextRequest, NextResponse } from 'next/server';

// Try hasura first (user's preferred), fallback to old indexer
const INDEXER_URLS = [
  'https://hasura.testnet.movementnetwork.xyz/v1/graphql',
  'https://indexer.testnet.movementnetwork.xyz/v1/graphql',
];
const VELOX_ADDRESS = '0x94d017d8d944702a976af2844bdf3534b946e712cad286610aef5969568ba470';
const TIMEOUT_MS = 45000; // 45 second timeout per indexer (Movement indexer is slow)

async function fetchWithTimeout(url: string, options: RequestInit, timeoutMs: number): Promise<Response> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    clearTimeout(timeout);
    return response;
  } catch (error) {
    clearTimeout(timeout);
    throw error;
  }
}

async function tryIndexers(query: string): Promise<{ data?: { events?: unknown[] }; error?: string }> {
  for (const indexerUrl of INDEXER_URLS) {
    try {
      console.log(`[API] Trying indexer: ${indexerUrl}`);
      const response = await fetchWithTimeout(
        indexerUrl,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ query }),
        },
        TIMEOUT_MS
      );

      const text = await response.text();

      // Check if response is HTML (error page)
      if (text.startsWith('<') || text.startsWith('<!')) {
        console.log(`[API] ${indexerUrl} returned HTML error page, trying next...`);
        continue;
      }

      const data = JSON.parse(text);
      if (data?.data?.events) {
        console.log(`[API] ${indexerUrl} returned ${data.data.events.length} events`);
        return data;
      }

      // If we got a response but no events, might be valid empty result
      if (data?.data) {
        return data;
      }

      console.log(`[API] ${indexerUrl} returned unexpected response, trying next...`);
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Unknown error';
      console.log(`[API] ${indexerUrl} failed: ${errorMsg}, trying next...`);
    }
  }

  // All indexers failed
  return { data: { events: [] }, error: 'All indexers timed out or failed' };
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const eventType = searchParams.get('eventType') || 'IntentCreated';

  // Use _like pattern to match events (more reliable than _eq for event types)
  const query = `{ events(where: {type: {_like: "%${VELOX_ADDRESS}%${eventType}%"}}, limit: 100, order_by: {transaction_version: desc}) { transaction_version data type } }`;

  console.log('[API] Querying for event type:', eventType);

  try {
    const result = await tryIndexers(query);

    if (result.error) {
      console.log('[API] Warning:', result.error);
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error('[API] Error:', error);
    // Return empty events array instead of error to prevent client-side errors
    return NextResponse.json({ data: { events: [] } });
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

    const result = await tryIndexers(query);
    return NextResponse.json(result);
  } catch (error) {
    console.error('[API] POST error:', error);
    return NextResponse.json({ data: { events: [] } });
  }
}
