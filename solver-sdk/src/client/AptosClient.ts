import { Aptos, AptosConfig, Network, Account, Ed25519PrivateKey } from '@aptos-labs/ts-sdk';

export interface AptosClientConfig {
  rpcUrl: string;
  privateKey?: string;
  /** Shinami Node Service API key (for enhanced RPC reliability) */
  shinamiNodeKey?: string;
}

export class VeloxAptosClient {
  private aptos: Aptos;
  private account?: Account;
  private shinamiKey?: string;

  constructor(config: AptosClientConfig) {
    // Solver pays its own gas - no need for gas sponsorship
    this.shinamiKey = config.shinamiNodeKey;

    this.aptos = new Aptos(
      new AptosConfig({
        network: Network.CUSTOM,
        fullnode: config.rpcUrl,
      })
    );

    if (config.privateKey) {
      const privateKey = new Ed25519PrivateKey(config.privateKey);
      this.account = Account.fromPrivateKey({ privateKey });
    }

    if (config.shinamiNodeKey) {
      console.log('[VeloxAptosClient] Shinami Node Service configured for RPC reliability');
    }
  }

  hasShinamiKey(): boolean {
    return !!this.shinamiKey;
  }

  getAptos(): Aptos {
    return this.aptos;
  }

  getAccount(): Account | undefined {
    return this.account;
  }

  hasAccount(): boolean {
    return this.account !== undefined;
  }

  getAccountAddress(): string | undefined {
    return this.account?.accountAddress.toString();
  }

  async view<T>(payload: {
    function: string;
    typeArguments: string[];
    functionArguments: (string | number | bigint)[];
  }): Promise<T> {
    const result = await this.aptos.view({
      payload: {
        function: payload.function as `${string}::${string}::${string}`,
        typeArguments: payload.typeArguments as [],
        functionArguments: payload.functionArguments.map((arg) => arg.toString()),
      },
    });
    return result as T;
  }

  async submitTransaction(payload: {
    function: string;
    typeArguments: string[];
    functionArguments: (string | number | bigint)[];
  }): Promise<string> {
    if (!this.account) {
      throw new Error('Account not configured');
    }

    const maxRetries = 3;
    let lastError: Error | null = null;

    for (let attempt = 0; attempt < maxRetries; attempt++) {
      try {
        // Add small delay between retries to allow sequence number to sync
        if (attempt > 0) {
          console.log(`[AptosClient] Retry attempt ${attempt + 1}/${maxRetries} after sequence number error...`);
          await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
        }

        const tx = await this.aptos.transaction.build.simple({
          sender: this.account.accountAddress,
          data: {
            function: payload.function as `${string}::${string}::${string}`,
            typeArguments: payload.typeArguments as [],
            functionArguments: payload.functionArguments.map((arg) => arg.toString()),
          },
        });

        const signedTx = await this.aptos.signAndSubmitTransaction({
          signer: this.account,
          transaction: tx,
        });

        await this.aptos.waitForTransaction({ transactionHash: signedTx.hash });

        return signedTx.hash;
      } catch (error) {
        lastError = error as Error;
        const errorMessage = (error as Error).message || '';

        // Retry on sequence number errors
        if (errorMessage.includes('SEQUENCE_NUMBER_TOO_OLD') ||
            errorMessage.includes('SEQUENCE_NUMBER_TOO_NEW')) {
          console.warn(`[AptosClient] Sequence number error, will retry: ${errorMessage}`);
          continue;
        }

        // Don't retry on other errors
        throw error;
      }
    }

    throw lastError || new Error('Transaction failed after retries');
  }
}
