import React, { createContext, useContext, useReducer } from 'react';
import { useUser } from './user-context';
import { MapProvider, useMap } from './map-context';

const LayerStateContext = createContext();
const LayerDispatchContext = createContext();

const layerReducer = (layers, action) => {
  switch (action.type) {
    case 'add': {
      return [...layers, action.layer];
    }
    case 'toggle': {
      return layers.filter(li => li.id !== action.id);
    }
    case 'update': {
      return listItems.map(li => {
        if (li.id === action.listItem.id) {
          return {};
        }
        return li;
      });
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
};

const LayerProvider = ({ children }) => {
  const { dataSets } = useUser();
  const [state, dispatch] = useReducer(layerReducer, dataSets);

  return (
    <LayerStateContext.Provider value={state}>
      <LayerDispatchContext.Provider value={dispatch}>
        {children}
      </LayerDispatchContext.Provider>
    </LayerStateContext.Provider>
  );
};

const useLayerDispatch = () => {
  const context = React.useContext(LayerDispatchContext);
  if (context === undefined) {
    throw new Error(`useLayerDispatch must be used within a LayerProvider`);
  }
  return context;
};

const useLayerState = () => {
  const context = useContext(LayerStateContext);
  if (context === undefined) {
    throw new Error(`useLayerState must be used within a LayerProvider`);
  }
  return context;
};

export { LayerProvider, useLayerDispatch, useLayerState };
