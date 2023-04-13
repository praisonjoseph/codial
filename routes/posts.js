const express = require('express')
const router = express.Router()
const passport = require('passport')
const postsController = require('../controllers/posts_controller')


router.get('/post1', postsController.new_post)
router.post('/create',passport.checkAuthentication,  postsController.create)
module.exports = router
