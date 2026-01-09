import {
  AccountAuthenticatorEd25519,
  AccountAuthenticator,
  Ed25519PublicKey,
  Ed25519Signature,
  generateSigningMessageForTransaction,
  SimpleTransaction,
} from '@aptos-labs/ts-sdk';
import { aptos, VELOX_ADDRESS, toHex } from '../aptos';
import { sponsoredSubmit, sponsoredSubmitNative, isSponsorshipEnabled } from '../shinami';
import { storeAuctionIntent } from './auction-storage';

// ============================================================
// Helper: Extract intent ID from transaction events
// ============================================================

async function extractIntentIdFromTx(txHash: string): Promise<bigint | null> {
  try {
    const tx = await aptos.getTransactionByHash({ transactionHash: txHash });
    if ('events' in tx && Array.isArray(tx.events)) {
      for (const event of tx.events) {
        if (event.type.includes('::submission::IntentCreated')) {
          const intentId = (event.data as { intent_id?: string })?.intent_id;
          if (intentId) {
            return BigInt(intentId);
          }
        }
      }
    }
  } catch (e) {
    console.warn('[Velox] Failed to extract intent ID from tx:', e);
  }
  return null;
}

// ============================================================
// Type Definitions
// ============================================================

export interface SignRawHashFunction {
  (params: { address: string; chainType: 'aptos'; hash: `0x${string}` }): Promise<{
    signature: string;
  }>;
}

export type SignTransactionFunction = (args: {
  transactionOrPayload: SimpleTransaction;
  asFeePayer?: boolean;
}) => Promise<{ authenticator: AccountAuthenticator; rawTransaction: Uint8Array }>;

// ============================================================
// Smart Transaction Submission Helpers
// ============================================================

async function signAndSubmitWithPrivy(
  walletAddress: string,
  functionId: `${string}::${string}::${string}`,
  args: (string | number | bigint | boolean)[],
  publicKeyHex: string,
  signRawHash: SignRawHashFunction
): Promise<string> {
  const rawTxn = await aptos.transaction.build.simple({
    sender: walletAddress,
    data: {
      function: functionId,
      typeArguments: [],
      functionArguments: args,
    },
  });

  const message = generateSigningMessageForTransaction(rawTxn);
  const { signature: rawSignature } = await signRawHash({
    address: walletAddress,
    chainType: 'aptos',
    hash: `0x${toHex(message)}`,
  });

  let cleanPublicKey = publicKeyHex.startsWith('0x') ? publicKeyHex.slice(2) : publicKeyHex;
  if (cleanPublicKey.length === 66) {
    cleanPublicKey = cleanPublicKey.slice(2);
  }

  const senderAuthenticator = new AccountAuthenticatorEd25519(
    new Ed25519PublicKey(cleanPublicKey),
    new Ed25519Signature(rawSignature.startsWith('0x') ? rawSignature.slice(2) : rawSignature)
  );

  const committedTx = await aptos.transaction.submit.simple({
    transaction: rawTxn,
    senderAuthenticator,
  });

  const executed = await aptos.waitForTransaction({ transactionHash: committedTx.hash });
  if (!executed.success) {
    throw new Error('Transaction failed');
  }

  return committedTx.hash;
}

async function signAndSubmitNative(
  walletAddress: string,
  functionId: `${string}::${string}::${string}`,
  args: (string | number | bigint | boolean)[],
  signAndSubmitTransaction: (payload: unknown) => Promise<{ hash: string }>
): Promise<string> {
  const response = await signAndSubmitTransaction({
    sender: walletAddress,
    data: {
      function: functionId,
      functionArguments: args,
    },
  });

  const executed = await aptos.waitForTransaction({ transactionHash: response.hash });
  if (!executed.success) {
    throw new Error('Transaction failed');
  }

  return response.hash;
}

async function smartSubmitWithPrivy(
  walletAddress: string,
  functionId: `${string}::${string}::${string}`,
  args: (string | number | bigint | boolean)[],
  publicKeyHex: string,
  signRawHash: SignRawHashFunction
): Promise<string> {
  const sponsorshipAvailable = await isSponsorshipEnabled();
  if (sponsorshipAvailable) {
    try {
      console.log('[Velox] Using Shinami Gas Station for sponsored transaction (Privy)');
      return await sponsoredSubmit(walletAddress, functionId, args, publicKeyHex, signRawHash);
    } catch (error) {
      console.warn('[Velox] Sponsored submission failed, falling back to user-paid:', error);
    }
  }

  console.log('[Velox] Using user-paid gas transaction (Privy)');
  return signAndSubmitWithPrivy(walletAddress, functionId, args, publicKeyHex, signRawHash);
}

