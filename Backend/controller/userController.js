const express = require('express')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')

exports.registerUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, phone, address, city, password } =
    req.body
  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !address ||
    !city ||
    !password
  ) {
    return res.status(400).send({ message: 'All fields are mandatory' })
  }
  const hashPassword = await bcrypt.hash(password, 10)
  const user = await User.create({ ...req.body, password: hashPassword })
  res.status(200).send(user)
})

exports.getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find()
  if (!users) {
    return res.status(404).send({ message: 'No user Found' })
  }
  res.status(200).send(users)
})

exports.deleteUser = asyncHandler(async (req, res) => {
  const id = req.params.id
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({ message: 'Invalid product ID format' })
  }
  const user = await User.findById(id)
  if (!user) {
    return res.status(404).send({ message: 'No user found' })
  }
  await User.findByIdAndDelete(id)
  res.status(200).send(user)
})
