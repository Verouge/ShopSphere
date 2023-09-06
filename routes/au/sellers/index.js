// ./routes/au/sellers/index.js
const router = require("express").Router();
const { Seller, Product, ProductImage} = require("../../../models/");

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

router.get('/:id', async (req, res) => {
  try {
    const seller = await Seller.findOne({ where: { id: req.params.id} });
    if (!seller) {
      res.status(404).json({ message: 'Seller not found.'});
      return;
    }
    res.status(seller);
   } catch (err) { 
    res.status(500).json( {
      message: 'Failed to fetch seller. Please try again later',
      error: err.message,
    });
   }
});

// Get products based on a specific seller ID
router.get('/store/:sellerId', async (req, res) => {
  try {
      const sellerId = req.params.sellerId;
      
      const products = await Product.findAll({ 
          where: { 
              seller_id: sellerId  // Assuming your Product model has a seller_id field
          } 
      });

      if (!products.length) {
          res.status(404).json({ message: `No products found for seller ID: ${sellerId}.` });
          return;
      }

      // Map through each product and get its associated images
      const productsWithImages = await Promise.all(products.map(async product => {
          const images = await ProductImage.findAll({
              where: { product_id: product.id },
              attributes: ['image_url']
          });

          // Convert image objects to URLs
          const imageUrls = images.map(image => image.image_url);

          // Return a new product object with image URLs
          return { ...product.get(), imageUrls };
      }));

      const seller = await Seller.findOne({ where: { id: sellerId } });

      res.render('store', { products: productsWithImages, seller: seller.get() });  // Render the data in sellStore.handlebars view

  } catch (err) {
      console.error(err);
      res.status(500).json({
          message: "Failed to fetch products for the seller. Please try again later.",
          error: err.message
      });
  }
});

// Get products based on a specific seller ID
router.get('/dashboard/:sellerId', async (req, res) => {
  try {
      const sellerId = req.params.sellerId;
      
      const products = await Product.findAll({ 
          where: { 
              seller_id: sellerId  // Assuming your Product model has a seller_id field
          } 
      });

      if (!products.length) {
          res.status(404).json({ message: `No products found for seller ID: ${sellerId}.` });
          return;
      }

      // Map through each product and get its associated images
      const productsWithImages = await Promise.all(products.map(async product => {
          const images = await ProductImage.findAll({
              where: { product_id: product.id },
              attributes: ['image_url']
          });

          // Convert image objects to URLs
          const imageUrls = images.map(image => image.image_url);

          // Return a new product object with image URLs
          return { ...product.get(), imageUrls };
      }));

      const seller = await Seller.findOne({ where: { id: sellerId } });

      res.render('sellers/dashboard', { products: productsWithImages, seller: seller.get() });  // Render the data in sellStore.handlebars view

  } catch (err) {
      console.error(err);
      res.status(500).json({
          message: "Failed to fetch products for the seller. Please try again later.",
          error: err.message
      });
  }
});

// Handle product updates
router.put('/products/:id', async (req, res) => {
  const { name, price, quantity } = req.body;
  try {
      const product = await Product.findByPk(req.params.id);
      product.name = name;
      product.price = price;
      product.quantity = quantity;
      await product.save();
      res.status(200).send({ message: 'Product updated successfully' });
  } catch (error) {
      res.status(500).send({ error: 'Error updating product' });
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