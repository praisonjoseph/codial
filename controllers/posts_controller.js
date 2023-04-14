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
            // console.log(savedPost); 
            return res.redirect('/')

        })
    } catch (err) {
        console.log(err)
        return res.status(500).send('Bad Request')
    };

}


module.exports.delete = async function (req, res) {
    try {
        // console.log(req.params.Id)
        const post = await Post.findById(req.params.Id)
        if (post.user == req.user.id) {
            await Post.findByIdAndDelete(req.params.Id)
            await Comment.deleteMany({post: req.params.Id})
            return res.redirect('back')
        }

    } catch (err) {
        console.log(err)
        return res.redirect('back')
    }
}