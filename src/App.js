import React from 'react'; 
import Main from './components/main';
import InputFunction from './components/input';
import Footer from './components/footer';
import './App.css';
import Poster from './components/poster';

const App = () => (
    <div className="App">
    <Main />
    <InputFunction />

    <div id="orange" className="stripe"></div>
    <div id="green" className="stripe"></div>
    <div id="blue" className="stripe"></div>
    <Poster />
    <Footer />
  </div>
);

export default App;
