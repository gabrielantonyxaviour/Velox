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
import {
  ArrowRight, Clock, ExternalLink, Calendar, TrendingUp, Timer, Check,
  ArrowUpRight, Zap, Target, Gavel, TrendingDown, User, DollarSign, Trophy, Users,
} from 'lucide-react';

interface IntentDetailDialogProps {
  intent: IntentRecord | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface PeriodFill {
  txHash: string;
  periodNumber: number;
  inputAmount: bigint;
  outputAmount: bigint;
  filledAt: number;
}

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

function truncateAddress(addr: string): string {
  return addr.slice(0, 6) + '...' + addr.slice(-4);
}

function calculateSlippage(expected: bigint, actual: bigint): number {
  if (expected === BigInt(0)) return 0;
  const diff = Number(expected - actual);
  return (diff / Number(expected)) * 100;
}

export function IntentDetailDialog({ intent, open, onOpenChange }: IntentDetailDialogProps) {
  const [scheduledInfo, setScheduledInfo] = useState<ScheduledIntentInfo | null>(null);
  const [periodFills, setPeriodFills] = useState<PeriodFill[]>([]);
  const [countdown, setCountdown] = useState<string>('');

  const isScheduledIntent = intent?.intentType === 'dca' || intent?.intentType === 'twap';
  const isAuction = intent?.auctionType !== undefined;

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
      if (days > 0) setCountdown(`${days}d ${hours}h ${mins}m`);
      else if (hours > 0) setCountdown(`${hours}h ${mins}m ${secs}s`);
      else if (mins > 0) setCountdown(`${mins}m ${secs}s`);
      else setCountdown(`${secs}s`);
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

  const isFilled = intent.status === 'filled';
  const slippage = isFilled && intent.minAmountOut && intent.outputAmount
    ? calculateSlippage(intent.minAmountOut, intent.outputAmount)
    : null;

  const getIcon = () => {
    if (isAuction) return intent.auctionType === 'sealed-bid' ? Gavel : TrendingDown;
    switch (intent.intentType) {
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
              <Badge className={intent.auctionType === 'sealed-bid' ? TYPE_COLORS.swap : 'bg-amber-500/10 text-amber-400'}>
                {intent.auctionType === 'sealed-bid' ? 'Sealed-Bid Auction' : 'Dutch Auction'}
              </Badge>
            ) : (
              <Badge className={TYPE_COLORS[intent.intentType]}>
                {getIntentTypeDisplay(intent.intentType)}
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
              {intent.status.replace('_', ' ').toUpperCase()}
            </Badge>
          </div>

          <Separator />

          {/* Token Pair */}
          <div className="flex items-center justify-center gap-4 py-3 px-4 rounded-lg bg-muted/50">
            <div className="text-center">
              <p className="text-lg font-bold">{formatAmount(intent.amountIn)}</p>
              <p className="text-xs text-muted-foreground">{getTokenSymbol(intent.inputToken)}</p>
            </div>
            <ArrowRight className="h-5 w-5 text-muted-foreground" />
            <div className="text-center">
              <p className="text-lg font-bold text-primary">
                {intent.outputAmount ? formatAmount(intent.outputAmount) : '?'}
              </p>
              <p className="text-xs text-muted-foreground">{getTokenSymbol(intent.outputToken)}</p>
            </div>
          </div>

          {/* Swap-specific: Slippage & Rate */}
          {intent.intentType === 'swap' && isFilled && slippage !== null && (
            <>
              <Separator />
              <div className="grid grid-cols-2 gap-3">
                <div className="p-2 rounded bg-muted/30">
                  <p className="text-xs text-muted-foreground">Slippage</p>
                  <p className={`font-medium ${slippage > 0 ? 'text-destructive' : 'text-primary'}`}>
                    {slippage > 0 ? '-' : '+'}{Math.abs(slippage).toFixed(2)}%
                  </p>
                </div>
                {intent.executionPrice && (
                  <div className="p-2 rounded bg-muted/30">
                    <p className="text-xs text-muted-foreground">Exec Price</p>
                    <p className="font-medium">{formatPrice(intent.executionPrice)}</p>
                  </div>
                )}
              </div>
            </>
          )}

          {/* Limit Order-specific */}
          {intent.intentType === 'limit_order' && (
            <>
              <Separator />
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Limit Price</span>
                  <span className="font-medium flex items-center gap-1">
                    <DollarSign className="h-3 w-3" />
                    {formatPrice(intent.limitPrice ?? BigInt(0))}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Partial Fill</span>
                  <span>{intent.partialFillAllowed ? 'Allowed' : 'Not Allowed'}</span>
                </div>
                {intent.filledAmount > BigInt(0) && (
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">Fill Progress</span>
                      <span>{((Number(intent.filledAmount) / Number(intent.amountIn)) * 100).toFixed(1)}%</span>
                    </div>
                    <Progress value={(Number(intent.filledAmount) / Number(intent.amountIn)) * 100} className="h-2" />
                  </div>
                )}
              </div>
            </>
          )}

          {/* TWAP/DCA-specific */}
          {isScheduledIntent && (
            <>
              <Separator />
              <div className="space-y-3">
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-medium">{periodsExecuted} / {totalPeriods} {intent.intentType === 'dca' ? 'periods' : 'chunks'}</span>
                  </div>
                  <Progress value={progress} className="h-2" />
                </div>
                {!isScheduledCompleted && countdown && (
                  <div className="flex items-center justify-between p-2 rounded bg-primary/10">
                    <div className="flex items-center gap-2">
                      <Timer className="h-4 w-4 text-primary" />
                      <span className="text-muted-foreground">Next {intent.intentType === 'dca' ? 'buy' : 'chunk'}:</span>
                    </div>
                    <span className="font-semibold text-primary">{countdown}</span>
                  </div>
                )}
                {isScheduledCompleted && (
                  <div className="flex items-center gap-2 p-2 rounded bg-primary/10">
                    <Check className="h-4 w-4 text-primary" />
                    <span className="text-primary">All {totalPeriods} {intent.intentType === 'dca' ? 'periods' : 'chunks'} completed!</span>
                  </div>
                )}
                {totalOutputReceived > BigInt(0) && (
                  <div className="flex justify-between p-2 rounded bg-muted/30">
                    <span className="text-muted-foreground">Total Received</span>
                    <span className="font-semibold text-primary">{formatAmount(totalOutputReceived)} {getTokenSymbol(intent.outputToken)}</span>
                  </div>
                )}
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {intent.amountPerPeriod && (
                    <div><span className="text-muted-foreground">Per {intent.intentType === 'dca' ? 'Period' : 'Chunk'}:</span> {formatAmount(intent.amountPerPeriod)}</div>
                  )}
                  {intent.intervalSeconds && (
                    <div><span className="text-muted-foreground">Interval:</span> {formatIntervalHuman(intent.intervalSeconds)}</div>
                  )}
                  {intent.maxSlippageBps && (
                    <div><span className="text-muted-foreground">Max Slip:</span> {(intent.maxSlippageBps / 100).toFixed(2)}%</div>
                  )}
                </div>
                {periodFills.length > 0 && (
                  <div className="space-y-1">
                    <span className="text-xs text-muted-foreground">Fill History:</span>
                    <div className="flex flex-wrap gap-1">
                      {periodFills.map((fill) => (
                        <a key={fill.txHash} href={getExplorerUrl(fill.txHash)} target="_blank" rel="noopener noreferrer"
                          className="text-xs px-2 py-0.5 rounded bg-primary/10 text-primary hover:bg-primary/20">
                          #{fill.periodNumber} <ArrowUpRight className="h-2 w-2 inline" />
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </>
          )}

          {/* Auction-specific */}
          {isAuction && (
            <>
              <Separator />
              <div className="space-y-2">
                {intent.auctionType === 'sealed-bid' && (
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground flex items-center gap-1"><Users className="h-3 w-3" /> Bids</span>
                    <span className="font-medium">{intent.bidCount ?? 0}</span>
                  </div>
                )}
                {intent.auctionType === 'dutch' && intent.auctionStartPrice && intent.auctionEndPrice && (
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">Start Price</span>
                      <span>{formatPrice(intent.auctionStartPrice)}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">End Price</span>
                      <span>{formatPrice(intent.auctionEndPrice)}</span>
                    </div>
                  </div>
                )}
                {(intent.auctionWinner || intent.solver) && (
                  <div className="flex justify-between items-center p-2 rounded bg-primary/10">
                    <span className="text-muted-foreground flex items-center gap-1"><Trophy className="h-3 w-3" /> Winner</span>
                    <a href={`https://explorer.movementnetwork.xyz/account/${intent.auctionWinner || intent.solver}?network=testnet`}
                      target="_blank" rel="noopener noreferrer" className="font-mono text-primary text-xs hover:underline">
                      {truncateAddress(intent.auctionWinner || intent.solver || '')}
                    </a>
                  </div>
                )}
                {intent.auctionAcceptedPrice && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Accepted Price</span>
                    <span className="font-medium">{formatPrice(intent.auctionAcceptedPrice)}</span>
                  </div>
                )}
              </div>
            </>
          )}

          {/* Solver Info */}
          {isFilled && intent.solver && !isAuction && (
            <>
              <Separator />
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground flex items-center gap-1"><User className="h-3 w-3" /> Solver</span>
                <a href={`https://explorer.movementnetwork.xyz/account/${intent.solver}?network=testnet`}
                  target="_blank" rel="noopener noreferrer" className="font-mono text-primary text-xs hover:underline">
                  {truncateAddress(intent.solver)}
                </a>
              </div>
            </>
          )}

          <Separator />

          {/* Timestamps */}
          <div className="space-y-1 text-xs">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Created</span>
              <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{formatTime(intent.createdAt)}</span>
            </div>
            {intent.deadline && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Deadline</span>
                <span>{formatTime(intent.deadline)}</span>
              </div>
            )}
          </div>

          {/* Transaction Links */}
          {(intent.submissionTxHash || intent.settlementTxHash) && (
            <>
              <Separator />
              <div className="space-y-1">
                {intent.submissionTxHash && (
                  <a href={getExplorerUrl(intent.submissionTxHash)} target="_blank" rel="noopener noreferrer"
                    className="flex items-center justify-between text-xs hover:text-primary">
                    <span className="text-muted-foreground">Submission Tx</span>
                    <span className="flex items-center gap-1 text-primary">{intent.submissionTxHash.slice(0, 10)}...<ExternalLink className="h-3 w-3" /></span>
                  </a>
                )}
                {intent.settlementTxHash && (
                  <a href={getExplorerUrl(intent.settlementTxHash)} target="_blank" rel="noopener noreferrer"
                    className="flex items-center justify-between text-xs hover:text-primary">
                    <span className="text-muted-foreground">Settlement Tx</span>
                    <span className="flex items-center gap-1 text-primary">{intent.settlementTxHash.slice(0, 10)}...<ExternalLink className="h-3 w-3" /></span>
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
