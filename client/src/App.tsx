import './App.css';
import React from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Home from './Pages/Home';

import Canvas from './Components/Canvas';
import GifPicker from './Components/AnimatedText';

function App() {
  return (
    <div className='App'>
      {/* <Canvas></Canvas> */}
      <GifPicker />
    </div>
  );
}

export default App;
