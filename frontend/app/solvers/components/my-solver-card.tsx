'use client';

import { useState } from 'react';
import { Card } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Progress } from '@/app/components/ui/progress';
import { useSolverInfo } from '@/app/hooks/use-solvers';
import { useWalletContext } from '@/app/hooks/use-wallet-context';
import {
  addStake,
  addStakeNative,
  deactivateSolver,
  deactivateSolverNative,
  reactivateSolver,
  reactivateSolverNative,
} from './solver-transactions';
import {
  Loader2,
  CheckCircle,
  XCircle,
  Plus,
  Power,
  TrendingUp,
  RefreshCw,
} from 'lucide-react';

interface MySolverCardProps {
  address: string;
  onRefresh?: () => void;
}

export function MySolverCard({ address, onRefresh }: MySolverCardProps) {
  const { isPrivy, signRawHash, publicKeyHex, signAndSubmitTransaction } = useWalletContext();
  const { solver, isLoading, refetch } = useSolverInfo(address);

  const [additionalStake, setAdditionalStake] = useState('');
  const [isAddingStake, setIsAddingStake] = useState(false);
  const [isToggling, setIsToggling] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (isLoading) {
    return (
      <Card className="p-6">
        <div className="flex items-center justify-center py-8">
          <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
        </div>
      </Card>
    );
  }

  if (!solver) {
    return null;
  }

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

  const handleAddStake = async () => {
    if (!additionalStake || parseFloat(additionalStake) <= 0) return;

    setIsAddingStake(true);
    setError(null);

    try {
      const amount = BigInt(Math.floor(parseFloat(additionalStake) * 1e8));

      if (isPrivy && signRawHash && publicKeyHex) {
        await addStake(address, amount, signRawHash, publicKeyHex);
      } else if (signAndSubmitTransaction) {
        await addStakeNative(address, amount, signAndSubmitTransaction);
      }

      setAdditionalStake('');
      refetch();
      onRefresh?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add stake');
    } finally {
      setIsAddingStake(false);
    }
  };

  const handleToggleActive = async () => {
    setIsToggling(true);
    setError(null);

    try {
      if (solver.isActive) {
        if (isPrivy && signRawHash && publicKeyHex) {
          await deactivateSolver(address, signRawHash, publicKeyHex);
        } else if (signAndSubmitTransaction) {
          await deactivateSolverNative(address, signAndSubmitTransaction);
        }
      } else {
        if (isPrivy && signRawHash && publicKeyHex) {
          await reactivateSolver(address, signRawHash, publicKeyHex);
        } else if (signAndSubmitTransaction) {
          await reactivateSolverNative(address, signAndSubmitTransaction);
        }
      }

      refetch();
      onRefresh?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to toggle status');
    } finally {
      setIsToggling(false);
    }
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">My Solver Status</h2>
        <div className="flex items-center gap-2">
          {solver.isActive ? (
            <span className="flex items-center gap-1 text-sm text-green-500">
              <CheckCircle className="w-4 h-4" />
              Active
            </span>
          ) : (
            <span className="flex items-center gap-1 text-sm text-red-500">
              <XCircle className="w-4 h-4" />
              Inactive
            </span>
          )}
          <Button variant="ghost" size="icon" onClick={() => refetch()}>
            <RefreshCw className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Reputation Progress */}
      <div className="mb-6">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-muted-foreground">Reputation Score</span>
          <span className="font-medium">{(solver.reputationScore / 100).toFixed(1)}%</span>
        </div>
        <Progress value={solver.reputationScore / 100} className="h-3" />
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <div className="bg-muted/50 rounded-lg p-3 text-center">
          <p className="text-xs text-muted-foreground">Stake</p>
          <p className="text-lg font-bold">{(Number(solver.stake) / 1e8).toFixed(2)}</p>
          <p className="text-xs text-muted-foreground">MOVE</p>
        </div>
        <div className="bg-muted/50 rounded-lg p-3 text-center">
          <p className="text-xs text-muted-foreground">Volume</p>
          <p className="text-lg font-bold flex items-center justify-center gap-1">
            <TrendingUp className="w-3 h-3" />
            ${formatVolume(solver.totalVolume)}
          </p>
        </div>
        <div className="bg-muted/50 rounded-lg p-3 text-center">
          <p className="text-xs text-muted-foreground">Success Rate</p>
          <p className="text-lg font-bold text-green-500">{successRate}%</p>
        </div>
        <div className="bg-muted/50 rounded-lg p-3 text-center">
          <p className="text-xs text-muted-foreground">Total Solved</p>
          <p className="text-lg font-bold">{solver.totalIntentsSolved}</p>
        </div>
      </div>

      {/* Detailed Stats */}
      <div className="grid grid-cols-3 gap-4 text-sm mb-6">
        <div className="text-center">
          <p className="text-green-500 font-medium">{solver.successfulFills}</p>
          <p className="text-xs text-muted-foreground">Successful</p>
        </div>
        <div className="text-center">
          <p className="text-red-500 font-medium">{solver.failedFills}</p>
          <p className="text-xs text-muted-foreground">Failed</p>
        </div>
        <div className="text-center">
          <p className="font-medium">{(solver.averageSlippage / 100).toFixed(2)}%</p>
          <p className="text-xs text-muted-foreground">Avg Slippage</p>
        </div>
      </div>

      {error && (
        <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 mb-4">
          <p className="text-sm text-destructive">{error}</p>
        </div>
      )}

      {/* Actions */}
      <div className="space-y-3">
        <div className="flex gap-2">
          <Input
            type="number"
            placeholder="Amount to stake"
            value={additionalStake}
            onChange={(e) => setAdditionalStake(e.target.value)}
            disabled={isAddingStake}
            className="flex-1"
          />
          <Button
            onClick={handleAddStake}
            disabled={isAddingStake || !additionalStake || parseFloat(additionalStake) <= 0}
          >
            {isAddingStake ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <>
                <Plus className="w-4 h-4 mr-1" />
                Add Stake
              </>
            )}
          </Button>
        </div>

        <Button
          variant={solver.isActive ? 'destructive' : 'default'}
          onClick={handleToggleActive}
          disabled={isToggling}
          className="w-full"
        >
          {isToggling ? (
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          ) : (
            <Power className="w-4 h-4 mr-2" />
          )}
          {solver.isActive ? 'Deactivate Solver' : 'Reactivate Solver'}
        </Button>
      </div>
    </Card>
  );
}
