import Navbar from '../Components/Navbar';
import React, { useState, useContext, useEffect } from 'react';
import { LoginContext } from '../Utils/Context';
import { useParams } from 'react-router-dom';
import '../Styles/Profile.css';

function Profile() {
	let { id } = useParams();
	const { loggedIn, setLoggedIn } = useContext(LoginContext as any);
	const [user, setUser] = useState<any>();

	useEffect(() => {
		if (sessionStorage && sessionStorage.getItem('user')) {
			const res = JSON.parse(sessionStorage.getItem('user') as string);
			setUser(res);
			setLoggedIn(true);
		}
	}, [loggedIn]);

	return (
		<div className='mainContainer'>
			<Navbar user={user} />
			<div className='albumsContainer'>
				{loggedIn ? (
					<>
						<h4>
							{user && user.albums && user.albums.length !== 0 ? (
								user.albums.map((el: any) => {
									return <h1>{el.title}</h1>;
								})
							) : (
								<p>You don't have albums yet</p>
							)}
						</h4>
					</>
				) : (
					<h3>Log in to see your albums or to create a new one </h3>
				)}
			</div>
		</div>
	);
}

export default Profile;
