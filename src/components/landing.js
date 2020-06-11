import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAtlas } from '@fortawesome/free-solid-svg-icons';
import Logo from './logo';
import Spinner from './spinner';
import { useAuth } from '../context/auth-context';

const Landing = () => {
  const { loading, loginWithRedirect } = useAuth();

  if (loading) {
    return <div><Spinner /></div>;
  }

  return (
    <div className="landingPage">
      <div className="card">
        <Logo />
        <h3>Welcome to Atlas!</h3>
        <button type="button" onClick={() => loginWithRedirect()}>
          Login
        </button>
      </div>
    </div>
  );
};

export default Landing;
