const express = require('express')
const app = express()
const port = 8000;
const path = require('path')

// app routes
app.use('/', require('./routes/index'))

// setup the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

app.listen(port, function(err){
    if (err) {
        console.log(`Error in running the server at ${err}`)
    }
    console.log(`Server is running at port ${port}`)
})