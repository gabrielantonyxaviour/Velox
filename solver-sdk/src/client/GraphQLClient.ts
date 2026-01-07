import { GraphQLClient as GQLClient, gql } from 'graphql-request';
import { Intent, IntentType, IntentStatus, RawIntentData } from '../types/intent';

export interface GraphQLClientConfig {
  url: string;
}

export class VeloxGraphQLClient {
  private client: GQLClient;

  constructor(config: GraphQLClientConfig) {
    this.client = new GQLClient(config.url);
  }

  async getPendingIntents(): Promise<Intent[]> {
    const query = gql`
      query GetPendingIntents {
        intents(where: { status: "PENDING" }, orderBy: "createdAt", orderDirection: "desc") {
          id
          type
          user
          inputToken {
            address
            symbol
            decimals
          }
          outputToken {
            address
            symbol
            decimals
          }
          inputAmount
          minOutputAmount
          deadline
          status
          createdAt
          limitPrice
          partialFillAllowed
          numChunks
          interval
        }
      }
    `;

    const result = await this.client.request<{ intents: RawIntentData[] }>(query);
    return result.intents.map(this.parseIntent);
  }

  async getIntentById(id: string): Promise<Intent | null> {
    const query = gql`
      query GetIntent($id: String!) {
        intent(id: $id) {
          id
          type
          user
          inputToken {
            address
            symbol
            decimals
          }
          outputToken {
            address
            symbol
            decimals
          }
          inputAmount
          minOutputAmount
          deadline
          status
          createdAt
          limitPrice
          partialFillAllowed
          numChunks
          interval
        }
      }
    `;

    const result = await this.client.request<{ intent: RawIntentData | null }>(query, { id });
    return result.intent ? this.parseIntent(result.intent) : null;
  }

  async getIntentsByUser(user: string): Promise<Intent[]> {
    const query = gql`
      query GetUserIntents($user: String!) {
        intents(where: { user: $user }, orderBy: "createdAt", orderDirection: "desc") {
          id
          type
          user
          inputToken {
            address
            symbol
            decimals
          }
          outputToken {
            address
            symbol
            decimals
          }
          inputAmount
          minOutputAmount
          deadline
          status
          createdAt
        }
      }
    `;

    const result = await this.client.request<{ intents: RawIntentData[] }>(query, { user });
    return result.intents.map(this.parseIntent);
  }

  private parseIntent(raw: RawIntentData): Intent {
    return {
      id: raw.id,
      type: raw.type as unknown as IntentType,
      user: raw.user,
      inputToken: { address: raw.input_coin, symbol: '', decimals: 8 },
      outputToken: { address: raw.output_coin, symbol: '', decimals: 8 },
      inputAmount: BigInt(raw.amount_in),
      minOutputAmount: raw.min_amount_out ? BigInt(raw.min_amount_out) : undefined,
      deadline: new Date(parseInt(raw.deadline) * 1000),
      status: raw.status as unknown as IntentStatus,
      createdAt: new Date(parseInt(raw.created_at) * 1000),
      limitPrice: raw.limit_price ? BigInt(raw.limit_price) : undefined,
      partialFillAllowed: raw.partial_fill,
      numChunks: raw.num_chunks ? parseInt(raw.num_chunks) : undefined,
      interval: raw.interval ? parseInt(raw.interval) : undefined,
    };
  }
}
