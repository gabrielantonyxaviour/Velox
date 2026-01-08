import {
  AccountAuthenticatorEd25519,
  Ed25519PublicKey,
  Ed25519Signature,
  generateSigningMessageForTransaction,
} from '@aptos-labs/ts-sdk';
import { aptos, VELOX_ADDRESS, toHex } from '../aptos';
import { DutchAuction } from './types';
import { sponsoredSubmit, isSponsorshipEnabled } from '../shinami';

export interface SignRawHashFunction {
  (params: { address: string; chainType: 'aptos'; hash: `0x${string}` }): Promise<{
    signature: string;
  }>;
}

// Helper to build and sign transactions with Privy (user pays gas - fallback)
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

/**
 * Smart transaction submission - uses Shinami Gas Station if available,
 * otherwise falls back to user-paid gas
 */
async function smartSubmitWithPrivy(
  walletAddress: string,
  functionId: `${string}::${string}::${string}`,
  args: (string | number | bigint | boolean)[],
  publicKeyHex: string,
  signRawHash: SignRawHashFunction
): Promise<string> {
  // Try sponsored submission first if enabled
  const sponsorshipAvailable = await isSponsorshipEnabled();
  if (sponsorshipAvailable) {
    try {
      console.log('[Velox] Using Shinami Gas Station for sponsored transaction');
      return await sponsoredSubmit(walletAddress, functionId, args, publicKeyHex, signRawHash);
    } catch (error) {
      console.warn('[Velox] Sponsored submission failed, falling back to user-paid:', error);
      // Fall through to user-paid submission
    }
  }

  // Fallback to user-paid gas
  console.log('[Velox] Using user-paid gas transaction');
  return signAndSubmitWithPrivy(walletAddress, functionId, args, publicKeyHex, signRawHash);
}

// ============ Swap Intent ============

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
  signAndSubmitTransaction: (payload: unknown) => Promise<{ hash: string }>
): Promise<string> {
  const response = await signAndSubmitTransaction({
    sender: walletAddress,
    data: {
      function: `${VELOX_ADDRESS}::submission::submit_swap`,
      functionArguments: [
        VELOX_ADDRESS,
        inputToken,
        outputToken,
        amountIn.toString(),
        minAmountOut.toString(),
        deadline,
      ],
    },
  });

  const executed = await aptos.waitForTransaction({ transactionHash: response.hash });
  if (!executed.success) {
    throw new Error('Transaction failed');
  }

  return response.hash;
}

// ============ Limit Order Intent ============

export async function submitLimitOrderIntent(
  walletAddress: string,
  inputToken: string,
  outputToken: string,
  amountIn: bigint,
  limitPrice: bigint,
  expiry: number,
  partialFillAllowed: boolean,
  signRawHash: SignRawHashFunction,
  publicKeyHex: string
): Promise<string> {
  return smartSubmitWithPrivy(
    walletAddress,
    `${VELOX_ADDRESS}::submission::submit_limit_order`,
    [
      VELOX_ADDRESS,
      inputToken,
      outputToken,
      amountIn.toString(),
      limitPrice.toString(),
      expiry,
      partialFillAllowed,
    ],
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
  partialFillAllowed: boolean,
  signAndSubmitTransaction: (payload: unknown) => Promise<{ hash: string }>
): Promise<string> {
  const response = await signAndSubmitTransaction({
    sender: walletAddress,
    data: {
      function: `${VELOX_ADDRESS}::submission::submit_limit_order`,
      functionArguments: [
        VELOX_ADDRESS,
        inputToken,
        outputToken,
        amountIn.toString(),
        limitPrice.toString(),
        expiry,
        partialFillAllowed,
      ],
    },
  });

  const executed = await aptos.waitForTransaction({ transactionHash: response.hash });
  if (!executed.success) {
    throw new Error('Transaction failed');
  }

  return response.hash;
}

// ============ TWAP Intent ============

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
      VELOX_ADDRESS, // scheduled_registry_addr (same as registry for MVP)
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
  signAndSubmitTransaction: (payload: unknown) => Promise<{ hash: string }>
): Promise<string> {
  const response = await signAndSubmitTransaction({
    sender: walletAddress,
    data: {
      function: `${VELOX_ADDRESS}::submission::submit_twap`,
      functionArguments: [
        VELOX_ADDRESS,
        VELOX_ADDRESS, // scheduled_registry_addr (same as registry for MVP)
        inputToken,
        outputToken,
        totalAmount.toString(),
        numChunks,
        intervalSeconds,
        maxSlippageBps,
        startTime,
      ],
    },
  });

  const executed = await aptos.waitForTransaction({ transactionHash: response.hash });
  if (!executed.success) {
    throw new Error('Transaction failed');
  }

  return response.hash;
}

// ============ DCA Intent ============

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
      VELOX_ADDRESS, // scheduled_registry_addr (same as registry for MVP)
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
  signAndSubmitTransaction: (payload: unknown) => Promise<{ hash: string }>
): Promise<string> {
  const response = await signAndSubmitTransaction({
    sender: walletAddress,
    data: {
      function: `${VELOX_ADDRESS}::submission::submit_dca`,
      functionArguments: [
        VELOX_ADDRESS,
        VELOX_ADDRESS, // scheduled_registry_addr (same as registry for MVP)
        inputToken,
        outputToken,
        amountPerPeriod.toString(),
        totalPeriods,
        intervalSeconds,
      ],
    },
  });

  const executed = await aptos.waitForTransaction({ transactionHash: response.hash });
  if (!executed.success) {
    throw new Error('Transaction failed');
  }

  return response.hash;
}

