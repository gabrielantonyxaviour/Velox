'use client';

import { useEffect, useState, useCallback } from 'react';
import { IntentRecord } from '@/app/lib/velox/types';
import { getScheduledIntentInfo, ScheduledIntentInfo } from '@/app/lib/velox/queries';
import { IntentStatusBadge } from './intent-status-badge';
import { Button } from '../ui/button';
import { TOKEN_LIST } from '@/app/constants/tokens';
import { X, Calendar, Loader2 } from 'lucide-react';

interface DCAIntentRowProps {
  intent: IntentRecord;
  onCancel?: (intentId: bigint) => void;
  onClick?: () => void;
  isCancelling?: boolean;
  periodFillTxHashes?: string[];
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

export function DCAIntentRow({ intent, onCancel, onClick, isCancelling }: DCAIntentRowProps) {
  const [scheduledInfo, setScheduledInfo] = useState<ScheduledIntentInfo | null>(null);

  const inputSymbol = getTokenSymbol(intent.inputToken);
  const outputSymbol = getTokenSymbol(intent.outputToken);
  const inputDecimals = getTokenDecimals(intent.inputToken);

  const isPending = intent.status === 'pending' || intent.status === 'partially_filled';

  const fetchData = useCallback(async () => {
    const info = await getScheduledIntentInfo(intent.id);
    setScheduledInfo(info);
  }, [intent.id]);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 15000);
    return () => clearInterval(interval);
  }, [fetchData]);

  const periodsExecuted = scheduledInfo?.chunksExecuted ?? intent.periodsExecuted ?? 0;
  const totalPeriods = scheduledInfo?.totalChunks ?? intent.totalPeriods ?? 0;
  const isCompleted = scheduledInfo?.isCompleted || (totalPeriods > 0 && periodsExecuted >= totalPeriods);

  return (
    <div
      className="flex items-center justify-between p-3 rounded-lg bg-card border border-border hover:border-primary/30 transition-colors cursor-pointer"
      onClick={onClick}
    >
      <div className="flex items-center gap-3">
        <Calendar className="h-4 w-4 text-primary" />
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground uppercase">DCA</span>
            <span className="text-xs text-primary">{periodsExecuted}/{totalPeriods}</span>
          </div>
          <p className="text-sm font-medium">
            {formatAmount(intent.amountIn, inputDecimals)} {inputSymbol} → {outputSymbol}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-xs text-muted-foreground">{formatTime(intent.createdAt)}</span>
        <IntentStatusBadge status={isCompleted ? 'filled' : intent.status} />
        {isPending && !isCompleted && onCancel && (
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
