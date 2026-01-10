"use strict";
// ============================================================
// Event Types - Matching Contract Events
// ============================================================
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseIntentFilledEvent = parseIntentFilledEvent;
exports.parseChunkExecutedEvent = parseChunkExecutedEvent;
// ============================================================
// Event Parsing Helpers
// ============================================================
function parseIntentFilledEvent(raw) {
    return {
        type: 'IntentFilled',
        intentId: Number(raw.intent_id),
        user: raw.user,
        solver: raw.solver,
        inputAmount: BigInt(raw.input_amount),
        outputAmount: BigInt(raw.output_amount),
        isPartial: raw.is_partial,
        fillNumber: Number(raw.fill_number),
        protocolFee: BigInt(raw.protocol_fee),
        filledAt: Number(raw.filled_at),
    };
}
function parseChunkExecutedEvent(raw) {
    return {
        type: 'ChunkExecuted',
        intentId: Number(raw.intent_id),
        chunkNumber: Number(raw.chunk_number),
        totalChunks: Number(raw.total_chunks),
        solver: raw.solver,
        inputAmount: BigInt(raw.input_amount),
        outputAmount: BigInt(raw.output_amount),
        executedAt: Number(raw.executed_at),
    };
}
//# sourceMappingURL=events.js.map