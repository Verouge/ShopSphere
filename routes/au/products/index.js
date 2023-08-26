const router = require('express').Router();
const Product = require('../../../models/Product');

// Create product
router.post('/create', async (req, res) => {
    try {
        const product = await Product.create(req.body);
        res.status(201).json({ message: "Product successfully created!", product });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to create product.", error: err.message });
    }
});

// Fetch all products
router.get('/', async (req, res) => {
    try {
        const products = await Product.findAll();
        
        if (!products.length) {
            res.status(404).json({ message: "No products found." });
            return;
        }

        res.json(products); // Send the products as a response

    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Failed to fetch products. Please try again later.",
            error: err.message
        });
    }
});

// ... other CRUD operations ...

module.exports = router;
