import React, { Fragment, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSignOutAlt,
  faEye,
  faTimes,
  faEllipsisV,
  faCircle
} from '@fortawesome/free-solid-svg-icons';
import Map from './map';
import Library from './library';
import View from './view';
import Spinner from './spinner';
import { FeedProvider } from '../context/feed-context';
import { LayerProvider } from '../context/layer-context';
import { useAuth } from '../context/auth-context';
import ReactTooltip from 'react-tooltip';

const Canvas = () => {
  const { logout } = useAuth();
  const [basemap, setBasemap] = useState('');
  const [isMapLoading, setIsMapLoading] = useState(true);

  return (
    <FeedProvider>
      <LayerProvider>
        {isMapLoading && <Spinner />}
        <Library setIsMapLoading={setIsMapLoading} />
        <View setBasemap={setBasemap} />
        <button
          title="Log Out"
          className="logoutBtn"
          type="button"
          onClick={logout}
        >
          <FontAwesomeIcon icon={faSignOutAlt} />
        </button>
        <div id="map-canvas">
          <Map basemap={basemap} setIsMapLoading={setIsMapLoading} />
        </div>
        {/* start feed pop out data table ------------------------------------------------------- */}
        <div className="feed-popOut" style={{ display: 'none' }}>
          <header>
            {/* Gripper is draggable point for data table */}
            <span className="gripper">&nbsp;</span>
            {/* Button to close pop out data table */}
            <button className="iconBtn closeBtn" type="button">
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </header>
          <div className="content">
            {/* Element to toggle hide/show of all data points */}
            <span className="eyeball-wrapper wrapper">
              <FontAwesomeIcon icon={faEye} />
              {/* toggle eye icon={faSlashEye} */}
            </span>
            <div className="table-wrapper">
              {/* Start of data table */}
              <table>
                <thead>
                  <tr>
                    <th>
                      {/* Name of feed */}
                      <span data-tip data-for="feedPopOverTooltip">
                        [ Feed Name ]
                      </span>
                    </th>
                    {/* Start loop of column titles */}
                    <th>head</th>
                    <th>head</th>
                    <th>head</th>
                    <th>head</th>
                    <th>head</th>
                    {/* End loop of column titles */}
                  </tr>
                </thead>
                <tbody>
                  {/* Start loop of data rows */}
                  <tr>
                    <th>
                      {/* Element to toggle hide/show of only this data points */}
                      <span className="eyeball-wrapper wrapper">
                        <FontAwesomeIcon icon={faEye} />
                        {/* toggle eye icon={faSlashEye} */}
                      </span>
                      {/* icon from data should be added here - will need to figure this out */}
                      <span
                        className="icon-wrapper wrapper"
                        style={{ color: 'red' }}
                      >
                        <FontAwesomeIcon icon={faCircle} />
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
                      </span>
                      Aggregate 4
                    </th>
                    <td>body</td>
                    <td>body</td>
                    <td>body</td>
                    <td>body</td>
                    <td>body</td>
                  </tr>
                  {/* End loop of data rows */}
                  {/* Start total row - assume the app will calc these rows */}
                  <tr className="total-count">
                    <th>totals:</th>
                    <td>body</td>
                    <td>body</td>
                    <td>body</td>
                    <td>body</td>
                    <td>body</td>
                  </tr>
                  {/* End total row */}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        {/* end feed pop out data table */}
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
      </LayerProvider>
    </FeedProvider>
  );
};

export default Canvas;
