"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VeloxGraphQLClient = void 0;
const graphql_request_1 = require("graphql-request");
class VeloxGraphQLClient {
    client;
    constructor(config) {
        this.client = new graphql_request_1.GraphQLClient(config.url);
    }
    async getPendingIntents() {
        const query = (0, graphql_request_1.gql) `
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
        const result = await this.client.request(query);
        return result.intents.map(this.parseIntent);
    }
    async getIntentById(id) {
        const query = (0, graphql_request_1.gql) `
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
        const result = await this.client.request(query, { id });
        return result.intent ? this.parseIntent(result.intent) : null;
    }
    async getIntentsByUser(user) {
        const query = (0, graphql_request_1.gql) `
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
        const result = await this.client.request(query, { user });
        return result.intents.map(this.parseIntent);
    }
    parseIntent(raw) {
        return {
            id: raw.id,
            type: raw.type,
            user: raw.user,
            inputToken: { address: raw.input_coin, symbol: '', decimals: 8 },
            outputToken: { address: raw.output_coin, symbol: '', decimals: 8 },
            inputAmount: BigInt(raw.amount_in),
            minOutputAmount: raw.min_amount_out ? BigInt(raw.min_amount_out) : undefined,
            deadline: new Date(parseInt(raw.deadline) * 1000),
            status: raw.status,
            createdAt: new Date(parseInt(raw.created_at) * 1000),
            limitPrice: raw.limit_price ? BigInt(raw.limit_price) : undefined,
            partialFillAllowed: raw.partial_fill,
            numChunks: raw.num_chunks ? parseInt(raw.num_chunks) : undefined,
            interval: raw.interval ? parseInt(raw.interval) : undefined,
        };
    }
}
exports.VeloxGraphQLClient = VeloxGraphQLClient;
//# sourceMappingURL=GraphQLClient.js.map