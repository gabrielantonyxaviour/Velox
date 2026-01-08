'use client';

import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { IntentRecord } from '@/app/lib/velox/types';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { TOKEN_LIST } from '@/app/constants/tokens';
import {
  ArrowRight, ChevronRight, Gavel, TrendingDown, Timer,
  Trophy, Users, Clock, User,
} from 'lucide-react';

const STATUS_COLORS: Record<string, string> = {
  pending: 'bg-amber-500/10 text-amber-400',
  filled: 'bg-primary/10 text-primary',
  partially_filled: 'bg-primary/10 text-primary',
  cancelled: 'bg-muted text-muted-foreground',
  expired: 'bg-destructive/10 text-destructive',
};

interface ExplorerAuctionRowProps {
  intent: IntentRecord;
}

function formatAmount(amount: bigint, decimals: number = 8): string {
  const divisor = BigInt(10 ** decimals);
  const whole = amount / divisor;
  const fraction = amount % divisor;
  const fractionStr = fraction.toString().padStart(decimals, '0').slice(0, 2);
  return `${whole}.${fractionStr}`;
}

function formatPrice(price: bigint): string {
  return (Number(price) / 10000).toFixed(4);
}

function getTokenSymbol(address: string): string {
  const token = TOKEN_LIST.find((t) => t.address === address);
  return token?.symbol || address.slice(0, 6) + '...';
}

function getTokenDecimals(address: string): number {
  const token = TOKEN_LIST.find((t) => t.address === address);
  return token?.decimals || 8;
}

