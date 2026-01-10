'use client';

import { usePrivy } from '@privy-io/react-auth';
import { useWallet } from '@aptos-labs/wallet-adapter-react';
import { useCreateWallet } from '@privy-io/react-auth/extended-chains';
import { useEffect, useState, useCallback } from 'react';
import LoginPage from '../LoginPage';
import { Header } from '../layout/header';
import { Footer } from '../layout/footer';
import { IntentTabs } from '../intent/intent-tabs';
import { ActiveIntents } from '../intent/active-intents';
import { IntentHistory } from '../intent/intent-history';
import { useUserIntents } from '../../hooks/use-user-intents';
import { useWalletContextPrivy } from '../../hooks/use-wallet-context-privy';
import { WalletContextContext } from '../../hooks/use-wallet-context';
import { cancelIntent, cancelIntentNative } from '../../lib/velox/transactions';
import { showTxSuccess, showError } from '../../lib/toast';
import { Skeleton } from '../ui/skeleton';
import { normalizeAddress } from '../../lib/utils';

export default function PrivyHome() {
  const { ready, authenticated, user } = usePrivy();
  const { account, connected } = useWallet();
  const { createWallet } = useCreateWallet();
  const [movementAddress, setMovementAddress] = useState<string>('');
  const [isCreatingWallet, setIsCreatingWallet] = useState(false);
  const [cancellingId, setCancellingId] = useState<bigint | null>(null);

  const walletContext = useWalletContextPrivy();
  const { intents, loading: intentsLoading, refetch } = useUserIntents(movementAddress);

  const handleIntentSuccess = useCallback((txHash: string) => {
    showTxSuccess('Intent submitted successfully!', txHash);
    // Refetch with a slight delay to allow chain to finalize
    setTimeout(() => refetch(), 1000);
  }, [refetch]);

  const handleIntentError = useCallback((error: string) => {
    showError('Transaction failed', error);
    // Refetch even on error in case transaction partially succeeded
    setTimeout(() => refetch(), 1000);
  }, [refetch]);

  const handleCancelIntent = useCallback(async (intentId: bigint) => {
    if (!walletContext.walletAddress) return;

    setCancellingId(intentId);
    try {
      let txHash: string;
      if (walletContext.isPrivy && walletContext.signRawHash && walletContext.publicKeyHex) {
        txHash = await cancelIntent(
          walletContext.walletAddress,
          intentId,
          walletContext.signRawHash,
          walletContext.publicKeyHex
        );
      } else if (walletContext.signTransaction && walletContext.signAndSubmitTransaction) {
        txHash = await cancelIntentNative(
          walletContext.walletAddress,
          intentId,
          walletContext.signTransaction,
          walletContext.signAndSubmitTransaction
        );
      } else {
        throw new Error('No wallet connected');
      }
      showTxSuccess('Intent cancelled', txHash);
      refetch();
    } catch (err) {
      showError('Cancel failed', err instanceof Error ? err.message : 'Failed to cancel');
    } finally {
      setCancellingId(null);
    }
  }, [walletContext, refetch]);

  useEffect(() => {
    const setupMovementWallet = async () => {
      if (!authenticated || !user || isCreatingWallet) return;

      const moveWallet = user.linkedAccounts?.find(
        (account: any) => account.chainType === 'aptos'
      ) as any;

      if (moveWallet) {
        setMovementAddress(normalizeAddress(moveWallet.address as string));
      } else {
        setIsCreatingWallet(true);
        try {
          const wallet = await createWallet({ chainType: 'aptos' });
          setMovementAddress(normalizeAddress((wallet as any).address));
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
      <div className="min-h-screen flex flex-col bg-background text-foreground">
        <Header address={movementAddress} />
        <main className="flex-1 container mx-auto px-4 py-6 md:px-6 md:py-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            <div className="lg:col-span-3 space-y-6">
              <div className="text-center mb-4">
                <h2 className="text-2xl md:text-3xl font-bold mb-2">Intent-Based Trading</h2>
                <p className="text-muted-foreground text-sm md:text-base">
                  Submit your swap intent and let solvers compete for the best execution
                </p>
              </div>
              <div className="flex justify-center">
                <IntentTabs onSuccess={handleIntentSuccess} onError={handleIntentError} />
              </div>
            </div>
            <div className="lg:col-span-2 space-y-6">
              <div>
                <ActiveIntents
                  intents={intents}
                  loading={intentsLoading}
                  onCancel={handleCancelIntent}
                  cancellingId={cancellingId}
                />
              </div>
              <IntentHistory
                intents={intents}
                loading={intentsLoading}
                onCancel={handleCancelIntent}
                cancellingId={cancellingId}
              />
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </WalletContextContext.Provider>
  );
}
