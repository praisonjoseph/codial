const Post = require('../../../models/post')
const Comment = require('../../../models/comment')

module.exports.index = async function(req, res) {
    let postList = await Post.find()
    .sort('-createdAt')
    .populate('user')
    .populate({
        path: 'comments',
        populate: {
            path: 'user'
        }
    })
    // postList = postList.select('-password')
    return res.status(200).json({
        message: "List of Posts",
        posts: postList
    })
}

module.exports.delete = async function (req, res) {
    try {
        const post = await Post.findById(req.params.id)
        await Post.findByIdAndDelete(req.params.id)
        await Comment.deleteMany({post: req.params.id})
        return res.status(200).json({
            message: "Post and associated Comments deleted"
        })
        //} else {
            // req.flash('error', 'You cannot delete this post')
            // return res.redirect('back')
        //}

    } catch (err) {
        return res.status(500).json({
            message: "Internal Server Error"
        })
    }
}