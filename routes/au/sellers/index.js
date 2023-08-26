const router = require('express').Router();



const Seller = require('../../../models/Seller');

// Create seller
router.post('/create', async (req, res) => {
  try {
      const seller = await Seller.create(req.body);
      res.status(201).json({ message: "Sellers successfully created!", seller });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error", error: err.message });
  }
});

// Fetch all sellers
router.get('/', async (req, res) => {
  try {
      const sellers = await Seller.findAll();
      if (!sellers.length) {
        res.status(404).json({ message: "No sellers found." });
        return;
    }
    res.json(sellers);
  } catch (err) {
      res.status(500).json({ 
        message: "Failed to fetch sellers. Please try again later.",
        error: err.message 
  });
      
  }
});

// ... add other CRUD operations as needed ...

module.exports = router;