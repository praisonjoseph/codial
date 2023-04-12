const Post = require('../models/post')

module.exports.new_post = function(req, res) {
    // return res.end("<h1> Posts page </h1>")
    return res.render('posts', {
        title: "Post page"
    })
}

// module.exports.create = async function (req, res) {
//     if(req.isAuthenticated()) {
//         console.log(req.body, req.user)
//         return res.redirect('/')
//     }else {
//         return res.redirect('/users/login')
//     }
// }

module.exports.create = async function (req, res) {
    if(req.isAuthenticated()) {
        const content = req.body.content
		const user_id = req.user._id
        const post = new Post({
            content,
            user_id
        })
        await post.save().then(savedPost => {
            console.log(savedPost); // true
            return res.redirect('/')
            
        })
            .catch((err) => {
                console.log(err)
                return res.status(500).send('Bad Request')
            });
    
}else {
	return res.redirect('/users/login')
	
}
}