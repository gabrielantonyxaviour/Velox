'use client';

import { IntentStatus, IntentRecord, isPartiallyFilled } from '@/app/lib/velox/types';
import { Badge } from '@/app/components/ui/badge';
import { cn } from '@/app/lib/utils';

interface IntentStatusBadgeProps {
  status: IntentStatus;
  record?: IntentRecord; // Optional record to check for partial fills
  className?: string;
}

type BadgeVariant = 'warning' | 'info' | 'success' | 'muted' | 'destructive';

const statusConfig: Record<IntentStatus, { label: string; variant: BadgeVariant }> = {
  active: {
    label: 'Active',
    variant: 'warning',
  },
  filled: {
    label: 'Filled',
    variant: 'success',
  },
  cancelled: {
    label: 'Cancelled',
    variant: 'muted',
  },
  expired: {
    label: 'Expired',
    variant: 'destructive',
  },
};

export function IntentStatusBadge({ status, record, className }: IntentStatusBadgeProps) {
  // Check for partial fill (active but has some fills)
  if (record && status === 'active' && isPartiallyFilled(record)) {
    return (
      <Badge variant="info" className={cn("text-xs", className)}>
        Partial
      </Badge>
    );
  }

  const config = statusConfig[status];

  return (
    <Badge variant={config.variant} className={cn("text-xs", className)}>
      {config.label}
    </Badge>
  );
}
