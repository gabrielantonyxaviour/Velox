import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Normalize a Movement/Aptos address by removing leading zeros after 0x prefix
 * Ensures consistent 64-character hex format
 * @param address - Address that may have extra leading zeros
 * @returns Normalized address with single leading zero after 0x prefix
 */
export function normalizeAddress(address: string): string {
  if (!address) return address;

  // Remove 0x prefix if present
  let normalized = address.startsWith('0x') ? address.slice(2) : address;

  // Remove leading zeros, but keep at least one
  normalized = normalized.replace(/^0+/, '') || '0';

  // Pad to 64 characters if needed
  normalized = normalized.padStart(64, '0');

  // Add back 0x prefix
  return `0x${normalized}`;
}
