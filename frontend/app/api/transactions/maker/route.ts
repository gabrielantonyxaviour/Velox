import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/app/lib/supabase';

// POST /api/transactions/maker - Store maker transaction when intent is created
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { intent_id, maker_tx_hash, user_address } = body;

    if (!intent_id || !maker_tx_hash || !user_address) {
      return NextResponse.json(
        { error: 'Missing required fields: intent_id, maker_tx_hash, user_address' },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from('velox_maker_transactions')
      .upsert(
        { intent_id, maker_tx_hash, user_address },
        { onConflict: 'intent_id' }
      )
      .select()
      .single();

    if (error) {
      console.error('[Maker TX] Insert error:', error);
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('[Maker TX] Error:', error);
    return NextResponse.json(
      { error: 'Failed to store maker transaction' },
      { status: 500 }
    );
  }
}

// GET /api/transactions/maker?user_address=... - Get all maker txs for a user
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const userAddress = searchParams.get('user_address');
    const intentId = searchParams.get('intent_id');

    let query = supabase.from('velox_maker_transactions').select('*');

    if (intentId) {
      query = query.eq('intent_id', intentId);
    } else if (userAddress) {
      query = query.eq('user_address', userAddress);
    } else {
      return NextResponse.json(
        { error: 'Provide user_address or intent_id query param' },
        { status: 400 }
      );
    }

    const { data, error } = await query.order('created_at', { ascending: false });

    if (error) {
      console.error('[Maker TX] Query error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ data });
  } catch (error) {
    console.error('[Maker TX] Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch maker transactions' },
      { status: 500 }
    );
  }
}
