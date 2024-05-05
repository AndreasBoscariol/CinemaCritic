import React, { useEffect } from 'react';
import Typewriter from 'typewriter-effect';
import './main.css';

const Main = ({ responses, currentResponseIndex, setCurrentResponseIndex }) => {
    useEffect(() => {
        console.log("Current Index: ", currentResponseIndex);
        console.log("Responses: ", responses);

        if (responses && responses.length > 0 && responses[currentResponseIndex]) {
            const currentResponse = responses[currentResponseIndex];
            console.log("Current Response: ", currentResponse);
            if (currentResponse && currentResponse.description && currentResponse.review !== "No review") {
                const delay = currentResponse.description.length * 50 + 1000;
                const timer = setTimeout(() => {
                    let nextIndex = (currentResponseIndex + 1) % responses.length;
                    while (responses[nextIndex].review === "No review" && nextIndex !== currentResponseIndex) {
                        nextIndex = (nextIndex + 1) % responses.length;
                    }
                    setCurrentResponseIndex(nextIndex);
                }, delay);

                return () => clearTimeout(timer);
            }
        }
    }, [currentResponseIndex, responses, setCurrentResponseIndex]);

    const currentResponse = responses && responses[currentResponseIndex];

    return (
        <div className="typewriter-container">
            {currentResponse && currentResponse.review !== "No review" && (
                <Typewriter
                    onInit={(typewriter) => {
                        typewriter.typeString(`${currentResponse.title}: ${currentResponse.description}`)
                            .callFunction(() => {
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
