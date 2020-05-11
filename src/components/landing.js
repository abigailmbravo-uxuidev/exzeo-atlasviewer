import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAtlas } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../context/auth-context';

const Landing = () => {
  const { loginWithRedirect } = useAuth();
  return (
    <div className="landingPage">
      <div>
        <FontAwesomeIcon icon={faAtlas} />
        <h3>Welcome to Atlas!</h3>
        <p>
          <button type="button" onClick={() => loginWithRedirect()}>Login</button>
        </p>
      </div>
    </div>
  );
};

export default Landing;
