'use client';

import { Input } from '@/app/components/ui/input';
import { Button } from '@/app/components/ui/button';
import { Label } from '@/app/components/ui/label';
import { Token } from '@/app/constants/tokens';
import { cn } from '@/app/lib/utils';

interface AmountInputProps {
  value: string;
  onChange: (value: string) => void;
  token: Token | null;
  balance?: string;
  label?: string;
  disabled?: boolean;
  placeholder?: string;
}

export function AmountInput({
  value,
  onChange,
  token,
  balance,
  label,
  disabled = false,
  placeholder = '0.00',
}: AmountInputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    if (inputValue === '' || /^\d*\.?\d*$/.test(inputValue)) {
      onChange(inputValue);
    }
  };

  const handleMax = () => {
    if (balance) {
      onChange(balance);
    }
  };

  const numericBalance = balance ? parseFloat(balance) : 0;
  const numericValue = value ? parseFloat(value) : 0;
  const hasInsufficientBalance = numericValue > numericBalance && numericBalance > 0;

  return (
    <div className="space-y-1.5">
      {label && (
        <Label className="text-muted-foreground">{label}</Label>
      )}
      <div className="relative">
        <Input
          type="text"
          inputMode="decimal"
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          disabled={disabled || !token}
          className={cn(
            "pr-16 text-lg font-medium h-12",
            hasInsufficientBalance && "border-destructive focus-visible:ring-destructive"
          )}
        />
        {balance && token && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleMax}
            disabled={disabled}
            className="absolute right-1 top-1/2 -translate-y-1/2 h-8 px-2 text-xs font-medium text-primary hover:text-primary/80"
          >
            MAX
          </Button>
        )}
      </div>
      {hasInsufficientBalance && (
        <p className="text-xs text-destructive">Insufficient balance</p>
      )}
    </div>
  );
}
