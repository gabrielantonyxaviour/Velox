"use strict";
// ============================================================
// Intent Types - Matching Move 2.0 Contract Interfaces
// ============================================================
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuctionType = exports.IntentType = exports.IntentStatus = void 0;
exports.isPartiallyFilled = isPartiallyFilled;
exports.getFillPercentage = getFillPercentage;
exports.getIntentTotalAmount = getIntentTotalAmount;
exports.isScheduledIntent = isScheduledIntent;
exports.getRemainingChunks = getRemainingChunks;
exports.isNextChunkReady = isNextChunkReady;
exports.parseIntentStatus = parseIntentStatus;
exports.parseAuctionType = parseAuctionType;
exports.parseIntentType = parseIntentType;
// Intent Status - matches contract IntentStatus enum
var IntentStatus;
(function (IntentStatus) {
    IntentStatus["ACTIVE"] = "ACTIVE";
    IntentStatus["FILLED"] = "FILLED";
    IntentStatus["CANCELLED"] = "CANCELLED";
    IntentStatus["EXPIRED"] = "EXPIRED";
})(IntentStatus || (exports.IntentStatus = IntentStatus = {}));
// Intent Type - matches contract Intent enum variants
var IntentType;
(function (IntentType) {
    IntentType["SWAP"] = "SWAP";
    IntentType["LIMIT_ORDER"] = "LIMIT_ORDER";
    IntentType["TWAP"] = "TWAP";
    IntentType["DCA"] = "DCA";
})(IntentType || (exports.IntentType = IntentType = {}));
// Auction Type - matches contract AuctionState enum variants
var AuctionType;
(function (AuctionType) {
    AuctionType["NONE"] = "NONE";
    AuctionType["SEALED_BID_ACTIVE"] = "SEALED_BID_ACTIVE";
    AuctionType["SEALED_BID_COMPLETED"] = "SEALED_BID_COMPLETED";
    AuctionType["DUTCH_ACTIVE"] = "DUTCH_ACTIVE";
    AuctionType["DUTCH_ACCEPTED"] = "DUTCH_ACCEPTED";
    AuctionType["FAILED"] = "FAILED";
})(AuctionType || (exports.AuctionType = AuctionType = {}));
// ============================================================
// Helper Functions
// ============================================================
// Check if intent is partially filled
function isPartiallyFilled(record) {
    if (record.status !== IntentStatus.ACTIVE)
        return false;
    const totalAmount = getIntentTotalAmount(record.intent);
    return record.escrowRemaining < totalAmount && record.escrowRemaining > 0n;
}
// Get fill percentage
function getFillPercentage(record) {
    const totalAmount = getIntentTotalAmount(record.intent);
    if (totalAmount === 0n)
        return 0;
    const filled = totalAmount - record.escrowRemaining;
    return Number((filled * 100n) / totalAmount);
}
// Get total amount for any intent type
function getIntentTotalAmount(intent) {
    switch (intent.type) {
        case IntentType.SWAP:
        case IntentType.LIMIT_ORDER:
            return intent.amountIn ?? 0n;
        case IntentType.TWAP:
            return intent.totalAmount ?? 0n;
        case IntentType.DCA:
            return (intent.amountPerPeriod ?? 0n) * BigInt(intent.totalPeriods ?? 0);
        default:
            return 0n;
    }
}
// Check if intent is a scheduled type (TWAP or DCA)
function isScheduledIntent(intent) {
    return intent.type === IntentType.TWAP || intent.type === IntentType.DCA;
}
// Get remaining chunks/periods for scheduled intents
function getRemainingChunks(record) {
    const intent = record.intent;
    if (intent.type === IntentType.TWAP) {
        return (intent.numChunks ?? 0) - record.chunksExecuted;
    }
    if (intent.type === IntentType.DCA) {
        return (intent.totalPeriods ?? 0) - record.chunksExecuted;
    }
    return 0;
}
// Check if next chunk/period is ready
function isNextChunkReady(record) {
    if (!isScheduledIntent(record.intent))
        return false;
    return Date.now() / 1000 >= record.nextExecution;
}
// Parse status from contract variant
function parseIntentStatus(variant) {
    const type = variant.type.toLowerCase();
    if (type.includes('active'))
        return IntentStatus.ACTIVE;
    if (type.includes('filled'))
        return IntentStatus.FILLED;
    if (type.includes('cancelled'))
        return IntentStatus.CANCELLED;
    if (type.includes('expired'))
        return IntentStatus.EXPIRED;
    return IntentStatus.ACTIVE;
}
// Parse auction type from contract variant
function parseAuctionType(variant) {
    const type = variant.type;
    if (type.includes('None'))
        return AuctionType.NONE;
    if (type.includes('SealedBidActive'))
        return AuctionType.SEALED_BID_ACTIVE;
    if (type.includes('SealedBidCompleted'))
        return AuctionType.SEALED_BID_COMPLETED;
    if (type.includes('DutchActive'))
        return AuctionType.DUTCH_ACTIVE;
    if (type.includes('DutchAccepted'))
        return AuctionType.DUTCH_ACCEPTED;
    if (type.includes('Failed'))
        return AuctionType.FAILED;
    return AuctionType.NONE;
}
// Parse intent type from contract variant
function parseIntentType(variant) {
    const type = variant.type;
    if (type.includes('Swap'))
        return IntentType.SWAP;
    if (type.includes('LimitOrder'))
        return IntentType.LIMIT_ORDER;
    if (type.includes('TWAP'))
        return IntentType.TWAP;
    if (type.includes('DCA'))
        return IntentType.DCA;
    return IntentType.SWAP;
}
//# sourceMappingURL=intent.js.map