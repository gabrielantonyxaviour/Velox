'use client';

import { Github, ExternalLink, BookOpen } from 'lucide-react';
import { CURRENT_NETWORK, MOVEMENT_CONFIGS } from '@/app/lib/aptos';

const LINKS = [
  {
    label: 'Docs',
    href: 'https://docs.movementnetwork.xyz',
    icon: BookOpen,
  },
  {
    label: 'GitHub',
    href: 'https://github.com/movementlabsxyz',
    icon: Github,
  },
  {
    label: 'Explorer',
    href: `https://explorer.movementnetwork.xyz/?network=${MOVEMENT_CONFIGS[CURRENT_NETWORK].explorer}`,
    icon: ExternalLink,
  },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-background/50 backdrop-blur-sm">
      <div className="container flex items-center justify-center py-4 px-4 md:px-6">
        {/* Links */}
        <nav className="flex items-center gap-4 sm:gap-6">
          {LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <link.icon className="w-4 h-4" />
              <span className="hidden sm:inline">{link.label}</span>
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
