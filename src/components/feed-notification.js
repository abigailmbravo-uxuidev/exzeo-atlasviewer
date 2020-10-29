import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShareAlt, faTimes } from '@fortawesome/free-solid-svg-icons';

const FeedNotification = ({ feed, close }) => {
  if (!feed) return null;
  return (
    <div className="new-feed-notification card fade-in" key={feed._id}>
      <div className="notification-bar">
        <div className="notification-content">
          <header>
            <h5>You Have A New Shared Feed:</h5>
          </header>
          <div className="feed-name">
            <span className="icon shared new">
              <FontAwesomeIcon icon={faShareAlt} />
            </span>
            {feed.name}
          </div>
        </div>
        <button className="actionBtn" type="button" onClick={close}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
      </div>
    </div>
  );
};

FeedNotification.propTypes = {
  feed: PropTypes.object,
  close: PropTypes.func
};

export default FeedNotification;
