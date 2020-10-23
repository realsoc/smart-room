import React from 'react';
import logo from './logo.svg';
import './App.css';
import AppBar from './components/AppBar.js';
import Slide from './components/Slide.js';
import Controls from './components/Controls.js';

function App() {
  return (
    <div className="App">
        <AppBar/>
        <Controls/>
        <Slide/>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
