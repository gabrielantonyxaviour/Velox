'use client';

import { AUCTION_TYPE, AuctionFormType } from '@/app/lib/velox/types';
import { Label } from '@/app/components/ui/label';
import { Clock, Gavel } from 'lucide-react';

interface AuctionTypeSelectorProps {
  value: AuctionFormType;
  onChange: (type: AuctionFormType) => void;
}

export function AuctionTypeSelector({ value, onChange }: AuctionTypeSelectorProps) {
  return (
    <div className="space-y-3">
      <Label className="text-sm text-muted-foreground">Auction Type</Label>
      <div className="grid grid-cols-2 gap-4">
        <button
          type="button"
          onClick={() => onChange(AUCTION_TYPE.SEALED_BID)}
          className={`flex flex-col items-center justify-center rounded-lg border-2 p-4 cursor-pointer transition-colors ${
            value === AUCTION_TYPE.SEALED_BID
              ? 'border-primary bg-primary/10'
              : 'border-border bg-muted/50 hover:bg-muted'
          }`}
        >
          <Gavel className={`h-6 w-6 mb-2 ${value === AUCTION_TYPE.SEALED_BID ? 'text-primary' : 'text-muted-foreground'}`} />
          <span className="font-medium">Sealed Bid</span>
        </button>

        <button
          type="button"
          onClick={() => onChange(AUCTION_TYPE.DUTCH)}
          className={`flex flex-col items-center justify-center rounded-lg border-2 p-4 cursor-pointer transition-colors ${
            value === AUCTION_TYPE.DUTCH
              ? 'border-primary bg-primary/10'
              : 'border-border bg-muted/50 hover:bg-muted'
          }`}
        >
          <Clock className={`h-6 w-6 mb-2 ${value === AUCTION_TYPE.DUTCH ? 'text-primary' : 'text-muted-foreground'}`} />
          <span className="font-medium">Dutch</span>
        </button>
      </div>
    </div>
  );
}