async function smartSubmitNative(
  walletAddress: string,
  functionId: `${string}::${string}::${string}`,
  args: (string | number | bigint | boolean)[],
  signTransaction: SignTransactionFunction,
  signAndSubmitTransaction: (payload: unknown) => Promise<{ hash: string }>
): Promise<string> {
  const sponsorshipAvailable = await isSponsorshipEnabled();
  if (sponsorshipAvailable) {
    try {
      console.log('[Velox] Using Shinami Gas Station for sponsored transaction (Native)');
      return await sponsoredSubmitNative(walletAddress, functionId, args, signTransaction);
    } catch (error) {
      console.warn('[Velox] Sponsored submission failed, falling back to user-paid:', error);
    }
  }

  console.log('[Velox] Using user-paid gas transaction (Native)');
  return signAndSubmitNative(walletAddress, functionId, args, signAndSubmitTransaction);
}

// ============================================================
// Swap Intent
// ============================================================

export async function submitSwapIntent(
  walletAddress: string,
  inputToken: string,
  outputToken: string,
  amountIn: bigint,
  minAmountOut: bigint,
  deadline: number,
  signRawHash: SignRawHashFunction,
  publicKeyHex: string
): Promise<string> {
  return smartSubmitWithPrivy(
    walletAddress,
    `${VELOX_ADDRESS}::submission::submit_swap`,
    [VELOX_ADDRESS, inputToken, outputToken, amountIn.toString(), minAmountOut.toString(), deadline],
    publicKeyHex,
    signRawHash
  );
}

export async function submitSwapIntentNative(
  walletAddress: string,
  inputToken: string,
  outputToken: string,
  amountIn: bigint,
  minAmountOut: bigint,
  deadline: number,
  signTransaction: SignTransactionFunction,
  signAndSubmitTransaction: (payload: unknown) => Promise<{ hash: string }>
): Promise<string> {
  return smartSubmitNative(
    walletAddress,
    `${VELOX_ADDRESS}::submission::submit_swap`,
    [VELOX_ADDRESS, inputToken, outputToken, amountIn.toString(), minAmountOut.toString(), deadline],
    signTransaction,
    signAndSubmitTransaction
  );
}

// ============================================================
// Limit Order Intent (partial fills always allowed, max 5)
// ============================================================

export async function submitLimitOrderIntent(
  walletAddress: string,
  inputToken: string,
  outputToken: string,
  amountIn: bigint,
  limitPrice: bigint,
  expiry: number,
  signRawHash: SignRawHashFunction,
  publicKeyHex: string
): Promise<string> {
  return smartSubmitWithPrivy(
    walletAddress,
    `${VELOX_ADDRESS}::submission::submit_limit_order`,
    [VELOX_ADDRESS, inputToken, outputToken, amountIn.toString(), limitPrice.toString(), expiry],
    publicKeyHex,
    signRawHash
  );
}

export async function submitLimitOrderIntentNative(
  walletAddress: string,
  inputToken: string,
  outputToken: string,
  amountIn: bigint,
  limitPrice: bigint,
  expiry: number,
  signTransaction: SignTransactionFunction,
  signAndSubmitTransaction: (payload: unknown) => Promise<{ hash: string }>
): Promise<string> {
  return smartSubmitNative(
    walletAddress,
    `${VELOX_ADDRESS}::submission::submit_limit_order`,
    [VELOX_ADDRESS, inputToken, outputToken, amountIn.toString(), limitPrice.toString(), expiry],
    signTransaction,
    signAndSubmitTransaction
  );
}

// ============================================================
// TWAP Intent
// ============================================================

export async function submitTWAPIntent(
  walletAddress: string,
  inputToken: string,
  outputToken: string,
  totalAmount: bigint,
  numChunks: number,
  intervalSeconds: number,
  maxSlippageBps: number,
  startTime: number,
  signRawHash: SignRawHashFunction,
  publicKeyHex: string
): Promise<string> {
  return smartSubmitWithPrivy(
    walletAddress,
    `${VELOX_ADDRESS}::submission::submit_twap`,
    [
      VELOX_ADDRESS,
      inputToken,
      outputToken,
      totalAmount.toString(),
      numChunks,
      intervalSeconds,
      maxSlippageBps,
      startTime,
    ],
    publicKeyHex,
    signRawHash
  );
}

