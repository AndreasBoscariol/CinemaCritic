import React, { useState, useEffect } from 'react';
import readRSS from '../letterboxd/letterboxd_rss';  


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
            <h1>Data for User: {username}</h1>
            {data.length > 0 ? (
                <ul>
                    {data.map((item, index) => (
                        <li key={index}>
                            <strong>Title:</strong> {item.title}
                            <br/>
                            <strong>Review:</strong> {item.review}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No data available or failed to fetch data.</p>
            )}
        </div>
    );
};

export default Main;
