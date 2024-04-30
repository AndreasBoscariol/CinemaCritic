import React, { useState, useEffect } from 'react';
import readRSS from '../letterboxd/letterboxd_rss';  
import './main.css';

const Main = ({ username }) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        if (username) {
        const fetchData = async () => {
            try {
                const result = await readRSS(username);
                setData(result);
            } catch (error) {
                console.error('Failed to fetch RSS data:', error);
                setData([]); 
            }
        };
        fetchData();
    }
    }, [username]); 

    return (
        <div>
            <h1 id="textbox">How Bad Is Your Movie Taste? {username}</h1>
            <h2 id="textbox"> Our movie Artifical Intelligence will disect and roast your horrible taste in film.</h2>
                <ul>
                    {data.map((item, index) => (
                        <li key={index}>
                            <strong>Title:</strong> {item.title}
                            <br/>
                            <strong>Review:</strong> {item.review}
                        </li>
                    ))}
                </ul>

        </div>
    );
};

export default Main;
