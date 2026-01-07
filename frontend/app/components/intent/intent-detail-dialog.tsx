'use client';

import { useEffect, useState, useCallback } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';
import { Progress } from '../ui/progress';
import { IntentRecord, IntentType, getIntentTypeDisplay } from '@/app/lib/velox/types';
import { getScheduledIntentInfo, ScheduledIntentInfo, fetchPeriodFillEvents } from '@/app/lib/velox/queries';
import { getExplorerUrl } from '@/app/lib/aptos';
import { TOKENS } from '@/constants/contracts';
import { ArrowRight, Clock, ExternalLink, Calendar, TrendingUp, Timer, Check, ArrowUpRight } from 'lucide-react';

interface IntentDetailDialogProps {
  intent: IntentRecord | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// Use app theme colors (primary: #c2956a golden/amber)
const TYPE_COLORS: Record<IntentType, string> = {
  swap: 'bg-primary/10 text-primary',
  limit_order: 'bg-primary/10 text-primary',
  twap: 'bg-primary/10 text-primary',
  dca: 'bg-primary/10 text-primary',
};

const STATUS_COLORS: Record<string, string> = {
  pending: 'bg-muted text-muted-foreground',
  filled: 'bg-primary/10 text-primary',
  partially_filled: 'bg-primary/10 text-primary',
  cancelled: 'bg-muted text-muted-foreground',
  expired: 'bg-destructive/10 text-destructive',
};

function getTokenSymbol(address: string): string {
  if (address === TOKENS.tUSDC.address) return 'tUSDC';
  if (address === TOKENS.tMOVE.address) return 'tMOVE';
  return address.slice(0, 8) + '...';
}

function formatAmount(amount: bigint): string {
  return (Number(amount) / 1e8).toFixed(4);
}

function formatTime(timestamp: number): string {
  if (!timestamp) return '--';
  return new Date(timestamp * 1000).toLocaleString();
}

function formatPrice(price: bigint): string {
  return (Number(price) / 10000).toFixed(4);
}

function formatIntervalHuman(seconds: number): string {
  if (seconds < 60) return `${seconds} seconds`;
  if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours`;
  return `${Math.floor(seconds / 86400)} days`;
}

interface PeriodFill {
  txHash: string;
  periodNumber: number;
  inputAmount: bigint;
  outputAmount: bigint;
  filledAt: number;
}

export function IntentDetailDialog({ intent, open, onOpenChange }: IntentDetailDialogProps) {
  const [scheduledInfo, setScheduledInfo] = useState<ScheduledIntentInfo | null>(null);
  const [periodFills, setPeriodFills] = useState<PeriodFill[]>([]);
  const [countdown, setCountdown] = useState<string>('');

  const isScheduledIntent = intent?.intentType === 'dca' || intent?.intentType === 'twap';

  // Fetch scheduled info for DCA/TWAP intents
  const fetchScheduledData = useCallback(async () => {
    if (!intent || !isScheduledIntent) return;
    const [info, fills] = await Promise.all([
      getScheduledIntentInfo(intent.id),
      fetchPeriodFillEvents(intent.id),
    ]);
    setScheduledInfo(info);
    setPeriodFills(fills);
  }, [intent, isScheduledIntent]);

  useEffect(() => {
    if (open && isScheduledIntent) {
      fetchScheduledData();
      const interval = setInterval(fetchScheduledData, 10000);
      return () => clearInterval(interval);
    }
  }, [open, isScheduledIntent, fetchScheduledData]);

  // Countdown timer
  useEffect(() => {
    if (!scheduledInfo || !open) return;

    const updateCountdown = () => {
      const now = Math.floor(Date.now() / 1000);
      const diff = scheduledInfo.nextExecution - now;

      if (diff <= 0) {
        setCountdown(scheduledInfo.isReady ? 'Ready to execute' : 'Waiting for solver...');
        return;
      }

      const days = Math.floor(diff / 86400);
      const hours = Math.floor((diff % 86400) / 3600);
      const mins = Math.floor((diff % 3600) / 60);
      const secs = diff % 60;

      if (days > 0) {
        setCountdown(`${days}d ${hours}h ${mins}m`);
      } else if (hours > 0) {
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
  }, [scheduledInfo, open]);

  if (!intent) return null;

  const periodsExecuted = scheduledInfo?.chunksExecuted ?? intent.periodsExecuted ?? periodFills.length;
  const totalPeriods = scheduledInfo?.totalChunks ?? intent.totalPeriods ?? intent.numChunks ?? 0;
  const progress = totalPeriods > 0 ? (periodsExecuted / totalPeriods) * 100 : 0;
  const isScheduledCompleted = scheduledInfo?.isCompleted || (totalPeriods > 0 && periodsExecuted >= totalPeriods);
  const totalOutputReceived = periodFills.reduce((acc, f) => acc + f.outputAmount, BigInt(0));

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Badge className={TYPE_COLORS[intent.intentType]}>
              {getIntentTypeDisplay(intent.intentType)}
            </Badge>
            <span>Intent #{intent.id.toString()}</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-3 text-sm">
          {/* Status */}
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Status</span>
            <Badge className={STATUS_COLORS[intent.status]}>
              {intent.status.replace('_', ' ').toUpperCase()}
            </Badge>
          </div>

          <Separator />

          {/* Token Pair */}
          <div className="flex items-center justify-center gap-3 py-2">
            <div className="text-center">
              <p className="text-lg font-semibold">{formatAmount(intent.amountIn)}</p>
              <p className="text-xs text-muted-foreground">
                {getTokenSymbol(intent.inputToken)}
              </p>
            </div>
            <ArrowRight className="h-4 w-4 text-muted-foreground" />
            <div className="text-center">
              <p className="text-lg font-semibold">
                {intent.outputAmount ? formatAmount(intent.outputAmount) : '?'}
              </p>
              <p className="text-xs text-muted-foreground">
                {getTokenSymbol(intent.outputToken)}
              </p>
            </div>
          </div>

          <Separator />

          {/* Filled Amount */}
          {intent.filledAmount > BigInt(0) && (
            <div className="flex justify-between">
              <span className="text-muted-foreground">Filled</span>
              <span>{formatAmount(intent.filledAmount)}</span>
            </div>
          )}

          {/* Type-specific fields */}
          {intent.intentType === 'swap' && intent.minAmountOut && (
            <div className="flex justify-between">
              <span className="text-muted-foreground">Min Output</span>
              <span>{formatAmount(intent.minAmountOut)}</span>
            </div>
          )}

          {intent.intentType === 'limit_order' && (
            <>
              {intent.limitPrice && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Limit Price</span>
                  <span>{formatPrice(intent.limitPrice)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-muted-foreground">Partial Fill</span>
                <span>{intent.partialFillAllowed ? 'Yes' : 'No'}</span>
              </div>
            </>
          )}

          {intent.intentType === 'twap' && (
            <>
              {intent.numChunks && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Chunks</span>
                  <span>{intent.chunksExecuted ?? 0} / {intent.numChunks}</span>
                </div>
              )}
              {intent.intervalSeconds && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Interval</span>
                  <span>{intent.intervalSeconds}s</span>
                </div>
              )}
              {intent.maxSlippageBps && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Max Slippage</span>
                  <span>{(intent.maxSlippageBps / 100).toFixed(2)}%</span>
                </div>
              )}
            </>
          )}

          {intent.intentType === 'dca' && (
            <>
              {/* Progress Section */}
              {totalPeriods > 0 && (
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-medium">{periodsExecuted} / {totalPeriods} periods</span>
                  </div>
                  <Progress value={progress} className="h-2" />
                </div>
              )}

              {/* Countdown Timer */}
              {!isScheduledCompleted && countdown && (
                <div className="flex items-center justify-between p-2 rounded-md bg-primary/10 border border-primary/20">
                  <div className="flex items-center gap-2">
                    <Timer className="h-4 w-4 text-primary" />
                    <span className="text-sm text-muted-foreground">Next buy:</span>
                  </div>
                  <span className="text-sm font-semibold text-primary">{countdown}</span>
                </div>
              )}

              {/* Completed Status */}
              {isScheduledCompleted && (
                <div className="flex items-center gap-2 p-2 rounded-md bg-green-500/10 border border-green-500/20">
                  <Check className="h-4 w-4 text-green-500" />
                  <span className="text-sm text-green-600">All {totalPeriods} periods completed!</span>
                </div>
              )}

              {/* Accumulated Output */}
              {totalOutputReceived > BigInt(0) && (
                <div className="flex items-center justify-between p-2 rounded-md bg-muted/50 border border-border">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-green-500" />
                    <span className="text-sm text-muted-foreground">Accumulated:</span>
                  </div>
                  <span className="text-sm font-semibold text-green-500">
                    {formatAmount(totalOutputReceived)} {getTokenSymbol(intent.outputToken)}
                  </span>
                </div>
              )}

              <Separator />

              {intent.amountPerPeriod && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Per Period</span>
                  <span>{formatAmount(intent.amountPerPeriod)}</span>
                </div>
              )}
              {intent.intervalSeconds && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Interval</span>
                  <span>{formatIntervalHuman(intent.intervalSeconds)}</span>
                </div>
              )}

              {/* Period Fill Transactions */}
              {periodFills.length > 0 && (
                <>
                  <Separator />
                  <div className="space-y-2">
                    <span className="text-xs text-muted-foreground">Period Fills:</span>
                    <div className="flex flex-wrap gap-2">
                      {periodFills.map((fill) => (
                        <a
                          key={fill.txHash}
                          href={getExplorerUrl(fill.txHash)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-xs px-2 py-1 rounded bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                        >
                          <span>#{fill.periodNumber}</span>
                          <ArrowUpRight className="h-3 w-3" />
                        </a>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </>
          )}

          <Separator />

          {/* Timestamps */}
          <div className="flex justify-between">
            <span className="text-muted-foreground">Created</span>
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {formatTime(intent.createdAt)}
            </span>
          </div>

          {intent.deadline && (
            <div className="flex justify-between">
              <span className="text-muted-foreground">Deadline</span>
              <span>{formatTime(intent.deadline)}</span>
            </div>
          )}

          {/* Transaction Links */}
          {(intent.submissionTxHash || intent.settlementTxHash) && (
            <>
              <Separator />
              <div className="space-y-2">
                {intent.submissionTxHash && (
                  <a
                    href={getExplorerUrl(intent.submissionTxHash)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between text-sm hover:text-primary"
                  >
                    <span className="text-muted-foreground">Submission Tx</span>
                    <span className="flex items-center gap-1 text-primary">
                      {intent.submissionTxHash.slice(0, 8)}...
                      <ExternalLink className="h-3 w-3" />
                    </span>
                  </a>
                )}
                {intent.settlementTxHash && (
                  <a
                    href={getExplorerUrl(intent.settlementTxHash)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between text-sm hover:text-primary"
                  >
                    <span className="text-muted-foreground">Settlement Tx</span>
                    <span className="flex items-center gap-1 text-primary">
                      {intent.settlementTxHash.slice(0, 8)}...
                      <ExternalLink className="h-3 w-3" />
                    </span>
                  </a>
                )}
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
