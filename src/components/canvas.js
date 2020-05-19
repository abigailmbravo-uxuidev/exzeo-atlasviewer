import React, { Fragment, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import Map from './map';
import Library from './library';
import View from './view';
import { LayerProvider } from '../context/layer-context';
import { useAuth } from '../context/auth-context';

const Canvas = () => {
  const { logout } = useAuth();
  const [basemap, setBasemap] = useState('');
  return (
    <LayerProvider>
      <Library />
      <View setBasemap={setBasemap} />
      <button
        title="Log Out"
        className="logoutBtn"
        type="button"
        onClick={() => logout()}
      >
        <FontAwesomeIcon icon={faSignOutAlt} />
      </button>
      <div id="map-canvas">
        <Map basemap={basemap} />
      </div>
    </LayerProvider>
  );
};

export default Canvas;
