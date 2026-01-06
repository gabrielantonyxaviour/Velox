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
import {
  IntentRecord,
  getIntentTypeDisplay,
  isScheduledIntent,
  isSealedBidAuction,
  isDutchAuction,
  hasAuction,
  isAuctionActive,
  getTimeUntilNextChunk,
  isNextChunkReady,
  getIntentTotalAmount,
} from '@/app/lib/velox/types';
import { getIntent, fetchIntentTransactions, getIntentTransactionData } from '@/app/lib/velox/queries';
import { getStoredAuctionInfo } from '@/app/lib/velox/auction-storage';
import { MOVEMENT_CONFIGS, CURRENT_NETWORK } from '@/app/lib/aptos';
import { SealedBidAuctionSection } from '@/app/components/intent/sealed-bid-auction-section';
import { DutchAuctionChart } from '@/app/components/intent/dutch-auction-chart';
import { TOKEN_LIST } from '@/app/constants/tokens';
import {
  ExternalLink, ArrowRight, Clock, User, Zap, Timer, TrendingUp,
  Check, ArrowUpRight, Calendar, Gavel, Target,
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
  const date = new Date(timestamp * 1000);
  return date.toLocaleString();
}

function formatInterval(seconds: number): string {
  if (seconds < 60) return `${seconds} seconds`;
  if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours`;
  return `${Math.floor(seconds / 86400)} days`;
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

function getTokenSymbol(address: string): string {
  const token = TOKEN_LIST.find((t) => t.address === address);
  return token?.symbol || address.slice(0, 8) + '...';
}

function getTokenDecimals(address: string): number {
  const token = TOKEN_LIST.find((t) => t.address === address);
  return token?.decimals || 8;
}

const STATUS_COLORS: Record<string, string> = {
  active: 'bg-amber-500/10 text-amber-400',
  filled: 'bg-primary/10 text-primary',
  cancelled: 'bg-muted text-muted-foreground',
  expired: 'bg-destructive/10 text-destructive',
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

        // Fetch transaction data from Supabase
        await fetchIntentTransactions([id]);
        const txData = getIntentTransactionData(id);

        // Enrich fills with transaction hashes
        const enrichedFills = data.fills.map((fill, idx) => {
          const takerTx = txData?.takerTxHashes.find(t => t.solver === fill.solver)
            || txData?.takerTxHashes[idx];
          return { ...fill, txHash: takerTx?.txHash || fill.txHash };
        });

        // Enrich Dutch auction params from localStorage (preserved from submission)
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
          // Calculate duration from endTime if not set
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
      // Poll for updates every 3 seconds for active intents
      const interval = setInterval(() => fetchData(false), 3000);
      return () => clearInterval(interval);
    }
  }, [intentId]);

  // Countdown timer for scheduled intents
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

  const renderRow = (label: string, value: React.ReactNode) => (
    <div className="flex justify-between py-2 border-b border-border last:border-0">
      <span className="text-muted-foreground text-sm">{label}</span>
      <span className="text-sm font-medium">{value}</span>
    </div>
  );

  const renderLink = (hash: string, type: 'tx' | 'account') => (
    <a href={type === 'tx' ? getTxUrl(hash) : getAccountUrl(hash)} target="_blank" rel="noopener noreferrer"
       className="text-primary hover:underline flex items-center gap-1 font-mono text-xs">
      {hash.slice(0, 10)}...{hash.slice(-6)} <ExternalLink className="h-3 w-3" />
    </a>
  );

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header address={walletAddress || ''} />
      <main className="flex-1 container mx-auto px-4 py-6 max-w-3xl">
        {loading ? (
          <Card><CardContent className="p-6"><Skeleton className="h-64 w-full" /></CardContent></Card>
        ) : error || !intent ? (
          <Card><CardContent className="p-6 text-center text-destructive">{error || 'Intent not found'}</CardContent></Card>
        ) : (
          <div className="space-y-4">
            {(() => {
              const intentData = intent.intent;
              const inputDecimals = getTokenDecimals(intentData.inputToken);
              const outputDecimals = getTokenDecimals(intentData.outputToken);
              const inputSymbol = getTokenSymbol(intentData.inputToken);
              const outputSymbol = getTokenSymbol(intentData.outputToken);
              const totalAmount = getIntentTotalAmount(intentData);

              const isScheduled = isScheduledIntent(intentData);
              const totalChunks = intentData.numChunks ?? intentData.totalPeriods ?? 0;
              const chunksExecuted = intent.chunksExecuted ?? 0;
              const progress = totalChunks > 0 ? (chunksExecuted / totalChunks) * 100 : 0;
              const isScheduledCompleted = totalChunks > 0 && chunksExecuted >= totalChunks;

              const isAuction = hasAuction(intent);
              const solver = intent.fills.length > 0 ? intent.fills[0].solver : null;

              const getIcon = () => {
                if (isAuction) return isSealedBidAuction(intent) ? Gavel : TrendingUp;
                switch (intentData.type) {
                  case 'dca': return Calendar;
                  case 'twap': return TrendingUp;
                  case 'limit_order': return Target;
                  default: return Zap;
                }
              };
              const Icon = getIcon();

              return (
                <>
                  {/* Header Card */}
                  <Card>
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Icon className="h-5 w-5 text-primary" />
                          <CardTitle className="text-lg">Intent #{intent.id.toString()}</CardTitle>
                        </div>
                        <div className="flex gap-2">
                          <Badge className="bg-primary/10 text-primary">
                            {isAuction
                              ? (isSealedBidAuction(intent) ? 'Sealed Bid Swap' : 'Dutch Auction Swap')
                              : getIntentTypeDisplay(intentData.type)}
                          </Badge>
                          {isScheduled && isScheduledCompleted ? (
                            <Badge className="bg-primary/10 text-primary">
                              <Check className="h-3 w-3 mr-1" />COMPLETED
                            </Badge>
                          ) : (
                            <Badge className={STATUS_COLORS[intent.status]}>{intent.status.toUpperCase()}</Badge>
                          )}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-center gap-3 py-4">
                        <div className="text-center">
                          <p className="text-2xl font-bold">{formatAmount(totalAmount, inputDecimals)}</p>
                          <p className="text-sm text-muted-foreground">{inputSymbol}</p>
                        </div>
                        <ArrowRight className="h-6 w-6 text-muted-foreground" />
                        <div className="text-center">
                          <p className="text-2xl font-bold text-primary">
                            {intent.totalOutputReceived > 0n
                              ? formatAmount(intent.totalOutputReceived, outputDecimals)
                              : '--'}
                          </p>
                          <p className="text-sm text-muted-foreground">{outputSymbol}</p>
                          {isScheduled && intent.totalOutputReceived > 0n && (
                            <p className="text-xs text-primary mt-1">Accumulated</p>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Auction Visualization */}
                  {isAuction && isSealedBidAuction(intent) && (
                    <SealedBidAuctionSection intent={intent} />
                  )}
                  {isAuction && isDutchAuction(intent) && (
                    <DutchAuctionChart intent={intent} />
                  )}

                  {/* DCA/TWAP Progress Card */}
                  {isScheduled && (
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base flex items-center gap-2">
                          <Timer className="h-4 w-4" /> Progress
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">
                              {intentData.type === 'dca' ? 'Periods' : 'Chunks'}
                            </span>
                            <span className="font-medium">{chunksExecuted} / {totalChunks}</span>
                          </div>
                          <Progress value={progress} className="h-2" />
                        </div>

                        {!isScheduledCompleted && countdown && (
                          <div className="flex items-center justify-between p-3 rounded-md bg-primary/10 border border-primary/20">
                            <div className="flex items-center gap-2">
                              <Timer className="h-4 w-4 text-primary" />
                              <span className="text-sm text-muted-foreground">
                                Next {intentData.type === 'dca' ? 'buy' : 'chunk'}:
                              </span>
                            </div>
                            <span className="text-sm font-semibold text-primary">{countdown}</span>
                          </div>
                        )}

                        {isScheduledCompleted && (
                          <div className="flex items-center gap-2 p-3 rounded-md bg-primary/10 border border-primary/20">
                            <Check className="h-4 w-4 text-primary" />
                            <span className="text-sm text-primary">
                              All {totalChunks} {intentData.type === 'dca' ? 'periods' : 'chunks'} completed!
                            </span>
                          </div>
                        )}

                        {intent.totalOutputReceived > 0n && (
                          <div className="flex items-center justify-between p-3 rounded-md bg-muted/50 border border-border">
                            <div className="flex items-center gap-2">
                              <TrendingUp className="h-4 w-4 text-primary" />
                              <span className="text-sm text-muted-foreground">Total Accumulated:</span>
                            </div>
                            <span className="text-sm font-semibold text-primary">
                              {formatAmount(intent.totalOutputReceived, outputDecimals)} {outputSymbol}
                            </span>
                          </div>
                        )}

                        {intent.fills.length > 0 && (
                          <div className="space-y-2">
                            <span className="text-sm text-muted-foreground">
                              {intentData.type === 'dca' ? 'Period' : 'Chunk'} Fills:
                            </span>
                            <div className="flex flex-wrap gap-2">
                              {intent.fills.map((fill, idx) => (
                                <div
                                  key={`fill-${idx}`}
                                  className="flex items-center gap-1 text-xs px-2 py-1 rounded bg-primary/10 text-primary"
                                  title={`${formatAmount(fill.outputAmount, outputDecimals)} ${outputSymbol}`}
                                >
                                  <span>#{idx + 1}</span>
                                  {fill.txHash && (
                                    <a href={getTxUrl(fill.txHash)} target="_blank" rel="noopener noreferrer">
                                      <ArrowUpRight className="h-3 w-3" />
                                    </a>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  )}

                  {/* Details Card */}
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base flex items-center gap-2">
                        <User className="h-4 w-4" /> Details
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-0">
                      {renderRow('User', renderLink(intent.user, 'account'))}
                      {renderRow('Input Token', <span className="font-mono text-xs">{intentData.inputToken}</span>)}
                      {renderRow('Output Token', <span className="font-mono text-xs">{intentData.outputToken}</span>)}
                      {renderRow('Amount In', `${formatAmount(totalAmount, inputDecimals)} ${inputSymbol}`)}
                      {intent.totalOutputReceived > 0n && renderRow('Amount Out', `${formatAmount(intent.totalOutputReceived, outputDecimals)} ${outputSymbol}`)}
                      {solver && renderRow('Solver', renderLink(solver, 'account'))}
                    </CardContent>
                  </Card>

                  {/* Timestamps Card */}
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base flex items-center gap-2">
                        <Clock className="h-4 w-4" /> Timestamps
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-0">
                      {renderRow('Created At', formatTime(intent.createdAt))}
                      {intentData.deadline && renderRow('Deadline', formatTime(intentData.deadline))}
                      {intentData.expiry && renderRow('Expiry', formatTime(intentData.expiry))}
                    </CardContent>
                  </Card>

                  {/* Type-Specific Card */}
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base flex items-center gap-2">
                        <Zap className="h-4 w-4" /> {getIntentTypeDisplay(intentData.type)} Parameters
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-0">
                      {intentData.type === 'swap' && intentData.minAmountOut !== undefined && (
                        renderRow('Min Amount Out', `${formatAmount(intentData.minAmountOut, outputDecimals)} ${outputSymbol}`)
                      )}
                      {intentData.type === 'limit_order' && (
                        <>
                          {intentData.limitPrice !== undefined && renderRow('Limit Price', formatPrice(intentData.limitPrice))}
                        </>
                      )}
                      {intentData.type === 'twap' && (
                        <>
                          {intentData.numChunks !== undefined && renderRow('Total Chunks', intentData.numChunks.toString())}
                          {renderRow('Chunks Executed', chunksExecuted.toString())}
                          {intentData.intervalSeconds !== undefined && renderRow('Interval', formatInterval(intentData.intervalSeconds))}
                          {intentData.maxSlippageBps !== undefined && renderRow('Max Slippage', `${(intentData.maxSlippageBps / 100).toFixed(2)}%`)}
                        </>
                      )}
                      {intentData.type === 'dca' && (
                        <>
                          {intentData.totalPeriods !== undefined && renderRow('Total Periods', intentData.totalPeriods.toString())}
                          {renderRow('Periods Executed', chunksExecuted.toString())}
                          {intentData.amountPerPeriod !== undefined && renderRow('Amount Per Period', `${formatAmount(intentData.amountPerPeriod, inputDecimals)} ${inputSymbol}`)}
                          {intentData.intervalSeconds !== undefined && renderRow('Interval', formatInterval(intentData.intervalSeconds))}
                        </>
                      )}
                    </CardContent>
                  </Card>

                  {/* Transactions Card */}
                  {intent.fills.length > 0 && (
                    <Card>
                      <CardHeader className="pb-2"><CardTitle className="text-base">Transactions</CardTitle></CardHeader>
                      <CardContent className="space-y-0">
                        {intent.fills.slice(0, 5).map((fill, idx) => (
                          fill.txHash && renderRow(`Fill #${idx + 1}`, renderLink(fill.txHash, 'tx'))
                        ))}
                      </CardContent>
                    </Card>
                  )}
                </>
              );
            })()}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
