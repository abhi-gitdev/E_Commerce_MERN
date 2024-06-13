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
  const token = jwt.sign({ _id: newUser._id }, process.env.JWT_PRIVATEKEY, {
    expiresIn: '5d',
  })
  res.cookie('token', token, {
    httpOnly: true,
    expires: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
  })
  res.status(200).send({ message: 'Registered successfully' })
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
    res.cookie('token', token, {
      httpOnly: true,
      expires: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
    })
    res.status(200).send({ message: 'Login successfully' })
  } else res.status(400).send({ message: 'Email or Password is invalid' })
})

exports.logoutUser = asyncHandler(async (req, res) => {
  const { token } = req.cookies
  if (!token) {
    return res.status(400).send({ message: 'Please login' })
  }
  res.cookie('token', null, { httpOnly: true, expires: new Date(Date.now()) })
  res.status(200).send({ message: 'Log out successfully' })
})

exports.forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body
  if (!email) {
    return res.status(400).send({ message: 'Please enter email' })
  }
  const user = await User.findOne({ email })
  console.log(user)
  if (!user) {
    return res.status(404).send({ message: 'User does not exist' })
  }
  const resetToken = user.getResetPasswordToken()
  await user.save({ validateBeforeSave: false })
  const resetURL = `${req.protocol}://${req.get(
    'host'
  )}/password/reset/${resetToken}`
  const subject = ' Password Reset Request'
  const message = `Dear ${user.firstName},\n\n
We received a request to reset your password. You can reset your password by clicking the link below:
\n\n
${resetURL}
\n\n
If you did not request a password reset, please disregard this email.
\n\n
Thank you,\n
Sip & Drip`
  try {
    sendMail(email, subject, message)
    return res.status(200).send({ message: 'Email sent successfully' })
  } catch (e) {
    user.resetPasswordExpire = undefined
    user.resetPasswordToken = undefined
    user.save({ validateBeforeSave: false })
    return res.status(400).send({ message: 'Failed to send mail' })
  }
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
