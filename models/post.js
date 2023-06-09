const mongoose = require('mongoose')
const PostSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    // include the array of ids of all the comment of the post 
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }]

}, {
    timestamps: true
})

const Post = mongoose.model('Post', PostSchema);
module.exports = Post