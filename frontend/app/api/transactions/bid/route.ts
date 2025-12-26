import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/app/lib/supabase';

// POST /api/transactions/bid - Solvers call this to record bid transaction
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { intent_id, bid_tx_hash, solver_address, bid_amount } = body;

    if (!intent_id || !bid_tx_hash || !solver_address) {
      return NextResponse.json(
        { error: 'Missing required fields: intent_id, bid_tx_hash, solver_address' },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from('velox_bid_transactions')
      .upsert(
        {
          intent_id,
          bid_tx_hash,
          solver_address,
          bid_amount: bid_amount?.toString()
        },
        { onConflict: 'bid_tx_hash' }
      )
      .select()
      .single();

    if (error) {
      console.error('[Bid TX] Insert error:', error);
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    console.log(`[Bid TX] Recorded bid for intent ${intent_id}: ${bid_tx_hash}`);
    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('[Bid TX] Error:', error);
    return NextResponse.json(
      { error: 'Failed to store bid transaction' },
      { status: 500 }
    );
  }
}

// GET /api/transactions/bid?intent_id=... - Get all bids for an intent
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const intentId = searchParams.get('intent_id');
    const solverAddress = searchParams.get('solver_address');

    let query = supabase.from('velox_bid_transactions').select('*');

    if (intentId) {
      query = query.eq('intent_id', intentId);
    } else if (solverAddress) {
      query = query.eq('solver_address', solverAddress);
    } else {
      return NextResponse.json(
        { error: 'Provide intent_id or solver_address query param' },
        { status: 400 }
      );
    }

    const { data, error } = await query.order('created_at', { ascending: true });

    if (error) {
      console.error('[Bid TX] Query error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ data });
  } catch (error) {
    console.error('[Bid TX] Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch bid transactions' },
      { status: 500 }
    );
  }
}
