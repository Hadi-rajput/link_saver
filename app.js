const express = require('express');
const path = require('path');
const pageController = require('./controllers/pageController');
const bodyparser = require("body-parser");
const connectdb = require('./config/db');

const app = express();

// Connect to Database
connectdb();

// View Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

// Static Files
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', pageController.homePage);
app.get('/add-link', pageController.addLinkPage);
app.get('/about', pageController.aboutPage);
app.get('/signup',pageController.signupPage);
app.get('/login',pageController.loginPage);
app.post("/signup",pageController.postsignup);

app.listen(3000,()=>{
    console.log('server is running at http://localhost:3000');
    
})