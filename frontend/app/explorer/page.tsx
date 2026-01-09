'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Header } from '@/app/components/layout/header';
import { Footer } from '@/app/components/layout/footer';
import { useWalletContext } from '@/app/hooks/use-wallet-context';
import { useAllIntents } from '@/app/hooks/use-all-intents';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { Skeleton } from '@/app/components/ui/skeleton';
import { Tabs, TabsList, TabsTrigger } from '@/app/components/ui/tabs';
import { getIntentTypeDisplay, IntentType } from '@/app/lib/velox/types';
import { MOVEMENT_CONFIGS, CURRENT_NETWORK } from '@/app/lib/aptos';
import { TOKENS } from '@/constants/contracts';
import { ExplorerIntentRow } from '@/app/components/intent/explorer-intent-row';

import { Activity, Users, ExternalLink } from 'lucide-react';

function getAccountExplorerUrl(address: string): string {
  const network = MOVEMENT_CONFIGS[CURRENT_NETWORK].explorer;
  return `https://explorer.movementnetwork.xyz/account/${address}?network=${network}`;
}

function formatAmount(amount: bigint): string {
  return (Number(amount) / 1e8).toFixed(2);
}

function formatTime(timestamp: number): string {
  if (!timestamp) return '--';
  const date = new Date(timestamp * 1000);
  return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function truncateAddress(addr: string): string {
  return addr.slice(0, 6) + '...' + addr.slice(-4);
}

function getTokenSymbol(address: string): string {
  if (address === TOKENS.tUSDC.address) return 'tUSDC';
  if (address === TOKENS.tMOVE.address) return 'tMOVE';
  return truncateAddress(address);
}

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

type FilterType = 'all' | IntentType | 'auction';

const FILTER_TABS: { value: FilterType; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'swap', label: 'Swap' },
  { value: 'limit_order', label: 'Limit' },
  { value: 'dca', label: 'DCA' },
  { value: 'twap', label: 'TWAP' },
  { value: 'auction', label: 'Auction' },
];

export default function ExplorerPage() {
  const { walletAddress } = useWalletContext();
  const { intents, solvers, loading } = useAllIntents();
  const [filter, setFilter] = useState<FilterType>('all');

  const filteredIntents = useMemo(() => {
    if (filter === 'all') return intents;
    if (filter === 'auction') return intents.filter(i => i.auctionType);
    // For specific type filters, exclude auction intents
    // (auction swaps should only appear in the Auction tab)
    return intents.filter(i => i.intentType === filter && !i.auctionType);
  }, [intents, filter]);

  const filledCount = intents.filter(i => i.status === 'filled').length;
  const pendingCount = intents.filter(i => i.status === 'pending').length;

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header address={walletAddress || ''} />

      <main className="flex-1 container mx-auto px-4 py-6 md:px-6 md:py-8">
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold mb-1">Velox Explorer</h1>
          <p className="text-sm text-muted-foreground">Real-time data from Velox smart contracts</p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          <Card>
            <CardContent className="p-3">
              <p className="text-xs text-muted-foreground">Total Intents</p>
              {loading ? <Skeleton className="h-6 w-12 mt-1" /> : (
                <p className="text-xl font-bold">{intents.length}</p>
              )}
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-3">
              <p className="text-xs text-muted-foreground">Filled</p>
              {loading ? <Skeleton className="h-6 w-12 mt-1" /> : (
                <p className="text-xl font-bold text-primary">{filledCount}</p>
              )}
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-3">
              <p className="text-xs text-muted-foreground">Pending</p>
              {loading ? <Skeleton className="h-6 w-12 mt-1" /> : (
                <p className="text-xl font-bold">{pendingCount}</p>
              )}
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-3">
              <p className="text-xs text-muted-foreground">Active Solvers</p>
              {loading ? <Skeleton className="h-6 w-12 mt-1" /> : (
                <p className="text-xl font-bold">{solvers.length}</p>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Recent Intents */}
          <div className="md:col-span-2">
            <Card>
              <CardHeader className="pb-2">
                <div className="flex flex-col gap-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Activity className="h-4 w-4" /> Recent Intents
                  </CardTitle>
                  <Tabs value={filter} onValueChange={(v) => setFilter(v as FilterType)} className="w-full">
                    <TabsList className="h-8 w-full justify-between">
                      {FILTER_TABS.map(tab => (
                        <TabsTrigger key={tab.value} value={tab.value} className="text-xs px-4 py-1 flex-1">
                          {tab.label}
                        </TabsTrigger>
                      ))}
                    </TabsList>
                  </Tabs>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                {loading ? (
                  <div className="p-4 space-y-3">
                    {[...Array(5)].map((_, i) => <Skeleton key={i} className="h-12 w-full" />)}
                  </div>
                ) : filteredIntents.length === 0 ? (
                  <p className="p-4 text-muted-foreground text-sm">
                    {filter === 'all' ? 'No intents yet' : filter === 'auction' ? 'No auction intents' : `No ${getIntentTypeDisplay(filter as IntentType)} intents`}
                  </p>
                ) : (
                  <div className="divide-y divide-border max-h-[500px] overflow-y-auto">
                    {filteredIntents.slice(0, 20).map(intent => (
                      <ExplorerIntentRow key={intent.id.toString()} intent={intent} />
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Solver Leaderboard */}
          <div>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Users className="h-4 w-4" /> Solver Leaderboard
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                {loading ? (
                  <div className="p-4 space-y-3">
                    {[...Array(3)].map((_, i) => <Skeleton key={i} className="h-10 w-full" />)}
                  </div>
                ) : solvers.length === 0 ? (
                  <p className="p-4 text-muted-foreground text-sm">No solvers yet</p>
                ) : (
                  <div className="divide-y divide-border max-h-[400px] overflow-y-auto">
                    {solvers.map((solver, idx) => (
                      <div key={solver.address} className="p-3 hover:bg-muted/50">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-muted-foreground">#{idx + 1}</span>
                            <a
                              href={getAccountExplorerUrl(solver.address)}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm font-mono hover:text-primary flex items-center gap-1"
                            >
                              {truncateAddress(solver.address)}
                              <ExternalLink className="h-3 w-3" />
                            </a>
                          </div>
                          <Badge className="bg-primary/10 text-primary text-xs">
                            {solver.fillCount} fills
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          Vol: {formatAmount(solver.totalVolume)} MOVE
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
