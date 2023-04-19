const { models } = require('mongoose');
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('../models/user')


passport.use(new LocalStrategy({
    usernameField: 'email',
    passReqToCallback: true
}, async function (req, email, password, done) {
    // find a user and establish identity

    try {
        const user = await User.findOne({ email: email });
        if (!user || user.password != password) {
            req.flash('error', 'Invalid Username/Password')
            return done(null, false)
        }
        return done(null, user)
    }
    catch (err) {
        req.flash('error', err)
        return done(err);
    }
}))


//serializing the user to decide which key to use in the cookie.
passport.serializeUser(function (user, done) {
    return done(null, user.id);
})


passport.deserializeUser(async function (id, done) {
    try {
        const user = await User.findById({ _id: id });
        return done(null, user)
    }
    catch (err) {
        return done(err);
    }
})	

passport.checkAuthentication = function(req, res, next){
    if(req.isAuthenticated()) {
        return next()
    }
    return res.redirect('/users/login')
}


passport.setAuthenticatedUser = function(req, res, next) {
    if(req.isAuthenticated()) {
        res.locals.user = req.user
    }
    return next()
}
module.exports = passport