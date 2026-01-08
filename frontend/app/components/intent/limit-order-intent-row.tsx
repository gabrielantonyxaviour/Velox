'use client';

import { IntentRecord } from '@/app/lib/velox/types';
import { IntentStatusBadge } from './intent-status-badge';
import { Button } from '../ui/button';
import { Progress } from '../ui/progress';
import { TOKEN_LIST } from '@/app/constants/tokens';
import { getExplorerUrl } from '@/app/lib/aptos';
import {
  X, ArrowUpRight, Check, Target, TrendingUp, TrendingDown,
  Clock, User, AlertTriangle, Loader2, DollarSign, Percent,
} from 'lucide-react';

interface LimitOrderIntentRowProps {
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
  // Price is in basis points (1/10000), convert to decimal
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

export function LimitOrderIntentRow({ intent, onCancel, onClick, isCancelling, compact }: LimitOrderIntentRowProps) {
  const inputSymbol = getTokenSymbol(intent.inputToken);
  const outputSymbol = getTokenSymbol(intent.outputToken);
  const inputDecimals = getTokenDecimals(intent.inputToken);
  const outputDecimals = getTokenDecimals(intent.outputToken);
  const formattedInput = formatAmount(intent.amountIn, inputDecimals);

  const isPending = intent.status === 'pending';
  const isPartiallyFilled = intent.status === 'partially_filled';
  const isFilled = intent.status === 'filled';
  const isExpired = intent.status === 'expired';
  const isCancelled = intent.status === 'cancelled';
  const isActive = isPending || isPartiallyFilled;

  const formattedOutput = intent.outputAmount
    ? formatAmount(intent.outputAmount, outputDecimals)
    : null;

  // Limit price from contract (basis points)
  const limitPrice = intent.limitPrice ?? BigInt(0);
  const formattedLimitPrice = formatPrice(limitPrice);

  // Calculate fill percentage for partial fills
  const fillPercentage = intent.amountIn > BigInt(0)
    ? (Number(intent.filledAmount) / Number(intent.amountIn)) * 100
    : 0;

  // Calculate remaining amount
  const remainingAmount = intent.amountIn - intent.filledAmount;
  const formattedRemaining = formatAmount(remainingAmount, inputDecimals);

  // Time until expiry
  const timeRemaining = isActive && intent.deadline
    ? Math.max(0, intent.deadline - Math.floor(Date.now() / 1000))
    : null;

  const formatTimeRemaining = (seconds: number): string => {
    if (seconds <= 0) return 'Expired';
    if (seconds < 60) return `${seconds}s`;
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ${Math.floor((seconds % 3600) / 60)}m`;
    return `${Math.floor(seconds / 86400)}d ${Math.floor((seconds % 86400) / 3600)}h`;
  };

  // Execution price if filled
  const executionPrice = intent.executionPrice ?? BigInt(0);
  const executedBetterThanLimit = executionPrice > BigInt(0) && executionPrice >= limitPrice;

  return (
    <div
      className="flex flex-col gap-3 p-4 rounded-lg bg-card border border-border hover:border-primary/30 transition-colors cursor-pointer"
      onClick={onClick}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Target className="h-4 w-4 text-primary" />
          <span className="text-xs text-muted-foreground uppercase font-medium">Limit Order</span>
          <span className="text-sm font-semibold">{inputSymbol} → {outputSymbol}</span>
          {intent.partialFillAllowed && (
            <span className="text-xs px-1.5 py-0.5 rounded bg-muted text-muted-foreground">Partial OK</span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {!compact && <span className="text-xs text-muted-foreground">{formatTime(intent.createdAt)}</span>}
          <IntentStatusBadge status={intent.status} />
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

      {/* Order Details */}
      <div className="grid grid-cols-2 gap-3">
        <div className="p-3 rounded-md bg-muted/50 border border-border">
          <span className="text-xs text-muted-foreground">Sell Amount</span>
          <p className="text-lg font-bold">{formattedInput} {inputSymbol}</p>
        </div>
        <div className="p-3 rounded-md bg-primary/10 border border-primary/20">
          <span className="text-xs text-muted-foreground">Limit Price</span>
          <div className="flex items-center gap-1">
            <DollarSign className="h-4 w-4 text-primary" />
            <p className="text-lg font-bold text-primary">{formattedLimitPrice}</p>
          </div>
          <span className="text-xs text-muted-foreground">{outputSymbol} per {inputSymbol}</span>
        </div>
      </div>

      {/* Partial Fill Progress (if applicable) */}
      {(isPartiallyFilled || (isFilled && intent.partialFillAllowed)) && (
        <div className="space-y-2">
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground">Fill Progress</span>
            <span className="font-medium">{fillPercentage.toFixed(1)}%</span>
          </div>
          <Progress value={fillPercentage} className="h-2" />
          {isPartiallyFilled && (
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Remaining: {formattedRemaining} {inputSymbol}</span>
              <span>Filled: {formatAmount(intent.filledAmount, inputDecimals)} {inputSymbol}</span>
            </div>
          )}
        </div>
      )}

      {/* Execution Result (if filled) */}
      {isFilled && (
        <div className="flex items-center justify-between p-3 rounded-md bg-primary/10 border border-primary/20">
          <div className="flex items-center gap-2">
            <Check className="h-5 w-5 text-primary" />
            <div>
              <span className="text-sm text-muted-foreground">Received</span>
              <p className="text-lg font-bold text-primary">{formattedOutput || '...'} {outputSymbol}</p>
            </div>
          </div>
          {executionPrice > BigInt(0) && (
            <div className="text-right">
              <span className="text-xs text-muted-foreground">Execution Price</span>
              <div className="flex items-center gap-1">
                {executedBetterThanLimit ? (
                  <TrendingUp className="h-4 w-4 text-primary" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-amber-400" />
                )}
                <span className={`font-medium ${executedBetterThanLimit ? 'text-primary' : 'text-amber-400'}`}>
                  {formatPrice(executionPrice)}
                </span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Pending Status */}
      {isActive && timeRemaining !== null && (
        <div className={`flex items-center gap-2 p-2 rounded-md ${timeRemaining < 3600 ? 'bg-amber-500/10 border border-amber-500/20' : 'bg-muted/50'}`}>
          {timeRemaining < 3600 ? (
            <AlertTriangle className="h-4 w-4 text-amber-400" />
          ) : (
            <Clock className="h-4 w-4 text-muted-foreground" />
          )}
          <span className="text-sm text-muted-foreground">Valid for:</span>
          <span className={`text-sm font-medium ${timeRemaining < 3600 ? 'text-amber-400' : ''}`}>
            {formatTimeRemaining(timeRemaining)}
          </span>
          <span className="ml-auto text-xs text-muted-foreground">
            Waiting for price to reach target
          </span>
        </div>
      )}

      {/* Solver Info (if filled) */}
      {isFilled && intent.solver && (
        <div className="flex items-center gap-2 p-2 rounded-md bg-muted/30 border border-border/50">
          <User className="h-4 w-4 text-muted-foreground" />
          <span className="text-xs text-muted-foreground">Filled by:</span>
          <a
            href={`https://explorer.movementnetwork.xyz/account/${intent.solver}?network=testnet`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-mono text-primary hover:underline"
            onClick={(e) => e.stopPropagation()}
          >
            {truncateAddress(intent.solver)}
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
            <span>Submitted: {formatTxHash(intent.submissionTxHash)}</span>
          </a>
        )}
        {isFilled && intent.settlementTxHash && (
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
