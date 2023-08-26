const router = require('express').Router();

const  Order = require('../../../models/Order');

// Create Order
router.post('/create', async (req, res) => {
  try {
      const order = await Order.create(req.body);
      res.status(201).json({message: "order successfully created!", order});
  } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error", error: err.message });
    }
});

// Fetch all Orders
router.get('/', async (req, res) => {
  try {
      const orders = await Order.findAll();
      if (!orders.length) {
          res.status(404).json({ message: "No orders found." });
          return;
      }
      res.json(orders);
  } catch (err) {
      res.status(500).json({ 
          message: "Failed to fetch order. Please try again later.",
          error: err.message 
      });
  }
});

// ... other CRUD operations ...

module.exports = router;