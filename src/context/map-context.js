import React, { createContext, useContext, useState } from 'react';

const MapContext = createContext();

const useMap = () => {
  const context = useContext(MapContext);

  if (!context) {
    throw new Error('useMap must be used within a MapProvider');
  }

  return context;
};

const addSource = (map, data, id) => {
  map.addSource(id, {
    type: 'geojson',
    data,
    buffer: 32
  });
};

const toggleLayer = (map, data, id) => {
  addSource(map, data, id);
  map.addLayer({
    id: `${id}-layer`,
    type: 'circle',
    source: id,
    paint: {
      'circle-radius': 7,
      'circle-color': ['get', 'status_color']
    }
  });
};

const MapProvider = props => {
  const [map, setMap] = useState();

  return <MapContext.Provider value={{ map, setMap }} {...props} />;
};

export { MapProvider, useMap, addSource, toggleLayer };
