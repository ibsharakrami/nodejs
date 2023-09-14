// routes/product.js
const express = require('express');
const router = express.Router();
const Product = require('../../model/product');

const verifyRoles = require('../../middleware/verifyRoles');
// Add a new product (admin only)
router.post('/', async (req, res) => {
  // Check if the user is an admin (you can implement this authentication logic)
  // For simplicity, let's assume an isAdmin property in the request's user object

  if (!req.user || !req.user.roles[2]) {
    return res.status(403).json({ message: 'Permission denied' });
  }

  try {
    const newProduct = await Product.create(req.body);
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: 'Error adding product', error: error.message });
  }
});

// Delete a product by ID (admin only)
router.delete('/:productId', async (req, res) => {
  // Check if the user is an admin (you can implement this authentication logic)
  console.log(req.user.roles,"reqqqqq")
  if (!req.user || !req.user.roles[2]) {
    return res.status(403).json({ message: 'Permission denied' });
  }

  const productId = req.params.productId;

  try {
    const deletedProduct = await Product.findByIdAndRemove(productId);

    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json({ message: 'Product deleted', deletedProduct });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting product', error: error.message });
  }
});

// Get all products (for everyone)
router.get('/', async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products', error: error.message });
  }
});

// Get product details by ID (for everyone)
router.get('/:productId', async (req, res) => {
  const productId = req.params.productId;

  try {
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching product details', error: error.message });
  }
});

module.exports = router;
