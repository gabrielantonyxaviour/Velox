'use client';

import { IntentRecord } from '@/app/lib/velox/types';
import { DCAIntentRow } from './dca-intent-row';
import { TWAPIntentRow } from './twap-intent-row';
import { SwapIntentRow } from './swap-intent-row';
import { LimitOrderIntentRow } from './limit-order-intent-row';
import { AuctionIntentRow } from './auction-intent-row';

interface IntentRowProps {
  intent: IntentRecord;
  onCancel?: (intentId: bigint) => void;
  onClick?: () => void;
  isCancelling?: boolean;
  compact?: boolean;
  periodFillTxHashes?: string[];
}

export function IntentRow({ intent, onCancel, onClick, isCancelling, compact, periodFillTxHashes }: IntentRowProps) {
  // Route to auction component if it's an auction intent
  if (intent.auctionType) {
    return (
      <AuctionIntentRow
        intent={intent}
        onCancel={onCancel}
        onClick={onClick}
        isCancelling={isCancelling}
        compact={compact}
      />
    );
  }

  // Route to specialized row components based on intent type
  switch (intent.intentType) {
    case 'dca':
      return (
        <DCAIntentRow
          intent={intent}
          onCancel={onCancel}
          onClick={onClick}
          isCancelling={isCancelling}
          periodFillTxHashes={periodFillTxHashes}
        />
      );

    case 'twap':
      return (
        <TWAPIntentRow
          intent={intent}
          onCancel={onCancel}
          onClick={onClick}
          isCancelling={isCancelling}
          chunkFillTxHashes={periodFillTxHashes}
        />
      );

    case 'limit_order':
      return (
        <LimitOrderIntentRow
          intent={intent}
          onCancel={onCancel}
          onClick={onClick}
          isCancelling={isCancelling}
          compact={compact}
        />
      );

    case 'swap':
    default:
      return (
        <SwapIntentRow
          intent={intent}
          onCancel={onCancel}
          onClick={onClick}
          isCancelling={isCancelling}
          compact={compact}
        />
      );
  }
}
