'use client';

import { useEffect, useState, useCallback } from 'react';
import { useParams } from 'next/navigation';
import { Header } from '@/app/components/layout/header';
import { Footer } from '@/app/components/layout/footer';
import { useWalletContext } from '@/app/hooks/use-wallet-context';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { Skeleton } from '@/app/components/ui/skeleton';
import { Progress } from '@/app/components/ui/progress';
import { IntentRecord, getIntentTypeDisplay } from '@/app/lib/velox/types';
import { getIntent, fetchIntentEvents, getIntentEventData, getScheduledIntentInfo, fetchPeriodFillEvents, ScheduledIntentInfo } from '@/app/lib/velox/queries';
import { MOVEMENT_CONFIGS, CURRENT_NETWORK } from '@/app/lib/aptos';
import { TOKENS } from '@/constants/contracts';
import { TOKEN_LIST } from '@/app/constants/tokens';
import { ExternalLink, ArrowRight, Clock, User, Zap, Timer, TrendingUp, Check, ArrowUpRight, Calendar } from 'lucide-react';

interface PeriodFill {
  txHash: string;
  periodNumber: number;
  inputAmount: bigint;
  outputAmount: bigint;
  filledAt: number;
}

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

function getTokenSymbol(address: string): string {
  const token = TOKEN_LIST.find((t) => t.address === address);
  if (token) return token.symbol;
  if (address === TOKENS.tUSDC.address) return 'tUSDC';
  if (address === TOKENS.tMOVE.address) return 'tMOVE';
  return address.slice(0, 8) + '...';
}

function getTokenDecimals(address: string): number {
  const token = TOKEN_LIST.find((t) => t.address === address);
  return token?.decimals || 8;
}

