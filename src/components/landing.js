import React from 'react';
import Logo from './logo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAtlas } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../context/auth-context';

const Landing = () => {
  const { loginWithRedirect } = useAuth();
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
