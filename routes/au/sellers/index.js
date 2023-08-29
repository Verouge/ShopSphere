const router = require('express').Router();
const Seller = require('../../../models/Seller');
const auth = require('../../../utils/auth');


// Create seller
router.post('/create', async (req, res) => {
  try {
    const seller = await Seller.create(req.body);
    res.status(201).json({ message: "Seller successfully created!", seller });
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

// Seller dashboard
router.get('/dashboard', auth, async (req, res) => {  // add auth middleware
    try {
        const sellerData = await Seller.findOne({ where: { id: req.session.sellerId } });
        const seller = sellerData.get({ plain: true });
        
        const recentOrdersCount = 5;  // Placeholder
        const totalEarnings = 1000;   // Placeholder
        
        res.render('sellers/dashboard', { seller, recentOrdersCount, totalEarnings });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error", error: err.message });
    }
});

// ... additional CRUD operations for sellers as needed ...

module.exports = router;
