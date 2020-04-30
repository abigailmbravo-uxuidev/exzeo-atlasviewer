import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { useUser } from '../context/user-context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage, faEye } from '@fortawesome/free-solid-svg-icons';

import Logo from './logo';
import Icon from './icon';

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
          <ul className="panel-list">
            <li>
              <span className="eyeball-wrapper wrapper">
                <FontAwesomeIcon icon={faEye} />
              </span>
              <span className="feed-detail-wrapper wrapper">
                <h5>
                  <span className="overlay-name">View Name</span>
                </h5>
              </span>
            </li>
          </ul>
        </div>
      </div>
      <div className="panel-tab view-tab">
        <button onClick={() => setViewState(!viewActive)}>
          <Icon />
        </button>
      </div>
    </div>
  );
};

export default View;
