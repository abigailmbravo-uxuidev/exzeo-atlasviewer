import React, { Fragment } from 'react';
import Map from './map';
import Library from './library';
import View from './view';
import { LayerProvider } from '../context/layer-context';
import { useAuth } from '../context/auth-context';

const Canvas = () => {
  const { logout } = useAuth();
  
  return (
    <LayerProvider>
      <Library />
      <View />
      <button className="logoutBtn" type="button" onClick={() => logout()}>
        Logout
      </button>
      <div id="map-canvas">
        <Map />
      </div>
    </LayerProvider>
  );
};

export default Canvas;
