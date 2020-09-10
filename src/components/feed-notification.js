import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileExport, faTimes } from '@fortawesome/free-solid-svg-icons';

const FeedNotification = ({ feed, close }) => {
  if (!feed) return null;
  return (
    <div className="new-feed-notification card fade-in" key={feed._id}>
      <div className="notification-bar">
        <div className="notification-content">
          <header>
            <FontAwesomeIcon icon={faFileExport} /> New Shared Feed
          </header>
          <div className="feedname">{feed.name}</div>
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
