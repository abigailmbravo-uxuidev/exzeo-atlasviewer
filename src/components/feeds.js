import React, { Fragment, useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faNetworkWired,
  faShareAlt,
  faEllipsisV,
  faInfoCircle,
  faFileExport,
  faFileUpload,
  faShareAltSquare,
  faTrashAlt,
  faChevronDown
} from '@fortawesome/free-solid-svg-icons';
import { useLayerState } from '../context/layer-context';
import Uploader from './uploader';

const Feeds = ({ filter }) => {
  const [uploaderState, setUploaderState] = useState(false);
  const layers = useLayerState();
  const filteredDatasets = layers.filter(ds => {
    return ds.name.toLowerCase().includes(filter);
  });

  /* Need the setState variable to be set to the dynamic height of the accordion and not auto */
  const [menuActive, setMenuState] = useState(true);
  const [paneActive, setPaneState] = useState(true);
  const [setHeight, setHeightState] = useState('auto');
  const content = useRef(null);

  function toggleAccordion() {
    setPaneState(paneActive === true ? false : true);
    setHeightState(
      paneActive === true ? '0px' : `${content.current.scrollHeight}px`
    );
    console.log(content.current.scrollHeight);
  }

  return (
    <Fragment>
      {uploaderState && <Uploader setUploaderState={setUploaderState} />}
      <header>
        <h4>
          <FontAwesomeIcon icon={faNetworkWired} />
          &nbsp;Data Feed
        </h4>
        <button
          className={`paneToggle ${!paneActive ? 'closed' : 'open'}`}
          onClick={toggleAccordion}
        >
          <FontAwesomeIcon icon={faChevronDown} />
        </button>
      </header>
      <div
        className={`pane ${!paneActive ? 'closed' : 'open'}`}
        ref={content}
        style={{ maxHeight: `${setHeight}` }}
      >
        <div className="feedBtns">
          <select>
            <option>Test Sort</option>
          </select>
          <button
            className="uploadBtn actionBtn"
            type="button"
            onClick={() => setUploaderState(!uploaderState)}
          >
            Upload
          </button>
        </div>
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
                    <span className="file-name">{layer.name}</span>
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
                    {/* only show author if feed is shared */}
                    <span className="author">
                      <dt>Author</dt>
                      <dd>{layer.owner.name}</dd>
                    </span>
                    {/* end only show author if feed is shared */}
                  </dl>
                </span>
              </li>
            ))}
        </ul>
      </div>
    </Fragment>
  );
};

export default Feeds;
