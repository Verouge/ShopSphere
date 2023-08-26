const router = require('express').Router();



const { prouduct } = require('../../../models/Product');

// Create Order
router.post('/create', async (req, res) => {
  try {
      const prouduct = await Product.create(req.body);
      res.status(201).json(prouduct);
  } catch (err) {
      res.status(500).json(err);
  }
});

// Fetch all sellers
router.get('/', async (req, res) => {
  try {
      const prouduct = await Product.findAll();
      res.json(buyer);
  } catch (err) {
      res.status(500).json(err);
  }
});

// ... other CRUD operations ...

module.exports = router;