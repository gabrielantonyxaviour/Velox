'use client';

import { useState } from 'react';
import { Card } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { useWalletContext } from '@/app/hooks/use-wallet-context';
import { useSolverInfo } from '@/app/hooks/use-solvers';
import { registerSolver, registerSolverNative } from './solver-transactions';
import { Loader2, UserPlus, AlertCircle } from 'lucide-react';

interface RegisterSolverCardProps {
  onSuccess?: () => void;
}

export function RegisterSolverCard({ onSuccess }: RegisterSolverCardProps) {
  const { walletAddress, isPrivy, signRawHash, publicKeyHex, signAndSubmitTransaction } = useWalletContext();
  const { solver, isLoading: isLoadingSolver } = useSolverInfo(walletAddress || null);

  const [stake, setStake] = useState('1');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // If already registered, don't show registration form
  if (isLoadingSolver) {
    return null;
  }

  if (solver) {
    return null; // Will be shown in MySolverCard instead
  }

  const handleRegister = async () => {
    if (!walletAddress) return;

    setIsLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const stakeAmount = BigInt(Math.floor(parseFloat(stake) * 1e8));

      if (isPrivy && signRawHash && publicKeyHex) {
        await registerSolver(walletAddress, stakeAmount, signRawHash, publicKeyHex);
      } else if (signAndSubmitTransaction) {
        await registerSolverNative(walletAddress, stakeAmount, signAndSubmitTransaction);
      } else {
        throw new Error('No wallet connected');
      }

      setSuccess(true);
      setStake('1');
      onSuccess?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to register');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="p-6">
      <div className="flex items-center gap-2 mb-4">
        <UserPlus className="w-5 h-5 text-primary" />
        <h2 className="text-lg font-semibold">Become a Solver</h2>
      </div>

      <p className="text-sm text-muted-foreground mb-4">
        Register as a solver to start fulfilling intents and earning rewards.
        You&apos;ll need to stake MOVE tokens as collateral.
      </p>

      <div className="bg-muted/50 rounded-lg p-4 mb-4">
        <div className="flex items-start gap-2">
          <AlertCircle className="w-4 h-4 text-yellow-500 mt-0.5" />
          <div className="text-sm">
            <p className="font-medium text-yellow-500">Requirements</p>
            <ul className="text-muted-foreground list-disc list-inside mt-1">
              <li>Minimum stake: 0.01 MOVE</li>
              <li>Initial reputation: 50%</li>
              <li>7-day unstaking cooldown</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="stake">Stake Amount (MOVE)</Label>
          <Input
            id="stake"
            type="number"
            min="0.01"
            step="0.01"
            value={stake}
            onChange={(e) => setStake(e.target.value)}
            disabled={isLoading}
          />
        </div>

        {error && (
          <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20">
            <p className="text-sm text-destructive">{error}</p>
          </div>
        )}

        {success && (
          <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
            <p className="text-sm text-green-500">Successfully registered as a solver!</p>
          </div>
        )}

        <Button
          onClick={handleRegister}
          disabled={isLoading || !stake || parseFloat(stake) < 0.01}
          className="w-full"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Registering...
            </>
          ) : (
            'Register as Solver'
          )}
        </Button>
      </div>
    </Card>
  );
}
