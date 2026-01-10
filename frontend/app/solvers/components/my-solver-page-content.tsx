'use client';

import { useRouter } from 'next/navigation';
import { Header } from '@/app/components/layout/header';
import { Footer } from '@/app/components/layout/footer';
import { MySolverCard } from './my-solver-card';
import { RegisterSolverCard } from './register-solver-card';
import { Card } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Loader2 } from 'lucide-react';
import { useSolverInfo } from '@/app/hooks/use-solvers';
import { useState } from 'react';

interface MySolverPageContentProps {
  walletAddress: string;
}

export default function MySolverPageContent({ walletAddress }: MySolverPageContentProps) {
  const router = useRouter();
  const { solver, isLoading: isSolverLoading, refetch } = useSolverInfo(walletAddress || null);
  const [refreshKey, setRefreshKey] = useState(0);

  if (!walletAddress) {
    return (
      <div className="h-screen flex flex-col bg-background">
        <Header address="" />
        <main className="flex-1 container mx-auto px-4 py-6 flex items-center justify-center">
          <Card className="p-8 text-center max-w-md">
            <p className="text-lg font-semibold mb-2">Wallet Not Connected</p>
            <p className="text-muted-foreground mb-4">Please connect your wallet to manage your solver</p>
            <Button onClick={() => router.push('/')}>Go to Trade</Button>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  const handleRefresh = () => {
    refetch();
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <div className="h-screen flex flex-col bg-background">
      <Header address={walletAddress} />

      <main className="flex-1 container mx-auto px-4 py-6 flex flex-col min-h-0">
        {/* Title */}
        <div className="mb-6 flex-shrink-0">
          <h1 className="text-3xl font-bold">My Solver</h1>
          <p className="text-muted-foreground mt-1">
            Manage your solver registration and stake
          </p>
        </div>

        {/* Content */}
        <div className="flex-1 min-h-0 overflow-y-auto">
          {isSolverLoading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
            </div>
          ) : !solver ? (
            <RegisterSolverCard key={refreshKey} onSuccess={handleRefresh} />
          ) : (
            <MySolverCard key={refreshKey} address={walletAddress} onRefresh={handleRefresh} />
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
