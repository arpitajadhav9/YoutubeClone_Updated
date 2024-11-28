import React, { useState, useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import Sidebar from './Components/Sidebar/Sidebar';
import Home from './Pages/Home/Home';
import Video from './Pages/Video/Video';
import Profile from './Components/UserProfile/profile';
import Upload from './Components/Uploads/Upload';
import Ai from './Components/Gemini/Gemini';
import StickyNotes from './Components/StickyNotes/StickyNotes';
import WatchParty from './Watchparty/Watchparty';
import RoomPage from './Pages/room/room';
import TodoPage from './Pages/TodoPage';
import './App.css';

const App = () => {
  const [sidebar, setSidebar] = useState(true);
  const [showNotes, setShowNotes] = useState(false);
  const [studyMode, setStudyMode] = useState(false);
  const [videos, setVideos] = useState([]);
  const [notes, setNotes] = useState('');
  const location = useLocation();

  useEffect(() => {
    const uploadedFiles = JSON.parse(localStorage.getItem('uploadedFiles')) || [];
    const videoFiles = uploadedFiles.filter(file => file.type.startsWith('video/'));
    setVideos(videoFiles);

    const savedNotes = localStorage.getItem('generalNotes') || '';
    setNotes(savedNotes);
  }, []);

  const toggleNotes = () => {
    setShowNotes(prev => !prev);
  };

  const handleSaveNotes = (notes) => {
    localStorage.setItem('generalNotes', notes);
    setNotes(notes);
    setShowNotes(false);
  };

  return (
    <div className={`app-container ${studyMode ? 'study-mode' : ''}`}>
      <Navbar setSidebar={setSidebar} setStudyMode={setStudyMode} studyMode={studyMode} />
      {location.pathname === '/' && <Sidebar sidebar={sidebar} />}
      <div className={`feed-section ${studyMode ? 'black-screen' : ''}`}>
        <Routes>
          <Route
            path='/'
            element={
              <Home
                studyMode={studyMode}
                toggleNotes={toggleNotes}
                sidebar={sidebar}
              />
            }
          />
          <Route
            path='/video/:categoryId/:videoId'
            element={
              <VideoWrapper
                showNotes={showNotes}
                toggleNotes={toggleNotes}
                studyMode={studyMode}  // Pass studyMode to VideoWrapper
              />
            }
          />
          <Route
            path='/user'
            element={
              <Profile
                videos={videos}
                notes={notes}
              />
            }
          />
          <Route path='/upload' element={<Upload />} />
          <Route path='/ai' element={<Ai />} />
          <Route path='/meet' element={<WatchParty />} />
          <Route path='/meet/:roomID' element={<RoomPage />} />
          <Route path='/todo' element={<TodoPage />} />
        </Routes>
      </div>
      {showNotes && (
        <StickyNotes
          onSave={handleSaveNotes}
        />
      )}
    </div>
  );
};

const VideoWrapper = ({ showNotes, toggleNotes, studyMode }) => {
  return (
    <>
      <Video studyMode={studyMode} />  {/* Pass studyMode to Video */}
      {showNotes && (
        <StickyNotes
          onSave={handleSaveNotes}
        />
      )}
    </>
  );
};

export default App;
