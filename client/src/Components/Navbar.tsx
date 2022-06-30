import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { LoginContext } from '../Utils/Context';
import '../Styles/Navbar.css';

function Navbar({ user }: any) {
	const { loggedIn, setLoggedIn } = useContext(LoginContext as any);

	return (
		<div className='navBarContainer'>
			{loggedIn ? (
				<>
					<h3 className='welcome'>
						Welcome, {user?.firstName} {user?.lastName}
					</h3>
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
				</>
			) : (
				<div className='noLogin'>
					<Link to='/'>
						<button>Log in</button>
					</Link>
					<Link to='/register'>
						<button>Register</button>
					</Link>
				</div>
			)}
		</div>
	);
}

export default Navbar;
