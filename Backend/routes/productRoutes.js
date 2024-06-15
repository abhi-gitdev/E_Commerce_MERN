const express = require('express')
const router = express.Router()
const {
  getAllProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  reviewProduct,
} = require('../controller/productController')
const {
  isUserAuthenticated,
  isUserAuthorized,
} = require('../utils/isUserAuthenticated')

router.route('/review').put(isUserAuthenticated, reviewProduct)

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
