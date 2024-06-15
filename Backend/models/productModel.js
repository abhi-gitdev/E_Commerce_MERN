const { ref } = require('joi')
const mongoose = require('mongoose')

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please enter the name of product'],
    },
    description: {
      type: String,
      required: [true, 'Please enter description of product'],
    },
    price: {
      type: Number,
      required: [true, 'Please enter the price of product'],
      maxLength: [5, 'Price cannot exceed 5 char'],
    },
    quantity: {
      type: Number,
      required: [true, 'Please enter the available quantity of product'],
      default: 1,
    },
    images: [
      {
        public_id: { type: String, required: true },
        url: { type: String, required: true },
      },
    ],
    rating: {
      type: Number,
      default: 0,
    },
    numOfReviews: {
      type: Number,
      default: 0,
    },
    reviews: [
      {
        user: {
          type: mongoose.Schema.ObjectId,
          ref: 'User',
          required: true,
        },
        name: {
          type: String,
          required: true,
        },
        rating: {
          type: Number,
          required: true,
        },
        comment: {
          type: String,
          required: true,
        },
      },
    ],
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Product', productSchema)
