//seccond entry point for Routes
const router = require('express').Router();

const sellersRoutes = require('./sellers');
const buyersRoutes = require('./buyers');
const productsRoutes = require('./products');
const ordersRoutes = require('./orders');
const categoriesRoutes = require('./categories')

router.use('/sellers', sellersRoutes);
router.use('/buyers', buyersRoutes);
router.use('/products', productsRoutes);
router.use('/orders', ordersRoutes);
router.use('categories', categoriesRoutes)


module.exports = router;
