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
  const [headers, setHeaders] = useState(null);
  const [feedData, setLayerData] = useState();
  const [geoJson, setGeoJson] = useState();

  const handleFile = ({ target: { files } }) => {
    setFile(files[0]);
  };

  const geoFile = {
    type: 'FeatureCollection',
    features: []
  };

  const csvTojson = (row, parser) => {
    const lat = row.data.lat || row.data.latitude;
    const lon = row.data.lon || row.data.long || row.data.longitude;
    const feature = {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [lon, lat]
      },
      properties: {
        ...row.data
      }
    };

    if (!headers) setHeaders(row.meta.fields);
    geoFile.features.push(feature);
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

  const processFile = e => {
    if (!file) return;

    Papa.parse(file, {
      header: true,
      dynamicTyping: true,
      skipEmptyLines: 'greedy',
      step: csvTojson,
      complete: addLayer,
      error: err => console.log(err)
    });
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
          <label htmlFor="feed" className="file-upload-label">
            Choose File
          </label>
          <input
            id="feed"
            name="feed"
            type="file"
            accept="text/csv"
            ref={register}
            onChange={handleFile}
          />
          <label htmlFor="feed-name">Feed Name</label>
          <input
            type="text"
            id="feed-name"
            name="feedname"
            ref={register({ required: true })}
            defaultValue={file.name}
          />
          {errors.lastname && 'Feed Name is required.'}
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
            Upload
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
