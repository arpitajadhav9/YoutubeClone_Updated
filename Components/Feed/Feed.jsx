// import React, { useEffect, useState } from 'react'
// import './Feed.css'
// import thumbnail1 from '../../assets/thumbnail1.png'
// import thumbnail2 from '../../assets/thumbnail2.png'
// import thumbnail3 from '../../assets/thumbnail3.png'
// import thumbnail4 from '../../assets/thumbnail4.png'
// import thumbnail5 from '../../assets/thumbnail5.png'
// import thumbnail6 from '../../assets/thumbnail6.png'
// import thumbnail7 from '../../assets/thumbnail7.png'
// import thumbnail8 from '../../assets/thumbnail8.png'
// import { Link } from 'react-router-dom'
// import { API_KEY, value_convertor } from '../../data'
// import moment from 'moment'


// const Feed = ({category}) => {

//    const[data , setData] = useState([]);

//    const fetchData =  async () =>{
//       const videoList_url =`https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=US&videoCategoryId=${category}&key=${API_KEY}`
//       await fetch(videoList_url).then(response=>response.json()).then(data=>setData(data.items))
//    }

//    useEffect(()=>{
//       fetchData();      
//    },[category])

//   return (
//     <div className='feed'>
//       {data.map((item , index)=>{
//          return(
//       <Link to={`video/${item.snippet.categoryId}/${item.id}`} className='card'>
//            <img src={item.snippet.thumbnails.medium.url} alt=''/>
//            <h2>{item.snippet.title}</h2>
//            <h3>{item.snippet.channelTitle}</h3>
//            <p>{value_convertor(item.statistics.viewCount)} views &bull; {moment(item.snippet.publishedAt).fromNow()}</p>
//       </Link>
//          )
//       })}
        
//     </div>
  
//   )
// }

// export default Feed


// //moment (item.snippet.publishedAt) moment packages the one which we installed in the start of making this project which here is used to covert the publishedAt time in porper format


import React, { useEffect, useState } from 'react';
import './Feed.css';
import { Link } from 'react-router-dom';
import { API_KEY } from '../../data';

const Feed = ({ category, studyMode }) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    const videoList_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=US&videoCategoryId=${category}&key=${API_KEY}`;
    
    try {
      const response = await fetch(videoList_url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      setData(result.items || []);
    } catch (error) {
      console.error('Fetch failed:', error);
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, [category]); // Refetch when category changes

  return (
    <div className={`feed-container ${studyMode ? 'feed-hidden' : ''}`}>
      {studyMode ? (
        <div className='feed-black-screen'></div>
      ) : error ? (
        <div className='error-message'>Error: {error}</div>
      ) : (
        data.length > 0 ? (
          data.map((item) => (
            <Link
              to={`video/${item.snippet.categoryId}/${item.id}`}
              className='feed-card'
              key={item.id}
            >
              <img src={item.snippet.thumbnails.medium.url} alt='' className='feed-card-img' />
              <h2 className='feed-card-title'>{item.snippet.title}</h2>
              <h3 className='feed-card-channel'>{item.snippet.channelTitle}</h3>
            </Link>
          ))
        ) : (
          <p>No videos available.</p>
        )
      )}
    </div>
  );
};

export default Feed;
