import React, { useState, useEffect, useCallback } from 'react';
import readRSS from '../letterboxd/letterboxd_rss';
import './main.css';
import axios from 'axios';
import Typewriter from 'typewriter-effect';

const Main = ({ username }) => {
    const [data, setData] = useState([]);
    const [fullResponse, setFullResponse] = useState("");  
    const [currentDisplay, setCurrentDisplay] = useState(""); 
    const [isLoading, setIsLoading] = useState(false);

    const sendToChatGPT = useCallback(async (rssData) => {
        setIsLoading(true);
        try {
            const promises = rssData.map(item => axios.post('http://localhost:8000/chat', {
                prompt: `${item.title} ${item.rating} ${item.review} You are a harsh movie critic. Write a sarcastic and mean quip making fun of the user about what they wrote. Make sure to provide the name of the movie you are making fun of to ensure proper context. Keep responses only up to 4 sentences.`
            }).then(response => `${response.data}\n`)
            .catch(error => {
                console.error('Failed to send data to ChatGPT:', error);
                return `Failed to process the data for entry.\n`; 
            }));
    
            const responses = await Promise.all(promises);
            setFullResponse(prev => prev + responses.join(''));
        } catch (error) {
            console.error('General error in sending data to ChatGPT:', error);
        }
        setIsLoading(false);
    }, []);

    useEffect(() => {
        setCurrentDisplay(fullResponse);
    }, [fullResponse]);

    const fetchData = useCallback(async () => {
        if (!username) return;
        setIsLoading(true);
        try {
            const result = await readRSS(username);
            setData(result);
            if (result.length > 0) {
                const responses = await sendToChatGPT(result);
                responses.forEach(response => {
                    setCurrentDisplay(prev => prev + response + '\n');
                });
            } else {
                setCurrentDisplay("");
            }
        } catch (error) {
            console.error('Failed to fetch RSS data:', error);
            setCurrentDisplay("");
        }
        setIsLoading(false);
    }, [username, sendToChatGPT]);

    useEffect(() => {
        let isMounted = true;
        fetchData().catch(console.error).then(() => {
            if (isMounted) setIsLoading(false);
        });
        return () => { isMounted = false; };
    }, [fetchData]);

    return (
        <div className="typewriter-container">
            {isLoading ? (
                <h2>Analyzing your Movie Taste...</h2>
            ) : (
                currentDisplay.trim() && (
                    <Typewriter
                        onInit={(typewriter) => {
                            typewriter.typeString(currentDisplay).start();
                        }}
                        options={{
                            delay: 50,
                            autoStart: true,
                            loop: false,
                        }}
                    />
                )
            )}
        </div>
    );
};

export default Main;
