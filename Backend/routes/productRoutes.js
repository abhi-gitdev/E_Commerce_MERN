const express = require('express')
const router = express.Router()
const {
  getAllProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} = require('../controller/productController')
const {
  isUserAuthenticated,
  isUserAuthorized,
} = require('../utils/isUserAuthenticated')

router
  .route('/')
  .get(getAllProducts)
  .post(isUserAuthenticated, isUserAuthorized('admin'), createProduct)

router
  .route('/:id')
  .get(getProduct)
  .put(isUserAuthenticated, isUserAuthorized('admin'), updateProduct)
  .delete(isUserAuthenticated, isUserAuthorized('admin'), deleteProduct)

module.exports = router
