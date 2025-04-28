// backend/routes/products.js
const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// Get all products
router.get('/', async (req, res) => {
    const products = await Product.find();
    res.json(products);
});

// Add a product
router.post('/', async (req, res) => {
    const { name, quantity, sellingPrice, retailPrice } = req.body;
    const newProduct = new Product({ name, quantity, sellingPrice, retailPrice });
    await newProduct.save();
    res.json(newProduct);
});

module.exports = router;
