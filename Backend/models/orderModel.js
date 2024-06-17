const { ref, required } = require('joi')
const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
  shippingInfo: {
    address: {
      type: String,
      required: [true, 'Shipping address is required'],
    },
    city: {
      type: String,
      required: [true, 'Shipping city is required'],
    },
    state: {
      type: String,
      required: [true, 'Shipping state is required'],
    },
    pinCode: {
      type: Number,
      required: true,
      min: [6, 'Pin code should be 6 digit long'],
    },
    phone: {
      type: Number,
      required: true,
    },
  },
  orderItem: [
    {
      prodctId: {
        type: mongoose.Schema.ObjectId,
        ref: 'Product',
        required: [true, 'Product id is required'],
      },
      name: {
        type: String,
        required: [true, 'Product name is required'],
      },
      price: {
        type: Number,
        required: [true, 'Product price is required'],
      },
      quantity: {
        type: Number,
        required: [true, 'Product quantity is required'],
      },
      image: {
        type: String,
        required: true,
      },
    },
  ],
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'User id is required'],
  },
  paymentInfo: {
    id: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
  },
  paidAt: {
    type: Date,
    required: true,
  },
  itemPrice: {
    type: Number,
    required: true,
    default: 0,
  },
  taxPrice: {
    type: Number,
    required: true,
    default: 0,
  },
  shippingPrice: {
    type: Number,
    required: true,
    default: 0,
  },
  totalPrice: {
    type: Number,
    required: true,
    default: 0,
  },
  orderStatus: {
    type: String,
    required: true,
    default: 'Processing',
  },
  deliveredAt: Date,
  createdAt: {
    type: Date,
    default: Date.now(),
  },
})

module.exports = mongoose.model('Order', orderSchema)
