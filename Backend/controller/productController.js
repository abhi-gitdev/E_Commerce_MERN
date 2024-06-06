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
