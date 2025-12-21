import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/app/lib/supabase';

// POST /api/transactions/taker - Solvers call this to add taker transaction
// Multiple taker txs can exist per intent (partial fills)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { intent_id, taker_tx_hash, solver_address, fill_amount } = body;

    if (!intent_id || !taker_tx_hash || !solver_address) {
      return NextResponse.json(
        { error: 'Missing required fields: intent_id, taker_tx_hash, solver_address' },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from('velox_taker_transactions')
      .upsert(
        { intent_id, taker_tx_hash, solver_address, fill_amount },
        { onConflict: 'taker_tx_hash' }
      )
      .select()
      .single();

    if (error) {
      console.error('[Taker TX] Insert error:', error);
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('[Taker TX] Error:', error);
    return NextResponse.json(
      { error: 'Failed to store taker transaction' },
      { status: 500 }
    );
  }
}

// GET /api/transactions/taker?intent_id=... - Get all taker txs for an intent
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const intentId = searchParams.get('intent_id');
    const solverAddress = searchParams.get('solver_address');

    let query = supabase.from('velox_taker_transactions').select('*');

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
      console.error('[Taker TX] Query error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ data });
  } catch (error) {
    console.error('[Taker TX] Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch taker transactions' },
      { status: 500 }
    );
  }
}
