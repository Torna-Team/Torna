import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home/Home';
import Register from './Pages/Register/Register';
import Profile from './Pages/Profile/Profile';
import ErrorPage from './Pages/ErrorPage/ErrorPage';
import { LoginContext } from './Services/Context';
import Canvas from './Pages/Canvas/Canvas';
import Viewer from './Components/Viewer/Viewer';
import './';

type loggedIn = boolean;

function App() {
  const [loggedIn, setLoggedIn] = React.useState<loggedIn>(false);

  return (
    <LoginContext.Provider value={{ loggedIn, setLoggedIn }}>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/register' element={<Register />} />
          <Route path='/profile/:id' element={<Profile />} />
          <Route path='/album/:id/edit' element={<Canvas />} />
          <Route path='/album/:id' element={<Canvas />} />
          <Route path='/album/:id/view' element={<Viewer />} />
          <Route path='*' element={<ErrorPage />} />
        </Routes>
      </Router>
    </LoginContext.Provider>
  );
}

export default App;
