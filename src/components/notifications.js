import React, { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faNetworkWired,
  faChevronDown,
  faBell
} from '@fortawesome/free-solid-svg-icons';
import { useFeedState, useFeedDispatch } from '../context/feed-context';
import FeedNotification from './feed-notification';

const Notifications = ({ filter }) => {
  const allFeeds = useFeedState([]);

  const [feeds, setFeeds] = useState([]);

  const dispatch = useFeedDispatch();
  const content = useRef(null);

  const toggleAccordionNotification = () => {
    setPaneActiveNotification(paneActiveNotification ? false : true);
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

  const [paneActiveNotification, setPaneActiveNotification] = useState(false);

  return (
    <>
      {/* Notification Panel */}
      <header>
        <h4>
          <FontAwesomeIcon icon={faBell} />
          &nbsp;Notifications
          <span className="notification-count">
            {
              feeds
                .map(feed => feed.share && !feed.share.viewed && !feed.notified)
                .filter(v => v).length
            }
          </span>
        </h4>

        <button
          className={`paneToggle ${
            !paneActiveNotification ? 'closed' : 'open'
          }`}
          onClick={toggleAccordionNotification}
        >
          <FontAwesomeIcon icon={faChevronDown} />
        </button>
      </header>
      <div
        className={`pane notifications ${
          !paneActiveNotification ? 'closed' : 'open'
        }`}
        ref={content}
      >
        <div className="panel-list scroll">
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
        </div>
      </div>
      {/* Notification Panel */}
    </>
  );
};

export default Notifications;
