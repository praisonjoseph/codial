const express = require('express')
const router = express.Router()
const postsController = require('../controllers/posts_controller')


router.get('/post1', postsController.new_post)
module.exports = router
