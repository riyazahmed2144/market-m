// backend/models/Billing.js
const mongoose = require('mongoose');

const billingSchema = new mongoose.Schema({
    billNumber: String,
    items: [
        {
            productName: String,
            quantity: Number,
            total: Number
        }
    ],
    totalAmount: Number,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Billing', billingSchema);
