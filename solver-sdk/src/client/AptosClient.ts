import { Aptos, AptosConfig, Network, Account, Ed25519PrivateKey } from '@aptos-labs/ts-sdk';

// Shinami Node Service URL for Movement
const SHINAMI_NODE_URL = 'https://api.shinami.com/movement/node/v1';

export interface AptosClientConfig {
  rpcUrl: string;
  privateKey?: string;
  /** Shinami Node Service API key for enhanced reliability */
  shinamiNodeKey?: string;
}

export class VeloxAptosClient {
  private aptos: Aptos;
  private account?: Account;
  private usingShinami: boolean = false;

  constructor(config: AptosClientConfig) {
    // Use Shinami Node Service if API key is provided for enhanced reliability
    if (config.shinamiNodeKey) {
      console.log('[VeloxAptosClient] Using Shinami Node Service for enhanced reliability');
      this.aptos = new Aptos(
        new AptosConfig({
          network: Network.CUSTOM,
          fullnode: SHINAMI_NODE_URL,
          clientConfig: {
            HEADERS: {
              'X-API-Key': config.shinamiNodeKey,
            },
          },
        })
      );
      this.usingShinami = true;
    } else {
      this.aptos = new Aptos(
        new AptosConfig({
          network: Network.CUSTOM,
          fullnode: config.rpcUrl,
        })
      );
    }

    if (config.privateKey) {
      const privateKey = new Ed25519PrivateKey(config.privateKey);
      this.account = Account.fromPrivateKey({ privateKey });
    }
  }

  isUsingShinami(): boolean {
    return this.usingShinami;
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
  }
}
