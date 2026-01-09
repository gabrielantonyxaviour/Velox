'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';

interface SlippageSelectorProps {
  value: number;
  onChange: (slippage: number) => void;
  disabled?: boolean;
}

const SLIPPAGE_PRESETS = [
  { label: '0.1%', value: 0.1 },
  { label: '0.5%', value: 0.5 },
  { label: '1%', value: 1 },
];

export function SlippageSelector({ value, onChange, disabled }: SlippageSelectorProps) {
  const [isCustom, setIsCustom] = useState(false);
  const [customValue, setCustomValue] = useState('');

  // Check if current value matches a preset
  useEffect(() => {
    const isPreset = SLIPPAGE_PRESETS.some((p) => p.value === value);
    if (!isPreset && value > 0) {
      setIsCustom(true);
      setCustomValue(value.toString());
    }
  }, []);

  const handlePresetClick = (presetValue: number) => {
    setIsCustom(false);
    setCustomValue('');
    onChange(presetValue);
  };

  const handleCustomClick = () => {
    setIsCustom(true);
    if (!customValue) {
      setCustomValue(value.toString());
    }
  };

  const handleCustomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    // Allow empty or valid number input
    if (inputValue === '' || /^\d*\.?\d*$/.test(inputValue)) {
      setCustomValue(inputValue);
      const parsed = parseFloat(inputValue);
      if (!isNaN(parsed) && parsed > 0 && parsed <= 50) {
        onChange(parsed);
      }
    }
  };

  const isPresetSelected = (presetValue: number) => !isCustom && value === presetValue;

  return (
    <div className="space-y-1.5">
      <label className="block text-sm text-muted-foreground">Slippage Tolerance</label>
      <div className="flex gap-2">
        {SLIPPAGE_PRESETS.map((preset) => (
          <Button
            key={preset.value}
            type="button"
            variant={isPresetSelected(preset.value) ? 'default' : 'outline'}
            size="sm"
            onClick={() => handlePresetClick(preset.value)}
            disabled={disabled}
            className="flex-1"
          >
            {preset.label}
          </Button>
        ))}
        <Button
          type="button"
          variant={isCustom ? 'default' : 'outline'}
          size="sm"
          onClick={handleCustomClick}
          disabled={disabled}
          className="flex-1"
        >
          Custom
        </Button>
      </div>

      {isCustom && (
        <div className="flex items-center gap-2 mt-2">
          <Input
            type="text"
            value={customValue}
            onChange={handleCustomChange}
            placeholder="0.5"
            disabled={disabled}
            className="h-9 w-24"
          />
          <span className="text-sm text-muted-foreground">%</span>
          {parseFloat(customValue) > 5 && (
            <span className="text-xs text-amber-500">High slippage</span>
          )}
        </div>
      )}
    </div>
  );
}
