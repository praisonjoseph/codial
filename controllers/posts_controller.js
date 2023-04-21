const Post = require('../models/post')
const Comment = require('../models/comment')


module.exports.create = async function (req, res) {
    try {
        const content = req.body.content
        const user_id = req.user._id
        
        const post = new Post({
            content,
            user: user_id
        })

        await post.save().then(savedPost => {
            if (req.xhr) {
                return res.status(200).json({
                    data: {
                        post: savedPost
                    },
                    message: 'Post Created!'
                })
            }
            req.flash('success', 'Post Published')
            return res.redirect('/')

        })
    } catch (err) {
        req.flash('error', err)
        return res.redirect('back')
        //return res.status(500).send('Bad Request')
    };

}


module.exports.delete = async function (req, res) {
    try {
        // console.log(req.params.Id)
        const post = await Post.findById(req.params.Id)
        if (post.user == req.user.id) {
            await Post.findByIdAndDelete(req.params.Id)
            await Comment.deleteMany({post: req.params.Id})
            req.flash('success', 'Post and associated comments are deleted')
            return res.redirect('back')
        } else {
            req.flash('error', 'You cannot delete this post')
            return res.redirect('back')
        }

    } catch (err) {
        req.flash('error', err)
        return res.redirect('back')
    }
}