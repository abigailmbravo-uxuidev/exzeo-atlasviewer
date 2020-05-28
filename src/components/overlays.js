import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLayerGroup } from '@fortawesome/free-solid-svg-icons';
import { useUser } from '../context/user-context';

const Overlays = ({ setLayerToggle }) => {
  const { layers } = useUser();

  const toggleLayer = ({ target }) => {
    const layer = layers.find(l => l._id === target.value);
    setLayerToggle({ show: target.checked, layer });
  };

  return (
    <React.Fragment>
      <header>
        <h4>
          <FontAwesomeIcon icon={faLayerGroup} />
          &nbsp;Overlay Layers
        </h4>
      </header>
      <ul className="panel-list">
        {layers &&
          layers.map((layer, index) => (
            <li key={index}>
              <span className="checkbox-wrapper wrapper">
                <input
                  type="checkbox"
                  onClick={toggleLayer}
                  value={layer._id}
                />
              </span>
              <span className="feed-detail-wrapper wrapper">
                <h5>
                  <span className="overlay-name">{layer.name}</span>
                </h5>
              </span>
            </li>
          ))}
      </ul>
    </React.Fragment>
  );
};

export default Overlays;
