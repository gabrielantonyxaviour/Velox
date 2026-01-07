"use client";

import { useState } from "react";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { Button } from "@/app/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/components/ui/dialog";
import { getAptosWallets } from "@aptos-labs/wallet-standard";
import { Separator } from "@/app/components/ui/separator";
import { MOVEMENT_CONFIGS, CURRENT_NETWORK } from "@/app/lib/aptos";
import { usePrivyAvailable } from "@/app/providers";
import dynamic from "next/dynamic";

// Dynamically import Privy section only when needed
const PrivyLoginSection = dynamic(
  () => import("./PrivyLoginSection"),
  {
    ssr: false,
    loading: () => (
      <div className="space-y-3">
        <div className="text-center">
          <div className="h-7 bg-muted rounded w-40 mx-auto mb-2 animate-pulse" />
          <div className="h-4 bg-muted rounded w-60 mx-auto animate-pulse" />
        </div>
        <div className="h-12 bg-muted rounded w-full animate-pulse" />
      </div>
    )
  }
);

interface WalletSelectionModalProps {
  children: React.ReactNode;
}

export function WalletSelectionModal({ children }: WalletSelectionModalProps) {
  const [open, setOpen] = useState(false);
  const { wallets, connect } = useWallet();
  const privyAvailable = usePrivyAvailable();

  // Filter out unwanted wallets, remove duplicates, and sort with Nightly first
  const filteredWallets = wallets?.filter((wallet) => {
      const name = wallet.name.toLowerCase();
      return !name.includes("petra") &&
             !name.includes("google") &&
             !name.includes("apple");
    })
    .filter((wallet, index, self) => {
      return index === self.findIndex((w) => w.name === wallet.name);
    })
    .sort((a, b) => {
      if (a.name.toLowerCase().includes("nightly")) return -1;
      if (b.name.toLowerCase().includes("nightly")) return 1;
      return 0;
    });

  const handleWalletSelect = async (walletName: string) => {
    try {
      if (typeof window !== "undefined") {
        const allWallets = getAptosWallets();
        const selectedWallet = allWallets.aptosWallets.find(w => w.name === walletName);

        if (selectedWallet?.features?.['aptos:connect']) {
          const networkInfo: any = {
            chainId: MOVEMENT_CONFIGS[CURRENT_NETWORK].chainId,
            name: "custom" as const,
            url: MOVEMENT_CONFIGS[CURRENT_NETWORK].fullnode
          };

          try {
            const result = await selectedWallet.features['aptos:connect'].connect(false, networkInfo);
            if (result.status === "Approved") {
              await connect(walletName as any);
              setOpen(false);
              return;
            }
          } catch {
            // Fallback to standard connection
          }
        }
      }

      await connect(walletName as any);
      setOpen(false);
    } catch {
      // Silent error - wallet adapter will handle error display
    }
  };

  const handleClose = () => setOpen(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Connect Wallet</DialogTitle>
          <DialogDescription>
            Choose a wallet to connect to Movement Network
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          {/* Privy Social Login Option - Only shown when Privy is configured */}
          {privyAvailable && (
            <>
              <PrivyLoginSection onClose={handleClose} />
              <div className="relative my-6">
                <Separator />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="bg-background px-2 text-xs text-muted-foreground">OR</span>
                </div>
              </div>
            </>
          )}

          {/* Native Wallet Options */}
          <div className="space-y-3">
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-1">Connect Native Wallet</h3>
              <p className="text-xs text-muted-foreground">
                Use your existing Aptos wallet
              </p>
            </div>
            <div className="space-y-2">
              {filteredWallets?.length === 0 ? (
                <div className="text-center py-6 px-4 border border-dashed rounded-lg">
                  <p className="text-sm text-muted-foreground mb-2">
                    No wallets detected
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Please install a supported Aptos wallet like Nightly
                  </p>
                </div>
              ) : (
                filteredWallets?.map((wallet) => (
                  <Button
                    key={wallet.name}
                    variant="outline"
                    className="w-full justify-start h-12 hover:bg-accent"
                    onClick={() => handleWalletSelect(wallet.name)}
                  >
                    <div className="flex items-center space-x-3">
                      {wallet.icon && (
                        <img
                          src={wallet.icon}
                          alt={wallet.name}
                          className="w-6 h-6 rounded"
                        />
                      )}
                      <span className="font-medium">{wallet.name}</span>
                    </div>
                  </Button>
                ))
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
