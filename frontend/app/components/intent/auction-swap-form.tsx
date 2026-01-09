'use client';

import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/app/components/ui/button';
import { Card } from '@/app/components/ui/card';
import { TokenSelector } from './token-selector';
import { AmountInput } from './amount-input';
import { AuctionTypeSelector } from './auction-type-selector';
import { DutchParamsInput } from './dutch-params-input';
import { Token, TOKEN_LIST } from '@/app/constants/tokens';
import { useWalletContext } from '@/app/hooks/use-wallet-context';
import {
  submitSwapWithAuction,
  submitSwapWithAuctionNative,
  submitSwapWithDutchAuction,
  submitSwapWithDutchAuctionNative,
} from '@/app/lib/velox/transactions';
import { AuctionType } from '@/app/lib/velox/types';
import { fetchTokenBalance } from '@/app/lib/aptos';
import { calculateSwapOutput, formatPrice } from '@/app/lib/pricing';
import { ArrowDownUp, Loader2, RefreshCw, Gavel, Clock } from 'lucide-react';

interface AuctionSwapFormProps {
  onSuccess?: (txHash: string) => void;
  onError?: (error: string) => void;
}

const DEADLINE_OPTIONS = [
  { label: '10m', value: 10 * 60 },
  { label: '30m', value: 30 * 60 },
  { label: '1h', value: 60 * 60 },
  { label: '4h', value: 4 * 60 * 60 },
];

const SEALED_BID_DURATION_OPTIONS = [
  { label: '15s', value: 15 },
  { label: '30s', value: 30 },
  { label: '1m', value: 60 },
  { label: '2m', value: 120 },
];

const DEFAULT_SLIPPAGE = 0.5;

