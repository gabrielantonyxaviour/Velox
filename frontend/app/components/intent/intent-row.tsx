'use client';

import { IntentRecord, getIntentTypeDisplay } from '@/app/lib/velox/types';
import { IntentStatusBadge } from './intent-status-badge';
import { DCAIntentRow } from './dca-intent-row';
import { TWAPIntentRow } from './twap-intent-row';
import { Button } from '../ui/button';
import { TOKEN_LIST } from '@/app/constants/tokens';
import { getExplorerUrl } from '@/app/lib/aptos';
import { X, ArrowUpRight, Check } from 'lucide-react';

interface IntentRowProps {
  intent: IntentRecord;
  onCancel?: (intentId: bigint) => void;
  onClick?: () => void;
  isCancelling?: boolean;
  compact?: boolean;
  periodFillTxHashes?: string[];
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

export function IntentRow({ intent, onCancel, onClick, isCancelling, compact, periodFillTxHashes }: IntentRowProps) {
  // Use specialized row components for DCA and TWAP
  if (intent.intentType === 'dca') {
    return (
      <DCAIntentRow
        intent={intent}
        onCancel={onCancel}
        onClick={onClick}
        isCancelling={isCancelling}
        periodFillTxHashes={periodFillTxHashes}
      />
    );
  }

  if (intent.intentType === 'twap') {
    return (
      <TWAPIntentRow
        intent={intent}
        onCancel={onCancel}
        onClick={onClick}
        isCancelling={isCancelling}
        chunkFillTxHashes={periodFillTxHashes}
      />
    );
  }

  const inputSymbol = getTokenSymbol(intent.inputToken);
  const outputSymbol = getTokenSymbol(intent.outputToken);
  const inputDecimals = getTokenDecimals(intent.inputToken);
  const outputDecimals = getTokenDecimals(intent.outputToken);
  const formattedAmount = formatAmount(intent.amountIn, inputDecimals);

  const isPending = intent.status === 'pending' || intent.status === 'partially_filled';
  const isFilled = intent.status === 'filled';

  const formattedOutput = intent.outputAmount
    ? formatAmount(intent.outputAmount, outputDecimals)
    : null;

  return (
    <div
      className="flex flex-col gap-2 p-3 rounded-lg bg-card border border-border hover:border-border/80 transition-colors cursor-pointer"
      onClick={onClick}
    >
      {/* Main row */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 flex-1">
          <div className="flex flex-col">
            <span className="text-xs text-muted-foreground uppercase">
              {getIntentTypeDisplay(intent.intentType)}
            </span>
            <span className="text-sm font-medium">
              {formattedAmount} {inputSymbol} → {formattedOutput ? `${formattedOutput} ` : ''}{outputSymbol}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {!compact && (
            <span className="text-xs text-muted-foreground">{formatTime(intent.createdAt)}</span>
          )}

          <IntentStatusBadge status={intent.status} />

          {isPending && onCancel && (
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
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      {/* Transaction links row */}
      <div className="flex items-center gap-4 text-xs flex-wrap">
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
