'use client';

import { useState, useEffect } from 'react';
import { IntentRecord, AuctionBid } from '@/app/lib/velox/types';
import { Separator } from '../ui/separator';
import { Timer, Trophy, Users, Clock, Medal, ExternalLink, Info } from 'lucide-react';
import { getExplorerUrl } from '@/app/lib/aptos';

interface SealedBidAuctionSectionProps {
  intent: IntentRecord;
}

function truncateAddress(addr: string): string {
  return addr.slice(0, 6) + '...' + addr.slice(-4);
}

function formatAmount(amount: bigint): string {
  return (Number(amount) / 1e8).toFixed(4);
}

function formatTimeRemaining(seconds: number): string {
  if (seconds <= 0) return 'Ended';
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  if (mins > 0) return `${mins}m ${secs}s`;
  return `${secs}s`;
}

function formatBidTime(timestamp: number): string {
  const date = new Date(timestamp * 1000);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
}

export function SealedBidAuctionSection({ intent }: SealedBidAuctionSectionProps) {
  const [timeRemaining, setTimeRemaining] = useState<number>(0);

  const isActive = intent.auctionStatus === 'active';
  const auctionEndTime = intent.auctionEndTime ?? (intent.createdAt + (intent.auctionDuration ?? 60));

  // Use real bids from intent if available, sorted by amount descending
  const bids = (intent.bids || []).sort((a, b) => Number(b.amount - a.amount));
  const hasBidData = bids.length > 0;
  const bidCount = intent.bidCount ?? 0;

  useEffect(() => {
    if (!isActive) {
      setTimeRemaining(0);
      return;
    }

    const updateCountdown = () => {
      const now = Math.floor(Date.now() / 1000);
      const remaining = auctionEndTime - now;
      setTimeRemaining(Math.max(0, remaining));
    };

    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);
    return () => clearInterval(timer);
  }, [isActive, auctionEndTime]);

  const getMedalIcon = (index: number) => {
    if (index === 0) return <Medal className="h-4 w-4 text-yellow-500" />;
    if (index === 1) return <Medal className="h-4 w-4 text-gray-400" />;
    if (index === 2) return <Medal className="h-4 w-4 text-amber-700" />;
    return <span className="w-4 text-center text-xs text-muted-foreground">#{index + 1}</span>;
  };

  return (
    <>
      <Separator />
      <div className="space-y-3">
        {/* Auction Status & Countdown */}
        <div className="flex items-center justify-between p-3 rounded-lg bg-primary/10">
          <div className="flex items-center gap-2">
            <Timer className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">
              {isActive ? 'Auction Ends In' : 'Auction Ended'}
            </span>
          </div>
          <span className={`font-bold text-lg ${isActive ? 'text-primary' : 'text-muted-foreground'}`}>
            {formatTimeRemaining(timeRemaining)}
          </span>
        </div>

        {/* Bid Stats */}
        <div className="grid grid-cols-2 gap-2">
          <div className="p-2 rounded bg-muted/30 text-center">
            <div className="flex items-center justify-center gap-1 text-muted-foreground">
              <Users className="h-3 w-3" />
              <span className="text-xs">Total Bids</span>
            </div>
            <p className="font-bold text-lg">{hasBidData ? bids.length : bidCount}</p>
          </div>
          <div className="p-2 rounded bg-muted/30 text-center">
            <div className="flex items-center justify-center gap-1 text-muted-foreground">
              <Trophy className="h-3 w-3" />
              <span className="text-xs">Highest Bid</span>
            </div>
            <p className="font-bold text-lg text-primary">
              {hasBidData ? formatAmount(bids[0].amount) : '--'}
            </p>
          </div>
        </div>

        {/* Bid Leaderboard */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium flex items-center gap-2">
            <Trophy className="h-4 w-4 text-primary" />
            Bid Leaderboard
          </h4>
          <div className="min-h-[100px] max-h-[180px] overflow-y-auto rounded-lg border border-border">
            <div className="p-2 space-y-1">
              {!hasBidData ? (
                <div className="text-center py-6 px-3">
                  <Info className="h-5 w-5 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">
                    Bid details are sealed until auction ends
                  </p>
                  <p className="text-xs text-muted-foreground/70 mt-1">
                    {bidCount > 0
                      ? `${bidCount} bid${bidCount > 1 ? 's' : ''} submitted`
                      : 'No bids yet'}
                  </p>
                </div>
              ) : (
                bids.map((bid, index) => (
                  <div
                    key={`${bid.bidder}-${bid.timestamp}`}
                    className={`flex items-center justify-between p-2 rounded-lg transition-colors ${
                      bid.isWinner
                        ? 'bg-primary/20 border border-primary/30'
                        : index === 0 && isActive
                        ? 'bg-primary/10 border border-primary/30'
                        : 'bg-muted/30 hover:bg-muted/50'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {getMedalIcon(index)}
                      <div>
                        <p className="font-mono text-xs">
                          {truncateAddress(bid.bidder)}
                        </p>
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                          <Clock className="h-2.5 w-2.5" />
                          {formatBidTime(bid.timestamp)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="text-right">
                        <p className={`font-bold ${bid.isWinner ? 'text-primary' : ''}`}>
                          {formatAmount(bid.amount)}
                        </p>
                        {bid.isWinner && (
                          <span className="text-xs text-primary">Winner</span>
                        )}
                      </div>
                      {bid.txHash && (
                        <a
                          href={getExplorerUrl(bid.txHash)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1 rounded hover:bg-muted/50"
                          onClick={(e) => e.stopPropagation()}
                          title="View transaction"
                        >
                          <ExternalLink className="h-3.5 w-3.5 text-primary" />
                        </a>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Winner Info */}
        {intent.auctionWinner && (
          <div className="flex items-center justify-between p-3 rounded-lg bg-primary/10 border border-primary/30">
            <div className="flex items-center gap-2">
              <Trophy className="h-4 w-4 text-primary" />
              <span className="text-sm">Winning Solver</span>
            </div>
            <a
              href={`https://explorer.movementnetwork.xyz/account/${intent.auctionWinner}?network=testnet`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs text-primary hover:underline"
            >
              {truncateAddress(intent.auctionWinner)}
            </a>
          </div>
        )}
      </div>
    </>
  );
}
