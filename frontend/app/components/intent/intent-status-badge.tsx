'use client';

import { IntentStatus } from '@/app/lib/velox/types';
import { Badge } from '@/app/components/ui/badge';
import { cn } from '@/app/lib/utils';

interface IntentStatusBadgeProps {
  status: IntentStatus;
  className?: string;
}

const statusConfig: Record<IntentStatus, { label: string; variant: 'warning' | 'info' | 'success' | 'muted' | 'destructive' }> = {
  pending: {
    label: 'Pending',
    variant: 'warning',
  },
  partially_filled: {
    label: 'Partial',
    variant: 'info',
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

export function IntentStatusBadge({ status, className }: IntentStatusBadgeProps) {
  const config = statusConfig[status];

  return (
    <Badge variant={config.variant} className={cn("text-xs", className)}>
      {config.label}
    </Badge>
  );
}
