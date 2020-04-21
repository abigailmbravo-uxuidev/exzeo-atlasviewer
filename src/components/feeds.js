import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faNetworkWired,
  faShareAlt,
  faEllipsisV,
  faInfoCircle,
  faFileExport,
  faFileUpload,
  faShareAltSquare,
  faTrashAlt
} from '@fortawesome/free-solid-svg-icons';

const Feeds = ({ feeds, dispatch, filter }) => {
  const filteredDatasets = feeds.filter(ds => {
    return ds.name.toLowerCase().includes(filter);
  });
  const [menuActive, setMenuState] = useState(true);

  return (
    <React.Fragment>
      <header>
        <h4>
          <FontAwesomeIcon icon={faNetworkWired} />
          &nbsp;Data Feed
        </h4>
        <div className="feedBtns">
          <select>
          <option>Test Sort</option>
        </select>
        <button className="uploadBtn" type="button" onClick={() => setUploaderState(!uploaderState)}>
          Upload
        </button>
        </div>
      </header>
      <ul className="panel-list">
        <div className="notification shared-feed"></div>
        {filteredDatasets &&
          filteredDatasets.map((layer, index) => (
            <li key={layer._id}>
              <span className="checkbox-wrapper wrapper">
                <input type="checkbox" />
              </span>
              <span className="feed-detail-wrapper wrapper">
                <h5>
                  {/*icon should only show if feed is shared, should have new class until notification associated with it is dismissed*/}
                  <span className="icon shared new">
                    <FontAwesomeIcon icon={faShareAlt} />
                  </span>
                  <span className="file-name">
                    {/*friendly name and pipe only shows if added by user*/}
                    <strong>[FRIENDLY NAME]</strong>&nbsp;|&nbsp;
                    {/*end friendly name*/}
                    {layer.name}
                  </span>
                  <button
                    onClick={() => setMenuState(!menuActive)}
                    className="menu-btn"
                  >
                    <FontAwesomeIcon icon={faEllipsisV} />
                  </button>
                  <div className={`menu ${menuActive ? 'closed' : 'open'}`}>
                    <ul>
                      <li className="menu-icon"></li>
                      <li>
                        <button>
                          <FontAwesomeIcon icon={faInfoCircle} />
                          &nbsp;Info
                        </button>
                      </li>
                      <li>
                        <button>
                          <FontAwesomeIcon icon={faFileExport} />
                          &nbsp;Export
                        </button>
                      </li>
                      <li>
                        <button>
                          <FontAwesomeIcon icon={faFileUpload} />
                          &nbsp;Upload
                        </button>
                      </li>
                      <li>
                        <button>
                          <FontAwesomeIcon icon={faShareAltSquare} />
                          &nbsp;Share
                        </button>
                      </li>
                      <li>
                        <button>
                          <FontAwesomeIcon icon={faTrashAlt} />
                          &nbsp;Delete
                        </button>
                      </li>
                    </ul>
                  </div>
                </h5>
                <dl>
                  <span className="date">
                    <dt>Created</dt>
                    <dd>{layer.created_at}</dd>
                  </span>
                  <span className="date">
                    <dt>Updated</dt>
                    <dd>{layer.updated_at}</dd>
                  </span>
                </dl>
              </span>
            </li>
          ))}
      </ul>
    </React.Fragment>
  );
};

export default Feeds;
