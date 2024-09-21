import express from 'express'
import formidable from 'express-formidable'
import { authenticate, authorized } from '../middlewares/authMiddleware.js'
import checkId from '../middlewares/checkId.js'
import { createProduct } from '../controllers/productController.js'
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

router.route('/create').post(authenticate, authorized, upload, createProduct)
export default router
