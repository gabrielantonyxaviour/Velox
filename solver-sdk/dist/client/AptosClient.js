"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VeloxAptosClient = void 0;
const ts_sdk_1 = require("@aptos-labs/ts-sdk");
class VeloxAptosClient {
    aptos;
    account;
    shinamiKey;
    constructor(config) {
        // Note: Shinami Node Service for Movement uses JSON-RPC format
        // which isn't directly compatible with Aptos SDK's REST client.
        // For now, we use the standard Movement RPC and store the key
        // for potential future JSON-RPC integration.
        this.shinamiKey = config.shinamiNodeKey;
        this.aptos = new ts_sdk_1.Aptos(new ts_sdk_1.AptosConfig({
            network: ts_sdk_1.Network.CUSTOM,
            fullnode: config.rpcUrl,
        }));
        if (config.privateKey) {
            const privateKey = new ts_sdk_1.Ed25519PrivateKey(config.privateKey);
            this.account = ts_sdk_1.Account.fromPrivateKey({ privateKey });
        }
        if (config.shinamiNodeKey) {
            console.log('[VeloxAptosClient] Shinami key configured (Gas Station ready)');
        }
    }
    hasShinamiKey() {
        return !!this.shinamiKey;
    }
    getAptos() {
        return this.aptos;
    }
    getAccount() {
        return this.account;
    }
    hasAccount() {
        return this.account !== undefined;
    }
    getAccountAddress() {
        return this.account?.accountAddress.toString();
    }
    async view(payload) {
        const result = await this.aptos.view({
            payload: {
                function: payload.function,
                typeArguments: payload.typeArguments,
                functionArguments: payload.functionArguments.map((arg) => arg.toString()),
            },
        });
        return result;
    }
    async submitTransaction(payload) {
        if (!this.account) {
            throw new Error('Account not configured');
        }
        const tx = await this.aptos.transaction.build.simple({
            sender: this.account.accountAddress,
            data: {
                function: payload.function,
                typeArguments: payload.typeArguments,
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
exports.VeloxAptosClient = VeloxAptosClient;
//# sourceMappingURL=AptosClient.js.map