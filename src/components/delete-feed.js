import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { useFeedDispatch } from '../context/feed-context';
import { useUser } from '../context/user-context';

const DeleteFeed = ({ setUploaderState, setError, setIsMapLoading }) => {
  return (
    <div className="modal fade-in">
      Delete feed-contex
    </div>
  );
};

DeleteFeed.propTypes = {};

export default DeleteFeed;