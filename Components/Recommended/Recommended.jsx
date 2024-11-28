import React, { useEffect, useState } from 'react';
import './Recommended.css';
import { API_KEY, value_convertor } from '../../data';
import { Link } from 'react-router-dom';

const Recommended = ({ categoryId, studyMode }) => {
    const [apiData, setApiData] = useState([]);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        const relatedVideo_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=45&regionCode=US&videoCategoryId=${categoryId}&key=${API_KEY}`;
        
        try {
            const response = await fetch(relatedVideo_url);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            setApiData(data.items);
        } catch (error) {
            setError(error.message);
        }
    };

    useEffect(() => {
        fetchData();
    }, [categoryId]);

    if (studyMode) return null; // Return null if study mode is active

    return (
        <div className='recommended' style={{ height: 'calc(100vh - 50px)', overflowY: 'auto' }}>
            {error && <p className='error-message'>{error}</p>}
            {apiData.length === 0 && !error ? (
                <p>No recommendations available.</p>
            ) : (
                apiData.map((item) => (
                    <Link to={`/video/${item.snippet.categoryId}/${item.id}`} key={item.id} className='side-video-list'>
                        <img src={item.snippet.thumbnails.medium.url} alt={item.snippet.title} />
                        <div className='vid-info'>
                            <h4>{item.snippet.title}</h4>
                            <p>{item.snippet.channelTitle}</p>
                            <p>{value_convertor(item.statistics.viewCount)} Views</p>
                        </div>
                    </Link>
                ))
            )}
        </div>
    );
};

export default Recommended;
