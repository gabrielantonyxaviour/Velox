'use client';

import { PrivyProvider } from '@privy-io/react-auth';
import { WalletProvider } from '@/app/components/wallet-provider';
import { Toaster } from '@/app/components/ui/sonner';
import { createContext, useContext, ReactNode } from 'react';

// Get Privy App ID from environment
const PRIVY_APP_ID = process.env.NEXT_PUBLIC_PRIVY_APP_ID;
export const isPrivyConfigured = !!(PRIVY_APP_ID && PRIVY_APP_ID !== 'YOUR_PRIVY_APP_ID');

// Context to track if Privy is available
const PrivyAvailableContext = createContext<boolean>(false);
export const usePrivyAvailable = () => useContext(PrivyAvailableContext);

// Mock Privy context for when Privy is not configured
interface MockPrivyContextType {
  ready: boolean;
  authenticated: boolean;
  user: null;
  login: () => void;
  logout: () => Promise<void>;
}

const MockPrivyContext = createContext<MockPrivyContextType>({
  ready: true,
  authenticated: false,
  user: null,
  login: () => {},
  logout: async () => {},
});

export const useMockPrivy = () => useContext(MockPrivyContext);

// Mock createWallet context
interface MockCreateWalletContextType {
  createWallet: () => Promise<null>;
}

const MockCreateWalletContext = createContext<MockCreateWalletContextType>({
  createWallet: async () => null,
});

export const useMockCreateWallet = () => useContext(MockCreateWalletContext);

export function Providers({ children }: { children: ReactNode }) {
  // If no Privy App ID is configured, render without PrivyProvider
  if (!isPrivyConfigured) {
    return (
      <PrivyAvailableContext.Provider value={false}>
        <MockPrivyContext.Provider value={{
          ready: true,
          authenticated: false,
          user: null,
          login: () => console.warn('Privy not configured'),
          logout: async () => {},
        }}>
          <MockCreateWalletContext.Provider value={{ createWallet: async () => null }}>
            <WalletProvider>
              {children}
              <Toaster />
            </WalletProvider>
          </MockCreateWalletContext.Provider>
        </MockPrivyContext.Provider>
      </PrivyAvailableContext.Provider>
    );
  }

  return (
    <PrivyAvailableContext.Provider value={true}>
      <WalletProvider>
        <PrivyProvider
          appId={PRIVY_APP_ID!}
          config={{
            loginMethods: ['email', 'google', 'twitter', 'discord', 'github'],
          }}
        >
          {children}
          <Toaster />
        </PrivyProvider>
      </WalletProvider>
    </PrivyAvailableContext.Provider>
  );
}
