import React from 'react';
import '../Styles/Register.css';
import { User } from '../Services/Server-Client';
import { register } from '../Services/Server-Client';
import { useNavigate } from 'react-router-dom';
import { idText } from 'typescript';

const Register = () => {
	const navigate = useNavigate();
	const onSubmitHandler = async (event: React.FormEvent) => {
		event.preventDefault();
		const target = event.target as typeof event.target & {
			firstName: { value: string };
			lastName: { value: string };
			password: { value: string };
			email: { value: string };
		};
		const firstName: string = target.firstName.value;
		const lastName: string = target.lastName.value;
		const email: string = target.email.value;
		const password: string = target.password.value;

		const newUser = {
			firstName: firstName,
			lastName: lastName,
			password: password,
			email: email,
		};
		const registration = await register(newUser as User);

		navigate(`/profile/${(registration as User).id}`);
	};
	return (
		<div className='form-container'>
			<div>Sign up</div>
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
				<label className='registerLabel'>Email</label>
				<input
					required
					className='registerInput'
					type='text'
					name='email'
					placeholder='Insert your email'
				/>
				<button className='registerBtn'>Create an account</button>
			</form>

			<p>
				or
				<a href='http://localhost:3000/'> Login</a>
			</p>
		</div>
	);
};

export default Register;
