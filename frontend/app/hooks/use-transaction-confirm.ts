'use client';

import { useState, useCallback } from 'react';
import { TransactionDetails, IntentType } from '@/app/components/intent/transaction-confirm-dialog';
import { Token } from '@/app/constants/tokens';

interface UseTransactionConfirmReturn {
  isOpen: boolean;
  details: TransactionDetails | null;
  isConfirming: boolean;
  openConfirmation: (details: TransactionDetails) => void;
  closeConfirmation: () => void;
  setConfirming: (value: boolean) => void;
  confirmAndExecute: (executeFn: () => Promise<void>) => Promise<void>;
}

export function useTransactionConfirm(): UseTransactionConfirmReturn {
  const [isOpen, setIsOpen] = useState(false);
  const [details, setDetails] = useState<TransactionDetails | null>(null);
  const [isConfirming, setIsConfirming] = useState(false);
  const [pendingExecuteFn, setPendingExecuteFn] = useState<(() => Promise<void>) | null>(null);

  const openConfirmation = useCallback((txDetails: TransactionDetails) => {
    setDetails(txDetails);
    setIsOpen(true);
    setIsConfirming(false);
  }, []);

  const closeConfirmation = useCallback(() => {
    setIsOpen(false);
    setDetails(null);
    setIsConfirming(false);
    setPendingExecuteFn(null);
  }, []);

  const setConfirming = useCallback((value: boolean) => {
    setIsConfirming(value);
  }, []);

  const confirmAndExecute = useCallback(async (executeFn: () => Promise<void>) => {
    setIsConfirming(true);
    try {
      await executeFn();
      closeConfirmation();
    } catch (error) {
      setIsConfirming(false);
      throw error;
    }
  }, [closeConfirmation]);

  return {
    isOpen,
    details,
    isConfirming,
    openConfirmation,
    closeConfirmation,
    setConfirming,
    confirmAndExecute,
  };
}

// Helper functions to create transaction details for each intent type
export function createSwapDetails(
  inputToken: Token,
  outputToken: Token,
  inputAmount: string,
  outputAmount: string,
  deadline: number,
  slippage: number
): TransactionDetails {
  return {
    type: 'swap',
    inputToken,
    outputToken,
    inputAmount,
    outputAmount,
    deadline,
    slippage,
  };
}

export function createLimitOrderDetails(
  inputToken: Token,
  outputToken: Token,
  inputAmount: string,
  outputAmount: string,
  limitPrice: string,
  expiry: number
): TransactionDetails {
  return {
    type: 'limit_order',
    inputToken,
    outputToken,
    inputAmount,
    outputAmount,
    limitPrice,
    expiry,
  };
}

export function createDCADetails(
  inputToken: Token,
  outputToken: Token,
  totalAmount: string,
  amountPerPeriod: string,
  totalPeriods: number,
  intervalSeconds: number
): TransactionDetails {
  return {
    type: 'dca',
    inputToken,
    outputToken,
    inputAmount: totalAmount,
    outputAmount: '--',
    amountPerPeriod,
    totalPeriods,
    intervalSeconds,
  };
}

export function createTWAPDetails(
  inputToken: Token,
  outputToken: Token,
  totalAmount: string,
  numChunks: number,
  intervalSeconds: number,
  maxSlippageBps: number,
  startTime?: number
): TransactionDetails {
  return {
    type: 'twap',
    inputToken,
    outputToken,
    inputAmount: totalAmount,
    outputAmount: '--',
    numChunks,
    intervalSeconds,
    maxSlippageBps,
    startTime,
  };
}

export function createSealedBidAuctionDetails(
  inputToken: Token,
  outputToken: Token,
  inputAmount: string,
  minOutputAmount: string,
  auctionDuration: number,
  deadline: number
): TransactionDetails {
  return {
    type: 'auction_sealed_bid',
    inputToken,
    outputToken,
    inputAmount,
    outputAmount: minOutputAmount,
    auctionDuration,
    deadline,
  };
}

export function createDutchAuctionDetails(
  inputToken: Token,
  outputToken: Token,
  inputAmount: string,
  minOutputAmount: string,
  dutchStartPrice: string,
  auctionDuration: number,
  deadline: number
): TransactionDetails {
  return {
    type: 'auction_dutch',
    inputToken,
    outputToken,
    inputAmount,
    outputAmount: minOutputAmount,
    dutchStartPrice,
    dutchEndPrice: minOutputAmount,
    auctionDuration,
    deadline,
  };
}
