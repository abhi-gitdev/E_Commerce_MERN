import asyncHandler from '../middlewares/asyncHandler.js'
import Product from '../models/productModel.js'
import Category from '../models/categoryModel.js'

export const createProduct = asyncHandler(async (req, res) => {
  try {
    console.log(req.body)

    const {
      name,
      brand,
      price,
      description,
      quantity,
      category,
      ItemWeight,
      Packer,
      ManufacturerAddress,
      CountryOfOrigin,
      Manufacturer,
      DateFirstAvailable,
      ProductDimensions,
    } = req.body
    if (
      !name ||
      !price ||
      !description ||
      !quantity ||
      !category ||
      !ItemWeight ||
      !Packer ||
      !ManufacturerAddress ||
      !CountryOfOrigin ||
      !Manufacturer ||
      !DateFirstAvailable ||
      !ProductDimensions ||
      !brand
    ) {
      res.status(400)
      throw new Error('All fields are mandatory!')
    }

    const imagePaths = req.files.map((file) => file.filename)

    const product = new Product({
      name,
      price,
      brand,
      description,
      images: imagePaths,
      quantity,
      category,
      countInStock: quantity,
      ItemWeight,
      Packer,
      ManufacturerAddress,
      CountryOfOrigin,
      Manufacturer,
      DateFirstAvailable,
      ProductDimensions,
    })

    await product.save()
    res.json(product)
  } catch (error) {
    console.log(error)
    res.status(400).json({ message: error.message })
  }
})

export const updateProductDetails = asyncHandler(async (req, res) => {
  try {
    const {
      name,
      brand,
      price,
      description,
      quantity,
      category,
      countInStock,
      ItemWeight,
      Packer,
      ManufacturerAddress,
      CountryOfOrigin,
      Manufacturer,
      DateFirstAvailable,
      ProductDimensions,
      imagesToDelete, // This might be a string or an array
    } = req.body

    if (
      !name ||
      !brand ||
      !price ||
      !description ||
      !quantity ||
      !category ||
      !countInStock ||
      !ItemWeight ||
      !Packer ||
      !ManufacturerAddress ||
      !CountryOfOrigin ||
      !Manufacturer ||
      !DateFirstAvailable ||
      !ProductDimensions
    ) {
      res.status(400)
      throw new Error('All fields are mandatory!')
    }

    // Convert imagesToDelete to an array if it's a string
    const imagesToDeleteArray =
      typeof imagesToDelete === 'string'
        ? imagesToDelete.split(',').map((image) => image.trim())
        : imagesToDelete || []

    // Fetch the existing product
    const product = await Product.findById(req.params.id)
    if (!product) {
      res.status(404)
      throw new Error('Product not found!')
    }

    // Remove images specified in imagesToDeleteArray
    let updatedImages = product.images || []
    updatedImages = updatedImages.filter(
      (image) => !imagesToDeleteArray.includes(image)
    )

    // Add new images from uploaded files
    const newImagePaths = req.files
      ? req.files.map((file) => file.filename)
      : []
    updatedImages = [...updatedImages, ...newImagePaths]

    // Update product details
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        images: updatedImages,
      },
      { new: true } // Return the updated document
    )

    res.json(updatedProduct)
  } catch (error) {
    console.error(error.message)
    res.status(400).json({ message: error.message })
  }
})

export const deleteProduct = asyncHandler(async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id)
    res.json(product)
  } catch (error) {
    console.log(error)
    res.status(400).json({ message: error.message })
  }
})

export const getProducts = asyncHandler(async (req, res) => {
  try {
    const pageSize = 6

    const keyword = req.query.keyword
      ? {
          name: {
            $regex: req.query.keyword,
            $options: 'i',
          },
        }
      : {}

    const count = await Product.countDocuments({ ...keyword })
    const products = await Product.find({ ...keyword }).limit(pageSize)

    res.json({
      products,
      page: 1,
      pages: Math.ceil(count / pageSize),
      hasMore: false,
    })
  } catch (error) {
    console.log(error)
    res.status(400).json({ message: error.message })
  }
})
export const getAllProducts = asyncHandler(async (req, res) => {
  try {
    const products = await Product.find({})
      .populate('category')
      .limit(12)
      .sort({ createdAt: -1 })
    if (!products) {
      res.status(404)
      throw new Error('No product found!')
    }
    res.json(products)
  } catch (error) {
    console.log(error)
    res.status(400).json({ message: error.message })
  }
})

export const getProductById = asyncHandler(async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
    if (!product) {
      res.status(404)
      throw new Error('No product found!')
    }
    res.json(product)
  } catch (error) {
    console.log(error)
    res.status(400).json({ message: error.message })
  }
})

export const addProductReview = asyncHandler(async (req, res) => {
  try {
    const { rating, comment } = req.body
    const product = await Product.findById(req.params.id)
    if (product) {
      const alreadyReviewed = product.reviews.find(
        (r) => r.user.toString() === req.user._id.toString() //learn it why toString()
      )

      if (alreadyReviewed) {
        res.status(400)
        throw new Error('Product already reviewed')
      }

      const review = {
        firstName: req.user.firstName,
        lastName: req.user.lastName,
        avatar: req.user.avatar,
        rating: Number(rating),
        comment,
        user: req.user._id,
      }

      product.reviews.push(review)
      product.numReviews = product.reviews.length
      product.rating =
        product.reviews.reduce((acc, item) => item.rating + acc, 0) /
        product.reviews.length

      await product.save()

      res.status(201).json({ message: 'Review added successfully' })
    } else {
      res.status(404)
      throw new Error('Product not found')
    }
  } catch (error) {
    console.log(error)
    res.status(400).json({ message: error.message })
  }
})

export const getTopProducts = asyncHandler(async (req, res) => {
  try {
    const products = await Product.find({}).sort({ rating: -1 }).limit(5)
    res.json(products)
  } catch (error) {
    console.log(error)
    res.status(400).json({ message: error.message })
  }
})

export const getNewProducts = asyncHandler(async (req, res) => {
  try {
    const products = await Product.find({}).sort({ _id: -1 }).limit(5)
    res.json(products)
  } catch (error) {
    console.log(error)
    res.status(400).json({ message: error.message })
  }
})

export const getCategoryProducts = asyncHandler(async (req, res) => {
  try {
    const products = await Product.find({ category: req.params.id }).sort({
      _id: -1,
    })
    res.json(products)
  } catch (error) {
    console.log(error)
    res.status(400).json({ message: error.message })
  }
})

export const getFilteredProducts = asyncHandler(async (req, res) => {
  try {
    const { checked, radio } = req.body
    let args = {}
    if (checked.length > 0) args.category = checked
    if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] }

    const products = await Product.find(args)
    res.json(products)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Server Error!' })
  }
})
