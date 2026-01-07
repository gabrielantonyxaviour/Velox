'use client';

import { useEffect, useState, useCallback } from 'react';
import { IntentRecord } from '@/app/lib/velox/types';
import { getScheduledIntentInfo, ScheduledIntentInfo, fetchPeriodFillEvents } from '@/app/lib/velox/queries';
import { IntentStatusBadge } from './intent-status-badge';
import { Button } from '../ui/button';
import { Progress } from '../ui/progress';
import { TOKEN_LIST } from '@/app/constants/tokens';
import { getExplorerUrl } from '@/app/lib/aptos';
import { X, Clock, ArrowUpRight, Check, Timer, Loader2, TrendingUp } from 'lucide-react';

interface ChunkFill {
  txHash: string;
  periodNumber: number;
  inputAmount: bigint;
  outputAmount: bigint;
  filledAt: number;
}

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
  const fractionStr = fraction.toString().padStart(decimals, '0').slice(0, 4);
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

function formatInterval(seconds: number): string {
  if (seconds < 60) return `${seconds}s`;
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h`;
  return `${Math.floor(seconds / 86400)}d`;
}

export function TWAPIntentRow({
  intent,
  onCancel,
  onClick,
  isCancelling,
}: TWAPIntentRowProps) {
  const [scheduledInfo, setScheduledInfo] = useState<ScheduledIntentInfo | null>(null);
  const [chunkFills, setChunkFills] = useState<ChunkFill[]>([]);
  const [countdown, setCountdown] = useState<string>('');
  const [loading, setLoading] = useState(true);

  const inputSymbol = getTokenSymbol(intent.inputToken);
  const outputSymbol = getTokenSymbol(intent.outputToken);
  const inputDecimals = getTokenDecimals(intent.inputToken);
  const outputDecimals = getTokenDecimals(intent.outputToken);

  const isPending = intent.status === 'pending' || intent.status === 'partially_filled';

  const fetchData = useCallback(async () => {
    const [info, fills] = await Promise.all([
      getScheduledIntentInfo(intent.id),
      fetchPeriodFillEvents(intent.id),
    ]);
    setScheduledInfo(info);
    setChunkFills(fills);
    setLoading(false);
  }, [intent.id]);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 10000);
    return () => clearInterval(interval);
  }, [fetchData]);

  useEffect(() => {
    if (!scheduledInfo) return;

    const updateCountdown = () => {
      const now = Math.floor(Date.now() / 1000);
      const diff = scheduledInfo.nextExecution - now;

      if (diff <= 0) {
        setCountdown(scheduledInfo.isReady ? 'Ready to execute' : 'Waiting for solver...');
        return;
      }

      const hours = Math.floor(diff / 3600);
      const mins = Math.floor((diff % 3600) / 60);
      const secs = diff % 60;

      if (hours > 0) {
        setCountdown(`${hours}h ${mins}m ${secs}s`);
      } else if (mins > 0) {
        setCountdown(`${mins}m ${secs}s`);
      } else {
        setCountdown(`${secs}s`);
      }
    };

    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);
    return () => clearInterval(timer);
  }, [scheduledInfo]);

  const chunksExecuted = scheduledInfo?.chunksExecuted ?? intent.chunksExecuted ?? chunkFills.length;
  const totalChunks = scheduledInfo?.totalChunks ?? intent.numChunks ?? 0;
  const progress = totalChunks > 0 ? (chunksExecuted / totalChunks) * 100 : 0;
  const isCompleted = scheduledInfo?.isCompleted || chunksExecuted >= totalChunks;

  const totalAmount = intent.amountIn;
  const chunkAmount = totalChunks > 0 ? totalAmount / BigInt(totalChunks) : BigInt(0);
  const formattedChunk = formatAmount(chunkAmount, inputDecimals);
  const formattedTotal = formatAmount(totalAmount, inputDecimals);

  // Calculate accumulated output from chunk fills
  const totalOutputReceived = chunkFills.reduce((acc, f) => acc + f.outputAmount, BigInt(0));
  const formattedOutput = formatAmount(totalOutputReceived, outputDecimals);

  return (
    <div
      className="flex flex-col gap-3 p-4 rounded-lg bg-card border border-border hover:border-primary/30 transition-colors cursor-pointer"
      onClick={onClick}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <TrendingUp className="h-4 w-4 text-primary" />
          <span className="text-xs text-muted-foreground uppercase font-medium">TWAP</span>
          <span className="text-sm font-semibold">{inputSymbol} → {outputSymbol}</span>
        </div>
        <div className="flex items-center gap-2">
          {isCompleted ? (
            <IntentStatusBadge status="filled" />
          ) : (
            <IntentStatusBadge status={intent.status} />
          )}
          {isPending && !isCompleted && onCancel && (
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onCancel(intent.id);
              }}
              disabled={isCancelling}
              className="h-7 w-7 p-0 text-muted-foreground hover:text-destructive"
            >
              {isCancelling ? <Loader2 className="h-4 w-4 animate-spin" /> : <X className="h-4 w-4" />}
            </Button>
          )}
        </div>
      </div>

      {/* Progress */}
      <div className="space-y-2">
        <div className="flex justify-between text-xs">
          <span className="text-muted-foreground">Progress</span>
          <span className="font-medium">{chunksExecuted} / {totalChunks} chunks</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Details */}
      <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
        <div>
          <span className="text-muted-foreground">Per Chunk:</span>
          <span className="ml-1 font-medium">{formattedChunk} {inputSymbol}</span>
        </div>
        <div>
          <span className="text-muted-foreground">Total:</span>
          <span className="ml-1 font-medium">{formattedTotal} {inputSymbol}</span>
        </div>
        <div>
          <span className="text-muted-foreground">Interval:</span>
          <span className="ml-1">{formatInterval(intent.intervalSeconds ?? 0)}</span>
        </div>
        <div>
          <span className="text-muted-foreground">Max Slippage:</span>
          <span className="ml-1">{((intent.maxSlippageBps ?? 0) / 100).toFixed(2)}%</span>
        </div>
      </div>

      {/* Output Received Section */}
      {chunksExecuted > 0 && (
        <div className="flex items-center justify-between p-3 rounded-md bg-muted/50 border border-border">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-green-500" />
            <span className="text-sm text-muted-foreground">Accumulated:</span>
          </div>
          <span className="text-sm font-semibold text-green-500">
            {formattedOutput} {outputSymbol}
          </span>
        </div>
      )}

      {/* Countdown */}
      {!isCompleted && isPending && (
        <div className="flex items-center gap-2 p-2 rounded-md bg-primary/10 border border-primary/20">
          <Timer className="h-4 w-4 text-primary" />
          <span className="text-sm text-muted-foreground">Next chunk in:</span>
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin text-primary" />
          ) : (
            <span className="text-sm font-semibold text-primary">{countdown}</span>
          )}
        </div>
      )}

      {isCompleted && (
        <div className="flex items-center gap-2 p-2 rounded-md bg-green-500/10 border border-green-500/20">
          <Check className="h-4 w-4 text-green-500" />
          <span className="text-sm text-green-600">All {totalChunks} chunks completed!</span>
        </div>
      )}

      {/* Chunk Fills */}
      {chunkFills.length > 0 && (
        <div className="border-t border-border pt-3 mt-1">
          <span className="text-xs text-muted-foreground mb-2 block">Chunk Fills:</span>
          <div className="flex flex-wrap gap-2">
            {chunkFills.map((fill) => (
              <a
                key={fill.txHash}
                href={getExplorerUrl(fill.txHash)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-xs px-2 py-1 rounded bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                onClick={(e) => e.stopPropagation()}
                title={`Chunk #${fill.periodNumber}: ${formatAmount(fill.outputAmount, outputDecimals)} ${outputSymbol}`}
              >
                <span>#{fill.periodNumber}</span>
                <ArrowUpRight className="h-3 w-3" />
              </a>
            ))}
          </div>
        </div>
      )}

      {intent.submissionTxHash && (
        <div className="flex items-center gap-4 text-xs pt-2 border-t border-border/50">
          <a
            href={getExplorerUrl(intent.submissionTxHash)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
            onClick={(e) => e.stopPropagation()}
          >
            <Clock className="h-3 w-3" />
            <span>Created: {intent.submissionTxHash.slice(0, 8)}...</span>
          </a>
        </div>
      )}
    </div>
  );
}
