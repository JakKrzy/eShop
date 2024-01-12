const express = require('express')
const router = express.Router()

const {
    createProduct,
    fetchProducts,
    fetchProductById,
    updateProduct,
    deleteProduct} = require('../controllers/productController')

router.post('/', createProduct)
router.get('/', fetchProducts)
router.get('/:id', fetchProductById)
router.patch('/:id', updateProduct)
router.delete('/:id', deleteProduct)

module.exports = router