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
            post.comments.push(comment)          
            await post.save().then(savedPost => {
                //console.log(savedPost);
                req.flash('success', 'Comment Published')
                return res.redirect('/')
            })
        }
        return res.redirect('/')
    } catch (err) {
        req.flash('error', err)
        return res.redirect('/')
    }
}

module.exports.delete = async function (req, res) {
    try {
        const comment = await Comment.findById(req.params.Id)
        console.log(comment, comment.post, req.user.id)
        if (comment.user == req.user.id) {
            await Comment.findByIdAndDelete(req.params.Id)
            const post = await Post.findOne({_id: comment.post})
            post.comments.pull(req.params.Id)   
            post.save()
            req.flash('success', 'Comment Deleted')
            return res.redirect('/')
        }
        return res.redirect('/')
    } catch (err) {
        req.flash('error', err)
        return res.redirect('/')
    }
}