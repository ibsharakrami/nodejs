// models/product.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  amount: { type: Number, required: true },
  quantity: { type: Number, required: true },
  discount: Number,
  rating: Number,
  image: String,
});

module.exports = mongoose.model('Product', productSchema);
