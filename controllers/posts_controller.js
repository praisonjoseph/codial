const Post = require('../models/post')

// module.exports.post_list = async function (req, res) {
//     const post_item = await Post.findById({ _id: req.params.postId })
//     return res.render('posts', {
//         title: "Post page",
//         post_item: post_item

//     })
// }

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
