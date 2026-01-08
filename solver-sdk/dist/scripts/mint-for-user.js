"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const ts_sdk_1 = require("@aptos-labs/ts-sdk");
const VELOX_ADDRESS = process.env.VELOX_ADDRESS || '0x951cb360d9b1d4cb4834cf76e4fca0f63a85237874d8b2d45b3056439b91cbb7';
const RPC_URL = 'https://testnet.movementnetwork.xyz/v1';
// Use user private key (user calls faucet for themselves)
const USER_PRIVATE_KEY = process.env.USER_PRIVATE_KEY || '0x399a74dd2eab1d1a8dfc98cd5d7a672fa60f302712960583d270e7bb4ba0a27a';
async function main() {
    const aptos = new ts_sdk_1.Aptos(new ts_sdk_1.AptosConfig({
        network: ts_sdk_1.Network.CUSTOM,
        fullnode: RPC_URL,
    }));
    const privateKey = new ts_sdk_1.Ed25519PrivateKey(USER_PRIVATE_KEY);
    const user = ts_sdk_1.Account.fromPrivateKey({ privateKey });
    console.log('=== User Calling Faucet ===');
    console.log('User:', user.accountAddress.toString());
    console.log('');
    // Mint 10 tUSDC for user (user calls faucet_token_a which mints to caller)
    const mintAmount = 1000000000; // 10 tokens
    console.log(`Calling faucet to get ${mintAmount / 1e8} tUSDC...`);
    try {
        const tx = await aptos.transaction.build.simple({
            sender: user.accountAddress,
            data: {
                function: `${VELOX_ADDRESS}::test_tokens::faucet_token_a`,
                typeArguments: [],
                functionArguments: [
                    VELOX_ADDRESS,
                    mintAmount.toString(),
                ],
            },
        });
        const signedTx = await aptos.transaction.sign({ signer: user, transaction: tx });
        const result = await aptos.transaction.submit.simple({ transaction: tx, senderAuthenticator: signedTx });
        console.log('TX Hash:', result.hash);
        await aptos.waitForTransaction({ transactionHash: result.hash });
        console.log('tUSDC faucet success!');
    }
    catch (error) {
        console.error('Error getting tUSDC:', error.message);
    }
    console.log('');
    // Check balances
    console.log('=== Updated Balances ===');
    try {
        const result = await aptos.view({
            payload: {
                function: `${VELOX_ADDRESS}::test_tokens::get_token_a_balance`,
                typeArguments: [],
                functionArguments: [VELOX_ADDRESS, user.accountAddress.toString()],
            },
        });
        console.log('User tUSDC:', Number(result[0]) / 1e8, 'tUSDC');
    }
    catch (error) {
        console.log('User tUSDC: 0');
    }
}
main().catch((error) => {
    console.error('Error:', error);
    process.exit(1);
});
//# sourceMappingURL=mint-for-user.js.map