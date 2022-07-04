import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { LoginContext } from '../../Services/Context';
import './Navbar.css';
import tornaLogo from '../../Images/tornalogoyellow.png';

function Navbar({ user }: any) {
  const { loggedIn, setLoggedIn } = useContext(LoginContext as any);

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
