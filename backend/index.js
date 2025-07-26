
// setting env file
require('dotenv').config({ path: './.env' })
require('./utils/passport-config');

const express = require('express')
const cors = require('cors')

// local files
const mail = require('./utils/email')
const mongoose = require('./config/DB')
const session = require('express-session');
const manageGallery=require('./controllers/manageGallery')
const manageProject=require('./controllers/manageProject')
const admin=require('./controllers/admin')
//schema


// app initialization
const app = express()
const PORT = process.env.PORT


// connecting db
mongoose()

// setting ejs
app.set('view engine', 'ejs')
app.set('views', 'view')

// parsing middleware
app.use(cors())
app.use(express.json())



app.use(session({
  secret: 'your_secret_key_here',
  resave: false,
  saveUninitialized: false,
}));

// routes folder
app.use('/mail', mail)
app.use('/manage-gallery',manageGallery)
app.use('/manage-project',manageProject)
app.use('/login-admin',admin)


//route
app.get('/', (req, res) => {
    res.send('server is running')
})


// hosting server

app.listen(PORT, () => {
    console.log(`${new Date(Date.now())} server is running at port http://localhost:${PORT}`)
})