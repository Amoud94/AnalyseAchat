
import { Schema, model } from 'mongoose';

const saleSchema = new Schema({
  ProductID: { type: Number, ref: 'Product', required: true },
  SaleID: { type: Number, required: true },
  Quantity: { type: Number, required: true },
  TotalAmount: { type: Number, required: true },
  Date: { type: Date, default: Date.now },
});

export default model('Sale', saleSchema);