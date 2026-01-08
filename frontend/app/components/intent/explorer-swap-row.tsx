'use client';

import Link from 'next/link';
import { IntentRecord } from '@/app/lib/velox/types';
import { Badge } from '../ui/badge';
import { TOKEN_LIST } from '@/app/constants/tokens';
import {
  ArrowRight, ChevronRight, Zap, Check, Clock, User,
  TrendingUp, TrendingDown,
} from 'lucide-react';

const STATUS_COLORS: Record<string, string> = {
  pending: 'bg-amber-500/10 text-amber-400',
  filled: 'bg-primary/10 text-primary',
  partially_filled: 'bg-primary/10 text-primary',
  cancelled: 'bg-muted text-muted-foreground',
  expired: 'bg-destructive/10 text-destructive',
};

interface ExplorerSwapRowProps {
  intent: IntentRecord;
}

function formatAmount(amount: bigint, decimals: number = 8): string {
  const divisor = BigInt(10 ** decimals);
  const whole = amount / divisor;
  const fraction = amount % divisor;
  const fractionStr = fraction.toString().padStart(decimals, '0').slice(0, 2);
  return `${whole}.${fractionStr}`;
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

function calculateSlippage(expected: bigint, actual: bigint): number {
  if (expected === BigInt(0)) return 0;
  const diff = Number(expected - actual);
  return (diff / Number(expected)) * 100;
}

export function ExplorerSwapRow({ intent }: ExplorerSwapRowProps) {
  const inputSymbol = getTokenSymbol(intent.inputToken);
  const outputSymbol = getTokenSymbol(intent.outputToken);
  const inputDecimals = getTokenDecimals(intent.inputToken);
  const outputDecimals = getTokenDecimals(intent.outputToken);

  const isFilled = intent.status === 'filled';
  const isPending = intent.status === 'pending';

  // Calculate slippage if filled
  const slippage = isFilled && intent.minAmountOut && intent.outputAmount
    ? calculateSlippage(intent.minAmountOut, intent.outputAmount)
    : null;

  // Time remaining for pending
  const timeRemaining = isPending && intent.deadline
    ? Math.max(0, intent.deadline - Math.floor(Date.now() / 1000))
    : null;

  const formatTimeRemaining = (seconds: number): string => {
    if (seconds <= 0) return 'Expired';
    if (seconds < 60) return `${seconds}s`;
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m`;
    return `${Math.floor(seconds / 3600)}h`;
  };

  return (
    <Link
      href={`/explorer/intent/${intent.id.toString()}`}
      className="block p-3 hover:bg-muted/50 text-sm cursor-pointer"
    >
      {/* Header Row */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Zap className="h-4 w-4 text-primary" />
          <Badge className="bg-primary/10 text-primary text-xs">Swap</Badge>
          <span className="text-muted-foreground">#{intent.id.toString()}</span>
        </div>
        <div className="flex items-center gap-2">
          <Badge className={STATUS_COLORS[intent.status] + ' text-xs'}>
            {intent.status.toUpperCase()}
          </Badge>
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
        </div>
      </div>

      {/* Amount & Details Row */}
      <div className="flex items-center justify-between">
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
          {/* Slippage indicator for filled swaps */}
          {isFilled && slippage !== null && (
            <div className={`flex items-center gap-1 ${slippage > 0 ? 'text-destructive' : 'text-primary'}`}>
              {slippage > 0 ? (
                <TrendingDown className="h-3 w-3" />
              ) : (
                <TrendingUp className="h-3 w-3" />
              )}
              <span>{slippage > 0 ? '-' : '+'}{Math.abs(slippage).toFixed(1)}%</span>
            </div>
          )}

          {/* Solver info for filled swaps */}
          {isFilled && intent.solver && (
            <div className="flex items-center gap-1 text-muted-foreground">
              <User className="h-3 w-3" />
              <span>{truncateAddress(intent.solver)}</span>
            </div>
          )}

          {/* Time remaining for pending */}
          {isPending && timeRemaining !== null && (
            <div className={`flex items-center gap-1 ${timeRemaining < 300 ? 'text-amber-400' : 'text-muted-foreground'}`}>
              <Clock className="h-3 w-3" />
              <span>{formatTimeRemaining(timeRemaining)}</span>
            </div>
          )}

          <span className="text-muted-foreground">{formatTime(intent.createdAt)}</span>
        </div>
      </div>
    </Link>
  );
}
