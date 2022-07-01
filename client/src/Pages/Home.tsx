import React, { useContext, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../Styles/Home.css';
import GoogleButton from 'react-google-button';
import { auth } from '../Services/Firebase';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { login, getUser, User } from '../Services/Server-Client';
import { LoggingUser } from '../Services/Server-Client';
import { LoginContext } from '../Utils/Context';
import tornaLogo from '../images/tornalogo.png';

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

    if ((logged && (logged as any).id) === undefined) {
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
    <div className='backgroundContainer'>
      <div className='form-container'>
        <div className='loginWelcome'>
          <img src={tornaLogo} alt='torna logo' />
          <span>Please enter your details</span>
        </div>
        <form className='login-container' onSubmit={onSubmitHandler}>
          <div className='formInputsContainer'>
            <label htmlFor='email' className='signInLabel'>
              Email
            </label>
            <input
              required
              className='signInInput'
              type='text'
              name='email'
              placeholder='Insert your email'
            />
            <label htmlFor='password' className='signInLabel'>
              Password
            </label>
            <input
              required
              className='signInInput'
              type='password'
              name='password'
              placeholder='Insert your password'
            />
          </div>
          <div className='signInContainer'>
            <button className='signInBtn' onClick={() => setLoggedIn(true)}>
              Sign In
            </button>
          </div>
        </form>
        <GoogleButton className='googleBtn' onClick={signInWithGoogle} />
        <p>
          Don't have an account?
          <span className='singUpLink'>
            <Link to='/register'>Sign up</Link>
          </span>
        </p>
      </div>
    </div>
  );
};

export default Home;
