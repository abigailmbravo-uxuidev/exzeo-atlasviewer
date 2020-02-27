import mapboxgl from 'mapbox-gl';

export const mapStyles = [
  'mapbox://styles/mapbox/streets-v11',
  'mapbox://styles/mapbox/outdoors-v11',
  'mapbox://styles/mapbox/light-v10',
  'mapbox://styles/mapbox/dark-v10',
  'mapbox://styles/mapbox/satellite-v9',
  'mapbox://styles/mapbox/satellite-streets-v11',
  'mapbox://styles/mapbox/navigation-preview-day-v4',
  'mapbox://styles/mapbox/navigation-preview-night-v4',
  'mapbox://styles/mapbox/navigation-guidance-day-v4',
  'mapbox://styles/mapbox/navigation-guidance-night-v4'
];

export const defaultConfig = {
  accessToken: process.env.MAPBOX_KEY,
  style: mapStyles[8],
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
};
