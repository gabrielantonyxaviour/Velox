'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Header } from '@/app/components/layout/header';
import { Footer } from '@/app/components/layout/footer';
import { useWalletContext } from '@/app/hooks/use-wallet-context';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { Skeleton } from '@/app/components/ui/skeleton';
import { Progress } from '@/app/components/ui/progress';
import { Separator } from '@/app/components/ui/separator';
import {
  IntentRecord,
  getIntentTypeDisplay,
  isScheduledIntent,
  isSealedBidAuction,
  isDutchAuction,
  hasAuction,
  getTimeUntilNextChunk,
  isNextChunkReady,
  getIntentTotalAmount,
  isPartiallyFilled,
  getFillPercentage,
  getFilledAmount,
} from '@/app/lib/velox/types';
import { getIntent, fetchIntentTransactions, getIntentTransactionData } from '@/app/lib/velox/queries';
import { getStoredAuctionInfo } from '@/app/lib/velox/auction-storage';
import { MOVEMENT_CONFIGS, CURRENT_NETWORK } from '@/app/lib/aptos';
import { SealedBidAuctionSection } from '@/app/components/intent/sealed-bid-auction-section';
import { DutchAuctionChart } from '@/app/components/intent/dutch-auction-chart';
import { TOKEN_LIST } from '@/app/constants/tokens';
import {
  ExternalLink, ArrowRight, Clock, User, Zap, Timer, TrendingUp, TrendingDown,
  Check, ArrowUpRight, Calendar, Gavel, Target, DollarSign, Wallet, Activity,
  Hash, Coins, BarChart3, AlertCircle,
} from 'lucide-react';

const network = MOVEMENT_CONFIGS[CURRENT_NETWORK].explorer;
const getTxUrl = (hash: string) => `https://explorer.movementnetwork.xyz/txn/${hash}?network=${network}`;
const getAccountUrl = (addr: string) => `https://explorer.movementnetwork.xyz/account/${addr}?network=${network}`;

function formatAmount(amount: bigint, decimals: number = 8): string {
  const divisor = BigInt(10 ** decimals);
  const whole = amount / divisor;
  const fraction = amount % divisor;
  const fractionStr = fraction.toString().padStart(decimals, '0').slice(0, 4);
  return `${whole}.${fractionStr}`;
}

function formatPrice(price: bigint): string {
  return (Number(price) / 1e8).toFixed(6);
}

function formatTime(timestamp: number): string {
  if (!timestamp) return '--';
  return new Date(timestamp * 1000).toLocaleString();
}