const STATUS_COLORS: Record<string, string> = {
  pending: 'bg-amber-500/10 text-amber-400',
  filled: 'bg-primary/10 text-primary',
  partially_filled: 'bg-primary/10 text-primary',
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
  const [scheduledInfo, setScheduledInfo] = useState<ScheduledIntentInfo | null>(null);
  const [periodFills, setPeriodFills] = useState<PeriodFill[]>([]);
  const [countdown, setCountdown] = useState<string>('');

  const isScheduledIntent = intent?.intentType === 'dca' || intent?.intentType === 'twap';

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
    async function fetchData() {
      try {
        setLoading(true);
        const id = BigInt(intentId);
        await fetchIntentEvents([id]);
        const data = await getIntent(id);
        if (data) {
          const eventData = getIntentEventData(id);
          if (eventData) {
            data.submissionTxHash = eventData.submissionTxHash || data.submissionTxHash;
            data.settlementTxHash = eventData.settlementTxHash || data.settlementTxHash;
            data.outputAmount = eventData.outputAmount || data.outputAmount;
          }
        }
        setIntent(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load intent');
      } finally {
        setLoading(false);
      }
    }
    if (intentId) fetchData();
  }, [intentId]);

  useEffect(() => {
    if (isScheduledIntent && intent) {
      fetchScheduledData();
      const interval = setInterval(fetchScheduledData, 10000);
      return () => clearInterval(interval);
    }
  }, [isScheduledIntent, intent, fetchScheduledData]);

  useEffect(() => {
    if (!scheduledInfo) return;

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
  }, [scheduledInfo]);

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
              const inputDecimals = getTokenDecimals(intent.inputToken);
              const outputDecimals = getTokenDecimals(intent.outputToken);
              const inputSymbol = getTokenSymbol(intent.inputToken);
              const outputSymbol = getTokenSymbol(intent.outputToken);

              const periodsExecuted = scheduledInfo?.chunksExecuted ?? intent.periodsExecuted ?? intent.chunksExecuted ?? periodFills.length;
              const totalPeriods = scheduledInfo?.totalChunks ?? intent.totalPeriods ?? intent.numChunks ?? 0;
              const progress = totalPeriods > 0 ? (periodsExecuted / totalPeriods) * 100 : 0;
              const isScheduledCompleted = scheduledInfo?.isCompleted || (totalPeriods > 0 && periodsExecuted >= totalPeriods);
              const totalOutputReceived = periodFills.reduce((acc, f) => acc + f.outputAmount, BigInt(0));

              return (
                <>
                  {/* Header Card */}
                  <Card>
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {intent.intentType === 'dca' && <Calendar className="h-5 w-5 text-primary" />}
                          {intent.intentType === 'twap' && <TrendingUp className="h-5 w-5 text-primary" />}
                          <CardTitle className="text-lg">Intent #{intent.id.toString()}</CardTitle>
                        </div>
                        <div className="flex gap-2">
                          <Badge className="bg-primary/10 text-primary">{getIntentTypeDisplay(intent.intentType)}</Badge>
                          {isScheduledIntent && isScheduledCompleted ? (
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
                          <p className="text-2xl font-bold">{formatAmount(intent.amountIn, inputDecimals)}</p>
                          <p className="text-sm text-muted-foreground">{inputSymbol}</p>
                        </div>
                        <ArrowRight className="h-6 w-6 text-muted-foreground" />
                        <div className="text-center">
                          {isScheduledIntent ? (
                            <>
                              <p className="text-2xl font-bold text-primary">
                                {totalOutputReceived > BigInt(0) ? formatAmount(totalOutputReceived, outputDecimals) : '--'}
                              </p>
                              <p className="text-sm text-muted-foreground">{outputSymbol}</p>
                              {totalOutputReceived > BigInt(0) && (
                                <p className="text-xs text-primary mt-1">Accumulated</p>
                              )}
                            </>
                          ) : (
                            <>
                              <p className="text-2xl font-bold">{intent.outputAmount ? formatAmount(intent.outputAmount, outputDecimals) : '--'}</p>
                              <p className="text-sm text-muted-foreground">{outputSymbol}</p>
                            </>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* DCA/TWAP Progress Card */}
                  {isScheduledIntent && (
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base flex items-center gap-2">
                          <Timer className="h-4 w-4" /> Progress
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {/* Progress Bar */}
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">
                              {intent.intentType === 'dca' ? 'Periods' : 'Chunks'}
                            </span>
                            <span className="font-medium">{periodsExecuted} / {totalPeriods}</span>
                          </div>
                          <Progress value={progress} className="h-2" />
                        </div>

                        {/* Countdown Timer */}
                        {!isScheduledCompleted && countdown && (
                          <div className="flex items-center justify-between p-3 rounded-md bg-primary/10 border border-primary/20">
                            <div className="flex items-center gap-2">
                              <Timer className="h-4 w-4 text-primary" />
                              <span className="text-sm text-muted-foreground">
                                Next {intent.intentType === 'dca' ? 'buy' : 'chunk'}:
                              </span>
                            </div>
                            <span className="text-sm font-semibold text-primary">{countdown}</span>
                          </div>
                        )}

                        {/* Completed Status */}
                        {isScheduledCompleted && (
                          <div className="flex items-center gap-2 p-3 rounded-md bg-primary/10 border border-primary/20">
                            <Check className="h-4 w-4 text-primary" />
                            <span className="text-sm text-primary">
                              All {totalPeriods} {intent.intentType === 'dca' ? 'periods' : 'chunks'} completed!
                            </span>
                          </div>
                        )}

                        {/* Accumulated Output */}
                        {totalOutputReceived > BigInt(0) && (
                          <div className="flex items-center justify-between p-3 rounded-md bg-muted/50 border border-border">
                            <div className="flex items-center gap-2">
                              <TrendingUp className="h-4 w-4 text-primary" />
                              <span className="text-sm text-muted-foreground">Total Accumulated:</span>
                            </div>
                            <span className="text-sm font-semibold text-primary">
                              {formatAmount(totalOutputReceived, outputDecimals)} {outputSymbol}
                            </span>
                          </div>
                        )}

                        {/* Period Fill Transactions */}
                        {periodFills.length > 0 && (
                          <div className="space-y-2">
                            <span className="text-sm text-muted-foreground">
                              {intent.intentType === 'dca' ? 'Period' : 'Chunk'} Fills:
                            </span>
                            <div className="flex flex-wrap gap-2">
                              {periodFills.map((fill) => (
                                <a
                                  key={fill.txHash}
                                  href={getTxUrl(fill.txHash)}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center gap-1 text-xs px-2 py-1 rounded bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                                  title={`#${fill.periodNumber}: ${formatAmount(fill.outputAmount, outputDecimals)} ${outputSymbol}`}
                                >
                                  <span>#{fill.periodNumber}</span>
                                  <ArrowUpRight className="h-3 w-3" />
                                </a>
                              ))}
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  )}

                  {/* Details Card */}
                  <Card>
                    <CardHeader className="pb-2"><CardTitle className="text-base flex items-center gap-2"><User className="h-4 w-4" /> Details</CardTitle></CardHeader>
                    <CardContent className="space-y-0">
                      {renderRow('User', renderLink(intent.user, 'account'))}
                      {renderRow('Input Token', <span className="font-mono text-xs">{intent.inputToken}</span>)}
                      {renderRow('Output Token', <span className="font-mono text-xs">{intent.outputToken}</span>)}
                      {renderRow('Amount In', `${formatAmount(intent.amountIn, inputDecimals)} ${inputSymbol}`)}
                      {!isScheduledIntent && intent.outputAmount && renderRow('Amount Out', `${formatAmount(intent.outputAmount, outputDecimals)} ${outputSymbol}`)}
                      {intent.filledAmount > BigInt(0) && renderRow('Filled Amount', formatAmount(intent.filledAmount, inputDecimals))}
                      {intent.executionPrice && renderRow('Execution Price', formatPrice(intent.executionPrice))}
                      {intent.solver && renderRow('Solver', renderLink(intent.solver, 'account'))}
                    </CardContent>
                  </Card>

                  {/* Timestamps Card */}
                  <Card>
                    <CardHeader className="pb-2"><CardTitle className="text-base flex items-center gap-2"><Clock className="h-4 w-4" /> Timestamps</CardTitle></CardHeader>
                    <CardContent className="space-y-0">
                      {renderRow('Created At', formatTime(intent.createdAt))}
                      {intent.deadline && renderRow('Deadline', formatTime(intent.deadline))}
                    </CardContent>
                  </Card>

                  {/* Type-Specific Card */}
                  <Card>
                    <CardHeader className="pb-2"><CardTitle className="text-base flex items-center gap-2"><Zap className="h-4 w-4" /> {getIntentTypeDisplay(intent.intentType)} Parameters</CardTitle></CardHeader>
                    <CardContent className="space-y-0">
                      {intent.intentType === 'swap' && intent.minAmountOut !== undefined && renderRow('Min Amount Out', `${formatAmount(intent.minAmountOut, outputDecimals)} ${outputSymbol}`)}
                      {intent.intentType === 'limit_order' && (<>
                        {intent.limitPrice !== undefined && renderRow('Limit Price', formatPrice(intent.limitPrice))}
                        {renderRow('Partial Fill', intent.partialFillAllowed ? 'Allowed' : 'Not Allowed')}
                      </>)}
                      {intent.intentType === 'twap' && (<>
                        {intent.numChunks !== undefined && renderRow('Total Chunks', intent.numChunks.toString())}
                        {renderRow('Chunks Executed', periodsExecuted.toString())}
                        {intent.intervalSeconds !== undefined && renderRow('Interval', formatInterval(intent.intervalSeconds))}
                        {intent.maxSlippageBps !== undefined && renderRow('Max Slippage', `${(intent.maxSlippageBps / 100).toFixed(2)}%`)}
                      </>)}
                      {intent.intentType === 'dca' && (<>
                        {intent.totalPeriods !== undefined && renderRow('Total Periods', intent.totalPeriods.toString())}
                        {renderRow('Periods Executed', periodsExecuted.toString())}
                        {intent.amountPerPeriod !== undefined && renderRow('Amount Per Period', `${formatAmount(intent.amountPerPeriod, inputDecimals)} ${inputSymbol}`)}
                        {intent.intervalSeconds !== undefined && renderRow('Interval', formatInterval(intent.intervalSeconds))}
                      </>)}
                    </CardContent>
                  </Card>

                  {/* Transactions Card */}
                  <Card>
                    <CardHeader className="pb-2"><CardTitle className="text-base">Transactions</CardTitle></CardHeader>
                    <CardContent className="space-y-0">
                      {intent.submissionTxHash ? renderRow('Submission Tx', renderLink(intent.submissionTxHash, 'tx')) : renderRow('Submission Tx', <span className="text-muted-foreground">--</span>)}
                      {intent.settlementTxHash ? renderRow('Settlement Tx', renderLink(intent.settlementTxHash, 'tx')) : renderRow('Settlement Tx', <span className="text-muted-foreground">--</span>)}
                    </CardContent>
                  </Card>
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
