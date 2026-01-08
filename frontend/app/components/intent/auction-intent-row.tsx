'use client';

import { IntentRecord } from '@/app/lib/velox/types';
import { IntentStatusBadge } from './intent-status-badge';
import { Button } from '../ui/button';
import { TOKEN_LIST } from '@/app/constants/tokens';
import { X, Gavel, TrendingDown, Loader2 } from 'lucide-react';

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
  const inputSymbol = getTokenSymbol(intent.inputToken);
  const outputSymbol = getTokenSymbol(intent.outputToken);
  const inputDecimals = getTokenDecimals(intent.inputToken);
  const outputDecimals = getTokenDecimals(intent.outputToken);

  const isSealedBid = intent.auctionType === 'sealed-bid';
  const isDutch = intent.auctionType === 'dutch';
  const isActive = intent.auctionStatus === 'active';
  const isCompleted = intent.auctionStatus === 'completed' || intent.status === 'filled';

  const formattedOutput = intent.outputAmount
    ? formatAmount(intent.outputAmount, outputDecimals)
    : null;

  return (
    <div
      className="flex items-center justify-between p-3 rounded-lg bg-card border border-border hover:border-primary/30 transition-colors cursor-pointer"
      onClick={onClick}
    >
      <div className="flex items-center gap-3">
        {isSealedBid ? (
          <Gavel className="h-4 w-4 text-primary" />
        ) : (
          <TrendingDown className="h-4 w-4 text-amber-400" />
        )}
        <div>
          <div className="flex items-center gap-2">
            <span className={`text-xs uppercase ${isSealedBid ? 'text-primary' : 'text-amber-400'}`}>
              {isSealedBid ? 'Sealed Bid Swap' : 'Dutch Auction Swap'}
            </span>
            {isActive && (
              <span className="text-xs px-1.5 py-0.5 rounded bg-primary/10 text-primary">Live</span>
            )}
          </div>
          <p className="text-sm font-medium">
            {formatAmount(intent.amountIn, inputDecimals)} {inputSymbol} → {formattedOutput ? `${formattedOutput} ` : ''}{outputSymbol}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-xs text-muted-foreground">{formatTime(intent.createdAt)}</span>
        <IntentStatusBadge status={isCompleted ? 'filled' : intent.status} />
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
  );
}
