'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Clock, Calendar, TrendingUp, X, Loader2 } from 'lucide-react';

interface ScheduledOrder {
  id: bigint;
  type: 'twap' | 'dca' | 'conditional';
  inputTokenSymbol: string;
  outputTokenSymbol: string;
  totalAmount: string;
  executedAmount: string;
  nextExecutionTime: number;
  remainingExecutions: number;
  totalExecutions: number;
  intervalSeconds: number;
  status: 'active' | 'paused' | 'completed';
}

interface ScheduledOrdersProps {
  orders: ScheduledOrder[];
  loading: boolean;
  onCancel: (orderId: bigint) => void;
  cancellingId: bigint | null;
}

export function ScheduledOrders({ orders, loading, onCancel, cancellingId }: ScheduledOrdersProps) {
  const [currentTime, setCurrentTime] = useState(() => Math.floor(Date.now() / 1000));

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(Math.floor(Date.now() / 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTimeRemaining = (timestamp: number): string => {
    const diff = timestamp - currentTime;

    if (diff <= 0) return 'Executing...';
    if (diff < 60) return `${diff}s`;
    if (diff < 3600) return `${Math.floor(diff / 60)}m`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h`;
    return `${Math.floor(diff / 86400)}d`;
  };

  const getProgress = (order: ScheduledOrder): number => {
    const executed = order.totalExecutions - order.remainingExecutions;
    return (executed / order.totalExecutions) * 100;
  };

  const getOrderTypeLabel = (type: string): string => {
    switch (type) {
      case 'twap': return 'TWAP';
      case 'dca': return 'DCA';
      case 'conditional': return 'Conditional';
      default: return type.toUpperCase();
    }
  };

  const getOrderTypeIcon = (type: string) => {
    switch (type) {
      case 'twap': return <Clock className="w-4 h-4" />;
      case 'dca': return <Calendar className="w-4 h-4" />;
      case 'conditional': return <TrendingUp className="w-4 h-4" />;
      default: return null;
    }
  };

  if (loading) {
    return (
      <Card className="p-6 bg-card border-border">
        <div className="flex items-center justify-center py-8">
          <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
        </div>
      </Card>
    );
  }

  const activeOrders = orders.filter(o => o.status === 'active');

  if (activeOrders.length === 0) {
    return (
      <Card className="p-6 bg-card border-border">
        <h3 className="text-lg font-semibold mb-4">Scheduled Orders</h3>
        <div className="text-center py-8 text-muted-foreground">
          <Clock className="w-8 h-8 mx-auto mb-2 opacity-50" />
          <p>No active scheduled orders</p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6 bg-card border-border">
      <h3 className="text-lg font-semibold mb-4">Scheduled Orders</h3>

      <div className="space-y-4">
        {activeOrders.map((order) => (
          <div
            key={order.id.toString()}
            className="p-4 rounded-lg bg-muted/50 border border-border"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                {getOrderTypeIcon(order.type)}
                <span className="font-medium">{getOrderTypeLabel(order.type)}</span>
                <span className="text-muted-foreground">
                  {order.inputTokenSymbol} → {order.outputTokenSymbol}
                </span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onCancel(order.id)}
                disabled={cancellingId === order.id}
                className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive"
              >
                {cancellingId === order.id ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <X className="w-4 h-4" />
                )}
              </Button>
            </div>

            {/* Progress Bar */}
            <div className="mb-3">
              <div className="flex justify-between text-xs text-muted-foreground mb-1">
                <span>Progress</span>
                <span>
                  {order.totalExecutions - order.remainingExecutions}/{order.totalExecutions}
                </span>
              </div>
              <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary transition-all"
                  style={{ width: `${getProgress(order)}%` }}
                />
              </div>
            </div>

            {/* Details */}
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <span className="text-muted-foreground">Executed:</span>
                <span className="ml-1">{order.executedAmount} {order.inputTokenSymbol}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Remaining:</span>
                <span className="ml-1">
                  {(parseFloat(order.totalAmount) - parseFloat(order.executedAmount)).toFixed(4)} {order.inputTokenSymbol}
                </span>
              </div>
              <div className="col-span-2">
                <span className="text-muted-foreground">Next execution:</span>
                <span className="ml-1 text-primary">
                  {formatTimeRemaining(order.nextExecutionTime)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
