'use client';

import { useWallet } from '@aptos-labs/wallet-adapter-react';
import { useEffect, useState, useCallback } from 'react';
import LoginPage from '../LoginPage';
import { Header } from '../layout/header';
import { Footer } from '../layout/footer';
import { IntentTabs } from '../intent/intent-tabs';
import { ActiveIntents } from '../intent/active-intents';
import { IntentHistory } from '../intent/intent-history';
import { useUserIntents } from '../../hooks/use-user-intents';
import { useWalletContextNative } from '../../hooks/use-wallet-context-native';
import { WalletContextContext } from '../../hooks/use-wallet-context';
import { cancelIntentNative } from '../../lib/velox/transactions';
import { showTxSuccess, showError } from '../../lib/toast';

export default function WalletOnlyHome() {
  const { account, connected } = useWallet();
  const [movementAddress, setMovementAddress] = useState<string>('');
  const [cancellingId, setCancellingId] = useState<bigint | null>(null);

  const walletContext = useWalletContextNative();
  const { intents, loading: intentsLoading, refetch } = useUserIntents(movementAddress);

  const handleIntentSuccess = useCallback((txHash: string) => {
    showTxSuccess('Intent submitted successfully!', txHash);
    refetch();
  }, [refetch]);

  const handleIntentError = useCallback((error: string) => {
    showError('Transaction failed', error);
  }, []);

  const handleCancelIntent = useCallback(async (intentId: bigint) => {
    if (!walletContext.walletAddress || !walletContext.signAndSubmitTransaction) return;

    setCancellingId(intentId);
    try {
      const txHash = await cancelIntentNative(
        walletContext.walletAddress,
        intentId,
        walletContext.signAndSubmitTransaction
      );
      showTxSuccess('Intent cancelled', txHash);
      refetch();
    } catch (err) {
      showError('Cancel failed', err instanceof Error ? err.message : 'Failed to cancel');
    } finally {
      setCancellingId(null);
    }
  }, [walletContext, refetch]);

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
              <div className="hidden lg:block">
                <ActiveIntents
                  intents={intents}
                  loading={intentsLoading}
                  onCancel={handleCancelIntent}
                  cancellingId={cancellingId}
                />
              </div>
            </div>
            <div className="lg:col-span-2 space-y-6">
              <div className="lg:hidden">
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
