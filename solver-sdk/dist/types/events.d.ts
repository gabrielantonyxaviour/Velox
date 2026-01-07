import { Intent, IntentStatus } from './intent';
import { Solution } from './solution';
export interface IntentCreatedEvent {
    type: 'IntentCreated';
    intent: Intent;
    timestamp: Date;
}
export interface IntentStatusChangedEvent {
    type: 'IntentStatusChanged';
    intentId: string;
    previousStatus: IntentStatus;
    newStatus: IntentStatus;
    timestamp: Date;
}
export interface SolutionSubmittedEvent {
    type: 'SolutionSubmitted';
    intentId: string;
    solver: string;
    outputAmount: bigint;
    timestamp: Date;
}
export interface SettlementExecutedEvent {
    type: 'SettlementExecuted';
    intentId: string;
    solver: string;
    solution: Solution;
    txHash: string;
    timestamp: Date;
}
export interface DutchAuctionCreatedEvent {
    type: 'DutchAuctionCreated';
    intentId: bigint;
    startPrice: bigint;
    endPrice: bigint;
    duration: bigint;
    startTime: bigint;
    timestamp: Date;
}
export interface DutchAuctionAcceptedEvent {
    type: 'DutchAuctionAccepted';
    intentId: bigint;
    solver: string;
    acceptedPrice: bigint;
    timestamp: Date;
}
export type VeloxEvent = IntentCreatedEvent | IntentStatusChangedEvent | SolutionSubmittedEvent | SettlementExecutedEvent | DutchAuctionCreatedEvent | DutchAuctionAcceptedEvent;
export interface EventFilter {
    types?: VeloxEvent['type'][];
    intentIds?: string[];
    solvers?: string[];
    fromTimestamp?: Date;
    toTimestamp?: Date;
}
//# sourceMappingURL=events.d.ts.map