'use client';

import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/app/components/ui/tabs';
import { SwapForm } from './swap-form';
import { LimitForm } from './limit-form';
import { TWAPForm } from './twap-form';
import { DCAForm } from './dca-form';
import { AuctionSwapForm } from './auction-swap-form';

interface IntentTabsProps {
  onSuccess?: (txHash: string) => void;
  onError?: (error: string) => void;
}

export function IntentTabs({ onSuccess, onError }: IntentTabsProps) {
  return (
    <div className="w-full max-w-lg mx-auto">
      <Tabs defaultValue="swap" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="swap">Swap</TabsTrigger>
          <TabsTrigger value="auction">Auction</TabsTrigger>
          <TabsTrigger value="limit">Limit</TabsTrigger>
          <TabsTrigger value="twap">TWAP</TabsTrigger>
          <TabsTrigger value="dca">DCA</TabsTrigger>
        </TabsList>

        <TabsContent value="swap">
          <SwapForm onSuccess={onSuccess} onError={onError} />
        </TabsContent>

        <TabsContent value="auction">
          <AuctionSwapForm onSuccess={onSuccess} onError={onError} />
        </TabsContent>

        <TabsContent value="limit">
          <LimitForm onSuccess={onSuccess} onError={onError} />
        </TabsContent>

        <TabsContent value="twap">
          <TWAPForm onSuccess={onSuccess} onError={onError} />
        </TabsContent>

        <TabsContent value="dca">
          <DCAForm onSuccess={onSuccess} onError={onError} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
