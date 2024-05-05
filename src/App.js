import React, { useState } from 'react'; 
import Main from './components/main';
import InputFunction from './components/input';
import Footer from './components/footer';
import Poster from './components/poster';
import './App.css';

const App = () => {
    const [responses, setResponses] = useState([]);
    const [currentResponseIndex, setCurrentResponseIndex] = useState(0); // Added state for tracking current poster

    return (
        <div className="App">
            <Main responses={responses} currentResponseIndex={currentResponseIndex} />
            <InputFunction onResponsesUpdate={setResponses} />
            <div id="orange" className="stripe"></div>
            <div id="green" className="stripe"></div>
            <div id="blue" className="stripe"></div>
            <Poster response={responses} currentIndex={currentResponseIndex} />
            <Footer />
            <button onClick={() => setCurrentResponseIndex((currentResponseIndex + 1) % responses.length)}>Next Poster</button>
        </div>
    );
};

export default App;
