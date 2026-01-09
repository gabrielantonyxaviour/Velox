'use client';

import { IntentRecord, getRemainingChunks, isNextChunkReady, getTimeUntilNextChunk } from '@/app/lib/velox/types';
import { IntentStatusBadge } from './intent-status-badge';
import { Button } from '../ui/button';
import { TOKEN_LIST } from '@/app/constants/tokens';
import { X, TrendingUp, Loader2, Clock } from 'lucide-react';
import { Progress } from '../ui/progress';

interface TWAPIntentRowProps {
  intent: IntentRecord;
  onCancel?: (intentId: bigint) => void;
  onClick?: () => void;
  isCancelling?: boolean;
  chunkFillTxHashes?: string[];
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

function formatDuration(seconds: number): string {
  const rounded = Math.ceil(seconds);
  if (rounded < 60) return `${rounded}s`;
  if (rounded < 3600) return `${Math.floor(rounded / 60)}m`;
  return `${Math.floor(rounded / 3600)}h ${Math.floor((rounded % 3600) / 60)}m`;
}

function getTokenSymbol(address: string): string {
  const token = TOKEN_LIST.find((t) => t.address === address);
  return token?.symbol || address.slice(0, 6) + '...';
}

function getTokenDecimals(address: string): number {
  const token = TOKEN_LIST.find((t) => t.address === address);
  return token?.decimals || 8;
}

export function TWAPIntentRow({ intent, onCancel, onClick, isCancelling }: TWAPIntentRowProps) {
  const { intent: twapIntent } = intent;
  const inputSymbol = getTokenSymbol(twapIntent.inputToken);
  const outputSymbol = getTokenSymbol(twapIntent.outputToken);
  const inputDecimals = getTokenDecimals(twapIntent.inputToken);
  const outputDecimals = getTokenDecimals(twapIntent.outputToken);

  const isActive = intent.status === 'active';
  const totalChunks = twapIntent.numChunks ?? 0;
  const chunksExecuted = intent.chunksExecuted;
  const remainingChunks = getRemainingChunks(intent);
  const isCompleted = totalChunks > 0 && chunksExecuted >= totalChunks;
  const chunkReady = isNextChunkReady(intent);
  const timeUntilNext = getTimeUntilNextChunk(intent);
  const progressPercent = totalChunks > 0 ? (chunksExecuted / totalChunks) * 100 : 0;

  const formattedOutput = intent.totalOutputReceived > 0n
    ? formatAmount(intent.totalOutputReceived, outputDecimals)
    : null;

  return (
    <div
      className="flex items-center justify-between p-3 rounded-lg bg-card border border-border hover:border-primary/30 transition-colors cursor-pointer"
      onClick={onClick}
    >
      <div className="flex items-center gap-3">
        <TrendingUp className="h-4 w-4 text-primary" />
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground uppercase">TWAP</span>
            <span className="text-xs text-primary">{chunksExecuted}/{totalChunks}</span>
            {chunkReady && isActive && (
              <span className="text-xs text-green-400">Ready</span>
            )}
            {!chunkReady && isActive && timeUntilNext > 0 && (
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {formatDuration(timeUntilNext)}
              </span>
            )}
          </div>
          <p className="text-sm font-medium">
            {formatAmount(twapIntent.totalAmount ?? 0n, inputDecimals)} {inputSymbol} → {formattedOutput ? `${formattedOutput} ` : ''}{outputSymbol}
          </p>
          {chunksExecuted > 0 && chunksExecuted < totalChunks && (
            <div className="flex items-center gap-2">
              <Progress value={progressPercent} className="w-16 h-1" />
              <span className="text-xs text-muted-foreground">{Math.round(progressPercent)}%</span>
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-xs text-muted-foreground">{formatTime(intent.createdAt)}</span>
        <IntentStatusBadge status={isCompleted ? 'filled' : intent.status} record={intent} />
        {isActive && !isCompleted && onCancel && (
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
