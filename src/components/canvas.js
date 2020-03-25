import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import { useUser } from '../context/user-context';
import { LayerProvider } from '../context/layer-context';
import Header from './header';
import Feeds from './feeds';
import Uploader from './uploader';
import Map from './map';
import Library from './library';
import View from './view';

const Canvas = () => {
  const [showSettings, setShowSettings] = useState(false);

  const toggleSettings = () => setShowSettings(!showSettings);

  return (
    <LayerProvider>
      <Library />
      <View />
      <div id="map-canvas">
        <Map />
      </div>
    </LayerProvider>
  );
};

export default Canvas;
