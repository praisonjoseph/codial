const mongoose = require('mongoose')


async function connectDb() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/codial_development');
        console.log(`Connected to database on Worker process: ${process.pid}`)
    }catch (error) {
        console.log(`Connection error: ${error.stack} on Worker process: ${process.pid}`)
        process.exit(1)
    }
}

connectDb()
