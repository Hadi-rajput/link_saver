const express = require('express');
const path = require('path');
const pageController = require('./controllers/pageController');
const bodyparser = require("body-parser");
const connectdb = require('./config/db');
const session = require('express-session');

const app = express();

// Connect to Database
connectdb();


// View Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware

// Session Middleware
app.use(session({
    secret: 'my_linkkey',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set to true if using HTTPS
}));

// function for auth name is auth

function isAuth(req, res, next) {
    if (req.session.userId) {
        next();
    } else {
        res.redirect('/login');
    }
};



app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

// Static Files
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', isAuth, pageController.homePage);
app.get('/add-link', isAuth, pageController.addLinkPage);
app.get('/about', isAuth, pageController.aboutPage);
app.get('/signup', pageController.signupPage);
app.get('/login', pageController.loginPage);
app.post("/signup", pageController.postsignup);
app.post("/login", pageController.postlogin);
app.post("/add-link",isAuth, pageController.postaddlink);
app.get("/logout", (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.log('error while logging out = > ' + err);
        };
        res.clearCookie("connect.sid");
        res.redirect('/login');
    });
});


app.listen(3000, () => {
    console.log('server is running at http://localhost:3000');

})