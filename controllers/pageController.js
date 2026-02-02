const User = require("../models/userModel.js");
const Link = require("../models/linkModel.js");
const bcrypt = require('bcrypt');
exports.homePage = async (req, res) => {
    try {
        const links = await Link.find({ userId: req.session.userId }).sort({ createdAt: -1 });
        res.render('index', { title: 'Home - LinkSaver', name: req.session.userFullname, links });
    } catch (error) {
        console.error('Error loading home page links:', error);
        res.status(500).send('Server error');
    }
};

exports.addLinkPage = (req, res) => {
    res.render('add-link', { title: 'Add Link - LinkSaver' });
};

exports.aboutPage = (req, res) => {
    res.render('about', { title: 'About - LinkSaver' });
};

exports.signupPage = (req, res) => {
    res.render('signup', { title: 'Signup - LinkSaver' });
};
exports.loginPage = (req, res) => {
    res.render('login', { title: 'Login - LinkSaver' })
}

exports.postsignup = async (req, res) => {
    try {
        let { fullname, email, password, confirmpassword } = req.body;
        console.log(req.body);

        email = email.toLowerCase();

        const existinguser = await User.findOne({ email });

        if (existinguser) {
            // User already exists
            return res.status(400).send('User already exists');
        } else if (confirmpassword.trim() !== password.trim()) {
            // Passwords do not match
            return res.status(400).send("Passwords don't match");
        }
        const hashpassword = await bcrypt.hash(password, 10);
        const newuser = new User({
            fullname,
            email,
            password: hashpassword
        });

        await newuser.save();

        res.redirect('/login');
    } catch (error) {
        console.log('error while saving user and the error is this = > ' + error);

    }
};
exports.postlogin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).send('No user found with this email');
        };
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).send('Incorrect password');
        };

        //set up session

        req.session.userId = user.id;
        req.session.userFullname = user.fullname;

        res.redirect('/');
    } catch (error) {
        console.log('error while logging in and the error is this = > ' + error);
    }
};

exports.postaddlink = async (req, res) => {
    const { title, url, description } = req.body;
    try {
        if (!title || !url) {
            return res.status(400).send('Title and URL are required');
        };
        const newLink = new Link({
            title,
            url,
            description,
            userId: req.session.userId
        });
        await newLink.save();
        res.redirect('/');
    }
    catch (error) {
    console.log('error while adding link and the error is this = > ' + error);
}

}