import React, { useContext, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../Styles/Home.css';
import GoogleButton from 'react-google-button';
import { auth } from '../Services/Firebase';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { login, getUser, User } from '../Services/Server-Client';
import { LoggingUser } from '../Services/Server-Client';
import { LoginContext } from '../Utils/Context';

// type LoginProps = {
// 	setUserId: React.Dispatch<React.SetStateAction<string>>;
// 	setUserMail: React.Dispatch<React.SetStateAction<string>>;
// 	setUserName: React.Dispatch<React.SetStateAction<string>>;
// 	userId: string;
// 	userMail: string;
// 	userName: string;
// };

const Home = () => {
	const { loggedIn, setLoggedIn } = useContext(LoginContext as any);
	const navigate = useNavigate();

	const onSubmitHandler = async (event: React.FormEvent) => {
		event.preventDefault();
		const target = event.target as typeof event.target & {
			email: { value: string };
			password: { value: string };
		};
		const email: string = target.email.value;
		const password: string = target.password.value;

		const user = {
			email: email,
			password: password,
		};
		const logged = await login(user as LoggingUser);
		console.log(logged);
		if (logged && (logged as any).id === undefined) {
			alert('Invalid Email or Password');
		} else {
			sessionStorage.setItem('user', JSON.stringify(logged));
			navigate(`/profile/${(logged as unknown as any).id}`);
		}
	};

	const checkExistingUser = async (displayName: string, email: string) => {
		if (displayName && email) {
			const result = await getUser(displayName, email);
			console.log(result);
			return result;
		}
	};

	const signInWithGoogle = async () => {
		try {
			const provider = new GoogleAuthProvider();
			const result = await signInWithPopup(auth, provider);

			const googleUserName = result.user.displayName;
			const googleUserMail = result.user.email;

			if (googleUserName && googleUserMail) {
				const user = await checkExistingUser(googleUserName, googleUserMail);

				if (user) {
					sessionStorage.setItem('user', JSON.stringify(user));
					setLoggedIn(true);
					navigate(`/profile/${(user as unknown as User).id}`);
				} else throw new Error();
			}
		} catch (error) {
			alert('Error, try again');
			console.log(error);
		}
	};

	return (
		<div className='form-container'>
			<div>Sign in</div>
			<form className='login-container' onSubmit={onSubmitHandler}>
				<label className='signInLabel'>Email</label>
				<input
					required
					className='signInInput'
					type='text'
					name='email'
					placeholder='Insert your email'
				/>
				<label className='signInLabel'>Password</label>
				<input
					required
					className='signInInput'
					type='password'
					name='password'
					placeholder='Insert your password'
				/>
				<button className='signInBtn' onClick={() => setLoggedIn(true)}>
					Sign In
				</button>
			</form>
			<GoogleButton className='googleBtn' onClick={signInWithGoogle} />
			<p>
				Don't have an account?
				<Link to='/register'>Sign up</Link>
			</p>
		</div>
	);
};

export default Home;
