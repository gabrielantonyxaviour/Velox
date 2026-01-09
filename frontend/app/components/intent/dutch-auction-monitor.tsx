'use client';

import { useState, useEffect } from 'react';
import { IntentRecord, isDutchAuction, isAuctionActive } from '@/app/lib/velox/types';
import { Progress } from '@/app/components/ui/progress';
import { Clock } from 'lucide-react';

interface DutchAuctionMonitorProps {
  intent: IntentRecord;
}

export function DutchAuctionMonitor({ intent }: DutchAuctionMonitorProps) {
  const { auction } = intent;
  const [currentPrice, setCurrentPrice] = useState<bigint>(auction.startPrice ?? BigInt(0));
  const [progress, setProgress] = useState(0);

  const isActive = isAuctionActive(intent);
  const hasDutch = isDutchAuction(intent);

  useEffect(() => {
    if (!hasDutch || !isActive) return;
    if (!auction.startPrice || !auction.endPrice || !auction.startTime || !auction.duration) return;

    const updatePrice = () => {
      const now = Math.floor(Date.now() / 1000);
      const elapsed = now - auction.startTime!;

      // Calculate progress
      const prog = Math.min((elapsed / auction.duration!) * 100, 100);
      setProgress(prog);

      // Calculate current price
      if (elapsed >= auction.duration!) {
        setCurrentPrice(auction.endPrice!);
      } else {
        const priceRange = Number(auction.startPrice! - auction.endPrice!);
        const priceDrop = (priceRange * elapsed) / auction.duration!;
        setCurrentPrice(auction.startPrice! - BigInt(Math.floor(priceDrop)));
      }
    };

    updatePrice();
    const interval = setInterval(updatePrice, 500);
    return () => clearInterval(interval);
  }, [hasDutch, isActive, auction.startPrice, auction.endPrice, auction.startTime, auction.duration]);

  if (!hasDutch) {
    return (
      <div className="p-4 rounded-lg bg-muted/50 border border-border">
        <p className="text-muted-foreground text-sm">Not a Dutch auction</p>
      </div>
    );
  }

  if (!auction.startPrice || !auction.endPrice) {
    return (
      <div className="p-4 rounded-lg bg-muted/50 border border-border">
        <p className="text-muted-foreground text-sm">Auction data not available</p>
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
        {isActive ? (
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

        {auction.acceptedBy && (
          <div className="pt-2 border-t border-border">
            <span className="text-muted-foreground text-sm">Winner: </span>
            <span className="text-primary font-mono text-xs">
              {auction.acceptedBy.slice(0, 10)}...
            </span>
            {auction.acceptedPrice && (
              <div className="text-muted-foreground text-sm mt-1">
                Accepted at: {(Number(auction.acceptedPrice) / 1e8).toFixed(4)}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
