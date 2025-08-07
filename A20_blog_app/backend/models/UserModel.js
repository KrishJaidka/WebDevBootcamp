const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
        minLength:8,
        trim:true
    },
    role:{
        type:String,
        enum: ['user' , 'author'], // Changed 'reader' to 'user'
        required:true,
    }
})

const User = mongoose.model("User",userSchema)
module.exports = User