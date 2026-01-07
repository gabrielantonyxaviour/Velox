'use client';

import { usePrivy } from '@privy-io/react-auth';
import { useSignRawHash } from '@privy-io/react-auth/extended-chains';
import { useWallet } from '@aptos-labs/wallet-adapter-react';
import { useMemo } from 'react';
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

export function useWalletContextPrivy(): WalletContext {
  const { ready, authenticated, user } = usePrivy();
  const { signRawHash: privySignRawHash } = useSignRawHash();
  const { account, connected, signAndSubmitTransaction: nativeSignAndSubmit } = useWallet();

  return useMemo(() => {
    const privyWallet = user?.linkedAccounts?.find(
      (acc: any) => acc.chainType === 'aptos'
    ) as any;

    const isPrivyConnected = authenticated && !!privyWallet;
    const isNativeConnected = connected && !!account?.address;
    const isPrivy = isPrivyConnected;
    const walletAddress = isPrivyConnected
      ? privyWallet?.address
      : isNativeConnected
      ? account?.address.toString()
      : null;

    let publicKeyHex: string | null = null;
    if (isPrivy && privyWallet?.publicKey) {
      const keyHex = privyWallet.publicKey;
      publicKeyHex = keyHex.startsWith('0x') ? keyHex : `0x${keyHex}`;
    }

    return {
      walletAddress,
      isPrivy,
      isConnected: isPrivyConnected || isNativeConnected,
      isReady: ready,
      signRawHash: isPrivy ? (privySignRawHash as SignRawHashFunction) : null,
      publicKeyHex,
      signAndSubmitTransaction: !isPrivy && isNativeConnected
        ? (nativeSignAndSubmit as (payload: unknown) => Promise<{ hash: string }>)
        : null,
    };
  }, [ready, authenticated, user, connected, account, privySignRawHash, nativeSignAndSubmit]);
}
