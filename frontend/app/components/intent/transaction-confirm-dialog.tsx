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
import { isSponsorshipEnabled } from '@/app/lib/shinami/client';
import { Loader2, ArrowRight, Info, Fuel, Sparkles } from 'lucide-react';

export type IntentType = 'swap' | 'limit_order' | 'dca' | 'twap' | 'auction_sealed_bid' | 'auction_dutch';

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
  // Auction specific
  auctionDuration?: number;
  dutchStartPrice?: string;
  dutchEndPrice?: string;
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

interface GasInfo {
  isSponsored: boolean;
  estimatedGasCost: string;
  estimatedGasUsd: string;
  isLoading: boolean;
}

// Estimated gas units for different intent types
const GAS_ESTIMATES: Record<IntentType, number> = {
  swap: 5000,
  limit_order: 6000,
  dca: 8000,
  twap: 8000,
  auction_sealed_bid: 7000,
  auction_dutch: 7000,
};

// Approximate MOVE price in USD (could be fetched from an oracle)
const MOVE_PRICE_USD = 0.75;

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
    case 'auction_sealed_bid': return 'Sealed-Bid Auction';
    case 'auction_dutch': return 'Dutch Auction';
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

  const [gasInfo, setGasInfo] = useState<GasInfo>({
    isSponsored: false,
    estimatedGasCost: '0',
    estimatedGasUsd: '0',
    isLoading: true,
  });

  useEffect(() => {
    const fetchFees = async () => {
      if (!open || !details) return;

      setFees(prev => ({ ...prev, isLoading: true }));
      setGasInfo(prev => ({ ...prev, isLoading: true }));

      try {
        const [protocolBps, solverBps, sponsored] = await Promise.all([
          getProtocolFeeBps(),
          getSolverFeeBps(),
          isSponsorshipEnabled(),
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

        // Calculate estimated gas cost
        const gasUnits = GAS_ESTIMATES[details.type];
        const gasPrice = 100; // octas per gas unit (approximate)
        const gasCostOctas = gasUnits * gasPrice;
        const gasCostMove = gasCostOctas / 1e8;
        const gasCostUsd = gasCostMove * MOVE_PRICE_USD;

        setGasInfo({
          isSponsored: sponsored,
          estimatedGasCost: gasCostMove.toFixed(6),
          estimatedGasUsd: gasCostUsd.toFixed(4),
          isLoading: false,
        });
      } catch (error) {
        console.error('Error fetching fees:', error);
        setFees(prev => ({ ...prev, isLoading: false }));
        setGasInfo(prev => ({ ...prev, isLoading: false }));
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

            {details.type === 'auction_sealed_bid' && (
              <>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Auction Type</span>
                  <span className="text-primary font-medium">Sealed-Bid</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Bid Duration</span>
                  <span>{details.auctionDuration ? formatDeadline(details.auctionDuration) : '--'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Order Deadline</span>
                  <span>{details.deadline ? formatDeadline(details.deadline) : '--'}</span>
                </div>
              </>
            )}

            {details.type === 'auction_dutch' && (
              <>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Auction Type</span>
                  <span className="text-amber-400 font-medium">Dutch Auction</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Start Price</span>
                  <span>{details.dutchStartPrice} {details.outputToken.symbol}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">End Price (Min)</span>
                  <span>{details.dutchEndPrice} {details.outputToken.symbol}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Price Decay Duration</span>
                  <span>{details.auctionDuration ? formatDeadline(details.auctionDuration) : '--'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Order Deadline</span>
                  <span>{details.deadline ? formatDeadline(details.deadline) : '--'}</span>
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

          <Separator />

          {/* Gas Fee Section */}
          <div className="space-y-2">
            <div className="flex items-center gap-1 text-sm font-medium">
              <Fuel className="w-4 h-4" />
              Network Gas Fee
            </div>

            {gasInfo.isLoading ? (
              <div className="flex items-center justify-center py-2">
                <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
              </div>
            ) : (
              <div className="p-3 rounded-lg bg-gradient-to-r from-primary/5 to-primary/10 border border-primary/20">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">Estimated Gas:</span>
                    {gasInfo.isSponsored ? (
                      <div className="flex items-center gap-2">
                        <span className="text-sm line-through text-muted-foreground">
                          {gasInfo.estimatedGasCost} MOVE (~${gasInfo.estimatedGasUsd})
                        </span>
                        <span className="px-2 py-0.5 rounded-full bg-primary text-primary-foreground text-xs font-bold">
                          FREE
                        </span>
                      </div>
                    ) : (
                      <span className="text-sm font-medium">
                        {gasInfo.estimatedGasCost} MOVE (~${gasInfo.estimatedGasUsd})
                      </span>
                    )}
                  </div>
                </div>

                {gasInfo.isSponsored && (
                  <div className="flex items-center gap-2 mt-2 pt-2 border-t border-primary/10">
                    <Sparkles className="w-4 h-4 text-primary" />
                    <span className="text-xs text-muted-foreground">
                      Gas sponsored by{' '}
                      <a
                        href="https://shinami.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline font-medium"
                      >
                        Shinami
                      </a>
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="outline" onClick={handleCancel} disabled={isLoading}>
            Cancel
          </Button>
          <Button onClick={onConfirm} disabled={isLoading || fees.isLoading || gasInfo.isLoading}>
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
