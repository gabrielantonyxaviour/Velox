'use client';

import { Button } from './ui/button';
import { Card } from './ui/card';
import { WalletSelectionModal } from './wallet-selection-modal';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 md:p-8 bg-background">
      <Card className="text-center p-8 sm:p-12 lg:p-16 max-w-lg w-full">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-2xl">V</span>
          </div>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-foreground tracking-tight">
          Velox
        </h1>
        <p className="text-muted-foreground text-sm sm:text-base md:text-lg mb-8 sm:mb-12">
          Intent-Based Trading on Movement
        </p>

        <WalletSelectionModal>
          <Button size="lg" className="w-full text-base sm:text-lg">
            Connect Wallet
          </Button>
        </WalletSelectionModal>

        <p className="text-xs text-muted-foreground mt-8">
          Submit swap intents and let solvers compete for the best execution
        </p>
      </Card>
    </div>
  );
}
