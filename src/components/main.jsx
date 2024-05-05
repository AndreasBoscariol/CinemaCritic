import React, { useState, useEffect } from 'react';
import Typewriter from 'typewriter-effect';
import './main.css';

const Main = ({ responses = [] }) => {
    const [currentResponseIndex, setCurrentResponseIndex] = useState(0);

    useEffect(() => {
        if (currentResponseIndex < responses.length) {
            // Reset the index when all responses have been typed
            const timer = setTimeout(() => {
                setCurrentResponseIndex(currentResponseIndex + 1);
            }, responses[currentResponseIndex].description.length * 50 + 1000); // assuming 50 ms per character plus 1 second before starting next

            return () => clearTimeout(timer);
        }
    }, [currentResponseIndex, responses]);

    return (
        <div className="typewriter-container">
            {responses.length > 0 && currentResponseIndex < responses.length && (
                <div key={currentResponseIndex}>
                    <Typewriter
                        onInit={(typewriter) => {
                            typewriter.typeString(responses[currentResponseIndex].description)
                                .callFunction(() => {
                                    if (currentResponseIndex === responses.length - 1) {
                                        setCurrentResponseIndex(0); // Optionally reset to start or handle completion differently
                                    }
                                })
                                .start();
                        }}
                        options={{
                            delay: 50,
                            autoStart: true,
                            loop: false,
                        }}
                    />
                </div>
            )}
        </div>
    );
};

export default Main;
