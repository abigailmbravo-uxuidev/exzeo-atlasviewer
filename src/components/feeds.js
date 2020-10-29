import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faNetworkWired,
  faShareAlt,
  faEllipsisV,
  faFileUpload,
  faShareAltSquare,
  faTrashAlt,
  faChevronDown
} from '@fortawesome/free-solid-svg-icons';
import { useFeedState, useFeedDispatch } from '../context/feed-context';
import DeleteFeed from './delete-feed';
import ShareFeed from './share-feed';
import FeedManager from './feed-manager';
import Modal from './modal';
import Uploader from './uploader';

const Feeds = ({ filter, setIsMapLoading, setViewState }) => {
  const [uploaderState, setUploaderState] = useState({});
  const [deleteFeed, setDeleteFeed] = useState(null);
  const [shareFeed, setShareFeed] = useState(null);
  const [feedManagerState, setFeedManagerState] = useState(false);
  const allFeeds = useFeedState([]);
  const [feedSort, setFeedSort] = useState('name,asc');
  const [paneActive, setPaneActive] = useState(true);
  const [feeds, setFeeds] = useState([]);
  const dispatch = useFeedDispatch();
  const [error, setError] = useState('');

  useEffect(() => {
    const [sortField, direction = 'asc'] = feedSort.split(',');

    const feeds =
      filter && filter.length > 1
        ? allFeeds.filter(feed =>
            feed.name.toLowerCase().includes(filter.toLowerCase())
          )
        : allFeeds;

    const sortAuthor = (feeds, sortField) =>
      [...feeds].sort((a, b) => {
        const aValue = a.share ? a.owner.name.toLowerCase() : '';
        const bValue = b.share ? b.owner.name.toLowerCase() : '';

        return !aValue ? 1 : !bValue ? -1 : aValue.localeCompare(bValue);
      });

    const sortString = (feeds, sortField) =>
      [...feeds].sort((a, b) => {
        const aValue = a[sortField].toLowerCase();
        const bValue = b[sortField].toLowerCase();

        return aValue.localeCompare(bValue);
      });

    const sortBoolean = (feeds, sortField) =>
      [...feeds].sort((a, b) =>
        a[sortField] === b[sortField] ? 0 : a[sortField] ? -1 : 1
      );

    let sorted = [];

    if (sortField === 'inView') {
      sorted = sortBoolean(feeds, sortField);
    } else if (sortField === 'owner') {
      sorted = sortAuthor(feeds, sortField);
    } else {
      sorted = sortString(feeds, sortField);
    }
    if (direction === 'desc') sorted.reverse();

    setFeeds(sorted);
  }, [feedSort, allFeeds, setFeeds, filter]);

  const toggleAccordion = () => {
    setPaneActive(paneActive ? false : true);
  };

  const toggleFeed = (feed, inView) => {
    if (inView) {
      setIsMapLoading(true);
      setViewState(true);
    }
    console.log(feeds);
    dispatch({ type: 'update', data: { ...feed, inView, active: inView } });
  };

  const toggleUpdate = feed => {
    setUploaderState({ action: 'Update', feed });
  };

  const toggleNotification = feed => {
    dispatch({ type: 'update', data: { ...feed, notified: true } });
  };

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

      <div className={`pane feeds ${!paneActive ? 'closed' : 'open'}`}>
        <div className="feedBtns">
          <select onChange={e => setFeedSort(e.target.value)}>
            <option value="name,asc">Name | A - Z</option>
            <option value="name,desc">Name | Z - A</option>
            <option value="owner,asc">Author | A - Z</option>
            <option value="owner,desc">Author | Z - A</option>
            <option value="created_at">Created Date</option>
            <option value="updated_at">Updated Date</option>
            <option value="inView">Mapped Feeds</option>
          </select>
        </div>
        <ul className="panel-list scroll">
          {feeds &&
            feeds.map((feed, index) => (
              <li
                key={feed._id}
                className={
                  feed.share && !feed.share.viewed ? 'unviewed' : 'viewed'
                }
              >
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
                        <FontAwesomeIcon
                          icon={faShareAlt}
                          title={`Shared by: ${feed.owner.name}`}
                        />
                      </span>
                    )}
                    <span title={feed.name} className="file-name">
                      {feed.name}
                    </span>
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
