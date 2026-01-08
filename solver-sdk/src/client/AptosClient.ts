import { Aptos, AptosConfig, Network, Account, Ed25519PrivateKey } from '@aptos-labs/ts-sdk';

export interface AptosClientConfig {
  rpcUrl: string;
  privateKey?: string;
  /** Shinami API key - currently used for Gas Station only, Node Service pending */
  shinamiNodeKey?: string;
}

export class VeloxAptosClient {
  private aptos: Aptos;
  private account?: Account;
  private shinamiKey?: string;

  constructor(config: AptosClientConfig) {
    // Note: Shinami Node Service for Movement uses JSON-RPC format
    // which isn't directly compatible with Aptos SDK's REST client.
    // For now, we use the standard Movement RPC and store the key
    // for potential future JSON-RPC integration.
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
      console.log('[VeloxAptosClient] Shinami key configured (Gas Station ready)');
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
