import { Aptos, Account } from '@aptos-labs/ts-sdk';
export interface AptosClientConfig {
    rpcUrl: string;
    privateKey?: string;
    /** Shinami Node Service API key (for enhanced RPC reliability) */
    shinamiNodeKey?: string;
}
export declare class VeloxAptosClient {
    private aptos;
    private account?;
    private shinamiKey?;
    constructor(config: AptosClientConfig);
    hasShinamiKey(): boolean;
    getAptos(): Aptos;
    getAccount(): Account | undefined;
    hasAccount(): boolean;
    getAccountAddress(): string | undefined;
    view<T>(payload: {
        function: string;
        typeArguments: string[];
        functionArguments: (string | number | bigint)[];
    }): Promise<T>;
    submitTransaction(payload: {
        function: string;
        typeArguments: string[];
        functionArguments: (string | number | bigint)[];
    }): Promise<string>;
}
//# sourceMappingURL=AptosClient.d.ts.map