export function AuctionSwapForm({ onSuccess, onError }: AuctionSwapFormProps) {
  const { walletAddress, isPrivy, isConnected, signRawHash, publicKeyHex, signTransaction, signAndSubmitTransaction } = useWalletContext();

  const [inputToken, setInputToken] = useState<Token | null>(null);
  const [outputToken, setOutputToken] = useState<Token | null>(null);
  const [inputAmount, setInputAmount] = useState('');
  const [minOutputAmount, setMinOutputAmount] = useState('');
  const [deadline, setDeadline] = useState(DEADLINE_OPTIONS[1].value);
  const [inputBalance, setInputBalance] = useState<string>('');
  const [tokenBalances, setTokenBalances] = useState<Record<string, string>>({});
  const [exchangeRate, setExchangeRate] = useState<number>(0);
  const [isLoadingQuote, setIsLoadingQuote] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Auction type state
  const [auctionType, setAuctionType] = useState<AuctionType>(AuctionType.SEALED_BID);
  const [sealedBidDuration, setSealedBidDuration] = useState(SEALED_BID_DURATION_OPTIONS[1].value);
  const [dutchStartMultiplier, setDutchStartMultiplier] = useState(120);
  const [dutchDuration, setDutchDuration] = useState(60);

  const minAmountOutBigInt = BigInt(Math.floor(parseFloat(minOutputAmount || '0') * 1e8));

  const fetchBalance = useCallback(async (token: Token, address: string) => {
    return fetchTokenBalance(token.address, address, token.decimals);
  }, []);

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

  useEffect(() => {
    if (inputToken && tokenBalances[inputToken.address]) {
      setInputBalance(tokenBalances[inputToken.address]);
    } else {
      setInputBalance('');
    }
  }, [inputToken, tokenBalances]);

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
          DEFAULT_SLIPPAGE
        );

        setExchangeRate(result.exchangeRate);
        if (result.outputAmount > 0) {
          setMinOutputAmount(result.outputAmount.toFixed(6));
        } else {
          setMinOutputAmount('');
        }
      } catch (err) {
        console.error('Error fetching quote:', err);
        setMinOutputAmount('');
        setExchangeRate(0);
      } finally {
        setIsLoadingQuote(false);
      }
    };

    const timeoutId = setTimeout(fetchQuote, 300);
    return () => clearTimeout(timeoutId);
  }, [inputAmount, inputToken, outputToken]);

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

  const handleSubmit = async () => {
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    if (!walletAddress || !inputToken || !outputToken) return;

    setIsLoading(true);
    setError(null);

    try {
      const amountIn = BigInt(Math.floor(parseFloat(inputAmount) * Math.pow(10, inputToken.decimals)));
      const minAmountOut = BigInt(Math.floor(parseFloat(minOutputAmount) * Math.pow(10, outputToken.decimals)));
      const deadlineTimestamp = Math.floor(Date.now() / 1000) + deadline;

      let txHash: string;

      if (auctionType === AuctionType.SEALED_BID) {
        if (isPrivy && signRawHash && publicKeyHex) {
          txHash = await submitSwapWithAuction(
            walletAddress,
            inputToken.address,
            outputToken.address,
            amountIn,
            minAmountOut,
            deadlineTimestamp,
            sealedBidDuration,
            signRawHash,
            publicKeyHex
          );
        } else if (signTransaction && signAndSubmitTransaction) {
          txHash = await submitSwapWithAuctionNative(
            walletAddress,
            inputToken.address,
            outputToken.address,
            amountIn,
            minAmountOut,
            deadlineTimestamp,
            sealedBidDuration,
            signTransaction,
            signAndSubmitTransaction
          );
        } else {
          throw new Error('No wallet connected');
        }
      } else {
        // Dutch auction
        const startPrice = (minAmountOut * BigInt(dutchStartMultiplier)) / BigInt(100);
        if (isPrivy && signRawHash && publicKeyHex) {
          txHash = await submitSwapWithDutchAuction(
            walletAddress,
            inputToken.address,
            outputToken.address,
            amountIn,
            minAmountOut,
            startPrice,
            deadlineTimestamp,
            dutchDuration,
            signRawHash,
            publicKeyHex
          );
        } else if (signTransaction && signAndSubmitTransaction) {
          txHash = await submitSwapWithDutchAuctionNative(
            walletAddress,
            inputToken.address,
            outputToken.address,
            amountIn,
            minAmountOut,
            startPrice,
            deadlineTimestamp,
            dutchDuration,
            signTransaction,
            signAndSubmitTransaction
          );
        } else {
          throw new Error('No wallet connected');
        }
      }

      setInputAmount('');
      setMinOutputAmount('');
      onSuccess?.(txHash);
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : 'Transaction failed';
      setError(errorMsg);
      onError?.(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  const availableOutputTokens = TOKEN_LIST.filter((t) => t.address !== inputToken?.address);

  return (
    <Card className="w-full max-w-md mx-auto p-6 bg-card border-border">
      <div className="flex items-center gap-2 mb-6">
        {auctionType === AuctionType.SEALED_BID ? (
          <Gavel className="w-5 h-5 text-primary" />
        ) : (
          <Clock className="w-5 h-5 text-amber-400" />
        )}
        <h2 className="text-xl font-semibold">
          {auctionType === AuctionType.SEALED_BID ? 'Sealed-Bid' : 'Dutch'} Auction Swap
        </h2>
      </div>

      <div className="space-y-4">
        {/* Auction Type Selector */}
        <AuctionTypeSelector value={auctionType} onChange={setAuctionType} />

        {/* Info Banner */}
        <div className={`border rounded-lg p-3 ${
          auctionType === AuctionType.SEALED_BID
            ? 'bg-primary/10 border-primary/20'
            : 'bg-amber-500/10 border-amber-500/20'
        }`}>
          <p className={`text-sm ${auctionType === AuctionType.SEALED_BID ? 'text-primary' : 'text-amber-400'}`}>
            {auctionType === AuctionType.SEALED_BID
              ? 'Solvers submit sealed bids. Best offer wins after auction ends.'
              : 'Price drops from start to min. First solver to accept wins.'}
          </p>
        </div>

        {/* Token Inputs */}
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

        {exchangeRate > 0 && inputToken && outputToken && (
          <div className="text-sm text-muted-foreground bg-muted/30 px-3 py-2 rounded-lg">
            1 {inputToken.symbol} = {formatPrice(exchangeRate)} {outputToken.symbol}
          </div>
        )}

        {/* Auction-specific settings */}
        {auctionType === AuctionType.SEALED_BID ? (
          <div className="space-y-1.5 p-4 rounded-lg bg-primary/5 border border-primary/20">
            <label className="block text-sm text-primary flex items-center gap-1">
              <Gavel className="w-3 h-3" /> Sealed Bid Duration
            </label>
            <div className="flex gap-2">
              {SEALED_BID_DURATION_OPTIONS.map((option) => (
                <Button
                  key={option.value}
                  type="button"
                  variant={sealedBidDuration === option.value ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSealedBidDuration(option.value)}
                  disabled={isLoading}
                  className="flex-1"
                >
                  {option.label}
                </Button>
              ))}
            </div>
          </div>
        ) : (
          <DutchParamsInput
            startPriceMultiplier={dutchStartMultiplier}
            duration={dutchDuration}
            onStartPriceChange={setDutchStartMultiplier}
            onDurationChange={setDutchDuration}
            basePrice={minAmountOutBigInt}
          />
        )}

        {/* Deadline */}
        <div className="space-y-1.5">
          <label className="block text-sm text-muted-foreground">Order Deadline</label>
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

        <div className="text-xs text-muted-foreground">
          Slippage tolerance: {DEFAULT_SLIPPAGE}%
        </div>

        {error && (
          <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20">
            <p className="text-sm text-destructive">{error}</p>
          </div>
        )}

        <Button
          type="button"
          onClick={handleSubmit}
          disabled={isLoading || !isConnected}
          className={`w-full h-12 text-base font-medium ${
            auctionType === AuctionType.SEALED_BID
              ? 'bg-primary hover:bg-primary/90 text-primary-foreground'
              : 'bg-amber-600 hover:bg-amber-700 text-white'
          }`}
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Submitting...
            </>
          ) : !isConnected ? (
            'Connect Wallet'
          ) : auctionType === AuctionType.SEALED_BID ? (
            <>
              <Gavel className="w-4 h-4 mr-2" />
              Create Sealed-Bid Auction
            </>
          ) : (
            <>
              <Clock className="w-4 h-4 mr-2" />
              Create Dutch Auction
            </>
          )}
        </Button>
      </div>
    </Card>
  );
}
