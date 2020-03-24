import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import { useUser } from '../context/user-context';
import { MapProvider } from '../context/map-context';

import Library from './library';
import View from './view';
import Map from './map';

const Canvas = () => {
  const [showSettings, setShowSettings] = useState(false);

  const toggleSettings = () => setShowSettings(!showSettings);

  return (
    <MapProvider>
      <Library />
      <View />
      <div id="map-canvas">
        <Map />
      </div>
    </MapProvider>
  );
};

export default Canvas;
