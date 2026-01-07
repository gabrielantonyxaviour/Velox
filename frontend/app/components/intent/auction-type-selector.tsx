'use client';

import { AuctionType } from '@/app/lib/velox/types';
import { Label } from '@/app/components/ui/label';
import { Clock, Gavel } from 'lucide-react';

interface AuctionTypeSelectorProps {
  value: AuctionType;
  onChange: (type: AuctionType) => void;
}

export function AuctionTypeSelector({ value, onChange }: AuctionTypeSelectorProps) {
  return (
    <div className="space-y-3">
      <Label className="text-sm text-muted-foreground">Auction Type</Label>
      <div className="grid grid-cols-2 gap-4">
        <button
          type="button"
          onClick={() => onChange(AuctionType.SEALED_BID)}
          className={`flex flex-col items-center justify-center rounded-lg border-2 p-4 cursor-pointer transition-colors ${
            value === AuctionType.SEALED_BID
              ? 'border-primary bg-primary/10'
              : 'border-border bg-muted/50 hover:bg-muted'
          }`}
        >
          <Gavel className={`h-6 w-6 mb-2 ${value === AuctionType.SEALED_BID ? 'text-primary' : 'text-muted-foreground'}`} />
          <span className="font-medium">Sealed Bid</span>
          <span className="text-xs text-muted-foreground text-center mt-1">
            Best offer wins
          </span>
        </button>

        <button
          type="button"
          onClick={() => onChange(AuctionType.DUTCH)}
          className={`flex flex-col items-center justify-center rounded-lg border-2 p-4 cursor-pointer transition-colors ${
            value === AuctionType.DUTCH
              ? 'border-amber-500 bg-amber-500/10'
              : 'border-border bg-muted/50 hover:bg-muted'
          }`}
        >
          <Clock className={`h-6 w-6 mb-2 ${value === AuctionType.DUTCH ? 'text-amber-400' : 'text-muted-foreground'}`} />
          <span className="font-medium">Dutch</span>
          <span className="text-xs text-muted-foreground text-center mt-1">
            First taker wins
          </span>
        </button>
      </div>
    </div>
  );
}
