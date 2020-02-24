import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';

import Feeds from './feeds';
import Header from './header';

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
