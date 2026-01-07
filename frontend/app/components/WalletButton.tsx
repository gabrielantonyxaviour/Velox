'use client';

import { useState, useMemo } from 'react';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import { Copy, ExternalLink, LogOut, Check, Loader2, Droplets } from 'lucide-react';
import { usePrivy } from '@privy-io/react-auth';
import { useWallet } from '@aptos-labs/wallet-adapter-react';
import { useMoveBalance } from '../hooks/use-move-balance';
import { FaucetDialog } from './FaucetDialog';

interface WalletButtonProps {
  address: string;
}

export function WalletButton({ address }: WalletButtonProps) {
  const [copied, setCopied] = useState(false);
  const [faucetOpen, setFaucetOpen] = useState(false);
  const { logout: privyLogout, authenticated } = usePrivy();
  const { disconnect, connected } = useWallet();
  const { formatted, isLoading: isBalanceLoading } = useMoveBalance(address);

  const shortAddress = address ? `${address.slice(0, 6)}...${address.slice(-4)}` : '';

  // Generate DiceBear pixel-art avatar URL using address as seed
  const avatarUrl = useMemo(() => {
    if (!address) return null;
    return `https://api.dicebear.com/7.x/pixel-art/svg?seed=${address}`;
  }, [address]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDisconnect = async () => {
    if (authenticated) {
      await privyLogout();
    } else if (connected) {
      disconnect();
    }
  };

  const handleViewExplorer = () => {
    const explorerUrl = `https://explorer.movementnetwork.xyz/account/${address}?network=testnet`;
    window.open(explorerUrl, '_blank');
  };

  if (!address) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="h-10 px-3 gap-2">
          {/* Balance */}
          <span className="text-sm font-medium">
            {isBalanceLoading ? (
              <Loader2 className="h-3 w-3 animate-spin" />
            ) : (
              `${formatted} MOVE`
            )}
          </span>

          {/* Divider */}
          <div className="h-5 w-px bg-border" />

          {/* Avatar */}
          <Avatar className="h-6 w-6">
            <AvatarImage src={avatarUrl || undefined} alt="Wallet avatar" />
            <AvatarFallback className="text-xs bg-primary text-primary-foreground">
              {address?.slice(2, 4).toUpperCase()}
            </AvatarFallback>
          </Avatar>

          {/* Address */}
          <span className="font-mono text-sm hidden sm:inline">{shortAddress}</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-52">
        {/* Full address display */}
        <div className="px-2 py-1.5 text-xs text-muted-foreground font-mono break-all">
          {address}
        </div>
        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={handleCopy} className="gap-2 cursor-pointer">
          {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
          <span>{copied ? 'Copied!' : 'Copy Address'}</span>
        </DropdownMenuItem>

        <DropdownMenuItem onClick={handleViewExplorer} className="gap-2 cursor-pointer">
          <ExternalLink className="h-4 w-4" />
          <span>View on Explorer</span>
        </DropdownMenuItem>

        <DropdownMenuItem onClick={() => setFaucetOpen(true)} className="gap-2 cursor-pointer">
          <Droplets className="h-4 w-4" />
          <span>Faucet</span>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={handleDisconnect}
          className="gap-2 text-destructive focus:text-destructive cursor-pointer"
        >
          <LogOut className="h-4 w-4" />
          <span>Disconnect</span>
        </DropdownMenuItem>
      </DropdownMenuContent>

      <FaucetDialog open={faucetOpen} onOpenChange={setFaucetOpen} address={address} />
    </DropdownMenu>
  );
}
