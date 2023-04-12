home = function(req, res) {
    console.log(req.cookies)
    // res.cookie('user_id', 25)
    var ob = {
        title: "Social media",
    }
    return res.render('home',  ob)
}
module.exports = {home}

