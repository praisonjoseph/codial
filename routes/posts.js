const express = require('express')
const router = express.Router()
const passport = require('passport')
const postsController = require('../controllers/posts_controller')


router.post('/create',passport.checkAuthentication, postsController.create)
router.get('/destroy/:Id', passport.checkAuthentication, postsController.delete)
module.exports = router
