'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import Link from 'next/link';
import { IntentRecord } from '@/app/lib/velox/types';
import { Badge } from '../ui/badge';
import { TOKEN_LIST } from '@/app/constants/tokens';
import {
  ArrowRight, ChevronRight, Gavel, TrendingDown, Timer,
  Trophy, Users, User,
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
  // Prices are stored as token amounts with 8 decimals
  return (Number(price) / 1e8).toFixed(4);
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

// Mini Dutch auction curve component
function MiniDutchCurve({
  startPrice,
  endPrice,
  duration,
  elapsed,
  currentPrice,
}: {
  startPrice: bigint;
  endPrice: bigint;
  duration: number;
  elapsed: number;
  currentPrice: bigint;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const width = rect.width;
    const height = rect.height;
    const padding = { left: 2, right: 2, top: 2, bottom: 2 };
    const chartWidth = width - padding.left - padding.right;
    const chartHeight = height - padding.top - padding.bottom;

    // Clear
    ctx.clearRect(0, 0, width, height);

    const startNum = Number(startPrice);
    const endNum = Number(endPrice);
    const priceRange = startNum - endNum;
    if (priceRange <= 0) return;

    const priceToY = (price: number): number => {
      const fromTop = (startNum - price) / priceRange;
      return padding.top + fromTop * chartHeight;
    };

    const timeToX = (t: number): number => {
      return padding.left + (t / duration) * chartWidth;
    };

    // Draw background gradient
    const gradient = ctx.createLinearGradient(padding.left, 0, width - padding.right, 0);
    gradient.addColorStop(0, 'hsla(35, 92%, 65%, 0.2)');
    gradient.addColorStop(1, 'hsla(35, 92%, 65%, 0.05)');

    ctx.beginPath();
    ctx.moveTo(padding.left, priceToY(startNum));
    for (let t = 0; t <= duration; t += duration / 20) {
      const price = startNum - (priceRange * t) / duration;
      ctx.lineTo(timeToX(t), priceToY(price));
    }
    ctx.lineTo(timeToX(duration), height - padding.bottom);
    ctx.lineTo(padding.left, height - padding.bottom);
    ctx.closePath();
    ctx.fillStyle = gradient;
    ctx.fill();

    // Draw the curve (elapsed portion in primary color)
    const actualElapsed = Math.min(elapsed, duration);
    ctx.beginPath();
    ctx.strokeStyle = 'hsl(35, 92%, 65%)';
    ctx.lineWidth = 1.5;
    ctx.moveTo(padding.left, priceToY(startNum));
    for (let t = 0; t <= actualElapsed; t += duration / 20) {
      const price = startNum - (priceRange * t) / duration;
      ctx.lineTo(timeToX(t), priceToY(price));
    }
    ctx.stroke();

    // Draw remaining portion (muted)
    if (actualElapsed < duration) {
      ctx.beginPath();
      ctx.strokeStyle = 'hsla(0, 0%, 50%, 0.3)';
      ctx.lineWidth = 1;
      ctx.setLineDash([2, 2]);
      const remainingStart = startNum - (priceRange * actualElapsed) / duration;
      ctx.moveTo(timeToX(actualElapsed), priceToY(remainingStart));
      for (let t = actualElapsed; t <= duration; t += duration / 20) {
        const price = startNum - (priceRange * t) / duration;
        ctx.lineTo(timeToX(t), priceToY(price));
      }
      ctx.stroke();
      ctx.setLineDash([]);
    }

    // Draw current position indicator
    if (actualElapsed < duration && actualElapsed > 0) {
      const currentY = priceToY(Number(currentPrice));
      const currentX = timeToX(actualElapsed);
      ctx.beginPath();
      ctx.arc(currentX, currentY, 3, 0, Math.PI * 2);
      ctx.fillStyle = 'hsl(35, 92%, 65%)';
      ctx.fill();
    }
  }, [startPrice, endPrice, duration, elapsed, currentPrice]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-[40px]"
      style={{ display: 'block' }}
    />
  );
}

export function ExplorerAuctionRow({ intent }: ExplorerAuctionRowProps) {
  const [countdown, setCountdown] = useState<string>('');
  const [elapsedTime, setElapsedTime] = useState<number>(0);
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

    // Update elapsed time for curve
    setElapsedTime(elapsed);

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
    } else {
      const startPrice = Number(intent.auctionStartPrice);
      const endPrice = Number(intent.auctionEndPrice);
      const priceDiff = startPrice - endPrice;
      const currentPrice = startPrice - (priceDiff * elapsed / duration);
      setCurrentDutchPrice(BigInt(Math.floor(currentPrice)));
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

      {/* Dutch Auction Price Curve */}
      {isDutch && intent.auctionStartPrice && intent.auctionEndPrice && intent.auctionDuration && (
        <div className="space-y-1">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>{formatPrice(intent.auctionStartPrice)}</span>
            <span className="text-amber-400">{currentDutchPrice ? formatPrice(currentDutchPrice) : '--'}</span>
            <span>{formatPrice(intent.auctionEndPrice)}</span>
          </div>
          <div className="rounded border border-amber-500/20 overflow-hidden bg-background/50">
            <MiniDutchCurve
              startPrice={intent.auctionStartPrice}
              endPrice={intent.auctionEndPrice}
              duration={intent.auctionDuration}
              elapsed={elapsedTime}
              currentPrice={currentDutchPrice ?? intent.auctionStartPrice}
            />
          </div>
        </div>
      )}
    </Link>
  );
}
