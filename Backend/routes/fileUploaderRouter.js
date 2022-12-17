'use strict'

const express =require('express');
const { singleFileUpload, multipleFileUpload, getAllSingleFiles, getAllMUltipleFiles } = require('../controller/fileuploaderController');
const upload = require('../helper/filehelper');


// const multipleFileUpload = require('../controller/fileuploaderController');

const router = express.Router();

router.post('/singleFileUpload', upload.single('file'), singleFileUpload);

router.post('/multipleFileupload',upload.array('files'), multipleFileUpload);

router.get('/getAllSingleuploads', getAllSingleFiles);

router.get('/getMultipleUploads', getAllMUltipleFiles);

module.exports = {
    routes : router
}