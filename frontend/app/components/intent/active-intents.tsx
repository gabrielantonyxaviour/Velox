'use client';

import { useState, useMemo } from 'react';
import { IntentRecord } from '@/app/lib/velox/types';
import { IntentRow } from './intent-row';
import { IntentDetailDialog } from './intent-detail-dialog';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Activity, Loader2 } from 'lucide-react';

interface ActiveIntentsProps {
  intents: IntentRecord[];
  loading: boolean;
  onCancel: (intentId: bigint) => void;
  cancellingId: bigint | null;
}

export function ActiveIntents({ intents, loading, onCancel, cancellingId }: ActiveIntentsProps) {
  const [selectedIntentId, setSelectedIntentId] = useState<bigint | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const activeIntents = intents.filter(
    (intent) => intent.status === 'active'
  );

  // Get the live intent data from the intents array (updates in real-time)
  const selectedIntent = useMemo(() => {
    if (!selectedIntentId) return null;
    return intents.find(i => i.id === selectedIntentId) || null;
  }, [intents, selectedIntentId]);

  // Only show when there are actual active intents
  if (activeIntents.length === 0) {
    return null;
  }

  const handleIntentClick = (intent: IntentRecord) => {
    setSelectedIntentId(intent.id);
    setIsDialogOpen(true);
  };

  return (
    <>
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
                onClick={() => handleIntentClick(intent)}
                isCancelling={cancellingId === intent.id}
                compact
              />
            ))}
          </div>
        </CardContent>
      </Card>

      <IntentDetailDialog
        intent={selectedIntent}
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
      />
    </>
  );
}
