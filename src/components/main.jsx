import React, { useState, useEffect } from 'react';
import readRSS from '../letterboxd/letterboxd_rss';  
import './main.css';
import axios from 'axios';

const Main = ({ username }) => {
    const [data, setData] = useState([]);
    const [response, setResponse] = useState("");

    useEffect(() => {

        const fetchData = async () => {
            try {
                const result = await readRSS(username);
                setData(result);
                if (result.length > 0) {
                    sendToChatGPT(result);
                } else {
                    setResponse("Letterboxd User not found. Please try again.");
                }
            } catch (error) {
                console.error('Failed to fetch RSS data:', error);
                setResponse("Failed to fetch the data.");
            }
        };
        if (username) {
        fetchData();
        }
    }, [username]); 

    const sendToChatGPT = async (rssData) => {
        for(let i = 0; i < rssData.length; i++){
            try {
                console.log(rssData[i].review);
                const response = await axios.post('http://localhost:8000/chat', { prompt: rssData[i].title +rssData[i].rating+rssData[i].review +"You are a harsh movie critic. You will be provided with a movie a user has watched and the rating they gave it, if they have rated it. Write a sarcastic and mean quip making fun of the user about what they wrote. "});
                setResponse(response.data);
            } catch (error) {
                console.error('Failed to send data to ChatGPT:', error);
                setResponse("Failed to process the data.");
            }
        }
       
    };

    return (
        <div>
            <h2>{response}</h2>
        </div>
    );
};

export default Main;
