// Velox contract addresses on Movement Bardock Testnet
export const VELOX_ADDRESS = '0x94d017d8d944702a976af2844bdf3534b946e712cad286610aef5969568ba470';
export const REGISTRY_ADDR = VELOX_ADDRESS; // Registry is at same address

// Token metadata addresses (fungible assets)
export const TOKENS = {
  tUSDC: {
    address: '0xfb34c9c1600d86a9acdb351aaf6fddce6a0de7254bced08c38fcaf364e525297',
    symbol: 'tUSDC',
    name: 'Test USDC',
    decimals: 8,
  },
  tMOVE: {
    address: '0x8f82fb318e613f63aca2168b11ba2a08a66606c7e862c38128e414856b840ec5',
    symbol: 'tMOVE',
    name: 'Test MOVE',
    decimals: 8,
  },
} as const;

// Native MOVE coin type
export const NATIVE_MOVE = '0x1::aptos_coin::AptosCoin';
