// routes/product.js
const express = require('express');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const router = express.Router();
const Product = require('../../model/product');

const verifyRoles = require('../../middleware/verifyRoles');
router.post('/', upload.single('image'), async (req, res) => {
  // Check if the user is an admin
  if (!req.user || !req.user.roles[2]) {
    return res.status(403).json({ message: 'Permission denied' });
  }

  try {
    let imagePath;

  // Check if a file was uploaded
  if (req.file) {
    imagePath = req.file.path; // Use the uploaded file's path
  } else if (req.body.image) {
    imagePath = req.body.image; // Use the provided image URL
  } else {
    return res.status(400).json({ message: 'No file uploaded or image URL provided' });
  }// Assuming 'image' is the field name in the form
    const { name, description, amount, quantity, discount, rating } = req.body;

    // Create the new product with all fields, including the image path
    const newProduct = await Product.create({
      name,
      description,
      amount,
      quantity,
      discount,
      rating,
      image: imagePath, // Include the image path
    });

    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: 'Error adding product', error: error.message });
  }
});
// Add a new product (admin only)
// router.post('/', async (req, res) => {
//   // Check if the user is an admin (you can implement this authentication logic)
//   // For simplicity, let's assume an isAdmin property in the request's user object

//   if (!req.user || !req.user.roles[2]) {
//     return res.status(403).json({ message: 'Permission denied' });
//   }

//   try {
//     const newProduct = await Product.create(req.body);
//     res.status(201).json(newProduct);
//   } catch (error) {
//     res.status(500).json({ message: 'Error adding product', error: error.message });
//   }
// });

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
