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
    address: '0xd28177fbf37d818e493963c11fe567e3f6dad693a1406b309847f850ba6c31f0',
    symbol: 'tUSDC',
    name: 'Test USDC',
    decimals: 8,
    icon: '/tokens/usdc.svg',
  },
  tMOVE: {
    address: '0x23dc029a2171449dd3a00598c6e83ef771ca4567818cea527d4ec6dd48c9701d',
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
