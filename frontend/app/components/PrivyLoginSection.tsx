"use client";

import { useState } from "react";
import { usePrivy, useLogin } from "@privy-io/react-auth";
import { useCreateWallet } from "@privy-io/react-auth/extended-chains";
import { Button } from "@/app/components/ui/button";
import { createMovementWallet } from "@/app/lib/privy-movement";

interface PrivyLoginSectionProps {
  onClose: () => void;
}

export default function PrivyLoginSection({ onClose }: PrivyLoginSectionProps) {
  const [isCreatingWallet, setIsCreatingWallet] = useState(false);
  const { authenticated, user } = usePrivy();
  const { createWallet } = useCreateWallet();

  // Check for Movement wallet
  const movementWallet: any = user?.linkedAccounts?.find(
    (account: any) => account.type === 'wallet' && account.chainType === 'aptos'
  );

  const handleWalletCreation = async (userToUse: any) => {
    try {
      setIsCreatingWallet(true);
      const wallet = await createMovementWallet(userToUse, createWallet);
      onClose();
      return wallet;
    } catch (error) {
      console.error('Wallet creation error:', error);
    } finally {
      setIsCreatingWallet(false);
    }
  };

  const { login } = useLogin({
    onComplete: async ({ user: completedUser }) => {
      try {
        await handleWalletCreation(completedUser);
      } catch (error) {
        console.error('Error in login completion:', error);
        setIsCreatingWallet(false);
      }
    },
    onError: (error) => {
      console.error('Login failed:', error);
      setIsCreatingWallet(false);
    }
  });

  const handlePrivyLogin = async () => {
    try {
      setIsCreatingWallet(true);

      if (!authenticated) {
        await login({
          loginMethods: ['email'],
          prefill: { type: 'email', value: '' },
          disableSignup: false
        });
      } else {
        await handleWalletCreation(user);
      }
    } catch (error) {
      console.error('Privy login error:', error);
      setIsCreatingWallet(false);
    }
  };

  return (
    <div className="space-y-3">
      <div className="text-center">
        <h3 className="text-xl font-bold mb-2">Login with Privy</h3>
        <p className="text-sm text-muted-foreground">
          Secure social login with automatic wallet creation
        </p>
      </div>

      <Button
        variant="default"
        className="w-full justify-center h-12 font-medium"
        onClick={handlePrivyLogin}
        disabled={isCreatingWallet || authenticated}
      >
        {isCreatingWallet ? (
          <div className="flex items-center space-x-2">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-foreground"></div>
            <span>Setting up wallet...</span>
          </div>
        ) : authenticated ? (
          <span>Setup Movement Wallet</span>
        ) : (
          <span>Continue with Privy</span>
        )}
      </Button>

      {authenticated && user && (
        <div className="space-y-2">
          <div className="text-sm text-muted-foreground text-center bg-muted/50 p-3 rounded-lg">
            <div className="flex items-center justify-center space-x-2">
              <div className="w-2 h-2 bg-green-600 rounded-full"></div>
              <span>Authenticated as: {user.email?.address || user.phone?.number || 'User'}</span>
            </div>
          </div>

          {movementWallet ? (
            <div className="text-sm text-center bg-muted border border-border p-3 rounded-lg">
              <div className="flex items-center justify-center space-x-2 mb-1">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="font-medium text-foreground">Movement Wallet Connected</span>
              </div>
              <div className="text-xs text-muted-foreground font-mono">
                {movementWallet.address?.slice(0, 6)}...{movementWallet.address?.slice(-4)}
              </div>
            </div>
          ) : (
            <div className="text-sm text-center bg-muted border border-border p-3 rounded-lg">
              <div className="flex items-center justify-center space-x-2">
                <div className="w-2 h-2 bg-yellow-600 rounded-full"></div>
                <span className="text-muted-foreground">Movement Wallet Not Created</span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
