import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faNetworkWired, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useForm } from 'react-hook-form';
import Papa from 'papaparse';
import axios from 'axios';
import { useFeedDispatch } from '../context/feed-context';
import { useUser } from '../context/user-context';

const Uploader = ({ setUploaderState, setError, setIsMapLoading }) => {
  const dispatch = useFeedDispatch();
  const { register, handleSubmit, errors, formState } = useForm();
  const user = useUser();
  const [file, setFile] = useState({});
  const [fileInfo, setFileInfo] = useState({});
  let statusValues = [];
  const [statuses, setStatuses] = useState([]);

  const step = row => {
    const {
      meta: { fields },
      data: { status_name, status_color }
    } = row;
    if (!statusValues.some(sv => sv.status_name === status_name))
      statusValues.push({ status_name, status_color });
  };

  const complete = (results, file) => {
    //const { errors } = results;
    console.log(statusValues);
    setStatuses(statusValues);
    setFile(file);
  };

  const handleFile = ({ target: { files } }) => {
    const selectedFile = files[0];
    if (!selectedFile) return;

    Papa.parse(selectedFile, {
      header: true,
      dynamicTyping: true,
      skipEmptyLines: 'greedy',
      step,
      complete,
      error: err => console.log(err)
    });
  };

  const geoFile = {
    type: 'FeatureCollection',
    features: []
  };

  const handleUpload = async data => {
    const url = `${process.env.API_URL}/api/upload`;
    const userData = {
      userId: user.user_id,
      name: `${user.first_name} ${user.last_name}`
    };

    const formData = new FormData();
    formData.append('name', data.feedname);
    formData.append('userData', JSON.stringify(userData));
    formData.append('file', file);

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
      const feed = res.data.data;

      dispatch({ type: 'add', data: feed });
      setUploaderState(false);
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
            &nbsp;Data Feed Upload
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
              accept="text/csv"
              ref={register}
              onChange={handleFile}
            />
          </div>
          <label htmlFor="feed-name">Data Feed Name</label>
          <input
            type="text"
            id="feed-name"
            name="feedname"
            placeholder="Editable feed name"
            ref={register({ required: true })}
            defaultValue={file.name}
          />
          {errors.lastname && 'Feed Name is required.'}
          <ul id="status" className="statusWrapper">
            <label htmlFor="status" className="statusLabal">
              Status
            </label>
            {statuses &&
              statuses.map(s => (
                <li key={s.status_name}>
                  {s.status_color}
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
          <button
            className="actionBtn"
            type="submit"
            enabled={String(formState.dirty)}
          >
            Save and Map
          </button>
        </footer>
      </form>
    </div>
  );
};

Uploader.propTypes = {
  setUploaderState: PropTypes.func.isRequired,
  setError: PropTypes.func,
  setIsMapLoading: PropTypes.func
};

export default Uploader;
