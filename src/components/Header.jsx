import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div id="map-header">
      <h1>Atlas Header</h1>
      <nav>
        <Link to="/">Home</Link>
      </nav>
    </div>
  );
};

export default Header;
