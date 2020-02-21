import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';

import Feeds from './Feeds';
import Header from './Header';

const Navigation = () => {
  return (
    <nav>
      <Feeds />
      <Link to="/">Home</Link>
      <Header />
    </nav>
  );
};

export default Navigation;
