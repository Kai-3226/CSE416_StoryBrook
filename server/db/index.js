
const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config();

mongoose
    .connect(process.env.MONGODB_URI || process.env.DB_CONNECT||"mongodb://127.0.0.1:27017/storybrook", {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .catch(e => {
        console.error('Connection error', e.message)
    })

const db = mongoose.connection

module.exports = db

