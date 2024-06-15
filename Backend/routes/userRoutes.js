const {
  registerUser,
  getAllUsers,
  deleteUser,
  loginUser,
  logoutUser,
  forgotPassword,
  resetPassword,
  updateProfile,
  getUser,
  updateUserRole,
} = require('../controller/userController')
const {
  isUserAuthenticated,
  isUserAuthorized,
} = require('../utils/isUserAuthenticated')
const router = require('express').Router()

router.route('/register').post(registerUser)
router.route('/login').post(loginUser)
router.route('/logout').get(logoutUser)
router.route('/forgot_password').post(forgotPassword)
router.route('/reset_password/:token').put(resetPassword)
router.route('/update/profile').put(isUserAuthenticated, updateProfile)
router
  .route('/')
  .get(isUserAuthenticated, isUserAuthorized('admin'), getAllUsers)
router
  .route('/:id')
  .delete(isUserAuthenticated, isUserAuthorized('admin'), deleteUser)
  .get(isUserAuthenticated, isUserAuthorized('admin'), getUser)
  .put(isUserAuthenticated, isUserAuthorized('admin'), updateUserRole)

module.exports = router
