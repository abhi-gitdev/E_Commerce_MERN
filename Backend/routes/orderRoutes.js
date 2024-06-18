const {
  newOrder,
  singleOrder,
  myOrders,
  getAllOrders,
} = require('../controller/orderController')
const {
  isUserAuthenticated,
  isUserAuthorized,
} = require('../utils/isUserAuthenticated')

const router = require('express').Router()

router.route('/order/me').get(isUserAuthenticated, myOrders)

router.route('/orders/new').post(isUserAuthenticated, newOrder)

router
  .route('/orders/all')
  .get(isUserAuthenticated, isUserAuthorized('admin'), getAllOrders)

router
  .route('/order/:id')
  .get(isUserAuthenticated, isUserAuthorized('admin'), singleOrder)

module.exports = router
