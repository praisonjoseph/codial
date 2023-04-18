const Post = require('../models/post')
const User = require('../models/user')

const home = async function (req, res) {
    try {
        const PostList = await Post.find()
        .populate('user')
        // .populate('comments')
        .populate({
            path: 'comments',
            populate: {
                path: 'user'
            }
        })
        // console.log(PostList[0]); 
        // console.log(PostList[0].populated('user'));  '5144cf8050f071d979c118a7'
        const user = await User.find()
        return res.render('home', { title: "Codial | Home", post_items: PostList, all_users: user })
    } catch (err) {
        console.log(err)
    }
    
}
module.exports = { home }

