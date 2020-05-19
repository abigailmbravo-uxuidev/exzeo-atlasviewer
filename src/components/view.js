import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { useUser } from '../context/user-context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage, faEye } from '@fortawesome/free-solid-svg-icons';
import Logo from './logo';
import Icon from './icon';
import { mapStyles } from './map.utils';

const View = ({ setBasemap }) => {
  const user = useUser();
  const [viewActive, setViewState] = useState(true);

  const handleBasemap = e => {
    setBasemap(mapStyles[e.target.value]);
  };
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
          <select onChange={handleBasemap}>
            {mapStyles &&
              mapStyles.map((style, index) => {
                const elements = style.split('/');
                const key = elements[elements.length - 1];
                return (
                  <option key={index} value={index}>
                    {key}
                  </option>
                );
              })}
          </select>
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
