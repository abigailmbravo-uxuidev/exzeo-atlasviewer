import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import PropTypes from 'prop-types';
import mapboxgl from 'mapbox-gl';
import Modal from './modal';
import { useUser } from '../context/user-context';
import { useFeedState, useFeedDispatch } from '../context/feed-context';
import { useLayers } from '../context/layer-context';
import {
  defaultConfig,
  addControls,
  addFeed,
  addLayer,
  addWeatherLayer,
  getFeedId,
  getSourceId,
  removeLayer
} from './map.utils.js';
import { usePrevious } from '../utils/utils';
import MarkerPopup from './marker-popup';
import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';

import circle from '../img/circle-12.png';
import hexagon from '../img/hexagon-12.png';
import square from '../img/square-12.png';
import pentagon from '../img/pentagon-12.png';
import triangle from '../img/triangle-12.png';

const loadIcon = (map, name, icon) =>
  new Promise((resolve, reject) => {
    map.loadImage(icon, (error, image) => {
      if (error) return reject;
      map.addImage(name, image, { sdf: true });
      return resolve();
    });
  });

const loadIcons = async map => {
  const icons = {
    circle,
    hexagon,
    square,
    pentagon,
    triangle
  };

  return await Promise.all(
    Object.entries(icons).map(([key, value]) => loadIcon(map, key, value))
  );
};

const renderPopup = (properties, feedName) =>
  renderToStaticMarkup(
    <MarkerPopup properties={properties} feedName={feedName} />
  );

const Map = ({ basemap, setIsMapLoading }) => {
  const feeds = useFeedState();
  const dispatch = useFeedDispatch();
  const layers = useLayers();
  const user = useUser();
  const [map, setMap] = useState({});
  const mapContainer = useRef(null);
  const prevFeeds = usePrevious(feeds);
  const prevLayers = usePrevious(layers);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const userId = user.user_id;
  const { token } = user;
  const hoveredStateId = useRef(null);

  // Load the map
  useLayoutEffect(() => {
    const initializeMap = async (setMap, mapContainer) => {
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

      mapbox.on('sourcedata', data => {
        if (data.isSourceLoaded) {
          setIsMapLoading(false);
        }
      });

      mapbox.on('error', ({ error: { message } }) => {
        setIsMapLoading(false);
      });

      mapbox.on('click', e => {
        const features = mapbox.queryRenderedFeatures(e.point);
        const selectedFeatures = features.filter(f =>
          f.layer.id.includes('feed')
        );
        if (!selectedFeatures || selectedFeatures.length === 0) return;
        const feature = selectedFeatures[0];

        new mapboxgl.Popup()
          .setLngLat(feature.geometry.coordinates)
          .setHTML(
            renderPopup(feature.properties, feature.layer.metadata.feedname)
          )
          .addTo(mapbox);
      });

      mapbox.on('mousemove', e => {
        const features = mapbox.queryRenderedFeatures(e.point);
        const selectedFeatures = features.filter(f =>
          f.layer.id.includes('-feed')
        );

        mapbox.getCanvas().style.cursor =
          selectedFeatures.length > 0 ? 'pointer' : '';
      });

      await loadIcons(mapbox);
    };

    initializeMap(setMap, mapContainer);
  }, [setMap, token, setIsMapLoading]);

  // Feeds
  useEffect(() => {
    if (!map.getLayer || !feeds || !prevFeeds) return;
    if (feeds.length > prevFeeds.length) {
      // Add feed
      addFeed(map, userId, feeds[feeds.length - 1]);
    } else if (prevFeeds.length > feeds.length) {
      // Delete feed
      const deletedFeed = prevFeeds.filter(
        pf => !feeds.some(f => f._id == pf._id)
      );
      if (deletedFeed && deletedFeed.length > 0)
        removeLayer(map, deletedFeed[0]._id);
    } else {
      // Update feed
      feeds.map(feed => {
        const { _id, active, bounds, filter, updated } = feed;
        const layerId = getFeedId(_id);
        const prevFeed = prevFeeds.find(p => p._id === _id);

        // feed data updated
        if (updated) {
          const sourceId = getSourceId(_id);

          if (!map.getLayer(layerId)) {
            return addFeed(map, userId, feed);
          }

          map
            .getSource(sourceId)
            .setData(`${process.env.API_URL}/api/geojson/${_id}`);
          
          feed.updated = false;
          const visibility = map.getLayoutProperty(layerId, 'visibility');
          const newVisibility = active ? 'visible' : 'none';
          map.setLayoutProperty(layerId, 'visibility', newVisibility);
          
          return dispatch({ type: 'update', data: feed });
        }

        if (active !== prevFeed.active) {
          if (!map.getLayer(layerId)) {
            return addFeed(map, userId, feed);
          }

          const visibility = map.getLayoutProperty(layerId, 'visibility');
          const newVisibility = active ? 'visible' : 'none';
          map.setLayoutProperty(layerId, 'visibility', newVisibility);
          setIsMapLoading(false);

          // Zoom to bounds if this is th only layer
          if (active) {
            const mapLayers = map.getStyle().layers;
            const hasCustomFeed = mapLayers.some(
              mapLayer =>
                mapLayer.id.endsWith('-feed') &&
                mapLayer.layout.visibility === 'visible' &&
                layerId !== mapLayer.id
            );

            if (!hasCustomFeed && bounds) map.fitBounds(bounds);
          }
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
  }, [prevFeeds, feeds, userId, map, dispatch]);

  // Layers
  useEffect(() => {
    if (!map.getLayer || !layers || !prevLayers) return;
    layers.map(layer => {
      const { _id, active, type } = layer;
      const layerId = `${_id}-layer`;

      if (layer.active !== prevLayers.active) {
        if (!map.getLayer(layerId)) {
          return type === 'weather'
            ? addWeatherLayer(map, userId, layer, setError, setIsMapLoading)
            : addLayer(map, userId, layer);
        } else {
          const visibility = map.getLayoutProperty(layerId, 'visibility');
          const newVisibility = active ? 'visible' : 'none';
          map.setLayoutProperty(layerId, 'visibility', newVisibility);
          setIsMapLoading(false);
        }
      }
    });
  }, [prevLayers, layers, userId, map, setIsMapLoading]);

  // Basemap
  useEffect(() => {
    if (!map.getLayer || !basemap) return;
    let isReset = false;
    map.setStyle(basemap);

    map.once('styledata', async () => {
      if (!isReset) {
        await loadIcons(map);
        feeds
          .filter(feed => feed.active)
          .forEach(feed => {
            addFeed(map, userId, feed);
            const { _id, filter } = feed;
            const layerId = getFeedId(_id);

            if (!filter || filter.length === 0) {
              map.setFilter(layerId, null);
            } else {
              map.setFilter(layerId, [
                '!',
                ['in', ['get', 'status_name'], ['literal', filter]]
              ]);
            }
          });
        layers
          .filter(layer => layer.active)
          .forEach(layer => addLayer(map, userId, layer));
        isReset = true;
      }
    });
  }, [basemap, map, userId, feeds, layers]);

  return (
    <>
      {error.length > 0 && (
        <Modal message={error} closeModal={() => setError('')} />
      )}
      <div id="map" ref={el => (mapContainer.current = el)} />
    </>
  );
};

Map.propTypes = {
  setMap: PropTypes.func
};

export default Map;
