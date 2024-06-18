const asyncHandler = require('express-async-handler')
const Order = require('../models/orderModel')

exports.newOrder = asyncHandler(async (req, res) => {
  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    itemPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body
  if (
    !shippingInfo.address ||
    !shippingInfo.city ||
    !shippingInfo.state ||
    !shippingInfo.pinCode ||
    !shippingInfo.phone
  ) {
    return res
      .status(400)
      .send({ message: 'Please enter all shipping details' })
  }
  if (
    !shippingInfo ||
    !orderItems ||
    !paymentInfo ||
    !itemPrice ||
    !taxPrice ||
    !shippingPrice ||
    !totalPrice
  ) {
    return res.status(400).send({ message: 'Please enter all details' })
  }
  const order = await Order.create({
    shippingInfo,
    orderItems,
    paymentInfo,
    itemPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paidAt: Date.now(),
    user: req.user._id,
  })
  res.status(200).send(order)
})

exports.myOrders = asyncHandler(async (req, res) => {
  console.log('hgf')
  const orders = await Order.find({ user: req.user._id })
  if (!orders) {
    return res.status(404).send({ message: 'No orders found' })
  }
  res.status(200).send(orders)
})

exports.singleOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    'user', // this method is used to populate the user field of the Order with name and email field of the User to which it is referencing
    `firstName lastName email`
  )
  if (!order) {
    return res.status(404).send({ message: 'No order found' })
  }
  res.status(200).send(order)
})

exports.getAllOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find().populate(
    'user',
    'firstName lastName email phone'
  )
  if (!orders) {
    return res.status(404).send({ message: 'No orders yet' })
  }
  let totalAmount = 0
  orders.forEach((order) => {
    totalAmount += order.totalPrice
  })
  res.status(200).send(orders)
})
