import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { useFeedDispatch } from '../context/feed-context';
import { useUser } from '../context/user-context';

const DeleteFeed = ({ feed, setDeleteFeed }) => {
  return (
    <div className="modal fade-in">
      <div className="card">
        <header></header>
        <div className="body">Delete feed: {feed.name}</div>
        <footer>
          <button
            className="secondaryBtn"
            type="button"
            onClick={() => setDeleteFeed()}
          >
            Cancel
          </button>
          <button
            className="actionBtn"
            type="submit"
            onCClick={() => console.log(feed._id)}
          >
            onfirm Delete
          </button>
        </footer>
      </div>
    </div>
  );
};

DeleteFeed.propTypes = {
  feed: PropTypes.object.isRequired,
  setDeleteFeed: PropTypes.func.isRequired
};

export default DeleteFeed;
