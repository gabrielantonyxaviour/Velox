'use client';

import { useState } from 'react';
import { IntentRecord } from '@/app/lib/velox/types';
import { IntentRow } from './intent-row';
import { IntentDetailDialog } from './intent-detail-dialog';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Skeleton } from '../ui/skeleton';
import { History, Loader2 } from 'lucide-react';

interface IntentHistoryProps {
  intents: IntentRecord[];
  loading: boolean;
  onCancel?: (intentId: bigint) => void;
  cancellingId?: bigint | null;
}

function LoadingSkeleton() {
  return (
    <div className="space-y-2">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="p-3 rounded-lg bg-muted/50">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <Skeleton className="h-3 w-12" />
              <Skeleton className="h-4 w-32" />
            </div>
            <Skeleton className="h-5 w-16 rounded-full" />
          </div>
        </div>
      ))}
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-8 text-muted-foreground">
      <History className="h-8 w-8 mb-2 opacity-50" />
      <p className="text-sm">No intent history yet</p>
      <p className="text-xs mt-1">Your submitted intents will appear here</p>
    </div>
  );
}

export function IntentHistory({ intents, loading, onCancel, cancellingId }: IntentHistoryProps) {
  const [selectedIntent, setSelectedIntent] = useState<IntentRecord | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleIntentClick = (intent: IntentRecord) => {
    setSelectedIntent(intent);
    setDialogOpen(true);
  };

  if (loading && intents.length === 0) {
    return (
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <History className="h-4 w-4" />
            Intent History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <LoadingSkeleton />
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <History className="h-4 w-4" />
            Intent History
            {loading && <Loader2 className="h-3 w-3 animate-spin text-muted-foreground" />}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {intents.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="space-y-2 max-h-[400px] overflow-y-auto">
              {intents.map((intent) => (
                <IntentRow
                  key={intent.id.toString()}
                  intent={intent}
                  onCancel={onCancel}
                  onClick={() => handleIntentClick(intent)}
                  isCancelling={cancellingId === intent.id}
                />
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <IntentDetailDialog
        intent={selectedIntent}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />
    </>
  );
}
