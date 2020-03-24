import React from 'react';
import ReactDOM from 'react-dom';
import { useUser } from '../context/user-context';

const Shapes = () => {
  const user = useUser();
  return (
    <React.Fragment>
      <header>
        <h4>Shape Layers</h4>
      </header>
      <ul>
        <li>shape layer loop here</li>
      </ul>
    </React.Fragment>
  );
};

export default Shapes;
