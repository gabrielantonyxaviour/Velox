'use client';

import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/app/components/ui/dialog';
import { Button } from '@/app/components/ui/button';
import { Separator } from '@/app/components/ui/separator';
import { Token } from '@/app/constants/tokens';
import { getProtocolFeeBps, getSolverFeeBps } from '@/app/lib/velox/contract-reads';
import { Loader2, ArrowRight, Info } from 'lucide-react';

export type IntentType = 'swap' | 'limit_order' | 'dca' | 'twap';

export interface TransactionDetails {
  type: IntentType;
  inputToken: Token;
  outputToken: Token;
  inputAmount: string;
  outputAmount: string;
  // Swap specific
  deadline?: number;
  slippage?: number;
  // Limit order specific
  limitPrice?: string;
  expiry?: number;
  partialFillAllowed?: boolean;
  // DCA specific
  amountPerPeriod?: string;
  totalPeriods?: number;
  intervalSeconds?: number;
  // TWAP specific
  numChunks?: number;
  maxSlippageBps?: number;
  startTime?: number;
}

interface TransactionConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  details: TransactionDetails | null;
  onConfirm: () => void;
  onCancel: () => void;
  isLoading: boolean;
}

interface FeeBreakdown {
  protocolFeeBps: number;
  solverFeeBps: number;
  totalFeeBps: number;
  protocolFeeAmount: string;
  solverFeeAmount: string;
  totalFeeAmount: string;
  isLoading: boolean;
}

function formatDeadline(seconds: number): string {
  if (seconds < 60) return `${seconds}s`;
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h`;
  return `${Math.floor(seconds / 86400)}d`;
}

function formatInterval(seconds: number): string {
  if (seconds < 60) return `${seconds} seconds`;
  if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours`;
  return `${Math.floor(seconds / 86400)} days`;
}

function getIntentTitle(type: IntentType): string {
  switch (type) {
    case 'swap': return 'Swap';
    case 'limit_order': return 'Limit Order';
    case 'dca': return 'DCA Order';
    case 'twap': return 'TWAP Order';
  }
}

export function TransactionConfirmDialog({
  open,
  onOpenChange,
  details,
  onConfirm,
  onCancel,
  isLoading,
}: TransactionConfirmDialogProps) {
  const [fees, setFees] = useState<FeeBreakdown>({
    protocolFeeBps: 0,
    solverFeeBps: 0,
    totalFeeBps: 0,
    protocolFeeAmount: '0',
    solverFeeAmount: '0',
    totalFeeAmount: '0',
    isLoading: true,
  });

  useEffect(() => {
    const fetchFees = async () => {
      if (!open || !details) return;

      setFees(prev => ({ ...prev, isLoading: true }));

      try {
        const [protocolBps, solverBps] = await Promise.all([
          getProtocolFeeBps(),
          getSolverFeeBps(),
        ]);

        const inputAmountNum = parseFloat(details.inputAmount) || 0;
        const protocolFee = (inputAmountNum * protocolBps) / 10000;
        const solverFee = (inputAmountNum * solverBps) / 10000;
        const totalFee = protocolFee + solverFee;

        setFees({
          protocolFeeBps: protocolBps,
          solverFeeBps: solverBps,
          totalFeeBps: protocolBps + solverBps,
          protocolFeeAmount: protocolFee.toFixed(6),
          solverFeeAmount: solverFee.toFixed(6),
          totalFeeAmount: totalFee.toFixed(6),
          isLoading: false,
        });
      } catch (error) {
        console.error('Error fetching fees:', error);
        setFees(prev => ({ ...prev, isLoading: false }));
      }
    };

    fetchFees();
  }, [open, details]);

  if (!details) return null;

  const handleCancel = () => {
    onCancel();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Confirm {getIntentTitle(details.type)}</DialogTitle>
          <DialogDescription>
            Review the details of your transaction before confirming.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Token Exchange Display */}
          <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
            <div className="text-center">
              <p className="text-2xl font-bold">{details.inputAmount}</p>
              <p className="text-sm text-muted-foreground">{details.inputToken.symbol}</p>
            </div>
            <ArrowRight className="w-5 h-5 text-muted-foreground" />
            <div className="text-center">
              <p className="text-2xl font-bold">{details.outputAmount}</p>
              <p className="text-sm text-muted-foreground">{details.outputToken.symbol}</p>
            </div>
          </div>

          {/* Intent-specific details */}
          <div className="space-y-2 text-sm">
            {details.type === 'swap' && (
              <>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Deadline</span>
                  <span>{details.deadline ? formatDeadline(details.deadline) : '--'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Slippage Tolerance</span>
                  <span>{details.slippage ?? 0.5}%</span>
                </div>
              </>
            )}

            {details.type === 'limit_order' && (
              <>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Limit Price</span>
                  <span>{details.limitPrice} {details.outputToken.symbol}/{details.inputToken.symbol}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Expiry</span>
                  <span>{details.expiry ? formatDeadline(details.expiry) : '--'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Partial Fill</span>
                  <span>{details.partialFillAllowed ? 'Allowed' : 'Not Allowed'}</span>
                </div>
              </>
            )}

            {details.type === 'dca' && (
              <>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Amount Per Period</span>
                  <span>{details.amountPerPeriod} {details.inputToken.symbol}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Periods</span>
                  <span>{details.totalPeriods}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Interval</span>
                  <span>{details.intervalSeconds ? formatInterval(details.intervalSeconds) : '--'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Amount</span>
                  <span>{details.inputAmount} {details.inputToken.symbol}</span>
                </div>
              </>
            )}

            {details.type === 'twap' && (
              <>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Amount</span>
                  <span>{details.inputAmount} {details.inputToken.symbol}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Number of Chunks</span>
                  <span>{details.numChunks}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Interval</span>
                  <span>{details.intervalSeconds ? formatInterval(details.intervalSeconds) : '--'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Max Slippage</span>
                  <span>{details.maxSlippageBps ? (details.maxSlippageBps / 100).toFixed(2) : '0.5'}%</span>
                </div>
              </>
            )}
          </div>

          <Separator />

          {/* Fee Breakdown */}
          <div className="space-y-2">
            <div className="flex items-center gap-1 text-sm font-medium">
              <Info className="w-4 h-4" />
              Fee Breakdown
            </div>

            {fees.isLoading ? (
              <div className="flex items-center justify-center py-2">
                <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
              </div>
            ) : (
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Protocol Fee ({(fees.protocolFeeBps / 100).toFixed(2)}%)</span>
                  <span>{fees.protocolFeeAmount} {details.inputToken.symbol}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Solver Fee ({(fees.solverFeeBps / 100).toFixed(2)}%)</span>
                  <span>{fees.solverFeeAmount} {details.inputToken.symbol}</span>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between font-medium">
                  <span>Total Fees ({(fees.totalFeeBps / 100).toFixed(2)}%)</span>
                  <span>{fees.totalFeeAmount} {details.inputToken.symbol}</span>
                </div>
              </div>
            )}
          </div>

          {/* Network Info */}
          <div className="p-3 bg-muted/30 rounded-lg text-xs text-muted-foreground">
            <p>Transaction will be submitted to Movement Network. Gas fees apply.</p>
          </div>
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="outline" onClick={handleCancel} disabled={isLoading}>
            Cancel
          </Button>
          <Button onClick={onConfirm} disabled={isLoading || fees.isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Confirming...
              </>
            ) : (
              'Confirm Transaction'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
