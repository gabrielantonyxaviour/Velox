import { useState } from 'react';
import { aptos, VELOX_ADDRESS } from '../lib/aptos';
import { Token } from '../constants/tokens';
import { useWalletContext } from './use-wallet-context';
import { sponsoredSubmit, sponsoredSubmitNative, isSponsorshipEnabled } from '../lib/shinami';
import {
  AccountAuthenticatorEd25519,
  Ed25519PublicKey,
  Ed25519Signature,
  generateSigningMessageForTransaction,
} from '@aptos-labs/ts-sdk';
import { toHex } from '../lib/aptos';

export type MintStatus = 'idle' | 'loading' | 'success' | 'error';

interface UseFaucetReturn {
  mint: (token: Token, amount: string) => Promise<string>;
  status: MintStatus;
  error: string | null;
  txHash: string | null;
  reset: () => void;
}

// Get faucet function based on token
const getFaucetFunction = (token: Token): `${string}::${string}::${string}` => {
  if (token.symbol === 'tUSDC') {
    return `${VELOX_ADDRESS}::test_tokens::faucet_token_a`;
  } else if (token.symbol === 'tMOVE') {
    return `${VELOX_ADDRESS}::test_tokens::faucet_token_b`;
  }
  throw new Error('Invalid token for faucet');
};

// Convert amount to smallest unit (8 decimals)
const toSmallestUnit = (amount: string, decimals: number): bigint => {
  const [whole, fraction = ''] = amount.split('.');
  const paddedFraction = fraction.padEnd(decimals, '0').slice(0, decimals);
  return BigInt(whole + paddedFraction);
};

export function useFaucet(): UseFaucetReturn {
  const [status, setStatus] = useState<MintStatus>('idle');
  const [error, setError] = useState<string | null>(null);
  const [txHash, setTxHash] = useState<string | null>(null);

  const { walletAddress, isPrivy, signRawHash, publicKeyHex, signAndSubmitTransaction, signTransaction } = useWalletContext();

  const reset = () => {
    setStatus('idle');
    setError(null);
    setTxHash(null);
  };

  // Fallback: user pays gas (Native)
  const mintWithNativeWalletFallback = async (token: Token, amount: string): Promise<string> => {
    if (!walletAddress || !signAndSubmitTransaction) {
      throw new Error('Wallet not connected');
    }

    const amountInSmallest = toSmallestUnit(amount, token.decimals);

    const response = await signAndSubmitTransaction({
      sender: walletAddress,
      data: {
        function: getFaucetFunction(token),
        functionArguments: [VELOX_ADDRESS, amountInSmallest.toString()],
      },
    });

    const executed = await aptos.waitForTransaction({
      transactionHash: response.hash,
    });

    if (!executed.success) {
      throw new Error('Transaction failed');
    }

    return response.hash;
  };

  // Fallback: user pays gas (Privy)
  const mintWithPrivyFallback = async (token: Token, amount: string): Promise<string> => {
    if (!walletAddress || !signRawHash || !publicKeyHex) {
      throw new Error('Privy wallet not connected or missing signing function');
    }

    const amountInSmallest = toSmallestUnit(amount, token.decimals);

    const rawTxn = await aptos.transaction.build.simple({
      sender: walletAddress,
      data: {
        function: getFaucetFunction(token),
        typeArguments: [],
        functionArguments: [VELOX_ADDRESS, amountInSmallest.toString()],
      },
    });

    const message = generateSigningMessageForTransaction(rawTxn);

    const { signature: rawSignature } = await signRawHash({
      address: walletAddress,
      chainType: 'aptos',
      hash: `0x${toHex(message)}`,
    });

    let cleanPublicKey = publicKeyHex.startsWith('0x')
      ? publicKeyHex.slice(2)
      : publicKeyHex;

    if (cleanPublicKey.length === 66) {
      cleanPublicKey = cleanPublicKey.slice(2);
    }

    const senderAuthenticator = new AccountAuthenticatorEd25519(
      new Ed25519PublicKey(cleanPublicKey),
      new Ed25519Signature(
        rawSignature.startsWith('0x') ? rawSignature.slice(2) : rawSignature
      )
    );

    const committedTx = await aptos.transaction.submit.simple({
      transaction: rawTxn,
      senderAuthenticator,
    });

    const executed = await aptos.waitForTransaction({
      transactionHash: committedTx.hash,
    });

    if (!executed.success) {
      throw new Error('Transaction failed');
    }

    return committedTx.hash;
  };

  // Smart mint with Shinami Gas Station (Privy)
  const mintWithPrivy = async (token: Token, amount: string): Promise<string> => {
    if (!walletAddress || !signRawHash || !publicKeyHex) {
      throw new Error('Privy wallet not connected or missing signing function');
    }

    const amountInSmallest = toSmallestUnit(amount, token.decimals);
    const functionId = getFaucetFunction(token);

    const sponsorshipAvailable = await isSponsorshipEnabled();
    if (sponsorshipAvailable) {
      try {
        return await sponsoredSubmit(
          walletAddress,
          functionId,
          [VELOX_ADDRESS, amountInSmallest.toString()],
          publicKeyHex,
          signRawHash
        );
      } catch (error) {
        console.warn('[Faucet] Sponsored submission failed, falling back:', error);
      }
    }

    return mintWithPrivyFallback(token, amount);
  };

  // Smart mint with Shinami Gas Station (Native)
  const mintWithNativeWallet = async (token: Token, amount: string): Promise<string> => {
    if (!walletAddress || !signTransaction || !signAndSubmitTransaction) {
      throw new Error('Wallet not connected');
    }

    const amountInSmallest = toSmallestUnit(amount, token.decimals);
    const functionId = getFaucetFunction(token);

    const sponsorshipAvailable = await isSponsorshipEnabled();
    if (sponsorshipAvailable) {
      try {
        return await sponsoredSubmitNative(
          walletAddress,
          functionId,
          [VELOX_ADDRESS, amountInSmallest.toString()],
          signTransaction
        );
      } catch (error) {
        console.warn('[Faucet] Sponsored submission failed, falling back:', error);
      }
    }

    return mintWithNativeWalletFallback(token, amount);
  };

  const mint = async (token: Token, amount: string): Promise<string> => {
    try {
      setStatus('loading');
      setError(null);

      const hash = isPrivy
        ? await mintWithPrivy(token, amount)
        : await mintWithNativeWallet(token, amount);

      setTxHash(hash);
      setStatus('success');
      return hash;
    } catch (err: any) {
      console.error('Faucet error:', err);
      setError(err?.message || 'Failed to mint tokens');
      setStatus('error');
      throw err;
    }
  };

  return { mint, status, error, txHash, reset };
}
