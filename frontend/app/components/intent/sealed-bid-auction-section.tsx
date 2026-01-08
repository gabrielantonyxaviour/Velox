'use client';

import { useState, useEffect } from 'react';
import { IntentRecord, AuctionBid } from '@/app/lib/velox/types';
import { Separator } from '../ui/separator';
import { Timer, Trophy, Users, Clock, Medal } from 'lucide-react';

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

// Generate mock bids for demo (in production, fetch from chain/indexer)
function generateMockBids(intent: IntentRecord): AuctionBid[] {
  if (intent.bids && intent.bids.length > 0) return intent.bids;

  const bidCount = intent.bidCount ?? 3;
  const bids: AuctionBid[] = [];
  const baseAmount = intent.minAmountOut ?? BigInt(1000000000);

  for (let i = 0; i < bidCount; i++) {
    const multiplier = 1 + (Math.random() * 0.2); // 1.0x to 1.2x base
    bids.push({
      bidder: `0x${Math.random().toString(16).slice(2, 10)}...${Math.random().toString(16).slice(2, 6)}`,
      amount: BigInt(Math.floor(Number(baseAmount) * multiplier)),
      timestamp: intent.createdAt + (i * 10),
      isWinner: i === 0 && intent.status === 'filled',
    });
  }

  // Sort by amount descending (highest bid first)
  return bids.sort((a, b) => Number(b.amount - a.amount));
}

export function SealedBidAuctionSection({ intent }: SealedBidAuctionSectionProps) {
  const [timeRemaining, setTimeRemaining] = useState<number>(0);
  const [bids, setBids] = useState<AuctionBid[]>([]);

  const isActive = intent.auctionStatus === 'active';
  const auctionEndTime = intent.auctionEndTime ?? (intent.createdAt + (intent.auctionDuration ?? 60));

  useEffect(() => {
    setBids(generateMockBids(intent));
  }, [intent]);

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
            <p className="font-bold text-lg">{bids.length}</p>
          </div>
          <div className="p-2 rounded bg-muted/30 text-center">
            <div className="flex items-center justify-center gap-1 text-muted-foreground">
              <Trophy className="h-3 w-3" />
              <span className="text-xs">Highest Bid</span>
            </div>
            <p className="font-bold text-lg text-primary">
              {bids.length > 0 ? formatAmount(bids[0].amount) : '--'}
            </p>
          </div>
        </div>

        {/* Bid Leaderboard */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium flex items-center gap-2">
            <Trophy className="h-4 w-4 text-primary" />
            Bid Leaderboard
          </h4>
          <div className="h-[180px] overflow-y-auto rounded-lg border border-border">
            <div className="p-2 space-y-1">
              {bids.length === 0 ? (
                <div className="text-center text-sm text-muted-foreground py-6">
                  No bids placed yet
                </div>
              ) : (
                bids.map((bid, index) => (
                  <div
                    key={`${bid.bidder}-${bid.timestamp}`}
                    className={`flex items-center justify-between p-2 rounded-lg transition-colors ${
                      bid.isWinner
                        ? 'bg-primary/20 border border-primary/30'
                        : index === 0 && isActive
                        ? 'bg-yellow-500/10 border border-yellow-500/30'
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
                    <div className="text-right">
                      <p className={`font-bold ${bid.isWinner ? 'text-primary' : ''}`}>
                        {formatAmount(bid.amount)}
                      </p>
                      {bid.isWinner && (
                        <span className="text-xs text-primary">Winner</span>
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
