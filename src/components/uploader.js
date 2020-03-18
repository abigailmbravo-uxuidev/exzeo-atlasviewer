import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Papa from 'papaparse';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { useLayerDispatch } from '../context/layer-context';

const Uploader = () => {
  const [file, setFile] = useState();
  const [headers, setHeaders] = useState(null);
  const [layerData, setLayerData] = useState();
  const [geoJson, setGeoJson] = useState();
  const dispatch = useLayerDispatch();

  const handleFile = e => {
    setFile(e.target.files[0]);
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

  const addLayer = async (results, file) => {
    if (results.errors.length > 0) console.log('error: ', results.errors);

    const uuid = uuidv4();
    const layer = {
      id: uuid,
      name: file.name,
      size: file.size,
      active: true,
      headers
    };

    const res = await axios
      .post(`{process.env.API_URL}/upload`, file)
      .catch(err => console.log(err));

    return dispatch({ type: 'add', layer });
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
    <React.Fragment>
      <form>
        <input id="feed" type="file" accept="text/csv" onChange={handleFile} />
        <button type="button" onClick={processFile}>
          Process
        </button>
      </form>
    </React.Fragment>
  );
};

export default Uploader;
