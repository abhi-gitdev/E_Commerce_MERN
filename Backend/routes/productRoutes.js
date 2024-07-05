const express = require('express')
const router = express.Router()
const {
  getAllProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  reviewProduct,
  getProductReviews,
  deleteReview,
} = require('../controller/productController')
const {
  isUserAuthenticated,
  isUserAuthorized,
} = require('../utils/isUserAuthenticated')

router
  .route('/products')
  .get(getAllProducts)
  .post(isUserAuthenticated, isUserAuthorized('admin'), createProduct)

router.route('/review').put(isUserAuthenticated, reviewProduct)

router
  .route('/reviews')
  .get(getProductReviews)
  .delete(isUserAuthenticated, deleteReview)

router
  .route('/product/:id')
  .get(getProduct)
  .put(isUserAuthenticated, isUserAuthorized('admin'), updateProduct)
  .delete(isUserAuthenticated, isUserAuthorized('admin'), deleteProduct)

module.exports = router
