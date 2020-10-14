import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import StatusIcon from './status-icon.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faNetworkWired,
  faTimes,
  faCircle
} from '@fortawesome/free-solid-svg-icons';
import { useForm } from 'react-hook-form';
import Papa from 'papaparse';
import axios from 'axios';
import { useFeedDispatch } from '../context/feed-context';
import { useUser } from '../context/user-context';

const stripExtension = filename =>
  !filename
    ? ''
    : filename
        .split('.')
        .slice(0, -1)
        .join('.');

const Uploader = ({ data, setUploaderState, setError, setIsMapLoading }) => {
  const dispatch = useFeedDispatch();
  const { register, handleSubmit, errors, formState } = useForm();
  const { isDirty, dirtyFields } = formState;
  const user = useUser();
  const [file, setFile] = useState({});
  const [fileInfo, setFileInfo] = useState({});
  let statusValues = [];
  const [statuses, setStatuses] = useState([]);
  const { feed = {}, action } = data;

  const step = row => {
    const { data } = row;

    const getStatusValue = statusName =>
      Object.keys(data).find(k => k.toLowerCase() === statusName);

    const status_name = getStatusValue('status_name');
    const status_color = getStatusValue('status_color');
    const symbol = getStatusValue('symbol');

    if (!statusValues.some(sv => sv.status_name === data[status_name]))
      statusValues.push({
        status_name: data[status_name],
        status_color: data[status_color],
        symbol: data[symbol]
      });
  };

  const complete = (results, file) => {
    const { errors } = results;
    if (errors && errors.length > 0) setError(errors.join());

    setStatuses(statusValues);
    setFile(file);
  };

  const handleFile = ({ target: { files } }) => {
    const selectedFile = files[0];
    if (!selectedFile) return;

    Papa.parse(selectedFile, {
      header: true,
      encoding: 'UTF-8',
      dynamicTyping: true,
      skipEmptyLines: 'greedy',
      step,
      complete,
      error: err => setError(err)
    });
  };

  const geoFile = {
    type: 'FeatureCollection',
    features: []
  };

  const handleUpload = async data => {
    const url =
      action === 'Upload'
        ? `${process.env.API_URL}/api/upload`
        : `${process.env.API_URL}/api/update`;
    const userData = {
      userId: user.user_id,
      name: `${user.first_name} ${user.last_name}`
    };

    const formData = new FormData();
    formData.append('name', data.feedname);
    formData.append('userData', JSON.stringify(userData));
    formData.append('userName', userData.name);
    formData.append('file', file);

    if (action === 'Update') formData.append('feedId', feed._id);

    const reqOptions = {
      url,
      method: 'POST',
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    };

    setIsMapLoading(true);
    try {
      const res = await axios(reqOptions);
      const newFeed = res.data.data;
      newFeed.inView = true;
      newFeed.active = true;
      newFeed.updated = action === 'Update';
      const actionType = action === 'Upload' ? 'add' : 'update';

      dispatch({ type: actionType, data: newFeed });
      setUploaderState(false);
      if (action === 'Update') setIsMapLoading(false);
    } catch (err) {
      setIsMapLoading(false);
      setUploaderState(false);
      return setError(err.message);
    }
  };

  return (
    <div className="modal fade-in">
      <form className="card" onSubmit={handleSubmit(handleUpload)}>
        <header>
          <h4>
            <FontAwesomeIcon icon={faNetworkWired} />
            &nbsp;Data Feed {action}
          </h4>
          <button
            className="iconBtn closeBtn"
            type="button"
            onClick={() => setUploaderState(false)}
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </header>
        <div className="body">
          <label htmlFor="feed-name-placeholder">File Name</label>
          <div className="uploadWrapper">
            <input
              placeholder="File name will appear here"
              type="text"
              id="feed-name-placeholder"
              name="feednameplaceholder"
              disabled="disabled"
              ref={register({ required: true })}
              defaultValue={file.name}
            />
            <label htmlFor="feed" className="file-upload-label">
              Browse File
            </label>
            <input
              id="feed"
              name="feed"
              type="file"
              accept="text/csv,.csv"
              ref={register}
              onChange={handleFile}
            />
          </div>
          <label htmlFor="feedname">Data Feed Name</label>
          <input
            type="text"
            id="feedname"
            name="feedname"
            maxLength="255"
            placeholder="Editable feed name"
            ref={register({ required: true })}
            defaultValue={feed.name ? feed.name : stripExtension(file.name)}
          />
          {errors.feedname && 'Feed Name is required.'}
          <label htmlFor="status" className="statusLabal">
            Status
          </label>
          <ul id="status" className="statusWrapper">
            {statuses &&
              statuses.map((s, index) => (
                <li key={index}>
                  <StatusIcon shape={s.symbol} fill={s.status_color} />
                  {s.status_name}
                </li>
              ))}
          </ul>
        </div>
        <footer>
          <button
            className="secondaryBtn"
            type="button"
            onClick={() => setUploaderState(false)}
          >
            Cancel
          </button>
          <button className="actionBtn" type="submit" enabled={String(isDirty)}>
            {action === 'Update' ? 'Update' : 'Save'} and Map
          </button>
        </footer>
      </form>
    </div>
  );
};

Uploader.propTypes = {
  data: PropTypes.object.isRequired,
  setUploaderState: PropTypes.func.isRequired,
  setError: PropTypes.func,
  setIsMapLoading: PropTypes.func
};

export default Uploader;
