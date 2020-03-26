import React from 'react';
import ReactDOM from 'react-dom';
import { useUser } from '../context/user-context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLayerGroup } from '@fortawesome/free-solid-svg-icons';

const Layers = () => {
  const user = useUser();
  return (
    <React.Fragment>
      <header>
        <h4>
          <FontAwesomeIcon icon={faLayerGroup} />
          &nbsp;Overlay Layers
        </h4>
      </header>
      <ul>
        <li>shape layer loop here</li>
      </ul>
    </React.Fragment>
  );
};

export default Layers;
