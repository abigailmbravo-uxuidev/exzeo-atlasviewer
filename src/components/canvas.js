import React, { Fragment, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSignOutAlt,
  faSlashEye,
  faEye,
  faTimes,
  faEllipsisV,
  faCircle
} from '@fortawesome/free-solid-svg-icons';
import Map from './map';
import Library from './library';
import View from './view';
import { FeedProvider } from '../context/feed-context';
import { useAuth } from '../context/auth-context';
import ReactTooltip from 'react-tooltip';

const Canvas = () => {
  const { logout } = useAuth();
  const [basemap, setBasemap] = useState('');
  const [layerToggle, setLayerToggle] = useState(undefined);

  return (
    <FeedProvider>
      <Library setLayerToggle={setLayerToggle} />
      <View setBasemap={setBasemap} />
      <button
        title="Log Out"
        className="logoutBtn"
        type="button"
        onClick={() => logout({ returnTo: '/' })}
      >
        <FontAwesomeIcon icon={faSignOutAlt} />
      </button>
      <div id="map-canvas">
        <Map basemap={basemap} layerToggle={layerToggle} />
      </div>
      <div className="feed-popOut">
        <header>
          <span className="gripper">&nbsp;</span>
          <button className="iconBtn closeBtn" type="button">
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </header>
        <div className="content">
          <span className="eyeball-wrapper wrapper">
            <FontAwesomeIcon icon={faEye} />
            {/* toggle eye icon={faSlashEye} */}
          </span>
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>
                    <span data-tip data-for="feedPopOverTooltip">
                      [ Feed Name ]
                    </span>
                  </th>
                  <th>head</th>
                  <th>head</th>
                  <th>head</th>
                  <th>head</th>
                  <th>head</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>
                    <span className="eyeball-wrapper wrapper">
                      <FontAwesomeIcon icon={faEye} />
                      {/* toggle eye icon={faSlashEye} */}
                    </span>
                    <span
                      className="icon-wrapper wrapper"
                      style={{ color: 'red' }}
                    >
                      <FontAwesomeIcon icon={faCircle} />
                      {/* maps to icon and color from feed */}
                    </span>
                    Aggregate 1
                  </th>
                  <td>body</td>
                  <td>body</td>
                  <td>body</td>
                  <td>body</td>
                  <td>body</td>
                </tr>
                <tr>
                  <th>
                    <span className="eyeball-wrapper wrapper">
                      <FontAwesomeIcon icon={faEye} />
                      {/* toggle eye icon={faSlashEye} */}
                    </span>
                    <span
                      className="icon-wrapper wrapper"
                      style={{ color: 'blue' }}
                    >
                      <FontAwesomeIcon icon={faCircle} />
                      {/* maps to icon and color from feed */}
                    </span>
                    Aggregate 2
                  </th>
                  <td>body</td>
                  <td>body</td>
                  <td>body</td>
                  <td>body</td>
                  <td>body</td>
                </tr>
                <tr>
                  <th>
                    <span className="eyeball-wrapper wrapper">
                      <FontAwesomeIcon icon={faEye} />
                      {/* toggle eye icon={faSlashEye} */}
                    </span>
                    <span
                      className="icon-wrapper wrapper"
                      style={{ color: 'green' }}
                    >
                      <FontAwesomeIcon icon={faCircle} />
                      {/* maps to icon and color from feed */}
                    </span>
                    Aggregate 3
                  </th>
                  <td>body</td>
                  <td>body</td>
                  <td>body</td>
                  <td>body</td>
                  <td>body</td>
                </tr>
                <tr>
                  <th>
                    <span className="eyeball-wrapper wrapper">
                      <FontAwesomeIcon icon={faEye} />
                      {/* toggle eye icon={faSlashEye} */}
                    </span>
                    <span
                      className="icon-wrapper wrapper"
                      style={{ color: 'orange' }}
                    >
                      <FontAwesomeIcon icon={faCircle} />
                      {/* maps to icon and color from feed */}
                    </span>
                    Aggregate 4
                  </th>
                  <td>body</td>
                  <td>body</td>
                  <td>body</td>
                  <td>body</td>
                  <td>body</td>
                </tr>
                <tr className="total-count">
                  <th>totals:</th>
                  <td>body</td>
                  <td>body</td>
                  <td>body</td>
                  <td>body</td>
                  <td>body</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <ReactTooltip
        className="panel-tooltip"
        id="feedPopOverTooltip"
        place="top"
        effect="solid"
        type="light"
        delayHide={500}
        delayShow={200}
        backgroundColor="#fff"
        border={true}
        borderColor="#ddd"
      >
        <dl>
          <span>
            <dt>Created</dt>
            <dd>[ Created ]</dd>
          </span>
          <span>
            <dt>Updated</dt>
            <dd>[ Updated ]</dd>
          </span>
          <span>
            <dt>Author</dt>
            <dd>[ Author ]</dd>
          </span>
        </dl>
      </ReactTooltip>
    </FeedProvider>
  );
};

export default Canvas;
