import React, { useState } from 'react';
import './Upload.css';

const Upload = () => {
  const [files, setFiles] = useState([]);
  const [uploadMessage, setUploadMessage] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleDragOver = (e) => {
    e.preventDefault();
    document.getElementById('dropArea').classList.add('content-over');
    document.getElementById('dropText').innerHTML = 'Release to Upload files';
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    document.getElementById('dropArea').classList.remove('content-over');
    document.getElementById('dropText').innerHTML = 'Drag & Drop your files';
  };

  const handleDrop = (e) => {
    e.preventDefault();
    document.getElementById('dropArea').classList.remove('content-over');
    document.getElementById('dropText').innerHTML = 'Drag & Drop your files';
    const currentFiles = [...e.dataTransfer.files];
    currentFiles.forEach((file) => {
      file.fileId = getRandomFileId();
    });
    setFiles((prevFiles) => [...prevFiles, ...currentFiles]);
  };

  const handleFileChange = (e) => {
    const currentFiles = [...e.target.files];
    currentFiles.forEach((file) => {
      file.fileId = getRandomFileId();
    });
    setFiles((prevFiles) => [...prevFiles, ...currentFiles]);
  };

  const handleBrowseClick = () => {
    document.getElementById('uploadInput').click();
  };

  const handleUpload = () => {
    const uploadedFiles = JSON.parse(localStorage.getItem('uploadedFiles')) || [];

    files.forEach((file) => {
      const fileData = {
        fileId: file.fileId,
        name: file.name,
        size: file.size,
        type: file.type,
        url: URL.createObjectURL(file), // Create an in-memory URL for the file
        title: title,
        description: description,
      };

      uploadedFiles.push(fileData);
      localStorage.setItem('uploadedFiles', JSON.stringify(uploadedFiles));
    });

    setUploadMessage('Files successfully uploaded!');
    setFiles([]);
    setTitle('');
    setDescription('');
  };

  const removeFile = (fileId) => {
    setFiles((prevFiles) => prevFiles.filter((file) => file.fileId !== fileId));
  };

  const getRandomFileId = () => {
    return Math.floor(Math.random() * 10000000).toString(16);
  };

  return (
    <section className="upload-page">
      <div className="container">
        <header>
          <h1>Upload your files</h1>
          <p>File should be Image, Video</p>
        </header>
        <div className="titleDescription">
          <textarea
            placeholder="Enter title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            placeholder="Enter description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div
          className="dropArea"
          id="dropArea"
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="contentHolder">
            <img
              src="https://raw.githubusercontent.com/Dinesh1042/Vanilla-JavaScript-Projects/54beb49518ed741a02ded177d987ea67fd9ebed1/Upload%20Drag%20and%20Drop/asset/upload.svg"
              draggable="false"
              alt="upload-icon"
            />
            <p id="dropText">Drag & Drop your files</p>
            <span>Or</span>
            <input type="file" multiple id="uploadInput" onChange={handleFileChange} />
            <button id="browseBtn" onClick={handleBrowseClick}>
              Browse File
            </button>
          </div>
        </div>
        <div className="uploadedFileCont" id="uploadedFileCont">
          {files.map((file) => (
            <div className="uploadedFile" key={file.fileId}>
              <div className="fileName">
                <p>{file.name}</p>
                <span>{(file.size / (1024 * 1024)).toFixed(2) <= 0 ? `${file.size} KB` : `${(file.size / (1024 * 1024)).toFixed(2)} MB`}</span>
              </div>
              <div className="closeBtn" onClick={() => removeFile(file.fileId)}>
                <ion-icon name="close"></ion-icon>
              </div>
            </div>
          ))}
        </div>
        <div className={`uploadBtnCont ${files.length ? 'content-here' : ''}`} id="uploadBtnCont">
          <button className="uploadBtn" onClick={handleUpload}>
            Upload
          </button>
        </div>
        {uploadMessage && <p className="uploadMessage">{uploadMessage}</p>}
      </div>
    </section>
  );
};

export default Upload;
