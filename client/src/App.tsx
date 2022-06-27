import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import Register from './Pages/Register';
import Profile from './Pages/Profile';

type UserId = string;
type UserMail = string;
type UserName = string;

function App() {
	const [userId, setUserId] = React.useState<UserId>('');
	const [userMail, setUserMail] = React.useState<UserMail>('');
	const [userName, setUserName] = React.useState<UserName>('');
	return (
		<Router>
			<Routes>
				<Route
					path='/'
					element={
						<Home
							setUserId={setUserId}
							setUserMail={setUserMail}
							setUserName={setUserName}
							userId={userId}
							userMail={userMail}
							userName={userName}
						/>
					}
				/>
				<Route path='/register' element={<Register />} />
				<Route path='/profile/:id' element={<Profile />} />
			</Routes>
		</Router>
	);
}

export default App;
