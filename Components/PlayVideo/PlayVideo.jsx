// import React, { useEffect, useState } from 'react';
// import './PlayVideo.css';
// import like from '../../assets/like.png';
// import dislike from '../../assets/dislike.png';
// import share from '../../assets/share.png';
// import save from '../../assets/save.png';
// import noteIcon from '../../assets/note.png'; // Import your sticky note icon
// import StickyNotes from '../StickyNotes/StickyNotes'; // Import StickyNotes component
// import { API_KEY, value_convertor } from '../../data';
// import moment from 'moment';
// import { useParams } from 'react-router-dom';
// import SubscribeButton from './Subscribe'; // Assuming SubscribeButton is in the same folder

// const PlayVideo = () => {
//     const { videoId } = useParams(); // Get videoId from URL params
//     const [apiData, setApiData] = useState(null); // State for video data
//     const [channelData, setChannelData] = useState(null); // State for channel data
//     const [commentData, setCommentData] = useState([]); // State for video comments
//     const [count, setCount] = useState(0); // State for like count
//     const [showNotes, setShowNotes] = useState(false); // State to manage visibility of StickyNotes

//     const KEY = `count-${videoId}`; // LocalStorage key for like count

//     // Effect to load like count from LocalStorage when videoId changes
//     useEffect(() => {
//         if (videoId) {
//             const parsedCount = Number(localStorage.getItem(KEY) || 0);
//             setCount(parsedCount);
//         }
//     }, [videoId]);

//     // Effect to save like count to LocalStorage when count changes
//     useEffect(() => {
//         if (videoId) {
//             localStorage.setItem(KEY, count);
//         }
//     }, [count, videoId]);

//     // Function to handle incrementing like count
//     const handleIncrement = () => {
//         setCount(prevCount => prevCount + 1);
//     };

//     // Function to fetch video data
//     const fetchVideoData = async () => {
//         if (!videoId) return;

//         try {
//             // Fetching Video Data
//             const videoDetailsUrl = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${API_KEY}`;
//             const videoResponse = await fetch(videoDetailsUrl);
//             const videoData = await videoResponse.json();
//             setApiData(videoData.items[0]);

//             // Fetching Comments Data
//             const commentUrl = `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&maxResults=50&videoId=${videoId}&key=${API_KEY}`;
//             const commentResponse = await fetch(commentUrl);
//             const commentData = await commentResponse.json();
//             setCommentData(commentData.items);
//         } catch (error) {
//             console.error("Error fetching video data: ", error);
//         }
//     };

//     // Function to fetch additional data related to the video (e.g., channel data)
//     const fetchOtherData = async () => {
//         if (!apiData) return;

//         try {
//             // Fetching Channel Data
//             const channelDataUrl = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${apiData.snippet.channelId}&key=${API_KEY}`;
//             const channelResponse = await fetch(channelDataUrl);
//             const channelData = await channelResponse.json();
//             setChannelData(channelData.items[0]);
//         } catch (error) {
//             console.error("Error fetching channel data: ", error);
//         }
//     };

//     // Effect to fetch video data when videoId changes
//     useEffect(() => {
//         fetchVideoData();
//     }, [videoId]);

//     // Effect to fetch additional data when apiData changes
//     useEffect(() => {
//         fetchOtherData();
//     }, [apiData]);

//     // Function to toggle visibility of StickyNotes
//     const toggleNotes = () => {
//         setShowNotes(prev => !prev);
//     };

//     return (
//         <div className='play-video'>
//             {/* Video Player */}
//             <iframe
//                 src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
//                 frameBorder="0"
//                 allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
//                 referrerPolicy="strict-origin-when-cross-origin"
//                 allowFullScreen
//             ></iframe>

//             {/* Video Title */}
//             <h3>{apiData ? apiData.snippet.title : 'Title here'}</h3>

//             {/* Video Info (Views, Published date) */}
//             <div className='play-video-info'>
//                 <p>{apiData ? value_convertor(apiData.statistics.viewCount) : '16K'} Views &bull; {apiData ? moment(apiData.snippet.publishedAt).fromNow() : ''}</p>
//                 <div>
//                     {/* Sticky Note Icon */}
//                     <img src={noteIcon} alt="Sticky Notes" className="sticky-note-icon" onClick={toggleNotes} />
//                     {/* Like, Dislike, Share, Save Icons */}
//                     <span><img src={like} alt='' onClick={handleIncrement} />{count}</span>
//                     <span><img src={dislike} alt='' /></span>
//                     <span><img src={share} alt='' />Share</span>
//                     <span><img src={save} alt='' onClick={toggleNotes} />Save</span> {/* Toggle StickyNotes on Save icon click */}
//                 </div>
//             </div>
//             <hr />

