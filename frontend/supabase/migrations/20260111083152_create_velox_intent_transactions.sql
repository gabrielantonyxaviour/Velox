-- Migration: Create velox_maker_transactions and velox_taker_transactions tables
-- These tables store transaction hashes for intents (off-chain tracking)

-- Table for maker transactions (one per intent)
CREATE TABLE velox_maker_transactions (
  id BIGSERIAL PRIMARY KEY,
  intent_id TEXT NOT NULL UNIQUE,
  maker_tx_hash TEXT NOT NULL,
  user_address TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Table for taker transactions (multiple per intent for partial fills)
CREATE TABLE velox_taker_transactions (
  id BIGSERIAL PRIMARY KEY,
  intent_id TEXT NOT NULL,
  taker_tx_hash TEXT NOT NULL UNIQUE,
  solver_address TEXT NOT NULL,
  fill_amount TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for faster lookups
CREATE INDEX idx_velox_maker_intent_id ON velox_maker_transactions(intent_id);
CREATE INDEX idx_velox_maker_user_address ON velox_maker_transactions(user_address);
CREATE INDEX idx_velox_taker_intent_id ON velox_taker_transactions(intent_id);
CREATE INDEX idx_velox_taker_solver_address ON velox_taker_transactions(solver_address);

-- Disable RLS (using service role key)
ALTER TABLE velox_maker_transactions DISABLE ROW LEVEL SECURITY;
ALTER TABLE velox_taker_transactions DISABLE ROW LEVEL SECURITY;
