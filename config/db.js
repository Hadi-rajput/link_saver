const mongoose = require('mongoose');

const connectdb = async()=>{
    try{
        await mongoose.connect("mongodb://localhost:27017/link_saver_app");
        console.log('connection with mongo db is connected');
    }catch(error){
        console.log("conntion with db failed"+error);   
    };
}

module.exports = connectdb;