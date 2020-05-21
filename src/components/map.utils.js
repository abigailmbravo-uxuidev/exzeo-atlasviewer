import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';

export const mapStyles = [
  { label: 'Streets', value: 'mapbox://styles/mapbox/streets-v11' },
  { label: 'Outdoors', value: 'mapbox://styles/mapbox/outdoors-v11' },
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

export const addLayer = (map, userId, layer) => {
  const { _id, url } = layer;
  const source = `${process.env.API_URL}/geojson/${userId}/${_id}`;

  map.addSource(_id, {
    type: 'geojson',
    data: source,
    buffer: 32
  });

  map.addLayer({
    id: `${_id}`,
    type: 'circle',
    source: _id,
    layout: {
      visibility: 'visible'
    },
    paint: {
      'circle-radius': 7,
      'circle-color': ['get', 'status_color']
    }
  });
};