export async function submitTWAPIntentNative(
  walletAddress: string,
  inputToken: string,
  outputToken: string,
  totalAmount: bigint,
  numChunks: number,
  intervalSeconds: number,
  maxSlippageBps: number,
  startTime: number,
  signTransaction: SignTransactionFunction,
  signAndSubmitTransaction: (payload: unknown) => Promise<{ hash: string }>
): Promise<string> {
  return smartSubmitNative(
    walletAddress,
    `${VELOX_ADDRESS}::submission::submit_twap`,
    [
      VELOX_ADDRESS,
      inputToken,
      outputToken,
      totalAmount.toString(),
      numChunks,
      intervalSeconds,
      maxSlippageBps,
      startTime,
    ],
    signTransaction,
    signAndSubmitTransaction
  );
}

// ============================================================
// DCA Intent (starts immediately)
// ============================================================

export async function submitDCAIntent(
  walletAddress: string,
  inputToken: string,
  outputToken: string,
  amountPerPeriod: bigint,
  totalPeriods: number,
  intervalSeconds: number,
  signRawHash: SignRawHashFunction,
  publicKeyHex: string
): Promise<string> {
  return smartSubmitWithPrivy(
    walletAddress,
    `${VELOX_ADDRESS}::submission::submit_dca`,
    [
      VELOX_ADDRESS,
      inputToken,
      outputToken,
      amountPerPeriod.toString(),
      totalPeriods,
      intervalSeconds,
    ],
    publicKeyHex,
    signRawHash
  );
}

export async function submitDCAIntentNative(
  walletAddress: string,
  inputToken: string,
  outputToken: string,
  amountPerPeriod: bigint,
  totalPeriods: number,
  intervalSeconds: number,
  signTransaction: SignTransactionFunction,
  signAndSubmitTransaction: (payload: unknown) => Promise<{ hash: string }>
): Promise<string> {
  return smartSubmitNative(
    walletAddress,
    `${VELOX_ADDRESS}::submission::submit_dca`,
    [
      VELOX_ADDRESS,
      inputToken,
      outputToken,
      amountPerPeriod.toString(),
      totalPeriods,
      intervalSeconds,
    ],
    signTransaction,
    signAndSubmitTransaction
  );
}

// ============================================================
// Swap with Sealed-Bid Auction
// ============================================================

export async function submitSwapWithSealedBid(
  walletAddress: string,
  inputToken: string,
  outputToken: string,
  amountIn: bigint,
  minAmountOut: bigint,
  deadline: number,
  auctionDuration: number,
  signRawHash: SignRawHashFunction,
  publicKeyHex: string
): Promise<string> {
  const txHash = await smartSubmitWithPrivy(
    walletAddress,
    `${VELOX_ADDRESS}::submission::submit_swap_sealed_bid`,
    [
      VELOX_ADDRESS,
      inputToken,
      outputToken,
      amountIn.toString(),
      minAmountOut.toString(),
      deadline,
      auctionDuration,
    ],
    publicKeyHex,
    signRawHash
  );

  const intentId = await extractIntentIdFromTx(txHash);
  if (intentId !== null) {
    storeAuctionIntent(intentId, 'sealed-bid', { duration: auctionDuration });
  }

  return txHash;
}

export async function submitSwapWithSealedBidNative(
  walletAddress: string,
  inputToken: string,
  outputToken: string,
  amountIn: bigint,
  minAmountOut: bigint,
  deadline: number,
  auctionDuration: number,
  signTransaction: SignTransactionFunction,
  signAndSubmitTransaction: (payload: unknown) => Promise<{ hash: string }>
): Promise<string> {
  const txHash = await smartSubmitNative(
    walletAddress,
    `${VELOX_ADDRESS}::submission::submit_swap_sealed_bid`,
    [
      VELOX_ADDRESS,
      inputToken,
      outputToken,
      amountIn.toString(),
      minAmountOut.toString(),
      deadline,
      auctionDuration,
    ],
    signTransaction,
    signAndSubmitTransaction
  );

  const intentId = await extractIntentIdFromTx(txHash);
  if (intentId !== null) {
    storeAuctionIntent(intentId, 'sealed-bid', { duration: auctionDuration });
  }

  return txHash;
}

// Backwards compatibility aliases
export const submitSwapWithAuction = submitSwapWithSealedBid;
export const submitSwapWithAuctionNative = submitSwapWithSealedBidNative;

// ============================================================
// Swap with Dutch Auction
// ============================================================

