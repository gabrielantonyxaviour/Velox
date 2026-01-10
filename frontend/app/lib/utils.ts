import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Normalize a Movement/Aptos address by removing leading zeros after 0x prefix
 * @param address - Address that may have extra leading zeros (e.g., 0x0dc35... instead of 0xdc35...)
 * @returns Normalized address without extra leading zeros
 */
export function normalizeAddress(address: string): string {
  if (!address) return address;

  // Remove 0x prefix if present
  let normalized = address.startsWith('0x') ? address.slice(2) : address;

  // Remove ALL leading zeros, but keep at least one character
  normalized = normalized.replace(/^0+/, '') || '0';

  // Add back 0x prefix (DO NOT pad - just use the normalized form)
  return `0x${normalized}`;
}
