import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAtlas } from '@fortawesome/free-solid-svg-icons';

const Landing = () => {
  return (
    <div className="landingPage">
      <h3>Welcome to Atlas!</h3>
      <p>
        The map is <Link to="/map">here</Link>
      </p>
      <FontAwesomeIcon icon={faAtlas} />
    </div>
  );
};

export default Landing;
