'use client';

import { Input } from '@/app/components/ui/input';
import { Button } from '@/app/components/ui/button';
import { Label } from '@/app/components/ui/label';
import { Token } from '@/app/constants/tokens';
import { RefreshCw } from 'lucide-react';

interface PriceInputProps {
  value: string;
  onChange: (value: string) => void;
  inputToken: Token | null;
  outputToken: Token | null;
  currentPrice?: number;
  isLoadingPrice?: boolean;
  disabled?: boolean;
}

const ADJUSTMENT_BUTTONS = [
  { label: '-5%', multiplier: 0.95 },
  { label: '-1%', multiplier: 0.99 },
  { label: '+1%', multiplier: 1.01 },
  { label: '+5%', multiplier: 1.05 },
];

export function PriceInput({
  value,
  onChange,
  inputToken,
  outputToken,
  currentPrice = 0,
  isLoadingPrice = false,
  disabled = false,
}: PriceInputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    if (inputValue === '' || /^\d*\.?\d*$/.test(inputValue)) {
      onChange(inputValue);
    }
  };

  const handleAdjust = (multiplier: number) => {
    const basePrice = value ? parseFloat(value) : currentPrice;
    const newPrice = basePrice * multiplier;
    onChange(newPrice.toFixed(6));
  };

  const handleSetCurrentPrice = () => {
    onChange(currentPrice.toFixed(6));
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Label className="text-muted-foreground">Limit Price</Label>
        {isLoadingPrice ? (
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <RefreshCw className="w-3 h-3 animate-spin" />
            Loading price...
          </span>
        ) : currentPrice > 0 ? (
          <Button
            type="button"
            variant="link"
            size="sm"
            onClick={handleSetCurrentPrice}
            disabled={disabled}
            className="h-auto p-0 text-xs"
          >
            Use market price ({currentPrice.toFixed(4)})
          </Button>
        ) : null}
      </div>

      <Input
        type="text"
        inputMode="decimal"
        value={value}
        onChange={handleChange}
        placeholder="0.00"
        disabled={disabled || !inputToken || !outputToken}
        className="text-lg font-medium h-12"
      />

      {inputToken && outputToken && value && parseFloat(value) > 0 && (
        <p className="text-sm text-muted-foreground">
          1 {inputToken.symbol} = {value} {outputToken.symbol}
        </p>
      )}

      <div className="flex gap-2">
        {ADJUSTMENT_BUTTONS.map((btn) => (
          <Button
            key={btn.label}
            type="button"
            variant="outline"
            size="sm"
            onClick={() => handleAdjust(btn.multiplier)}
            disabled={disabled || !inputToken || !outputToken}
            className="flex-1 text-xs"
          >
            {btn.label}
          </Button>
        ))}
      </div>
    </div>
  );
}
