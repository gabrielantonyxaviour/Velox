'use client';

import { useEffect, useState, useCallback } from 'react';
import { IntentRecord } from '@/app/lib/velox/types';
import { IntentStatusBadge } from './intent-status-badge';
import { Button } from '../ui/button';
import { Progress } from '../ui/progress';
import { TOKEN_LIST } from '@/app/constants/tokens';
import { getExplorerUrl } from '@/app/lib/aptos';
import {
  X, ArrowUpRight, Check, Gavel, Clock, TrendingDown,
  User, Timer, Loader2, Trophy, Users, DollarSign,
} from 'lucide-react';

interface AuctionIntentRowProps {
  intent: IntentRecord;
  onCancel?: (intentId: bigint) => void;
  onClick?: () => void;
  isCancelling?: boolean;
  compact?: boolean;
}

function formatAmount(amount: bigint, decimals: number): string {
  const divisor = BigInt(10 ** decimals);
  const whole = amount / divisor;
  const fraction = amount % divisor;
  const fractionStr = fraction.toString().padStart(decimals, '0').slice(0, 4);
  return `${whole}.${fractionStr}`;
}

function formatPrice(price: bigint): string {
  return (Number(price) / 10000).toFixed(4);
}

function formatTime(timestamp: number): string {
  const date = new Date(timestamp * 1000);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  return `${diffDays}d ago`;
}

function formatTxHash(hash: string): string {
  return `${hash.slice(0, 6)}...${hash.slice(-4)}`;
}

function getTokenSymbol(address: string): string {
  const token = TOKEN_LIST.find((t) => t.address === address);
  return token?.symbol || address.slice(0, 6) + '...';
}

function getTokenDecimals(address: string): number {
  const token = TOKEN_LIST.find((t) => t.address === address);
  return token?.decimals || 8;
}

function truncateAddress(addr: string): string {
  return addr.slice(0, 6) + '...' + addr.slice(-4);
}

