// backend/routes/analytics.js
const express = require('express');
const router = express.Router();
const Billing = require('../models/Billing');

router.get('/', async (req, res) => {
    const start = new Date();
    start.setHours(0, 0, 0, 0);
    const end = new Date();

    const bills = await Billing.find({ createdAt: { $gte: start, $lte: end } });

    let totalProfit = 0, totalEarned = 0, totalSold = 0;

    bills.forEach(bill => {
        totalEarned += bill.totalAmount;
        bill.items.forEach(item => {
            totalSold += item.quantity;
            // You can define a better profit calc
            totalProfit += (item.total * 0.2);
        });
    });

    res.json({ totalProfit, totalEarned, totalSold });
});

module.exports = router;
