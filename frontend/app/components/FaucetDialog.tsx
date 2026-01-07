'use client';

import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Loader2, Droplets, Check, ExternalLink } from 'lucide-react';
import { TOKEN_LIST, Token } from '../constants/tokens';
import { useFaucet } from '../hooks/use-faucet';
import { getExplorerUrl } from '../lib/aptos';
import { showTxSuccess, showError } from '../lib/toast';

interface FaucetDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  address: string;
}

export function FaucetDialog({ open, onOpenChange, address }: FaucetDialogProps) {
  const [selectedToken, setSelectedToken] = useState<Token | null>(null);
  const [amount, setAmount] = useState('100');

  const { mint, status, error, txHash, reset } = useFaucet();

  // Show toast notification when mint succeeds or fails
  useEffect(() => {
    if (status === 'success' && txHash && selectedToken) {
      showTxSuccess(`${amount} ${selectedToken.symbol} minted!`, txHash);
    } else if (status === 'error' && error) {
      showError('Mint failed', error);
    }
  }, [status, txHash, amount, selectedToken, error]);

  const handleMint = async () => {
    if (!selectedToken || !amount) return;
    await mint(selectedToken, amount);
  };

  const handleReset = () => {
    setSelectedToken(null);
    setAmount('100');
    reset();
  };

  const handleClose = () => {
    handleReset();
    onOpenChange(false);
  };

  // Filter to only show faucet-eligible tokens (tUSDC, tMOVE)
  const faucetTokens = TOKEN_LIST.filter(
    (t) => t.symbol === 'tUSDC' || t.symbol === 'tMOVE'
  );

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Droplets className="h-5 w-5 text-primary" />
            Token Faucet
          </DialogTitle>
          <DialogDescription>
            Mint free test tokens for testing on Movement testnet
          </DialogDescription>
        </DialogHeader>

        {status === 'success' ? (
          <SuccessView
            amount={amount}
            symbol={selectedToken?.symbol}
            txHash={txHash}
            onReset={handleReset}
          />
        ) : (
          <MintForm
            faucetTokens={faucetTokens}
            selectedToken={selectedToken}
            onSelectToken={setSelectedToken}
            amount={amount}
            onAmountChange={setAmount}
            error={error}
            status={status}
            onMint={handleMint}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}

function SuccessView({
  amount,
  symbol,
  txHash,
  onReset,
}: {
  amount: string;
  symbol?: string;
  txHash: string | null;
  onReset: () => void;
}) {
  return (
    <div className="flex flex-col items-center gap-4 py-6">
      <div className="h-12 w-12 rounded-full bg-green-500/10 flex items-center justify-center">
        <Check className="h-6 w-6 text-green-500" />
      </div>
      <div className="text-center">
        <p className="font-medium">Tokens Minted!</p>
        <p className="text-sm text-muted-foreground mt-1">
          {amount} {symbol} sent to your wallet
        </p>
      </div>
      {txHash && (
        <a
          href={getExplorerUrl(txHash)}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-primary hover:underline"
        >
          View transaction
        </a>
      )}
      <Button onClick={onReset} variant="outline" className="mt-2">
        Mint More
      </Button>
    </div>
  );
}

function MintForm({
  faucetTokens,
  selectedToken,
  onSelectToken,
  amount,
  onAmountChange,
  error,
  status,
  onMint,
}: {
  faucetTokens: Token[];
  selectedToken: Token | null;
  onSelectToken: (token: Token) => void;
  amount: string;
  onAmountChange: (amount: string) => void;
  error: string | null;
  status: string;
  onMint: () => void;
}) {
  return (
    <div className="space-y-4">
      {/* Token Selection */}
      <div className="space-y-2">
        <Label>Select Token</Label>
        <div className="grid grid-cols-2 gap-2">
          {faucetTokens.map((token) => (
            <button
              key={token.symbol}
              onClick={() => onSelectToken(token)}
              className={`flex items-center gap-3 p-3 rounded-lg border transition-colors ${
                selectedToken?.symbol === token.symbol
                  ? 'border-primary bg-primary/5'
                  : 'border-border hover:border-primary/50'
              }`}
            >
              <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-sm font-medium">
                {token.symbol.slice(0, 2)}
              </div>
              <div className="text-left">
                <p className="font-medium text-sm">{token.symbol}</p>
                <p className="text-xs text-muted-foreground">{token.name}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Amount Input */}
      <div className="space-y-2">
        <Label htmlFor="amount">Amount</Label>
        <Input
          id="amount"
          type="number"
          placeholder="100"
          value={amount}
          onChange={(e) => onAmountChange(e.target.value)}
          min="1"
          step="1"
        />
        <div className="flex gap-2">
          {['10', '100', '1000'].map((preset) => (
            <Button
              key={preset}
              variant="outline"
              size="sm"
              onClick={() => onAmountChange(preset)}
              className="flex-1"
            >
              {preset}
            </Button>
          ))}
        </div>
      </div>

      {error && (
        <div className="p-3 rounded-lg bg-destructive/10 text-destructive text-sm">
          {error}
        </div>
      )}

      <Button
        onClick={onMint}
        disabled={!selectedToken || !amount || status === 'loading'}
        className="w-full"
      >
        {status === 'loading' ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Minting...
          </>
        ) : (
          <>
            <Droplets className="mr-2 h-4 w-4" />
            Mint {amount} {selectedToken?.symbol || 'Tokens'}
          </>
        )}
      </Button>

      {/* Native MOVE Faucet Link */}
      <div className="pt-2 border-t">
        <p className="text-xs text-muted-foreground mb-2">
          Need native MOVE for gas fees?
        </p>
        <a
          href="https://faucet.movementnetwork.xyz/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
        >
          Get MOVE from public faucet
          <ExternalLink className="h-3 w-3" />
        </a>
      </div>
    </div>
  );
}
