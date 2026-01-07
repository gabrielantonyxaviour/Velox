import { Aptos, Account } from '@aptos-labs/ts-sdk';
export interface AptosClientConfig {
    rpcUrl: string;
    privateKey?: string;
}
export declare class VeloxAptosClient {
    private aptos;
    private account?;
    constructor(config: AptosClientConfig);
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