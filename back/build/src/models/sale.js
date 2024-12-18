"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const saleSchema = new mongoose_1.Schema({
    ProductID: { type: Number, ref: 'Product', required: true },
    SaleID: { type: Number, required: true },
    Quantity: { type: Number, required: true },
    TotalAmount: { type: Number, required: true },
    Date: { type: Date, default: Date.now },
});
exports.default = (0, mongoose_1.model)('Sale', saleSchema);
