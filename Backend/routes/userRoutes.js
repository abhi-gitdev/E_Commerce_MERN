const {
  registerUser,
  getAllUsers,
  deleteUser,
  loginUser,
  logoutUser,
  forgotPassword,
  resetPassword,
} = require('../controller/userController')

const router = require('express').Router()

router.route('/register').post(registerUser)
router.route('/login').post(loginUser)
router.route('/logout').post(logoutUser)
router.route('/forgot_password').post(forgotPassword)
router.route('/reset_password/:token').post(resetPassword)
router.route('/').get(getAllUsers)
router.route('/:id').delete(deleteUser)

module.exports = router
