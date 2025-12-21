import { createClient } from '@supabase/supabase-js';

// Server-side only - use in API routes only
const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_KEY!;

export const supabase = createClient(supabaseUrl, supabaseKey);

// Re-export types from centralized location
export type {
  VeloxMakerTransaction,
  VeloxTakerTransaction,
  IntentTransactions,
} from '@/types/supabase';
