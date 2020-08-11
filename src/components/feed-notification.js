import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileExport } from '@fortawesome/free-solid-svg-icons';

const FeedNotification = ({ feed, close }) => {
  if (!feed) return null;
  return (
    <div className="new-feed-notification" key={feed._id}>
      <FontAwesomeIcon icon={faFileExport} />
      New Shared Feed
    </div>
  )
}

FeedNotification.propTypes = {
  feed: PropTypes.object,
  close: PropTypes.func
};

export default FeedNotification;