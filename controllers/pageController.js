const User = require("../models/userModel.js");
const bcrypt = require('bcrypt')


exports.homePage = (req, res) => {
    res.render('index', { title: 'Home - LinkSaver' });
};

exports.addLinkPage = (req, res) => {
    res.render('add-link', { title: 'Add Link - LinkSaver' });
};

exports.aboutPage = (req, res) => {
    res.render('about', { title: 'About - LinkSaver' });
};

exports.signupPage = (req,res)=>{
    res.render('signup',{title:'Signup - LinkSaver'});
};
exports.loginPage = (req,res)=>{
    res.render('login',{title:'Login - LinkSaver'})
}

exports.postsignup = async(req,res)=>{
    try{
        let {fullname,email,password,confirmpassword} = req.body;
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
          const hashpassword = await bcrypt.hash(password,10);
          const newuser = new User({
            fullname,
            email,
            password:hashpassword
          });

          await newuser.save();

          res.redirect('/login');
    }catch(error){
        console.log('error while saving user and the error is this = > '+error);
        
    }
};
