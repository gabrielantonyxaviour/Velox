'use client';

import { IntentRecord, isAuctionActive, getAuctionTypeDisplay } from '@/app/lib/velox/types';
import { IntentStatusBadge } from './intent-status-badge';
import { Button } from '../ui/button';
import { TOKEN_LIST } from '@/app/constants/tokens';
import { X, Gavel, TrendingDown, Loader2, Users, Trophy } from 'lucide-react';

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
  const fractionStr = fraction.toString().padStart(decimals, '0').slice(0, 2);
  return `${whole}.${fractionStr}`;
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

function getTokenSymbol(address: string): string {
  const token = TOKEN_LIST.find((t) => t.address === address);
  return token?.symbol || address.slice(0, 6) + '...';
}

function getTokenDecimals(address: string): number {
  const token = TOKEN_LIST.find((t) => t.address === address);
  return token?.decimals || 8;
}

export function AuctionIntentRow({ intent, onCancel, onClick, isCancelling }: AuctionIntentRowProps) {
  const { intent: swapIntent, auction } = intent;
  const inputSymbol = getTokenSymbol(swapIntent.inputToken);
  const outputSymbol = getTokenSymbol(swapIntent.outputToken);
  const inputDecimals = getTokenDecimals(swapIntent.inputToken);
  const outputDecimals = getTokenDecimals(swapIntent.outputToken);

  const isSealedBid = auction.type === 'sealed_bid_active' || auction.type === 'sealed_bid_completed';
  const isDutch = auction.type === 'dutch_active' || auction.type === 'dutch_accepted';
  const isActive = isAuctionActive(intent);
  const isCompleted = intent.status === 'filled' || auction.type === 'sealed_bid_completed' || auction.type === 'dutch_accepted';
  const isFailed = auction.type === 'failed';

  const formattedOutput = intent.totalOutputReceived > 0n
    ? formatAmount(intent.totalOutputReceived, outputDecimals)
    : null;

  // Get bid count for sealed-bid auctions
  const bidCount = auction.bids?.length ?? 0;

  // Get winner info
  const hasWinner = !!auction.winner;
  const winnerShort = auction.winner ? `${auction.winner.slice(0, 6)}...` : '';

  return (
    <div
      className="flex items-center justify-between p-3 rounded-lg bg-card border border-border hover:border-primary/30 transition-colors cursor-pointer"
      onClick={onClick}
    >
      <div className="flex items-center gap-3">
        {isSealedBid ? (
          <Gavel className="h-4 w-4 text-primary" />
        ) : (
          <TrendingDown className="h-4 w-4 text-primary" />
        )}
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase text-primary">
              {isSealedBid ? 'Sealed Bid' : isDutch ? 'Dutch Auction' : 'Auction'}
            </span>
            {isActive && (
              <span className="text-xs px-1.5 py-0.5 rounded bg-primary/10 text-primary animate-pulse">Live</span>
            )}
            {isFailed && (
              <span className="text-xs px-1.5 py-0.5 rounded bg-destructive/10 text-destructive">Failed</span>
            )}
          </div>
          <p className="text-sm font-medium">
            {formatAmount(swapIntent.amountIn ?? 0n, inputDecimals)} {inputSymbol} → {formattedOutput ? `${formattedOutput} ` : ''}{outputSymbol}
          </p>
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            {isSealedBid && bidCount > 0 && (
              <span className="flex items-center gap-1">
                <Users className="h-3 w-3" />
                {bidCount} bid{bidCount !== 1 ? 's' : ''}
              </span>
            )}
            {hasWinner && (
              <span className="flex items-center gap-1 text-green-400">
                <Trophy className="h-3 w-3" />
                {winnerShort}
              </span>
            )}
            {isDutch && auction.acceptedPrice && (
              <span>
                Price: {formatAmount(auction.acceptedPrice, outputDecimals)}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-xs text-muted-foreground">{formatTime(intent.createdAt)}</span>
        <IntentStatusBadge status={isCompleted ? 'filled' : isFailed ? 'cancelled' : intent.status} record={intent} />
        {intent.status === 'active' && onCancel && (
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
  );
}
