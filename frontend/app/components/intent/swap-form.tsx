'use client';

import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/app/components/ui/button';
import { Card } from '@/app/components/ui/card';
import { TokenSelector } from './token-selector';
import { AmountInput } from './amount-input';
import { SlippageSelector } from './slippage-selector';
import { TransactionConfirmDialog } from './transaction-confirm-dialog';
import { Token, TOKEN_LIST } from '@/app/constants/tokens';
import { useWalletContext } from '@/app/hooks/use-wallet-context';
import { useTransactionConfirm, createSwapDetails } from '@/app/hooks/use-transaction-confirm';
import { submitSwapIntent, submitSwapIntentNative } from '@/app/lib/velox/transactions';
import { fetchTokenBalance } from '@/app/lib/aptos';
import { calculateSwapOutput, formatPrice } from '@/app/lib/pricing';
import { ArrowDownUp, Loader2, RefreshCw } from 'lucide-react';

interface SwapFormProps {
  onSuccess?: (txHash: string) => void;
  onError?: (error: string) => void;
}

const DEADLINE_OPTIONS = [
  { label: '5m', value: 5 * 60 },
  { label: '10m', value: 10 * 60 },
  { label: '30m', value: 30 * 60 },
  { label: '1h', value: 60 * 60 },
];

const DEFAULT_SLIPPAGE = 0.5; // 0.5%

