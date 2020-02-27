import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import { useUser } from '../context/user-context';
import { MapProvider } from '../context/map-context';
import Header from './header';
import Feeds from './feeds';
import Settings from './settings';
import Map from './map';

const Canvas = () => {
  const [showSettings, setShowSettings] = useState(false);

  const toggleSettings = () => setShowSettings(!showSettings);

  return (
    <MapProvider>
      <div id="map-canvas">
        <nav>
          {showSettings && <Settings />}
          <Feeds />
          <button type="button" onClick={toggleSettings}>
            Settings
          </button>
          <Link to="/">Home</Link>
          <Header />
        </nav>
        <Map />
      </div>
    </MapProvider>
  );
};

export default Canvas;
