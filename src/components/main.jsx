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
        try {
            const response = await axios.post('http://localhost:8000/chat', { prompt: rssData });
            setResponse(response.data);
        } catch (error) {
            console.error('Failed to send data to ChatGPT:', error);
            setResponse("Failed to process the data.");
        }
    };

    return (
        <div>
            <h2>{response}</h2>
        </div>
    );
};

export default Main;
