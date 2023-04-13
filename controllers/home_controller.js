const Post = require('../models/post')

const home = async function (req, res) {
    try {
        const PostList = await Post.find()
        .populate('user')
        .populate({
            path: 'comments',
            populate: {
                path: 'user'
            }
        })
        console.log(PostList[0]); 
        // console.log(PostList[0].populated('user'));  '5144cf8050f071d979c118a7'
        return res.render('home', { title: "Codial | Home", post_items: PostList })
    } catch (err) {
        console.log(err)
    }
    
}
module.exports = { home }

