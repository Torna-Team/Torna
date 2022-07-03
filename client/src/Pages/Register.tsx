import React, { useContext } from 'react';
import '../Styles/Register.css';
import { User } from '../Services/Server-Client';
import { register } from '../Services/Server-Client';
import { useNavigate, Link } from 'react-router-dom';
import { LoginContext } from '../Utils/Context';
import tornaLogo from '../images/TORNA png flecha amarilla.png';

const Register = () => {
	const navigate = useNavigate();
	const { loggedIn, setLoggedIn } = useContext(LoginContext as any);

	const onSubmitHandler = async (event: React.FormEvent) => {
		event.preventDefault();
		const target = event.target as typeof event.target & {
			firstName: { value: string };
			lastName: { value: string };
			password: { value: string };
			confirmPassword: { value: string };
			email: { value: string };
		};

		const newUser = {
			firstName: target.firstName.value,
			lastName: target.lastName.value,
			password: target.password.value,
			confirmPassword: target.confirmPassword.value,
			email: target.email.value,
		};

		try {
			if (target.password.value != target.confirmPassword.value) {
				alert('Passwords did not match');
			}

			const registration = await register(newUser as User);
			if (registration) {
				setLoggedIn(true);
				sessionStorage.setItem('email', target.email.value);
				sessionStorage.setItem('user', JSON.stringify(registration));
				navigate(`/profile/${(registration as User).id}`);
			} else throw new Error();
		} catch (error) {
			console.log(error);
			alert('Email already exists. Try again');
		}
	};

	return (
		<div className='backgroundContainer'>
			<div className='form-container'>
				<div className='loginWelcome'>
					<img src={tornaLogo} alt='torna logo' />
				</div>
				<form className='register-container' onSubmit={onSubmitHandler}>
					<label className='registerLabel'>First Name</label>
					<input
						required
						className='registerInput'
						type='text'
						name='firstName'
						placeholder='Insert your name'
					/>
					<label className='registerLabel'>Last Name</label>
					<input
						required
						className='registerInput'
						type='text'
						name='lastName'
						placeholder='Insert your last name'
					/>
					<label className='registerLabel'>Password</label>
					<input
						required
						className='registerInput'
						type='password'
						name='password'
						placeholder='Insert your password'
					/>
					<label className='registerLabel'>Confirm Password</label>
					<input
						required
						className='registerInput'
						type='password'
						name='confirmPassword'
						placeholder='Repeat your password'
					/>
					<label className='registerLabel'>Email</label>
					<input
						required
						className='registerInput'
						type='email'
						name='email'
						placeholder='Insert your email'
					/>
					<div className='signInContainer'>
						<button className='registerBtn'>Create an account</button>
					</div>
				</form>

				<p>
					or
					<span className='singUpLink'>
						<Link to='/'>Login</Link>
					</span>
				</p>
			</div>
		</div>
	);
};

export default Register;
