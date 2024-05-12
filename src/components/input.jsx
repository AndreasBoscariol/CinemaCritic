import React, { useState, useCallback } from 'react';
import axios from 'axios';
import readRSS from '../letterboxd/letterboxd_rss';
import Loading from './loading';
import Main from './main';
import './input.css';

const API_URL = 'https://pxfyjv7jvi.execute-api.us-east-2.amazonaws.com/default/cinemacritic4168fac2-dev';

const InputFunction = ({ onResponsesUpdate }) => {
    const [username, setUserName] = useState("");
    const [responses, setResponses] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [inputVisible, setInputVisible] = useState(true);
    const [textFieldVisible, setTextFieldVisible] = useState(false);
    const [animateOut, setAnimateOut] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

    const sendToChatGPT = useCallback(async (rssData) => {
        try {
            const responses = [];
            for (const item of rssData) {
                let description = "";
                try {
                    if (item.review !== "No review") {
                        await delay(10); // Delay of 10 milliseconds between requests
                        const response = await axios.post(API_URL, {
                            prompt: `${item.title} ${item.review} You are a harsh movie critic. Write a sarcastic and mean quip making fun of the user about what they wrote. Make sure to provide the name of the movie you are making fun of to ensure proper context. Keep responses only up to 4 sentences.`
                        });
                        description = response.data.message;
                    }
                } catch (error) {
                    console.error('Failed to send data to ChatGPT:', error);
                    description = 'Failed to process the data for this entry.';
                }
                responses.push({
                    imgSrc: item.imgSrc,
                    title: item.title,
                    review: item.review,
                    rating: item.rating,
                    watchedDate: item.watchedDate,
                    description: description
                });
            }
            setResponses(responses);
            onResponsesUpdate(responses);
        } catch (error) {
            console.error('General error in sending data to ChatGPT:', error);
        }
    }, [onResponsesUpdate]);
    

    const fetchData = useCallback(async () => {
        if (!username) return;

        try {
            const result = await readRSS(username);
            if (result.length > 0) {
                setErrorMessage("");
                handleFadeOut();
                setTimeout(() => setIsLoading(true), 500);
                await sendToChatGPT(result);
            } else {
                setErrorMessage("Username not found.");
            }
        } catch (error) {
            console.error('Failed to fetch RSS data:', error);
            setErrorMessage("Failed to fetch data. Please check your connection and try again.");
        } finally {
            setIsLoading(false);
        }
    }, [username, sendToChatGPT]);

    const handleInitialClick = () => setTextFieldVisible(true);
    const handleButtonClick = () => fetchData();

    const handleFadeOut = () => {
        setAnimateOut(true);
        setTimeout(() => {
            setInputVisible(false);
            setTextFieldVisible(false);
        }, 500);
    };

    return (
        <div>
            {inputVisible && (
                <div className={`animate-input ${animateOut ? 'fadeOut' : ''}`}>
                    <div>
                        <h1 id="textbox">How Bad Is Your Movie Taste?</h1>
                        <h2 id="textbox">Our movie Artificial Intelligence will dissect and roast your horrible taste in film.</h2>
                    </div>
                    <button onClick={textFieldVisible ? handleButtonClick : handleInitialClick}>
                        {textFieldVisible && username ? "Submit" : "Get Started"}
                    </button>
                    {textFieldVisible && (
                        <div className="animate-input">
                            <input
                                placeholder='Enter your Letterboxd username...'
                                type="text"
                                value={username}
                                onChange={(e) => setUserName(e.target.value)}
                                autoFocus
                            />
                        </div>
                    )}
                </div>
            )}
            {isLoading && <Loading />}
            {errorMessage && <h2 className="error-message">{errorMessage}</h2>}
            {!inputVisible && <Main responses={responses} />}
        </div>
    );
};

export default InputFunction;
