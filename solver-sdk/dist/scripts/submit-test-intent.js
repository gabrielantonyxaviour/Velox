"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const ts_sdk_1 = require("@aptos-labs/ts-sdk");
const VELOX_ADDRESS = process.env.VELOX_ADDRESS || '0x94d017d8d944702a976af2844bdf3534b946e712cad286610aef5969568ba470';
const RPC_URL = process.env.RPC_URL || 'https://testnet.movementnetwork.xyz/v1';
// Use default profile private key (user)
// This is the user who wants to submit swap intent
const USER_PRIVATE_KEY = process.env.USER_PRIVATE_KEY;
const TOKEN_ADDRESSES = {
    tUSDC: '0xfb34c9c1600d86a9acdb351aaf6fddce6a0de7254bced08c38fcaf364e525297',
    tMOVE: '0x8f82fb318e613f63aca2168b11ba2a08a66606c7e862c38128e414856b840ec5',
};
async function main() {
    const aptos = new ts_sdk_1.Aptos(new ts_sdk_1.AptosConfig({
        network: ts_sdk_1.Network.CUSTOM,
        fullnode: RPC_URL,
    }));
    if (!USER_PRIVATE_KEY) {
        console.error('USER_PRIVATE_KEY not set in .env');
        console.log('\nTo submit a test intent, add USER_PRIVATE_KEY to solver-sdk/.env');
        console.log('This should be a different account from the solver (has tUSDC to swap)');
        process.exit(1);
    }
    const privateKey = new ts_sdk_1.Ed25519PrivateKey(USER_PRIVATE_KEY);
    const user = ts_sdk_1.Account.fromPrivateKey({ privateKey });
    console.log('=== Submit Test Swap Intent ===');
    console.log('User Address:', user.accountAddress.toString());
    console.log('');
    // Check user's tUSDC balance first
    try {
        const result = await aptos.view({
            payload: {
                function: `${VELOX_ADDRESS}::test_tokens::get_token_a_balance`,
                typeArguments: [],
                functionArguments: [VELOX_ADDRESS, user.accountAddress.toString()],
            },
        });
        const balance = result[0];
        console.log(`User tUSDC balance: ${(Number(balance) / 1e8).toFixed(4)} tUSDC`);
        if (Number(balance) < 100000000) {
            console.error('User needs at least 1 tUSDC to submit intent');
            console.log('Use faucet to get tokens first');
            process.exit(1);
        }
    }
    catch (error) {
        console.error('Error checking balance:', error.message);
        process.exit(1);
    }
    // Calculate deadline (10 minutes from now)
    const deadline = Math.floor(Date.now() / 1000) + 600;
    console.log('Deadline:', new Date(deadline * 1000).toISOString());
    // Submit swap intent: 1 tUSDC -> tMOVE
    const inputAmount = 100000000; // 1 tUSDC
    const minOutput = 1; // Accept any output (min 1 unit)
    console.log('');
    console.log('Submitting swap intent:');
    console.log(`  Input: ${inputAmount / 1e8} tUSDC`);
    console.log(`  Output: tMOVE`);
    console.log(`  Min output: ${minOutput}`);
    try {
        const tx = await aptos.transaction.build.simple({
            sender: user.accountAddress,
            data: {
                function: `${VELOX_ADDRESS}::submission::submit_swap`,
                typeArguments: [],
                functionArguments: [
                    VELOX_ADDRESS, // registry
                    TOKEN_ADDRESSES.tUSDC, // input token
                    TOKEN_ADDRESSES.tMOVE, // output token
                    inputAmount.toString(), // amount
                    minOutput.toString(), // min output
                    deadline.toString(), // deadline
                ],
            },
        });
        const signedTx = await aptos.transaction.sign({ signer: user, transaction: tx });
        const result = await aptos.transaction.submit.simple({ transaction: tx, senderAuthenticator: signedTx });
        console.log('');
        console.log('=== Intent Submitted! ===');
        console.log('TX Hash:', result.hash);
        // Wait for transaction
        await aptos.waitForTransaction({ transactionHash: result.hash });
        console.log('Transaction confirmed!');
        // Get intent ID
        const totalResult = await aptos.view({
            payload: {
                function: `${VELOX_ADDRESS}::submission::get_total_intents`,
                typeArguments: [],
                functionArguments: [VELOX_ADDRESS],
            },
        });
        const totalIntents = Number(totalResult[0]);
        console.log('New Intent ID:', totalIntents - 1);
        console.log('');
        console.log('The solver should detect and fill this intent soon...');
    }
    catch (error) {
        console.error('Error submitting intent:', error.message);
        process.exit(1);
    }
}
main().catch((error) => {
    console.error('Error:', error);
    process.exit(1);
});
//# sourceMappingURL=submit-test-intent.js.map