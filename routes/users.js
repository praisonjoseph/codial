const express = require('express')
const router = express.Router()
const UsersController = require('../controllers/users_controller')

router.get('/profile', UsersController.profile)
router.get('/signup', UsersController.signup)
router.get('/login', UsersController.login)
router.post('/create', UsersController.create)
module.exports = router