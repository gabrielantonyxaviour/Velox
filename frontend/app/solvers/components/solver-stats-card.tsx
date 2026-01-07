'use client';

import { Card } from '@/app/components/ui/card';
import { useSolverStats } from '@/app/hooks/use-solvers';
import { Users, UserCheck, Coins, Loader2 } from 'lucide-react';

export function SolverStatsCard() {
  const { stats, isLoading, error } = useSolverStats();

  if (isLoading) {
    return (
      <Card className="p-6">
        <div className="flex items-center justify-center py-8">
          <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
        </div>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="p-6">
        <div className="text-center py-8 text-muted-foreground">
          <p>Failed to load solver stats</p>
          <p className="text-sm">{error}</p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <h2 className="text-lg font-semibold mb-4">Network Statistics</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-muted/50 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Users className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Solvers</p>
              <p className="text-2xl font-bold">{stats?.totalSolvers ?? 0}</p>
            </div>
          </div>
        </div>

        <div className="bg-muted/50 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-500/10 rounded-lg">
              <UserCheck className="w-5 h-5 text-green-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Active Solvers</p>
              <p className="text-2xl font-bold">{stats?.activeSolvers ?? 0}</p>
            </div>
          </div>
        </div>

        <div className="bg-muted/50 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-yellow-500/10 rounded-lg">
              <Coins className="w-5 h-5 text-yellow-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Staked</p>
              <p className="text-2xl font-bold">
                {stats?.totalStaked ? (Number(stats.totalStaked) / 1e8).toFixed(2) : '0'} MOVE
              </p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
