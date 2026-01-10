'use client';

import { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';
import { Progress } from '../ui/progress';
import {
  IntentRecord,
  IntentType,
  getIntentTypeDisplay,
  isScheduledIntent,
  isPartiallyFilled,
  getFillPercentage,
  getIntentTotalAmount,
  isSealedBidAuction,
  isDutchAuction,
  hasAuction,
  getRemainingChunks,
  getTimeUntilNextChunk,
  isNextChunkReady,
} from '@/app/lib/velox/types';
import { getExplorerUrl } from '@/app/lib/aptos';
import { TOKEN_LIST } from '@/app/constants/tokens';
import {
  ArrowRight, Clock, ExternalLink, Calendar, TrendingUp, Timer, Check,
  ArrowUpRight, Zap, Target, Gavel, TrendingDown, User, DollarSign,
} from 'lucide-react';
import { SealedBidAuctionSection } from './sealed-bid-auction-section';
import { DutchAuctionChart } from './dutch-auction-chart';

interface IntentDetailDialogProps {
  intent: IntentRecord | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const TYPE_COLORS: Record<IntentType, string> = {
  swap: 'bg-primary/10 text-primary',
  limit_order: 'bg-primary/10 text-primary',
  twap: 'bg-primary/10 text-primary',
  dca: 'bg-primary/10 text-primary',
};

const STATUS_COLORS: Record<string, string> = {
  active: 'bg-primary/10 text-primary',
  filled: 'bg-primary/10 text-primary',
  cancelled: 'bg-muted text-muted-foreground',
  expired: 'bg-destructive/10 text-destructive',
};

function getTokenSymbol(address: string): string {
  const token = TOKEN_LIST.find((t) => t.address === address);
  return token?.symbol || address.slice(0, 8) + '...';
}

function getTokenDecimals(address: string): number {
  const token = TOKEN_LIST.find((t) => t.address === address);
  return token?.decimals || 8;
}

function formatAmount(amount: bigint, decimals: number = 8): string {
  const divisor = BigInt(10 ** decimals);
  const whole = amount / divisor;
  const fraction = amount % divisor;
  const fractionStr = fraction.toString().padStart(decimals, '0').slice(0, 4);
  return `${whole}.${fractionStr}`;
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

function truncateAddress(addr: string): string {
  return addr.slice(0, 6) + '...' + addr.slice(-4);
}

function formatCountdown(seconds: number): string {
  if (seconds <= 0) return 'Ready';
  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  if (days > 0) return `${days}d ${hours}h ${mins}m`;
  if (hours > 0) return `${hours}h ${mins}m ${secs}s`;
  if (mins > 0) return `${mins}m ${secs}s`;
  return `${secs}s`;
}

export function IntentDetailDialog({ intent, open, onOpenChange }: IntentDetailDialogProps) {
  const [countdown, setCountdown] = useState<string>('');

  const intentData = intent?.intent;
  const isScheduled = intentData ? isScheduledIntent(intentData) : false;
  const isAuction = intent ? hasAuction(intent) : false;

  // Update countdown for scheduled intents
  useEffect(() => {
    if (!intent || !open || !isScheduled) return;

    const updateCountdown = () => {
      const timeUntil = getTimeUntilNextChunk(intent);
      if (timeUntil <= 0) {
        setCountdown(isNextChunkReady(intent) ? 'Ready to execute' : 'Waiting for solver...');
        return;
      }
      setCountdown(formatCountdown(timeUntil));
    };

    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);
    return () => clearInterval(timer);
  }, [intent, open, isScheduled]);

  if (!intent || !intentData) return null;

  const inputDecimals = getTokenDecimals(intentData.inputToken);
  const outputDecimals = getTokenDecimals(intentData.outputToken);
  const totalAmount = getIntentTotalAmount(intentData);

  // Scheduled intent progress
  const totalChunks = intentData.numChunks ?? 0;
  const chunksExecuted = intent.chunksExecuted ?? 0;
  const progress = totalChunks > 0 ? (chunksExecuted / totalChunks) * 100 : 0;
  const isScheduledCompleted = totalChunks > 0 && chunksExecuted >= totalChunks;

  // Fill info
  const isFilled = intent.status === 'filled';
  const hasPartialFill = isPartiallyFilled(intent);
  const fillPercentage = getFillPercentage(intent);
  const solver = intent.fills.length > 0 ? intent.fills[0].solver : null;

  const getIcon = () => {
    if (isAuction) return isSealedBidAuction(intent) ? Gavel : TrendingDown;
    switch (intentData.type) {
      case 'swap': return Zap;
      case 'limit_order': return Target;
      case 'twap': return TrendingUp;
      case 'dca': return Calendar;
      default: return Zap;
    }
  };
  const Icon = getIcon();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Icon className="h-5 w-5 text-primary" />
            {isAuction ? (
              <Badge className={TYPE_COLORS.swap}>
                {isSealedBidAuction(intent) ? 'Sealed Bid Swap' : 'Dutch Auction Swap'}
              </Badge>
            ) : (
              <Badge className={TYPE_COLORS[intentData.type]}>
                {getIntentTypeDisplay(intentData.type)}
              </Badge>
            )}
            <span className="text-muted-foreground">#{intent.id.toString()}</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-3 text-sm">
          {/* Status */}
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Status</span>
            <Badge className={STATUS_COLORS[intent.status]}>
              {hasPartialFill ? 'PARTIAL' : intent.status.toUpperCase()}
            </Badge>
          </div>

          <Separator />

          {/* Token Pair */}
          <div className="flex items-center justify-center gap-4 py-3 px-4 rounded-lg bg-muted/50">
            <div className="text-center">
              <p className="text-lg font-bold">{formatAmount(totalAmount, inputDecimals)}</p>
              <p className="text-xs text-muted-foreground">{getTokenSymbol(intentData.inputToken)}</p>
            </div>
            <ArrowRight className="h-5 w-5 text-muted-foreground" />
            <div className="text-center">
              <p className="text-lg font-bold text-primary">
                {intent.totalOutputReceived > 0n
                  ? formatAmount(intent.totalOutputReceived, outputDecimals)
                  : '?'}
              </p>
              <p className="text-xs text-muted-foreground">{getTokenSymbol(intentData.outputToken)}</p>
            </div>
          </div>

          {/* Limit Order-specific */}
          {intentData.type === 'limit_order' && (
            <>
              <Separator />
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Limit Price</span>
                  <span className="font-medium flex items-center gap-1">
                    <DollarSign className="h-3 w-3" />
                    {formatPrice(intentData.limitPrice ?? 0n)}
                  </span>
                </div>
                {(hasPartialFill || isFilled) && (
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">Fill Progress</span>
                      <span>{fillPercentage.toFixed(1)}%</span>
                    </div>
                    <Progress value={fillPercentage} className="h-2" />
                  </div>
                )}
              </div>
            </>
          )}

          {/* TWAP/DCA-specific */}
          {isScheduled && (
            <>
              <Separator />
              <div className="space-y-3">
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-medium">
                      {chunksExecuted} / {totalChunks} {intentData.type === 'dca' ? 'periods' : 'chunks'}
                    </span>
                  </div>
                  <Progress value={progress} className="h-2" />
                </div>
                {!isScheduledCompleted && countdown && (
                  <div className="flex items-center justify-between p-2 rounded bg-primary/10">
                    <div className="flex items-center gap-2">
                      <Timer className="h-4 w-4 text-primary" />
                      <span className="text-muted-foreground">
                        Next {intentData.type === 'dca' ? 'buy' : 'chunk'}:
                      </span>
                    </div>
                    <span className="font-semibold text-primary">{countdown}</span>
                  </div>
                )}
                {isScheduledCompleted && (
                  <div className="flex items-center gap-2 p-2 rounded bg-primary/10">
                    <Check className="h-4 w-4 text-primary" />
                    <span className="text-primary">
                      All {totalChunks} {intentData.type === 'dca' ? 'periods' : 'chunks'} completed!
                    </span>
                  </div>
                )}
                {intent.totalOutputReceived > 0n && (
                  <div className="flex justify-between p-2 rounded bg-muted/30">
                    <span className="text-muted-foreground">Total Received</span>
                    <span className="font-semibold text-primary">
                      {formatAmount(intent.totalOutputReceived, outputDecimals)} {getTokenSymbol(intentData.outputToken)}
                    </span>
                  </div>
                )}
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {intentData.type === 'dca' && intentData.amountPerPeriod && (
                    <div>
                      <span className="text-muted-foreground">Per Period: </span>
                      {formatAmount(intentData.amountPerPeriod, inputDecimals)}
                    </div>
                  )}
                  {intentData.type === 'twap' && intentData.totalAmount && intentData.numChunks && (
                    <div>
                      <span className="text-muted-foreground">Per Chunk: </span>
                      {formatAmount(intentData.totalAmount / BigInt(intentData.numChunks), inputDecimals)}
                    </div>
                  )}
                  {intentData.intervalSeconds && (
                    <div>
                      <span className="text-muted-foreground">Interval: </span>
                      {formatIntervalHuman(intentData.intervalSeconds)}
                    </div>
                  )}
                </div>
                {intent.fills.length > 0 && (
                  <div className="space-y-1">
                    <span className="text-xs text-muted-foreground">Fill History:</span>
                    <div className="flex flex-wrap gap-1">
                      {intent.fills.map((fill, idx) => (
                        <div
                          key={`fill-${idx}`}
                          className="text-xs px-2 py-0.5 rounded bg-primary/10 text-primary"
                        >
                          #{idx + 1}
                          {fill.txHash && (
                            <a
                              href={getExplorerUrl(fill.txHash)}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="ml-1 hover:underline"
                            >
                              <ArrowUpRight className="h-2 w-2 inline" />
                            </a>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </>
          )}

          {/* Auction-specific - Sealed Bid */}
          {isAuction && isSealedBidAuction(intent) && (
            <SealedBidAuctionSection intent={intent} />
          )}

          {/* Auction-specific - Dutch Auction */}
          {isAuction && isDutchAuction(intent) && (
            <DutchAuctionChart intent={intent} />
          )}

          {/* Solver Info */}
          {isFilled && solver && !isAuction && (
            <>
              <Separator />
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground flex items-center gap-1">
                  <User className="h-3 w-3" /> Solver
                </span>
                <a
                  href={`https://explorer.movementnetwork.xyz/account/${solver}?network=testnet`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-primary text-xs hover:underline"
                >
                  {truncateAddress(solver)}
                </a>
              </div>
            </>
          )}

          <Separator />

          {/* Timestamps */}
          <div className="space-y-1 text-xs">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Created</span>
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {formatTime(intent.createdAt)}
              </span>
            </div>
            {intentData.deadline && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Deadline</span>
                <span>{formatTime(intentData.deadline)}</span>
              </div>
            )}
            {intentData.expiry && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Expiry</span>
                <span>{formatTime(intentData.expiry)}</span>
              </div>
            )}
          </div>

          {/* Transaction Links */}
          {(intent.submitTxHash || (intent.fills.length > 0 && intent.fills.some(f => f.txHash))) && (
            <>
              <Separator />
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground font-medium">Transactions</span>
                  {intent.fills.length > 1 && (
                    <span className="text-xs text-muted-foreground">
                      {intent.fills.filter(f => f.txHash).length} fill{intent.fills.filter(f => f.txHash).length !== 1 ? 's' : ''}
                    </span>
                  )}
                </div>

                {/* Maker TX - Intent Submission */}
                {intent.submitTxHash && (
                  <a
                    href={getExplorerUrl(intent.submitTxHash)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-2 rounded bg-muted/30 hover:bg-muted/50 transition-colors"
                  >
                    <span className="text-xs text-muted-foreground">Maker TX (Submit)</span>
                    <span className="flex items-center gap-1 text-primary text-xs font-mono">
                      {intent.submitTxHash.slice(0, 10)}...{intent.submitTxHash.slice(-6)}
                      <ExternalLink className="h-3 w-3" />
                    </span>
                  </a>
                )}

                {/* Taker TX - Fill Transactions */}
                {intent.fills.filter(f => f.txHash).map((fill, idx) => {
                  const fillsWithTx = intent.fills.filter(f => f.txHash);
                  const isMultipleFills = fillsWithTx.length > 1;
                  const fillLabel = isMultipleFills
                    ? `Taker TX #${idx + 1}`
                    : 'Taker TX (Fill)';
                  const fillAmount = fill.inputAmount
                    ? `${formatAmount(fill.inputAmount, inputDecimals)} ${getTokenSymbol(intentData.inputToken)}`
                    : null;

                  return (
                    <a
                      key={fill.txHash || `fill-${idx}`}
                      href={getExplorerUrl(fill.txHash!)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-2 rounded bg-muted/30 hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex flex-col">
                        <span className="text-xs text-muted-foreground">{fillLabel}</span>
                        {isMultipleFills && fillAmount && (
                          <span className="text-[10px] text-muted-foreground/70">{fillAmount}</span>
                        )}
                      </div>
                      <span className="flex items-center gap-1 text-primary text-xs font-mono">
                        {fill.txHash!.slice(0, 10)}...{fill.txHash!.slice(-6)}
                        <ExternalLink className="h-3 w-3" />
                      </span>
                    </a>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