//             {/* Publisher Info (Channel Thumbnail, Name, Subscribers) */}
//             <div className='publisher'>
//                 <img src={channelData ? channelData.snippet.thumbnails.default.url : ''} alt='' />
//                 <div>
//                     <p>{apiData ? apiData.snippet.channelTitle : ''}</p>
//                     <span>{channelData ? value_convertor(channelData.statistics.subscriberCount) : '1M'} Subscribers</span>
//                 </div>
//                 <SubscribeButton /> {/* Subscribe Button */}
//             </div>

//             {/* Video Description and Comments */}
//             <div className='vid-description'>
//                 <p>{apiData ? apiData.snippet.description.slice(0, 250) : 'Description here'}</p>
//                 <hr />
//                 <h4>{apiData ? value_convertor(apiData.statistics.commentCount) : 102} Comments</h4>
//                 {commentData.map((item, index) => (
//                     <div key={index} className='comment'>
//                         <img src={item.snippet.topLevelComment.snippet.authorProfileImageUrl} alt='' />
//                         <div>
//                             <h3>{item.snippet.topLevelComment.snippet.authorDisplayName}<span>1 day ago</span></h3>
//                             <p>{item.snippet.topLevelComment.snippet.textDisplay}</p>
//                             <div className='comment-action'>
//                                 <img src={like} alt='' />
//                                 <span>{value_convertor(item.snippet.topLevelComment.snippet.likeCount)}</span>
//                                 <img src={dislike} alt='' />
//                             </div>
//                         </div>
//                     </div>
//                 ))}
//             </div>

//             {/* Conditionally render StickyNotes based on showNotes state */}
//             {showNotes && <StickyNotes />}
//         </div>
//     );
// };

// export default PlayVideo;

import React, { useEffect, useState } from 'react';
import './PlayVideo.css';
import like from '../../assets/like.png';
import dislike from '../../assets/dislike.png';
import share from '../../assets/share.png';
import save from '../../assets/save.png';
import noteIcon from '../../assets/note.png'; // Import your sticky note icon
import StickyNotes from '../StickyNotes/StickyNotes'; // Import StickyNotes component
import { API_KEY, value_convertor } from '../../data';
import moment from 'moment';
import { useParams } from 'react-router-dom';
import SubscribeButton from './Subscribe'; // Assuming SubscribeButton is in the same folder

