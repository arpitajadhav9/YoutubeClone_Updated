// // import React, { useEffect, useRef, useState } from 'react';
// // import { ZegoExpressEngine } from 'zego-express-engine-webrtc';
// // import { Link } from 'react-router-dom';
// // import './Watchparty.css';

// // const appID = 82918084; // Replace with your ZEGOCLOUD app ID
// // const server = 'wss://webliveroom82918084-api.coolzcloud.com/ws'; // Replace with your ZEGOCLOUD server address
// // const token = "04AAAAAGag0XkAEHhveDF1YXh1bWlqeHlyMWIAoFNK0Njp2yNYdGX0gfi55L87In3ahZ7J/TfYPiwN9Y2SnrQQGJYbCFpHwd4oritwoQFMRzctn1Qz9CL8oOc/a4zg66WlQPHM/Q2AF4w+IOq/wvc3N91te215dKy/qrkfnOeDeeztqm91Z7nymuK8aL6TV0d8TUafKfkxowxiUYRoPNmcPGUidK7KOa1+tsFzHIFXoubBft0GZCufgbhYfMY="; // Replace with your ZEGOCLOUD token
// // const userID = 'ABC' + new Date().getTime(); // Generate a unique user ID
// // const userName = 'Tanay' + new Date().getTime(); // Generate a unique user name

// // const WatchParty = ({ roomID }) => {
// //   const [isJoined, setIsJoined] = useState(false);
// //   const localStreamRef = useRef(null);
// //   const remoteStreamRef = useRef(null);
// //   const zegoClient = useRef(null);

// //   useEffect(() => {
// //     // Initialize ZEGOCLOUD SDK
// //     zegoClient.current = new ZegoExpressEngine(appID, server);

// //     // Set event listeners
// //     zegoClient.current.on('roomStateUpdate', (roomID, state) => {
// //       console.log('Room state update:', roomID, state);
// //     });

// //     zegoClient.current.on('playerStateUpdate', (streamID, state) => {
// //       console.log('Player state update:', streamID, state);
// //     });

// //     zegoClient.current.on('publisherStateUpdate', (streamID, state) => {
// //       console.log('Publisher state update:', streamID, state);
// //     });

// //     zegoClient.current.on('roomStreamUpdate', async (roomID, updateType, streamList) => {
// //       console.log('Room stream update:', roomID, updateType, streamList);
// //       if (updateType === 'ADD') {
// //         for (const stream of streamList) {
// //           const remoteStream = await zegoClient.current.startPlayingStream(stream.streamID);
// //           if (remoteStream) {
// //             remoteStreamRef.current.srcObject = remoteStream;
// //           }
// //         }
// //       } else if (updateType === 'DELETE') {
// //         for (const stream of streamList) {
// //           zegoClient.current.stopPlayingStream(stream.streamID);
// //           if (remoteStreamRef.current.srcObject?.id === stream.streamID) {
// //             remoteStreamRef.current.srcObject = null;
// //           }
// //         }
// //       }
// //     });

// //     return () => {
// //       // Clean up
// //       zegoClient.current.off('roomStateUpdate');
// //       zegoClient.current.off('playerStateUpdate');
// //       zegoClient.current.off('publisherStateUpdate');
// //       zegoClient.current.off('roomStreamUpdate');
// //       zegoClient.current.destroy();
// //     };
// //   }, []);

// //   const joinRoom = async () => {
// //     try {
// //       await zegoClient.current.loginRoom(roomID, token, { userID, userName });
// //       setIsJoined(true);
// //       const localStream = await zegoClient.current.createStream();
// //       localStreamRef.current.srcObject = localStream;
// //       await zegoClient.current.startPublishingStream(userID, localStream);
// //     } catch (error) {
// //       console.error('Error joining room:', error);
// //     }
// //   };

// //   const leaveRoom = async () => {
// //     try {
// //       await zegoClient.current.stopPublishingStream(userID);
// //       await zegoClient.current.logoutRoom(roomID);
// //       setIsJoined(false);
// //       if (localStreamRef.current.srcObject) {
// //         localStreamRef.current.srcObject.getTracks().forEach(track => track.stop());
// //         localStreamRef.current.srcObject = null;
// //       }
// //       if (remoteStreamRef.current.srcObject) {
// //         remoteStreamRef.current.srcObject.getTracks().forEach(track => track.stop());
// //         remoteStreamRef.current.srcObject = null;
// //       }
// //     } catch (error) {
// //       console.error('Error leaving room:', error);
// //     }
// //   };

// //   return (
// //     <div className="watch-party">
// //       <div className="watch-party-header">
// //         <h2>Watch Party</h2>
// //         <Link to="/">Home</Link>
// //       </div>
// //       <div className="watch-party-content">
// //         {isJoined ? (
// //           <>
// //             <video ref={localStreamRef} autoPlay muted></video>
// //             <video ref={remoteStreamRef} autoPlay></video>
// //             <button onClick={leaveRoom}>Leave Room</button>
// //           </>
// //         ) : (
// //           <button onClick={joinRoom}>Join Room</button>
// //         )}
// //       </div>
// //     </div>
// //   );
// // };


///////////////////////////////////////////////
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './Watchparty.css';
// import bgvideo from './watchanimation.mp4';

// function WatchParty() {
//     const [roomCode, setRoomCode] = useState('');
//     const navigate = useNavigate();

//     const handleFormSubmit = (ev) => {
//         ev.preventDefault();
//         navigate(`/meet/${roomCode}`);
//     };

//     return (
//         <div className="home-page">
//             <video src={bgvideo} className='bg-video' autoPlay loop muted />
//             <form onSubmit={handleFormSubmit} className="form">
//                 <div className="form-content">
//                     <label>
//                         <h1>Enter Room Code</h1></label>
//                     <input 
//                         value={roomCode} 
//                         onChange={e => setRoomCode(e.target.value)} 
//                         required 
//                         placeholder="Enter the room code" 
//                     />
//                     <button type="submit">Enter the room</button>
//                 </div>
//             </form>
//         </div>
//     );
// }

// export default WatchParty;
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Watchparty.css';
import bgvideo from './watchanimation.mp4';

function WatchParty() {
    const [roomCode, setRoomCode] = useState('');
    const navigate = useNavigate();

    const handleFormSubmit = (ev) => {
        ev.preventDefault();
        navigate(`/meet/${roomCode}`);
    };

    return (
        <div className="watch-party-home">
            <video src={bgvideo} className='watch-party-bg-video' autoPlay loop muted />
            <form onSubmit={handleFormSubmit} className="watch-party-form">
                <div className="watch-party-form-content">
                    <label>
                        <h1>Enter Room Code</h1></label>
                    <input 
                        className="watch-party-input"
                        value={roomCode} 
                        onChange={e => setRoomCode(e.target.value)} 
                        required 
                        placeholder="Enter the room code" 
                    />
                    <button type="submit" className="watch-party-button">Enter the room</button>
                </div>
            </form>
        </div>
    );
}

export default WatchParty;