function formatInterval(seconds: number): string {
  if (seconds < 60) return `${seconds} seconds`;
  if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours`;
  return `${Math.floor(seconds / 86400)} days`;
}

function formatCountdown(seconds: number): string {
  if (seconds <= 0) return 'Ready';
  const rounded = Math.ceil(seconds);
  const days = Math.floor(rounded / 86400);
  const hours = Math.floor((rounded % 86400) / 3600);
  const mins = Math.floor((rounded % 3600) / 60);
  const secs = rounded % 60;
  if (days > 0) return `${days}d ${hours}h ${mins}m`;
  if (hours > 0) return `${hours}h ${mins}m ${secs}s`;
  if (mins > 0) return `${mins}m ${secs}s`;
  return `${secs}s`;
}

function getTokenSymbol(address: string): string {
  const token = TOKEN_LIST.find((t) => t.address === address);
  return token?.symbol || address.slice(0, 8) + '...';
}

function getTokenDecimals(address: string): number {
  const token = TOKEN_LIST.find((t) => t.address === address);
  return token?.decimals || 8;
}

function truncateAddress(addr: string): string {
  return addr.slice(0, 10) + '...' + addr.slice(-6);
}

const STATUS_COLORS: Record<string, string> = {
  active: 'bg-amber-500/10 text-amber-400',
  filled: 'bg-primary/10 text-primary',
  cancelled: 'bg-muted text-muted-foreground',
  expired: 'bg-destructive/10 text-destructive',
  partial: 'bg-blue-500/10 text-blue-400',
};

export default function IntentDetailPage() {
  const params = useParams();
  const intentId = params.id as string;
  const { walletAddress } = useWalletContext();
  const [intent, setIntent] = useState<IntentRecord | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [countdown, setCountdown] = useState<string>('');

  useEffect(() => {
    async function fetchData(isInitial = true) {
      try {
        if (isInitial) setLoading(true);
        const id = BigInt(intentId);
        const data = await getIntent(id);
        if (!data) {
          setIntent(null);
          return;
        }

        await fetchIntentTransactions([id]);
        const txData = getIntentTransactionData(id);

        const enrichedFills = data.fills.map((fill, idx) => {
          const takerTx = txData?.takerTxHashes.find(t => t.solver === fill.solver)
            || txData?.takerTxHashes[idx];
          return { ...fill, txHash: takerTx?.txHash || fill.txHash };
        });

        const enrichedAuction = { ...data.auction };
        const isDutch = enrichedAuction.type === 'dutch_active' || enrichedAuction.type === 'dutch_accepted';
        if (isDutch) {
          const storedInfo = getStoredAuctionInfo(id);
          if (storedInfo && storedInfo.type === 'dutch') {
            if (!enrichedAuction.startPrice && storedInfo.startPrice) {
              enrichedAuction.startPrice = BigInt(storedInfo.startPrice);
            }
            if (!enrichedAuction.endPrice && storedInfo.endPrice) {
              enrichedAuction.endPrice = BigInt(storedInfo.endPrice);
            }
            if (!enrichedAuction.duration && storedInfo.duration) {
              enrichedAuction.duration = storedInfo.duration;
            }
            if (!enrichedAuction.startTime && storedInfo.startTime) {
              enrichedAuction.startTime = storedInfo.startTime;
            }
          }
          if (enrichedAuction.endTime && !enrichedAuction.duration) {
            enrichedAuction.duration = enrichedAuction.endTime - data.createdAt;
          }
          if (!enrichedAuction.startTime) {
            enrichedAuction.startTime = data.createdAt;
          }
        }

        setIntent({
          ...data,
          fills: enrichedFills,
          auction: enrichedAuction,
          submitTxHash: txData?.makerTxHash,
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load intent');
      } finally {
        setLoading(false);
      }
    }

    if (intentId) {
      fetchData(true);
      const interval = setInterval(() => fetchData(false), 3000);
      return () => clearInterval(interval);
    }
  }, [intentId]);

  useEffect(() => {
    if (!intent) return;
    const intentData = intent.intent;
    const isScheduled = isScheduledIntent(intentData);
    if (!isScheduled) return;

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
  }, [intent]);

  const renderRow = (label: string, value: React.ReactNode, icon?: React.ReactNode) => (
    <div className="flex justify-between items-center py-2.5 border-b border-border last:border-0">
      <span className="text-muted-foreground text-sm flex items-center gap-2">
        {icon}
        {label}
      </span>
      <span className="text-sm font-medium">{value}</span>
    </div>
  );

  const renderLink = (hash: string, type: 'tx' | 'account') => (
    <a href={type === 'tx' ? getTxUrl(hash) : getAccountUrl(hash)} target="_blank" rel="noopener noreferrer"
       className="text-primary hover:underline flex items-center gap-1 font-mono text-xs">
      {truncateAddress(hash)} <ExternalLink className="h-3 w-3" />
    </a>
  );

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header address={walletAddress || ''} />
      <main className="flex-1 container mx-auto px-4 py-6 max-w-4xl">
        {loading ? (
          <Card><CardContent className="p-6"><Skeleton className="h-64 w-full" /></CardContent></Card>
        ) : error || !intent ? (
          <Card>
            <CardContent className="p-6 text-center">
              <AlertCircle className="h-12 w-12 mx-auto text-destructive mb-4" />
              <p className="text-destructive">{error || 'Intent not found'}</p>
            </CardContent>
          </Card>
        ) : (
          <IntentContent intent={intent} countdown={countdown} renderRow={renderRow} renderLink={renderLink} />
        )}
      </main>
      <Footer />
    </div>
  );
}

interface IntentContentProps {
  intent: IntentRecord;
  countdown: string;
  renderRow: (label: string, value: React.ReactNode, icon?: React.ReactNode) => React.ReactNode;
  renderLink: (hash: string, type: 'tx' | 'account') => React.ReactNode;
}

function IntentContent({ intent, countdown, renderRow, renderLink }: IntentContentProps) {
  const intentData = intent.intent;
  const inputDecimals = getTokenDecimals(intentData.inputToken);
  const outputDecimals = getTokenDecimals(intentData.outputToken);
  const inputSymbol = getTokenSymbol(intentData.inputToken);
  const outputSymbol = getTokenSymbol(intentData.outputToken);
  const totalAmount = getIntentTotalAmount(intentData);
  const filledAmount = getFilledAmount(intent);

  const isScheduled = isScheduledIntent(intentData);
  const totalChunks = intentData.type === 'dca'
    ? (intentData.totalPeriods ?? 0)
    : (intentData.numChunks ?? 0);
  const chunksExecuted = intent.chunksExecuted ?? 0;
  const progress = totalChunks > 0 ? (chunksExecuted / totalChunks) * 100 : 0;
  const isScheduledCompleted = totalChunks > 0 && chunksExecuted >= totalChunks;

  const isAuction = hasAuction(intent);
  const hasPartialFill = isPartiallyFilled(intent);
  const fillPercentage = getFillPercentage(intent);
  const solver = intent.fills.length > 0 ? intent.fills[0].solver : null;
  const isFilled = intent.status === 'filled';

  // Calculate average execution price for scheduled intents
  const avgPrice = isScheduled && intent.totalOutputReceived > 0n && filledAmount > 0n
    ? Number(intent.totalOutputReceived) / Number(filledAmount)
    : null;

  const getIcon = () => {
    if (isAuction) return isSealedBidAuction(intent) ? Gavel : TrendingDown;
    switch (intentData.type) {
      case 'dca': return Calendar;
      case 'twap': return TrendingUp;
      case 'limit_order': return Target;
      default: return Zap;
    }
  };
  const Icon = getIcon();

  const getStatusBadge = () => {
    if (hasPartialFill) return <Badge className={STATUS_COLORS.partial}>PARTIAL</Badge>;
    if (isScheduled && isScheduledCompleted) {
      return <Badge className="bg-primary/10 text-primary"><Check className="h-3 w-3 mr-1" />COMPLETED</Badge>;
    }
    return <Badge className={STATUS_COLORS[intent.status]}>{intent.status.toUpperCase()}</Badge>;
  };

  return (
    <div className="space-y-4">
      {/* Header Card */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Icon className="h-6 w-6 text-primary" />
              </div>
              <div>
                <CardTitle className="text-xl">Intent #{intent.id.toString()}</CardTitle>
                <p className="text-sm text-muted-foreground mt-0.5">
                  Created {formatTime(intent.createdAt)}
                </p>
              </div>
            </div>
            <div className="flex gap-2 flex-wrap">
              <Badge className="bg-primary/10 text-primary">
                {isAuction
                  ? (isSealedBidAuction(intent) ? 'Sealed Bid Swap' : 'Dutch Auction Swap')
                  : getIntentTypeDisplay(intentData.type)}
              </Badge>
              {getStatusBadge()}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center gap-6 py-6 px-4 rounded-lg bg-muted/30">
            <div className="text-center">
              <p className="text-3xl font-bold">{formatAmount(totalAmount, inputDecimals)}</p>
              <p className="text-sm text-muted-foreground mt-1">{inputSymbol}</p>
            </div>
            <ArrowRight className="h-8 w-8 text-muted-foreground" />
            <div className="text-center">
              <p className="text-3xl font-bold text-primary">
                {intent.totalOutputReceived > 0n
                  ? formatAmount(intent.totalOutputReceived, outputDecimals)
                  : '--'}
              </p>
              <p className="text-sm text-muted-foreground mt-1">{outputSymbol}</p>
              {isScheduled && intent.totalOutputReceived > 0n && (
                <p className="text-xs text-primary mt-1">Accumulated</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Auction Visualization */}
      {isAuction && isSealedBidAuction(intent) && <SealedBidAuctionSection intent={intent} />}
      {isAuction && isDutchAuction(intent) && <DutchAuctionChart intent={intent} />}

      {/* TWAP/DCA Progress Card */}
      {isScheduled && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <Timer className="h-4 w-4 text-primary" />
              Execution Progress
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">
                  {intentData.type === 'dca' ? 'Periods Executed' : 'Chunks Executed'}
                </span>
                <span className="font-semibold">{chunksExecuted} / {totalChunks}</span>
              </div>
              <Progress value={progress} className="h-3" />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>0%</span>
                <span>{progress.toFixed(0)}% complete</span>
                <span>100%</span>
              </div>
            </div>

            {!isScheduledCompleted && countdown && (
              <div className="flex items-center justify-between p-4 rounded-lg bg-primary/10 border border-primary/20">
                <div className="flex items-center gap-3">
                  <Timer className="h-5 w-5 text-primary" />
                  <div>
                    <span className="text-sm font-medium">
                      Next {intentData.type === 'dca' ? 'Buy' : 'Chunk'}
                    </span>
                    <p className="text-xs text-muted-foreground">
                      {intentData.intervalSeconds && `Every ${formatInterval(intentData.intervalSeconds)}`}
                    </p>
                  </div>
                </div>
                <span className="text-lg font-bold text-primary">{countdown}</span>
              </div>
            )}

            {isScheduledCompleted && (
              <div className="flex items-center gap-3 p-4 rounded-lg bg-primary/10 border border-primary/20">
                <Check className="h-5 w-5 text-primary" />
                <span className="font-medium text-primary">
                  All {totalChunks} {intentData.type === 'dca' ? 'periods' : 'chunks'} completed!
                </span>
              </div>
            )}

            {/* Execution Stats */}
            <div className="grid grid-cols-2 gap-4">
              {intent.totalOutputReceived > 0n && (
                <div className="p-3 rounded-lg bg-muted/50 border border-border">
                  <div className="flex items-center gap-2 text-muted-foreground text-xs mb-1">
                    <Coins className="h-3 w-3" /> Total Received
                  </div>
                  <p className="font-semibold text-primary">
                    {formatAmount(intent.totalOutputReceived, outputDecimals)} {outputSymbol}
                  </p>
                </div>
              )}
              {avgPrice !== null && (
                <div className="p-3 rounded-lg bg-muted/50 border border-border">
                  <div className="flex items-center gap-2 text-muted-foreground text-xs mb-1">
                    <BarChart3 className="h-3 w-3" /> Avg. Execution Price
                  </div>
                  <p className="font-semibold">
                    {avgPrice.toFixed(6)} {outputSymbol}/{inputSymbol}
                  </p>
                </div>
              )}
              {intentData.type === 'twap' && intentData.totalAmount && intentData.numChunks && (
                <div className="p-3 rounded-lg bg-muted/50 border border-border">
                  <div className="flex items-center gap-2 text-muted-foreground text-xs mb-1">
                    <Activity className="h-3 w-3" /> Per Chunk
                  </div>
                  <p className="font-semibold">
                    {formatAmount(intentData.totalAmount / BigInt(intentData.numChunks), inputDecimals)} {inputSymbol}
                  </p>
                </div>
              )}
              {intentData.type === 'dca' && intentData.amountPerPeriod && (
                <div className="p-3 rounded-lg bg-muted/50 border border-border">
                  <div className="flex items-center gap-2 text-muted-foreground text-xs mb-1">
                    <Activity className="h-3 w-3" /> Per Period
                  </div>
                  <p className="font-semibold">
                    {formatAmount(intentData.amountPerPeriod, inputDecimals)} {inputSymbol}
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Limit Order Progress */}
      {intentData.type === 'limit_order' && (hasPartialFill || isFilled) && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <Target className="h-4 w-4 text-primary" />
              Fill Progress
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Filled Amount</span>
                <span className="font-semibold">
                  {formatAmount(filledAmount, inputDecimals)} / {formatAmount(totalAmount, inputDecimals)} {inputSymbol}
                </span>
              </div>
              <Progress value={fillPercentage} className="h-3" />
              <div className="text-xs text-muted-foreground text-right">
                {fillPercentage.toFixed(1)}% filled
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 rounded-lg bg-muted/50 border border-border">
                <div className="flex items-center gap-2 text-muted-foreground text-xs mb-1">
                  <DollarSign className="h-3 w-3" /> Limit Price
                </div>
                <p className="font-semibold">{formatPrice(intentData.limitPrice ?? 0n)}</p>
              </div>
              {intent.escrowRemaining > 0n && (
                <div className="p-3 rounded-lg bg-muted/50 border border-border">
                  <div className="flex items-center gap-2 text-muted-foreground text-xs mb-1">
                    <Wallet className="h-3 w-3" /> Remaining in Escrow
                  </div>
                  <p className="font-semibold">
                    {formatAmount(intent.escrowRemaining, inputDecimals)} {inputSymbol}
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid md:grid-cols-2 gap-4">
        {/* Details Card */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <User className="h-4 w-4 text-primary" />
              Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-0">
            {renderRow('User', renderLink(intent.user, 'account'))}
            {renderRow('Input Token',
              <a href={getAccountUrl(intentData.inputToken)} target="_blank" rel="noopener noreferrer"
                 className="text-primary hover:underline flex items-center gap-1 text-xs">
                {inputSymbol} <ExternalLink className="h-3 w-3" />
              </a>
            )}
            {renderRow('Output Token',
              <a href={getAccountUrl(intentData.outputToken)} target="_blank" rel="noopener noreferrer"
                 className="text-primary hover:underline flex items-center gap-1 text-xs">
                {outputSymbol} <ExternalLink className="h-3 w-3" />
              </a>
            )}
            {solver && renderRow('Solver', renderLink(solver, 'account'))}
            {intent.escrowRemaining > 0n && intent.status === 'active' && (
              renderRow('Escrow Remaining', `${formatAmount(intent.escrowRemaining, inputDecimals)} ${inputSymbol}`)
            )}
          </CardContent>
        </Card>

        {/* Timestamps Card */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <Clock className="h-4 w-4 text-primary" />
              Timestamps
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-0">
            {renderRow('Created', formatTime(intent.createdAt))}
            {intentData.deadline && renderRow('Deadline', formatTime(intentData.deadline))}
            {intentData.expiry && renderRow('Expiry', formatTime(intentData.expiry))}
            {intentData.startTime && renderRow('Start Time', formatTime(intentData.startTime))}
            {intent.fills.length > 0 && intent.fills[0].filledAt && (
              renderRow('First Fill', formatTime(intent.fills[0].filledAt))
            )}
            {intent.fills.length > 1 && intent.fills[intent.fills.length - 1].filledAt && (
              renderRow('Last Fill', formatTime(intent.fills[intent.fills.length - 1].filledAt))
            )}
          </CardContent>
        </Card>
      </div>

      {/* Type-Specific Parameters Card */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base flex items-center gap-2">
            <Zap className="h-4 w-4 text-primary" />
            {isAuction
              ? (isSealedBidAuction(intent) ? 'Sealed Bid' : 'Dutch Auction') + ' Parameters'
              : getIntentTypeDisplay(intentData.type) + ' Parameters'}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-0">
          {intentData.type === 'swap' && (
            <>
              {renderRow('Amount In', `${formatAmount(totalAmount, inputDecimals)} ${inputSymbol}`)}
              {intentData.minAmountOut !== undefined && (
                renderRow('Min Amount Out', `${formatAmount(intentData.minAmountOut, outputDecimals)} ${outputSymbol}`)
              )}
              {intent.totalOutputReceived > 0n && (
                renderRow('Actual Output', `${formatAmount(intent.totalOutputReceived, outputDecimals)} ${outputSymbol}`)
              )}
            </>
          )}
          {intentData.type === 'limit_order' && (
            <>
              {renderRow('Amount', `${formatAmount(totalAmount, inputDecimals)} ${inputSymbol}`)}
              {intentData.limitPrice !== undefined && renderRow('Limit Price', formatPrice(intentData.limitPrice))}
              {renderRow('Fill Status', `${fillPercentage.toFixed(1)}%`)}
            </>
          )}
          {intentData.type === 'twap' && (
            <>
              {intentData.numChunks !== undefined && renderRow('Total Chunks', intentData.numChunks.toString())}
              {renderRow('Chunks Executed', chunksExecuted.toString())}
              {intentData.intervalSeconds !== undefined && renderRow('Interval', formatInterval(intentData.intervalSeconds))}
              {intentData.maxSlippageBps !== undefined && renderRow('Max Slippage', `${(intentData.maxSlippageBps / 100).toFixed(2)}%`)}
              {intentData.totalAmount && intentData.numChunks && (
                renderRow('Per Chunk Amount', `${formatAmount(intentData.totalAmount / BigInt(intentData.numChunks), inputDecimals)} ${inputSymbol}`)
              )}
            </>
          )}
          {intentData.type === 'dca' && (
            <>
              {intentData.totalPeriods !== undefined && renderRow('Total Periods', intentData.totalPeriods.toString())}
              {renderRow('Periods Executed', chunksExecuted.toString())}
              {intentData.amountPerPeriod !== undefined && renderRow('Per Period', `${formatAmount(intentData.amountPerPeriod, inputDecimals)} ${inputSymbol}`)}
              {intentData.intervalSeconds !== undefined && renderRow('Interval', formatInterval(intentData.intervalSeconds))}
            </>
          )}
        </CardContent>
      </Card>

      {/* Transactions Card */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base flex items-center gap-2">
            <Hash className="h-4 w-4 text-primary" />
            Transactions
            {intent.fills.length > 0 && (
              <Badge variant="outline" className="ml-2">
                {intent.fills.length} fill{intent.fills.length !== 1 ? 's' : ''}
              </Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {/* Maker TX */}
          {intent.submitTxHash ? (
            <a
              href={getTxUrl(intent.submitTxHash)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors border border-border"
            >
              <div>
                <span className="text-sm font-medium">Maker TX (Submit Intent)</span>
                <p className="text-xs text-muted-foreground">Intent creation transaction</p>
              </div>
              <span className="flex items-center gap-1 text-primary text-xs font-mono">
                {truncateAddress(intent.submitTxHash)}
                <ExternalLink className="h-3 w-3" />
              </span>
            </a>
          ) : (
            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30 border border-border">
              <span className="text-sm text-muted-foreground">Maker TX (Submit)</span>
              <span className="text-xs text-muted-foreground/60 italic">Not recorded</span>
            </div>
          )}

          <Separator />

          {/* Fill Transactions */}
          {intent.fills.length > 0 ? (
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Fill Transactions</p>
              {intent.fills.map((fill, idx) => (
                <div
                  key={`fill-${idx}`}
                  className="flex items-center justify-between p-3 rounded-lg bg-muted/30 border border-border"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">Fill #{idx + 1}</span>
                      {isScheduled && (
                        <Badge variant="outline" className="text-xs">
                          {intentData.type === 'dca' ? 'Period' : 'Chunk'} {idx + 1}
                        </Badge>
                      )}
                    </div>
                    <div className="flex gap-4 mt-1 text-xs text-muted-foreground">
                      {fill.inputAmount > 0n && (
                        <span>In: {formatAmount(fill.inputAmount, inputDecimals)} {inputSymbol}</span>
                      )}
                      {fill.outputAmount > 0n && (
                        <span>Out: {formatAmount(fill.outputAmount, outputDecimals)} {outputSymbol}</span>
                      )}
                      {fill.filledAt && (
                        <span>{formatTime(fill.filledAt)}</span>
                      )}
                    </div>
                  </div>
                  {fill.txHash ? (
                    <a
                      href={getTxUrl(fill.txHash)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-primary text-xs font-mono hover:underline"
                    >
                      {truncateAddress(fill.txHash)}
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  ) : (
                    <span className="text-xs text-muted-foreground/60 italic">TX not recorded</span>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-6 text-muted-foreground">
              <Activity className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm">No fills yet</p>
              {intent.status === 'active' && (
                <p className="text-xs mt-1">Waiting for solver to execute</p>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