export async function submitSwapWithDutchAuction(
  walletAddress: string,
  inputToken: string,
  outputToken: string,
  amountIn: bigint,
  minAmountOut: bigint,
  startPrice: bigint,
  auctionDuration: number,
  signRawHash: SignRawHashFunction,
  publicKeyHex: string
): Promise<string> {
  const txHash = await smartSubmitWithPrivy(
    walletAddress,
    `${VELOX_ADDRESS}::submission::submit_swap_dutch`,
    [
      VELOX_ADDRESS,
      inputToken,
      outputToken,
      amountIn.toString(),
      minAmountOut.toString(),
      startPrice.toString(),
      auctionDuration,
    ],
    publicKeyHex,
    signRawHash
  );

  const intentId = await extractIntentIdFromTx(txHash);
  if (intentId !== null) {
    storeAuctionIntent(intentId, 'dutch', {
      duration: auctionDuration,
      startPrice,
      endPrice: minAmountOut,
    });
  }

  return txHash;
}

export async function submitSwapWithDutchAuctionNative(
  walletAddress: string,
  inputToken: string,
  outputToken: string,
  amountIn: bigint,
  minAmountOut: bigint,
  startPrice: bigint,
  auctionDuration: number,
  signTransaction: SignTransactionFunction,
  signAndSubmitTransaction: (payload: unknown) => Promise<{ hash: string }>
): Promise<string> {
  const txHash = await smartSubmitNative(
    walletAddress,
    `${VELOX_ADDRESS}::submission::submit_swap_dutch`,
    [
      VELOX_ADDRESS,
      inputToken,
      outputToken,
      amountIn.toString(),
      minAmountOut.toString(),
      startPrice.toString(),
      auctionDuration,
    ],
    signTransaction,
    signAndSubmitTransaction
  );

  const intentId = await extractIntentIdFromTx(txHash);
  if (intentId !== null) {
    storeAuctionIntent(intentId, 'dutch', {
      duration: auctionDuration,
      startPrice,
      endPrice: minAmountOut,
    });
  }

  return txHash;
}

// ============================================================
// Cancel Intent
// ============================================================

export async function cancelIntent(
  walletAddress: string,
  intentId: bigint,
  signRawHash: SignRawHashFunction,
  publicKeyHex: string
): Promise<string> {
  return smartSubmitWithPrivy(
    walletAddress,
    `${VELOX_ADDRESS}::submission::cancel_intent`,
    [VELOX_ADDRESS, intentId.toString()],
    publicKeyHex,
    signRawHash
  );
}

export async function cancelIntentNative(
  walletAddress: string,
  intentId: bigint,
  signTransaction: SignTransactionFunction,
  signAndSubmitTransaction: (payload: unknown) => Promise<{ hash: string }>
): Promise<string> {
  return smartSubmitNative(
    walletAddress,
    `${VELOX_ADDRESS}::submission::cancel_intent`,
    [VELOX_ADDRESS, intentId.toString()],
    signTransaction,
    signAndSubmitTransaction
  );
}

// ============================================================
// View Functions - Intent
// ============================================================

export async function getIntent(intentId: bigint): Promise<unknown> {
  const result = await aptos.view({
    payload: {
      function: `${VELOX_ADDRESS}::submission::get_intent`,
      functionArguments: [VELOX_ADDRESS, intentId.toString()],
    },
  });
  return result[0];
}

export async function getUserIntents(userAddress: string): Promise<bigint[]> {
  const result = await aptos.view({
    payload: {
      function: `${VELOX_ADDRESS}::submission::get_user_intents`,
      functionArguments: [VELOX_ADDRESS, userAddress],
    },
  });
  return (result[0] as string[]).map((id) => BigInt(id));
}

export async function getTotalIntents(): Promise<bigint> {
  const result = await aptos.view({
    payload: {
      function: `${VELOX_ADDRESS}::submission::get_total_intents`,
      functionArguments: [VELOX_ADDRESS],
    },
  });
  return BigInt(result[0] as string);
}

export async function getAuctionState(intentId: bigint): Promise<unknown> {
  const result = await aptos.view({
    payload: {
      function: `${VELOX_ADDRESS}::submission::get_auction_state`,
      functionArguments: [VELOX_ADDRESS, intentId.toString()],
    },
  });
  return result[0];
}

// ============================================================
// View Functions - Settlement
// ============================================================

export async function canFill(intentId: bigint, solverAddress: string): Promise<boolean> {
  const result = await aptos.view({
    payload: {
      function: `${VELOX_ADDRESS}::settlement::can_fill`,
      functionArguments: [VELOX_ADDRESS, intentId.toString(), solverAddress],
    },
  });
  return result[0] as boolean;
}

