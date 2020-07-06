import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
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
import { useFeedState, useFeedDispatch } from '../context/feed-context';
import DeleteFeed from './delete-feed';
import FeedManager from './feedManager';
import Modal from './modal';
import Uploader from './uploader';

const Feeds = ({ filter, setIsMapLoading }) => {
  const [uploaderState, setUploaderState] = useState({});
  const [deleteFeed, setDeleteFeed] = useState(null);
  const [feedManagerState, setFeedManagerState] = useState(false);
  const allFeeds = useFeedState();
  const [paneActive, setPaneActive] = useState(true);
  const [paneHeight, setPaneHeightState] = useState();
  const dispatch = useFeedDispatch();
  const content = useRef(null);
  const [error, setError] = useState('');

  const feeds =
    filter && filter.length > 1
      ? allFeeds.filter(feed => feed.name.includes(filter))
      : allFeeds;

  const toggleAccordion = () => {
    setPaneActive(paneActive ? false : true);
    setPaneHeightState(
      paneActive === true ? '0px' : `${content.current.scrollHeight}px`
    );
  };

  const toggleFeed = (feed, inView) => {
    if (inView) setIsMapLoading(true);
    dispatch({ type: 'update', data: { ...feed, inView, active: inView } });
  };

  const toggleUpdate = feed => {
    setUploaderState({ action: 'Update', feed });
  };

  useEffect(() => {
    setPaneHeightState(content.current.scrollHeight);
  }, []);

  return (
    <>
      {uploaderState && uploaderState.action && (
        <Uploader
          data={uploaderState}
          setUploaderState={setUploaderState}
          setError={setError}
          setIsMapLoading={setIsMapLoading}
        />
      )}
      {deleteFeed && (
        <DeleteFeed
          feed={deleteFeed}
          setDeleteFeed={setDeleteFeed}
          setError={setError}
        />
      )}
      {error.length > 0 && (
        <Modal message={error} closeModal={() => setError('')} />
      )}
      {feedManagerState && (
        <FeedManager setFeedManagerState={setFeedManagerState} />
      )}
      <header>
        <h4>
          <FontAwesomeIcon icon={faNetworkWired} />
          &nbsp;Data Feed
        </h4>
        <button
          className="uploadBtn actionBtn"
          type="button"
          onClick={() => setUploaderState({ action: 'Upload' })}
        >
          Upload
        </button>
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
        style={{ maxHeight: `${paneHeight}` }}
      >
        <div className="feedBtns">
          <select>
            <option>Name | A - Z</option>
            <option>Name | Z - A</option>
            <option>Author | A - Z</option>
            <option>Author | Z - A</option>
            <option>Created Date</option>
            <option>Updated Date</option>
            <option>Mapped Feeds</option>
          </select>
        </div>
        <ul className="panel-list">
          <div className="notification shared-layer"></div>
          {feeds &&
            feeds.map((feed, index) => (
              <li key={feed._id}>
                <span className="checkbox-wrapper wrapper">
                  <input
                    type="checkbox"
                    checked={feed.inView || false}
                    value={feed._id}
                    onChange={e => toggleFeed(feed, e.target.checked)}
                  />
                </span>
                <span className="feed-detail-wrapper wrapper">
                  <h5>
                    {/* TO DO @Eric: icon should only show if feed is shared
                        Icon should have new class once we add "new notification" When notification is dismissed, new class should be removed
                    */}
                    <span className="icon shared new">
                      <FontAwesomeIcon icon={faShareAlt} />
                    </span>
                    {/* END TO DO */}
                    <span className="file-name">{feed.name}</span>
                    <span className="menuIcon">
                      <FontAwesomeIcon icon={faEllipsisV} />
                    </span>
                    <div className="menu">
                      <div className="menu-button">
                        <FontAwesomeIcon icon={faEllipsisV} />
                      </div>

                      <ul>
                        {/*<li>
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
                      */}
                        <li>
                          <button onClick={e => toggleUpdate(feed)}>
                            <FontAwesomeIcon icon={faFileUpload} />
                            &nbsp;Update
                          </button>
                        </li>
                        <li>
                          <button>
                            <FontAwesomeIcon icon={faShareAltSquare} />
                            &nbsp;Share
                          </button>
                        </li>
                        <li>
                          <button onClick={() => setDeleteFeed(feed)}>
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
                      <dd>
                        {feed.created_at &&
                          format(new Date(feed.created_at), 'MM-dd-yyyy')}
                      </dd>
                    </span>
                    <span className="date">
                      <dt>Updated</dt>
                      <dd>
                        {feed.updated_at &&
                          format(new Date(feed.updated_at), 'MM-dd-yyyy')}
                      </dd>
                    </span>
                    {/* only show author if feed is shared */}
                    <span className="author">
                      <dt>Author</dt>
                      <dd>{feed.owner.name}</dd>
                    </span>
                    {/* end only show author if feed is shared */}
                  </dl>
                </span>
              </li>
            ))}
        </ul>
      </div>
    </>
  );
};

Feeds.propTypes = {
  filter: PropTypes.string,
  setIsMapLoading: PropTypes.func.isRequired
};

export default Feeds;
