"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VeloxGraphQLClient = void 0;
const graphql_request_1 = require("graphql-request");
const intent_1 = require("../types/intent");
class VeloxGraphQLClient {
    client;
    constructor(config) {
        this.client = new graphql_request_1.GraphQLClient(config.url);
    }
    async getPendingIntents() {
        const query = (0, graphql_request_1.gql) `
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
        const result = await this.client.request(query);
        return result.intents.map((raw) => this.parseIntent(raw));
    }
    async getIntentById(id) {
        const query = (0, graphql_request_1.gql) `
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
        const result = await this.client.request(query, { user });
        return result.intents.map((raw) => this.parseIntent(raw));
    }
    parseIntent(raw) {
        const intent = {
            type: this.parseIntentType(raw.type),
            inputToken: raw.inputToken,
            outputToken: raw.outputToken,
        };
        // Swap fields
        if (raw.amountIn)
            intent.amountIn = BigInt(raw.amountIn);
        if (raw.minAmountOut)
            intent.minAmountOut = BigInt(raw.minAmountOut);
        if (raw.deadline)
            intent.deadline = parseInt(raw.deadline);
        // LimitOrder fields
        if (raw.limitPrice)
            intent.limitPrice = BigInt(raw.limitPrice);
        // TWAP fields
        if (raw.totalAmount)
            intent.totalAmount = BigInt(raw.totalAmount);
        if (raw.numChunks)
            intent.numChunks = parseInt(raw.numChunks);
        if (raw.intervalSeconds)
            intent.intervalSeconds = parseInt(raw.intervalSeconds);
        if (raw.maxSlippageBps)
            intent.maxSlippageBps = parseInt(raw.maxSlippageBps);
        if (raw.startTime)
            intent.startTime = parseInt(raw.startTime);
        // DCA fields
        if (raw.amountPerPeriod)
            intent.amountPerPeriod = BigInt(raw.amountPerPeriod);
        if (raw.totalPeriods)
            intent.totalPeriods = parseInt(raw.totalPeriods);
        return intent;
    }
    parseIntentType(type) {
        if (type.includes('Swap'))
            return intent_1.IntentType.SWAP;
        if (type.includes('LimitOrder'))
            return intent_1.IntentType.LIMIT_ORDER;
        if (type.includes('TWAP'))
            return intent_1.IntentType.TWAP;
        if (type.includes('DCA'))
            return intent_1.IntentType.DCA;
        return intent_1.IntentType.SWAP;
    }
}
exports.VeloxGraphQLClient = VeloxGraphQLClient;
//# sourceMappingURL=GraphQLClient.js.map