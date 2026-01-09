'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Progress } from '@/app/components/ui/progress';
import { useSolverInfo } from '@/app/hooks/use-solvers';
import { useWalletContext } from '@/app/hooks/use-wallet-context';
import { getSolverMetadata, type SolverMetadata } from '@/app/lib/solver-metadata';
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
  Globe,
  Twitter,
  MessageCircle,
  Wallet,
  ExternalLink,
} from 'lucide-react';
import Image from 'next/image';

interface MySolverCardProps {
  address: string;
  onRefresh?: () => void;
}

export function MySolverCard({ address, onRefresh }: MySolverCardProps) {
  const { isPrivy, signRawHash, publicKeyHex, signAndSubmitTransaction, signTransaction } = useWalletContext();
  const { solver, isLoading, refetch } = useSolverInfo(address);

  const [metadata, setMetadata] = useState<SolverMetadata | null>(null);
  const [additionalStake, setAdditionalStake] = useState('');
  const [isAddingStake, setIsAddingStake] = useState(false);
  const [isToggling, setIsToggling] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (address) {
      const storedMetadata = getSolverMetadata(address);
      setMetadata(storedMetadata);
    }
  }, [address]);

  if (isLoading) {
    return (
      <Card className="p-6">
        <div className="flex items-center justify-center py-8">
          <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
        </div>
      </Card>
    );
  }

  if (!solver) return null;

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
      } else if (signTransaction && signAndSubmitTransaction) {
        await addStakeNative(address, amount, signTransaction, signAndSubmitTransaction);
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
        } else if (signTransaction && signAndSubmitTransaction) {
          await deactivateSolverNative(address, signTransaction, signAndSubmitTransaction);
        }
      } else {
        if (isPrivy && signRawHash && publicKeyHex) {
          await reactivateSolver(address, signRawHash, publicKeyHex);
        } else if (signTransaction && signAndSubmitTransaction) {
          await reactivateSolverNative(address, signTransaction, signAndSubmitTransaction);
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

  const truncateAddress = (addr: string) =>
    `${addr.slice(0, 8)}...${addr.slice(-6)}`;

  return (
    <Card className="p-6">
      {/* Header with Profile */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          {metadata?.imageUrl ? (
            <div className="relative w-12 h-12 rounded-full overflow-hidden">
              <Image
                src={metadata.imageUrl}
                alt={metadata.name || 'Solver'}
                fill
                className="object-cover"
              />
            </div>
          ) : (
            <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
              <span className="text-lg font-bold text-muted-foreground">
                {(metadata?.name || 'S')[0].toUpperCase()}
              </span>
            </div>
          )}
          <div>
            <h2 className="text-lg font-semibold">
              {metadata?.name || 'My Solver'}
            </h2>
            {metadata?.description && (
              <p className="text-xs text-muted-foreground line-clamp-1 max-w-[200px]">
                {metadata.description}
              </p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          {solver.isActive ? (
            <span className="flex items-center gap-1 text-sm text-primary">
              <CheckCircle className="w-4 h-4" />
              Active
            </span>
          ) : (
            <span className="flex items-center gap-1 text-sm text-destructive">
              <XCircle className="w-4 h-4" />
              Inactive
            </span>
          )}
          <Button variant="ghost" size="icon" onClick={() => refetch()}>
            <RefreshCw className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Operator Wallet Info */}
      {metadata?.operatorWallet && (
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4 bg-muted/30 rounded px-3 py-2">
          <Wallet className="w-4 h-4" />
          <span>Operator:</span>
          <code className="text-xs">{truncateAddress(metadata.operatorWallet)}</code>
        </div>
      )}

      {/* Social Links */}
      {(metadata?.website || metadata?.twitter || metadata?.discord) && (
        <div className="flex items-center gap-3 mb-4">
          {metadata.website && (
            <a
              href={metadata.website.startsWith('http') ? metadata.website : `https://${metadata.website}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Globe className="w-4 h-4" />
            </a>
          )}
          {metadata.twitter && (
            <a
              href={`https://twitter.com/${metadata.twitter.replace('@', '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Twitter className="w-4 h-4" />
            </a>
          )}
          {metadata.discord && (
            <a
              href={metadata.discord.startsWith('http') ? metadata.discord : `https://discord.gg/${metadata.discord}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
            </a>
          )}
          {metadata.metadataUri && (
            <a
              href={metadata.metadataUri}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors ml-auto"
              title="View metadata on IPFS"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
        </div>
      )}

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
          <p className="text-lg font-bold text-primary">{successRate}%</p>
        </div>
        <div className="bg-muted/50 rounded-lg p-3 text-center">
          <p className="text-xs text-muted-foreground">Total Solved</p>
          <p className="text-lg font-bold">{solver.totalIntentsSolved}</p>
        </div>
      </div>

      {/* Detailed Stats */}
      <div className="grid grid-cols-3 gap-4 text-sm mb-6">
        <div className="text-center">
          <p className="text-primary font-medium">{solver.successfulFills}</p>
          <p className="text-xs text-muted-foreground">Successful</p>
        </div>
        <div className="text-center">
          <p className="text-destructive font-medium">{solver.failedFills}</p>
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
