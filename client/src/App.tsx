import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import Register from './Pages/Register';
import Profile from './Pages/Profile';
import ErrorPage from './Pages/ErrorPage';
import { LoginContext } from './Utils/Context';

type UserId = string;
type UserMail = string;
type UserName = string;
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
					{/* <Route path='/album/:id' element={<Album />} /> */}
					<Route path='*' element={<ErrorPage />} />
				</Routes>
			</Router>
		</LoginContext.Provider>
	);
}

export default App;
