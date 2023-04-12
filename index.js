const express = require('express')
const cookieParser = require('cookie-parser')
const app = express()
const port = 8000;
const path = require('path')
const expresLayouts = require('express-ejs-layouts')
const db = require('./config/mongoose');
//used for session cookie
const session = require('express-session')
const passport = require('passport')
const passportLocal = require('./config/passport-local-strategy')
const MongoStore = require('connect-mongo')
const sassMiddleware = require('node-sass-middleware')

app.use(sassMiddleware({
    /* Options */
    src: './assets/scss',
    dest: './assets/css',
    debug: true,
    outputStyle: 'extended',
    prefix:  '/css'  // Where prefix is at <link rel="stylesheets" href="prefix/style.css"/>
}));

const { urlencoded } = require('express');
app.use(express.static('./assets'))
app.use(expresLayouts)
app.use(express.urlencoded())
app.use(cookieParser())



app.set("layout extractStyles", true)
app.set("layout extractScripts", true)

// setup the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

//mongo store is used to store the session cookie in the db
app.use(session({
    name: 'codial',
    // Change the secret before deployment to production
    secret: 'blahsomething',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store: MongoStore.create({ 
        mongoUrl: 'mongodb://127.0.0.1:27017/codial_development',
        autoRemove: 'disabled'
     })

}))


app.use(passport.session())
app.use(passport.initialize())

app.use(passport.setAuthenticatedUser)

// app routes
app.use('/', require('./routes/index'))

app.listen(port, function(err){
    if (err) {
        console.log(`Error in running the server at ${err}`)
    }
    console.log(`Server is running at port ${port}`)
})