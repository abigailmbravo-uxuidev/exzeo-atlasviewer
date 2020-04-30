import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAtlas } from '@fortawesome/free-solid-svg-icons';

const Landing = () => {
  return (
    <div className="landingPage">
      <div>
        <FontAwesomeIcon icon={faAtlas} />
        <h3>Welcome to Atlas!</h3>
        <p>
          <Link to="/map">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Landing;
