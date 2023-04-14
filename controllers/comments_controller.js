const Post = require('../models/post')
const Comment = require('../models/comment')

module.exports.create = async function (req, res) {
    try {
        const post = await Post.findById({ _id: req.body.post_id })
        if (post) {
            const comment = await Comment.create({
                content: req.body.content,
                user: req.user._id,
                post: req.body.post_id
            })
            // console.log(post)
            post.comments.push(comment)
            // await comment.save().then(savedComment => {
            //     console.log(savedComment);
            // })
            
            await post.save().then(savedPost => {
                console.log(savedPost);
            })
        }
        return res.redirect('/')
    } catch (err) {
        console.log(err)
    }
}

module.exports.delete = async function (req, res) {
    try {
        const comment = await Comment.findById(req.params.Id)
        if (post) {
            const comment = await Comment.create({
                content: req.body.content,
                user: req.user._id,
                post: req.body.post_id
            })
            // console.log(post)
            post.comments.push(comment)
            
            await post.save().then(savedPost => {
                console.log(savedPost);
            })
        }
        return res.redirect('/')
    } catch (err) {
        console.log(err)
    }
}