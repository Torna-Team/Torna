import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { LoginContext } from '../Utils/Context';
import '../Styles/Navbar.css';

function Navbar({ user }: any) {
	let { id } = useParams();
	const { loggedIn, setLoggedIn } = useContext(LoginContext as any);

	return (
		<div className='navBarContainer'>
			<h3 className='welcome'>
				Welcome, {user && (user.name ? user.name : user.firstName)}
			</h3>
			{loggedIn ? (
				<Link to='/'>
					<button
						className='logOutBtn'
						onClick={() => {
							sessionStorage.removeItem('user');
							setLoggedIn(false);
						}}
					>
						Log out
					</button>
				</Link>
			) : (
				<h1>You need to log in</h1>
			)}
		</div>
	);
}

export default Navbar;
