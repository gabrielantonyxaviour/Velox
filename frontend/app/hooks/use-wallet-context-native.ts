'use client';

import { useWallet } from '@aptos-labs/wallet-adapter-react';
import { useMemo } from 'react';

export interface WalletContext {
  walletAddress: string | null;
  isPrivy: boolean;
  isConnected: boolean;
  isReady: boolean;
  signRawHash: null;
  publicKeyHex: null;
  signAndSubmitTransaction: ((payload: unknown) => Promise<{ hash: string }>) | null;
}

export function useWalletContextNative(): WalletContext {
  const { account, connected, signAndSubmitTransaction: nativeSignAndSubmit } = useWallet();

  return useMemo(() => {
    const isNativeConnected = connected && !!account?.address;
    const walletAddress = isNativeConnected ? account?.address.toString() : null;

    return {
      walletAddress,
      isPrivy: false,
      isConnected: isNativeConnected,
      isReady: true,
      signRawHash: null,
      publicKeyHex: null,
      signAndSubmitTransaction: isNativeConnected
        ? (nativeSignAndSubmit as (payload: unknown) => Promise<{ hash: string }>)
        : null,
    };
  }, [connected, account, nativeSignAndSubmit]);
}
