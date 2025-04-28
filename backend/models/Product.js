// backend/models/Product.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: String,
    quantity: Number,
    sellingPrice: Number,
    retailPrice: Number
});

module.exports = mongoose.model('Product', productSchema);
