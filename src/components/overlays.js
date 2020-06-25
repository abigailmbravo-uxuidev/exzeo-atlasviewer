import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLayerGroup } from '@fortawesome/free-solid-svg-icons';
import { useUser } from '../context/user-context';
import { useLayers, useSetLayers } from '../context/layer-context';

const Overlays = ({ setIsMapLoading }) => {
  const layers = useLayers();
  const setLayers = useSetLayers();

  const toggleLayer = ({ target }) => {
    if (target.checked) setIsMapLoading(true);
    const toggleIndex = layers.findIndex(l => l._id === target.value);
    const newLayers = layers.map((layer, index) => {
      if (index === toggleIndex)
        return { ...layer, inView: target.checked, active: target.checked };
      return layer;
    });
    setLayers(newLayers);
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
            <li key={layer._id}>
              <span className="checkbox-wrapper wrapper">
                <input
                  type="checkbox"
                  onChange={toggleLayer}
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
