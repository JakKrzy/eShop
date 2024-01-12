const express = require('express');
const router = express.Router();
const userRoutes = require('./userRouter');
const productRoutes = require('./productRouter');
const orderRoutes = require('./orderRouter');


router.use('/users', userRoutes);
router.use('/products', productRoutes);
router.use('/orders', orderRoutes);

module.exports = router;
