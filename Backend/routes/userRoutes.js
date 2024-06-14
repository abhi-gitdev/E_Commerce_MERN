const {
  registerUser,
  getAllUsers,
  deleteUser,
  loginUser,
  logoutUser,
  forgotPassword,
  resetPassword,
  updateProfile,
} = require('../controller/userController')
const {
  isUserAuthenticated,
  isUserAuthorized,
} = require('../utils/isUserAuthenticated')
const router = require('express').Router()

router.route('/register').post(registerUser)
router.route('/login').post(loginUser)
router.route('/logout').post(logoutUser)
router.route('/forgot_password').post(forgotPassword)
router.route('/reset_password/:token').post(resetPassword)
router.route('/update/profile').post(isUserAuthenticated, updateProfile)
router.route('/').get(isUserAuthenticated, isUserAuthorized, getAllUsers)
router.route('/:id').delete(isUserAuthenticated, isUserAuthorized, deleteUser)

module.exports = router
