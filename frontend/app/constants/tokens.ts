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
    address: '0xd249fd3776a6bf959963d2f7712386da3f343a973f0d88ed05b1e9e6be6cb015',
    symbol: 'tUSDC',
    name: 'Test USDC',
    decimals: 8,
    icon: '/tokens/usdc.svg',
  },
  tMOVE: {
    address: '0x9913b3a2cd19b572521bcc890058dfd285943fbfa33b7c954879f55bbe5da89',
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
