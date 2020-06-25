import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { useFeedDispatch } from '../context/feed-context';
import { useUser } from '../context/user-context';

const DeleteFeed = ({ id, close }) => {
  return (
    <div className="modal fade-in">
      {/* form goes here if needed */}
      <div className="card">
        <header></header>
        <div className="body">Delete feed-contex</div>
        <footer>
          <button className="secondaryBtn" type="button">
            Cancel
          </button>
          <button className="actionBtn" type="submit">
            onfirm Delete
          </button>
        </footer>
      </div>
    </div>
  );
};

DeleteFeed.propTypes = {
  id: PropTypes.string.isRequired,
  close: PropTypes.func.isRequired
};

export default DeleteFeed;
