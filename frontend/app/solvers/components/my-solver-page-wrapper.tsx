'use client';

import { usePrivy } from '@privy-io/react-auth';
import { useWallet } from '@aptos-labs/wallet-adapter-react';
import { useCreateWallet } from '@privy-io/react-auth/extended-chains';
import { useEffect, useState } from 'react';
import { useWalletContextPrivy } from '@/app/hooks/use-wallet-context-privy';
import { useWalletContextNative } from '@/app/hooks/use-wallet-context-native';
import { WalletContextContext } from '@/app/hooks/use-wallet-context';
import { usePrivyAvailable } from '@/app/providers';
import LoginPage from '@/app/components/LoginPage';
import MySolverPageContent from './my-solver-page-content';
import { Skeleton } from '@/app/components/ui/skeleton';

export default function MySolverPageWrapper() {
  const privyAvailable = usePrivyAvailable();

  if (privyAvailable) {
    return <PrivySolverPage />;
  }

  return <WalletOnlySolverPage />;
}

function PrivySolverPage() {
  const { ready, authenticated, user } = usePrivy();
  const { account, connected } = useWallet();
  const { createWallet } = useCreateWallet();
  const [movementAddress, setMovementAddress] = useState<string>('');
  const [isCreatingWallet, setIsCreatingWallet] = useState(false);

  const walletContext = useWalletContextPrivy();

  useEffect(() => {
    const setupMovementWallet = async () => {
      if (!authenticated || !user || isCreatingWallet) return;

      const moveWallet = user.linkedAccounts?.find(
        (account: any) => account.chainType === 'aptos'
      ) as any;

      if (moveWallet) {
        setMovementAddress(moveWallet.address as string);
      } else {
        setIsCreatingWallet(true);
        try {
          const wallet = await createWallet({ chainType: 'aptos' });
          setMovementAddress((wallet as any).address);
        } catch (error) {
          console.error('Error creating Movement wallet:', error);
        } finally {
          setIsCreatingWallet(false);
        }
      }
    };

    setupMovementWallet();
  }, [authenticated, user, createWallet, isCreatingWallet]);

  useEffect(() => {
    if (connected && account?.address) {
      setMovementAddress(account.address.toString());
    }
  }, [connected, account]);

  if (!ready) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <Skeleton className="h-10 w-10 rounded-full" />
          <Skeleton className="h-4 w-24" />
        </div>
      </div>
    );
  }

  const isWalletConnected = authenticated || connected;

  if (!isWalletConnected) {
    return <LoginPage />;
  }

  return (
    <WalletContextContext.Provider value={walletContext}>
      <MySolverPageContent walletAddress={movementAddress} />
    </WalletContextContext.Provider>
  );
}

function WalletOnlySolverPage() {
  const { account, connected } = useWallet();
  const [movementAddress, setMovementAddress] = useState<string>('');

  const walletContext = useWalletContextNative();

  useEffect(() => {
    if (connected && account?.address) {
      setMovementAddress(account.address.toString());
    }
  }, [connected, account]);

  if (!connected) {
    return <LoginPage />;
  }

  return (
    <WalletContextContext.Provider value={walletContext}>
      <MySolverPageContent walletAddress={movementAddress} />
    </WalletContextContext.Provider>
  );
}
