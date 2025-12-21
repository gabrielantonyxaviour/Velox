"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const ts_sdk_1 = require("@aptos-labs/ts-sdk");
const VELOX_ADDRESS = process.env.VELOX_ADDRESS || '0x951cb360d9b1d4cb4834cf76e4fca0f63a85237874d8b2d45b3056439b91cbb7';
const RPC_URL = process.env.RPC_URL || 'https://testnet.movementnetwork.xyz/v1';
const SOLVER_ADDRESS = process.env.SOLVER_ADDRESS || '0x951cb360d9b1d4cb4834cf76e4fca0f63a85237874d8b2d45b3056439b91cbb7';
const TOKEN_ADDRESSES = {
    tUSDC: '0xd249fd3776a6bf959963d2f7712386da3f343a973f0d88ed05b1e9e6be6cb015',
    tMOVE: '0x9913b3a2cd19b572521bcc890058dfd285943fbfa33b7c954879f55bbe5da89',
    MOVE: '0x1::aptos_coin::AptosCoin',
};
async function main() {
    const aptos = new ts_sdk_1.Aptos(new ts_sdk_1.AptosConfig({
        network: ts_sdk_1.Network.CUSTOM,
        fullnode: RPC_URL,
    }));
    console.log('=== Solver Account Balances ===');
    console.log('Solver Address:', SOLVER_ADDRESS);
    console.log('');
    // Check native MOVE balance
    try {
        const resources = await aptos.getAccountResources({ accountAddress: SOLVER_ADDRESS });
        const coinResource = resources.find((r) => r.type === '0x1::coin::CoinStore<0x1::aptos_coin::AptosCoin>');
        if (coinResource) {
            const balance = coinResource.data.coin.value;
            console.log(`MOVE (native): ${(Number(balance) / 1e8).toFixed(4)} MOVE`);
        }
        else {
            console.log('MOVE (native): 0 MOVE');
        }
    }
    catch (error) {
        console.log('MOVE (native): Error fetching -', error.message);
    }
    // Check tUSDC balance using view function
    try {
        const result = await aptos.view({
            payload: {
                function: `${VELOX_ADDRESS}::test_tokens::get_token_a_balance`,
                typeArguments: [],
                functionArguments: [VELOX_ADDRESS, SOLVER_ADDRESS],
            },
        });
        const balance = result[0];
        console.log(`tUSDC: ${(Number(balance) / 1e8).toFixed(4)} tUSDC`);
    }
    catch (error) {
        console.log('tUSDC: Error -', error.message);
    }
    // Check tMOVE balance using view function
    try {
        const result = await aptos.view({
            payload: {
                function: `${VELOX_ADDRESS}::test_tokens::get_token_b_balance`,
                typeArguments: [],
                functionArguments: [VELOX_ADDRESS, SOLVER_ADDRESS],
            },
        });
        const balance = result[0];
        console.log(`tMOVE: ${(Number(balance) / 1e8).toFixed(4)} tMOVE`);
    }
    catch (error) {
        console.log('tMOVE: Error -', error.message);
    }
    console.log('\n=== Token Addresses ===');
    console.log('tUSDC:', TOKEN_ADDRESSES.tUSDC);
    console.log('tMOVE:', TOKEN_ADDRESSES.tMOVE);
}
main().catch((error) => {
    console.error('Error:', error);
    process.exit(1);
});
//# sourceMappingURL=check-balances.js.map