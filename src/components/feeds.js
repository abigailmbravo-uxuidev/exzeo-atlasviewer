import React from 'react';
import ReactDOM from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useLayerState } from '../context/layer-context';

const Feeds = () => {
  const layers = useLayerState();
  return (
    <React.Fragment>
      <header>
        <h4>Data Feeds</h4>
      </header>
      <ul>
        {layers &&
          layers.map((layer, index) => <li key={layer.id}>{layer.name}</li>)}
      </ul>
    </React.Fragment>
  );
};

export default Feeds;
