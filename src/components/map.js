import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import mapboxgl from 'mapbox-gl';
import { useUser } from '../context/user-context';
import { useFeedState } from '../context/feed-context';
import {
  defaultConfig,
  addControls,
  addDataset,
  addLayer
} from './map.utils.js';
import { usePrevious } from '../utils/utils';
import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';

const Map = ({ basemap, layerToggle, setIsMapLoading }) => {
  const feeds = useFeedState();
  const user = useUser();
  const [map, setMap] = useState({});
  const mapContainer = useRef(null);
  const prevFeeds = usePrevious(feeds);
  const [isLoading, setIsLoading] = useState(false);
  const userId = user.user_id;
  const { token } = user;

  useLayoutEffect(() => {
    const initializeMap = (setMap, mapContainer) => {
      const mapbox = new mapboxgl.Map({
        container: mapContainer.current,
        ...defaultConfig,
        transformRequest: (url, resourceType) => {
          if (resourceType === 'Source') {
            return {
              url,
              headers: { Authorization: `Bearer ${token}` }
            };
          }
        }
      });

      addControls(mapbox);

      mapbox.on('load', () => {
        setMap(mapbox);
        mapbox.resize();
      });

      mapbox.on('data', data => {
        if (data.isSourceLoaded) {
          setIsMapLoading(false);
        }
      });

      mapbox.on('click', e => {
        const features = mapbox.queryRenderedFeatures(e.point);
        const feature = features.filter(f => f.layer.id.includes('dataset'));
      });
    };

    initializeMap(setMap, mapContainer);
  }, [setMap, token, setIsMapLoading]);

  useEffect(() => {
    if (!map.getLayer || !feeds || !prevFeeds) return;
    if (feeds.length > prevFeeds.length) {
      // Add feed
      addDataset(map, userId, feeds[feeds.length - 1]);
    } else if (prevFeeds.length > feeds.length) {
      // Delete feed
    } else {
      // Toggle feed
      feeds.map(feed => {
        const { _id, active } = feed;
        const layerId = `${_id}-dataset`;

        if (feed.active !== prevFeeds.active) {
          if (!map.getLayer(layerId)) {
            return addDataset(map, userId, feed);
          }

          const visibility = map.getLayoutProperty(layerId, 'visibility');
          const newVisibility = active ? 'visible' : 'none';
          map.setLayoutProperty(layerId, 'visibility', newVisibility);
        }
      });
    }
  }, [prevFeeds, feeds, userId, map]);

  useEffect(() => {
    if (!map.getLayer || !basemap) return;
    map.setStyle(basemap);
  }, [basemap, map]);

  useEffect(() => {
    if (!map.getLayer || !layerToggle) return;
    const { show, layer } = layerToggle;
    const layerId = `${layer._id}-layer`

    if (!map.getLayer(layerId)) {
      return addLayer(map, userId, layer);
    }

    const visibility = map.getLayoutProperty(layerId, 'visibility');
    const newVisibility = show ? 'visible' : 'none';
    map.setLayoutProperty(layerId, 'visibility', newVisibility);
  }, [layerToggle, map, userId]);

  return <div id="map" ref={el => (mapContainer.current = el)} />;
};

Map.propTypes = {
  setMap: PropTypes.func
};

export default Map;
