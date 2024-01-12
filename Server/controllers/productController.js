const Product = require('../models/product')
const AsyncHandler = require('express-async-handler')

/**
 * API for creating new product
 * 
 * @Access Admin
 */

const createProduct = AsyncHandler(async (req, res) => {
    try {
        const product = new Product(req.body)
        await product.save()

        res.status(201).json({
            status: 'success',
            data: product
        })
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message
        })
    }
})

const fetchProducts = AsyncHandler(async (req, res) => {
    try {
        const products = await Product.find()
        res.status(200).json({
            status: 'success',
            data: products})
    } catch (error) {
        res.status(500).json({
            status: 'fail',
            message: error.message })
    }
})

const fetchProductById = AsyncHandler(async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
        if (!product) {
            return res.status(404).json({
                status: 'fail',
                message: 'Product not found'
            })
        }
        res.status(200).json({
            status: 'success',
            data: product
        })
    } catch (error) {
        res.status(500).json({
            status: 'fail',
            message: error.message })
    }
})

const updateProduct = AsyncHandler(async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        if (!product) {
            return res.status(404).json({
                status: 'fail',
                message: 'Product not found'
            })
        }
        res.status(200).json({
            status: 'success',
            data: product
        })
    } catch (error) {
        res.status(400).json({ 
            status: 'fail',
            message: error.message
        })
    }
})

const deleteProduct = AsyncHandler(async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id)
        if (!product) {
            return res.status(404).json({
                status: 'fail',
                message: 'Product not found'
            })
        }
        res.status(204).send()
    } catch (error) {
        res.status(500).json({
            status: 'success',
            message: error.message
        })
    }
})

module.exports = {createProduct, fetchProducts, fetchProductById, updateProduct, deleteProduct}
