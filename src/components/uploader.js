import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faNetworkWired } from '@fortawesome/free-solid-svg-icons';
import { useForm } from 'react-hook-form';
import Papa from 'papaparse';
import axios from 'axios';
import { useLayerDispatch } from '../context/layer-context';
import { useUser } from '../context/user-context';

const Uploader = ({ setUploaderState }) => {
  const dispatch = useLayerDispatch();
  const { register, handleSubmit, errors, formState } = useForm();
  const user = useUser();
  const [file, setFile] = useState({});
  const [headers, setHeaders] = useState(null);
  const [layerData, setLayerData] = useState();
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
    const url = `${process.env.API_URL}/upload`;
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
    const res = await axios(reqOptions).catch(err => console.log(err));
    const layer = res.data.data;

    dispatch({ type: 'add', data: layer });
    setUploaderState(false);
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
    <div className="modal .fade-in">
      <form className="card" onSubmit={handleSubmit(handleUpload)}>
        <header>
        <h4>
          <FontAwesomeIcon icon={faNetworkWired} />
          &nbsp;Data Feed Upload
        </h4>
        </header>
        <div className="body">
        <input
          id="feed"
          name="feed"
          type="file"
          accept="text/csv"
          ref={register}
          onChange={handleFile}
        />
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
          <button className="secondaryBtn" type="button" onClick={() => setUploaderState(false)}>
            Cancel
          </button>
          <button className="actionBtn" type="submit" enabled={String(formState.dirty)}>
            Upload
          </button>
        </footer>
      </form>
    </div>
  );
};

export default Uploader;
