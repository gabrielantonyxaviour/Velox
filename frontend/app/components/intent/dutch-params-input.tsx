'use client';

import { Label } from '@/app/components/ui/label';

interface DutchParamsInputProps {
  startPriceMultiplier: number;
  duration: number;
  onStartPriceChange: (multiplier: number) => void;
  onDurationChange: (duration: number) => void;
  basePrice: bigint;
}

const MULTIPLIER_OPTIONS = [
  { label: '1.1x', value: 110 },
  { label: '1.2x', value: 120 },
  { label: '1.5x', value: 150 },
  { label: '2x', value: 200 },
];

const DURATION_OPTIONS = [
  { label: '15s', value: 15 },
  { label: '30s', value: 30 },
  { label: '1m', value: 60 },
  { label: '2m', value: 120 },
];

export function DutchParamsInput({
  startPriceMultiplier,
  duration,
  onStartPriceChange,
  onDurationChange,
  basePrice,
}: DutchParamsInputProps) {
  const startPrice = (Number(basePrice) * startPriceMultiplier) / 100;

  return (
    <div className="space-y-4 p-4 rounded-lg bg-green-500/5 border border-green-500/20">
      <div className="text-sm font-medium text-green-400 flex items-center gap-2">
        Dutch Auction Settings
      </div>

      {/* Start Price Multiplier */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <Label className="text-muted-foreground">Start Price Multiplier</Label>
          <span className="text-foreground">
            {(startPriceMultiplier / 100).toFixed(1)}x
          </span>
        </div>
        <div className="grid grid-cols-4 gap-2">
          {MULTIPLIER_OPTIONS.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => onStartPriceChange(option.value)}
              className={`py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                startPriceMultiplier === option.value
                  ? 'bg-green-500/20 text-green-400 border border-green-500/50'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Duration */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <Label className="text-muted-foreground">Duration</Label>
          <span className="text-foreground">{duration < 60 ? `${duration}s` : `${duration / 60}m`}</span>
        </div>
        <div className="grid grid-cols-4 gap-2">
          {DURATION_OPTIONS.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => onDurationChange(option.value)}
              className={`py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                duration === option.value
                  ? 'bg-green-500/20 text-green-400 border border-green-500/50'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Price Preview */}
      <div className="pt-2 border-t border-green-500/20">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Start Price:</span>
          <span className="text-green-400 font-mono">
            {(startPrice / 1e8).toFixed(4)}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">End Price (Min):</span>
          <span className="text-red-400 font-mono">
            {(Number(basePrice) / 1e8).toFixed(4)}
          </span>
        </div>
      </div>
    </div>
  );
}
