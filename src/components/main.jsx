import React from 'react';
import Typewriter from 'typewriter-effect';
import './main.css';

const Main = ({ responses = "" }) => {
    return (
        <div className="typewriter-container">
            {responses.trim() && (
                <Typewriter
                    onInit={(typewriter) => {
                        typewriter.typeString(responses).start();
                    }}
                    options={{
                        delay: 50,
                        autoStart: true,
                        loop: false,
                    }}
                />
            )}
        </div>
    );
};

export default Main;
