import express from 'express'
const router = express.Router()
import {
  createCategory,
  getCategory,
  removeCategory,
  updateCategory,
  getCategoryById,
} from '../controllers/categoryController.js'
import { authenticate, authorized } from '../middlewares/authMiddleware.js'
import { upload } from '../utils/multer.js'

router
  .route('/')
  .post(
    authenticate,
    authorized,
    upload.fields([{ name: 'image', maxCount: 1 }]),
    createCategory
  )
router.route('/categories').get(getCategory)
router.route('/categories/:id').get(getCategoryById)
router
  .route('/:categoryId')
  .put(
    authenticate,
    authorized,
    upload.fields([{ name: 'image', maxCount: 1 }]),
    updateCategory
  )
  .delete(authenticate, authorized, removeCategory)

export default router
