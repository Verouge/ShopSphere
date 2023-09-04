// ./routes/au/sellers/index.js
const router = require("express").Router();
const Seller = require("../../../models/Seller");
const auth = require("../../../utils/auth");
const bcrypt = require('bcrypt');

router.get("/login", (req, res) => {
  res.render("sellers/login");
});
// Create seller
router.post("/create", async (req, res) => {
  try {
    const seller = await Seller.create(req.body);

    // Set session variable to indicate user is logged in
    req.session.loggedIn = true;
    req.session.sellerId = seller.id; 

    // Save the session
    req.session.save(() => {
      // Render the create-listing page and pass the seller's data
      res.render("sellers/create-listing", { 
        message: "Thank you for signing up!",
        seller: seller.get({ plain: true })
      });
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error", error: err.message });
  }
});

router.post('/login', async (req, res) => {
  try {
      const sellerData = await Seller.findOne({
          where: {
              email: req.body.email,
          },
      });

      if (!sellerData) {
          res.status(400).json({ message: 'Incorrect email or password. Please try again!' });
          return;
      }

      const validPassword = await sellerData.checkPassword(req.body.password);

      if (!validPassword) {
          res.status(400).json({ message: 'Incorrect email or password. Please try again!' });
          return;
      }

      req.session.save(() => {
          req.session.loggedIn = true;
          req.session.seller_id = sellerData.id; // Set seller's ID in the session

          res.render("sellers/create-listing", {
              message: "You are logged in!",
              seller: sellerData.get({ plain: true })
          });
      });
  } catch (err) {
      console.log(err);
      res.status(500).json(err);
  }
});


router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

// Protect the create-listing route with the auth middleware
router.get("/create-listing", (req, res) => {
  if(req.seller) {
    res.render("sellers/create-listing", { 
      title: "Create Product Listing",
      seller: req.seller
    });
  } else {
    res.redirect("/login");
  }
});


// Fetch all sellers
router.get("/", async (req, res) => {
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
      error: err.message,
    });
  }
});

// Seller dashboard
router.get("/dashboard", auth, async (req, res) => {
  // add auth middleware
  try {
    const sellerData = await Seller.findOne({
      where: { id: req.session.sellerId },
    });
    const seller = sellerData.get({ plain: true });

    const recentOrdersCount = 5; // Placeholder
    const totalEarnings = 1000; // Placeholder

    res.render("sellers/dashboard", {
      seller,
      recentOrdersCount,
      totalEarnings,
    });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
});

router.get("/create-listing", (req, res) => {
  res.render("sellers/create-listing", { title: "Create Product Listing" });
});
// ... additional CRUD operations for sellers as needed ...

module.exports = router;
