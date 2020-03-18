import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import { useUser } from '../context/user-context';
import { LayerProvider } from '../context/layer-context';
import Header from './header';
import Feeds from './feeds';
import Uploader from './uploader';
import Map from './map';

const Canvas = () => {
  const [showSettings, setShowSettings] = useState(false);

  const toggleSettings = () => setShowSettings(!showSettings);

  return (
    <LayerProvider>
      <div id="map-canvas">
        <nav>
          {showSettings && <Uploader />}
          <Feeds />
          <button type="button" onClick={toggleSettings}>
            Settings
          </button>
          <Link to="/">Home</Link>
          <Header />
        </nav>
        <Map />
      </div>
    </LayerProvider>
  );
};

export default Canvas;
