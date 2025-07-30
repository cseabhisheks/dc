
// setting env file
require('dotenv').config({ path: './.env' })



const express = require('express')
const cors = require('cors')

// local files
const mail = require('./utils/email')
const mongoose = require('./config/DB')
const manageGallery=require('./controllers/manageGallery')
const manageProject=require('./controllers/manageProject')
//schema


// app initialization
const app = express()
const PORT = process.env.PORT

app.use(cors({
  origin: process.env.FRONTEND,
  credentials: true,
}));

app.use(express.json())
// connecting db
mongoose()

// setting ejs
app.set('view engine', 'ejs')
app.set('views', 'view')

// parsing middleware
app.use(express.json())



// routes folder
app.use('/mail', mail)
app.use('/manage-gallery',manageGallery)
app.use('/manage-project',manageProject)



//route
app.get('/', (req, res) => {
    res.send('server is running')
})

const user = { name: 'a', password: '2' };
const session = require('express-session');
const passport = require('passport');
const ls = require('passport-local').Strategy;






// Middleware to parse application/x-www-form-urlencoded
app.use(express.urlencoded());

// Session setup
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: 'abhiyumi',
    cookie: {
        maxAge: 1000 * 60*30,
        secure: true // set to true if using HTTPS
    }
}));

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Passport local strategy
passport.use(new ls(
    { usernameField: 'un', passwordField: 'pd' },
    (usernamfe, passworfd, done) => {
        console.log('Authenticating:', usernamfe, passworfd);
        if (usernamfe === user.name && passworfd === user.password) {
            console.log('✅ Authentication successful');
            return done(null, user);
        }
        console.log('❌ Authentication failed');
        return done(null, false, { message: 'Invalid credentials' });
    }
));

// Serialize user
passport.serializeUser((user, done) => {
    console.log('Serializing user:', user.name);
    done(null, user.name);
});

// Deserialize user
passport.deserializeUser((id, done) => {
    console.log('Deserializing user:', id);
    if (id === user.name) {
        done(null, user);
    } else {
        done(null, false);
    }
});


// ✅ Logout Route
app.get('/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    res.json({ logout: true });
  });
});
// Handle login POST with error messages for reacy
app.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.json({ login: false }); // 👈 on invalid credentials

    req.logIn(user, (err) => {
      if (err) return next(err);
      return res.json({ login: true }); // 👈 on success
    });
  })(req, res, next); //to invoke paasport.authenticate middkeware we use it
});
// hosting server

app.listen(PORT, () => {
    console.log(`${new Date(Date.now())} server is running at port http://localhost:${PORT}`)
})