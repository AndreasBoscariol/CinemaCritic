import React, { useState, useEffect } from 'react';
import Typewriter from 'typewriter-effect';
import './main.css';

const Main = ({ responses, currentResponseIndex, setCurrentResponseIndex, setFullScreen }) => {
    const [showButton, setShowButton] = useState(false);
    const [typewriterKey, setTypewriterKey] = useState(0); // Add a key to force re-render Typewriter
    const [continueTyping, setContinueTyping] = useState(true); // Control the continuation of typing

    useEffect(() => {
        console.log("Current Index: ", currentResponseIndex);
        console.log("Responses: ", responses);

        if (responses && responses.length > 0 && responses[currentResponseIndex]) {
            const currentResponse = responses[currentResponseIndex];
            console.log("Current Response: ", currentResponse);
            console.log("Current Response Review: ", currentResponse.review);
            if (currentResponse && currentResponse.description && currentResponse.review !== "No review") {
                const delay = currentResponse.description.length * 50 + 1000;
                setTimeout(() => {
                    if (currentResponseIndex < responses.length - 1) {
                        setShowButton(true); // Show the button after the response is displayed
                    } else {
                        setContinueTyping(false); // Stop the Typewriter effect
                        setFullScreen(true); // Trigger fullscreen
                    }
                }, delay);
            }
        }
    }, [currentResponseIndex, responses, setFullScreen]);

    const handleNextResponse = () => {
        let nextIndex = (currentResponseIndex + 1) % responses.length;
        while (responses[nextIndex].review === "No review" && nextIndex !== currentResponseIndex) {
            nextIndex = (nextIndex + 1) % responses.length;
        }
        setCurrentResponseIndex(nextIndex);
        setShowButton(false); // Hide the button after it's clicked
        setTypewriterKey(prevKey => prevKey + 1); // Increment key to force re-render Typewriter
    };

    const currentResponse = responses && responses[currentResponseIndex];

    return (
        <div className="typewriter-container">
            {currentResponse && currentResponse.review !== "No review" && continueTyping && (
                <Typewriter
                    key={typewriterKey} // Use key to force re-render on index change
                    onInit={(typewriter) => {
                        typewriter.typeString(currentResponse.description)
                            .start();
                    }}
                    options={{
                        delay: 50,
                        autoStart: true,
                        loop: false,
                    }}
                />
            )}
            {!continueTyping && currentResponse && (
                <div className="typewriter-final">
                    {currentResponse.description}
                </div>
            )}
            {showButton && (
                <button id="conversation" onClick={handleNextResponse} className="next-button">Next Response</button>
            )}
        </div>
    );
};

export default Main;
