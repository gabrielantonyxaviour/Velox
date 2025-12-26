// Velox contract addresses on Movement Bardock Testnet
export const VELOX_ADDRESS = '0x94d017d8d944702a976af2844bdf3534b946e712cad286610aef5969568ba470';
export const REGISTRY_ADDR = VELOX_ADDRESS; // Registry is at same address

// Token metadata addresses (fungible assets)
export const TOKENS = {
  tUSDC: {
    address: '0xd249fd3776a6bf959963d2f7712386da3f343a973f0d88ed05b1e9e6be6cb015',
    symbol: 'tUSDC',
    name: 'Test USDC',
    decimals: 8,
  },
  tMOVE: {
    address: '0x9913b3a2cd19b572521bcc890058dfd285943fbfa33b7c954879f55bbe5da89',
    symbol: 'tMOVE',
    name: 'Test MOVE',
    decimals: 8,
  },
} as const;

// Native MOVE coin type
export const NATIVE_MOVE = '0x1::aptos_coin::AptosCoin';
