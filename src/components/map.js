import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import PropTypes from 'prop-types';
import mapboxgl from 'mapbox-gl';
import { useUser } from '../context/user-context';
import { useFeedState } from '../context/feed-context';
import { useLayers } from '../context/layer-context';
import {
  defaultConfig,
  addControls,
  addDataset,
  addLayer
} from './map.utils.js';
import { usePrevious } from '../utils/utils';
import MarkerPopup from './marker-popup';
import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';

const renderPopup = properties =>
  renderToStaticMarkup(<MarkerPopup properties={properties} />);

const Map = ({ basemap, setIsMapLoading }) => {
  const feeds = useFeedState();
  const layers = useLayers();
  const user = useUser();
  const [map, setMap] = useState({});
  const mapContainer = useRef(null);
  const prevFeeds = usePrevious(feeds);
  const prevLayers = usePrevious(layers);
  const [isLoading, setIsLoading] = useState(false);
  const userId = user.user_id;
  const { token } = user;

  // Load the map
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
        const selectedFeatures = features.filter(f =>
          f.layer.id.includes('dataset')
        );
        if (!selectedFeatures || selectedFeatures.length === 0) return;
        const feature = selectedFeatures[0];

        new mapboxgl.Popup()
          .setLngLat(feature.geometry.coordinates)
          .setHTML(renderPopup(feature.properties))
          .addTo(mapbox);
      });
    };

    initializeMap(setMap, mapContainer);
  }, [setMap, token, setIsMapLoading]);

  // Feeds
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
        const { _id, active, filter } = feed;
        const layerId = `${_id}-dataset`;
        const prevFeed = prevFeeds.find(p => p._id === _id);

        if (active !== prevFeed.active) {
          if (!map.getLayer(layerId)) {
            return addDataset(map, userId, feed);
          }

          const visibility = map.getLayoutProperty(layerId, 'visibility');
          const newVisibility = active ? 'visible' : 'none';
          map.setLayoutProperty(layerId, 'visibility', newVisibility);
        }

        // Set filter
        if (filter !== prevFeed.filter) {
          if (!filter || filter.length === 0) {
            map.setFilter(layerId, null);
          } else {
            map.setFilter(layerId, [
              '!',
              ['in', ['get', 'status_name'], ['literal', filter]]
            ]);
          }
        }
      });
    }
  }, [prevFeeds, feeds, userId, map]);

  // Layers
  useEffect(() => {
    if (!map.getLayer || !layers || !prevLayers) return;
    layers.map(layer => {
      const { _id, active } = layer;
      const layerId = `${_id}-layer`;

      if (layer.active !== prevLayers.active) {
        if (!map.getLayer(layerId)) {
          return addLayer(map, userId, layer);
        }

        const visibility = map.getLayoutProperty(layerId, 'visibility');
        const newVisibility = active ? 'visible' : 'none';
        map.setLayoutProperty(layerId, 'visibility', newVisibility);
      }
    });
  }, [prevLayers, layers, userId, map]);

  // Basemap
  useEffect(() => {
    if (!map.getLayer || !basemap) return;

    map.setStyle(basemap);
  }, [basemap, map]);

  return <div id="map" ref={el => (mapContainer.current = el)} />;
};

Map.propTypes = {
  setMap: PropTypes.func
};

export default Map;
