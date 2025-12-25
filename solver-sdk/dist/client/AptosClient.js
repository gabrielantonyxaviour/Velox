"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VeloxAptosClient = void 0;
const ts_sdk_1 = require("@aptos-labs/ts-sdk");
class VeloxAptosClient {
    aptos;
    account;
    shinamiKey;
    constructor(config) {
        // Solver pays its own gas - no need for gas sponsorship
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
            console.log('[VeloxAptosClient] Shinami Node Service configured for RPC reliability');
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
        const maxRetries = 3;
        let lastError = null;
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
            catch (error) {
                lastError = error;
                const errorMessage = error.message || '';
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
exports.VeloxAptosClient = VeloxAptosClient;
//# sourceMappingURL=AptosClient.js.map