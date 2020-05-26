import React, { Fragment, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSignOutAlt,
  faSlashEye,
  faEye,
  faTimes
} from '@fortawesome/free-solid-svg-icons';
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
      <div className="feed-popOut">
        <header>
          <span className="gripper">:::::::::::::::::::</span>
          <button className="iconBtn closeBtn" type="button">
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </header>
        <div className="content">
          <span className="eyeball-wrapper wrapper">
            <FontAwesomeIcon icon={faEye} />
            {/* toggle eye icon={faSlashEye} */}
          </span>

          <table>
            <tr>
              <th colSpan="2">
                <h5>[ Feed Name ]</h5>
              </th>
              <th>column 2</th>
              <th>column 3</th>
            </tr>
            <tr>
              <td className="toggle">
                <FontAwesomeIcon icon={faEye} />
                {/* toggle eye icon={faSlashEye} */}
              </td>
              <td>column 1</td>
              <td>column 2</td>
              <td>column 3</td>
            </tr>
            <tr>
              <td className="toggle">
                <FontAwesomeIcon icon={faEye} />
                {/* toggle eye icon={faSlashEye} */}
              </td>
              <td>column 1</td>
              <td>column 2</td>
              <td>column 3</td>
            </tr>
          </table>
        </div>
      </div>
    </LayerProvider>
  );
};

export default Canvas;
