import React, { useState } from 'react'; 
import Main from './components/main';
import InputFunction from './components/input';
import Footer from './components/footer';
import Poster from './components/poster';
import './App.css';


const App = () => {
  const [responses, setResponses] = useState([]);
    return (
    <div className="App">
      <Main />
      <InputFunction onResponsesUpdate={setResponses} />
      <div id="orange" className="stripe"></div>
      <div id="green" className="stripe"></div>
      <div id="blue" className="stripe"></div>
      <Poster response={responses} />
      <Footer />
    </div>
  );
};

export default App;
