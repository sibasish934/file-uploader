import React, { useState } from 'react'
import "./file.css";
import { singleFileUpload , multipleFilesUpload} from "../data/api";
import {CircularProgressbar, buildStyles} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';


const FileUploader = (props) => {
    const [singleFile, setSingleFile] = useState('');
    const [multipleFiles, setMultipleFiles] = useState('');
    const [title, setTitle] = useState("");

    const [singleProgress, setSingleProgress] = useState(0);
    const [multipleProgress, setMultipleProgress] = useState(0);

    const MultipleFileChange = (e) =>{
        setMultipleFiles(e.target.files);
        setMultipleProgress(0);
    }

    const SingleFileChange = (e) =>{
        setSingleFile(e.target.files[0]);
        setSingleProgress(0);
    }

    const singleFileOptions = {
        onUploadProgress: (progressEvent) => {
            const {loaded, total} = progressEvent;
            const percentage = Math.floor(((loaded / 1000) * 100) / (total / 1000));
            setSingleProgress(percentage);
        }
    }

    const mulitpleFileOptions = {
        onUploadProgress: (progressEvent) => {
            const {loaded, total} = progressEvent;
            const percentage = Math.floor(((loaded / 1000) * 100) / (total / 1000));
            setMultipleProgress(percentage);
        }
    }

    const uploadSingle = async() =>{
        const formData = new FormData();
        formData.append('file', singleFile);
        await singleFileUpload(formData, singleFileOptions);
        props.getsingle();
    }

    const uploadMultiple = async () =>{
        const formData = new FormData();
        formData.append('title', title);
        for (let i = 0; i < multipleFiles.length; i++) {
            formData.append('files', multipleFiles[i]);                      
        }
        await multipleFilesUpload(formData, mulitpleFileOptions);
        props.getMultiple();
    }
  return (
    <div className=' media row mt-3'>
        <div className='col-5'>
            <div className='form-group'>
                <label>Select Single File</label>
                <input type='file' onChange={(e) => SingleFileChange(e)} className="form-control" />
            </div>
            <div className='row'>
                <div className='col-10'>
                    <button type='button' onClick={() => uploadSingle()} className='mt-3 btn-Success custom-button'>Upload</button>
                </div>
                <div className="col-2">
                        <CircularProgressbar
                            value={singleProgress}
                            text={`${singleProgress}%`}
                            styles={buildStyles({
                                rotation: 0.25,
                                strokeLinecap: 'butt',
                                textSize: '16px',
                                pathTransitionDuration: 0.5,
                                pathColor: `rgba(255, 136, 136, ${singleProgress / 100})`,
                                textColor: '#f88',
                                trailColor: '#d6d6d6',
                                backgroundColor: '#3e98c7',
                            })}
                        />
                    </div>
            </div>
        </div>
        <div className='col-6'>
            <div className='row'>
                <div className='col-6'>
                    <label>Title</label>
                    <input type="text" onChange={(e) => setTitle(e.target.value)} className="form-control" placeholder='Enter the title for your gallery.'/>
                </div>
                <div className='col-6'>
                    <div className='form-group'>
                        <label>Multiple File Upload</label>
                        <input type='file' onChange={(e)=>MultipleFileChange(e)} className="form-control" multiple />
                    </div>
                    <div className='row'>
                        <div className='col-10'>
                            <button type='button' onClick={() => uploadMultiple()} className='mt-3 btn-dark custom-button'>Upload</button>
                        </div>
                        <div className="col-2 cirular">
                        <CircularProgressbar
                            value={multipleProgress}
                            text={`${multipleProgress}%`}
                            styles={buildStyles({
                                rotation: 0.25,
                                strokeLinecap: 'butt',
                                textSize: '16px',
                                pathTransitionDuration: 0.5,
                                pathColor: `rgba(255, 136, 136, ${multipleProgress / 100})`,
                                textColor: '#f88',
                                trailColor: '#d6d6d6',
                                backgroundColor: '#3e98c7',
                            })}
                        />
                    </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default FileUploader