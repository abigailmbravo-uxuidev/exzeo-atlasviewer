import React from 'react';
import { useLayerState } from '../context/layer-context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faNetworkWired } from '@fortawesome/free-solid-svg-icons';

const Feeds = () => {
  const { datasets } = useLayerState();
  return (
    <React.Fragment>
      <header>
        <h4>
          <FontAwesomeIcon icon={faNetworkWired} />
          &nbsp;Data Feeds
        </h4>
      </header>
      <ul>
        {datasets &&
          datasets.map((layer, index) => <li key={layer.id}>{layer.name}</li>)}
      </ul>
    </React.Fragment>
  );
};

export default Feeds;
