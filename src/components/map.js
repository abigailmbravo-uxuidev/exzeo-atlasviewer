import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import mapboxgl from 'mapbox-gl';
import { useLayerState } from '../context/layer-context';
import { defaultConfig, addControls, addLayer } from './map.utils.js';
import { usePrevious } from '../utils/utils';
import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';

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
      // delete layer
    } else {
      // toggle layer
    }
  }, [previousLayers, layers, map]);

  if (map) {
    // handle clicks on features
    map.on('click', e => {
      const features = map.queryRenderedFeatures(e.point);
      console.log(features);
    });
  }

  return <div id="map" ref={el => (mapContainer.current = el)} />;
};

Map.propTypes = {
  setMap: PropTypes.func
};

export default Map;
