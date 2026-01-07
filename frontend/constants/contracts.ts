// Velox contract addresses on Movement Bardock Testnet
export const VELOX_ADDRESS = '0x5cf7138d960b59b714b1d05774fdc2c26ae3f6d9f60808981f5d3c7e6004f840';
export const REGISTRY_ADDR = VELOX_ADDRESS; // Registry is at same address

// Token metadata addresses (fungible assets)
export const TOKENS = {
  tUSDC: {
    address: '0xd28177fbf37d818e493963c11fe567e3f6dad693a1406b309847f850ba6c31f0',
    symbol: 'tUSDC',
    name: 'Test USDC',
    decimals: 8,
  },
  tMOVE: {
    address: '0x23dc029a2171449dd3a00598c6e83ef771ca4567818cea527d4ec6dd48c9701d',
    symbol: 'tMOVE',
    name: 'Test MOVE',
    decimals: 8,
  },
} as const;

// Native MOVE coin type
export const NATIVE_MOVE = '0x1::aptos_coin::AptosCoin';
