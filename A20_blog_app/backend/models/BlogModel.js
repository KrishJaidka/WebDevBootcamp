const mongoose = require("mongoose");

const blogSchema = mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    },
    coverImg:{
        type:String,
        required:false
    },
    author:{
        type:String,
        required:true
    }

})

module.exports = mongoose.model('Blog',blogSchema);