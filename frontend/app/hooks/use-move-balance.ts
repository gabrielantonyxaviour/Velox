'use client';

import { useState, useEffect, useCallback } from 'react';
import { aptos } from '../lib/aptos';

interface UseMoveBalanceReturn {
  balance: bigint;
  formatted: string;
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
}

export function useMoveBalance(address: string | undefined): UseMoveBalanceReturn {
  const [balance, setBalance] = useState<bigint>(BigInt(0));
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchBalance = useCallback(async () => {
    if (!address) {
      setBalance(BigInt(0));
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const resources = await aptos.getAccountResource({
        accountAddress: address,
        resourceType: '0x1::coin::CoinStore<0x1::aptos_coin::AptosCoin>',
      });

      const coinBalance = BigInt((resources as any).coin.value);
      setBalance(coinBalance);
    } catch (err) {
      // Account might not have MOVE yet
      if ((err as Error)?.message?.includes('Resource not found')) {
        setBalance(BigInt(0));
      } else {
        setError(err as Error);
        console.error('Error fetching MOVE balance:', err);
      }
    } finally {
      setIsLoading(false);
    }
  }, [address]);

  useEffect(() => {
    fetchBalance();
  }, [fetchBalance]);

  // Format balance with 8 decimals (MOVE has 8 decimals)
  const formatted = (Number(balance) / 1e8).toFixed(4);

  return {
    balance,
    formatted,
    isLoading,
    error,
    refetch: fetchBalance,
  };
}
