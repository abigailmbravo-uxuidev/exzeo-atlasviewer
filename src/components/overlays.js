import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLayerGroup, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { useUser } from '../context/user-context';
import { useLayers, useSetLayers } from '../context/layer-context';

const Overlays = ({ filter, setIsMapLoading }) => {
  const allLayers = useLayers();
  const setLayers = useSetLayers();
  const [paneActive, setPaneActive] = useState(true);

  const content = useRef(null);

  const toggleAccordion = () => {
    setPaneActive(paneActive ? false : true);
  };

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

  const layers =
    filter && filter.length > 1
      ? allLayers.filter(layer =>
          layer.name.toLowerCase().includes(filter.toLowerCase())
        )
      : allLayers;

  return (
    <>
      <header>
        <h4>
          <FontAwesomeIcon icon={faLayerGroup} />
          &nbsp;Overlay Layers
        </h4>
        <button
          className={`paneToggle ${!paneActive ? 'closed' : 'open'}`}
          onClick={toggleAccordion}
        >
          <FontAwesomeIcon icon={faChevronDown} />
        </button>
      </header>
      <div className={`pane ${!paneActive ? 'closed' : 'open'}`} ref={content}>
        <ul className="panel-list scroll">
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
      </div>
    </>
  );
};

Overlays.propTypes = {
  filter: PropTypes.string,
  setIsMapLoading: PropTypes.func.isRequired
};
export default Overlays;
