const express = require('express')
const asyncHandler = require('express-async-handler')
const Product = require('../models/productModel')
const mongoose = require('mongoose')
const ApiFeature = require('../utils/apiFeatures')

exports.getAllProducts = async (req, res) => {
  try {
    const productsCount = await Product.countDocuments()
    const resultPerPage = 8
    const apiFeature = new ApiFeature(Product.find(), req.query)
      .search()
      .filter()
      .pagination(resultPerPage)
    const products = await apiFeature.query
    if (products.length === 0) {
      return res.status(404).json({ message: 'No products found' })
    }
    if (!products) {
      return res.status(404).send({ message: 'No product found' })
    }
    res.status(200).json({
      success: true,
      products,
      productsCount,
      resultPerPage,
    })
  } catch (err) {
    return res.status(500).send({ message: err._message })
  }
}

exports.getProduct = async (req, res) => {
  try {
    const id = req.params.id
    const product = await Product.findById(id)
    if (!product) {
      return res.status(404).send({ message: 'No product found' })
    }
    res.status(200).json(product)
  } catch (err) {
    return res.status(500).send({ message: err._message })
  }
}

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
  await Product.findByIdAndDelete(id)
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
  product.reviews.forEach((rev) => (avg += rev.rating))
  product.rating = avg / product.reviews.length
  await product.save({ validateBeforeSave: false })
  res.status(200).send({ message: 'Thank you for your review!' })
})

exports.getProductReviews = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.query.id)
  if (!product) {
    return res.status(404).send({ message: 'Product not found' })
  }
  return res.status(200).send(product.reviews)
})

exports.deleteReview = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.query.productId)
  if (!product) {
    return res.status(404).send({ message: 'Product not found' })
  }
  const reviews = product.reviews.filter(
    (rev) => rev._id.toString() !== req.query.id.toString()
  )
  let avg = 0
  reviews.forEach((rev) => (avg += rev.rating))
  const rating = avg / reviews.length
  const numOfReviews = reviews.length
  await Product.findByIdAndUpdate(
    req.query.productId,
    { reviews, rating, numOfReviews },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  )
  res.status(200).send({ message: 'Product review deleted successfully' })
})
