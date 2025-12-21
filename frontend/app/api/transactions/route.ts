import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/app/lib/supabase';
import { IntentTransactions } from '@/types/supabase';

// GET /api/transactions?intent_ids=1,2,3 - Fetch all txs for multiple intents
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const intentIdsParam = searchParams.get('intent_ids');
    const userAddress = searchParams.get('user_address');

    if (!intentIdsParam && !userAddress) {
      return NextResponse.json(
        { error: 'Provide intent_ids (comma-separated) or user_address' },
        { status: 400 }
      );
    }

    let intentIds: string[] = [];

    if (intentIdsParam) {
      intentIds = intentIdsParam.split(',').map(id => id.trim());
    }

    // If user_address provided, first fetch all their maker txs to get intent_ids
    if (userAddress && !intentIdsParam) {
      const { data: makerData } = await supabase
        .from('velox_maker_transactions')
        .select('intent_id')
        .eq('user_address', userAddress);

      if (makerData) {
        intentIds = makerData.map(m => m.intent_id);
      }
    }

    if (intentIds.length === 0) {
      return NextResponse.json({ data: [] });
    }

    // Fetch maker and taker transactions in parallel
    const [makerResult, takerResult] = await Promise.all([
      supabase
        .from('velox_maker_transactions')
        .select('*')
        .in('intent_id', intentIds),
      supabase
        .from('velox_taker_transactions')
        .select('*')
        .in('intent_id', intentIds)
        .order('created_at', { ascending: true }),
    ]);

    if (makerResult.error) {
      console.error('[Transactions] Maker query error:', makerResult.error);
    }
    if (takerResult.error) {
      console.error('[Transactions] Taker query error:', takerResult.error);
    }

    // Group by intent_id
    const makerByIntent = new Map(
      (makerResult.data || []).map(m => [m.intent_id, m])
    );
    const takersByIntent = new Map<string, typeof takerResult.data>();
    for (const t of (takerResult.data || [])) {
      const existing = takersByIntent.get(t.intent_id) || [];
      existing.push(t);
      takersByIntent.set(t.intent_id, existing);
    }

    // Build response
    const transactions: IntentTransactions[] = intentIds.map(intentId => ({
      intentId,
      makerTx: makerByIntent.get(intentId),
      takerTxs: takersByIntent.get(intentId) || [],
    }));

    return NextResponse.json({ data: transactions });
  } catch (error) {
    console.error('[Transactions] Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch transactions' },
      { status: 500 }
    );
  }
}
