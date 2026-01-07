"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const ts_sdk_1 = require("@aptos-labs/ts-sdk");
const VELOX_ADDRESS = process.env.VELOX_ADDRESS || '0x5cf7138d960b59b714b1d05774fdc2c26ae3f6d9f60808981f5d3c7e6004f840';
const RPC_URL = process.env.RPC_URL || 'https://testnet.movementnetwork.xyz/v1';
const SOLVER_ADDRESS = '0x5cf7138d960b59b714b1d05774fdc2c26ae3f6d9f60808981f5d3c7e6004f840';
const TOKEN_ADDRESSES = {
    tUSDC: '0xd28177fbf37d818e493963c11fe567e3f6dad693a1406b309847f850ba6c31f0',
    tMOVE: '0x23dc029a2171449dd3a00598c6e83ef771ca4567818cea527d4ec6dd48c9701d',
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