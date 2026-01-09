'use client';

import Link from 'next/link';
import {
  IntentRecord,
  isPartiallyFilled,
  getFillPercentage,
  getFilledAmount,
  getIntentTotalAmount,
} from '@/app/lib/velox/types';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { TOKEN_LIST } from '@/app/constants/tokens';
import {
  ArrowRight, ChevronRight, Target, Check, Clock, User,
  DollarSign, Percent,
} from 'lucide-react';

const STATUS_COLORS: Record<string, string> = {
  active: 'bg-amber-500/10 text-amber-400',
  filled: 'bg-primary/10 text-primary',
  cancelled: 'bg-muted text-muted-foreground',
  expired: 'bg-destructive/10 text-destructive',
};

interface ExplorerLimitRowProps {
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

export function ExplorerLimitRow({ intent }: ExplorerLimitRowProps) {
  const { intent: limitIntent } = intent;
  const inputSymbol = getTokenSymbol(limitIntent.inputToken);
  const outputSymbol = getTokenSymbol(limitIntent.outputToken);
  const inputDecimals = getTokenDecimals(limitIntent.inputToken);
  const outputDecimals = getTokenDecimals(limitIntent.outputToken);

  const isFilled = intent.status === 'filled';
  const isActive = intent.status === 'active';
  const hasPartialFill = isPartiallyFilled(intent);

  const limitPrice = limitIntent.limitPrice ?? BigInt(0);

  // Calculate fill percentage from escrow remaining
  const fillPercentage = getFillPercentage(intent);

  // Time remaining (use expiry for limit orders)
  const timeRemaining = isActive && limitIntent.expiry
    ? Math.max(0, limitIntent.expiry - Math.floor(Date.now() / 1000))
    : null;

  const formatTimeRemaining = (seconds: number): string => {
    if (seconds <= 0) return 'Expired';
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h`;
    return `${Math.floor(seconds / 86400)}d`;
  };

  // Get solver from fills if available
  const solver = intent.fills.length > 0 ? intent.fills[0].solver : null;

  // Total input amount
  const totalAmount = getIntentTotalAmount(limitIntent);

  return (
    <Link
      href={`/explorer/intent/${intent.id.toString()}`}
      className="block p-3 hover:bg-muted/50 text-sm cursor-pointer"
    >
      {/* Header Row */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Target className="h-4 w-4 text-primary" />
          <Badge className="bg-primary/10 text-primary text-xs">Limit</Badge>
          {/* All limit orders support partial fills now (max 5) */}
          {hasPartialFill && (
            <Badge className="bg-muted text-muted-foreground text-xs">Partial</Badge>
          )}
          <span className="text-muted-foreground">#{intent.id.toString()}</span>
        </div>
        <div className="flex items-center gap-2">
          <Badge className={STATUS_COLORS[intent.status] + ' text-xs'}>
            {hasPartialFill ? 'PARTIAL' : intent.status.toUpperCase()}
          </Badge>
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
        </div>
      </div>

      {/* Order Details Row */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="font-medium">{formatAmount(totalAmount, inputDecimals)} {inputSymbol}</span>
          <ArrowRight className="h-3 w-3 text-muted-foreground" />
          {(isFilled || hasPartialFill) && intent.totalOutputReceived > 0n ? (
            <span className="text-primary font-medium">
              {formatAmount(intent.totalOutputReceived, outputDecimals)} {outputSymbol}
            </span>
          ) : (
            <span>{outputSymbol}</span>
          )}
        </div>

        <div className="flex items-center gap-3 text-xs">
          {/* Limit price */}
          <div className="flex items-center gap-1 text-primary">
            <DollarSign className="h-3 w-3" />
            <span className="font-medium">{formatPrice(limitPrice)}</span>
          </div>

          {/* Solver for filled orders */}
          {(isFilled || hasPartialFill) && solver && (
            <div className="flex items-center gap-1 text-muted-foreground">
              <User className="h-3 w-3" />
              <span>{truncateAddress(solver)}</span>
            </div>
          )}

          {/* Time remaining for active */}
          {isActive && timeRemaining !== null && (
            <div className={`flex items-center gap-1 ${timeRemaining < 3600 ? 'text-amber-400' : 'text-muted-foreground'}`}>
              <Clock className="h-3 w-3" />
              <span>{formatTimeRemaining(timeRemaining)}</span>
            </div>
          )}

          <span className="text-muted-foreground">{formatTime(intent.createdAt)}</span>
        </div>
      </div>

      {/* Partial Fill Progress */}
      {hasPartialFill && fillPercentage > 0 && (
        <div className="flex items-center gap-2">
          <Progress value={fillPercentage} className="h-1.5 flex-1" />
          <span className="text-xs text-muted-foreground">{fillPercentage.toFixed(0)}%</span>
        </div>
      )}
    </Link>
  );
}
