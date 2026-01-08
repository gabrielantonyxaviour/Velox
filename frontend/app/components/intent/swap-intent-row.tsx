'use client';

import { IntentRecord } from '@/app/lib/velox/types';
import { IntentStatusBadge } from './intent-status-badge';
import { Button } from '../ui/button';
import { Progress } from '../ui/progress';
import { TOKEN_LIST } from '@/app/constants/tokens';
import { getExplorerUrl } from '@/app/lib/aptos';
import {
  X, ArrowUpRight, Check, Zap, TrendingDown, TrendingUp,
  Clock, User, AlertTriangle, Loader2,
} from 'lucide-react';

interface SwapIntentRowProps {
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

function calculateSlippage(expected: bigint, actual: bigint): number {
  if (expected === BigInt(0)) return 0;
  const diff = Number(expected - actual);
  return (diff / Number(expected)) * 100;
}

export function SwapIntentRow({ intent, onCancel, onClick, isCancelling, compact }: SwapIntentRowProps) {
  const inputSymbol = getTokenSymbol(intent.inputToken);
  const outputSymbol = getTokenSymbol(intent.outputToken);
  const inputDecimals = getTokenDecimals(intent.inputToken);
  const outputDecimals = getTokenDecimals(intent.outputToken);
  const formattedInput = formatAmount(intent.amountIn, inputDecimals);

  const isPending = intent.status === 'pending';
  const isFilled = intent.status === 'filled';
  const isExpired = intent.status === 'expired';
  const isCancelled = intent.status === 'cancelled';

  const formattedOutput = intent.outputAmount
    ? formatAmount(intent.outputAmount, outputDecimals)
    : null;

  const formattedMinOut = intent.minAmountOut
    ? formatAmount(intent.minAmountOut, outputDecimals)
    : null;

  // Calculate actual slippage if filled
  const slippage = isFilled && intent.minAmountOut && intent.outputAmount
    ? calculateSlippage(intent.minAmountOut, intent.outputAmount)
    : null;

  // Calculate execution price rate (output/input)
  const executionRate = isFilled && intent.outputAmount
    ? Number(intent.outputAmount) / Number(intent.amountIn)
    : null;

  // Time remaining for pending swaps
  const timeRemaining = isPending && intent.deadline
    ? Math.max(0, intent.deadline - Math.floor(Date.now() / 1000))
    : null;

  const formatTimeRemaining = (seconds: number): string => {
    if (seconds <= 0) return 'Expired';
    if (seconds < 60) return `${seconds}s`;
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ${seconds % 60}s`;
    return `${Math.floor(seconds / 3600)}h ${Math.floor((seconds % 3600) / 60)}m`;
  };

  return (
    <div
      className="flex flex-col gap-3 p-4 rounded-lg bg-card border border-border hover:border-primary/30 transition-colors cursor-pointer"
      onClick={onClick}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Zap className="h-4 w-4 text-primary" />
          <span className="text-xs text-muted-foreground uppercase font-medium">Swap</span>
          <span className="text-sm font-semibold">{inputSymbol} → {outputSymbol}</span>
        </div>
        <div className="flex items-center gap-2">
          {!compact && <span className="text-xs text-muted-foreground">{formatTime(intent.createdAt)}</span>}
          <IntentStatusBadge status={intent.status} />
          {isPending && onCancel && (
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
      <div className="flex items-center justify-between p-3 rounded-md bg-muted/50 border border-border">
        <div className="flex flex-col">
          <span className="text-xs text-muted-foreground">You Pay</span>
          <span className="text-lg font-bold">{formattedInput} {inputSymbol}</span>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-xs text-muted-foreground">{isFilled ? 'You Received' : 'Min Expected'}</span>
          <span className={`text-lg font-bold ${isFilled ? 'text-primary' : ''}`}>
            {isFilled && formattedOutput ? formattedOutput : formattedMinOut || '...'} {outputSymbol}
          </span>
        </div>
      </div>

      {/* Execution Details (if filled) */}
      {isFilled && (
        <div className="grid grid-cols-2 gap-3 text-sm">
          {executionRate !== null && (
            <div className="flex items-center gap-2 p-2 rounded-md bg-primary/10">
              <TrendingUp className="h-4 w-4 text-primary" />
              <div>
                <span className="text-xs text-muted-foreground">Rate</span>
                <p className="font-medium text-primary">1 {inputSymbol} = {executionRate.toFixed(4)} {outputSymbol}</p>
              </div>
            </div>
          )}
          {slippage !== null && (
            <div className={`flex items-center gap-2 p-2 rounded-md ${slippage > 0 ? 'bg-destructive/10' : 'bg-primary/10'}`}>
              {slippage > 0 ? (
                <TrendingDown className="h-4 w-4 text-destructive" />
              ) : (
                <TrendingUp className="h-4 w-4 text-primary" />
              )}
              <div>
                <span className="text-xs text-muted-foreground">Slippage</span>
                <p className={`font-medium ${slippage > 0 ? 'text-destructive' : 'text-primary'}`}>
                  {slippage > 0 ? '-' : '+'}{Math.abs(slippage).toFixed(2)}%
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Pending Status */}
      {isPending && timeRemaining !== null && (
        <div className={`flex items-center gap-2 p-2 rounded-md ${timeRemaining < 60 ? 'bg-amber-500/10 border border-amber-500/20' : 'bg-muted/50'}`}>
          {timeRemaining < 60 ? (
            <AlertTriangle className="h-4 w-4 text-amber-400" />
          ) : (
            <Clock className="h-4 w-4 text-muted-foreground" />
          )}
          <span className="text-sm text-muted-foreground">Time remaining:</span>
          <span className={`text-sm font-medium ${timeRemaining < 60 ? 'text-amber-400' : ''}`}>
            {formatTimeRemaining(timeRemaining)}
          </span>
        </div>
      )}

      {/* Solver Info (if filled) */}
      {isFilled && intent.solver && (
        <div className="flex items-center gap-2 p-2 rounded-md bg-muted/30 border border-border/50">
          <User className="h-4 w-4 text-muted-foreground" />
          <span className="text-xs text-muted-foreground">Filled by solver:</span>
          <a
            href={`https://explorer.movementnetwork.xyz/account/${intent.solver}?network=testnet`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-mono text-primary hover:underline"
            onClick={(e) => e.stopPropagation()}
          >
            {truncateAddress(intent.solver)}
          </a>
          {intent.solverReputation && (
            <span className="text-xs text-muted-foreground ml-auto">
              Rep: {(intent.solverReputation / 100).toFixed(0)}%
            </span>
          )}
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