// ============ Swap with Auction Intent ============

export async function submitSwapWithAuction(
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
  return smartSubmitWithPrivy(
    walletAddress,
    `${VELOX_ADDRESS}::submission::submit_swap_with_auction`,
    [
      VELOX_ADDRESS,
      VELOX_ADDRESS, // auction_state_addr (same as registry for MVP)
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
}

export async function submitSwapWithAuctionNative(
  walletAddress: string,
  inputToken: string,
  outputToken: string,
  amountIn: bigint,
  minAmountOut: bigint,
  deadline: number,
  auctionDuration: number,
  signAndSubmitTransaction: (payload: unknown) => Promise<{ hash: string }>
): Promise<string> {
  const response = await signAndSubmitTransaction({
    sender: walletAddress,
    data: {
      function: `${VELOX_ADDRESS}::submission::submit_swap_with_auction`,
      functionArguments: [
        VELOX_ADDRESS,
        VELOX_ADDRESS, // auction_state_addr (same as registry for MVP)
        inputToken,
        outputToken,
        amountIn.toString(),
        minAmountOut.toString(),
        deadline,
        auctionDuration,
      ],
    },
  });

  const executed = await aptos.waitForTransaction({ transactionHash: response.hash });
  if (!executed.success) {
    throw new Error('Transaction failed');
  }

  return response.hash;
}

// ============ Swap with Dutch Auction Intent ============

export async function submitSwapWithDutchAuction(
  walletAddress: string,
  inputToken: string,
  outputToken: string,
  amountIn: bigint,
  minAmountOut: bigint,
  startPrice: bigint,
  deadline: number,
  auctionDuration: number,
  signRawHash: SignRawHashFunction,
  publicKeyHex: string
): Promise<string> {
  return smartSubmitWithPrivy(
    walletAddress,
    `${VELOX_ADDRESS}::submission::submit_swap_with_dutch_auction`,
    [
      VELOX_ADDRESS,
      VELOX_ADDRESS, // auction_state_addr
      inputToken,
      outputToken,
      amountIn.toString(),
      minAmountOut.toString(),
      startPrice.toString(),
      deadline,
      auctionDuration,
    ],
    publicKeyHex,
    signRawHash
  );
}

export async function submitSwapWithDutchAuctionNative(
  walletAddress: string,
  inputToken: string,
  outputToken: string,
  amountIn: bigint,
  minAmountOut: bigint,
  startPrice: bigint,
  deadline: number,
  auctionDuration: number,
  signAndSubmitTransaction: (payload: unknown) => Promise<{ hash: string }>
): Promise<string> {
  const response = await signAndSubmitTransaction({
    sender: walletAddress,
    data: {
      function: `${VELOX_ADDRESS}::submission::submit_swap_with_dutch_auction`,
      functionArguments: [
        VELOX_ADDRESS,
        VELOX_ADDRESS, // auction_state_addr
        inputToken,
        outputToken,
        amountIn.toString(),
        minAmountOut.toString(),
        startPrice.toString(),
        deadline,
        auctionDuration,
      ],
    },
  });

  const executed = await aptos.waitForTransaction({ transactionHash: response.hash });
  if (!executed.success) {
    throw new Error('Transaction failed');
  }

  return response.hash;
}

// ============ Dutch Auction View Functions ============

export async function getDutchAuction(intentId: bigint): Promise<DutchAuction | null> {
  try {
    const result = await aptos.view({
      payload: {
        function: `${VELOX_ADDRESS}::auction::get_dutch_auction`,
        functionArguments: [VELOX_ADDRESS, intentId.toString()],
      },
    });

    const [startTime, startPrice, endPrice, duration, isActive, winner, acceptedPrice] = result;

    return {
      intentId,
      startTime: Number(startTime),
      startPrice: BigInt(startPrice as string),
      endPrice: BigInt(endPrice as string),
      duration: Number(duration),
      isActive: isActive as boolean,
      winner: winner as string | null,
      acceptedPrice: BigInt(acceptedPrice as string),
    };
  } catch {
    return null;
  }
}

export async function getDutchPrice(intentId: bigint): Promise<bigint> {
  const result = await aptos.view({
    payload: {
      function: `${VELOX_ADDRESS}::auction::get_dutch_price`,
      functionArguments: [VELOX_ADDRESS, intentId.toString()],
    },
  });

  return BigInt(result[0] as string);
}

// ============ Cancel Intent ============

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
  signAndSubmitTransaction: (payload: unknown) => Promise<{ hash: string }>
): Promise<string> {
  const response = await signAndSubmitTransaction({
    sender: walletAddress,
    data: {
      function: `${VELOX_ADDRESS}::submission::cancel_intent`,
      functionArguments: [VELOX_ADDRESS, intentId.toString()],
    },
  });

  const executed = await aptos.waitForTransaction({ transactionHash: response.hash });
  if (!executed.success) {
    throw new Error('Transaction failed');
  }

  return response.hash;
}
