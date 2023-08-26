const router = require('express').Router();



const { Buyer } = require('../../../models/Buyer');

// Create Buyer
router.post('/create', async (req, res) => {
  try {
      const buyer = await Buyer.create(req.body);
      res.status(201).json(buyer);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Fetch all sellers
router.get('/', async (req, res) => {
  try {
      const buyer = await Buyer.findAll();
      res.json(buyer);
  } catch (err) {
      res.status(500).json(err);
  }
});

// ... other CRUD operations ...

module.exports = router;