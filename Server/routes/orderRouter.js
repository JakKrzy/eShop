const express = require('express');
const router = express.Router();

const {createOrder, allOrders, oneOrder, deleteOrder} = require('../controllers/orderController');
const {loginChecker} = require('../middlewares/loginChecker');
const {roleChecker} = require('../middlewares/roleChecker');

// @Access LoggedIn
router.post('/', loginChecker, createOrder);

// @Access Admin
router.get('/', loginChecker, roleChecker(true), allOrders);
router.get('/:id', loginChecker, roleChecker(true), oneOrder);
router.delete('/:id', loginChecker, roleChecker(true), deleteOrder);

module.exports = router;