export function AuctionIntentRow({ intent, onCancel, onClick, isCancelling, compact }: AuctionIntentRowProps) {
  const [countdown, setCountdown] = useState<string>('');
  const [currentDutchPrice, setCurrentDutchPrice] = useState<bigint | null>(null);
  const [priceProgress, setPriceProgress] = useState<number>(0);

  const inputSymbol = getTokenSymbol(intent.inputToken);
  const outputSymbol = getTokenSymbol(intent.outputToken);
  const inputDecimals = getTokenDecimals(intent.inputToken);
  const outputDecimals = getTokenDecimals(intent.outputToken);
  const formattedInput = formatAmount(intent.amountIn, inputDecimals);

  const isSealedBid = intent.auctionType === 'sealed-bid';
  const isDutch = intent.auctionType === 'dutch';
  const isActive = intent.auctionStatus === 'active';
  const isCompleted = intent.auctionStatus === 'completed' || intent.status === 'filled';
  const isCancelled = intent.auctionStatus === 'cancelled' || intent.status === 'cancelled';

  const formattedOutput = intent.outputAmount
    ? formatAmount(intent.outputAmount, outputDecimals)
    : null;

  // Calculate Dutch auction current price
  const calculateDutchPrice = useCallback(() => {
    if (!isDutch || !intent.auctionStartTime || !intent.auctionDuration) return;
    if (!intent.auctionStartPrice || !intent.auctionEndPrice) return;

    const now = Math.floor(Date.now() / 1000);
    const elapsed = now - intent.auctionStartTime;
    const duration = intent.auctionDuration;

    if (elapsed >= duration) {
      setCurrentDutchPrice(intent.auctionEndPrice);
      setPriceProgress(100);
      return;
    }

    const startPrice = Number(intent.auctionStartPrice);
    const endPrice = Number(intent.auctionEndPrice);
    const priceDiff = startPrice - endPrice;
    const currentPrice = startPrice - (priceDiff * elapsed / duration);

    setCurrentDutchPrice(BigInt(Math.floor(currentPrice)));
    setPriceProgress((elapsed / duration) * 100);
  }, [isDutch, intent.auctionStartTime, intent.auctionDuration, intent.auctionStartPrice, intent.auctionEndPrice]);

  // Update countdown timer
  useEffect(() => {
    if (!isActive) return;

    const updateCountdown = () => {
      const now = Math.floor(Date.now() / 1000);
      let endTime = 0;

      if (isDutch && intent.auctionStartTime && intent.auctionDuration) {
        endTime = intent.auctionStartTime + intent.auctionDuration;
      } else if (isSealedBid && intent.auctionEndTime) {
        endTime = intent.auctionEndTime;
      }

      if (endTime === 0) return;

      const diff = endTime - now;
      if (diff <= 0) {
        setCountdown('Ended');
        return;
      }

      const hours = Math.floor(diff / 3600);
      const mins = Math.floor((diff % 3600) / 60);
      const secs = diff % 60;

      if (hours > 0) {
        setCountdown(`${hours}h ${mins}m ${secs}s`);
      } else if (mins > 0) {
        setCountdown(`${mins}m ${secs}s`);
      } else {
        setCountdown(`${secs}s`);
      }

      // Update Dutch price
      if (isDutch) calculateDutchPrice();
    };

    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);
    return () => clearInterval(timer);
  }, [isActive, isDutch, isSealedBid, intent.auctionStartTime, intent.auctionDuration, intent.auctionEndTime, calculateDutchPrice]);

  return (
    <div
      className="flex flex-col gap-3 p-4 rounded-lg bg-card border border-border hover:border-primary/30 transition-colors cursor-pointer"
      onClick={onClick}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {isSealedBid ? (
            <Gavel className="h-4 w-4 text-primary" />
          ) : (
            <TrendingDown className="h-4 w-4 text-amber-400" />
          )}
          <span className={`text-xs uppercase font-medium ${isSealedBid ? 'text-primary' : 'text-amber-400'}`}>
            {isSealedBid ? 'Sealed-Bid Auction' : 'Dutch Auction'}
          </span>
          <span className="text-sm font-semibold">{inputSymbol} → {outputSymbol}</span>
        </div>
        <div className="flex items-center gap-2">
          {!compact && <span className="text-xs text-muted-foreground">{formatTime(intent.createdAt)}</span>}
          <IntentStatusBadge status={isCompleted ? 'filled' : isCancelled ? 'cancelled' : intent.status} />
          {isActive && onCancel && (
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => { e.stopPropagation(); onCancel(intent.id); }}
              disabled={isCancelling}
              className="h-7 w-7 p-0 text-muted-foreground hover:text-destructive"
            >
              {isCancelling ? <Loader2 className="h-4 w-4 animate-spin" /> : <X className="h-4 w-4" />}
            </Button>
          )}
        </div>
      </div>

      {/* Amount Display */}
      <div className="p-3 rounded-md bg-muted/50 border border-border">
        <span className="text-xs text-muted-foreground">Swap Amount</span>
        <p className="text-lg font-bold">{formattedInput} {inputSymbol}</p>
      </div>

      {/* Dutch Auction Price Curve */}
      {isDutch && isActive && intent.auctionStartPrice && intent.auctionEndPrice && (
        <div className="space-y-2 p-3 rounded-md bg-amber-500/10 border border-amber-500/20">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <TrendingDown className="h-4 w-4 text-amber-400" />
              <span className="text-muted-foreground">Price Descending</span>
            </div>
            {currentDutchPrice && (
              <span className="font-bold text-amber-400">
                Current: {formatPrice(currentDutchPrice)} {outputSymbol}/{inputSymbol}
              </span>
            )}
          </div>
          <Progress value={priceProgress} className="h-2 bg-amber-900/30" />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Start: {formatPrice(intent.auctionStartPrice)}</span>
            <span>End: {formatPrice(intent.auctionEndPrice)}</span>
          </div>
        </div>
      )}

      {/* Sealed-Bid Auction Info */}
      {isSealedBid && isActive && (
        <div className="p-3 rounded-md bg-primary/10 border border-primary/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-primary" />
              <span className="text-sm text-muted-foreground">Bids Received</span>
            </div>
            <span className="text-lg font-bold text-primary">{intent.bidCount ?? 0}</span>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Solvers submit sealed bids. Winner revealed at auction end.
          </p>
        </div>
      )}

      {/* Countdown Timer */}
      {isActive && countdown && (
        <div className="flex items-center gap-2 p-2 rounded-md bg-muted/50 border border-border">
          <Timer className={`h-4 w-4 ${isSealedBid ? 'text-primary' : 'text-amber-400'}`} />
          <span className="text-sm text-muted-foreground">
            {isSealedBid ? 'Bidding ends in:' : 'Auction ends in:'}
          </span>
          <span className={`text-sm font-bold ${isSealedBid ? 'text-primary' : 'text-amber-400'}`}>
            {countdown}
          </span>
        </div>
      )}

      {/* Completed Result */}
      {isCompleted && (
        <div className="p-3 rounded-md bg-primary/10 border border-primary/20">
          <div className="flex items-center gap-2 mb-2">
            <Trophy className="h-5 w-5 text-primary" />
            <span className="font-semibold text-primary">Auction Completed!</span>
          </div>
          <div className="grid grid-cols-2 gap-3 text-sm">
            {formattedOutput && (
              <div>
                <span className="text-xs text-muted-foreground">Received</span>
                <p className="font-bold text-primary">{formattedOutput} {outputSymbol}</p>
              </div>
            )}
            {intent.auctionAcceptedPrice && (
              <div>
                <span className="text-xs text-muted-foreground">
                  {isSealedBid ? 'Winning Bid' : 'Accepted Price'}
                </span>
                <p className="font-bold">{formatPrice(intent.auctionAcceptedPrice)}</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Winner Info */}
      {isCompleted && (intent.auctionWinner || intent.solver) && (
        <div className="flex items-center gap-2 p-2 rounded-md bg-muted/30 border border-border/50">
          <User className="h-4 w-4 text-muted-foreground" />
          <span className="text-xs text-muted-foreground">
            {isSealedBid ? 'Winning Solver:' : 'Accepted by:'}
          </span>
          <a
            href={`https://explorer.movementnetwork.xyz/account/${intent.auctionWinner || intent.solver}?network=testnet`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-mono text-primary hover:underline"
            onClick={(e) => e.stopPropagation()}
          >
            {truncateAddress(intent.auctionWinner || intent.solver || '')}
          </a>
        </div>
      )}

      {/* Transaction Links */}
      <div className="flex items-center gap-4 text-xs flex-wrap pt-2 border-t border-border/50">
        {intent.submissionTxHash && (
          <a
            href={getExplorerUrl(intent.submissionTxHash)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
            onClick={(e) => e.stopPropagation()}
          >
            <ArrowUpRight className="h-3 w-3" />
            <span>Created: {formatTxHash(intent.submissionTxHash)}</span>
          </a>
        )}
        {isCompleted && intent.settlementTxHash && (
          <a
            href={getExplorerUrl(intent.settlementTxHash)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-primary hover:text-primary/80 transition-colors"
            onClick={(e) => e.stopPropagation()}
          >
            <Check className="h-3 w-3" />
            <span>Settled: {formatTxHash(intent.settlementTxHash)}</span>
          </a>
        )}
      </div>
    </div>
  );
}
