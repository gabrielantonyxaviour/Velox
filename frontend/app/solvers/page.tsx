'use client';

import { Header } from '@/app/components/layout/header';
import { Footer } from '@/app/components/layout/footer';
import { useWalletContext } from '@/app/hooks/use-wallet-context';
import { useSolverStats } from '@/app/hooks/use-solvers';
import { SolverList } from './components/solver-list';
import { getAllSolverMetadata } from '@/app/lib/solver-metadata';
import { Users, UserCheck, Coins, Loader2 } from 'lucide-react';
import { useEffect } from 'react';

function NetworkStats() {
  const { stats, isLoading } = useSolverStats();

  if (isLoading) {
    return (
      <div className="flex items-center gap-2 text-muted-foreground">
        <Loader2 className="w-4 h-4 animate-spin" />
        <span className="text-sm">Loading stats...</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-end gap-3">
      <div className="flex items-center gap-2">
        <Users className="w-4 h-4 text-primary" />
        <span className="text-sm text-muted-foreground">Total Solvers:</span>
        <span className="font-semibold">{stats?.totalSolvers ?? 0}</span>
      </div>
      <div className="flex items-center gap-2">
        <UserCheck className="w-4 h-4 text-primary" />
        <span className="text-sm text-muted-foreground">Active:</span>
        <span className="font-semibold text-primary">{stats?.activeSolvers ?? 0}</span>
      </div>
      <div className="flex items-center gap-2">
        <Coins className="w-4 h-4 text-primary" />
        <span className="text-sm text-muted-foreground">Total Staked:</span>
        <span className="font-semibold">
          {stats?.totalStaked ? (Number(stats.totalStaked) / 1e8).toFixed(2) : '0'} MOVE
        </span>
      </div>
    </div>
  );
}

export default function SolversPage() {
  const { walletAddress } = useWalletContext();

  // Debug: Log stored metadata on page load
  useEffect(() => {
    const metadata = getAllSolverMetadata();
    console.log('[Debug] All stored solver metadata:', metadata);
    console.log('[Debug] Your wallet address:', walletAddress);
  }, [walletAddress]);

  return (
    <div className="h-screen flex flex-col bg-background">
      <Header address={walletAddress || ''} />

      <main className="flex-1 container mx-auto px-4 py-6 flex flex-col min-h-0">
        {/* Header Section - Title left, Stats right */}
        <div className="flex items-start justify-between mb-6 flex-shrink-0">
          <div>
            <h1 className="text-3xl font-bold">Solver Network</h1>
            <p className="text-muted-foreground mt-1">
              Explore registered solvers and their performance metrics
            </p>
          </div>
          <NetworkStats />
        </div>

        {/* Full-height Solver List */}
        <div className="flex-1 min-h-0">
          <SolverList />
        </div>
      </main>

      <Footer />
    </div>
  );
}
