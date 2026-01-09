// Main exports
export { VeloxSolver, VeloxSolverConfig } from './VeloxSolver';

// Configuration
export { SolverConfig, SolverConfigOptions } from './config';

// Types
export * from './types';

// Explicit Dutch Auction type exports for convenience
export type {
  DutchAuction,
  AuctionType,
} from './types/intent';

export type {
  DutchAuctionCreatedEvent,
  DutchAuctionAcceptedEvent,
} from './types/events';

// Client
export { VeloxAptosClient, AptosClientConfig } from './client/AptosClient';
export { VeloxGraphQLClient, GraphQLClientConfig } from './client/GraphQLClient';

// Strategies
export {
  SolverStrategy,
  BaseStrategy,
} from './strategies/BaseStrategy';
export { ArbitrageStrategy } from './strategies/ArbitrageStrategy';
export { MarketMakerStrategy } from './strategies/MarketMakerStrategy';

// Utils
export * from './utils/pricing';
export * from './utils/gas';
