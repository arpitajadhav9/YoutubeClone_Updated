import React, { useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";

function RoomPage() {
    const { roomID } = useParams();
    const roomContainerRef = useRef(null);

    useEffect(() => {
        const myMeeting = async () => {
            const appID = 82918084;
            const serverSecret = "9ffdd94d6cc8353c475e35e16510bdb4";
            const userID = Date.now().toString(); // Unique user ID
            const userName = "Tanay"; // Replace with actual user name or generate dynamically
            const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomID, userID, userName);

            const zp = ZegoUIKitPrebuilt.create(kitToken);
            zp.joinRoom({
                container: roomContainerRef.current,
                scenario: {
                    mode: ZegoUIKitPrebuilt.VideoConference
                }
            });
        };

        myMeeting();
    }, [roomID]);

    return (
        <div className="roompage">
            <div ref={roomContainerRef} />
        </div>
    );
}

export default RoomPage;
