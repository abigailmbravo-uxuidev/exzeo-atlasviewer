import React, { createContext, useContext, useEffect, useState } from 'react';
import { useUser } from './user-context';

const LayersContext = createContext();
const SetLayersContext = createContext();

const LayerProvider = ({ children }) => {
  const { layers: userLayers } = useUser();
  const [layers, setLayers] = useState([]);

  useEffect(() => {
    if (userLayers && userLayers.length > 0) {
      setLayers(userLayers);
    }
  }, [userLayers]);

  return (
    <LayersContext.Provider value={layers}>
      <SetLayersContext.Provider value={setLayers}>
        {children}
      </SetLayersContext.Provider>
    </LayersContext.Provider>
  );
};

const useSetLayers = () => {
  const context = React.useContext(SetLayersContext);
  if (context === undefined) {
    throw new Error(`useLayerDispatch must be used within a LayerProvider`);
  }
  return context;
};

const useLayers = () => {
  const context = useContext(LayersContext);
  if (context === undefined) {
    throw new Error(`useLayerState must be used within a LayerProvider`);
  }
  return context;
};

export { LayerProvider, useLayers, useSetLayers };
