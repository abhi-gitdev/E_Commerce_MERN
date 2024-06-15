const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')
const { User } = require('../models/userModel')

const isUserAuthenticated = asyncHandler(async (req, res, next) => {
  const { token } = req.cookies
  if (!token) {
    return res.status(400).send({ message: 'Please login' })
  }
  const decoded = jwt.verify(token, process.env.JWT_PRIVATEKEY)
  req.user = await User.findById(decoded._id)
  next()
})

const isUserAuthorized = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res
        .status(403)
        .send({ message: 'User is not authorized to access this resource' })
    }
    next()
  }
}

module.exports = { isUserAuthenticated, isUserAuthorized }
