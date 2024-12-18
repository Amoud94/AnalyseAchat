import { Schema, model } from 'mongoose';

const productSchema = new Schema({
  ProductID: { type: Number, required: true },
  ProductName: { type: String, required: true },
  Category: { type: String, required: true },
  Price: { type: Number, required: true },
});

export default model('Product', productSchema);