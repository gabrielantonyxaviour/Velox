import { GraphQLClient as GQLClient, gql } from 'graphql-request';
import { Intent, IntentType } from '../types/intent';

export interface GraphQLClientConfig {
  url: string;
}

interface GraphQLIntent {
  id: string;
  type: string;
  user: string;
  inputToken: string;
  outputToken: string;
  amountIn?: string;
  minAmountOut?: string;
  deadline: string;
  limitPrice?: string;
  numChunks?: string;
  intervalSeconds?: string;
  amountPerPeriod?: string;
  totalPeriods?: string;
  totalAmount?: string;
  maxSlippageBps?: string;
  startTime?: string;
}

export class VeloxGraphQLClient {
  private client: GQLClient;

  constructor(config: GraphQLClientConfig) {
    this.client = new GQLClient(config.url);
  }

  async getPendingIntents(): Promise<Intent[]> {
    const query = gql`
      query GetPendingIntents {
        intents(where: { status: "ACTIVE" }, orderBy: "createdAt", orderDirection: "desc") {
          id
          type
          user
          inputToken
          outputToken
          amountIn
          minAmountOut
          deadline
          limitPrice
          numChunks
          intervalSeconds
          amountPerPeriod
          totalPeriods
          totalAmount
          maxSlippageBps
          startTime
        }
      }
    `;

    const result = await this.client.request<{ intents: GraphQLIntent[] }>(query);
    return result.intents.map((raw) => this.parseIntent(raw));
  }

  async getIntentById(id: string): Promise<Intent | null> {
    const query = gql`
      query GetIntent($id: String!) {
        intent(id: $id) {
          id
          type
          user
          inputToken
          outputToken
          amountIn
          minAmountOut
          deadline
          limitPrice
          numChunks
          intervalSeconds
          amountPerPeriod
          totalPeriods
          totalAmount
          maxSlippageBps
          startTime
        }
      }
    `;

    const result = await this.client.request<{ intent: GraphQLIntent | null }>(query, { id });
    return result.intent ? this.parseIntent(result.intent) : null;
  }

  async getIntentsByUser(user: string): Promise<Intent[]> {
    const query = gql`
      query GetUserIntents($user: String!) {
        intents(where: { user: $user }, orderBy: "createdAt", orderDirection: "desc") {
          id
          type
          user
          inputToken
          outputToken
          amountIn
          minAmountOut
          deadline
          limitPrice
          numChunks
          intervalSeconds
          amountPerPeriod
          totalPeriods
          totalAmount
          maxSlippageBps
          startTime
        }
      }
    `;

    const result = await this.client.request<{ intents: GraphQLIntent[] }>(query, { user });
    return result.intents.map((raw) => this.parseIntent(raw));
  }

  private parseIntent(raw: GraphQLIntent): Intent {
    const intent: Intent = {
      type: this.parseIntentType(raw.type),
      inputToken: raw.inputToken,
      outputToken: raw.outputToken,
    };

    // Swap fields
    if (raw.amountIn) intent.amountIn = BigInt(raw.amountIn);
    if (raw.minAmountOut) intent.minAmountOut = BigInt(raw.minAmountOut);
    if (raw.deadline) intent.deadline = parseInt(raw.deadline);

    // LimitOrder fields
    if (raw.limitPrice) intent.limitPrice = BigInt(raw.limitPrice);

    // TWAP fields
    if (raw.totalAmount) intent.totalAmount = BigInt(raw.totalAmount);
    if (raw.numChunks) intent.numChunks = parseInt(raw.numChunks);
    if (raw.intervalSeconds) intent.intervalSeconds = parseInt(raw.intervalSeconds);
    if (raw.maxSlippageBps) intent.maxSlippageBps = parseInt(raw.maxSlippageBps);
    if (raw.startTime) intent.startTime = parseInt(raw.startTime);

    // DCA fields
    if (raw.amountPerPeriod) intent.amountPerPeriod = BigInt(raw.amountPerPeriod);
    if (raw.totalPeriods) intent.totalPeriods = parseInt(raw.totalPeriods);

    return intent;
  }

  private parseIntentType(type: string): IntentType {
    if (type.includes('Swap')) return IntentType.SWAP;
    if (type.includes('LimitOrder')) return IntentType.LIMIT_ORDER;
    if (type.includes('TWAP')) return IntentType.TWAP;
    if (type.includes('DCA')) return IntentType.DCA;
    return IntentType.SWAP;
  }
}
