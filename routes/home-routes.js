const express = require("express");
const router = express.Router();
const { Product, ProductImage } = require("../models");

// Import the latestProduct function
const { latestProduct } = require('./au/products/index');

// Use the latestProduct as the route handler for the root route
router.get('/', latestProduct);

module.exports = router;
