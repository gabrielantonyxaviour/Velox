'use client';

import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/app/components/ui/button';
import { Card } from '@/app/components/ui/card';
import { Label } from '@/app/components/ui/label';
import { TokenSelector } from './token-selector';
import { AmountInput } from './amount-input';
import { SlippageSelector } from './slippage-selector';
import { TransactionConfirmDialog } from './transaction-confirm-dialog';
import { Token, TOKEN_LIST } from '@/app/constants/tokens';
import { useWalletContext } from '@/app/hooks/use-wallet-context';
import { useTransactionConfirm, createDCADetails } from '@/app/hooks/use-transaction-confirm';
import { submitDCAIntent, submitDCAIntentNative } from '@/app/lib/velox/transactions';
import { fetchTokenBalance } from '@/app/lib/aptos';
import { Loader2 } from 'lucide-react';

interface DCAFormProps {
  onSuccess?: (txHash: string) => void;
  onError?: (error: string) => void;
}

const PERIOD_OPTIONS = [
  { label: '2', value: 2 },
  { label: '4', value: 4 },
  { label: '6', value: 6 },
  { label: '10', value: 10 },
];

const FREQUENCY_OPTIONS = [
  { label: '15s', value: 15, display: '15 seconds' },
  { label: '30s', value: 30, display: '30 seconds' },
  { label: '1m', value: 60, display: '1 minute' },
  { label: '5m', value: 5 * 60, display: '5 minutes' },
];

const DEFAULT_SLIPPAGE = 0.5;

export function DCAForm({ onSuccess, onError }: DCAFormProps) {
  const { walletAddress, isPrivy, isConnected, signRawHash, publicKeyHex, signTransaction, signAndSubmitTransaction } = useWalletContext();
  const txConfirm = useTransactionConfirm();

  const [inputToken, setInputToken] = useState<Token | null>(null);
  const [outputToken, setOutputToken] = useState<Token | null>(null);
  const [amountPerPeriod, setAmountPerPeriod] = useState('');
  const [totalPeriods, setTotalPeriods] = useState(4);
  const [intervalSeconds, setIntervalSeconds] = useState(60);
  const [slippage, setSlippage] = useState(DEFAULT_SLIPPAGE);
  const [inputBalance, setInputBalance] = useState<string>('');
  const [tokenBalances, setTokenBalances] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

  const totalInvestment = amountPerPeriod && parseFloat(amountPerPeriod) > 0
    ? (parseFloat(amountPerPeriod) * totalPeriods).toFixed(2)
    : '0';

  const totalDurationSeconds = totalPeriods * intervalSeconds;

  const formatDuration = (seconds: number): string => {
    if (seconds < 60) return `${seconds} seconds`;
    if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes`;
    if (seconds < 86400) return `${(seconds / 3600).toFixed(1)} hours`;
    return `${(seconds / 86400).toFixed(1)} days`;
  };

  const validateForm = (): string | null => {
    if (!inputToken) return 'Select input token';
    if (!outputToken) return 'Select output token';
    if (inputToken.address === outputToken.address) return 'Tokens must be different';
    if (!amountPerPeriod || parseFloat(amountPerPeriod) <= 0) return 'Enter amount per period';
    const balance = parseFloat(inputBalance || '0');
    const total = parseFloat(totalInvestment);
    if (total > balance) return 'Insufficient balance for total investment';
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
    const details = createDCADetails(
      inputToken,
      outputToken,
      totalInvestment,
      amountPerPeriod,
      totalPeriods,
      intervalSeconds
    );
    txConfirm.openConfirmation(details);
  };

  const executeTransaction = async () => {
    if (!walletAddress || !inputToken || !outputToken) return;

    setIsLoading(true);

    try {
      const amount = BigInt(Math.floor(parseFloat(amountPerPeriod) * Math.pow(10, inputToken.decimals)));

      let txHash: string;

      if (isPrivy && signRawHash && publicKeyHex) {
        txHash = await submitDCAIntent(
          walletAddress,
          inputToken.address,
          outputToken.address,
          amount,
          totalPeriods,
          intervalSeconds,
          signRawHash,
          publicKeyHex
        );
      } else if (signTransaction && signAndSubmitTransaction) {
        txHash = await submitDCAIntentNative(
          walletAddress,
          inputToken.address,
          outputToken.address,
          amount,
          totalPeriods,
          intervalSeconds,
          signTransaction,
          signAndSubmitTransaction
        );
      } else {
        throw new Error('No wallet connected');
      }

      setAmountPerPeriod('');
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
    <Card className="w-full p-6 bg-card border-border">
      <h2 className="text-xl font-semibold mb-6">DCA (Dollar Cost Average)</h2>

      <div className="space-y-4">
        {/* Token Selection */}
        <div className="flex gap-3">
          <div className="flex-1">
            <AmountInput
              value={amountPerPeriod}
              onChange={setAmountPerPeriod}
              token={inputToken}
              balance={inputBalance}
              label="Amount per Period"
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

        <div className="flex items-center gap-3">
          <span className="text-sm text-muted-foreground">To buy</span>
          <TokenSelector
            selectedToken={outputToken}
            onSelect={setOutputToken}
            tokens={availableOutputTokens}
            balances={tokenBalances}
            disabled={isLoading}
          />
        </div>

        {/* Period Configuration */}
        <div className="space-y-1.5">
          <Label className="text-muted-foreground">Total Periods</Label>
          <div className="flex gap-2">
            {PERIOD_OPTIONS.map((option) => (
              <Button
                key={option.value}
                type="button"
                variant={totalPeriods === option.value ? 'default' : 'outline'}
                size="sm"
                onClick={() => setTotalPeriods(option.value)}
                disabled={isLoading}
                className="flex-1"
              >
                {option.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Frequency Configuration */}
        <div className="space-y-1.5">
          <Label className="text-muted-foreground">Frequency</Label>
          <div className="flex gap-2 flex-wrap">
            {FREQUENCY_OPTIONS.map((option) => (
              <Button
                key={option.value}
                type="button"
                variant={intervalSeconds === option.value ? 'default' : 'outline'}
                size="sm"
                onClick={() => setIntervalSeconds(option.value)}
                disabled={isLoading}
                className="flex-1 min-w-[70px]"
              >
                {option.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Summary */}
        <div className="p-3 rounded-lg bg-muted/50 border border-border space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Total investment:</span>
            <span>{totalInvestment} {inputToken?.symbol || '-'}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Duration:</span>
            <span>{formatDuration(totalDurationSeconds)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Next buy:</span>
            <span>Immediately after creation</span>
          </div>
        </div>

        {/* Slippage Selector */}
        <SlippageSelector
          value={slippage}
          onChange={setSlippage}
          disabled={isLoading}
        />

        {/* Info Box */}
        <div className="p-3 bg-primary/10 text-primary rounded-lg text-sm">
          DCA helps reduce the impact of volatility by spreading purchases over time.
        </div>

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
            'Start DCA'
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
