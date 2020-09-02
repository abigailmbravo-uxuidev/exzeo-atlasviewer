import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { useFeedDispatch } from '../context/feed-context';
import { useUser } from '../context/user-context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

const handleDelete = async (feedId, userId, utilities) => {
  const { setDeleteFeed, dispatch, setError } = utilities;
  const url = `${process.env.API_URL}/api/delete/${feedId}`;

  const reqOptions = {
    url,
    method: 'DELETE',
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  };

  try {
    const res = await axios(reqOptions);
    dispatch({ type: 'delete', id: feedId });
    setDeleteFeed();
  } catch (err) {
    setDeleteFeed();
    return setError(err.message);
  }
};

const DeleteFeed = ({ feed, setDeleteFeed, setError }) => {
  const dispatch = useFeedDispatch();
  const user = useUser();
  const utilities = {
    setDeleteFeed,
    dispatch,
    setError
  };

  return (
    <div className="modal fade-in">
      <div className="card">
        <header>
          <h4>
            <FontAwesomeIcon icon={faTrashAlt} />
            &nbsp;Delete Feed
          </h4>
        </header>
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
            onClick={() => handleDelete(feed._id, user.user_id, utilities)}
          >
            Confirm Delete
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
