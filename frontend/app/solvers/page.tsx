'use client';

import { useState } from 'react';
import { Header } from '@/app/components/layout/header';
import { Footer } from '@/app/components/layout/footer';
import { useWalletContext } from '@/app/hooks/use-wallet-context';
import { SolverStatsCard } from './components/solver-stats-card';
import { SolverLookup } from './components/solver-lookup';
import { RegisterSolverCard } from './components/register-solver-card';
import { MySolverCard } from './components/my-solver-card';

export default function SolversPage() {
  const { walletAddress } = useWalletContext();
  const [refreshKey, setRefreshKey] = useState(0);

  const handleRefresh = () => {
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header address={walletAddress || ''} />

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Solver Dashboard</h1>
            <p className="text-muted-foreground">
              View solver statistics, register as a solver, or lookup solver performance
            </p>
          </div>

          {/* Global Stats */}
          <SolverStatsCard key={`stats-${refreshKey}`} />

          {/* My Solver Status (if connected) */}
          {walletAddress && (
            <MySolverCard
              key={`my-solver-${refreshKey}`}
              address={walletAddress}
              onRefresh={handleRefresh}
            />
          )}

          {/* Register as Solver */}
          {walletAddress && (
            <RegisterSolverCard onSuccess={handleRefresh} />
          )}

          {/* Solver Lookup */}
          <SolverLookup key={`lookup-${refreshKey}`} />
        </div>
      </main>

      <Footer />
    </div>
  );
}
