import React, { useState, useEffect } from 'react';
import './profile.css';
import profile_icon from '../../assets/user.jpg';

const Profile = () => {
  const [videos, setVideos] = useState([]);
  const [notes, setNotes] = useState('');

  useEffect(() => {
    const uploadedFiles = JSON.parse(localStorage.getItem('uploadedFiles')) || [];
    const videoFiles = uploadedFiles.filter(file => file.type.startsWith('video/'));
    setVideos(videoFiles);
  }, []);

  useEffect(() => {
    const savedNotes = localStorage.getItem('generalNotes') || '';
    setNotes(savedNotes);
  }, []);

  return (
    <div className="profile-container">
      <div className="profile-header">
        <img src={profile_icon} alt="Profile Picture" className="profile-picture" />
        <div className="profile-info">
          <h1 className="profile-name">Tanay Sahajwalla</h1>
          <p className="profile-description">
            Welcome to my YouTube channel! Here, you can find videos on various topics including technology, tutorials, and more.
          </p>
        </div>
      </div>
      <div className="content-container">
        <div className="video-section">
          <h2>My Videos</h2>
          <div className="video-list">
            {videos.length > 0 ? (
              videos.map((video) => (
                <div className="video-item" key={video.fileId}>
                  <video controls className="video-thumbnail" src={video.url}>
                    Your browser does not support the video tag.
                  </video>
                  <div className="video-details">
                    <p className="video-title"><strong>Title:</strong> {video.title}</p>
                    <p className="video-description"><strong>Description:</strong> {video.description}</p>
                  </div>
                </div>
              ))
            ) : (
              <p>No videos uploaded yet.</p>
            )}
          </div>
        </div>
        <div className="my-notes-section">
          <h2>My Notes</h2>
          <div className="my-notes-list">
            {notes ? (
              <div className="note-item">
                <p><strong>Note:</strong> {notes}</p>
              </div>
            ) : (
              <p>No notes saved yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
