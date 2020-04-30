import React, { createContext, useContext, useReducer } from 'react';
import { useUser } from './user-context';

const LayerStateContext = createContext();
const LayerDispatchContext = createContext();

const layerReducer = (layers, action) => {
  switch (action.type) {
    case 'add': {
      return [...layers, action.layer];
    }
    case 'update': {
      return layers.map(l => {
        if (l._id === action.layer._id) {
          return { ...l, ...action.layer };
        }
        return l;
      });
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
};

const LayerProvider = ({ children }) => {
  const { layers } = useUser();
  const [state, dispatch] = useReducer(layerReducer, layers);

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
    //throw new Error(`useLayerDispatch must be used within a LayerProvider`);
  }
  return context;
};

const useLayerState = () => {
  const context = useContext(LayerStateContext);
  if (context === undefined) {
    //throw new Error(`useLayerState must be used within a LayerProvider`);
  }
  return context;
};

export { LayerProvider, useLayerDispatch, useLayerState };
