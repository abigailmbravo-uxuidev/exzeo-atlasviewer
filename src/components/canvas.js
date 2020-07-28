import React, { useState } from 'react';
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
