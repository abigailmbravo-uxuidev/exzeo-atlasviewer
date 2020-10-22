import mapboxgl from 'mapbox-gl';
import axios from 'axios';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';

export const mapStyles = [
  { label: 'Streets', value: 'mapbox://styles/mapbox/streets-v11' },
  {
    label: 'Terrain',
    value: 'mapbox://styles/exzeo/cjs4qu4kg0x4k1fqtknrij0sm'
  },
  { label: 'Light', value: 'mapbox://styles/mapbox/light-v10' },
  { label: 'Dark', value: 'mapbox://styles/mapbox/dark-v10' },
  { label: 'Satellite', value: 'mapbox://styles/mapbox/satellite-v9' }
];

export const defaultConfig = {
  accessToken: process.env.MAPBOX_KEY,
  style: mapStyles[0].value,
  center: [-81.5158, 27.6648],
  zoom: 7,
  pitch: 35,
  bearing: 0
};

export const getSourceId = id => `${id}-atlas`;
export const getLayerId = id => `${id}-layer`;
export const getFeedId = id => `${id}-feed`;

export const setVisibility = (map, layerId, active) => {
  const visibility = map.getLayoutProperty(layerId, 'visibility');
  const newVisibility = active ? 'visible' : 'none';
  map.setLayoutProperty(layerId, 'visibility', newVisibility);
};

export const zoomIfNeeded = (map, layerId, bounds) => {
  const layers = map.getStyle().layers;
  const hasCustomFeed = layers.some(
    layer =>
      layer.id.endsWith('-feed') &&
      layer.id !== layerId &&
      layer.layout.visibility === 'visible'
  );
  if (!hasCustomFeed && bounds) map.fitBounds(bounds);
};

export const addControls = mapbox => {
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
  const geocoder = new MapboxGeocoder({
    mapboxgl,
    accessToken: process.env.MAPBOX_KEY,
    country: 'us',
    bbox: [-87.63, 24.4, -79.97, 31.0],
    state: 'fl',
    marker: true
  });
  mapbox.addControl(geocoder, 'bottom-left');
};

export const removeLayer = (map, id) => {
  const sourceId = getSourceId(id);
  const layerId = getFeedId(id);

  if (map.getLayer(layerId)) {
    map.setLayoutProperty(layerId, 'visibility', 'none');
    map.removeSource(sourceId);
    map.removeLayer(layerId);
  }
};

export const addLayer = (map, userId, layer) => {
  const { _id, source, source_layer, type, layout, paint } = layer;
  const sourceId = getSourceId(_id);
  const layerId = getLayerId(_id);

  if (map.getLayer(layerId)) return;

  const layers = map.getStyle().layers;

  const lastIndex = layers
    .map(layer => layer.id.endsWith('feed'))
    .lastIndexOf(true);

  const positionId = lastIndex > -1 ? layers[lastIndex].id : null;

  map.addLayer(
    {
      id: layerId,
      type,
      source,
      ...(type !== 'raster' && { 'source-layer': source_layer, layout, paint })
    },
    positionId
  );
};

export const addWeatherLayer = async (
  map,
  userId,
  layer,
  setError,
  setIsMapLoading
) => {
  const { _id, name, product, config = 'tms' } = layer;
  const sourceId = getSourceId(_id);
  const layerId = getLayerId(_id);
  const tileRequest = `${process.env.API_URL}/api/weather/${product}/${config}`;

  const { data: tileUrl } = await axios(tileRequest).catch(err => {
    setIsMapLoading(false);
    setError(err);
  });

  if (map.getLayer(layerId)) return;

  map.addSource(sourceId, {
    type: 'raster',
    tiles: [tileUrl],
    scheme: 'tms'
  });

  map.addLayer({
    id: layerId,
    type: 'raster',
    source: sourceId,
    layout: {
      visibility: 'visible'
    }
  });
};

export const addFeed = (map, userId, feed) => {
  const { _id, name, url, share, bounds } = feed;
  const sourceId = getSourceId(_id);
  const feedId = getFeedId(_id);
  let source = `${process.env.API_URL}/api/geojson/${_id}`;

  if (share && share._id) source = `${source}/${share._id}`;
  if (map.getLayer(feedId)) return;

  map.addSource(sourceId, {
    type: 'geojson',
    data: source,
    buffer: 64
  });

  map.addLayer({
    id: feedId,
    type: 'symbol',
    interactive: true,
    source: sourceId,
    metadata: {
      feedname: name
    },
    layout: {
      visibility: 'visible',
      'icon-image': ['downcase', ['get', 'symbol']],
      'icon-size': 1,
      'icon-allow-overlap': true,
      'text-allow-overlap': true,
      'icon-ignore-placement': true,
      'text-ignore-placement': true
    },
    paint: {
      'icon-color': ['get', 'status_color']
    }
  });

  zoomIfNeeded(map, feedId, bounds);
};

export const deleteDataset = (map, userId, layer) => {
  const { _id } = layer;
  const datasetId = getSourceId(_id);

  if (map.getLayer(datasetId)) {
    map.removeSource(datasetId);
    map.removeLayer(datasetId);
  }

  const result = `${process.env.API_URL}/api/deleteFeed/${_id}`;
};
