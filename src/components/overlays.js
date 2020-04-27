import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLayerGroup } from '@fortawesome/free-solid-svg-icons';

const Overlays = () => {
  return (
    <React.Fragment>
      <header>
        <h4>
          <FontAwesomeIcon icon={faLayerGroup} />
          &nbsp;Overlay Layers
        </h4>
      </header>
      <ul className="panel-list">
        <li>
          <span className="checkbox-wrapper wrapper">
            <input
              type="checkbox"
              onClick={e => toggleLayer(layer, e.target.checked)}
            />
          </span>
          <span className="feed-detail-wrapper wrapper">
            <h5>
              <span className="overlay-name">Overlay Name</span>
            </h5>
          </span>
        </li>
      </ul>
    </React.Fragment>
  );
};

export default Overlays;
