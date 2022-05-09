
const mongoose = require('mongoose')
 const dotenv = require('dotenv')
 dotenv.config();


//mongodb+srv://CSE416:StoryBrook@cse416.r919d.mongodb.net/CSE416?retryWrites=true&w=majority
mongoose
    .connect(process.env.MONGODB_URI||process.env.DB_CONNECT, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .catch(e => {
        console.error('Connection error', e.message)
    })

const db = mongoose.connection

module.exports = db

