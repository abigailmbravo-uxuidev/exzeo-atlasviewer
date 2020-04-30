import React, { Fragment } from 'react';
import Map from './map';
import Library from './library';
import View from './view';
import { LayerProvider } from '../context/layer-context';

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
