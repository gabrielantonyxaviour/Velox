-- Create velox_bid_transactions table for storing sealed bid auction bids
CREATE TABLE velox_bid_transactions (
  id SERIAL PRIMARY KEY,
  intent_id TEXT NOT NULL,
  bid_tx_hash TEXT NOT NULL UNIQUE,
  solver_address TEXT NOT NULL,
  bid_amount TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for faster lookups by intent_id
CREATE INDEX idx_velox_bid_transactions_intent_id ON velox_bid_transactions(intent_id);

-- Index for faster lookups by solver_address
CREATE INDEX idx_velox_bid_transactions_solver ON velox_bid_transactions(solver_address);
