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
            await comment.populate('user')
            comment.user.password = undefined
            await post.save().then(savedPost => {
                if (req.xhr) {
                     return res.status(200).json({
                         data: {
                             post: post,
                             comment: comment
                         },
                         message: 'Comment Created!'
                     })
                 }
                // req.flash('success', 'Comment Published')
                return res.redirect('/')
            })
        }else {
            return res.redirect('/')
        }
        
    } catch (err) {
        // req.flash('error', err)
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
            if (req.xhr) {
                return res.status(200).json({
                    data: {
                        comment_id: req.params.Id
                    },
                    message: 'Comment Deleted!'
                })
            }
            // req.flash('success', 'Comment Deleted')
            // return res.redirect('/')
        }else {
            return res.redirect('/')
        }
        
    } catch (err) {
        req.flash('error', err)
        return res.redirect('/')
    }
}