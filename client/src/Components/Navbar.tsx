import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { LoginContext } from '../Utils/Context';

function Navbar({ user }: any) {
	let { id } = useParams();
	const { loggedIn, setLoggedIn } = useContext(LoginContext as any);

	return (
		<>
			<div>Navbar of {user && (user.name ? user.name : user.firstName)}</div>
			{loggedIn ? (
				<Link to='/'>
					<button
						onClick={() => {
							sessionStorage.removeItem('user');
							setLoggedIn(false);
						}}
					>
						log out
					</button>
				</Link>
			) : (
				<h1>You need to log in</h1>
			)}
		</>
	);
}

export default Navbar;
