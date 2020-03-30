import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { useUser } from '../context/user-context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons';

import Logo from './logo';

const View = () => {
  const user = useUser();
  const [viewActive, setViewState] = useState(true);

  return (
    <div id="view" className={`panel ${viewActive ? 'open' : 'closed'}`}>
      <div className="section logo">
        <Logo />
      </div>
      <div className="scroll">
        <div className="section view">
          <header>
            <h4>
              <FontAwesomeIcon icon={faImage} />
              &nbsp;Current View
            </h4>
          </header>
          <ul>
            <li>view layer loop here</li>
          </ul>
        </div>
      </div>
      <div className="panel-tab view-tab">
        <button onClick={() => setViewState(!viewActive)}>
          <FontAwesomeIcon icon={faImage} />
        </button>
      </div>
    </div>
  );
};

export default View;
