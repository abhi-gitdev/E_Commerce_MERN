import asyncHandler from '../middlewares/asyncHandler.js'
import Product from '../models/productModel.js'

export const createProduct = asyncHandler(async (req, res) => {
  try {
    const { name, price, description, image, quantity, category } = req.body
    console.log(req.fields)

    if (!name || !price || !description || !image || !quantity || !category) {
      res.status(400)
      throw new Error('All fields are mandatory!')
      return
    }
    const product = new Product({ ...req.fields })
    await product.save()
    res.json(product)
  } catch (error) {
    console.log(error)
    res.status(400).json(error.message)
  }
})
