'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Header } from '@/app/components/layout/header';
import { Footer } from '@/app/components/layout/footer';
import { useWalletContext } from '@/app/hooks/use-wallet-context';
import { useSolverInfo } from '@/app/hooks/use-solvers';
import { getSolverMetadata, getAllSolverMetadata } from '@/app/lib/solver-metadata';
import { Card } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Progress } from '@/app/components/ui/progress';
import {
  ArrowLeft,
  Loader2,
  CheckCircle,
  XCircle,
  TrendingUp,
  TrendingDown,
  Copy,
  ExternalLink,
  RefreshCw,
  Target,
  Zap,
  Shield,
  Clock,
} from 'lucide-react';
import { MOVEMENT_CONFIGS, CURRENT_NETWORK } from '@/app/lib/aptos';

function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
}: {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: React.ComponentType<{ className?: string }>;
  trend?: 'up' | 'down' | 'neutral';
}) {
  return (
    <Card className="p-4">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="text-2xl font-bold mt-1">{value}</p>
          {subtitle && (
            <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
          )}
        </div>
        <div
          className={`p-2 rounded-lg ${
            trend === 'up'
              ? 'bg-primary/10'
              : trend === 'down'
              ? 'bg-destructive/10'
              : 'bg-muted'
          }`}
        >
          <Icon
            className={`w-5 h-5 ${
              trend === 'up'
                ? 'text-primary'
                : trend === 'down'
                ? 'text-destructive'
                : 'text-muted-foreground'
            }`}
          />
        </div>
      </div>
    </Card>
  );
}

