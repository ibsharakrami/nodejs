// models/order.js
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  customerUsername: { type: String, required: true }, // Username of the customer
  orderDate: { type: Date, default: Date.now },
  status: { type: String, enum: ['pending', 'canceled', 'completed'], default: 'pending' }, // Order status
  totalItems: { type: Number, default: 0 },
  totalAmount: { type: Number, default: 0 },
  orderItems: [{ type: mongoose.Schema.Types.ObjectId, ref: 'OrderItem' }],
});

module.exports = mongoose.model('Order', orderSchema);