const PlayVideo = ({ isStudyModeOn }) => {
    const { videoId } = useParams(); // Get videoId from URL parameters
    const [apiData, setApiData] = useState(null); // State for video data
    const [channelData, setChannelData] = useState(null); // State for channel data
    const [commentData, setCommentData] = useState([]); // State for video comments
    const [count, setCount] = useState(0); // State for like count
    const [showNotes, setShowNotes] = useState(false); // State to manage visibility of StickyNotes

    const KEY = `count-${videoId}`; // LocalStorage key for like count

    // Effect to load like count from LocalStorage when videoId changes
    useEffect(() => {
        if (videoId) {
            const parsedCount = Number(localStorage.getItem(KEY) || 0);
            setCount(parsedCount);
        }
    }, [videoId]);

    // Effect to save like count to LocalStorage when count changes
    useEffect(() => {
        if (videoId) {
            localStorage.setItem(KEY, count);
        }
    }, [count, videoId]);

    // Function to handle incrementing like count
    const handleIncrement = () => {
        setCount(prevCount => prevCount + 1);
    };

    // Function to fetch video data
    const fetchVideoData = async () => {
        if (!videoId) return;

        try {
            // Fetching Video Data
            const videoDetailsUrl = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${API_KEY}`;
            const videoResponse = await fetch(videoDetailsUrl);
            const videoData = await videoResponse.json();
            setApiData(videoData.items[0]);

            // Fetching Comments Data
            const commentUrl = `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&maxResults=50&videoId=${videoId}&key=${API_KEY}`;
            const commentResponse = await fetch(commentUrl);
            const commentData = await commentResponse.json();
            setCommentData(commentData.items);
        } catch (error) {
            console.error("Error fetching video data: ", error);
        }
    };

    // Function to fetch additional data related to the video (e.g., channel data)
    const fetchOtherData = async () => {
        if (!apiData) return;

        try {
            // Fetching Channel Data
            const channelDataUrl = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${apiData.snippet.channelId}&key=${API_KEY}`;
            const channelResponse = await fetch(channelDataUrl);
            const channelData = await channelResponse.json();
            setChannelData(channelData.items[0]);
        } catch (error) {
            console.error("Error fetching channel data: ", error);
        }
    };

    // Effect to fetch video data when videoId changes
    useEffect(() => {
        fetchVideoData();
    }, [videoId]);

    // Effect to fetch additional data when apiData changes
    useEffect(() => {
        fetchOtherData();
    }, [apiData]);

    // Function to toggle visibility of StickyNotes
    const toggleNotes = () => {
        setShowNotes(prev => !prev);
    };

    // Function to handle saving notes
    const handleSaveNotes = (notes) => {
        // Implement saving notes functionality here
        console.log('Saving notes:', notes);
        // You can save notes to localStorage or send them to a server
    };

    return (
        <div className='play-video'>
            {/* Video Player */}
            <iframe
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
            ></iframe>

            {/* Video Title */}
            <h3>{apiData ? apiData.snippet.title : 'Title here'}</h3>

            {/* Video Info (Views, Published date) */}
            <div className='play-video-info'>
                <p>{apiData ? value_convertor(apiData.statistics.viewCount) : '16K'} Views &bull; {apiData ? moment(apiData.snippet.publishedAt).fromNow() : ''}</p>
                <div>
                    {/* Sticky Note Icon */}
                    <img src={noteIcon} alt="Sticky Notes" className="sticky-note-icon" onClick={toggleNotes} />
                    {/* Like, Dislike, Share, Save Icons */}
                    <span><img src={like} alt='' onClick={handleIncrement} />{count}</span>
                    <span><img src={dislike} alt='' /></span>
                    <span><img src={share} alt='' />Share</span>
                    <span><img src={save} alt='' onClick={toggleNotes} />Save</span> {/* Toggle StickyNotes on Save icon click */}
                </div>
            </div>
            <hr />

            {/* Publisher Info (Channel Thumbnail, Name, Subscribers) */}
            <div className='publisher'>
                <img src={channelData ? channelData.snippet.thumbnails.default.url : ''} alt='' />
                <div>
                    <p>{apiData ? apiData.snippet.channelTitle : ''}</p>
                    <span>{channelData ? value_convertor(channelData.statistics.subscriberCount) : '1M'} Subscribers</span>
                </div>
                <SubscribeButton /> {/* Subscribe Button */}
            </div>

            {/* Video Description and Comments */}
            <div className='vid-description'>
                <p>{apiData ? apiData.snippet.description.slice(0, 250) : 'Description here'}</p>
                <hr />
                <h4>{apiData ? value_convertor(apiData.statistics.commentCount) : 102} Comments</h4>
                <div className='comment-section'>
                    {commentData.length > 0 ? (
                        commentData.map((comment, index) => (
                            <div key={index} className='comment'>
                                <img src={comment.snippet.topLevelComment.snippet.authorProfileImageUrl} alt='Comment Author' />
                                <div>
                                    <h3>
                                        {comment.snippet.topLevelComment.snippet.authorDisplayName}
                                        <span>{moment(comment.snippet.topLevelComment.snippet.publishedAt).fromNow()}</span>
                                    </h3>
                                    <p>{comment.snippet.topLevelComment.snippet.textDisplay}</p>
                                    <div className='comment-action'>
                                        <img src={like} alt='Like' /> <span>{value_convertor(comment.snippet.topLevelComment.snippet.likeCount)}</span>
                                        <img src={dislike} alt='Dislike' /> <span>{value_convertor(comment.snippet.topLevelComment.snippet.dislikeCount)}</span>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No comments available</p>
                    )}
                </div>
            </div>

            {/* Conditionally render StickyNotes based on showNotes state */}
            {showNotes && <StickyNotes
                videoId={videoId}
                initialNotes={''} // Pass initialNotes as needed
                onSave={handleSaveNotes} // Pass onSave function
            />}
            
            {/* Conditionally render Recommendation Section based on study mode */}
            {!isStudyModeOn && (
                <div className='recommendation-section'>
                    {/* Your recommendation section code here */}
                </div>
            )}
        </div>
    );
};

export default PlayVideo;
