import React from 'react';
// import logo from './logo.svg';
import './App.css';
import Main from './components/Main';
import { HashRouter } from 'react-router-dom';

function App() {
  return (
    <HashRouter>
      <Main/>
    </HashRouter>
  );
}

export default App;
