'use client';

import { Token } from '@/app/constants/tokens';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/app/components/ui/select';
import { Label } from '@/app/components/ui/label';

interface TokenSelectorProps {
  selectedToken: Token | null;
  onSelect: (token: Token) => void;
  tokens: Token[];
  balance?: string;
  balances?: Record<string, string>; // Map of token address to balance
  label?: string;
  disabled?: boolean;
}

export function TokenSelector({
  selectedToken,
  onSelect,
  tokens,
  balance,
  balances = {},
  label,
  disabled = false,
}: TokenSelectorProps) {
  const handleValueChange = (value: string) => {
    const token = tokens.find((t) => t.address === value);
    if (token) {
      onSelect(token);
    }
  };

  return (
    <div className="space-y-1.5">
      {label && (
        <Label className="text-muted-foreground">{label}</Label>
      )}
      <Select
        value={selectedToken?.address || ''}
        onValueChange={handleValueChange}
        disabled={disabled}
      >
        <SelectTrigger className="w-[140px] h-12">
          <SelectValue placeholder="Select token">
            {selectedToken && (
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-muted flex items-center justify-center text-xs font-medium">
                  {selectedToken.symbol.charAt(0)}
                </div>
                <span>{selectedToken.symbol}</span>
              </div>
            )}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {tokens.map((token) => {
            const tokenBalance = balances[token.address];
            const hasBalance = tokenBalance && parseFloat(tokenBalance) > 0;
            return (
              <SelectItem key={token.address} value={token.address}>
                <div className="flex items-center justify-between gap-3 w-full min-w-[180px]">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-xs font-medium">
                      {token.symbol.charAt(0)}
                    </div>
                    <div className="flex flex-col items-start">
                      <span className="font-medium">{token.symbol}</span>
                      <span className="text-xs text-muted-foreground">{token.name}</span>
                    </div>
                  </div>
                  {tokenBalance !== undefined && (
                    <span className={`text-sm font-medium ${hasBalance ? 'text-foreground' : 'text-muted-foreground'}`}>
                      {tokenBalance}
                    </span>
                  )}
                </div>
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
      {selectedToken && balance !== undefined && (
        <p className="text-xs text-muted-foreground">
          Balance: {balance} {selectedToken.symbol}
        </p>
      )}
    </div>
  );
}
