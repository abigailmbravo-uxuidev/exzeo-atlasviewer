import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';

import 'mapbox-gl/dist/mapbox-gl.css';

const Map = () => {
  const [map, setMap] = useState(null);
  const mapContainer = useRef(null);

  useEffect(() => {
    mapboxgl.accessToken = process.env.MAPBOX_KEY;
    const initializeMap = ({ setMap, mapContainer }) => {
      const mapbox = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [0, 0],
        zoom: 5
      });

      mapbox.on('load', () => {
        setMap(mapbox);
        mapbox.resize();
      });
    };

    if (!map) initializeMap({ setMap, mapContainer });
  }, [map]);

  return <div id="map" ref={el => (mapContainer.current = el)} />;
};

export default Map;
