module.exports.new_post = function(req, res) {
    // return res.end("<h1> Posts page </h1>")
    return res.render('posts', {
        title: "Post page"
    })
}