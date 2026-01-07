// Velox contract addresses on Movement Bardock Testnet
export const VELOX_ADDRESS = '0x951cb360d9b1d4cb4834cf76e4fca0f63a85237874d8b2d45b3056439b91cbb7';
export const REGISTRY_ADDR = VELOX_ADDRESS; // Registry is at same address

// Token metadata addresses (fungible assets)
export const TOKENS = {
  tUSDC: {
    address: '0x194eede164d0a9ee0c8082ff82eebdf146b3936872c203cf9282cd54ea5287ce',
    symbol: 'tUSDC',
    name: 'Test USDC',
    decimals: 8,
  },
  tMOVE: {
    address: '0x626598b71b290f416b9e906dc3dfff337bf0364b3bf53b0bbb6ffab1c0dc373b',
    symbol: 'tMOVE',
    name: 'Test MOVE',
    decimals: 8,
  },
} as const;

// Native MOVE coin type
export const NATIVE_MOVE = '0x1::aptos_coin::AptosCoin';
