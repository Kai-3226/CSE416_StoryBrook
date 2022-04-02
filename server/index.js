// THESE ARE NODE APIs WE WISH TO USE
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser')

// CREATE OUR SERVER
dotenv.config()
const PORT = process.env.PORT || 4000;
const app = express()

// SETUP THE MIDDLEWARE
app.use(express.urlencoded({ extended: true }))
app.use(cors({
    origin: ["http://localhost:3000"],
    credentials: true
}))
app.use(express.json())
app.use(cookieParser())

// SETUP OUR OWN ROUTERS AS MIDDLEWARE
const top5listsRouter = require('./routes/top5lists-router')
app.use('/api', top5listsRouter)

// INITIALIZE OUR DATABASE OBJECT
console.log(process.env.DB_CONNECT);
mongoose
    .connect(process.env.DB_CONNECT, { useNewUrlParser: true })
    .catch(e => {
        console.error('Connection error', e.message)
    })

const db = mongoose.connection

module.exports = db
// const db = require('./db')
// db.on('error', console.error.bind(console, 'MongoDB connection error:'))

// PUT THE SERVER IN LISTENING MODE
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))

//HEROKU
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
}
