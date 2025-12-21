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
    address: '0xfb34c9c1600d86a9acdb351aaf6fddce6a0de7254bced08c38fcaf364e525297',
    symbol: 'tUSDC',
    name: 'Test USDC',
    decimals: 8,
    icon: '/tokens/usdc.svg',
  },
  tMOVE: {
    address: '0x8f82fb318e613f63aca2168b11ba2a08a66606c7e862c38128e414856b840ec5',
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
