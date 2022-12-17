'use strict'

const mongoose = require('mongoose');

module.exports = () =>{
    mongoose.connect('mongodb://localhost:27017/file-uploader', {
        useNewUrlParser:true,
        useUnifiedTopology:true,
    }).then(() => console.log("Database connected..."))
}