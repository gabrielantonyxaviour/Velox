import { Intent } from '../types/intent';
export interface GraphQLClientConfig {
    url: string;
}
export declare class VeloxGraphQLClient {
    private client;
    constructor(config: GraphQLClientConfig);
    getPendingIntents(): Promise<Intent[]>;
    getIntentById(id: string): Promise<Intent | null>;
    getIntentsByUser(user: string): Promise<Intent[]>;
    private parseIntent;
}
//# sourceMappingURL=GraphQLClient.d.ts.map