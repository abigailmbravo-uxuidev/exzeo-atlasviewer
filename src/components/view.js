import React from 'react';
import ReactDOM from 'react-dom';
import { useUser } from '../context/user-context';

const View = () => {
  const user = useUser();

  return (
    <div id="view">
      <div className="section view">
        <header>
          <h4>Current View</h4>
        </header>
        <ul>
          <li>view layer loop here</li>
        </ul>
      </div>
    </div>
  );
};

export default View;
