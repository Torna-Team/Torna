import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import TrialPage from './Pages/trialPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<TrialPage />} />
      </Routes>
    </Router>
  );
}

export default App;