export async function getMaxFills(): Promise<number> {
  const result = await aptos.view({
    payload: {
      function: `${VELOX_ADDRESS}::settlement::max_fills`,
      functionArguments: [],
    },
  });
  return Number(result[0]);
}

export async function calculateMinOutputForFill(
  intentId: bigint,
  fillInput: bigint
): Promise<bigint> {
  const result = await aptos.view({
    payload: {
      function: `${VELOX_ADDRESS}::settlement::calculate_min_output_for_fill`,
      functionArguments: [VELOX_ADDRESS, intentId.toString(), fillInput.toString()],
    },
  });
  return BigInt(result[0] as string);
}

export async function getFeeBps(): Promise<number> {
  const result = await aptos.view({
    payload: {
      function: `${VELOX_ADDRESS}::settlement::get_fee_bps`,
      functionArguments: [VELOX_ADDRESS],
    },
  });
  return Number(result[0]);
}

export async function getTotalCollectedFees(): Promise<bigint> {
  const result = await aptos.view({
    payload: {
      function: `${VELOX_ADDRESS}::settlement::get_total_collected`,
      functionArguments: [VELOX_ADDRESS],
    },
  });
  return BigInt(result[0] as string);
}

// ============================================================
// View Functions - Auction
// ============================================================

export async function getDutchPrice(intentId: bigint): Promise<bigint> {
  const result = await aptos.view({
    payload: {
      function: `${VELOX_ADDRESS}::auction::get_current_dutch_price`,
      functionArguments: [VELOX_ADDRESS, intentId.toString()],
    },
  });
  return BigInt(result[0] as string);
}

export async function getAuctionBids(intentId: bigint): Promise<unknown[]> {
  const result = await aptos.view({
    payload: {
      function: `${VELOX_ADDRESS}::auction::get_bids`,
      functionArguments: [VELOX_ADDRESS, intentId.toString()],
    },
  });
  return result[0] as unknown[];
}

export async function canSolverFill(intentId: bigint, solverAddress: string): Promise<boolean> {
  const result = await aptos.view({
    payload: {
      function: `${VELOX_ADDRESS}::auction::can_solver_fill`,
      functionArguments: [VELOX_ADDRESS, intentId.toString(), solverAddress],
    },
  });
  return result[0] as boolean;
}

export async function getAuctionWinner(intentId: bigint): Promise<{ hasWinner: boolean; winner: string }> {
  const result = await aptos.view({
    payload: {
      function: `${VELOX_ADDRESS}::auction::get_winner`,
      functionArguments: [VELOX_ADDRESS, intentId.toString()],
    },
  });
  return {
    hasWinner: result[0] as boolean,
    winner: result[1] as string,
  };
}

export async function getSealedBidTimeRemaining(intentId: bigint): Promise<number> {
  const result = await aptos.view({
    payload: {
      function: `${VELOX_ADDRESS}::auction::get_sealed_bid_time_remaining`,
      functionArguments: [VELOX_ADDRESS, intentId.toString()],
    },
  });
  return Number(result[0]);
}

export async function getDutchTimeRemaining(intentId: bigint): Promise<number> {
  const result = await aptos.view({
    payload: {
      function: `${VELOX_ADDRESS}::auction::get_dutch_time_remaining`,
      functionArguments: [VELOX_ADDRESS, intentId.toString()],
    },
  });
  return Number(result[0]);
}

// ============================================================
// View Functions - Solver Registry
// ============================================================

export async function getSolverInfo(solverAddress: string): Promise<unknown | null> {
  try {
    const result = await aptos.view({
      payload: {
        function: `${VELOX_ADDRESS}::solver_registry::get_solver_info`,
        functionArguments: [VELOX_ADDRESS, solverAddress],
      },
    });
    return result[0];
  } catch {
    return null;
  }
}

export async function isSolverRegistered(solverAddress: string): Promise<boolean> {
  const result = await aptos.view({
    payload: {
      function: `${VELOX_ADDRESS}::solver_registry::is_registered`,
      functionArguments: [VELOX_ADDRESS, solverAddress],
    },
  });
  return result[0] as boolean;
}

export async function getMinStake(): Promise<bigint> {
  const result = await aptos.view({
    payload: {
      function: `${VELOX_ADDRESS}::solver_registry::get_min_stake`,
      functionArguments: [VELOX_ADDRESS],
    },
  });
  return BigInt(result[0] as string);
}