export function SwapForm({ onSuccess, onError }: SwapFormProps) {
  const { walletAddress, isPrivy, isConnected, signRawHash, publicKeyHex, signTransaction, signAndSubmitTransaction } = useWalletContext();
  const txConfirm = useTransactionConfirm();

  const [inputToken, setInputToken] = useState<Token | null>(null);
  const [outputToken, setOutputToken] = useState<Token | null>(null);
  const [inputAmount, setInputAmount] = useState('');
  const [minOutputAmount, setMinOutputAmount] = useState('');
  const [deadline, setDeadline] = useState(DEADLINE_OPTIONS[1].value); // Default 10m
  const [slippage, setSlippage] = useState(DEFAULT_SLIPPAGE);
  const [inputBalance, setInputBalance] = useState<string>('');
  const [tokenBalances, setTokenBalances] = useState<Record<string, string>>({});
  const [exchangeRate, setExchangeRate] = useState<number>(0);
  const [isLoadingQuote, setIsLoadingQuote] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch token balance
  const fetchBalance = useCallback(async (token: Token, address: string) => {
    return fetchTokenBalance(token.address, address, token.decimals);
  }, []);

  // Fetch all token balances when wallet connects
  useEffect(() => {
    const fetchAllBalances = async () => {
      if (!walletAddress) {
        setTokenBalances({});
        return;
      }
      const balances: Record<string, string> = {};
      await Promise.all(
        TOKEN_LIST.map(async (token) => {
          const bal = await fetchBalance(token, walletAddress);
          balances[token.address] = bal;
        })
      );
      setTokenBalances(balances);
    };
    fetchAllBalances();
  }, [walletAddress, fetchBalance]);

  // Update selected input balance when token changes
  useEffect(() => {
    if (inputToken && tokenBalances[inputToken.address]) {
      setInputBalance(tokenBalances[inputToken.address]);
    } else {
      setInputBalance('');
    }
  }, [inputToken, tokenBalances]);

  // Fetch real-time quote when tokens or amount change
  useEffect(() => {
    const fetchQuote = async () => {
      if (!inputToken || !outputToken || !inputAmount || parseFloat(inputAmount) <= 0) {
        setMinOutputAmount('');
        setExchangeRate(0);
        return;
      }

      setIsLoadingQuote(true);
      try {
        const result = await calculateSwapOutput(
          parseFloat(inputAmount),
          inputToken.symbol,
          outputToken.symbol,
          slippage
        );

        setExchangeRate(result.exchangeRate);
        if (result.outputAmount > 0) {
          setMinOutputAmount(result.outputAmount.toFixed(6));
        } else {
          setMinOutputAmount('');
        }
      } catch (error) {
        console.error('Error fetching quote:', error);
        setMinOutputAmount('');
        setExchangeRate(0);
      } finally {
        setIsLoadingQuote(false);
      }
    };

    // Debounce the quote fetch
    const timeoutId = setTimeout(fetchQuote, 300);
    return () => clearTimeout(timeoutId);
  }, [inputAmount, inputToken, outputToken, slippage]);

  const handleSwapTokens = () => {
    const temp = inputToken;
    setInputToken(outputToken);
    setOutputToken(temp);
    setInputAmount('');
    setMinOutputAmount('');
  };

  const validateForm = (): string | null => {
    if (!inputToken) return 'Select input token';
    if (!outputToken) return 'Select output token';
    if (inputToken.address === outputToken.address) return 'Tokens must be different';
    if (!inputAmount || parseFloat(inputAmount) <= 0) return 'Enter amount';
    const balance = parseFloat(inputBalance || '0');
    if (parseFloat(inputAmount) > balance) return 'Insufficient balance';
    return null;
  };

  const handleSubmit = () => {
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    if (!walletAddress || !inputToken || !outputToken) return;

    setError(null);

    // Open confirmation dialog
    const details = createSwapDetails(
      inputToken,
      outputToken,
      inputAmount,
      minOutputAmount || '0',
      deadline,
      slippage
    );
    txConfirm.openConfirmation(details);
  };

  const executeTransaction = async () => {
    if (!walletAddress || !inputToken || !outputToken) return;

    setIsLoading(true);

    try {
      const amountIn = BigInt(Math.floor(parseFloat(inputAmount) * Math.pow(10, inputToken.decimals)));
      const minAmountOut = BigInt(Math.floor(parseFloat(minOutputAmount) * Math.pow(10, outputToken.decimals)));
      const deadlineTimestamp = Math.floor(Date.now() / 1000) + deadline;

      let txHash: string;

      if (isPrivy && signRawHash && publicKeyHex) {
        txHash = await submitSwapIntent(
          walletAddress,
          inputToken.address,
          outputToken.address,
          amountIn,
          minAmountOut,
          deadlineTimestamp,
          signRawHash,
          publicKeyHex
        );
      } else if (signTransaction && signAndSubmitTransaction) {
        txHash = await submitSwapIntentNative(
          walletAddress,
          inputToken.address,
          outputToken.address,
          amountIn,
          minAmountOut,
          deadlineTimestamp,
          signTransaction,
          signAndSubmitTransaction
        );
      } else {
        throw new Error('No wallet connected');
      }

      // Reset form on success
      setInputAmount('');
      setMinOutputAmount('');
      txConfirm.closeConfirmation();
      onSuccess?.(txHash);
    } catch (err: any) {
      const errorMsg = err.message || 'Transaction failed';
      setError(errorMsg);
      onError?.(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  const availableOutputTokens = TOKEN_LIST.filter((t) => t.address !== inputToken?.address);

  return (
    <Card className="w-full max-w-md mx-auto p-6 bg-card border-border">
      <h2 className="text-xl font-semibold mb-6">Swap</h2>

      {/* Input Token */}
      <div className="space-y-4">
        <div className="flex gap-3">
          <div className="flex-1">
            <AmountInput
              value={inputAmount}
              onChange={setInputAmount}
              token={inputToken}
              balance={inputBalance}
              label="You pay"
              disabled={isLoading}
            />
          </div>
          <div className="pt-6">
            <TokenSelector
              selectedToken={inputToken}
              onSelect={setInputToken}
              tokens={TOKEN_LIST}
              balance={inputBalance}
              balances={tokenBalances}
              disabled={isLoading}
            />
          </div>
        </div>

        {/* Swap Button */}
        <div className="flex justify-center -my-2">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={handleSwapTokens}
            disabled={isLoading}
            className="rounded-full border border-border bg-background hover:bg-accent"
          >
            <ArrowDownUp className="w-4 h-4" />
          </Button>
        </div>

        {/* Output Token */}
        <div className="flex gap-3">
          <div className="flex-1">
            <div className="space-y-1.5">
              <label className="block text-sm text-muted-foreground">You receive (min)</label>
              <div className="h-12 px-3 flex items-center bg-muted/50 rounded-lg border border-border">
                {isLoadingQuote ? (
                  <RefreshCw className="w-4 h-4 animate-spin text-muted-foreground" />
                ) : (
                  <span className="text-lg font-medium text-muted-foreground">
                    {minOutputAmount || '0.00'}
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className="pt-6">
            <TokenSelector
              selectedToken={outputToken}
              onSelect={setOutputToken}
              tokens={availableOutputTokens}
              balances={tokenBalances}
              disabled={isLoading}
            />
          </div>
        </div>

        {/* Exchange Rate Display */}
        {exchangeRate > 0 && inputToken && outputToken && (
          <div className="text-sm text-muted-foreground bg-muted/30 px-3 py-2 rounded-lg">
            1 {inputToken.symbol} = {formatPrice(exchangeRate)} {outputToken.symbol}
          </div>
        )}

        {/* Deadline Selector */}
        <div className="space-y-1.5">
          <label className="block text-sm text-muted-foreground">Deadline</label>
          <div className="flex gap-2">
            {DEADLINE_OPTIONS.map((option) => (
              <Button
                key={option.value}
                type="button"
                variant={deadline === option.value ? 'default' : 'outline'}
                size="sm"
                onClick={() => setDeadline(option.value)}
                disabled={isLoading}
                className="flex-1"
              >
                {option.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Slippage Selector */}
        <SlippageSelector
          value={slippage}
          onChange={setSlippage}
          disabled={isLoading}
        />

        {/* Error Display */}
        {error && (
          <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20">
            <p className="text-sm text-destructive">{error}</p>
          </div>
        )}

        {/* Submit Button */}
        <Button
          type="button"
          onClick={handleSubmit}
          disabled={isLoading || !isConnected}
          className="w-full h-12 text-base font-medium"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Submitting...
            </>
          ) : !isConnected ? (
            'Connect Wallet'
          ) : (
            'Submit Swap Intent'
          )}
        </Button>
      </div>

      {/* Confirmation Dialog */}
      <TransactionConfirmDialog
        open={txConfirm.isOpen}
        onOpenChange={txConfirm.closeConfirmation}
        details={txConfirm.details}
        onConfirm={executeTransaction}
        onCancel={txConfirm.closeConfirmation}
        isLoading={isLoading}
      />
    </Card>
  );
}
