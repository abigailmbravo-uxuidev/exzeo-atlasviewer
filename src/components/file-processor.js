import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Papa from 'papaparse';
import { toggleLayer, useMap } from '../context/map-context';

const FileProcessor = () => {
  const [file, setFile] = useState();
  const [result, setResult] = useState();
  const { map } = useMap();

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

    geoFile.features.push(feature);
  };

  const addToMap = (results, file) => {
    //console.log(file.size);
    //
    //check for errors
    //console.log(results.errors);

    toggleLayer(map, geoFile, file.name);
  };

  const processFile = e => {
    e.preventDefault();
    if (!file) return;

    Papa.parse(file, {
      header: true,
      dynamicTyping: true,
      skipEmptyLines: 'greedy',
      step: csvTojson,
      complete: addToMap,
      error: err => console.log(err)
    });
  };

  return (
    <React.Fragment>
      <form>
        <input id="feed" type="file" onChange={handleFile} />
        <button thype="button" onClick={processFile}>
          Process
        </button>
      </form>
    </React.Fragment>
  );
};

export default FileProcessor;
