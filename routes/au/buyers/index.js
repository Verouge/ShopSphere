const router = require('express').Router();



const Buyer = require('../../../models/Buyer');


// Create Buyer
router.post('/create', async (req, res) => {
  try {
      
      const buyer = await Buyer.create(req.body);
      res.status(201).json({ message: "Buyer successfully created!", buyer });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error", error: err.message });

  }
});

// Fetch all buyers
router.get('/', async (req, res) => {
  try {
      const buyers = await Buyer.findAll();
      if (!buyers.length) {
          res.status(404).json({ message: "No buyers found." });
          return;
      }
      res.json(buyers);
  } catch (err) {
      res.status(500).json({ 
          message: "Failed to fetch buyers. Please try again later.",
          error: err.message 
      });
  }
});

// ... other CRUD operations ...

module.exports = router;