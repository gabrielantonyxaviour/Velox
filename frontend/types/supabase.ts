// Database types for Velox Supabase tables
// These types match the velox_maker_transactions and velox_taker_transactions tables

export interface VeloxMakerTransaction {
  id?: number;
  intent_id: string;
  maker_tx_hash: string;
  user_address: string;
  created_at?: string;
}

export interface VeloxTakerTransaction {
  id?: number;
  intent_id: string;
  taker_tx_hash: string;
  solver_address: string;
  fill_amount?: string;
  created_at?: string;
}

export interface IntentTransactions {
  intentId: string;
  makerTx?: VeloxMakerTransaction;
  takerTxs: VeloxTakerTransaction[];
}
