'use client';

import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/app/components/ui/button';
import { Card } from '@/app/components/ui/card';
import { Label } from '@/app/components/ui/label';
import { Switch } from '@/app/components/ui/switch';
import { TokenSelector } from './token-selector';
import { AmountInput } from './amount-input';
import { PriceInput } from './price-input';
import { SlippageSelector } from './slippage-selector';
import { TransactionConfirmDialog } from './transaction-confirm-dialog';
import { Token, TOKEN_LIST } from '@/app/constants/tokens';
import { useWalletContext } from '@/app/hooks/use-wallet-context';
import { useTransactionConfirm, createLimitOrderDetails } from '@/app/hooks/use-transaction-confirm';
import { submitLimitOrderIntent, submitLimitOrderIntentNative } from '@/app/lib/velox/transactions';
import { fetchTokenBalance } from '@/app/lib/aptos';
import { getExchangeRate } from '@/app/lib/pricing';
import { Loader2 } from 'lucide-react';

interface LimitFormProps {
  onSuccess?: (txHash: string) => void;
  onError?: (error: string) => void;
}

const EXPIRY_OPTIONS = [
  { label: '1h', value: 60 * 60 },
  { label: '4h', value: 4 * 60 * 60 },
  { label: '24h', value: 24 * 60 * 60 },
  { label: '7d', value: 7 * 24 * 60 * 60 },
];

const DEFAULT_SLIPPAGE = 0.5;

export function LimitForm({ onSuccess, onError }: LimitFormProps) {
  const { walletAddress, isPrivy, isConnected, signRawHash, publicKeyHex, signTransaction, signAndSubmitTransaction } = useWalletContext();
  const txConfirm = useTransactionConfirm();

  const [inputToken, setInputToken] = useState<Token | null>(null);
  const [outputToken, setOutputToken] = useState<Token | null>(null);
  const [inputAmount, setInputAmount] = useState('');
  const [limitPrice, setLimitPrice] = useState('');
  const [expiry, setExpiry] = useState(EXPIRY_OPTIONS[1].value);
  const [partialFill, setPartialFill] = useState(true);
  const [slippage, setSlippage] = useState(DEFAULT_SLIPPAGE);
  const [inputBalance, setInputBalance] = useState<string>('');
  const [tokenBalances, setTokenBalances] = useState<Record<string, string>>({});
  const [exchangeRate, setExchangeRate] = useState<number>(0);
  const [isLoadingPrice, setIsLoadingPrice] = useState(false);
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

  // Fetch exchange rate when tokens change
  useEffect(() => {
    const fetchRate = async () => {
      if (!inputToken || !outputToken) {
        setExchangeRate(0);
        return;
      }

      setIsLoadingPrice(true);
      try {
        const rate = await getExchangeRate(inputToken.symbol, outputToken.symbol);
        setExchangeRate(rate);
      } catch (error) {
        console.error('Error fetching exchange rate:', error);
        setExchangeRate(0);
      } finally {
        setIsLoadingPrice(false);
      }
    };

    fetchRate();
  }, [inputToken, outputToken]);

  const expectedOutput = inputAmount && limitPrice && parseFloat(inputAmount) > 0 && parseFloat(limitPrice) > 0
    ? (parseFloat(inputAmount) * parseFloat(limitPrice)).toFixed(6)
    : '';

  const validateForm = (): string | null => {
    if (!inputToken) return 'Select input token';
    if (!outputToken) return 'Select output token';
    if (inputToken.address === outputToken.address) return 'Tokens must be different';
    if (!inputAmount || parseFloat(inputAmount) <= 0) return 'Enter amount';
    if (!limitPrice || parseFloat(limitPrice) <= 0) return 'Enter limit price';
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
    const details = createLimitOrderDetails(
      inputToken,
      outputToken,
      inputAmount,
      expectedOutput || '0',
      limitPrice,
      expiry,
      partialFill
    );
    txConfirm.openConfirmation(details);
  };

  const executeTransaction = async () => {
    if (!walletAddress || !inputToken || !outputToken) return;

    setIsLoading(true);

    try {
      const amountIn = BigInt(Math.floor(parseFloat(inputAmount) * Math.pow(10, inputToken.decimals)));
      // Price is scaled by 10000 (e.g., 25 output per 1 input = 25 * 10000 = 250000)
      const priceScaled = BigInt(Math.floor(parseFloat(limitPrice) * 10000));
      const expiryTimestamp = Math.floor(Date.now() / 1000) + expiry;

      let txHash: string;

      if (isPrivy && signRawHash && publicKeyHex) {
        txHash = await submitLimitOrderIntent(
          walletAddress, inputToken.address, outputToken.address, amountIn,
          priceScaled, expiryTimestamp, signRawHash, publicKeyHex
        );
      } else if (signTransaction && signAndSubmitTransaction) {
        txHash = await submitLimitOrderIntentNative(
          walletAddress, inputToken.address, outputToken.address, amountIn,
          priceScaled, expiryTimestamp, signTransaction, signAndSubmitTransaction
        );
      } else {
        throw new Error('No wallet connected');
      }

      setInputAmount('');
      setLimitPrice('');
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
      <h2 className="text-xl font-semibold mb-6">Limit Order</h2>

      <div className="space-y-4">
        <div className="flex gap-3">
          <div className="flex-1">
            <AmountInput
              value={inputAmount}
              onChange={setInputAmount}
              token={inputToken}
              balance={inputBalance}
              label="Amount"
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
          <span className="text-sm text-muted-foreground">For</span>
          <TokenSelector
            selectedToken={outputToken}
            onSelect={setOutputToken}
            tokens={availableOutputTokens}
            balances={tokenBalances}
            disabled={isLoading}
          />
        </div>

        <PriceInput
          value={limitPrice}
          onChange={setLimitPrice}
          inputToken={inputToken}
          outputToken={outputToken}
          currentPrice={exchangeRate}
          isLoadingPrice={isLoadingPrice}
          disabled={isLoading}
        />

        {expectedOutput && (
          <div className="p-3 rounded-lg bg-muted/50 border border-border">
            <p className="text-sm text-muted-foreground">Expected to receive</p>
            <p className="text-lg font-medium">
              {expectedOutput} {outputToken?.symbol}
            </p>
          </div>
        )}

        <div className="space-y-1.5">
          <Label className="text-muted-foreground">Expires in</Label>
          <div className="flex gap-2">
            {EXPIRY_OPTIONS.map((option) => (
              <Button
                key={option.value}
                type="button"
                variant={expiry === option.value ? 'default' : 'outline'}
                size="sm"
                onClick={() => setExpiry(option.value)}
                disabled={isLoading}
                className="flex-1"
              >
                {option.label}
              </Button>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50 border border-border">
          <div className="space-y-0.5">
            <Label className="text-sm font-medium">Allow partial fill</Label>
            <p className="text-xs text-muted-foreground">
              Order can be filled in multiple transactions
            </p>
          </div>
          <Switch
            checked={partialFill}
            onCheckedChange={setPartialFill}
            disabled={isLoading}
          />
        </div>

        {/* Slippage Selector */}
        <SlippageSelector
          value={slippage}
          onChange={setSlippage}
          disabled={isLoading}
        />

        {error && (
          <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20">
            <p className="text-sm text-destructive">{error}</p>
          </div>
        )}

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
            'Submit Limit Order'
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
