import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { LoginContext, LoginContextType } from '../Utils/Context';
import '../Styles/Navbar.css';
import { User } from '../Services/Server-Client';
import tornaLogo from '../images/tornalogo.png';

interface Props {
	user: User;
}

function Navbar({ user }: Props) {
	const { loggedIn, setLoggedIn } = useContext<LoginContextType>(LoginContext);

	return (
		<div className='navBarContainer'>
			<img className='navBarLogo' src={tornaLogo} alt='logo'></img>
			{loggedIn ? (
				<div className='welcomeContainer'>
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
				</div>
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
