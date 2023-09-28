// routes/orderRoutes.js
const express = require('express');
const router = express.Router();
const Order = require('../../model/order');

// Create a new order
router.post('/', async (req, res) => {
  try {
    const orderItems = req.body.orderItems;
    const customerUsername = req.user.username; // Assuming you have the user's username available in req.user

    // Calculate the totalItems and totalAmount
    const totalItems = orderItems.reduce((total, item) => total + item.quantity, 0);
    const totalAmount = orderItems.reduce((total, item) => total + item.totalPrice, 0);

    // Create the order with calculated values
    const newOrder = await Order.create({
      customerUsername: customerUsername,
      orderItems: orderItems,
      totalItems: totalItems,
      totalAmount: totalAmount,
      status: req.body.status, // Set the order status based on the request
      // ... other order properties ...
    });

    res.status(201).json(newOrder);
  } catch (error) {
    res.status(500).json({ message: 'Error creating order', error: error.message });
  }
});

// Get all orders
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find({}).populate('orderItems');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching orders', error: error.message });
  }
});

// Get order by ID
router.get('/:orderId', async (req, res) => {
  const orderId = req.params.orderId;
  try {
    const order = await Order.findById(orderId).populate('orderItems');
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching order', error: error.message });
  }
});
router.patch('/:orderId',  async (req, res) => {
  const orderId = req.params.orderId;
  const newStatus = req.body.status;

  try {
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    order.status = newStatus;
    await order.save();

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Error updating order status', error: error.message });
  }
});

router.post('/:orderId/cancel',  async (req, res) => {
  const orderId = req.params.orderId;

  try {
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    order.status = 'canceled';
    await order.save();

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Error canceling order', error: error.message });
  }
});

// Mark an order as completed (admin only)
router.post('/:orderId/complete',  async (req, res) => {
  const orderId = req.params.orderId;

  try {
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    order.status = 'completed';
    await order.save();

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Error completing order', error: error.message });
  }
});

module.exports = router;
