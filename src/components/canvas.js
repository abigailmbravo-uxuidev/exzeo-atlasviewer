import React, { Fragment } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
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
      <button title="Log Out" className="logoutBtn" type="button" onClick={() => logout()}>
        <FontAwesomeIcon icon={faSignOutAlt} />
      </button>
      <div id="map-canvas">
        <Map />
      </div>
    </LayerProvider>
  );
};

export default Canvas;
