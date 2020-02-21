import React from 'react';
import ReactDOM from 'react-dom';

import Header from './Header';
import Feeds from './Feeds';
import Navigation from './Navigation';
import Map from './Map';

const Canvas = () => {
  return (
    <div id="map-canvas">
      <Navigation />
      <Map />
    </div>
  );
};

export default Canvas;
