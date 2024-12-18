"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const productSchema = new mongoose_1.Schema({
    ProductID: { type: Number, required: true },
    ProductName: { type: String, required: true },
    Category: { type: String, required: true },
    Price: { type: Number, required: true },
});
exports.default = (0, mongoose_1.model)('Product', productSchema);
