'use client';

import Link from 'next/link';
import { IntentRecord } from '@/app/lib/velox/types';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { TOKEN_LIST } from '@/app/constants/tokens';
import {
  ArrowRight, ChevronRight, Target, Check, Clock, User,
  DollarSign, Percent,
} from 'lucide-react';

const STATUS_COLORS: Record<string, string> = {
  pending: 'bg-amber-500/10 text-amber-400',
  filled: 'bg-primary/10 text-primary',
  partially_filled: 'bg-primary/10 text-primary',
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
  const inputSymbol = getTokenSymbol(intent.inputToken);
  const outputSymbol = getTokenSymbol(intent.outputToken);
  const inputDecimals = getTokenDecimals(intent.inputToken);
  const outputDecimals = getTokenDecimals(intent.outputToken);

  const isFilled = intent.status === 'filled';
  const isPartiallyFilled = intent.status === 'partially_filled';
  const isPending = intent.status === 'pending';
  const isActive = isPending || isPartiallyFilled;

  const limitPrice = intent.limitPrice ?? BigInt(0);

  // Calculate fill percentage
  const fillPercentage = intent.amountIn > BigInt(0)
    ? (Number(intent.filledAmount) / Number(intent.amountIn)) * 100
    : 0;

  // Time remaining
  const timeRemaining = isActive && intent.deadline
    ? Math.max(0, intent.deadline - Math.floor(Date.now() / 1000))
    : null;

  const formatTimeRemaining = (seconds: number): string => {
    if (seconds <= 0) return 'Expired';
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h`;
    return `${Math.floor(seconds / 86400)}d`;
  };

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
          {intent.partialFillAllowed && (
            <Badge className="bg-muted text-muted-foreground text-xs">Partial</Badge>
          )}
          <span className="text-muted-foreground">#{intent.id.toString()}</span>
        </div>
        <div className="flex items-center gap-2">
          <Badge className={STATUS_COLORS[intent.status] + ' text-xs'}>
            {intent.status.toUpperCase().replace('_', ' ')}
          </Badge>
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
        </div>
      </div>

      {/* Order Details Row */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="font-medium">{formatAmount(intent.amountIn, inputDecimals)} {inputSymbol}</span>
          <ArrowRight className="h-3 w-3 text-muted-foreground" />
          {isFilled && intent.outputAmount ? (
            <span className="text-primary font-medium">
              {formatAmount(intent.outputAmount, outputDecimals)} {outputSymbol}
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
          {isFilled && intent.solver && (
            <div className="flex items-center gap-1 text-muted-foreground">
              <User className="h-3 w-3" />
              <span>{truncateAddress(intent.solver)}</span>
            </div>
          )}

          {/* Time remaining for pending */}
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
      {(isPartiallyFilled || (intent.partialFillAllowed && fillPercentage > 0)) && (
        <div className="flex items-center gap-2">
          <Progress value={fillPercentage} className="h-1.5 flex-1" />
          <span className="text-xs text-muted-foreground">{fillPercentage.toFixed(0)}%</span>
        </div>
      )}
    </Link>
  );
}
