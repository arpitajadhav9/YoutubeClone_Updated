import React, { useState } from 'react';
import './PlayVideo.css'; // Assuming the CSS is in App.css

const SubscribeButton = () => {
    const [subscribed, setSubscribed] = useState(false);
    const [showNotification, setShowNotification] = useState(false);

    const toggleSubscribe = () => {
        setSubscribed(!subscribed);
        if (!subscribed) {
            showNotificationPopup();
        }
    };

    const showNotificationPopup = () => {
        setShowNotification(true);
        setTimeout(() => {
            setShowNotification(false);
        }, 2000); // Hide after 2 seconds
    };

    return (
        <div>
            <button 
                className={`subscribe-btn ${subscribed ? 'subscribed' : ''}`} 
                onClick={toggleSubscribe}
            >
                {subscribed ? 'Subscribed' : 'Subscribe'}
            </button>
            {showNotification && (
                <div className="notification">You are now subscribed!</div>
            )}
        </div>
    );
};

export default SubscribeButton;
