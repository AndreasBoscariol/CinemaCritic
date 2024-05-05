import React, { useState, useCallback } from 'react';
import axios from 'axios';
import readRSS from '../letterboxd/letterboxd_rss';
import Loading from './loading';
import Main from './main';
import './input.css';

function InputFunction({ onResponsesUpdate }) {
    const [username, setUserName] = useState("");
    const [responses, setResponses] = useState([]);
    const [imageData, setImageData] = useState([]); 
    const [isLoading, setIsLoading] = useState(false);
    const [inputVisible, setInputVisible] = useState(true);
    const [textFieldVisible, setTextFieldVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    // Sends RSS data to ChatGPT and updates response state
    const sendToChatGPT = useCallback(async (rssData) => {
        try {
            const promises = rssData.map(item =>
                axios.post('http://localhost:8000/chat', {
                    prompt: `${item.title} ${item.rating} ${item.review} You are a harsh movie critic. Write a sarcastic and mean quip making fun of the user about what they wrote. Make sure to provide the name of the movie you are making fun of to ensure proper context. Keep responses only up to 4 sentences.`
                }).then(response => ({
                    imgSrc: item.imgSrc,
                    title: item.title,
                    description: response.data
                }))
                .catch(error => {
                    console.error('Failed to send data to ChatGPT:', error);
                    return { imgSrc: item.imgSrc, title: 'Error', description: 'Failed to process the data for this entry.' };
                })
            );

            const responses = await Promise.all(promises);
            setResponses(responses);
            onResponsesUpdate(responses);
        } catch (error) {
            console.error('General error in sending data to ChatGPT:', error);
        }
    }, [onResponsesUpdate]);

    // Fetches data and manages UI states based on the data availability
    const fetchData = useCallback(async () => {
        if (!username) return;
        
        try {
            setIsLoading(true);
            setInputVisible(false);
            setTextFieldVisible(false);

            const result = await readRSS(username);
            if (result.length > 0) {
                setErrorMessage("");
                setImageData(result.map(item => ({ imgSrc: item.imgSrc, title: item.title })));
                await sendToChatGPT(result);
            } else {
                setErrorMessage("Username not found.");
                setInputVisible(true);
                setTextFieldVisible(true);
            }
        } catch (error) {
            console.error('Failed to fetch RSS data:', error);
            setErrorMessage("Failed to fetch data. Please check your connection and try again.");
            setInputVisible(true);
            setTextFieldVisible(true);
        } finally {
            setIsLoading(false);
        }
    }, [username, sendToChatGPT]);

    const handleInitialClick = () => setTextFieldVisible(true);

    const handleButtonClick = () => fetchData();
    
    return (
        <div>
            {inputVisible && (
                <>
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
                </>
            )}
            {isLoading && <Loading />}
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            {!inputVisible && <Main responses={responses} imageData={imageData} />}
        </div>
    );
}

export default InputFunction;
