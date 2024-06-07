const { registerUser } = require('../controller/userController')

const router = require('express').Router()

router.route('/register').post(registerUser)

module.exports = router
