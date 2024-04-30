import React from 'react'; 
import Main from './components/main';
import InputFunction from './components/input';
import Footer from './components/footer';
import './App.css';

const App = () => (
    <div className="App">
    <Main />
    <InputFunction />

    <div id="orange" class="stripe"></div>
    <div id="green" class="stripe"></div>
    <div id="blue" class="stripe"></div>
    <Footer />
  </div>
);

export default App;
