'use client';

import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/app/components/ui/button';
import { Card } from '@/app/components/ui/card';
import { Label } from '@/app/components/ui/label';
import { TokenSelector } from './token-selector';
import { AmountInput } from './amount-input';
import { TransactionConfirmDialog } from './transaction-confirm-dialog';
import { Token, TOKEN_LIST } from '@/app/constants/tokens';
import { useWalletContext } from '@/app/hooks/use-wallet-context';
import { useTransactionConfirm, createTWAPDetails } from '@/app/hooks/use-transaction-confirm';
import { submitTWAPIntent, submitTWAPIntentNative } from '@/app/lib/velox/transactions';
import { fetchTokenBalance } from '@/app/lib/aptos';
import { Loader2 } from 'lucide-react';

interface TWAPFormProps {
  onSuccess?: (txHash: string) => void;
  onError?: (error: string) => void;
}

const CHUNK_OPTIONS = [
  { label: '5', value: 5 },
  { label: '10', value: 10 },
  { label: '20', value: 20 },
  { label: '50', value: 50 },
];

const INTERVAL_OPTIONS = [
  { label: '5m', value: 5 * 60, display: '5 minutes' },
  { label: '15m', value: 15 * 60, display: '15 minutes' },
  { label: '1h', value: 60 * 60, display: '1 hour' },
  { label: '4h', value: 4 * 60 * 60, display: '4 hours' },
];

const SLIPPAGE_OPTIONS = [0.1, 0.5, 1.0, 2.0];

export function TWAPForm({ onSuccess, onError }: TWAPFormProps) {
  const { walletAddress, isPrivy, isConnected, signRawHash, publicKeyHex, signTransaction, signAndSubmitTransaction } = useWalletContext();
  const txConfirm = useTransactionConfirm();

  const [inputToken, setInputToken] = useState<Token | null>(null);
  const [outputToken, setOutputToken] = useState<Token | null>(null);
  const [totalAmount, setTotalAmount] = useState('');
  const [numChunks, setNumChunks] = useState(10);
  const [intervalSeconds, setIntervalSeconds] = useState(INTERVAL_OPTIONS[2].value);
  const [maxSlippageBps, setMaxSlippageBps] = useState(50); // 0.5%
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

  const chunkAmount = totalAmount && parseFloat(totalAmount) > 0
    ? (parseFloat(totalAmount) / numChunks).toFixed(4)
    : '0';

  const totalDurationMinutes = (numChunks * intervalSeconds) / 60;

  const formatDuration = (minutes: number): string => {
    if (minutes < 60) return `${minutes} minutes`;
    if (minutes < 1440) return `${(minutes / 60).toFixed(1)} hours`;
    return `${(minutes / 1440).toFixed(1)} days`;
  };

  const validateForm = (): string | null => {
    if (!inputToken) return 'Select input token';
    if (!outputToken) return 'Select output token';
    if (inputToken.address === outputToken.address) return 'Tokens must be different';
    if (!totalAmount || parseFloat(totalAmount) <= 0) return 'Enter total amount';
    const balance = parseFloat(inputBalance || '0');
    if (parseFloat(totalAmount) > balance) return 'Insufficient balance';
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
    const details = createTWAPDetails(
      inputToken,
      outputToken,
      totalAmount,
      numChunks,
      intervalSeconds,
      maxSlippageBps
    );
    txConfirm.openConfirmation(details);
  };

  const executeTransaction = async () => {
    if (!walletAddress || !inputToken || !outputToken) return;

    setIsLoading(true);

    try {
      const amount = BigInt(Math.floor(parseFloat(totalAmount) * Math.pow(10, inputToken.decimals)));
      // Add 60 second buffer to ensure startTime is in the future when tx executes
      const startTime = Math.floor(Date.now() / 1000) + 60;

      let txHash: string;

      if (isPrivy && signRawHash && publicKeyHex) {
        txHash = await submitTWAPIntent(
          walletAddress,
          inputToken.address,
          outputToken.address,
          amount,
          numChunks,
          intervalSeconds,
          maxSlippageBps,
          startTime,
          signRawHash,
          publicKeyHex
        );
      } else if (signTransaction && signAndSubmitTransaction) {
        txHash = await submitTWAPIntentNative(
          walletAddress,
          inputToken.address,
          outputToken.address,
          amount,
          numChunks,
          intervalSeconds,
          maxSlippageBps,
          startTime,
          signTransaction,
          signAndSubmitTransaction
        );
      } else {
        throw new Error('No wallet connected');
      }

      setTotalAmount('');
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
      <h2 className="text-xl font-semibold mb-6">TWAP Order</h2>

      <div className="space-y-4">
        {/* Token Selection */}
        <div className="flex gap-3">
          <div className="flex-1">
            <AmountInput
              value={totalAmount}
              onChange={setTotalAmount}
              token={inputToken}
              balance={inputBalance}
              label="Total Amount"
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
          <span className="text-sm text-muted-foreground">Split into</span>
          <TokenSelector
            selectedToken={outputToken}
            onSelect={setOutputToken}
            tokens={availableOutputTokens}
            balances={tokenBalances}
            disabled={isLoading}
          />
        </div>

        {/* Chunk Configuration */}
        <div className="space-y-1.5">
          <Label className="text-muted-foreground">Number of Chunks</Label>
          <div className="flex gap-2">
            {CHUNK_OPTIONS.map((option) => (
              <Button
                key={option.value}
                type="button"
                variant={numChunks === option.value ? 'default' : 'outline'}
                size="sm"
                onClick={() => setNumChunks(option.value)}
                disabled={isLoading}
                className="flex-1"
              >
                {option.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Interval Configuration */}
        <div className="space-y-1.5">
          <Label className="text-muted-foreground">Interval Between Chunks</Label>
          <div className="flex gap-2">
            {INTERVAL_OPTIONS.map((option) => (
              <Button
                key={option.value}
                type="button"
                variant={intervalSeconds === option.value ? 'default' : 'outline'}
                size="sm"
                onClick={() => setIntervalSeconds(option.value)}
                disabled={isLoading}
                className="flex-1"
              >
                {option.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Slippage Configuration */}
        <div className="space-y-1.5">
          <Label className="text-muted-foreground">Max Slippage per Chunk</Label>
          <div className="flex gap-2">
            {SLIPPAGE_OPTIONS.map((slippage) => (
              <Button
                key={slippage}
                type="button"
                variant={maxSlippageBps === slippage * 100 ? 'default' : 'outline'}
                size="sm"
                onClick={() => setMaxSlippageBps(slippage * 100)}
                disabled={isLoading}
                className="flex-1"
              >
                {slippage}%
              </Button>
            ))}
          </div>
        </div>

        {/* Summary */}
        <div className="p-3 rounded-lg bg-muted/50 border border-border space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Amount per chunk:</span>
            <span>{chunkAmount} {inputToken?.symbol || '-'}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Total duration:</span>
            <span>{formatDuration(totalDurationMinutes)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Execution schedule:</span>
            <span>Every {INTERVAL_OPTIONS.find(o => o.value === intervalSeconds)?.display}</span>
          </div>
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
            'Create TWAP Order'
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
