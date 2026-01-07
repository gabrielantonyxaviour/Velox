"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const ts_sdk_1 = require("@aptos-labs/ts-sdk");
const VELOX_ADDRESS = process.env.VELOX_ADDRESS || '0x5cf7138d960b59b714b1d05774fdc2c26ae3f6d9f60808981f5d3c7e6004f840';
const RPC_URL = process.env.RPC_URL || 'https://testnet.movementnetwork.xyz/v1';
const PRIVATE_KEY = process.env.SOLVER_PRIVATE_KEY;
async function main() {
    if (!PRIVATE_KEY) {
        throw new Error('SOLVER_PRIVATE_KEY is required');
    }
    const aptos = new ts_sdk_1.Aptos(new ts_sdk_1.AptosConfig({
        network: ts_sdk_1.Network.CUSTOM,
        fullnode: RPC_URL,
    }));
    const privateKey = new ts_sdk_1.Ed25519PrivateKey(PRIVATE_KEY);
    const account = ts_sdk_1.Account.fromPrivateKey({ privateKey });
    console.log('Account:', account.accountAddress.toString());
    console.log('Velox Address:', VELOX_ADDRESS);
    console.log('RPC URL:', RPC_URL);
    // Initialize submission registry
    console.log('\nInitializing Submission IntentRegistry...');
    try {
        const tx = await aptos.transaction.build.simple({
            sender: account.accountAddress,
            data: {
                function: `${VELOX_ADDRESS}::submission::initialize`,
                typeArguments: [],
                functionArguments: [],
            },
        });
        const signedTx = await aptos.signAndSubmitTransaction({
            signer: account,
            transaction: tx,
        });
        await aptos.waitForTransaction({ transactionHash: signedTx.hash });
        console.log('Submission registry initialized! TX:', signedTx.hash);
    }
    catch (error) {
        console.log('Submission init error:', error.message);
        if (error.message.includes('ALREADY_EXISTS') ||
            error.message.includes('already_exists')) {
            console.log('Already initialized, continuing...');
        }
        else {
            throw error;
        }
    }
    // Initialize scheduled registry
    console.log('\nInitializing Scheduled Registry...');
    try {
        const tx = await aptos.transaction.build.simple({
            sender: account.accountAddress,
            data: {
                function: `${VELOX_ADDRESS}::scheduled::initialize`,
                typeArguments: [],
                functionArguments: [],
            },
        });
        const signedTx = await aptos.signAndSubmitTransaction({
            signer: account,
            transaction: tx,
        });
        await aptos.waitForTransaction({ transactionHash: signedTx.hash });
        console.log('Scheduled registry initialized! TX:', signedTx.hash);
    }
    catch (error) {
        console.log('Scheduled init error:', error.message);
    }
    // Initialize auction state
    console.log('\nInitializing Auction State...');
    try {
        const tx = await aptos.transaction.build.simple({
            sender: account.accountAddress,
            data: {
                function: `${VELOX_ADDRESS}::auction::initialize`,
                typeArguments: [],
                functionArguments: [],
            },
        });
        const signedTx = await aptos.signAndSubmitTransaction({
            signer: account,
            transaction: tx,
        });
        await aptos.waitForTransaction({ transactionHash: signedTx.hash });
        console.log('Auction state initialized! TX:', signedTx.hash);
    }
    catch (error) {
        console.log('Auction init error:', error.message);
    }
    console.log('\nDone!');
}
main().catch((error) => {
    console.error('Fatal error:', error);
    process.exit(1);
});
//# sourceMappingURL=init-registry.js.map