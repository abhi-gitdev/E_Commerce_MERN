const express = require('express')
const asyncHandler = require('express-async-handler')
const Product = require('../models/productModel')

exports.getAllProducts = asyncHandler(async (req, res) => {
  res.status(200).send({ message: 'getting all products' })
})

exports.getProduct = asyncHandler(async (req, res) => {
  const id = req.params.id
  res.status(200).send({ message: `getting product ${id}` })
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
  const { name, description, price, quantity, images } = req.body
  const product = await Product.find({ _id: id })
})
