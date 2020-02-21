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
        center: [-81.5158, 27.6648],
        zoom: 7,
        pitch: 35,
        bearing: 0
      });

      mapbox.addControl(new mapboxgl.NavigationControl(), 'bottom-right');

      mapbox.addControl(
        new mapboxgl.GeolocateControl({
          positionOptions: {
            enableHighAccuracy: true
          },
          trackUserLocation: true
        }),
        'bottom-right'
      );

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
