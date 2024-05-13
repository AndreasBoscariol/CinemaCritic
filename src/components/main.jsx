import React, { useRef, useState, useEffect, useCallback } from 'react';
import Typewriter from 'typewriter-effect';
import './main.css';

const Main = ({ responses, currentResponseIndex, setCurrentResponseIndex, setFullScreen }) => {
    const [showButton, setShowButton] = useState(false);
    const [continueTyping, setContinueTyping] = useState(true);
    const [endText, setEndText] = useState('');
    const [displayedResponses, setDisplayedResponses] = useState([]); 
    const [currentTyping, setCurrentTyping] = useState(''); 
    const [isInitialLoad, setIsInitialLoad] = useState(true);  
    const bottomRef = useRef(null); 

    useEffect(() => {
        if (responses.length > 0) {
            setIsInitialLoad(false);  // Set to false once responses are confirmed to be loaded
        }
    }, [responses]);

    useEffect(() => {
        if (bottomRef.current) {
            bottomRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [displayedResponses, showButton]);   
    
    const calculateStats = useCallback(() => {
        const lastMonth = new Date();
        lastMonth.setMonth(lastMonth.getMonth() - 1);
        let sumRatings = 0;
        let countRatings = 0;
        let countReviews = 0;

        responses.forEach(response => {
            const watchedDate = new Date(response.watchedDate);
            if (watchedDate > lastMonth) {
                if (response.rating !== "No rating") {
                    sumRatings += parseFloat(response.rating);
                    countRatings++;
                }
                if (response.review !== "No review") {
                    countReviews++;
                }
            }
        });

        const averageRating = countRatings > 0 ? (sumRatings / countRatings).toFixed(1) : "No ratings";
        const statsText = `In the last month, you watched ${countReviews} movies, posted ${countReviews} reviews, and the average rating was ${averageRating}.`;
        setEndText('Overall, your taste is pretty... meh. Here are some stats: \n' + statsText);
    }, [responses]);

    const endScreen = useCallback(() => {
        setContinueTyping(false);
        setFullScreen(true);
        calculateStats();
    }, [setFullScreen, calculateStats]);

    useEffect(() => {
        if (responses && responses.length > 0 && responses[currentResponseIndex]) {
            const currentResponse = responses[currentResponseIndex];
            if (currentResponse && currentResponse.description && currentResponse.review !== "No review") {
                const delay = currentResponse.description.length * 100 + 1000;
                setTimeout(() => {
                    if (currentResponseIndex < responses.length - 1) {
                        setShowButton(true);
                    } else {
                        endScreen();
                    }
                }, delay);
            }
        }
    }, [currentResponseIndex, responses, endScreen, setFullScreen]);

    const handleNextResponse = () => {
        let nextIndex = (currentResponseIndex + 1) % responses.length;
        while (responses[nextIndex].review === "No review" && nextIndex !== currentResponseIndex) {
            nextIndex = (nextIndex + 1) % responses.length;
        }
        setShowButton(false); // Reset button state first if needed
        setCurrentResponseIndex(nextIndex);
        setCurrentTyping(responses[nextIndex].description);
        setDisplayedResponses([...displayedResponses, currentTyping + '\n\n']);
    };
    

    const currentResponse = responses && responses[currentResponseIndex];

    useEffect(() => {
        if (currentResponse && currentResponse.review !== "No review") {
            setCurrentTyping(currentResponse.description);
        }
    }, [currentResponse]);

    return (
        <div>
            {!isInitialLoad && (
                <div className="typewriter-container">
                    {continueTyping ? (
                        <>
                            {displayedResponses.map((response, index) => (
                                <div key={index} className="response static-response">
                                    {response.split('\n').map((line, index) => (
                                        <React.Fragment key={index}>
                                            {line}
                                            <br />
                                        </React.Fragment>
                                    ))}
                                </div>
                            ))}
                            {currentTyping && (
                                <Typewriter
                                    key={currentResponseIndex}
                                    onInit={(typewriter) => {
                                        typewriter.typeString(currentTyping)
                                            .callFunction(() => {
                                                setShowButton(true); 
                                            })
                                            .start();
                                    }}
                                    options={{
                                        delay: 40,
                                        autoStart: true,
                                        loop: false,
                                    }}
                                />
                            )}
                            {showButton && (
                                <button id="conversation" onClick={handleNextResponse} className="next-button">Next Response</button>
                            )}
                             <div ref={bottomRef} /> {}
                        </>
                    ) : (
                        <Typewriter
                            key={currentResponseIndex + 1}
                            onInit={(typewriter) => {
                                typewriter.typeString(endText)
                                    .start();
                            }}
                            options={{
                                delay: 40,
                                autoStart: true,
                                loop: false,
                            }}
                        />
                    )}
                </div>
            )}
        </div>
    );
    
};

export default Main;