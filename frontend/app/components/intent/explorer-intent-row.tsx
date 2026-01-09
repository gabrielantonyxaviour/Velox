'use client';

import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import {
  IntentRecord,
  getIntentTypeDisplay,
  IntentType,
  hasAuction,
  isNextChunkReady,
  getTimeUntilNextChunk,
  getIntentTotalAmount,
} from '@/app/lib/velox/types';
import { ExplorerSwapRow } from './explorer-swap-row';
import { ExplorerLimitRow } from './explorer-limit-row';
import { ExplorerAuctionRow } from './explorer-auction-row';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { TOKEN_LIST } from '@/app/constants/tokens';
import { ArrowRight, ChevronRight, Timer, Calendar, TrendingUp, Check } from 'lucide-react';

const STATUS_COLORS: Record<string, string> = {
  active: 'bg-amber-500/10 text-amber-400',
  filled: 'bg-primary/10 text-primary',
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

function formatDuration(seconds: number): string {
  if (seconds < 60) return `${seconds}s`;
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ${seconds % 60}s`;
  const hours = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  return `${hours}h ${mins}m`;
}

export function ExplorerIntentRow({ intent }: ExplorerIntentRowProps) {
  // Route auction intents to specialized component
  if (hasAuction(intent)) {
    return <ExplorerAuctionRow intent={intent} />;
  }

  // Route based on intent type
  switch (intent.intent.type) {
    case 'swap':
      return <ExplorerSwapRow intent={intent} />;

    case 'limit_order':
      return <ExplorerLimitRow intent={intent} />;

    case 'dca':
    case 'twap':
      return <ExplorerScheduledRow intent={intent} />;

    default:
      return <ExplorerSwapRow intent={intent} />;
  }
}

// Scheduled intent row (DCA/TWAP) with progress tracking
function ExplorerScheduledRow({ intent }: { intent: IntentRecord }) {
  const [countdown, setCountdown] = useState<string>('');

  const { intent: innerIntent } = intent;
  const inputSymbol = getTokenSymbol(innerIntent.inputToken);
  const outputSymbol = getTokenSymbol(innerIntent.outputToken);
  const inputDecimals = getTokenDecimals(innerIntent.inputToken);
  const outputDecimals = getTokenDecimals(innerIntent.outputToken);

  const isDCA = innerIntent.type === 'dca';

  // Use IntentRecord fields directly - no need to fetch from contract
  const chunksExecuted = intent.chunksExecuted;
  const totalChunks = isDCA ? (innerIntent.totalPeriods ?? 0) : (innerIntent.numChunks ?? 0);
  const isCompleted = totalChunks > 0 && chunksExecuted >= totalChunks;
  const isReady = isNextChunkReady(intent);
  const nextExecution = intent.nextExecution;

  // Countdown timer
  useEffect(() => {
    const updateCountdown = () => {
      const remaining = getTimeUntilNextChunk(intent);

      if (remaining <= 0) {
        setCountdown(isReady ? 'Ready' : 'Waiting...');
        return;
      }

      setCountdown(formatDuration(Math.floor(remaining)));
    };

    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);
    return () => clearInterval(timer);
  }, [intent, isReady, nextExecution]);

  const progress = totalChunks > 0 ? (chunksExecuted / totalChunks) * 100 : 0;
  const totalAmount = getIntentTotalAmount(innerIntent);

  // Use accumulated output from IntentRecord
  const formattedOutput = intent.totalOutputReceived > BigInt(0)
    ? formatAmount(intent.totalOutputReceived, outputDecimals)
    : null;

  return (
    <Link
      href={`/explorer/intent/${intent.id.toString()}`}
      className="block p-3 hover:bg-muted/50 text-sm cursor-pointer"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          {isDCA ? (
            <Calendar className="h-4 w-4 text-primary" />
          ) : (
            <TrendingUp className="h-4 w-4 text-primary" />
          )}
          <Badge className={TYPE_COLORS[innerIntent.type] + ' text-xs'}>
            {getIntentTypeDisplay(innerIntent.type)}
          </Badge>
          <span className="text-muted-foreground">#{intent.id.toString()}</span>
        </div>
        <div className="flex items-center gap-2">
          {isCompleted ? (
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

      {/* Amount display */}
      <div className="flex items-center gap-2 text-xs mb-2">
        <span className="font-medium">{formatAmount(totalAmount, inputDecimals)} {inputSymbol}</span>
        <ArrowRight className="h-3 w-3 text-muted-foreground" />
        {formattedOutput ? (
          <span className="text-primary font-medium">{formattedOutput} {outputSymbol}</span>
        ) : (
          <span>{outputSymbol}</span>
        )}
        {innerIntent.intervalSeconds && (
          <span className="ml-2 text-muted-foreground">
            every {innerIntent.intervalSeconds < 3600
              ? `${Math.floor(innerIntent.intervalSeconds / 60)}m`
              : `${Math.floor(innerIntent.intervalSeconds / 3600)}h`}
          </span>
        )}
      </div>

      {/* Progress */}
      <div className="flex items-center gap-3">
        <div className="flex-1">
          <div className="flex justify-between text-xs mb-1">
            <span className="text-muted-foreground">
              {isDCA ? 'Periods' : 'Chunks'}
            </span>
            <span className="font-medium">{chunksExecuted}/{totalChunks}</span>
          </div>
          <Progress value={progress} className="h-1.5" />
        </div>
        {!isCompleted && countdown && (
          <div className="flex items-center gap-1 text-xs text-primary">
            <Timer className="h-3 w-3" />
            <span className="font-medium">{countdown}</span>
          </div>
        )}
      </div>
    </Link>
  );
}
