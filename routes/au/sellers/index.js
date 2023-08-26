const router = require('express').Router();



const { Seller } = require('../../../models/Seller');

// Create seller
router.post('/create', async (req, res) => {
  try {
      const seller = await Seller.create(req.body);
      res.status(201).json(seller);
  } catch (err) {
      res.status(500).json(err);
  }
});

// Fetch all sellers
router.get('/', async (req, res) => {
  try {
      const sellers = await Seller.findAll();
      res.json(sellers);
  } catch (err) {
      res.status(500).json(err);
  }
});

// ... add other CRUD operations as needed ...

module.exports = router;