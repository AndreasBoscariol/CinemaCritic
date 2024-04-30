import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import Main from './main';
import './input.css';

function InputFunction() {
    const [username, setUserName] = useState("");
    const [isVisible, setIsVisible] = useState(false);
    const [submit, setSubmit] = useState(false);
   
    const handleSubmit = (event) => {
        event.preventDefault();
        alert('A name was submitted: ' + username);
        if (username.trim()) {
            setSubmit(true);
        }
    };

    const toggleVisibility = () => {
        setIsVisible(!isVisible);
    };

    return (
        <div>
            <button onClick={toggleVisibility}>Get Started</button>
            {isVisible && (
                <div className="animate-input">
                    <form onSubmit={handleSubmit}>
                        
                        <input
                            placeholder='Enter your Letterboxd username...'
                            type="text"
                            value={username}
                            onChange={(e) => setUserName(e.target.value)}
                        />
                    </form>
                </div>
            )}
            {submit && <Main username={username} />}
        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<InputFunction />);

export default InputFunction;
