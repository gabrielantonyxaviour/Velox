'use client';

import { useState } from 'react';
import { Card } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { useSolverInfo } from '@/app/hooks/use-solvers';
import { Search, Loader2, CheckCircle, XCircle, TrendingUp } from 'lucide-react';
import { Progress } from '@/app/components/ui/progress';

export function SolverLookup() {
  const [address, setAddress] = useState('');
  const [searchAddress, setSearchAddress] = useState<string | null>(null);
  const { solver, isLoading, error } = useSolverInfo(searchAddress);

  const handleSearch = () => {
    if (address.trim()) {
      setSearchAddress(address.trim());
    }
  };

  const formatVolume = (volume: bigint): string => {
    const num = Number(volume) / 1e8;
    if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(2)}M`;
    if (num >= 1_000) return `${(num / 1_000).toFixed(2)}K`;
    return num.toFixed(2);
  };

  const successRate = solver
    ? solver.totalIntentsSolved > 0
      ? ((solver.successfulFills / solver.totalIntentsSolved) * 100).toFixed(1)
      : '0'
    : '0';

  return (
    <Card className="p-6">
      <h2 className="text-lg font-semibold mb-4">Lookup Solver</h2>

      <div className="flex gap-2 mb-6">
        <Input
          placeholder="Enter solver address (0x...)"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="flex-1"
        />
        <Button onClick={handleSearch} disabled={isLoading || !address.trim()}>
          {isLoading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Search className="w-4 h-4" />
          )}
        </Button>
      </div>

      {error && (
        <div className="text-center py-4 text-destructive">
          <p>{error}</p>
        </div>
      )}

      {searchAddress && !isLoading && !solver && !error && (
        <div className="text-center py-8 text-muted-foreground">
          <p>No solver found at this address</p>
        </div>
      )}

      {solver && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {solver.isActive ? (
                <CheckCircle className="w-5 h-5 text-primary" />
              ) : (
                <XCircle className="w-5 h-5 text-destructive" />
              )}
              <span className={solver.isActive ? 'text-primary' : 'text-destructive'}>
                {solver.isActive ? 'Active' : 'Inactive'}
              </span>
            </div>
            <span className="text-sm text-muted-foreground font-mono">
              {solver.address.slice(0, 8)}...{solver.address.slice(-6)}
            </span>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Reputation</span>
              <span className="font-medium">{(solver.reputationScore / 100).toFixed(1)}%</span>
            </div>
            <Progress value={solver.reputationScore / 100} className="h-2" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-muted/50 rounded-lg p-3">
              <p className="text-sm text-muted-foreground">Total Solved</p>
              <p className="text-xl font-bold">{solver.totalIntentsSolved}</p>
            </div>
            <div className="bg-muted/50 rounded-lg p-3">
              <p className="text-sm text-muted-foreground">Success Rate</p>
              <p className="text-xl font-bold">{successRate}%</p>
            </div>
            <div className="bg-muted/50 rounded-lg p-3">
              <p className="text-sm text-muted-foreground">Volume</p>
              <p className="text-xl font-bold flex items-center gap-1">
                <TrendingUp className="w-4 h-4" />
                ${formatVolume(solver.totalVolume)}
              </p>
            </div>
            <div className="bg-muted/50 rounded-lg p-3">
              <p className="text-sm text-muted-foreground">Stake</p>
              <p className="text-xl font-bold">
                {(Number(solver.stake) / 1e8).toFixed(2)} MOVE
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Successful</span>
              <span className="text-primary">{solver.successfulFills}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Failed</span>
              <span className="text-destructive">{solver.failedFills}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Avg Slippage</span>
              <span>{(solver.averageSlippage / 100).toFixed(2)}%</span>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}
