import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../Styles/Home.css';
import GoogleButton from 'react-google-button';
import { auth } from '../Services/Firebase';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { login, getUser } from '../Services/Server-Client';

type LoginProps = {
	setUserId: React.Dispatch<React.SetStateAction<string>>;
	setUserMail: React.Dispatch<React.SetStateAction<string>>;
	setUserName: React.Dispatch<React.SetStateAction<string>>;
	userId: string;
	userMail: string;
	userName: string;
};

const Home: React.FC<LoginProps> = ({
	setUserId,
	setUserMail,
	setUserName,
	userName,
	userMail,
	userId,
}) => {
	const navigate = useNavigate();

	const onSubmitHandler = (event: React.FormEvent) => {
		event.preventDefault();
		const target = event.target as typeof event.target & {
			email: { value: string };
			password: { value: string };
		};
		const email: string = target.email.value;
		const password: string = target.password.value;

		navigate(`/profile/${email}`);
	};

	const checkExistingUser = async (
		id: string,
		displayName: string,
		mail: string
	) => {
		if (id && displayName && mail !== null) {
			const result = await getUser(id, displayName, mail);
			if (result) {
				return true;
			} else {
				return false;
			}
		}
	};

	const signInWithGoogle = () => {
		const provider = new GoogleAuthProvider();
		signInWithPopup(auth, provider)
			.then((result) => {
				const googleUserId = result.user.uid;
				const googleUserName = result.user.displayName;
				const googleUserMail = result.user.email;
				let newUser = {
					userId: '',
					name: '',
					email: '',
				};
				if (googleUserId && googleUserName && googleUserMail) {
					setUserId(googleUserId);
					setUserName(googleUserName);
					setUserMail(googleUserMail);
					newUser.userId = googleUserId;
					newUser.name = googleUserName;
					newUser.email = googleUserMail;

					checkExistingUser(googleUserId, googleUserName, googleUserMail);
				}
				navigate(`/profile/${googleUserId}`);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<div className='form-container'>
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
				<button className='signInBtn'>Sign In</button>
			</form>
			<GoogleButton className='googleBtn' onClick={signInWithGoogle} />
			<p>Don't have an account? Sign up</p>
		</div>
	);
};

export default Home;
