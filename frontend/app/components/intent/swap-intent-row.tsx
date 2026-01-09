'use client';

import { IntentRecord, getFillPercentage, isPartiallyFilled } from '@/app/lib/velox/types';
import { IntentStatusBadge } from './intent-status-badge';
import { Button } from '../ui/button';
import { TOKEN_LIST } from '@/app/constants/tokens';
import { X, Zap, Loader2 } from 'lucide-react';
import { Progress } from '../ui/progress';

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

export function SwapIntentRow({ intent, onCancel, onClick, isCancelling }: SwapIntentRowProps) {
  const { intent: swapIntent } = intent;
  const inputSymbol = getTokenSymbol(swapIntent.inputToken);
  const outputSymbol = getTokenSymbol(swapIntent.outputToken);
  const inputDecimals = getTokenDecimals(swapIntent.inputToken);
  const outputDecimals = getTokenDecimals(swapIntent.outputToken);

  const isActive = intent.status === 'active';
  const hasPartialFill = isPartiallyFilled(intent);
  const fillPercent = getFillPercentage(intent);

  const formattedOutput = intent.totalOutputReceived > 0n
    ? formatAmount(intent.totalOutputReceived, outputDecimals)
    : null;

  return (
    <div
      className="flex items-center justify-between p-3 rounded-lg bg-card border border-border hover:border-primary/30 transition-colors cursor-pointer"
      onClick={onClick}
    >
      <div className="flex items-center gap-3">
        <Zap className="h-4 w-4 text-primary" />
        <div className="space-y-1">
          <span className="text-xs text-muted-foreground uppercase">Swap</span>
          <p className="text-sm font-medium">
            {formatAmount(swapIntent.amountIn ?? 0n, inputDecimals)} {inputSymbol} → {formattedOutput ? `${formattedOutput} ` : ''}{outputSymbol}
          </p>
          {hasPartialFill && (
            <div className="flex items-center gap-2">
              <Progress value={fillPercent} className="w-16 h-1" />
              <span className="text-xs text-muted-foreground">{fillPercent}% filled</span>
            </div>
          )}
          {intent.fills.length > 0 && (
            <span className="text-xs text-muted-foreground">
              {intent.fills.length} fill{intent.fills.length > 1 ? 's' : ''}
            </span>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-xs text-muted-foreground">{formatTime(intent.createdAt)}</span>
        <IntentStatusBadge status={intent.status} record={intent} />
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
