'use client';

import { useState, useEffect } from 'react';
import { getDutchAuction, getDutchPrice } from '@/app/lib/velox/transactions';
import { DutchAuction } from '@/app/lib/velox/types';
import { Progress } from '@/app/components/ui/progress';
import { Clock } from 'lucide-react';

interface DutchAuctionMonitorProps {
  intentId: bigint;
}

export function DutchAuctionMonitor({ intentId }: DutchAuctionMonitorProps) {
  const [auction, setAuction] = useState<DutchAuction | null>(null);
  const [currentPrice, setCurrentPrice] = useState<bigint>(BigInt(0));
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAuction = async () => {
      setIsLoading(true);
      const data = await getDutchAuction(intentId);
      setAuction(data);
      setIsLoading(false);
    };
    fetchAuction();
  }, [intentId]);

  useEffect(() => {
    if (!auction || !auction.isActive) return;

    const updatePrice = async () => {
      try {
        const price = await getDutchPrice(intentId);
        setCurrentPrice(price);

        const elapsed = Date.now() / 1000 - auction.startTime;
        const prog = Math.min((elapsed / auction.duration) * 100, 100);
        setProgress(prog);
      } catch (error) {
        console.error('Error fetching Dutch price:', error);
      }
    };

    updatePrice();
    const interval = setInterval(updatePrice, 500);
    return () => clearInterval(interval);
  }, [auction, intentId]);

  if (isLoading) {
    return (
      <div className="p-4 rounded-lg bg-muted/50 border border-border animate-pulse">
        <div className="h-4 bg-muted rounded w-1/3 mb-4"></div>
        <div className="h-8 bg-muted rounded w-full mb-2"></div>
        <div className="h-2 bg-muted rounded w-full"></div>
      </div>
    );
  }

  if (!auction) {
    return (
      <div className="p-4 rounded-lg bg-muted/50 border border-border">
        <p className="text-muted-foreground text-sm">Auction not found</p>
      </div>
    );
  }

  const priceDropPercent = auction.startPrice > BigInt(0)
    ? Number((auction.startPrice - currentPrice) * BigInt(100) / auction.startPrice)
    : 0;

  return (
    <div className="p-4 rounded-lg bg-card border border-amber-500/30">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-amber-400" />
          <span className="text-amber-400 font-medium">Dutch Auction</span>
        </div>
        {auction.isActive ? (
          <span className="px-2 py-1 text-xs bg-amber-500/20 text-amber-400 rounded-full">
            Active
          </span>
        ) : (
          <span className="px-2 py-1 text-xs bg-muted text-muted-foreground rounded-full">
            Ended
          </span>
        )}
      </div>

      <div className="space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Current Price:</span>
          <span className="text-foreground font-mono text-lg">
            {(Number(currentPrice) / 1e8).toFixed(4)}
          </span>
        </div>

        <Progress value={progress} className="h-2" />

        <div className="flex justify-between text-xs text-muted-foreground">
          <span>Start: {(Number(auction.startPrice) / 1e8).toFixed(4)}</span>
          <span>End: {(Number(auction.endPrice) / 1e8).toFixed(4)}</span>
        </div>

        <div className="pt-2 border-t border-border text-sm">
          <span className="text-muted-foreground">Price dropped: </span>
          <span className="text-amber-400">{priceDropPercent.toFixed(1)}%</span>
        </div>

        {auction.winner && (
          <div className="pt-2 border-t border-border">
            <span className="text-muted-foreground text-sm">Winner: </span>
            <span className="text-primary font-mono text-xs">
              {auction.winner.slice(0, 10)}...
            </span>
            <div className="text-muted-foreground text-sm mt-1">
              Accepted at: {(Number(auction.acceptedPrice) / 1e8).toFixed(4)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
