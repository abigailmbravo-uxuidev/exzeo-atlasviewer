import React from 'react';
import ReactDOM from 'react-dom';

import Header from './header';
import Feeds from './feeds';
import Navigation from './navigation';
import Map from './map';

const Canvas = () => {
  return (
    <div id="map-canvas">
      <Navigation />
      <Map />
    </div>
  );
};

export default Canvas;
