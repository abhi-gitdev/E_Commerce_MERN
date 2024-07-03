const mongoose = require('mongoose')

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please enter the name of product'],
      minLength: [3, 'Name must be more than 3 character long'],
    },
    description: {
      type: String,
      required: [true, 'Please enter description of product'],
    },
    productDetail: {
      ProductDimensions: { type: String, required: true },
      DateFirstAvailable: { type: Date, required: true },
      Manufacturer: { type: String, required: true },
      CountryOfOrigin: { type: String, required: true },
      Department: { type: String, required: true },
      ManufacturerAddress: { type: String, required: true },
      Packer: { type: String, required: true },
      ItemWeight: { type: String, required: true },
      GenericName: { type: String, required: true },
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
