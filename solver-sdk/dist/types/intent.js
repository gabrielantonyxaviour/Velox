"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IntentStatus = exports.IntentType = exports.AuctionType = void 0;
// Auction type for intent processing
var AuctionType;
(function (AuctionType) {
    AuctionType[AuctionType["SEALED_BID"] = 0] = "SEALED_BID";
    AuctionType[AuctionType["DUTCH"] = 1] = "DUTCH";
})(AuctionType || (exports.AuctionType = AuctionType = {}));
var IntentType;
(function (IntentType) {
    IntentType["SWAP"] = "SWAP";
    IntentType["LIMIT_ORDER"] = "LIMIT_ORDER";
    IntentType["TWAP"] = "TWAP";
    IntentType["DCA"] = "DCA";
})(IntentType || (exports.IntentType = IntentType = {}));
var IntentStatus;
(function (IntentStatus) {
    IntentStatus["PENDING"] = "PENDING";
    IntentStatus["PARTIALLY_FILLED"] = "PARTIALLY_FILLED";
    IntentStatus["FILLED"] = "FILLED";
    IntentStatus["CANCELLED"] = "CANCELLED";
    IntentStatus["EXPIRED"] = "EXPIRED";
})(IntentStatus || (exports.IntentStatus = IntentStatus = {}));
//# sourceMappingURL=intent.js.map