import React, { useState } from 'react';
import { LayerProvider } from '../context/layer-context';
import Header from './header';
import Map from './map';
import Library from './library';
import View from './view';

const Canvas = () => {
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
