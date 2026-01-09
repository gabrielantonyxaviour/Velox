'use client';

import { IntentRecord } from '@/app/lib/velox/types';
import { IntentRow } from './intent-row';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Activity, Loader2 } from 'lucide-react';

interface ActiveIntentsProps {
  intents: IntentRecord[];
  loading: boolean;
  onCancel: (intentId: bigint) => void;
  cancellingId: bigint | null;
}

export function ActiveIntents({ intents, loading, onCancel, cancellingId }: ActiveIntentsProps) {
  const activeIntents = intents.filter(
    (intent) => intent.status === 'active'
  );

  // Only show when there are actual active intents
  if (activeIntents.length === 0) {
    return null;
  }

  return (
    <Card className="border-primary/20 bg-primary/5">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <Activity className="h-4 w-4 text-primary" />
          Active Intents
          {loading && <Loader2 className="h-3 w-3 animate-spin text-muted-foreground" />}
          <span className="ml-auto text-sm font-normal text-muted-foreground">
            {activeIntents.length} active
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {activeIntents.map((intent) => (
            <IntentRow
              key={intent.id.toString()}
              intent={intent}
              onCancel={onCancel}
              isCancelling={cancellingId === intent.id}
              compact
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