function formatTime(timestamp: number): string {
  if (!timestamp) return '--';
  const date = new Date(timestamp * 1000);
  return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function truncateAddress(addr: string): string {
  return addr.slice(0, 6) + '...' + addr.slice(-4);
}

export function ExplorerAuctionRow({ intent }: ExplorerAuctionRowProps) {
  const [countdown, setCountdown] = useState<string>('');
  const [priceProgress, setPriceProgress] = useState<number>(0);
  const [currentDutchPrice, setCurrentDutchPrice] = useState<bigint | null>(null);

  const inputSymbol = getTokenSymbol(intent.inputToken);
  const outputSymbol = getTokenSymbol(intent.outputToken);
  const inputDecimals = getTokenDecimals(intent.inputToken);
  const outputDecimals = getTokenDecimals(intent.outputToken);

  const isSealedBid = intent.auctionType === 'sealed-bid';
  const isDutch = intent.auctionType === 'dutch';
  const isActive = intent.auctionStatus === 'active';
  const isCompleted = intent.auctionStatus === 'completed' || intent.status === 'filled';

  // Calculate Dutch auction current price and countdown
  const updateDutchState = useCallback(() => {
    if (!isDutch || !intent.auctionStartTime || !intent.auctionDuration) return;
    if (!intent.auctionStartPrice || !intent.auctionEndPrice) return;

    const now = Math.floor(Date.now() / 1000);
    const elapsed = now - intent.auctionStartTime;
    const duration = intent.auctionDuration;
    const remaining = Math.max(0, duration - elapsed);

    // Update countdown
    if (remaining <= 0) {
      setCountdown('Ended');
    } else if (remaining < 60) {
      setCountdown(`${remaining}s`);
    } else if (remaining < 3600) {
      setCountdown(`${Math.floor(remaining / 60)}m`);
    } else {
      setCountdown(`${Math.floor(remaining / 3600)}h`);
    }

    // Update price
    if (elapsed >= duration) {
      setCurrentDutchPrice(intent.auctionEndPrice);
      setPriceProgress(100);
    } else {
      const startPrice = Number(intent.auctionStartPrice);
      const endPrice = Number(intent.auctionEndPrice);
      const priceDiff = startPrice - endPrice;
      const currentPrice = startPrice - (priceDiff * elapsed / duration);
      setCurrentDutchPrice(BigInt(Math.floor(currentPrice)));
      setPriceProgress((elapsed / duration) * 100);
    }
  }, [isDutch, intent.auctionStartTime, intent.auctionDuration, intent.auctionStartPrice, intent.auctionEndPrice]);

  // Sealed-bid countdown
  const updateSealedBidCountdown = useCallback(() => {
    if (!isSealedBid || !intent.auctionEndTime) return;

    const now = Math.floor(Date.now() / 1000);
    const remaining = Math.max(0, intent.auctionEndTime - now);

    if (remaining <= 0) {
      setCountdown('Ended');
    } else if (remaining < 60) {
      setCountdown(`${remaining}s`);
    } else if (remaining < 3600) {
      setCountdown(`${Math.floor(remaining / 60)}m`);
    } else {
      setCountdown(`${Math.floor(remaining / 3600)}h`);
    }
  }, [isSealedBid, intent.auctionEndTime]);

  useEffect(() => {
    if (!isActive) return;

    if (isDutch) {
      updateDutchState();
      const timer = setInterval(updateDutchState, 1000);
      return () => clearInterval(timer);
    } else if (isSealedBid) {
      updateSealedBidCountdown();
      const timer = setInterval(updateSealedBidCountdown, 1000);
      return () => clearInterval(timer);
    }
  }, [isActive, isDutch, isSealedBid, updateDutchState, updateSealedBidCountdown]);

  return (
    <Link
      href={`/explorer/intent/${intent.id.toString()}`}
      className="block p-3 hover:bg-muted/50 text-sm cursor-pointer"
    >
      {/* Header Row */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          {isSealedBid ? (
            <Gavel className="h-4 w-4 text-primary" />
          ) : (
            <TrendingDown className="h-4 w-4 text-primary" />
          )}
          <Badge className="text-xs bg-primary/10 text-primary">
            {isSealedBid ? 'Sealed Bid Swap' : 'Dutch Auction Swap'}
          </Badge>
          <span className="text-muted-foreground">#{intent.id.toString()}</span>
        </div>
        <div className="flex items-center gap-2">
          {isCompleted ? (
            <Badge className="bg-primary/10 text-primary text-xs">
              <Trophy className="h-3 w-3 mr-1" />COMPLETED
            </Badge>
          ) : (
            <Badge className={STATUS_COLORS[intent.status] + ' text-xs'}>
              {isActive ? 'ACTIVE' : intent.status.toUpperCase()}
            </Badge>
          )}
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
        </div>
      </div>

      {/* Amount & Details Row */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="font-medium">{formatAmount(intent.amountIn, inputDecimals)} {inputSymbol}</span>
          <ArrowRight className="h-3 w-3 text-muted-foreground" />
          {isCompleted && intent.outputAmount ? (
            <span className="text-primary font-medium">
              {formatAmount(intent.outputAmount, outputDecimals)} {outputSymbol}
            </span>
          ) : (
            <span>{outputSymbol}</span>
          )}
        </div>

        <div className="flex items-center gap-3 text-xs">
          {/* Sealed-bid: show bid count */}
          {isSealedBid && isActive && (
            <div className="flex items-center gap-1 text-primary">
              <Users className="h-3 w-3" />
              <span>{intent.bidCount ?? 0} bids</span>
            </div>
          )}

          {/* Dutch: show current price */}
          {isDutch && isActive && currentDutchPrice && (
            <div className="flex items-center gap-1 text-primary">
              <span className="font-medium">{formatPrice(currentDutchPrice)}</span>
            </div>
          )}

          {/* Countdown for active auctions */}
          {isActive && countdown && (
            <div className={`flex items-center gap-1 ${countdown === 'Ended' ? 'text-muted-foreground' : 'text-primary'}`}>
              <Timer className="h-3 w-3" />
              <span className="font-medium">{countdown}</span>
            </div>
          )}

          {/* Winner for completed */}
          {isCompleted && (intent.auctionWinner || intent.solver) && (
            <div className="flex items-center gap-1 text-muted-foreground">
              <User className="h-3 w-3" />
              <span>{truncateAddress(intent.auctionWinner || intent.solver || '')}</span>
            </div>
          )}

          <span className="text-muted-foreground">{formatTime(intent.createdAt)}</span>
        </div>
      </div>

      {/* Dutch Auction Price Progress */}
      {isDutch && isActive && intent.auctionStartPrice && intent.auctionEndPrice && (
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">{formatPrice(intent.auctionStartPrice)}</span>
          <Progress value={priceProgress} className="h-1.5 flex-1 bg-primary/30" />
          <span className="text-xs text-muted-foreground">{formatPrice(intent.auctionEndPrice)}</span>
        </div>
      )}
    </Link>
  );
}
