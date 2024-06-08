const mongoose = require('mongoose')

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
      max: [10, 'Phone number should be 10 digit'],
      min: [10, 'Phone number should be 10 digit'],
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
      maxLength: [15, 'Password cannot exceed 15 characters'],
      minLength: [8, 'Password should contain at least 8 characters'],
    },
  },
  {
    timestamps: true,
  }
)
