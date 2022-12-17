const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const singleFileSchema = new Schema({
    filename:{
        type:String,
        required:true
    },
    filepath:{
        type:String,
        required:true
    },
    filetype:{
        type:String,
        required:true
    },
    filesize:{
        type:String,
        required:true
    },
}, {timestamps:true});

module.exports = mongoose.model('SingleFile',singleFileSchema);