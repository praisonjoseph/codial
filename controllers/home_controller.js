home = function(req, res) {
    // return res.send('<h1> This is page from Codial </h1>')
    var ob = {
        title: "Social media",
    }
    return res.render('home',  ob)
}
module.exports = {home}

