const SingleFile = require("../models/singleFile");
const multipleFile = require("../models/multipleFiles");
const singleFileUpload = async (req, res, next) => {
    try {
        const singlefile = new SingleFile({
            filename: req.file.originalname,
            filepath: req.file.path,
            filetype: req.file.mimetype,
            filesize: fileSizeFormatter(req.file.size, 3),
        });
        await singlefile.save();
        res.status(201).send('file uploaded successfully..');
    } catch (error) {
        res.status(400).send("Some error occured !! pls try again");
    }
}
const getAllSingleFiles = async (req, res, next) =>{
    try {
        
        const file = await SingleFile.find();
        res.status(200).send(file);
    } catch (error) {
        res.status(400).send(error.message)
    }
}
const multipleFileUpload = async (req, res, next) => {
    try{
        let filesArray = [];
        req.files.forEach(element => {
            const file = {
                fileName: element.originalname,
                filePath: element.path,
                fileType: element.mimetype,
                fileSize: fileSizeFormatter(element.size, 2)
            }
            filesArray.push(file);
        });
        const multipleFiles = new multipleFile({
            title: req.body.title,
            files: filesArray 
        });
        await multipleFiles.save();
        res.status(201).send('Files Uploaded Successfully');
    }catch(error) {
        res.status(400).send(error.message);
    }
}

const getAllMUltipleFiles = async (req, res, next) =>{
    try {
        const files = await multipleFile.find();
        res.status(200).send(files);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const fileSizeFormatter = (bytes, decimal) => {
    if (bytes === 0) {
        return "0 bytes";
    }

    const dm = decimal || 2;
    const sizes = ['bytes', 'Kb', 'Mb', 'Gb', 'Tb', 'Pb', 'Eb', 'Yb', 'Zb'];

    const index = Math.floor(Math.log(bytes) / Math.log(1000));
    return parseFloat((bytes / Math.pow(1000, index)).toFixed(dm)) + '-' + sizes[index]
}

module.exports = {
    singleFileUpload,
    multipleFileUpload,
    getAllSingleFiles,
    getAllMUltipleFiles
}

