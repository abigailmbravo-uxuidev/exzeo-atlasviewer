import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { useUser } from '../context/user-context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faImage,
  faEye,
  faGlobeAmericas,
  faNetworkWired,
  faLayerGroup,
  faExternalLinkSquareAlt
} from '@fortawesome/free-solid-svg-icons';
import Logo from './logo';
import Icon from './icon';
import { mapStyles } from './map.utils';

const View = ({ setBasemap }) => {
  const user = useUser();
  const [viewActive, setViewState] = useState(true);

  useEffect(() => {
    setViewState(false);
  }, []);

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
          {/* start of active feeds loop */}
          <label htmlFor="feeds">Feeds</label>
          <ul className="panel-list">
            {/* feed start */}
            <li>
              <span className="eyeball-wrapper wrapper">
                <FontAwesomeIcon icon={faEye} />
              </span>
              <span className="feed-detail-wrapper wrapper">
                <h5>
                  <span className="overlay-name">[ Feed Name ]</span>
                </h5>
              </span>
              <span className="icon-popOut">
                <FontAwesomeIcon icon={faExternalLinkSquareAlt} />
              </span>
            </li>
            {/* feed end */}
          </ul>
          {/* end of active feeds loop */}
          {/* start of active layers loop */}
          <label htmlFor="layer">Layers</label>
          <ul className="panel-list">
            {/* layer start */}
            <li>
              <span className="eyeball-wrapper wrapper">
                <FontAwesomeIcon icon={faEye} />
              </span>
              <span className="feed-detail-wrapper wrapper">
                <h5>
                  <span className="overlay-name">[ Layer Name ]</span>
                </h5>
              </span>
            </li>
            {/* layer end */}
          </ul>
          {/* end of active layers loop */}
          <label htmlFor="baseMap">Base Map</label>
          <div className="base-map-wrapper">
            <select onChange={handleBasemap}>
              {mapStyles &&
                mapStyles.map(style => (
                  <option key={style.label} value={style.value}>
                    {style.label}
                  </option>
                ))}
            </select>
          </div>
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

//ABBY THIS IS WHAT YOU NEED
