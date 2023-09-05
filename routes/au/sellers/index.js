const router = require("express").Router();
const { Seller, Product, ProductImage } = require("../../../models/");

const auth = require("../../../utils/auth");
const bcrypt = require('bcrypt');

router.get("/login", (req, res) => {
  res.render("sellers/login");
});

router.post("/create", async (req, res) => {
  try {
    const seller = await Seller.create(req.body);

    req.session.loggedIn = true;
    req.session.sellerId = seller.id;

    req.session.save(() => {
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
      req.session.seller_id = sellerData.id;

      res.redirect("/dashboard");
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

router.get("/create-listing", (req, res) => {
  if (req.seller) {
    res.render("sellers/create-listing", {
      title: "Create Product Listing",
      seller: req.seller
    });
  } else {
    res.redirect("/login");
  }
});

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
    const seller = await Seller.findOne({ where: { id: req.params.id } });
    if (!seller) {
      res.status(404).json({ message: 'Seller not found.' });
      return;
    }
    res.json(seller); // Updated from res.status(seller) to res.json(seller)
  } catch (err) {
    res.status(500).json({
      message: 'Failed to fetch seller. Please try again later',
      error: err.message,
    });
  }
});

router.get('/store/:sellerId', async (req, res) => {
  try {
    const sellerId = req.params.sellerId;
    const products = await Product.findAll({
      where: {
        seller_id: sellerId
      }
    });

    if (!products.length) {
      res.status(404).json({ message: `No products found for seller ID: ${sellerId}.` });
      return;
    }

    const productsWithImages = await Promise.all(products.map(async product => {
      const images = await ProductImage.findAll({
        where: { product_id: product.id },
        attributes: ['image_url']
      });

      const imageUrls = images.map(image => image.image_url);
      return { ...product.get(), imageUrls };
    }));

    const seller = await Seller.findOne({ where: { id: sellerId } });

    res.render('store', { products: productsWithImages, seller: seller.get() });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Failed to fetch products for the seller. Please try again later.",
      error: err.message
    });
  }
});

router.get("/dashboard", auth, async (req, res) => {
  try {
    const sellerData = await Seller.findOne({
      where: { id: req.session.sellerId },
    });
    const seller = sellerData.get({ plain: true });

    const recentOrdersCount = 5;
    const totalEarnings = 1000;

    res.render("sellers/dashboard", {
      seller,
      recentOrdersCount,
      totalEarnings,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error", error: err.message });
  }
});

module.exports = router;
