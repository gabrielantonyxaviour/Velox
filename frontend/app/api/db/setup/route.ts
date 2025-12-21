import { NextResponse } from 'next/server';
import { supabase } from '@/app/lib/supabase';

// POST /api/db/setup - Creates the tables if they don't exist
export async function POST() {
  try {
    // Create velox_maker_transactions table
    const { error: makerError } = await supabase.rpc('exec_sql', {
      sql: `
        CREATE TABLE IF NOT EXISTS velox_maker_transactions (
          id BIGSERIAL PRIMARY KEY,
          intent_id TEXT NOT NULL UNIQUE,
          maker_tx_hash TEXT NOT NULL,
          user_address TEXT NOT NULL,
          created_at TIMESTAMPTZ DEFAULT NOW()
        );
        CREATE INDEX IF NOT EXISTS idx_velox_maker_intent_id ON velox_maker_transactions(intent_id);
        CREATE INDEX IF NOT EXISTS idx_velox_maker_user_address ON velox_maker_transactions(user_address);
      `
    });

    if (makerError) {
      // Table might already exist, try a simple select to verify
      const { error: selectError } = await supabase
        .from('velox_maker_transactions')
        .select('id')
        .limit(1);

      if (selectError && !selectError.message.includes('does not exist')) {
        console.log('[DB Setup] Maker table exists or error:', selectError.message);
      }
    }

    // Create velox_taker_transactions table
    const { error: takerError } = await supabase.rpc('exec_sql', {
      sql: `
        CREATE TABLE IF NOT EXISTS velox_taker_transactions (
          id BIGSERIAL PRIMARY KEY,
          intent_id TEXT NOT NULL,
          taker_tx_hash TEXT NOT NULL UNIQUE,
          solver_address TEXT NOT NULL,
          fill_amount TEXT,
          created_at TIMESTAMPTZ DEFAULT NOW()
        );
        CREATE INDEX IF NOT EXISTS idx_velox_taker_intent_id ON velox_taker_transactions(intent_id);
        CREATE INDEX IF NOT EXISTS idx_velox_taker_solver_address ON velox_taker_transactions(solver_address);
      `
    });

    if (takerError) {
      const { error: selectError } = await supabase
        .from('velox_taker_transactions')
        .select('id')
        .limit(1);

      if (selectError && !selectError.message.includes('does not exist')) {
        console.log('[DB Setup] Taker table exists or error:', selectError.message);
      }
    }

    // Verify tables exist by doing a simple query
    const [makerCheck, takerCheck] = await Promise.all([
      supabase.from('velox_maker_transactions').select('id').limit(1),
      supabase.from('velox_taker_transactions').select('id').limit(1),
    ]);

    const makerExists = !makerCheck.error;
    const takerExists = !takerCheck.error;

    return NextResponse.json({
      success: true,
      tables: {
        velox_maker_transactions: makerExists ? 'ready' : 'needs_manual_creation',
        velox_taker_transactions: takerExists ? 'ready' : 'needs_manual_creation',
      },
      message: makerExists && takerExists
        ? 'All tables are ready'
        : 'Some tables need to be created manually in Supabase dashboard',
    });
  } catch (error) {
    console.error('[DB Setup] Error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to setup database' },
      { status: 500 }
    );
  }
}

// GET /api/db/setup - Check table status
export async function GET() {
  try {
    const [makerCheck, takerCheck] = await Promise.all([
      supabase.from('velox_maker_transactions').select('id').limit(1),
      supabase.from('velox_taker_transactions').select('id').limit(1),
    ]);

    return NextResponse.json({
      tables: {
        velox_maker_transactions: !makerCheck.error ? 'ready' : 'missing',
        velox_taker_transactions: !takerCheck.error ? 'ready' : 'missing',
      },
      errors: {
        maker: makerCheck.error?.message,
        taker: takerCheck.error?.message,
      },
    });
  } catch (error) {
    console.error('[DB Setup] Check error:', error);
    return NextResponse.json(
      { error: 'Failed to check database status' },
      { status: 500 }
    );
  }
}
