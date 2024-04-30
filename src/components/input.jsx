import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import Main from './main';
import './input.css';

function InputFunction() {
    const [username, setUserName] = useState("");
    const [isVisible, setIsVisible] = useState(false);
    const [submit, setSubmit] = useState(false);
    const [showWelcome, setShowWelcome] = useState(true);
   
    const handleSubmit = (event) => {
        event.preventDefault();
        if (username.trim()) {
            setSubmit(true);
            setIsVisible(false);
            setShowWelcome(true);
        }
    };

    const toggleVisibility = () => {
        setIsVisible(!isVisible);
    };

    return (
        <div>
             {showWelcome && (
                <div>
                    <h1 id="textbox">How Bad Is Your Movie Taste?</h1>
                    <h2 id="textbox"> Our movie Artifical Intelligence will disect and roast your horrible taste in film.</h2>
                </div>
            )}
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
