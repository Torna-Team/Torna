import Navbar from '../Components/Navbar';
import React, { useState, useContext, useEffect } from 'react';
import { LoginContext } from '../Utils/Context';
import { useParams } from 'react-router-dom';

function Profile() {
	const { loggedIn, setLoggedIn } = useContext(LoginContext as any);
	const [user, setUser] = useState<any>();
	useEffect(() => {
		if (sessionStorage && sessionStorage.getItem('user')) {
			const res = JSON.parse(sessionStorage.getItem('user') as string);
			setUser(res);
			setLoggedIn(true);
		}
	}, []);

	let { id } = useParams();
	return (
		<>
			<Navbar />
			<div>
				{loggedIn ? (
					<>
						<h4>Welcome, {user && (user.name ? user.name : user.firstName)}</h4>
					</>
				) : (
					<h3>You need to log in</h3>
				)}
				<div>PROFILE of {id}</div>
			</div>
		</>
	);
}

export default Profile;
