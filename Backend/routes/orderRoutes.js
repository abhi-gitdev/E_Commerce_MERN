const {
  newOrder,
  singleOrder,
  myOrders,
  deleteOrder,
  getAllOrders,
  updateOrder,
} = require('../controller/orderController')
const {
  isUserAuthenticated,
  isUserAuthorized,
} = require('../utils/isUserAuthenticated')

const router = require('express').Router()

router.route('/order/me').get(isUserAuthenticated, myOrders)

router.route('/orders/new').post(isUserAuthenticated, newOrder)

router
  .route('/admin/orders')
  .get(isUserAuthenticated, isUserAuthorized('admin'), getAllOrders)

router
  .route('/admin/order/:id')
  .delete(isUserAuthenticated, isUserAuthorized('admin'), deleteOrder)
  .put(isUserAuthenticated, isUserAuthorized('admin'), updateOrder)

router.route('/order/:id').get(isUserAuthenticated, singleOrder)

module.exports = router
