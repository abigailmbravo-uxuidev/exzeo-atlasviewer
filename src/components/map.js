import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import mapboxgl from 'mapbox-gl';
import { useLayerState } from '../context/layer-context';
import { defaultConfig, addControls } from './map.utils.js';
import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import { usePrevious } from '../utils/utils';

const addLayer = (map, layer) => {
  const { _id, url } = layer;
  const source = `${process.env.API_URL}/geojson/${_id}`;

  map.addSource(_id, {
    type: 'geojson',
    data: source,
    buffer: 32
  });

  map.addLayer({
    id: `${_id}-layer`,
    type: 'circle',
    source: _id,
    paint: {
      'circle-radius': 7,
      'circle-color': ['get', 'status_color']
    }
  });
};

const Map = () => {
  const layers = useLayerState();
  const [map, setMap] = useState();
  const mapContainer = useRef(null);
  const previousLayers = usePrevious(layers);

  useLayoutEffect(() => {
    const initializeMap = (setMap, mapContainer) => {
      const mapbox = new mapboxgl.Map({
        container: mapContainer.current,
        ...defaultConfig
      });

      addControls(mapbox);

      mapbox.on('load', () => {
        setMap(mapbox);
        mapbox.resize();
      });
    };

    initializeMap(setMap, mapContainer);
  }, [setMap]);

  useEffect(() => {
    if (!layers || !previousLayers) return;
    if (layers.length > previousLayers.length) {
      addLayer(map, layers[layers.length - 1]);
    } else if (previousLayers.length > layers.length) {
      console.log('delete');
    } else {
      console.log('toogle');
    };
  }, [previousLayers, layers]);

  return <div id="map" ref={el => (mapContainer.current = el)} />;
};

Map.propTypes = {
  setMap: PropTypes.func
};

export default Map;
