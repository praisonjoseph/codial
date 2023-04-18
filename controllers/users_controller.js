const User = require('../models/user')

module.exports.profile = async function (req, res) {
    try {
    const user = await User.findById(req.params.id)
    return res.render('users_profile', {
        title: "Profile page",
        profile_user: user
    })
}  catch (err) {
    console.log(err)
}
}

module.exports.signup = function (req, res) {
    if(req.isAuthenticated()) {
        return res.redirect('/users/profile')
    }
    return res.render('users_signup', {
        title: "signup page"
    })
}


module.exports.login = function (req, res) {
    if(req.isAuthenticated()) {
        return res.redirect('/users/profile')
    }
    return res.render('users_login', {
        title: "login page"
    })
}

//get the signup data
module.exports.create = async function (req, res) {
    if (req.body.password != req.body.confirm_password) {
        return res.redirect('back')
    }
    const matchExistingEmail = await User.findOne({ email: req.body.email }).exec()
    console.log(matchExistingEmail)
    if (!matchExistingEmail) {
        const {
            name,
            email,
            password
        } = req.body
        console.log(name, email, password)
        const user = new User({
            name,
            email,
            password
        })
        await user.save().then(savedUser => {
            console.log(savedUser); // true
            return res.redirect('/users/login')
            
        })
            .catch((err) => {
                console.log(err)
                return res.status(500).send('Bad Request')
            });
    } else {
        return res.redirect('back')
    }
    
}

//sign and create a session 

module.exports.createSession = function (req, res) {
    // console.log(req.body)
    return res.redirect('/')
}

module.exports.destroySession = function(req, res, next){
    req.logout(function(err) {
      if (err) { return next(err); }
      res.redirect('/');
    });
  }