export default function SolverDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { walletAddress } = useWalletContext();
  const address = params.address as string;
  const { solver, isLoading, error, refetch } = useSolverInfo(address);
  const [metadata, setMetadata] = useState<any>(null);

  useEffect(() => {
    // Fetch metadata with fallback
    let solverMetadata = getSolverMetadata(address);

    // If not found by address, check all stored metadata and use the most recent one
    if (!solverMetadata) {
      const allMetadata = getAllSolverMetadata();
      const metadataArray = Object.values(allMetadata);
      if (metadataArray.length > 0) {
        // Use the most recently created metadata
        solverMetadata = metadataArray.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0))[0];
      }
    }

    setMetadata(solverMetadata);
  }, [address]);

  const copyAddress = () => {
    if (metadata?.operatorWallet) {
      navigator.clipboard.writeText(metadata.operatorWallet);
    }
  };

  const openExplorer = () => {
    if (!metadata?.operatorWallet) return;
    const network = MOVEMENT_CONFIGS[CURRENT_NETWORK].explorer;
    window.open(
      `https://explorer.movementnetwork.xyz/account/${metadata.operatorWallet}?network=${network}`,
      '_blank'
    );
  };

  const successRate =
    solver && solver.totalIntentsSolved > 0
      ? ((solver.successfulFills / solver.totalIntentsSolved) * 100).toFixed(1)
      : '0';

  const formatVolume = (volume: bigint): string => {
    const num = Number(volume) / 1e8;
    if (num >= 1_000_000) return `$${(num / 1_000_000).toFixed(2)}M`;
    if (num >= 1_000) return `$${(num / 1_000).toFixed(2)}K`;
    return `$${num.toFixed(2)}`;
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header address={walletAddress || ''} />

      <main className="flex-1 container mx-auto px-4 py-6">
        {/* Back Button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.push('/solvers')}
          className="mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>

        {/* Solver Profile Header */}
        {metadata && (
          <Card className="p-8 mb-6">
            <div className="flex gap-6 items-start">
              {/* Profile Image */}
              <div className="flex-shrink-0">
                {metadata.imageUrl ? (
                  <Image
                    src={metadata.imageUrl}
                    alt={metadata.name}
                    width={120}
                    height={120}
                    className="rounded-lg object-cover w-32 h-32"
                  />
                ) : (
                  <div className="w-32 h-32 rounded-lg bg-primary/20 flex items-center justify-center text-4xl font-bold">
                    {metadata.name?.charAt(0).toUpperCase() || '?'}
                  </div>
                )}
              </div>

              {/* Profile Info */}
              <div className="flex-1">
                <h1 className="text-4xl font-bold">{metadata.name}</h1>
                <div className="flex items-center gap-2 mt-2">
                  <span className="font-mono text-sm text-muted-foreground">
                    {metadata.operatorWallet.slice(0, 12)}...{metadata.operatorWallet.slice(-10)}
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6"
                    onClick={() => navigator.clipboard.writeText(metadata.operatorWallet)}
                  >
                    <Copy className="w-3 h-3" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-6 w-6" onClick={openExplorer}>
                    <ExternalLink className="w-3 h-3" />
                  </Button>
                </div>

                {metadata.description && (
                  <p className="text-muted-foreground mt-4 max-w-2xl">
                    {metadata.description}
                  </p>
                )}

                {/* Social Links */}
                {(metadata.website || metadata.twitter || metadata.discord) && (
                  <div className="flex gap-3 mt-4">
                    {metadata.website && (
                      <Button variant="outline" size="sm" asChild>
                        <a href={metadata.website} target="_blank" rel="noopener noreferrer">
                          Website
                        </a>
                      </Button>
                    )}
                    {metadata.twitter && (
                      <Button variant="outline" size="sm" asChild>
                        <a
                          href={`https://twitter.com/${metadata.twitter.replace('@', '')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Twitter
                        </a>
                      </Button>
                    )}
                    {metadata.discord && (
                      <Button variant="outline" size="sm" asChild>
                        <a href={`https://discord.gg/${metadata.discord}`} target="_blank" rel="noopener noreferrer">
                          Discord
                        </a>
                      </Button>
                    )}
                  </div>
                )}
              </div>

              {/* Refresh Button */}
              <Button variant="outline" size="sm" onClick={refetch}>
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </Button>
            </div>
          </Card>
        )}

        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
          </div>
        ) : error ? (
          <Card className="p-8 text-center">
            <p className="text-destructive font-medium">Error loading solver data</p>
            <p className="text-sm text-muted-foreground mt-1">{error}</p>
          </Card>
        ) : !solver ? (
          <Card className="p-8 text-center">
            <p className="text-muted-foreground">Solver not found</p>
            <p className="text-sm text-muted-foreground mt-1">
              This address is not registered as a solver
            </p>
          </Card>
        ) : (
          <div className="space-y-6">
            {/* Status Banner */}
            <Card
              className={`p-4 ${
                solver.isActive
                  ? 'bg-primary/5 border-primary/20'
                  : 'bg-destructive/5 border-destructive/20'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {solver.isActive ? (
                    <CheckCircle className="w-6 h-6 text-primary" />
                  ) : (
                    <XCircle className="w-6 h-6 text-destructive" />
                  )}
                  <div>
                    <p className="font-semibold">
                      {solver.isActive ? 'Active Solver' : 'Inactive Solver'}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {solver.isActive
                        ? 'Currently accepting intents'
                        : 'Not accepting intents'}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Reputation Score</p>
                  <p className="text-2xl font-bold">
                    {(solver.reputationScore / 100).toFixed(1)}%
                  </p>
                </div>
              </div>
              <Progress
                value={solver.reputationScore / 100}
                className="h-2 mt-4"
              />
            </Card>

            {/* Key Metrics Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <StatCard
                title="Total Volume"
                value={formatVolume(solver.totalVolume)}
                icon={TrendingUp}
                trend="up"
              />
              <StatCard
                title="Intents Solved"
                value={solver.totalIntentsSolved}
                subtitle={`${solver.successfulFills} successful`}
                icon={Target}
                trend="neutral"
              />
              <StatCard
                title="Success Rate"
                value={`${successRate}%`}
                subtitle={`${solver.failedFills} failed`}
                icon={Zap}
                trend={Number(successRate) >= 90 ? 'up' : 'down'}
              />
              <StatCard
                title="Stake"
                value={`${(Number(solver.stake) / 1e8).toFixed(2)}`}
                subtitle="MOVE staked"
                icon={Shield}
                trend="neutral"
              />
            </div>

            {/* Performance Analytics */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Fill Statistics */}
              <Card className="p-6">
                <h3 className="font-semibold mb-4">Fill Statistics</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-muted-foreground">Successful Fills</span>
                      <span className="text-primary font-medium">
                        {solver.successfulFills}
                      </span>
                    </div>
                    <Progress
                      value={
                        solver.totalIntentsSolved > 0
                          ? (solver.successfulFills / solver.totalIntentsSolved) * 100
                          : 0
                      }
                      className="h-2"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-muted-foreground">Failed Fills</span>
                      <span className="text-destructive font-medium">
                        {solver.failedFills}
                      </span>
                    </div>
                    <Progress
                      value={
                        solver.totalIntentsSolved > 0
                          ? (solver.failedFills / solver.totalIntentsSolved) * 100
                          : 0
                      }
                      className="h-2 [&>div]:bg-destructive"
                    />
                  </div>
                </div>
              </Card>

              {/* Performance Metrics */}
              <Card className="p-6">
                <h3 className="font-semibold mb-4">Performance Metrics</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <TrendingDown className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">Average Slippage</span>
                    </div>
                    <span className="font-medium">
                      {(solver.averageSlippage / 100).toFixed(2)}%
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">Avg Volume/Intent</span>
                    </div>
                    <span className="font-medium">
                      {solver.totalIntentsSolved > 0
                        ? formatVolume(solver.totalVolume / BigInt(solver.totalIntentsSolved))
                        : '$0.00'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">Stake per Intent</span>
                    </div>
                    <span className="font-medium">
                      {solver.totalIntentsSolved > 0
                        ? `${(Number(solver.stake) / 1e8 / solver.totalIntentsSolved).toFixed(4)} MOVE`
                        : '0 MOVE'}
                    </span>
                  </div>
                </div>
              </Card>
            </div>

            {/* Raw Data */}
            <Card className="p-6">
              <h3 className="font-semibold mb-4">Raw Data</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Stake (raw)</p>
                  <p className="font-mono">{solver.stake.toString()}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Volume (raw)</p>
                  <p className="font-mono">{solver.totalVolume.toString()}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Reputation (raw)</p>
                  <p className="font-mono">{solver.reputationScore}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Avg Slippage (raw)</p>
                  <p className="font-mono">{solver.averageSlippage}</p>
                </div>
              </div>
            </Card>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
