const express = require('express');
const router = express.Router();
const userRoutes = require('./userRouter');
const orderRoutes = require('./orderRouter');


router.use('/users', userRoutes);
router.use('/orders', orderRoutes);

module.exports = router;
