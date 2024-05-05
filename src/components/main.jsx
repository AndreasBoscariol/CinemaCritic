import React, { useEffect } from 'react';
import Typewriter from 'typewriter-effect';
import './main.css';

const Main = ({ responses, currentResponseIndex, setCurrentResponseIndex }) => {
    useEffect(() => {
        if (responses.length > 0 && currentResponseIndex < responses.length) {
            // Calculate delay based on the length of the current response
            const delay = responses[currentResponseIndex].description.length * 50 + 1000;
            const timer = setTimeout(() => {
                // Advance to the next response or loop back to the start
                const nextIndex = (currentResponseIndex + 1) % responses.length;
                setCurrentResponseIndex(nextIndex);
            }, delay);

            // Cleanup the timer on component unmount
            return () => clearTimeout(timer);
        }
    }, [currentResponseIndex, responses, setCurrentResponseIndex]);

    return (
        <div className="typewriter-container">
            {responses.length > 0 && currentResponseIndex < responses.length && (
                <Typewriter
                    onInit={(typewriter) => {
                        typewriter.typeString(responses[currentResponseIndex].description)
                            .callFunction(() => {
                                // Optionally reset to start after last response
                                if (currentResponseIndex === responses.length - 1) {
                                    setCurrentResponseIndex(0); 
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
            )}
        </div>
    );
};

export default Main;
