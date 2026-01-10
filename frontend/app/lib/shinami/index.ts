/**
 * Shinami Integration Module
 * Provides Gas Station sponsorship for gasless transactions
 */

export {
  sponsoredSubmit,
  sponsoredSubmitNative,
  isSponsorshipEnabled,
  TransactionSubmittedError,
  type SignRawHashFunction,
  type SponsorAndSubmitResult,
} from './client';
