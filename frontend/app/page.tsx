'use client';

import dynamic from 'next/dynamic';
import { usePrivyAvailable } from './providers';

// Dynamically import components to avoid hook issues
const PrivyHome = dynamic(() => import('./components/home/PrivyHome'), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        <p className="text-muted-foreground">Loading...</p>
      </div>
    </div>
  ),
});

const WalletOnlyHome = dynamic(() => import('./components/home/WalletOnlyHome'), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        <p className="text-muted-foreground">Loading...</p>
      </div>
    </div>
  ),
});

export default function Home() {
  const privyAvailable = usePrivyAvailable();

  // Render appropriate component based on whether Privy is configured
  if (privyAvailable) {
    return <PrivyHome />;
  }

  return <WalletOnlyHome />;
}
