const express = require('express');
const router = express.Router();
const userRoutes = require('./userRouter');
const productRoutes = require('./productRouter');


router.use('/users', userRoutes);
router.use('/products', productRoutes);

module.exports = router;
