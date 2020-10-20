import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faNetworkWired,
  faChevronDown,
  faBell
} from '@fortawesome/free-solid-svg-icons';
import { useFeedState, useFeedDispatch } from '../context/feed-context';
import FeedNotification from './feed-notification';

const Notifications = () => {
  const feeds = useFeedState([]);
  const dispatch = useFeedDispatch();
  const [paneActiveNotification, setPaneActiveNotification] = useState(false);

  const toggleAccordionNotification = () =>
    setPaneActiveNotification(!paneActiveNotification);

  const toggleNotification = feed => {
    dispatch({ type: 'update', data: { ...feed, notified: true } });
  };

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
