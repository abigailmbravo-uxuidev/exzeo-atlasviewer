import React from 'react';
import ReactDOM from 'react-dom';
import { useUser } from '../context/user-context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons';

import Logo from './logo';

const View = () => {
  const user = useUser();

  return (
    <React.Fragment>
      <div id="view">
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
      </div>
      <div className="panel-tab view-tab">
        <button>
          <FontAwesomeIcon icon={faImage} />
        </button>
      </div>
    </React.Fragment>
  );
};

export default View;
