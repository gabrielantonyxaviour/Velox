'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '@/app/components/ui/card';
import { Input } from '@/app/components/ui/input';
import { useAllSolvers, SolverListItem } from '@/app/hooks/use-all-solvers';
import {
  Search,
  Loader2,
  CheckCircle,
  XCircle,
  TrendingUp,
  ChevronRight,
  Users,
} from 'lucide-react';
import { Progress } from '@/app/components/ui/progress';

function SolverRow({ solver }: { solver: SolverListItem }) {
  const router = useRouter();

  const successRate =
    solver.totalIntentsSolved > 0
      ? ((solver.successfulFills / solver.totalIntentsSolved) * 100).toFixed(1)
      : '0';

  const formatVolume = (volume: bigint): string => {
    const num = Number(volume) / 1e8;
    if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(2)}M`;
    if (num >= 1_000) return `${(num / 1_000).toFixed(2)}K`;
    return num.toFixed(2);
  };

  const handleClick = () => {
    router.push(`/solvers/${solver.address}`);
  };

  return (
    <div
      onClick={handleClick}
      className="flex items-center justify-between p-4 rounded-lg bg-muted/30 hover:bg-muted/50 cursor-pointer transition-colors group"
    >
      <div className="flex items-center gap-4 flex-1 min-w-0">
        {/* Status Icon */}
        <div className="flex-shrink-0">
          {solver.isActive ? (
            <div className="p-2 rounded-full bg-primary/10">
              <CheckCircle className="w-5 h-5 text-primary" />
            </div>
          ) : (
            <div className="p-2 rounded-full bg-destructive/10">
              <XCircle className="w-5 h-5 text-destructive" />
            </div>
          )}
        </div>

        {/* Address & Reputation */}
        <div className="flex-1 min-w-0">
          <p className="font-mono text-sm truncate">
            {solver.address.slice(0, 10)}...{solver.address.slice(-8)}
          </p>
          <div className="flex items-center gap-2 mt-1">
            <Progress value={solver.reputationScore / 100} className="h-1.5 w-20" />
            <span className="text-xs text-muted-foreground">
              {(solver.reputationScore / 100).toFixed(0)}%
            </span>
          </div>
        </div>

        {/* Stats */}
        <div className="hidden md:flex items-center gap-6 text-sm">
          <div className="text-center">
            <p className="font-medium">{solver.totalIntentsSolved}</p>
            <p className="text-xs text-muted-foreground">Intents</p>
          </div>
          <div className="text-center">
            <p className="font-medium text-primary">{successRate}%</p>
            <p className="text-xs text-muted-foreground">Success</p>
          </div>
          <div className="text-center">
            <p className="font-medium flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              ${formatVolume(solver.totalVolume)}
            </p>
            <p className="text-xs text-muted-foreground">Volume</p>
          </div>
          <div className="text-center">
            <p className="font-medium">{(Number(solver.stake) / 1e8).toFixed(2)}</p>
            <p className="text-xs text-muted-foreground">Stake</p>
          </div>
        </div>
      </div>

      {/* Arrow */}
      <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors ml-4" />
    </div>
  );
}

export function SolverList() {
  const { solvers, isLoading, error } = useAllSolvers();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredSolvers = useMemo(() => {
    if (!searchQuery.trim()) return solvers;
    const query = searchQuery.toLowerCase();
    return solvers.filter((s) => s.address.toLowerCase().includes(query));
  }, [solvers, searchQuery]);

  return (
    <Card className="flex flex-col h-full">
      {/* Search Header */}
      <div className="p-4 border-b border-border">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search by solver address (0x...)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Solver List */}
      <div className="flex-1 overflow-y-auto p-4">
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <Loader2 className="w-8 h-8 animate-spin text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">Loading solvers...</p>
            </div>
          </div>
        ) : error ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center text-destructive">
              <p className="font-medium">Failed to load solvers</p>
              <p className="text-sm">{error}</p>
            </div>
          </div>
        ) : filteredSolvers.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center text-muted-foreground">
              <Users className="w-12 h-12 mx-auto mb-3 opacity-50" />
              {searchQuery ? (
                <>
                  <p className="font-medium">No solvers found</p>
                  <p className="text-sm">Try a different search query</p>
                </>
              ) : (
                <>
                  <p className="font-medium">No solvers registered yet</p>
                  <p className="text-sm">Be the first to register as a solver!</p>
                </>
              )}
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            {filteredSolvers.map((solver) => (
              <SolverRow key={solver.address} solver={solver} />
            ))}
          </div>
        )}
      </div>

      {/* Footer with count */}
      {!isLoading && !error && solvers.length > 0 && (
        <div className="p-3 border-t border-border text-center">
          <p className="text-xs text-muted-foreground">
            Showing {filteredSolvers.length} of {solvers.length} solvers
          </p>
        </div>
      )}
    </Card>
  );
}
