const router = require('express').Router();




const { Order } = require('../../../models/Order');

// Create Order
router.post('/create', async (req, res) => {
  try {
      const order = await Order.create(req.body);
      res.status(201).json(order);
  } catch (err) {
      res.status(500).json(err);
  }
});

// Fetch all sellers
router.get('/', async (req, res) => {
  try {
      const order = await Order.findAll();
      res.json(buyer);
  } catch (err) {
      res.status(500).json(err);
  }
});

// ... other CRUD operations ...

module.exports = router;