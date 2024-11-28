import React, { useEffect, useState, useRef } from 'react';
import './Navbar.css';
// import AIicon from "../../assets/AIicon.png";
import menu_icon from '../../assets/menu.png';
import logo from '../../assets/logo.png';
import search_icon from '../../assets/search.png';
import upload_icon from '../../assets/upload.png';
import reddit_logo from '../../assets/reddit_logo.webp';
import discord_logo from '../../assets/discord_logo.jpg';
import profile_icon from '../../assets/user.jpg';
import aibotGif from '../../assets/icons8-bot.gif';
import meetings_icon from '../../assets/meetings.png';
import { Link, useNavigate } from 'react-router-dom';
import { API_KEY } from '../../data';
import todo from '../../assets/todo.png';
import drop from '../../assets/drop.png';
import slack from '../../assets/slack.png';
import twitter from '../../assets/twitter.png';

const Navbar = ({ setSidebar, studyMode, setStudyMode }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const navigate = useNavigate();
  const searchBoxRef = useRef(null);
  const dropdownRef = useRef(null);

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (searchQuery.trim() === '') return;

    const searchUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=10&q=${searchQuery}&key=${API_KEY}`;
    try {
      const response = await fetch(searchUrl);
      if (response.ok) {
        const data = await response.json();
        setSearchResults(data.items || []); // Ensure results is defined
      } else {
        console.error('Error fetching search results:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  const handleVideoClick = (videoId, index) => {
    setSearchResults([]); // Hide search results
    navigate(`/video/${index}/${videoId}`);
  };

  const handleClickOutside = (event) => {
    if (searchBoxRef.current && !searchBoxRef.current.contains(event.target)) {
      setSearchResults([]);
    }
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleToggleChange = () => {
    setStudyMode(prev => !prev);
  };

  const toggleDropdown = () => {
    setDropdownVisible(prev => !prev);
  };

  return (
    <>
      <nav className='flex-div'>
        <div className='nav-left flex-div'>
          <img className='menu-icon' onClick={() => setSidebar(prev => !prev)} src={menu_icon} alt="Menu" />
          <Link to="/"><img className='logo' src={logo} alt="Logo" /></Link>
          <Link to="/ai"><img className='sparkle-effect' src={aibotGif} alt="AI Bot" /></Link>
        </div>

        <div className='nav-middle flex-div' ref={searchBoxRef}>
          {/* Study Mode Toggle */}
          <div className="study-mode-container">
            <label className="study-mode-switch round">
              <input type="checkbox" checked={studyMode} onChange={handleToggleChange} />
              <span className="study-mode-slider"></span>
            </label>
            <span className="study-mode-label">Study Mode</span>
          </div>

          <form className='search-box flex-div' onSubmit={handleSearch}>
            <input type="text" placeholder='Search' value={searchQuery} onChange={handleInputChange} />
            <button type="submit" className='search-button'>
              <img src={search_icon} alt='Search' />
            </button>
          </form>
          <Link to="/todo">
            <img src={todo} alt="Todo" className='todo-icon' />
          </Link>
        </div>

        <div className='nav-right flex-div'>
          <Link to="/upload"><img src={upload_icon} alt="Upload" className='upload-icon' /></Link>
          <Link to="/meet"><img src={meetings_icon} alt="Meetings" className='logo2' /></Link>

          {/* Dropdown for social icons */}
          <div className='dropdown' ref={dropdownRef}>
            <img src={drop} alt="Menu" className='dropdown-icon' onClick={toggleDropdown} />
            {dropdownVisible && (
              <div className='dropdown-menu'>
              <a href="https://www.reddit.com" target="_blank" rel="noopener noreferrer">
                <img src={reddit_logo} alt="Reddit" className='logo2'/>
              </a>
              <a href="https://discord.com" target="_blank" rel="noopener noreferrer">
                <img src={discord_logo} alt="Discord" className='logo2'/>
              </a>
              <a href="https://slack.com" target="_blank" rel="noopener noreferrer">
                <img src={slack} alt="Slack" className='slack'/>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <img src={twitter} alt="Twitter" className='twitter'/>
              </a>
            </div>
            
            )}
          </div>

          <Link to="/user"><img src={profile_icon} className='user-icon' alt="User" /></Link>
        </div>
      </nav>

      {searchResults.length > 0 && (
        <div className='search-results' ref={searchBoxRef}>
          {searchResults.map((result) => (
            <div key={result.id.videoId} className='search-result-item' onClick={() => handleVideoClick(result.id.videoId, searchResults.indexOf(result))}>
              <img src={result.snippet.thumbnails.default.url} alt={result.snippet.title} />
              <div className='search-result-info'>
                <h3>{result.snippet.title}</h3>
                <p>{result.snippet.channelTitle}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Navbar;
