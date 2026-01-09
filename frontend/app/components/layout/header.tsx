'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { WalletButton } from '../WalletButton';
import { cn } from '@/app/lib/utils';

interface HeaderProps {
  address: string;
}

const navLinks = [
  { href: '/', label: 'Trade' },
  { href: '/explorer', label: 'Explorer' },
  { href: '/solvers', label: 'Solvers' },
];

export function Header({ address }: HeaderProps) {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center px-4 md:px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/velox-logo.png"
            alt="Velox"
            width={32}
            height={32}
            className="rounded-lg"
          />
          <span className="text-xl font-bold">Velox</span>
        </Link>

        {/* Centered Nav */}
        <nav className="hidden md:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'px-3 py-2 text-sm font-medium transition-colors',
                pathname === link.href
                  ? 'text-primary'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Wallet */}
        <div className="ml-auto">
          <WalletButton address={address} />
        </div>
      </div>
    </header>
  );
}
