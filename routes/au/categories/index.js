const express = require('express');
const router = express.Router();
const { Category } = require('../../../models/Category');

router.get('/categories', async (req, res) => {
    try {
        const categories = await Category.findAll();
        res.json(categories);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/category', async (req, res) => {
    try {
        const newCategory = await Category.create(req.body);
        res.json(newCategory);
    } catch (err) {
        res.status(500).json(err);
    }
});

//... Add other CRUD routes as needed

module.exports = router;
