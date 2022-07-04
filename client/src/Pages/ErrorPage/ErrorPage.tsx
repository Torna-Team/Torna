import './ErrorPage.css';
import { Link } from 'react-router-dom';

function ErrorPage() {
  return (
    <div className='errorMainPage'>
      <div className='errorNumberPage'>
        <h1 className='num404'>404</h1>
      </div>
      <div className='errorPage'>
        <h2>Something went wrong. The page you requested could not be found</h2>
        <Link to='/'>
          <button>Go back home</button>
        </Link>
      </div>
    </div>
  );
}

export default ErrorPage;
