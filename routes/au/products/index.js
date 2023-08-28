const express = require('express');
const router = express.Router();
// multer is a node.js middleware for handling multipart/form-data
const multer = require('multer');
// import cloudinary moduel from util directory
const cloudinary = require('../../../utils/cloudinary');

const Product = require('../../../models/Product');
const ProductImage = require('../../../models/ProductImage');

// use multer to store the images in Destination 'uploads' folder before uploading the the cloud.
const upload = multer({ dest: 'uploads/'})



// Create product
router.post('/create', upload.array('productImages', 5), async (req, res) => {
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
        const products = await Product.findAll({
            // include: [{
            //     model: ProductImage,
       
            //     attributes: ['image_url']
            // }]

         });
         
        
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

// ... other CRUD operations ...

module.exports = router;
