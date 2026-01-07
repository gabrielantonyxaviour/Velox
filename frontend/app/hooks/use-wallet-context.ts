'use client';

import { createContext, useContext } from 'react';
import { SignRawHashFunction } from '@/app/lib/velox/transactions';

export interface WalletContext {
  walletAddress: string | null;
  isPrivy: boolean;
  isConnected: boolean;
  isReady: boolean;
  signRawHash: SignRawHashFunction | null;
  publicKeyHex: string | null;
  signAndSubmitTransaction: ((payload: unknown) => Promise<{ hash: string }>) | null;
}

const defaultWalletContext: WalletContext = {
  walletAddress: null,
  isPrivy: false,
  isConnected: false,
  isReady: false,
  signRawHash: null,
  publicKeyHex: null,
  signAndSubmitTransaction: null,
};

// Create a context that can be provided by parent components
export const WalletContextContext = createContext<WalletContext>(defaultWalletContext);

// Hook to consume the wallet context
export function useWalletContext(): WalletContext {
  return useContext(WalletContextContext);
}

// Re-export the type for convenience
export type { SignRawHashFunction };
