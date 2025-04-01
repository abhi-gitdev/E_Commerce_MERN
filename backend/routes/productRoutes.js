import express from 'express'
import formidable from 'express-formidable'
import { authenticate, authorized } from '../middlewares/authMiddleware.js'
import checkId from '../middlewares/checkId.js'
import {
  createProduct,
  updateProductDetails,
  deleteProduct,
  getProducts,
  getProductById,
  getAllProducts,
  addProductReview,
  getTopProducts,
  getNewProducts,
  getCategoryProducts,
  getFilteredProducts,
} from '../controllers/productController.js'
import multer from 'multer'

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/product')
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`)
  },
})

const upload = multer({ storage }).array('images', 10)

const router = express.Router()

router
  .route('/')
  .get(getProducts)
  .post(authenticate, authorized, upload, createProduct)

router.route('/allProducts').get(getAllProducts)
router.route('/top').get(getTopProducts)
router.route('/new').get(getNewProducts)
router.route('/:id/reviews').post(authenticate, addProductReview)
router.route('/filtered_products').post(getFilteredProducts)
router.route('/getCategoryProducts/:id').get(getCategoryProducts)
router
  .route('/:id')
  .get(getProductById)
  .put(authenticate, authorized, upload, updateProductDetails)
  .delete(authenticate, authorized, deleteProduct)

export default router
