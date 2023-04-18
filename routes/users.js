const express = require('express')
const passport = require('passport')
const router = express.Router()
const session = require('express-session')
const UsersController = require('../controllers/users_controller')


router.get('/profile/:id', passport.checkAuthentication, UsersController.profile)
router.post('/update/:id', passport.checkAuthentication, UsersController.update)
router.get('/signup', UsersController.signup)
router.get('/login', UsersController.login)
router.get('/logout', UsersController.destroySession);
router.post('/create', UsersController.create)
router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect: '/users/login'}
),  UsersController.createSession)
module.exports = router