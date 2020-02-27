import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import mapboxgl from 'mapbox-gl';
import { useMap } from '../context/map-context';
import { defaultConfig, addControls } from './map.utils.js';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';

const Map = () => {
  const { setMap } = useMap();
  const mapContainer = useRef(null);

  useEffect(() => {
    const initializeMap = (setMap, mapContainer) => {
      const mapbox = new mapboxgl.Map({
        container: mapContainer.current,
        ...defaultConfig
      });

      addControls(mapbox);

      const geocoder = new MapboxGeocoder({
        accessToken: process.env.MAPBOX_KEY,
        country: 'us',
        bbox: [-87.63, 24.4, -79.97, 31.0],
        state: 'fl'
      });
      mapbox.addControl(geocoder);

      mapbox.on('load', () => {
        setMap(mapbox);
        mapbox.resize();
      });
    };

    initializeMap(setMap, mapContainer);
  }, [setMap]);

  return <div id="map" ref={el => (mapContainer.current = el)} />;
};

Map.propTypes = {
  setMap: PropTypes.func
};

export default Map;
