const express = require('express')
const asyncHandler = require('express-async-handler')
const { validate, User } = require('../models/userModel')
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const sendMail = require('../utils/sendMail')

exports.registerUser = asyncHandler(async (req, res) => {
  const { error } = validate(req.body)
  if (error) {
    return res.status(400).send({ message: error.details[0].message })
  }
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
  const oldUser = await User.findOne({ email })
  if (oldUser) {
    return res.status(400).send({ message: 'User already exist' })
  }
  const hashPassword = await bcrypt.hash(password, 10)
  const newUser = await User.create({ ...req.body, password: hashPassword })
  res.status(200).send(newUser)
})

exports.loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) {
    return res.status(400).send({ message: 'All fields are mandatory' })
  }
  const user = await User.findOne({ email })
  if (user && (await bcrypt.compare(password, user.password))) {
    const token = jwt.sign({ _id: user._id }, process.env.JWT_PRIVATEKEY, {
      expiresIn: '5d',
    })
    res.cookie('token', token, { httpOnly: true, maxAge: 360000 })
    res.status(200).send({ message: 'Login successfully' })
  } else res.status(400).send({ message: 'Email or Password is invalid' })
})

exports.forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body
  if (!email) {
    return res.status(400).send({ message: 'Please enter email' })
  }
  const user = await User.find({ email })
  if (!user) {
    return res.status(404).send({ message: 'User does not exist' })
  }
  const token = jwt.sign({ _id: user._id }, process.env.JWT_PRIVATEKEY, {
    expiresIn: '1d',
  })
  const encodeToken = encodeURIComponent(token).replace(/\./,'%R')
  sendMail(email)
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
