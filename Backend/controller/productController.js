const express = require('express')
const asyncHandler = require('express-async-handler')
const Product = require('../models/productModel')
const mongoose = require('mongoose')
const ApiFeature = require('../utils/apiFeatures')

exports.getAllProducts = asyncHandler(async (req, res) => {
  const apiFeature = new ApiFeature(Product.find(), req.query)
    .search()
    .filter()
    .pagination(2)
  const products = await apiFeature.query
  if (!products) {
    return res.status(404).send({ message: 'No product found' })
  }
  res.status(200).send(products)
})

exports.getProduct = asyncHandler(async (req, res) => {
  const id = req.params.id
  const product = await Product.findById(id)
  if (!product) {
    return res.status(404).send({ message: 'No product found' })
  }
  res.status(200).send(product)
})

exports.createProduct = asyncHandler(async (req, res) => {
  req.body.user = req.user.id
  const { name, description, price, quantity, images } = req.body
  if (!name || !description || !price || !quantity || !images) {
    return res.status(400).send({ message: 'All fields are mandatory' })
  }
  const product = await Product.create(req.body)
  res.status(200).send({ product })
})

exports.updateProduct = asyncHandler(async (req, res) => {
  const id = req.params.id
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({ message: 'Invalid product ID format' })
  }
  const product = await Product.findById(id)
  if (!product) {
    return res.status(404).send({ message: 'No product found' })
  }
  const newProduct = await Product.findByIdAndUpdate(id, req.body, {
    new: true,
  })
  res.status(200).send({ newProduct })
})

exports.deleteProduct = asyncHandler(async (req, res) => {
  const id = req.params.id
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({ message: 'Invalid product ID format' })
  }
  const product = await Product.findById(id)
  if (!product) {
    return res.status(404).send({ message: 'No product found' })
  }
  const deleteProduct = await Product.findByIdAndDelete(id)
  res.status(200).send({ message: 'Deleted product successfully' })
})

exports.reviewProduct = asyncHandler(async (req, res) => {
  const { rating, comment, productId } = req.body
  if (!rating) {
    return res.status(400).send({ message: 'Please provide a rating.' })
  }
  const nameUser = `${req.user.firstName} ${req.user.lastName}`
  const review = {
    user: req.user._id,
    name: nameUser,
    rating: Number(rating),
    comment,
  }
  const product = await Product.findById(productId)
  if (!product) {
    return res.status(404).send({ message: 'Product not found.' })
  }
  const isReviewed = product.reviews.find(
    (rev) => rev.user.toString() === req.user._id.toString()
  )
  if (isReviewed) {
    product.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user._id.toString()) {
        ;(rev.rating = Number(rating)), (rev.comment = comment)
      }
    })
  } else {
    product.reviews.push(review)
    product.numOfReviews = product.reviews.length
  }
  let avg = 0
  product.rating =
    product.reviews.forEach((rev) => (avg += rev.rating)) /
    product.reviews.length
  await product.save({ validateBeforeSave: false })
  res.status(200).send({ message: 'Thank you for your review!' })
})
