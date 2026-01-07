'use client';

import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { IntentRecord, getIntentTypeDisplay, IntentType } from '@/app/lib/velox/types';
import { getScheduledIntentInfo, ScheduledIntentInfo, fetchPeriodFillEvents } from '@/app/lib/velox/queries';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { TOKEN_LIST } from '@/app/constants/tokens';
import { ArrowRight, ChevronRight, Timer, Calendar, TrendingUp, Check, Gavel, Clock } from 'lucide-react';

const STATUS_COLORS: Record<string, string> = {
  pending: 'bg-amber-500/10 text-amber-400',
  filled: 'bg-primary/10 text-primary',
  partially_filled: 'bg-primary/10 text-primary',
  cancelled: 'bg-muted text-muted-foreground',
  expired: 'bg-destructive/10 text-destructive',
};

const TYPE_COLORS: Record<IntentType, string> = {
  swap: 'bg-primary/10 text-primary',
  limit_order: 'bg-primary/10 text-primary',
  twap: 'bg-primary/10 text-primary',
  dca: 'bg-primary/10 text-primary',
};

interface ExplorerIntentRowProps {
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

export function ExplorerIntentRow({ intent }: ExplorerIntentRowProps) {
  const isScheduledIntent = intent.intentType === 'dca' || intent.intentType === 'twap';
  const [scheduledInfo, setScheduledInfo] = useState<ScheduledIntentInfo | null>(null);
  const [periodFillCount, setPeriodFillCount] = useState(0);
  const [countdown, setCountdown] = useState<string>('');

  const inputSymbol = getTokenSymbol(intent.inputToken);
  const outputSymbol = getTokenSymbol(intent.outputToken);
  const inputDecimals = getTokenDecimals(intent.inputToken);

  const fetchData = useCallback(async () => {
    if (!isScheduledIntent) return;
    const [info, fills] = await Promise.all([
      getScheduledIntentInfo(intent.id),
      fetchPeriodFillEvents(intent.id),
    ]);
    setScheduledInfo(info);
    setPeriodFillCount(fills.length);
  }, [intent.id, isScheduledIntent]);

  useEffect(() => {
    if (isScheduledIntent) {
      // Initial fetch and periodic refresh - intentional data sync pattern
      // eslint-disable-next-line react-hooks/set-state-in-effect
      void fetchData();
      const interval = setInterval(() => void fetchData(), 15000);
      return () => clearInterval(interval);
    }
  }, [fetchData, isScheduledIntent]);

  useEffect(() => {
    if (!scheduledInfo) return;

    const updateCountdown = () => {
      const now = Math.floor(Date.now() / 1000);
      const diff = scheduledInfo.nextExecution - now;

      if (diff <= 0) {
        setCountdown(scheduledInfo.isReady ? 'Ready' : 'Waiting...');
        return;
      }

      const hours = Math.floor(diff / 3600);
      const mins = Math.floor((diff % 3600) / 60);
      const secs = diff % 60;

      if (hours > 0) {
        setCountdown(`${hours}h ${mins}m`);
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

  const periodsExecuted = scheduledInfo?.chunksExecuted ?? intent.periodsExecuted ?? intent.chunksExecuted ?? periodFillCount;
  const totalPeriods = scheduledInfo?.totalChunks ?? intent.totalPeriods ?? intent.numChunks ?? 0;
  const progress = totalPeriods > 0 ? (periodsExecuted / totalPeriods) * 100 : 0;
  const isScheduledCompleted = scheduledInfo?.isCompleted || (totalPeriods > 0 && periodsExecuted >= totalPeriods);

  if (isScheduledIntent) {
    return (
      <Link
        href={`/explorer/intent/${intent.id.toString()}`}
        className="block p-3 hover:bg-muted/50 text-sm cursor-pointer"
      >
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            {intent.intentType === 'dca' ? (
              <Calendar className="h-4 w-4 text-primary" />
            ) : (
              <TrendingUp className="h-4 w-4 text-primary" />
            )}
            <Badge className={TYPE_COLORS[intent.intentType] + ' text-xs'}>
              {getIntentTypeDisplay(intent.intentType)}
            </Badge>
            <span className="text-muted-foreground">#{intent.id.toString()}</span>
          </div>
          <div className="flex items-center gap-2">
            {isScheduledCompleted ? (
              <Badge className="bg-primary/10 text-primary text-xs">
                <Check className="h-3 w-3 mr-1" />COMPLETED
              </Badge>
            ) : (
              <Badge className={STATUS_COLORS[intent.status] + ' text-xs'}>
                {intent.status.toUpperCase()}
              </Badge>
            )}
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs mb-2">
          <span className="font-medium">{formatAmount(intent.amountIn, inputDecimals)} {inputSymbol}</span>
          <ArrowRight className="h-3 w-3 text-muted-foreground" />
          <span>{outputSymbol}</span>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex-1">
            <div className="flex justify-between text-xs mb-1">
              <span className="text-muted-foreground">Progress</span>
              <span className="font-medium">{periodsExecuted}/{totalPeriods}</span>
            </div>
            <Progress value={progress} className="h-1.5" />
          </div>
          {!isScheduledCompleted && countdown && (
            <div className="flex items-center gap-1 text-xs text-primary">
              <Timer className="h-3 w-3" />
              <span className="font-medium">{countdown}</span>
            </div>
          )}
        </div>
      </Link>
    );
  }

  // Regular intent display
  return (
    <Link
      href={`/explorer/intent/${intent.id.toString()}`}
      className="block p-3 hover:bg-muted/50 text-sm cursor-pointer"
    >
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-2">
          <Badge className={TYPE_COLORS[intent.intentType] + ' text-xs'}>
            {getIntentTypeDisplay(intent.intentType)}
          </Badge>
          {intent.auctionType && (
            <Badge className={`text-xs ${intent.auctionType === 'sealed-bid' ? 'bg-primary/10 text-primary' : 'bg-amber-500/10 text-amber-400'}`}>
              {intent.auctionType === 'sealed-bid' ? (
                <><Gavel className="h-3 w-3 mr-1" />Sealed</>
              ) : (
                <><Clock className="h-3 w-3 mr-1" />Dutch</>
              )}
            </Badge>
          )}
          <span className="text-muted-foreground">#{intent.id.toString()}</span>
        </div>
        <div className="flex items-center gap-2">
          <Badge className={STATUS_COLORS[intent.status] + ' text-xs'}>
            {intent.status.toUpperCase()}
          </Badge>
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
        </div>
      </div>
      <div className="flex items-center gap-2 text-xs">
        <span>{formatAmount(intent.amountIn, inputDecimals)} {inputSymbol}</span>
        <ArrowRight className="h-3 w-3 text-muted-foreground" />
        <span>{outputSymbol}</span>
        <span className="ml-auto text-muted-foreground">{formatTime(intent.createdAt)}</span>
      </div>
    </Link>
  );
}
