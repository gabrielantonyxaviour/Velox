/**
 * Shinami Integration Module
 * Provides Gas Station sponsorship for gasless transactions
 */

export {
  sponsoredSubmit,
  sponsoredSubmitNative,
  sponsorTransaction,
  isSponsorshipEnabled,
  type SignRawHashFunction,
  type SponsorshipResult,
} from './client';
