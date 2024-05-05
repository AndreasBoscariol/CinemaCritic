import React, { useState, useCallback } from 'react';
import axios from 'axios';
import readRSS from '../letterboxd/letterboxd_rss';
import Loading from './loading';
import Main from './main';
import './input.css';

const API_URL = 'http://localhost:8000/chat';

const InputFunction = ({ onResponsesUpdate }) => {
    const [username, setUserName] = useState("");
    const [responses, setResponses] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [inputVisible, setInputVisible] = useState(true);
    const [textFieldVisible, setTextFieldVisible] = useState(false);
    const [animateOut, setAnimateOut] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const sendToChatGPT = useCallback(async (rssData) => {
        try {
            const promises = rssData.map(async (item) => {
                try {
                    const response = await axios.post(API_URL, {
                        prompt: `${item.title} ${item.rating} ${item.review} You are a harsh movie critic. Write a sarcastic and mean quip making fun of the user about what they wrote. Make sure to provide the name of the movie you are making fun of to ensure proper context. Keep responses only up to 4 sentences.`
                    });
                    return {
                        imgSrc: item.imgSrc,
                        title: item.title,
                        description: response.data
                    };
                } catch (error) {
                    console.error('Failed to send data to ChatGPT:', error);
                    return {
                        imgSrc: item.imgSrc,
                        title: 'Error',
                        description: 'Failed to process the data for this entry.'
                    };
                }
            });

            const updatedResponses = await Promise.all(promises);
            setResponses(updatedResponses);
            onResponsesUpdate(updatedResponses);
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
