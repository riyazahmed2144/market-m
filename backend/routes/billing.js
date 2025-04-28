// backend/routes/billing.js
const express = require("express");
const router = express.Router();
const Billing = require("../models/Billing");
const Product = require("../models/Product");

// Create new billing
router.post("/", async (req, res) => {
  const { items } = req.body;

  let totalAmount = 0;
  const updatedItems = await Promise.all(
    items.map(async (item) => {
      const product = await Product.findOne({ name: item.productName });

      if (!product || product.quantity < item.quantity) {
        throw new Error(`Insufficient stock for ${item.productName}`);
      }

      product.quantity -= item.quantity;
      await product.save();

      const total = item.quantity * product.sellingPrice;
      totalAmount += total;

      return {
        productName: item.productName,
        quantity: item.quantity,
        total,
      };
    })
  );

  const bill = new Billing({
    billNumber: `BILL-${Date.now()}`,
    items: updatedItems,
    totalAmount,
  });

  await bill.save();
  res.json(bill);
});
router.get("/", async (req, res) => {
  try {
    const bills = await Billing.find({}, "billNumber totalAmount createdAt");
    res.json(bills);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
