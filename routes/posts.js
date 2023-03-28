const express = require('express')
const router = express.Router()
const postsController = require('../controllers/posts')


router.get('/post1', postsController.new_post)
module.exports = router
console.log(module)