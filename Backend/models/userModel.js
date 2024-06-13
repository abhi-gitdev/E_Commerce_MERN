const mongoose = require('mongoose')
const joi = require('joi')
const passwordComplexity = require('joi-password-complexity')
const crypto = require('crypto')

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, 'Please enter first name'],
    },
    lastName: {
      type: String,
      required: [true, 'Please enter last name'],
    },
    email: {
      type: String,
      required: [true, 'Please enter email'],
    },
    phone: {
      type: Number,
      required: [true, 'Please enter phone number'],
    },
    address: {
      type: String,
      required: [true, 'Please enter you address'],
    },
    city: {
      type: String,
      required: [true, 'Please enter your city'],
    },
    password: {
      type: String,
      required: [true, 'Please enter password'],
      minLength: [8, 'Password should be greater than 8 '],
    },
    avatar: {
      public_id: {
        type: String,
        required: false,
      },
      url: { type: String, required: false },
    },
    role: {
      type: String,
      default: 'user',
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
  },
  {
    timestamps: true,
  }
)

userSchema.methods.getResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(20).toString('hex')
  this.resetPasswordToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex')
  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000
  return resetToken
}

const validate = (data) => {
  const schema = joi.object({
    firstName: joi.string().required().label('First Name'),
    lastName: joi.string().required().label('Last Name'),
    email: joi.string().required().label('Email'),
    phone: joi.number().required().label('Phone Number'),
    address: joi.string().required().label('Address'),
    city: joi.string().required().label('City'),
    password: passwordComplexity().required().label('Password'),
  })
  return schema.validate(data)
}

const User = mongoose.model('User', userSchema)

module.exports = { User, validate }
