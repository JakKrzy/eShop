const Order = require('../models/order');
const AsyncHandler = require("express-async-handler");

/**
 * API to create new order
 * 
 * This API is used to create new order, 
 * Returns success or failure responses accordingly. 
 * @Access LoggedIn
 */

const createOrder = AsyncHandler(async (req, res) => {
        let orderObj = req.body;
        let newOrder = new Order(orderObj);
        let createdOrder = await newOrder.save();
        
        res.status(200).json({
            status: 'success',
            data: createdOrder
        });
});

/**
 * API for fetching all orders.
 * 
 * This API retrieves all orders from the database
 * and returns a success response with the order data or a failure response if fetching fails.
 * @Access Admin
 */

const allOrders = AsyncHandler(async (req, res) => {
    const { page, pageSize } = req.query;

    const pageNumber = parseInt(page) || 1;
    const maxItemsPerPage = parseInt(pageSize) || 7;
    const skip = (pageNumber - 1) * maxItemsPerPage;

    const orders = await Order.find({})
        .skip(skip)
        .limit(maxItemsPerPage);

    const count = await Order.countDocuments({});
    
    res.status(200).json({ status: 'success', data: {
        orders: orders,
        count: count
    }});
 });

/**
 * API for fetching one order.
 * 
 * This API retrieves orders with given id from the database
 * and returns a success response with the order data or a failure response if fetching fails.
 * @Access Admin
 */

const oneOrder = AsyncHandler(async (req, res) => {
    const order = await Order.find({ _id: req.params.id });
    res.status(200).json({ status: 'success', data: order });
 });


/**
 * API for deleting order.
 * 
 * This API deletes order with given id from the database
 * and returns a success response or failure response if deleting fails.
 * @Access Admin
 */

const deleteOrder = AsyncHandler(async (req, res) => {
    const order = await Order.deleteOne({ _id: req.params.id });
    res.status(200).json({ status: 'success', message: "Deleted successfully" });
 });

module.exports = {createOrder, allOrders, oneOrder, deleteOrder};




