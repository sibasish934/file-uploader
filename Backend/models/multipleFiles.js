const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const multipleFilesUploads = new Schema({
    title:{
        type:String,
        required:true
    },
    files:[Object],

}, {timestamps:true})

module.exports = mongoose.model("MultipleFiles",multipleFilesUploads);