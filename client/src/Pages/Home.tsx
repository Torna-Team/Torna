import React from 'react';
import '../Styles/Home.css';
import GoogleButton from 'react-google-button';

function Home() {
	return (
		<div className='form-container'>
			<form className='login-container'>
				<input type='text' name='email' placeholder='Insert your email' />
				<input
					type='password'
					name='password'
					placeholder='Insert your password'
				/>
				<button>Login</button>
			</form>
			<GoogleButton />
		</div>
	);
}

export default Home;
