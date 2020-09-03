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
import ShareFeed from './share-feed';
import FeedManager from './feed-manager';
import FeedNotification from './feed-notification';
import Modal from './modal';
import Uploader from './uploader';

const Feeds = ({ filter, setIsMapLoading }) => {
  const [uploaderState, setUploaderState] = useState({});
  const [deleteFeed, setDeleteFeed] = useState(null);
  const [shareFeed, setShareFeed] = useState(null);
  const [feedManagerState, setFeedManagerState] = useState(false);
  const allFeeds = useFeedState([]);
  const [feedSort, setFeedSort] = useState('name,asc');
  const [paneActive, setPaneActive] = useState(true);
  const [feedNotifications, setFeedNotifications] = useState(null);
  const [feeds, setFeeds] = useState([]);

  const dispatch = useFeedDispatch();
  const content = useRef(null);
  const [error, setError] = useState('');

  const toggleAccordion = () => {
    setPaneActive(paneActive ? false : true);
  };

  const toggleFeed = (feed, inView) => {
    if (inView) setIsMapLoading(true);
    dispatch({ type: 'update', data: { ...feed, inView, active: inView } });
  };

  const toggleUpdate = feed => {
    setUploaderState({ action: 'Update', feed });
  };

  const toggleNotification = feed => {
    dispatch({ type: 'update', data: { ...feed, notified: true } });
  };

  useEffect(() => {
    const feeds =
      filter && filter.length > 1
        ? allFeeds.filter(feed =>
            feed.name.toLowerCase().includes(filter.toLowerCase())
          )
        : allFeeds;
    setFeeds(feeds);
  }, [allFeeds, filter]);

  useEffect(() => {
    const [sortField, direction = 'asc'] = feedSort.split(',');
    let sorted = [...allFeeds].sort((a, b) => {
      const aValue =
        sortField === 'owner'
          ? a.owner.name.toLowerCase()
          : a[sortField].toLowerCase();

      const bValue =
        sortField === 'owner'
          ? b.owner.name.toLowerCase()
          : b[sortField].toLowerCase();

      if (aValue === bValue) {
        return 0;
      }

      return aValue < bValue ? -1 : 1;
    });

    if (direction === 'desc') sorted.reverse();
    
    setFeeds(sorted);
  }, [feedSort, allFeeds, setFeeds]);

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
      {shareFeed && (
        <ShareFeed
          feed={shareFeed}
          setShareFeed={setShareFeed}
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
          &nbsp;Data Feeds
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

      <div className={`pane ${!paneActive ? 'closed' : 'open'}`} ref={content}>
        <div className="feedBtns">
          <select onChange={e => setFeedSort(e.target.value)}>
            <option value="name,asc">Name | A - Z</option>
            <option value="name,desc">Name | Z - A</option>
            <option value="owner,asc">Author | A - Z</option>
            <option value="owner,desc">Author | Z - A</option>
            <option value="created_at">Created Date</option>
            <option value="updated_at">Updated Date</option>
            <option value="active">Mapped Feeds</option>
          </select>
        </div>
        <ul className="panel-list scroll">
          <div className="feed-notification">
            {feeds &&
              feeds.map(feed =>
                feed.share && !feed.share.viewed && !feed.notified ? (
                  <FeedNotification
                    feed={feed}
                    key={feed._id}
                    close={() => toggleNotification(feed)}
                  />
                ) : null
              )}
          </div>
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
                    {feed.share && (
                      <span className="icon shared new">
                        <FontAwesomeIcon icon={faShareAlt} />
                      </span>
                    )}
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
                          <button
                            {...(feed.share ? { disabled: 'disabled' } : {})}
                            onClick={e => toggleUpdate(feed)}
                          >
                            <FontAwesomeIcon icon={faFileUpload} />
                            &nbsp;Update
                          </button>
                        </li>
                        <li>
                          <button
                            {...(feed.share ? { disabled: 'disabled' } : {})}
                            onClick={() => setShareFeed(feed)}
                          >
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
                    {feed.share && (
                      <span className="author">
                        <dt>Author</dt>
                        <dd>{feed.owner.name}</dd>
                      </span>
                    )}
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
