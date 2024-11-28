import React, { useState } from 'react';
import './Home.css';
import Sidebar from '../../Components/Sidebar/Sidebar';
import Feed from '../../Components/Feed/Feed';

const Home = ({ sidebar, studyMode }) => {
  const [category, setCategory] = useState(0);

  return (
    <>
      <Sidebar sidebar={sidebar} category={category} setCategory={setCategory} />
      <div className={`container ${studyMode ? 'study-mode' : ''} ${sidebar ? '' : 'large-container'}`}>
        <Feed category={category} studyMode={studyMode} />
      </div>
    </>
  );
};

export default Home;
