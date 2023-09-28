// routes/orderItemRoutes.js
const express = require('express');
const router = express.Router();
const OrderItem = require('../../model/orderitems');

// Create a new order item
router.post('/', async (req, res) => {
  try {
    const { product, quantity, unitPrice } = req.body;

    // Calculate the total price for this item
    const totalPrice = quantity * unitPrice;

    const newOrderItem = await OrderItem.create({
      product: product,
      quantity: quantity,
      unitPrice: unitPrice,
      totalPrice: totalPrice,
    });

    res.status(201).json(newOrderItem);
  } catch (error) {
    res.status(500).json({ message: 'Error creating order item', error: error.message });
  }
});

module.exports = router;
