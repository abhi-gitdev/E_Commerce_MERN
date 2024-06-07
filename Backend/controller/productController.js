const express = require('express')
const asyncHandler = require('express-async-handler')
const Product = require('../models/productModel')
const mongoose = require('mongoose')

exports.getAllProducts = asyncHandler(async (req, res) => {
  const products = await Product.find()
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
