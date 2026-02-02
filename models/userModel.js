const mongoose = require('mongoose');

const userschema = mongoose.Schema(
    {
        fullname:{
            type:String,
            trim:true,
            required:true,
        },
         email:{
            lowercase:true,
            type:String,
             unique: true,
             required:true,
         },
          password:{
            type:String,
            required:true,
         },
    },{
         timestamps: true,
    }
);

module.exports = mongoose.model("User",userschema);