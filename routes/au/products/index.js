const express = require('express');
const router = express.Router();
// multer is a node.js middleware for handling multipart/form-data
const multer = require('multer');
// import cloudinary moduel from util directory
const cloudinary = require('../../../utils/cloudinary');

const Product = require('../../../models/Product');
const ProductImage = require('../../../models/ProductImage');
const auth = require('../../../utils/auth');
const withAuth = require('../../../utils/auth2');

// use multer to store the images in Destination 'uploads' folder before uploading the the cloud.
const upload = multer({ dest: 'uploads/'})

// Endpoint to show upload form
router.get('/listing', withAuth, (req, res) => {
    
    res.render('sellers/create-listing');
})



// list products
router.post('/listing', upload.array('productImages', 5), async (req, res) => {
    console.log("POST request to /listing received");
    try {
        const product = await Product.create(req.body);

        const imageUrls = [];

        // check if there uploaded files.
        if (req.files) {
         
        
            // loop through each upload file.
            for (let file of req.files) {
                //upload the file to Cloudinary and get the result
                const result = await cloudinary.uploader.upload(file.path);
                imageUrls.push(result.url) // store the Cloudinary URL in the imageUrls
        
                // delete files from 'upload' directory after uploading to Cloudinary
                const fs = require('fs');
                fs.unlinkSync(file.path);
            }
        
            // Map image URLs to objects
            const productImages = imageUrls.map(url => ({
                image_url: url,
                product_id: product.id
            }));
        
            await ProductImage.bulkCreate(productImages);
        }
        res.status(201).json({ message: "Product successfully created!", product, imageUrls });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to create product.", error: err.message });
    }
});

// Fetch all products details
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

// Fetch images associated with a specific product
router.get('/:productId/images', async (req, res) => {
    try {
        const productId = req.params.productId;

        const images = await ProductImage.findAll({
            where: { product_id: productId },
            attributes: ['image_url']
        });

        if (!images.length) {
            res.status(404).json({ message: "No images found for this product." });
            return;
        }

        res.json(images); // Send the images associated with the specific product as a response

    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Failed to fetch product images. Please try again later.",
            error: err.message
        });
    }
});

// Fetch images associated with a specific product
router.get('/:productId/images', async (req, res) => {
    try {
        const productId = req.params.productId;

        const images = await ProductImage.findAll({
            where: { product_id: productId },
            attributes: ['image_url']
        });

        if (!images.length) {
            res.status(404).json({ message: "No images found for this product." });
            return;
        }

        res.json(images); // Send the images associated with the specific product as a response

    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Failed to fetch product images. Please try again later.",
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
