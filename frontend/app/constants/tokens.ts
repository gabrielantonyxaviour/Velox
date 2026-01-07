export interface Token {
  address: string;
  symbol: string;
  name: string;
  decimals: number;
  icon: string;
}

// Token addresses on Movement testnet (deployed via velox::test_tokens)
export const TOKENS: Record<string, Token> = {
  tUSDC: {
    address: '0x194eede164d0a9ee0c8082ff82eebdf146b3936872c203cf9282cd54ea5287ce',
    symbol: 'tUSDC',
    name: 'Test USDC',
    decimals: 8,
    icon: '/tokens/usdc.svg',
  },
  tMOVE: {
    address: '0x626598b71b290f416b9e906dc3dfff337bf0364b3bf53b0bbb6ffab1c0dc373b',
    symbol: 'tMOVE',
    name: 'Test MOVE',
    decimals: 8,
    icon: '/tokens/move.svg',
  },
  // NOTE: Native MOVE (0x1::aptos_coin::AptosCoin) is intentionally excluded
  // from trading. Solvers may not have native currency liquidity, so we only
  // use test tokens for swaps.
};

export const TOKEN_LIST = Object.values(TOKENS);
