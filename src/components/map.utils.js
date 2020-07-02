import mapboxgl from 'mapbox-gl';
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
export const getDatasetId = id => `${id}-dataset`;

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
  const layerId = getDatasetId(id);

  if (map.getLayer(layerId)) {
    map.removeSource(sourceId);
    map.removeLayer(layerId);
  }
};

export const addLayer = (map, userId, layer) => {
  const { _id, source_type, source_layer, type, url } = layer;
  const sourceId = getSourceId(_id);

  map.addSource(sourceId, {
    type: source_type,
    url
  });

  map.addLayer({
    id: getLayerId(_id),
    type,
    source: sourceId,
    'source-layer': source_layer,
    layout: {
      'line-join': 'round',
      'line-cap': 'round',
      visibility: 'visible'
    },
    paint: {
      'line-color': '#c0c0c0',
      'line-width': 3
    }
  });
};

export const addDataset = (map, userId, layer) => {
  const { _id, url } = layer;
  const source = `${process.env.API_URL}/api/geojson/${userId}/${_id}`;
  const sourceId = getSourceId(_id);

  map.addSource(sourceId, {
    type: 'geojson',
    data: source,
    buffer: 64
  });

  map.addLayer({
    id: getDatasetId(_id),
    type: 'symbol',
    interactive: true,
    source: sourceId,
    layout: {
      visibility: 'visible',
      'icon-image': 'circle-12',
      'icon-size': 0.8
    },
    paint: {
      'icon-color': ['get', 'status_color']
    }
  });
};

export const deleteDataset = (map, userId, layer) => {
  const { _id } = layer;
  const datasetId = getSourceId(_id);

  if (map.getLayer(datasetId)) {
    map.removeSource(datasetId);
    map.removeLayer(datasetId);
  }

  const result = `${process.env.API_URL}/api/deleteFeed/${userId}/${_id}`;
};
