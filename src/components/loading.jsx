import React from 'react';
import './loading.css'; 

function Loading() {
    return (
        <div className='loading-container'>
            <h2>Loading, please wait...</h2>
            <span className="loader"></span>
        </div>
        
    );
}

export default Loading;
