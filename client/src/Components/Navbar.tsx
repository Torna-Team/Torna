import React, { useState, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { LoginContext } from '../Utils/Context';

function Navbar() {
	let { id } = useParams();
	const { loggedIn, setLoggedIn } = useContext(LoginContext as any);

	return (
		<>
			<div>Navbar of {id}</div>
			{loggedIn ? (
				<Link to='/'>
					<button onClick={() => setLoggedIn(false)}>log out</button>
				</Link>
			) : (
				<h1>You need to log in</h1>
			)}
		</>
	);
}

export default Navbar;
