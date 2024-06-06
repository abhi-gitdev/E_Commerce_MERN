const express = require('express')
const router = express.Router()
const {
  getAllProducts,
  getProduct,
  createProduct,
  updateProduct,
} = require('../controller/productController')

router.route('/').get(getAllProducts).post(createProduct)
router.route('/:id').get(getProduct).put(updateProduct)

module.exports = router
