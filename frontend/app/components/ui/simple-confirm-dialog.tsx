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
import { isSponsorshipEnabled } from '@/app/lib/shinami/client';
import { Loader2, Fuel, Sparkles, AlertCircle } from 'lucide-react';

export interface SimpleTransactionDetails {
  title: string;
  description: string;
  items: { label: string; value: string }[];
  warningMessage?: string;
}

interface SimpleConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  details: SimpleTransactionDetails | null;
  onConfirm: () => void;
  onCancel: () => void;
  isLoading: boolean;
  confirmText?: string;
  variant?: 'default' | 'destructive';
}

interface GasInfo {
  isSponsored: boolean;
  isLoading: boolean;
}

export function SimpleConfirmDialog({
  open,
  onOpenChange,
  details,
  onConfirm,
  onCancel,
  isLoading,
  confirmText = 'Confirm',
  variant = 'default',
}: SimpleConfirmDialogProps) {
  const [gasInfo, setGasInfo] = useState<GasInfo>({
    isSponsored: false,
    isLoading: true,
  });

  useEffect(() => {
    const checkSponsorship = async () => {
      if (!open) return;
      setGasInfo({ isSponsored: false, isLoading: true });
      try {
        const sponsored = await isSponsorshipEnabled();
        setGasInfo({ isSponsored: sponsored, isLoading: false });
      } catch {
        setGasInfo({ isSponsored: false, isLoading: false });
      }
    };
    checkSponsorship();
  }, [open]);

  if (!details) return null;

  const handleCancel = () => {
    onCancel();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{details.title}</DialogTitle>
          <DialogDescription>{details.description}</DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Transaction Details */}
          <div className="space-y-2 text-sm">
            {details.items.map((item, index) => (
              <div key={index} className="flex justify-between">
                <span className="text-muted-foreground">{item.label}</span>
                <span className="font-medium">{item.value}</span>
              </div>
            ))}
          </div>

          {details.warningMessage && (
            <>
              <Separator />
              <div className="flex items-start gap-2 p-3 rounded-lg bg-amber-500/10 border border-amber-500/20">
                <AlertCircle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-amber-500">{details.warningMessage}</p>
              </div>
            </>
          )}

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
                  <span className="text-sm text-muted-foreground">Estimated Gas:</span>
                  {gasInfo.isSponsored ? (
                    <span className="px-2 py-0.5 rounded-full bg-primary text-primary-foreground text-xs font-bold">
                      FREE
                    </span>
                  ) : (
                    <span className="text-sm font-medium">~0.0005 MOVE</span>
                  )}
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
          <Button
            onClick={onConfirm}
            disabled={isLoading || gasInfo.isLoading}
            variant={variant}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Processing...
              </>
            ) : (
              confirmText
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
