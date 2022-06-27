import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/Home.css';
import GoogleButton from 'react-google-button';
import { auth } from '../Services/Firebase';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { login, getUser } from '../Services/Server-Client';
import { LoggingUser } from '../Services/Server-Client';

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
		if (logged && (logged as any).id === undefined) {
			alert('Invalid Email or Password');
		} else {
			navigate(`/profile/${(logged as unknown as any).id}`);
		}
	};

	const checkExistingUser = async (
		id: string,
		displayName: string,
		email: string
	) => {
		if (id && displayName && email !== null) {
			const result = await getUser(id, displayName, email);
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
				<button className='signInBtn'>Sign In</button>
			</form>
			<GoogleButton className='googleBtn' onClick={signInWithGoogle} />
			<p>
				Don't have an account?{' '}
				<a href='http://localhost:3000/register'>Sign up</a>
			</p>
		</div>
	);
};

export default Home;
