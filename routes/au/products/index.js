const router = require('express').Router();
const Product = require('../../../models/Product');
const auth = require('../../utils/auth');  // Make sure to import your auth middleware

// Create product
router.post('/create', auth, async (req, res) => {
    try {
        const product = await Product.create({
            ...req.body,
            sellerId: req.session.sellerId  // Set the seller ID from the session
        });
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

// Get products based on the current logged-in seller
router.get('/myproducts', auth, async (req, res) => {
    try {
        const products = await Product.findAll({ where: { sellerId: req.session.sellerId } });
        
        if (!products.length) {
            res.status(404).json({ message: "No products found." });
            return;
        }

        res.json(products);

    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Failed to fetch products. Please try again later.",
            error: err.message
        });
    }
});

// Update product
router.post('/update/:id', auth, async (req, res) => {
    try {
        const updatedProduct = await Product.update(
            {
                name: req.body.name,
                price: req.body.price
            },
            {
                where: {
                    id: req.params.id,
                    sellerId: req.session.sellerId  // ensure the product belongs to the seller
                }
            }
        );

        if (updatedProduct[0] === 0) {
            return res.status(404).json({ message: "Product not found or not updated." });
        }

        res.json({ message: "Product updated successfully!" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to update product.", error: err.message });
    }
});

// Delete product
router.post('/delete/:id', auth, async (req, res) => {
    try {
        const result = await Product.destroy({
            where: {
                id: req.params.id,
                sellerId: req.session.sellerId  // ensure the product belongs to the seller
            }
        });

        if (result === 0) {
            return res.status(404).json({ message: "Product not found." });
        }

        res.json({ message: "Product deleted successfully!" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to delete product.", error: err.message });
    }
});

module.exports = router;
